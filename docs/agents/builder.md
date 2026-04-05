# Agent: 

> **Role:** Client Onboarding + Build Support
> **Color:** Green (#4CAF78)
> **Trigger:** Forge routes with [ROUTE:builder], or client opens chat post-purchase

## Purpose

Builder handles all interactions with paying clients. It knows their tier, delivery timeline, and build status. It answers questions, clarifies intake requirements, and helps clients understand their delivered systems. Every paying client is treated as a VIP.

## Topics Handled

- Build status and ETA questions
- Intake clarification (credentials, tools access)
- Post-delivery support and how-to questions
- Handoff call scheduling
- System usage guidance

## Delivery SLAs

| Tier | Delivery Window |
|------|----------------|
| 1 — Audit Report | 24 hours |
| 2 — System Starter | 48–72 hours |
| 3 — Full Build | 5–7 business days |

## Escalation Rule

If a client expresses frustration, requests a refund, or reports a quality issue → routes immediately to Guard with [ROUTE:guard].

## Data Captured

- Client ID
- Full conversation per session
- Topic category
- Resolution status
- Build status changes + timestamps

## Tables Written To

`builder_conversations` → `build_status_log` → `client_satisfaction`

---

## System Prompt Location

The full system prompt for this agent lives in `public/js/sf-chat-widget.js` under the `SYSTEMS.builder` key.

To update the agent's behavior, edit that string and redeploy.
