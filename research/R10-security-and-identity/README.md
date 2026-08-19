# R10: Security & identity

Status: complete (published 2026-08-19). Scope finalized at Batch B kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Identity**: non-human identity management as a discipline, agent identity lifecycle with Sponsor/Owner accountability, the Levels 1-3 taxonomy, delegation chains (user to agent to sub-agent) with purpose binding
- **Access**: OAuth on-behalf-of and token exchange, scoped short-lived credentials, RBAC/ABAC/ReBAC via policy engines, secrets vaulting, entitlement enforcement always outside the model
- **Threats**: prompt injection defense in depth, memory poisoning, tool supply chain vetting (MCP server provenance), sandbox escape, data exfiltration, endpoint and browser isolation for computer-use agents
- **Operations**: agent activity in SIEM/UEBA, incident response and kill switches, red teaming, audit at human-action granularity with tamper evidence

## Challenged-default candidates

Dedicated NHI security products vs extending the existing IAM estate; AI-firewall products vs layered controls at gateway and tool layer. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
