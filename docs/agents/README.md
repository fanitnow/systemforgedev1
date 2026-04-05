# AI Agents — Index

SystemForge AI uses 5 specialized AI agents powered by the Claude API. Each agent has a defined role, routing logic, behavior rules, and dedicated data schema.

## Agent Matrix

| Agent | Role | Color | Trigger | Tables |
|-------|------|-------|---------|--------|
| [Forge](./forge.md) | Sales Qualifier | Gold | Every new chat | forge_conversations, leads |
| [Scout](./scout.md) | Audit Specialist | Blue | Free audit request | audit_sessions, audit_reports |
| [Builder](./builder.md) | Client Onboarding | Green | Post-purchase | builder_conversations, build_status_log |
| [Guard](./guard.md) | Support + Billing | Red | Complaint/refund | support_tickets, refund_log |
| [Closer](./closer.md) | Sales Recovery | Purple | Warm lead re-entry | closer_leads, closer_outcomes |

## Routing Flow

```
Every visitor → Forge (qualifier)
                    ↓
        ┌───────────┼───────────┬──────────┐
        ↓           ↓           ↓          ↓
      Scout      Builder      Guard     Closer
   (audit)    (onboarding)  (support) (recovery)
        ↓           ↓           ↓          ↓
    audit_      build_      support_   closer_
    reports   status_log   tickets    outcomes
```

## Adding a New Agent

1. Add agent config to `AGENTS` object in `sf-chat-widget.js`
2. Add system prompt to `SYSTEMS` object
3. Add greeting to `GREETINGS` object
4. Add quick replies to `QUICK_REPLIES` object
5. Create SQL table in `scripts/sql/schema.sql`
6. Add pipeline capture method to `_sfPipeline` object
7. Document in `docs/agents/[agent-name].md`

## System Prompt Guidelines

All agent system prompts follow these rules:

- Maximum 3–4 sentences per response
- Ask ONE question at a time
- Use `[ROUTE:agentname]` for handoffs
- Results-focused language only
- No corporate jargon or buzzwords
- Sound like a sharp consultant, not a chatbot
