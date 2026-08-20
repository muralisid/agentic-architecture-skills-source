---
reader_summary: "Assess Anthropic against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether Anthropic merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/vendors/profiles/openai"
---

# Vendor Profile: Anthropic

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

Model provider plus a build surface: the **Claude Agent SDK**, **MCP** (published as an open standard and now the connective tissue of the category), **Agent Skills** in an open format, and an open-sourced **sandbox-runtime** with proxy-enforced domain allowlists (October 2025) [vendor].

## How it answers the bank

**Interoperability (F).** The strongest structural answer in the market, and it is structural rather than commercial: MCP is an open standard rather than a product, and Agent Skills is the one artifact the research found that genuinely ports across vendors. F3, which asks which parts of your configuration are expressible outside the product, has an unusually good answer here.

**Determinism and control (B).** The published engineering guidance is a substantive input to this guide's own positions: building effective agents, context engineering, harness design for long-running agents, and a graduated-trust framework. The sandbox runtime is open source, so the isolation claim is inspectable rather than asserted.

**Economics (D2).** Published loop-multiplier figures (roughly 4x for single agents, 15x for multi-agent) originate here and are vendor-published. They are the numbers this guide uses, flagged as such, because no independent measurement exists.

## Coverage

Core at R07 agent platform (SDK, harness patterns) and R03 integration fabric (MCP as the standard). Real at R01 (sandbox tooling), R06, R14. Adjacent at the estate layers, which this vendor does not attempt.

## Watchouts

- Deliberately narrow footprint. This vendor supplies models, a build surface and standards, and leaves identity, governance, records and channels to others. That is a coherent position and it means the coverage matrix's Adjacent cells are integration work you own.
- MCP's openness is a category benefit rather than a vendor lock-in relief for this vendor specifically. Do not read standard authorship as a portability guarantee for anything else.

## Evidence status

Standards and open-source claims are inspectable. Engineering guidance is vendor-published and widely adopted. The loop-multiplier figures are vendor-published with no independent replication.

## Sources

research/R07, R03, R01, R14 vendors.md and sources.md; GLOSSARY.md for the loop multiplier.
