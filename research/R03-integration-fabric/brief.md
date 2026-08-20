---
reader_summary: "Review the scope, decision questions, and challenged defaults for the integration fabric before using the findings."
audience: ["Enterprise architect","Integration architecture lead","Research and assurance lead"]
decision_or_output: "Confirm the in-scope the integration fabric decisions and the questions the evidence must answer."
prerequisites: ["/docs/layers/r03-integration-fabric"]
reading_time: "2 minutes"
evidence_status: "Research scope and question set; this page does not itself establish the final architecture position."
next: "/docs/layers/r03-integration-fabric/findings"
---

# R03 Integration Fabric: research brief

Pilot track: this brief calibrated the template all remaining tracks follow.

Status: complete; published 2026-08-19
Scope finalized: 2026-08-19, after maintainer POV (kickoff questions 4-6)
Knowledge input: maintainer kickoff answers (estate composition, gateway-first MCP stance, four nominated debates)

## Scope (finalized inventory)

- Current estate: SOA and ESB heritage, API management, EDI and B2B, iPaaS, event backbone, workflow and BPM engines, RPA estate, legacy adapters (mainframe, file and batch)
- Agent-era: MCP tool layer and MCP gateways (distinct from LLM gateways), tool registries and connector catalogs, agent-to-agent protocols and cross-enterprise federation, the RPA-to-agent migration path
- Safe action: OAuth on-behalf-of and token exchange, idempotency and compensation patterns for agent-initiated actions, human-approval workflow integration, rate limiting
- Patterns: experience/process/system API layering, event-driven agent triggers, durable long-running orchestration

## Layer-specific questions (agreed at kickoff)

1. Is the four-part composite estate (load-bearing ESB legacy, partial API coverage, iPaaS and RPA sprawl, underused event backbone) the accurate current-state picture? (H16)
2. Is MCP ready to be the enterprise tool contract now, and under what controls? (H17: gateway-first)
3. What do the auth standards arriving around MCP (EMA/XAA, ID-JAG, token exchange) change about the gateway's role?
4. How do agent-initiated writes stay safe (idempotency, compensation, approvals)?

## Challenged defaults (nominated by maintainer, argued in findings)

- CD-2: dedicated MCP gateway products vs extending the API management layer
- CD-3: RPA estate: urgent replacement vs coexistence with agents supervising bots
- CD-4: agent-to-agent protocols now vs plain APIs until standards settle
- CD-5: legacy ESB: modernize as prerequisite vs bypass with a tool layer over systems of record
