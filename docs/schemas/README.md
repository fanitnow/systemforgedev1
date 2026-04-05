# Data Schemas — Index

Complete reference for all 13 database tables across the SystemForge AI platform.

## Schema Categories

| Category | Tables | Agent |
|----------|--------|-------|
| [Foundation](./foundation.md) | leads, chat_sessions, agent_handoffs, page_events | All agents |
| [Forge](./forge-schema.md) | forge_conversations | Forge |
| [Scout](./scout-schema.md) | audit_sessions, audit_reports | Scout |
| [Builder](./builder-schema.md) | builder_conversations, build_status_log, client_satisfaction | Builder |
| [Guard](./guard-schema.md) | support_tickets, refund_log | Guard |
| [Closer](./closer-schema.md) | closer_leads, closer_outcomes | Closer |

## Key Design Decisions

### UUIDs as Primary Keys
Every table uses `UUID DEFAULT gen_random_uuid()` as the primary key. This ensures global uniqueness across tables and makes cross-referencing safe.

### JSONB for Conversations
All conversation arrays are stored as `JSONB` (binary JSON) rather than `TEXT`. This allows querying specific messages, filtering by role, and indexing message content.

### session_id as the Thread
The `session_id` is a browser-generated string that links all tables for a single visitor session. It is set once when the chat widget loads and propagates through every insert.

### Soft Deletes
No table uses `DELETE`. Records are deactivated via status fields (`status = 'archived'`). This preserves the full audit trail.

### Automatic Triggers
Two database triggers run automatically:
- `leads_updated_at` — updates `updated_at` on every lead change
- `auto_flag_closer_lead` — creates a `closer_leads` row when `audit_reports.report_shown = true AND converted = false`

## Full Schema File

The complete SQL for all 13 tables is in:
```
scripts/sql/schema.sql
```

Run this file in Supabase SQL Editor (Blocks 1–6 in order).
