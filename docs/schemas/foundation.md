# Foundation Tables

These 4 tables are shared across all agents. They form the backbone of the data pipeline.

---

## `leads`

The master record for every person who interacts with the platform in any way.

**Created by:** Chat widget on first conversation  
**Updated by:** Any agent as the visitor progresses

| Field | Type | Description |
|-------|------|-------------|
| id | UUID PK | Auto-generated |
| created_at | TIMESTAMPTZ | First seen |
| updated_at | TIMESTAMPTZ | Last update (auto-trigger) |
| session_id | TEXT | Browser session identifier |
| name | TEXT | If provided in chat |
| email | TEXT | If provided |
| phone | TEXT | If provided |
| business_type | TEXT | Extracted by Forge or Scout |
| business_name | TEXT | If provided |
| lead_source | TEXT | dm / walk-in / organic / referral / ad / chat |
| intent_score | INTEGER (1–10) | AI-assigned qualification score |
| status | TEXT | new / warm / hot / converted / lost |
| last_agent | TEXT | Most recent agent handling this lead |
| converted | BOOLEAN | True when purchase confirmed |
| converted_at | TIMESTAMPTZ | Purchase timestamp |
| notes | TEXT | Internal owner notes |

---

## `chat_sessions`

One record per chat window opened. Links to the lead record.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID PK | Auto-generated |
| session_id | TEXT UNIQUE | Browser-generated session ID |
| lead_id | UUID FK | → leads.id |
| current_agent | TEXT | Active agent at session end |
| agents_visited | TEXT[] | All agents visited this session |
| source_url | TEXT | Page where chat opened |
| referrer | TEXT | Traffic source |
| device_type | TEXT | mobile / desktop / tablet |
| total_messages | INTEGER | Message count |
| duration_seconds | INTEGER | Session length |
| ended_at | TIMESTAMPTZ | When chat was closed |

---

## `agent_handoffs`

Every routing event — when one agent passes a visitor to another.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID PK | Auto-generated |
| session_id | TEXT FK | → chat_sessions.session_id |
| lead_id | UUID FK | → leads.id |
| from_agent | TEXT | Routing agent |
| to_agent | TEXT | Receiving agent |
| reason | TEXT | Why the handoff was triggered |
| trigger_message | TEXT | Message that caused the route |

---

## `page_events`

Lightweight analytics — page views, CTA clicks, audit starts.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID PK | Auto-generated |
| session_id | TEXT | Browser session |
| event_type | TEXT | page_view / cta_click / audit_start / report_shown / chat_open |
| page | TEXT | Which page |
| detail | TEXT | Additional context |
| lead_id | UUID FK | → leads.id (if known) |
