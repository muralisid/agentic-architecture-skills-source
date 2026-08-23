---
reader_summary: "Understand how security and identity changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","Security and identity lead"]
decision_or_output: "Choose which security and identity question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r10-security-and-identity/findings"
---

# R10: Security & identity

Status: complete (published 2026-08-19). Scope finalized at Batch B kickoff with maintainer POV; see findings.md and sources.md.

## Scope inventory (v0)

- **Identity**: non-human identity management as a discipline, agent identity lifecycle with Sponsor/Owner accountability, the Levels 1-3 taxonomy, delegation chains (user to agent to sub-agent) with purpose binding
- **Access**: OAuth on-behalf-of and token exchange, scoped short-lived credentials, RBAC/ABAC/ReBAC via policy engines, secrets vaulting, entitlement enforcement always outside the model
- **Threats**: prompt injection defense in depth, memory poisoning, tool supply chain vetting (MCP server provenance), sandbox escape, data exfiltration, endpoint and browser isolation for computer-use agents
- **Operations**: agent activity in SIEM/UEBA, incident response and kill switches, red teaming, audit at human-action granularity with tamper evidence

## Challenged-default candidates

Dedicated NHI security products vs extending the existing IAM estate; AI-firewall products vs layered controls at gateway and tool layer. Each track proposes its final list at kickoff.

## Files

`findings.md` and `sources.md` carry this track's research. The scoping brief and the vendor map were archived on 2026-08-23 (see `archive/`, decision D038).
