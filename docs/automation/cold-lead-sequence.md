# Cold Lead Re-Engagement Sequence

## Trigger
`audit_reports.report_shown = true` AND `converted = false`

The Supabase database trigger `auto_flag_closer_lead` automatically inserts a row into `closer_leads`. Make.com watches this table and creates a GHL contact.

## Sequence

| Timing | Channel | Message | Sent By |
|--------|---------|---------|---------|
| Day 1 | DM / Email | "Did the audit land well? Any questions?" | Personal (you) |
| Day 3 | Email | "You're losing $X every week this isn't fixed." | GoHighLevel |
| Day 7 | Email | "Start with $97 — applies as credit to the $750 build." | GoHighLevel |
| Day 14 | Email | "Last check — still interested?" | GoHighLevel |
| Day 30 | Email | "New month — things changed? Free re-audit." | GoHighLevel |
| Day 90 | Email | "Still here. Still ready when you are." | GoHighLevel |

## Personalization Variables

GHL can pull these from the contact record for personalized emails:

- `{{contact.business_type}}` — their industry
- `{{contact.revenue_leak_low}}` — from audit_reports
- `{{contact.revenue_leak_high}}` — from audit_reports  
- `{{contact.identified_gaps}}` — what was broken

## Make.com Scenario

1. Watch `closer_leads` table in Supabase (new rows)
2. Look up corresponding `audit_reports` row for leak amounts
3. Look up `leads` row for contact info
4. Create GHL Contact with tags: `cold_lead`, `audit_done`
5. Set custom fields: leak_low, leak_high, business_type
6. Add to pipeline: **Cold Lead Recovery**
