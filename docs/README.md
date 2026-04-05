# Documentation Index

Complete documentation for the SystemForge AI platform. Every file is GitHub-ready markdown.

---

## Setup & Deployment

| File | Description |
|------|-------------|
| [01-environment.md](./setup/01-environment.md) | Prerequisites, accounts, and key collection |
| [02-deployment.md](./setup/02-deployment.md) | Netlify hosting + custom domain setup |
| [03-database.md](./setup/03-database.md) | Supabase schema installation + verification |
| [04-make-automation.md](./setup/04-make-automation.md) | Make.com scenario build guide |

---

## AI Agents

| File | Agent | Role |
|------|-------|------|
| [README.md](./agents/README.md) | All agents | Agent matrix + routing logic |
| [forge.md](./agents/forge.md) | Forge | Sales qualifier |
| [scout.md](./agents/scout.md) | Scout | Audit specialist |
| [builder.md](./agents/builder.md) | Builder | Client onboarding |
| [guard.md](./agents/guard.md) | Guard | Support + billing |
| [closer.md](./agents/closer.md) | Closer | Sales recovery |

---

## Data Schemas

| File | Tables | Description |
|------|--------|-------------|
| [README.md](./schemas/README.md) | All 13 tables | Schema overview + design decisions |
| [foundation.md](./schemas/foundation.md) | leads, chat_sessions, agent_handoffs, page_events | Shared foundation |
| [forge-schema.md](./schemas/forge-schema.md) | forge_conversations | Forge data |
| [scout-schema.md](./schemas/scout-schema.md) | audit_sessions, audit_reports | Scout data |
| [builder-schema.md](./schemas/builder-schema.md) | builder_conversations, build_status_log, client_satisfaction | Builder data |
| [guard-schema.md](./schemas/guard-schema.md) | support_tickets, refund_log | Guard data |
| [closer-schema.md](./schemas/closer-schema.md) | closer_leads, closer_outcomes | Closer data |

---

## Automation

| File | Description |
|------|-------------|
| [README.md](./automation/README.md) | Automation stack overview + data flow |
| [tier-1-sequence.md](./automation/tier-1-sequence.md) | $97 Audit Report post-purchase sequence |
| [tier-2-sequence.md](./automation/tier-2-sequence.md) | $750 System Starter post-purchase sequence |
| [tier-3-sequence.md](./automation/tier-3-sequence.md) | $2,500 Full Build post-purchase sequence |
| [cold-lead-sequence.md](./automation/cold-lead-sequence.md) | Re-engagement for audit no-purchase |
| [make-scenarios.md](./automation/make-scenarios.md) | Make.com scenario configurations |
| [supabase-webhooks.md](./automation/supabase-webhooks.md) | Supabase webhook configurations |

---

## Brand

| File | Description |
|------|-------------|
| [README.md](./brand/README.md) | Colors, typography, logo, brand rules |

---

## Business

| File | Description |
|------|-------------|
| [README.md](./business/README.md) | Service tiers, revenue targets, operating costs |
| [outreach.md](./business/outreach.md) | First 5 clients strategy + objection handling |

---

## Platform Files

| File | Location | Description |
|------|----------|-------------|
| Main site | `public/index.html` | Landing page + AI audit tool |
| Chat widget | `public/js/sf-chat-widget.js` | 5-agent system + data pipeline |
| Checkout | `pages/checkout.html` | Payment + client intake |
| Dashboard | `pages/dashboard.html` | Owner command center |
| Playbook | `pages/playbook.html` | Outreach guide |
| Legal | `legal/legal.html` | All 10 legal policies |
| Schema | `scripts/sql/schema.sql` | Complete database schema |
| Env template | `config/env.example` | Environment variables |
| Netlify config | `config/netlify.toml` | Deployment configuration |

---

*© 2026 SystemForge AI LLC · Houston, TX*
