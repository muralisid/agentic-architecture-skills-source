# R07: Agent platform

Status: complete (published 2026-08-19). Scope finalized at Batch D kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Build**: SDKs and frameworks, planner and multi-agent topologies, routing tiers (skill selector, classifier, LLM router, fallback), prompt and context management, compaction
- **Run**: session and event-log architecture (brain/hands/session decoupling), tiered memory services, guardrail integration points, per-run budgets and circuit breakers, human-in-the-loop primitives (approval queues)
- **Govern**: agent catalog with owner and risk tier, skill and tool catalogs, model catalog, publication workflow (build, approve, stage, rollback, retire), versioning, developer portal
- **Sourcing**: build on primitives vs managed platforms (Frontier, Agent 365, Agentforce) vs hybrid; portability and exit strategy

## Challenged-default candidates

Multi-agent frameworks vs a single well-built loop; managed coworker platforms vs composable primitives. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
