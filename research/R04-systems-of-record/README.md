# R04: Core systems of record

Status: not started. Scope below is the v0 inventory; it is finalized at track kickoff with maintainer POV questions before research begins (see CLAUDE.md working protocol).

## Scope inventory (v0)

- **Estate**: ERP, CRM, HRIS, ITSM, finance, procurement, billing/CPQ; the authority boundary (business authority stays with the system of record)
- **Embedded agents**: per-suite agent SKUs and ecosystems (Agentforce, Joule, Copilot in Dynamics, Oracle and Workday agents), their pricing and metering, data-gravity implications
- **External agents**: acting through governed APIs, write-access and approval-gate patterns, multi-suite orchestration when one task spans SAP, Salesforce, and ServiceNow
- **Readiness**: API maturity per suite, extension and low-code platforms meeting agents, master data quality as a precondition

## Challenged-default candidates

Embedded suite agents vs independent agents through APIs; per-suite agent ecosystems vs one cross-suite platform. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
