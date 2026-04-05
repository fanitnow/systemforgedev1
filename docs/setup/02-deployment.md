# Deployment Guide

## Deploy to Netlify

### Step 1 — Upload Files

1. Go to [netlify.com](https://netlify.com) and log in
2. From your dashboard, find the drag-and-drop zone
3. Open your `systemforge-ai/public/` folder
4. Select all files and drag them into Netlify
5. Wait ~30 seconds for deployment
6. You will receive a URL like `salmon-rainbow-abc.netlify.app`

### Step 2 — Connect Your Domain

1. In Netlify → Site Settings → Domain management
2. Click **Add custom domain**
3. Enter: `systemforgeai.com`
4. Copy the 2 nameserver addresses Netlify gives you
5. Go to Namecheap → Domain List → Manage → Nameservers
6. Switch to **Custom DNS** and paste both nameserver addresses
7. Back in Netlify → click **Verify DNS configuration**

> DNS propagation takes 15 minutes to 24 hours.

### Step 3 — Enable HTTPS

1. Netlify → Site Settings → Domain management → HTTPS
2. Click **Provision certificate**
3. Wait for the green checkmark

---

## Verify Deployment

Visit your site and confirm:

- [ ] `systemforgeai.com` loads the main page
- [ ] The forge mark logo appears in the navigation
- [ ] The AI audit tool responds to messages
- [ ] The checkout page loads at `/pages/checkout.html`
- [ ] The padlock icon appears in the browser address bar

---

## Updating the Site

When you make changes to any file:

1. Save the updated file
2. Go to Netlify → Deploys
3. Drag the updated file(s) into the deploy zone
4. Netlify redeploys in ~15 seconds

---

## Next Step

→ [Database Installation](./03-database.md)
