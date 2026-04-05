# Database Installation

## Overview

SystemForge AI uses Supabase (PostgreSQL) as its primary database.
The complete schema creates **13 tables** across 6 SQL blocks.

## Install Steps

### Step 1 — Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in with Google
3. Click **New Project**
4. Name: `systemforge-ai`
5. Set a strong database password — save it immediately
6. Region: **US East (North Virginia)**
7. Click **Create new project** — wait ~60 seconds

### Step 2 — Run the Schema

1. In Supabase → click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open `scripts/sql/schema.sql`
4. Copy and run **Block 1** → verify no errors
5. Repeat for Blocks 2 through 6 in order

> **Important:** Blocks must run in order (1→6) due to foreign key dependencies.
> If Block 3 fails, it means Block 2 did not complete successfully.

### Step 3 — Verify Tables

After all 6 blocks:

1. Click **Table Editor** in Supabase left sidebar
2. You should see these 13 tables:

```
agent_handoffs
audit_reports
audit_sessions
build_status_log
builder_conversations
chat_sessions
client_satisfaction
closer_leads
closer_outcomes
forge_conversations
leads
page_events
refund_log
support_tickets
```

### Step 4 — Get Your Keys

1. Supabase → Settings → API
2. Copy **Project URL** → save as `SUPABASE_URL`
3. Copy **anon / public key** → save as `SUPABASE_ANON_KEY`
4. Paste both into `public/js/sf-chat-widget.js`

---

## Table Relationships

```
leads (master)
  ├── chat_sessions
  │     └── agent_handoffs
  ├── forge_conversations
  ├── audit_sessions
  │     └── audit_reports
  │           └── closer_leads
  │                 └── closer_outcomes
  ├── paid_clients (from checkout)
  │     ├── builder_conversations
  │     ├── build_status_log
  │     ├── client_satisfaction
  │     └── support_tickets
  │           └── refund_log
  └── page_events
```

---

## Next Step

→ [Agent Specifications](../agents/forge.md)
