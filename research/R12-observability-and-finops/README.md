---
reader_summary: "Understand how observability and FinOps changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","Operations and FinOps lead"]
decision_or_output: "Choose which observability and FinOps question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r12-observability-and-finops/findings"
---

# R12: Observability & FinOps

Status: complete (published 2026-08-19). Scope finalized at Batch B kickoff with maintainer POV; see findings.md and sources.md.

## Scope inventory (v0)

- **Telemetry**: OTel GenAI spans for model, tool, and memory, session replay and trace inspection, stable workload IDs
- **Quality in production**: groundedness drift monitoring, sampled in-production evals, SLOs (latency, success rate, containment), runaway-loop anomaly detection, alerting and paging
- **Cost**: token accounting, per-task and per-outcome unit economics, showback and chargeback, budget caps and alerts, cache effectiveness, capacity forecasting
- **Two-estate visibility**: pulling telemetry and audit out of licensed platforms into one view; value metrics (time saved, containment, throughput) proving ROI; supervisor dashboards (the factory-floor view)

## Challenged-default candidates

LLM observability products vs OTel-native extension of existing APM; per-agent cost dashboards vs per-outcome unit economics. Each track proposes its final list at kickoff.

## Files

`findings.md` and `sources.md` carry this track's research. The scoping brief and the vendor map were archived on 2026-08-23 (see `archive/`, decision D038).
