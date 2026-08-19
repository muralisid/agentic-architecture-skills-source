# R03: Integration fabric

Status: complete (published 2026-08-19). Scope was finalized at kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Current estate**: SOA and ESB heritage, API management, EDI and B2B, iPaaS, event backbone, workflow and BPM engines, RPA estate, legacy adapters (mainframe, file and batch)
- **Agent-era**: MCP tool layer and MCP gateways (distinct from LLM gateways), tool registries and connector catalogs, agent-to-agent protocols and cross-enterprise federation, the RPA-to-agent migration path
- **Safe action**: OAuth on-behalf-of and token exchange, idempotency and compensation (saga) patterns for agent-initiated actions, human-approval workflow integration, rate limiting
- **Patterns**: experience/process/system API layering, event-driven agent triggers, durable long-running orchestration

## Challenged-default candidates

MCP gateway products vs extending existing API gateways; iPaaS agent connectors vs governed APIs; RPA replacement urgency vs coexistence. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
