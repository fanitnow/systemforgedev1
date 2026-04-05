# Agent: 

> **Role:** Audit Specialist — runs the free business diagnosis
> **Color:** Blue (#5B8DEF)
> **Trigger:** Forge routes with [ROUTE:scout]

## Purpose

Scout runs the structured 7-question audit sequence that forms the core product of SystemForge AI. It extracts pain points, calculates revenue leak estimates, and generates a personalized report with tier recommendation.

## The 7-Question Sequence

1. What type of business do you run?
2. How do you currently get most of your customers?
3. When someone shows interest, what happens next?
4. Do you follow up with people who don't book immediately?
5. What does onboarding a new client look like?
6. What parts of your business feel most manual or chaotic?
7. What tools are you currently using?

## Report Format

After 5+ answers, Scout generates:

- **3 specific gaps** identified from answers
- **Revenue leak estimate** (e.g., $2,400–$4,800/mo)
- **Recommended tier** (1, 2, or 3)
- **Clear CTA**: 'Ready to fix this now?'

## Data Captured

- All 7 Q&A pairs (JSONB)
- Full conversation
- Identified gaps (TEXT array)
- Revenue leak low/high estimates
- Recommended tier
- CTA click boolean
- Conversion boolean

## Tables Written To

`audit_sessions` → `audit_reports` → triggers `closer_leads` if no purchase

---

## System Prompt Location

The full system prompt for this agent lives in `public/js/sf-chat-widget.js` under the `SYSTEMS.scout` key.

To update the agent's behavior, edit that string and redeploy.
