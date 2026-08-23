---
reader_summary: "Compare intelligence and learning vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","AI engineering and model-risk lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for intelligence and learning; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r06-intelligence-and-learning/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r06-intelligence-and-learning/sources"
---

# R06 Intelligence and Learning: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| NVIDIA Data Flywheel Blueprint | Reference flywheel | Published Jun 2025 | The only fully documented enterprise flywheel with numbers; promotion stage is manual by design [vendor] |
| Databricks (Agent Bricks, Judge Builder; Quotient AI acquisition) | Platform flywheel | Acquisition Mar 2026 | Judge building aimed at domain experts without code [vendor] |
| Snowflake Cortex Agents; Microsoft Fabric; Google agent quality tooling | Platform | GA waves 2025-2026 | Optimizer-evaluator decoupling is the published architectural rule [vendor] |
| OpenAI reinforcement fine-tuning; on-policy distillation methods | Model adaptation | RFT GA May 2025 | Requires a programmable grader; wrong tool for style [vendor] |
| GEPA, ACE (research methods) | Prompt and context optimization | ICLR 2026 | The evidence that the cheap lever is rarely exhausted |

Agent-washing watch: "self-improving" agents whose improvement path is unlogged; optimization services that will not disclose the grader; benchmark claims without harness isolation.

---
