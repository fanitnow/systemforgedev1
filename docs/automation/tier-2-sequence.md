# Tier 2 Automation Sequence — System Starter ($750)

## Trigger
`paid_clients` row inserted with `tier_name = 'System Starter'`

## Sequence

| Timing | Channel | Message | Sent By |
|--------|---------|---------|---------|
| Immediate | Email | Purchase confirmation + "Build starts now. ETA: 48–72hrs." | Stripe auto |
| +2 hours | Email | Owner alert with full intake details | Resend + Supabase webhook |
| +4 hours | Email | "Build underway — we'll update you at delivery" | GoHighLevel |
| +48–72 hrs | Email | Loom walkthrough + handoff call Calendly link | Manual (you send) |
| Day 7 | Email | "How are your systems running?" | GoHighLevel |
| Day 21 | Email | "Ready for the full build? Your $750 applies as credit." | GoHighLevel |
| Day 30 | Email | "Refer a friend — $100 credit. Can we share your results?" | GoHighLevel |
| Day 90 | Email | "3 months in — time for a free systems re-audit?" | GoHighLevel |

## GoHighLevel Setup

1. Create pipeline: **System Starter Clients**
2. Stages: New → Build In Progress → Delivered → Active → Upsell Pending
3. Create workflow trigger: Contact tag = `tier2_purchase`
4. Add each email in the sequence as a workflow action
5. Set delays between actions as shown above

## Delivery Checklist

- [ ] Loom walkthrough recorded (screen record your build)
- [ ] Calendly 60-min handoff call slot configured
- [ ] Dashboard build status updated to "Delivered"
- [ ] Supabase `build_status_log` row updated with `delivered_at` timestamp
