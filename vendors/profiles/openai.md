---
reader_summary: "Assess OpenAI against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether OpenAI merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/vendors/profiles/gateways-and-identity"
---

# Vendor Profile: OpenAI

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

Model provider plus an agent build surface: the **Agents SDK**, **reinforcement fine-tuning** (GA May 2025) [vendor], and the enterprise agent platform positioning marketed as **Frontier**.

## How it answers the bank

**Evaluation and change (E).** Reinforcement fine-tuning is the notable capability, and the research's verdict on it is a scoping one: it requires a programmable grader, which makes it the right tool for objectively gradable tasks and the wrong tool for style. That is a useful, honest boundary and it maps directly onto the guide's position that domain SMEs own the eval bar.

**Interoperability (F).** MCP support. Agents SDK is one of the frameworks in general use, in a market where only around 18% of instrumented organisations use any recognised framework at all.

## Coverage

Core at R07 agent platform. Real at R06. Adjacent across the estate layers.

## Watchouts

- **This is the thinnest profile in the hub relative to the vendor's prominence, and that is a statement about available evidence rather than about the product.** The enterprise platform positioning is not established in the research to the standard the question bank asks for: identity model, memory portability, metering transparency and governance surfaces are not documented in the sources this guide collected. Ask sections A, C and D directly and record the answers with dates.
- The two-estate problem applies in its sharpest form to any licensed enterprise platform: work running there does not flow through your gateway, and your telemetry and cost visibility depend on what the vendor exports.

## Evidence status

The SDK and fine-tuning facts are vendor-published and documented. The enterprise platform's answers to the bank are not established here, and the guide declines to infer them from adjacent products.

## Sources

research/R07, R06 vendors.md and sources.md.
