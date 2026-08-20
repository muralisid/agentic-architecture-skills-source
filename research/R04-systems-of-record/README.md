---
reader_summary: "Understand how systems of record changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","Enterprise applications lead"]
decision_or_output: "Choose which systems of record question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r04-systems-of-record/brief"
---

# R04: Core systems of record

Status: complete (published 2026-08-19). Scope finalized at Batch C kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Estate**: ERP, CRM, HRIS, ITSM, finance, procurement, billing/CPQ; the authority boundary (business authority stays with the system of record)
- **Embedded agents**: per-suite agent SKUs and ecosystems (Agentforce, Joule, Copilot in Dynamics, Oracle and Workday agents), their pricing and metering, data-gravity implications
- **External agents**: acting through governed APIs, write-access and approval-gate patterns, multi-suite orchestration when one task spans SAP, Salesforce, and ServiceNow
- **Readiness**: API maturity per suite, extension and low-code platforms meeting agents, master data quality as a precondition

## Challenged-default candidates

Embedded suite agents vs independent agents through APIs; per-suite agent ecosystems vs one cross-suite platform. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
