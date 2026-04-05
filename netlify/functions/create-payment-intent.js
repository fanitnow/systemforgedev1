// netlify/functions/create-payment-intent.js
// Creates a Stripe PaymentIntent server-side
// STRIPE_SECRET_KEY is never exposed to the browser

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  const allowedOrigins = [
    'https://systemforgeai.com',
    'https://www.systemforgeai.com',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ];

  const origin = event.headers.origin || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Stripe secret key not configured' })
    };
  }

  try {
    const { tierName, amount, customerEmail, customerName, businessName, metadata } = JSON.parse(event.body);

    // Validate amount against known tiers (prevents price tampering)
    const VALID_AMOUNTS = {
      'Audit Report': 9700,        // $97.00 in cents
      'System Starter': 75000,     // $750.00 in cents
      'Full System Build': 250000  // $2,500.00 in cents
    };

    const validatedAmount = VALID_AMOUNTS[tierName];
    if (!validatedAmount) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid tier name' })
      };
    }

    // Create or retrieve Stripe customer
    let customer;
    if (customerEmail) {
      const existingCustomers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          metadata: { business_name: businessName || '' }
        });
      }
    }

    // Create PaymentIntent with server-validated amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: validatedAmount,
      currency: 'usd',
      customer: customer?.id,
      receipt_email: customerEmail,
      description: `SystemForge AI — ${tierName}`,
      metadata: {
        tier_name: tierName,
        business_name: businessName || '',
        customer_name: customerName || '',
        ...metadata
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId: customer?.id,
        amount: validatedAmount
      })
    };

  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
