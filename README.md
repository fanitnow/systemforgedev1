# SystemForge AI

> **Built in 48 hours. Running forever.**

AI-powered business systems audit and build platform. We diagnose broken business operations, quantify revenue leaks, and install automated systems that run without human intervention.

[![License](https://img.shields.io/badge/license-Proprietary-gold.svg)](./legal/legal.html)
[![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20Supabase%20%7C%20Claude%20API-black.svg)]()
[![Status](https://img.shields.io/badge/status-Live-brightgreen.svg)]()

---

## What This Is

SystemForge AI is a complete revenue-generating platform built for a solo operator. It consists of:

- A **live AI audit tool** that diagnoses any business in 7 minutes
- A **5-agent chat system** that handles sales, audits, onboarding, support, and recovery
- A **3-tier service model** ($97 / $750 / $2,500) with automated checkout and data capture
- A **full data pipeline** that stores every lead, audit, conversation, and payment permanently
- A **complete automation layer** that runs email sequences, upsells, and follow-ups without human input

---

## Quick Start

```bash
# 1. Download and unzip this folder
# 2. Open public/index.html in your browser — site is live locally
# 3. Follow docs/setup/01-environment.md to deploy to production
```

---

## Platform Architecture

```
User visits systemsforgeai.com
        ↓
    Free AI Audit (Claude API)
        ↓
  Lead captured → Supabase
        ↓
  Checkout → Stripe payment
        ↓
  Client created → GoHighLevel
        ↓
  Build delivered → Email via Resend
        ↓
  Retention sequences fire automatically
```

---

## Folder Structure

```
systemforge-ai/
├── public/                  # Live website files
│   ├── index.html           # Main site + AI audit tool
│   ├── js/
│   │   └── sf-chat-widget.js  # 5-agent chat system + data pipeline
│   ├── css/                 # Stylesheets (extracted)
│   └── assets/              # Images, fonts, icons
├── pages/                   # Internal platform pages
│   ├── checkout.html        # Payment + client intake
│   ├── dashboard.html       # Owner command center
│   ├── playbook.html        # First 5 clients outreach guide
│   ├── brand.html           # Logo + tagline system
│   ├── chatbox.html         # Standalone chat demo
│   └── data-setup.html      # Database setup guide
├── legal/                   # Legal documents
│   └── legal.html           # All 10 legal policies
├── scripts/                 # Database + automation scripts
│   ├── sql/
│   │   └── schema.sql       # Complete 13-table Supabase schema
│   ├── make/                # Make.com scenario configs
│   └── supabase/            # Edge functions + webhooks
├── docs/                    # Full documentation (GitHub-ready)
│   ├── setup/               # Environment + deployment guides
│   ├── agents/              # AI agent specifications
│   ├── schemas/             # Data schema references
│   ├── automation/          # Automation sequence specs
│   ├── brand/               # Brand guidelines
│   └── business/            # Business model + playbook
├── config/                  # Configuration files
│   ├── env.example          # Environment variables template
│   └── netlify.toml         # Netlify deployment config
└── .github/
    └── workflows/           # CI/CD automation
```

---

## Tech Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Frontend | HTML / CSS / JS | Platform UI — no framework needed |
| AI Engine | Anthropic Claude API | Audit tool + all 5 chat agents |
| Database | Supabase (PostgreSQL) | All data storage — 13 tables |
| Payments | Stripe | Checkout + webhooks |
| Automation/CRM | GoHighLevel | Email sequences + pipeline |
| Email Alerts | Resend | Transactional notifications |
| Hosting | Netlify | Static hosting + CDN |
| Automation Glue | Make.com | Stripe → Supabase → GHL sync |

---

## Service Tiers

| Tier | Product | Price | Delivery |
|------|---------|-------|----------|
| 1 | Audit Report | $97 | 24 hours |
| 2 | System Starter | $750 | 48–72 hours |
| 3 | Full System Build | $2,500 | 5–7 days |

---

## Documentation

See the [`docs/`](./docs/) folder for complete guides:

- [Environment Setup](./docs/setup/01-environment.md)
- [Deployment Guide](./docs/setup/02-deployment.md)
- [Database Installation](./docs/setup/03-database.md)
- [Agent Specifications](./docs/agents/)
- [Data Schemas](./docs/schemas/)
- [Automation Sequences](./docs/automation/)

---

## Legal

© 2026 SystemForge AI LLC · Houston, TX  
All rights reserved. See [legal/legal.html](./legal/legal.html) for full terms.
