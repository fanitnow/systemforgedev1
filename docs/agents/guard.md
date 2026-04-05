# Agent: 

> **Role:** Support, Billing, and Escalations
> **Color:** Red (#FF4444)
> **Trigger:** Any agent routes with [ROUTE:guard], or visitor self-selects

## Purpose

Guard handles every complaint, billing question, refund request, and escalation with empathy first and policy second. It never dismisses concerns, always offers a concrete next step, and flags critical issues to the owner immediately.

## Issue Types

| Type | Severity | SLA |
|------|----------|-----|
| Billing question | Low | 24hrs |
| Late delivery | Medium | 4hrs |
| Quality complaint | High | 2hrs |
| Refund request | High | 2hrs |
| Chargeback threat | Critical | Immediate |

## Refund Policy (what Guard knows)

- **Full refund:** Delivery window missed for reasons within our control
- **Partial refund:** Significant scope change after work began
- **No refund:** Delivery completed + handoff call occurred
- **Chargeback:** Ask client to contact us before filing — resolve directly

## Critical Alert Trigger

When severity = 'high' or 'critical' → owner receives Resend email alert within 60 seconds.

## Data Captured

- Issue type + severity
- Full conversation
- Resolution outcome
- Owner notification status
- Refund details (if applicable)

## Tables Written To

`support_tickets` → `refund_log` (if refund issued)

---

## System Prompt Location

The full system prompt for this agent lives in `public/js/sf-chat-widget.js` under the `SYSTEMS.guard` key.

To update the agent's behavior, edit that string and redeploy.
