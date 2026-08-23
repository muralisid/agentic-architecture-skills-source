---
reader_summary: "Understand how intelligence and learning changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","AI engineering and model-risk lead"]
decision_or_output: "Choose which intelligence and learning question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r06-intelligence-and-learning/findings"
---

# R06: Intelligence & learning

Status: complete (published 2026-08-19). Scope finalized at Batch C kickoff with maintainer POV; see findings.md and sources.md.

## Scope inventory (v0)

- **Estate**: BI and dashboards, notebooks and data science platforms, feature stores, model registries, MLOps
- **Agent-era**: conversational analytics over metrics layers, LLMOps/AgentOps, eval infrastructure (golden datasets, LLM-as-judge, human review queues, regression gates), trace-to-dataset curation
- **Improvement machinery**: fine-tuning and distillation pipelines, A/B and canary rollout for agent changes, experiment tracking, classical ML (classifiers, topic models, forecasting) as the deterministic muscle next to LLMs
- **Risk**: model risk management alignment for regulated environments

## Challenged-default candidates

LLM-first analytics vs metrics-layer grounding; buying eval platforms vs building on open tooling. Each track proposes its final list at kickoff.

## Files

`findings.md` and `sources.md` carry this track's research. The scoping brief and the vendor map were archived on 2026-08-23 (see `archive/`, decision D038).
