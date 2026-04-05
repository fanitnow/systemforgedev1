# Automation Layer — Index

SystemForge AI uses a multi-layer automation stack. This directory documents every sequence, trigger, and integration.

## Automation Stack

| Tool | Role | Monthly Cost |
|------|------|-------------|
| GoHighLevel | Email + SMS sequences, CRM pipelines | $97/mo |
| Make.com | Stripe → Supabase → GHL sync | Free → $9/mo |
| Supabase Webhooks | Database event triggers | Free |
| Resend | Transactional email delivery | Free → $20/mo |

## Sequence Index

| File | Sequence | Trigger |
|------|---------|---------|
| [tier-1-sequence.md](./tier-1-sequence.md) | Audit Report ($97) post-purchase | Stripe payment confirmed |
| [tier-2-sequence.md](./tier-2-sequence.md) | System Starter ($750) post-purchase | Stripe payment confirmed |
| [tier-3-sequence.md](./tier-3-sequence.md) | Full Build ($2,500) post-purchase | Stripe payment confirmed |
| [cold-lead-sequence.md](./cold-lead-sequence.md) | Re-engagement for audit no-purchase | audit_reports.report_shown = true |
| [make-scenarios.md](./make-scenarios.md) | All Make.com scenario configs | Various |
| [supabase-webhooks.md](./supabase-webhooks.md) | All database webhook configs | Database events |

## Data Flow Between Tools

```
STRIPE payment confirmed
    → Stripe webhook fires
    → Make.com catches it
    → INSERT into Supabase paid_clients
    → Supabase webhook fires
    → Resend sends owner alert email
    → Make.com also creates GHL Contact
    → GHL enrolls in tier-specific sequence
    → Emails fire on schedule automatically

AUDIT completed (no purchase)
    → Supabase trigger fires
    → INSERT into closer_leads (automatic)
    → Make.com watches closer_leads
    → Creates GHL contact with tag "cold_lead"
    → GHL cold lead sequence starts
    → Day 1, 3, 7, 14, 30, 90 emails send
```
