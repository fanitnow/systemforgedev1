// netlify/functions/stripe-webhook.js
// Handles Stripe webhook events — payment confirmation, refunds
// This is how money getting paid triggers everything else in your pipeline

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify the webhook came from Stripe (not a fake request)
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Save to Supabase helper
  async function saveToSupabase(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return res.ok;
  }

  // Send owner email via Resend helper
  async function notifyOwner(subject, html) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `SystemForge AI <info@systemsforgeai.com>`,
        to: process.env.OWNER_EMAIL,
        subject,
        html
      })
    });
  }

  // ── HANDLE EVENTS ─────────────────────────────────────────
  try {
    switch (stripeEvent.type) {

      case 'payment_intent.succeeded': {
        const pi = stripeEvent.data.object;
        const meta = pi.metadata || {};

        // Save paid client to Supabase
        await saveToSupabase('paid_clients', {
          first_name: (meta.customer_name || '').split(' ')[0] || '',
          last_name: (meta.customer_name || '').split(' ').slice(1).join(' ') || '',
          email: pi.receipt_email || '',
          business_name: meta.business_name || '',
          tier_name: meta.tier_name || '',
          amount_paid: pi.amount,
          stripe_payment_id: pi.id,
          stripe_customer_id: pi.customer || '',
          build_status: 'new',
          payment_status: 'paid'
        });

        // Notify owner immediately
        await notifyOwner(
          `💰 New Client: ${meta.business_name || 'Unknown'} — $${(pi.amount / 100).toFixed(2)}`,
          `
            <h2 style="color:#C9A84C">New Paid Client — SystemForge AI</h2>
            <p><strong>Name:</strong> ${meta.customer_name || 'Not provided'}</p>
            <p><strong>Business:</strong> ${meta.business_name || 'Not provided'}</p>
            <p><strong>Package:</strong> ${meta.tier_name || 'Unknown'}</p>
            <p><strong>Amount:</strong> $${(pi.amount / 100).toFixed(2)}</p>
            <p><strong>Email:</strong> ${pi.receipt_email || 'Not provided'}</p>
            <p><strong>Stripe ID:</strong> ${pi.id}</p>
            <hr>
            <p><a href="https://systemsforgeai.com/pages/dashboard.html">View Dashboard →</a></p>
          `
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = stripeEvent.data.object;
        console.log('Payment failed:', pi.id, pi.last_payment_error?.message);
        break;
      }

      case 'charge.refunded': {
        const charge = stripeEvent.data.object;
        // Update paid_clients status in Supabase via service role
        console.log('Refund processed:', charge.id);
        break;
      }

    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };

  } catch (error) {
    console.error('Webhook handler error:', error);
    return { statusCode: 500, body: `Handler error: ${error.message}` };
  }
};
