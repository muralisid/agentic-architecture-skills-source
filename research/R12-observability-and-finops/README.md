# R12: Observability & FinOps

Status: complete (published 2026-08-19). Scope finalized at Batch B kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Telemetry**: OTel GenAI spans for model, tool, and memory, session replay and trace inspection, stable workload IDs
- **Quality in production**: groundedness drift monitoring, sampled in-production evals, SLOs (latency, success rate, containment), runaway-loop anomaly detection, alerting and paging
- **Cost**: token accounting, per-task and per-outcome unit economics, showback and chargeback, budget caps and alerts, cache effectiveness, capacity forecasting
- **Two-estate visibility**: pulling telemetry and audit out of licensed platforms into one view; value metrics (time saved, containment, throughput) proving ROI; supervisor dashboards (the factory-floor view)

## Challenged-default candidates

LLM observability products vs OTel-native extension of existing APM; per-agent cost dashboards vs per-outcome unit economics. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
