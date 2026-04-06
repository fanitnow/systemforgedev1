# Environment Setup

## Prerequisites

Before you begin, make sure you have:

- A laptop or desktop computer (Mac or Windows)
- A Google account (for Supabase and Netlify login)
- A debit or credit card (for domain purchase ~$14)
- Your bank account info (for Stripe setup)
- 2–3 hours of uninterrupted time

---

## Step 1 — Buy Your Domain

1. Go to [namecheap.com](https://namecheap.com)
2. Search: `systemsforgeai.com`
3. Add to cart → checkout (~$14/year)
4. Enable **WhoisGuard** (free — hides your personal info)
5. Complete purchase

**Save:** Your Namecheap login credentials

---

## Step 2 — Create Accounts

Create accounts at each of these services before configuring anything:

| Service | URL | Purpose |
|---------|-----|---------|
| Supabase | supabase.com | Database |
| Stripe | stripe.com | Payments |
| Netlify | netlify.com | Hosting |
| Resend | resend.com | Email alerts |
| Google Workspace | workspace.google.com | Business email |
| GoHighLevel | gohighlevel.com | CRM + automation |
| Make.com | make.com | Automation glue |

---

## Step 3 — Collect Your Keys

After creating accounts, collect these values and store them in your Notes app:

```
SUPABASE_URL = https://[your-project].supabase.co
SUPABASE_ANON_KEY = eyJ...
STRIPE_PUBLISHABLE_KEY = pk_live_...
RESEND_API_KEY = re_...
```

---

## Step 4 — Update Your Files

Open `public/js/sf-chat-widget.js` in a text editor.

Find these two lines near the bottom:
```js
const URL = 'YOUR_SUPABASE_URL';
const KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Replace with your real values. Save the file.

---

## Next Step

→ [Deployment Guide](./02-deployment.md)
