# Make.com Automation Setup

## Overview

Make.com connects Stripe, Supabase, and GoHighLevel automatically. Two scenarios handle the core payment and lead pipeline.

## Scenario 1 — Payment Pipeline

**Trigger:** Stripe `payment_intent.succeeded` event  
**What it does:** Creates paid client in Supabase + adds contact to GoHighLevel

### Build Steps

1. Go to [make.com](https://make.com) → New Scenario
2. Add **Module 1:** Stripe → Watch Events
   - Event type: `payment_intent.succeeded`
3. Add **Module 2:** Supabase → Insert Row
   - Table: `paid_clients`
   - Map fields from Stripe payment data
4. Add **Module 3:** GoHighLevel → Create/Update Contact
   - Map name, email, phone from checkout form
   - Add tag: `paid_client`, `tier2` (or appropriate tier)
5. Set schedule: Every 15 minutes
6. Turn on and test with a $1 test payment

## Scenario 2 — Cold Lead Pipeline

**Trigger:** Supabase new row in `closer_leads`  
**What it does:** Creates cold lead contact in GoHighLevel

### Build Steps

1. New Scenario → Supabase → Watch Rows
   - Table: `closer_leads`
   - Filter: `re_engaged = false`
2. Add Supabase → Get Row (get the matching audit_reports row for leak data)
3. Add GoHighLevel → Create Contact
   - Tag: `cold_lead`, `audit_done`
   - Custom field: `revenue_leak_low`, `revenue_leak_high`
4. Add GoHighLevel → Add to Pipeline
   - Pipeline: Cold Lead Recovery
   - Stage: Audit Complete

## Testing

After building both scenarios:

1. Complete a test audit on your site (don't buy)
2. Check Supabase `closer_leads` — should have 1 new row
3. Check Make.com scenario run history — should show success
4. Check GoHighLevel contacts — should have the test contact with `cold_lead` tag
