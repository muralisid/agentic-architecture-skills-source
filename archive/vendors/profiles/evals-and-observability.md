---
reader_summary: "Assess Evaluation and Observability against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether Evaluation and Observability merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "3 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/about-evidence"
---

# Category Profile: Evaluation and Observability

As of August 2026. The category that consolidated hardest in twelve months. Vendor-published facts flagged.

---

## The state of the category

**The evaluation and observability boundary dissolved.** Most named LLM-observability specialists are now inside larger platforms, and the products that remain independent sell both.

Documented movement: Langfuse acquired January 2026 with its MIT licence retained, having been used by 19 of the Fortune 50; Arize Phoenix, W&B Weave and Galileo absorbed across 2025 to 2026; a pending Dynatrace and Arize transaction announced 13 August 2026. Independents still raising: LangSmith at $125M on a $1.25B valuation (October 2025) and Braintrust at $80M on $800M (February 2026).

## How the category answers the bank

**E1, E2.** This is the layer that answers them. The path from production traces to eval datasets without manual export is the capability to require, and judge-building surfaces aimed at domain experts rather than engineers are the differentiator that matters, because domain SMEs own the eval bar.

**D3, D4.** Token accounting, per-agent attribution and budget caps live here or in the platform. Require enforcement, not alerting.

**C4.** Erasure cascades must reach traces and eval datasets. Ask this of observability vendors specifically; it is frequently overlooked because traces feel like telemetry rather than data.

## The standards problem, which is the most important fact in this profile

**OpenTelemetry GenAI semantic conventions are not stable as of mid-2026**: a new repository with no release. The practical consequence is concrete. Instrument through a translation layer rather than against the conventions directly, so that when they stabilise you change a mapping rather than your instrumentation. This is the single most important re-verification item in the observability track.

On the FinOps side, FOCUS 1.3 supplies split-cost allocation and token normalisation vocabulary is still forming.

## Watchouts

- **Self-assessment is not evidence.** Telemetry must be collected outside the agent's control. A vendor whose traces are emitted by the agent itself has built testimony, not observability.
- **Judges need governance.** Judge systems show systematic biases, agree with themselves more than they measure the intended property, and drift silently on hosted endpoints. Require calibration against human labels, version pinning, and decoupling of optimiser from evaluator.
- **Watch the fate of the open-source projects** inside acquired companies. Licence retention at acquisition is not a commitment to maintenance.
- **No published enterprise error-budget analog exists for agent quality.** Quality SLOs are an open pattern, not an established practice, and vendors claiming otherwise are ahead of the field.

## The one number to be careful with

A circulating funding story about one vendor in this category traced to an AI content farm and was contradicted by the verified acquisition record. The research recorded it on a do-not-cite list. Treat category funding and adoption claims from secondary sources with the same suspicion this guide applies to vendor capability claims.

## Sources

research/R12-observability-and-finops/ and research/R06-intelligence-and-learning/ vendors.md and sources.md.
