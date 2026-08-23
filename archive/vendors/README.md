---
reader_summary: "Use neutral questions and disqualifiers before reading vendor profiles, then compare coverage and adoption paths against the architecture."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Start a vendor evaluation with evidence requests and disqualifiers rather than a product shortlist."
prerequisites: ["/docs/frameworks/roadmap-checklist","/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Vendor-research index; profiles and market facts are time-sensitive and require primary-source verification."
next: "/docs/frameworks/vendor-question-bank"
---

# The Vendor Hub

As of August 2026. Phase 7. Built from the vendor map in each of the 14 research tracks, scored against a bank of questions written before any profile.

---

## Neutrality statement

This hub takes no money from any vendor and makes no recommendations. Every vendor-published claim is flagged. Every product fact carries an as-of date of August 2026 and sits on a quarterly re-verification list. Where the research could not establish an answer to the question bank, the profile says so rather than inferring it from an adjacent product, and one profile is conspicuously thin for exactly that reason.

The question bank was written and published **before** the profiles, which is the bias control. Read it first.

## Read in this order

1. [The question bank](../frameworks/vendor-question-bank.md). Thirty questions, each with what a good answer contains and what a bad answer sounds like.
2. [The scorecard](../frameworks/vendor-scorecard.md). Disqualifiers first, scores second, and the output is a profile rather than a total.
3. [The coverage matrix](coverage-matrix.md). Who genuinely does work at which of the 14 layers, distinguished from who claims to.
4. [Adoption pathways](adoption-pathways.md). What to take from your incumbent, where to stay independent, and what exit costs.
5. The profiles below.

## Profiles

| Profile | The one thing to know |
|---|---|
| [Microsoft](profiles/microsoft.md) | The strongest identity answers in the market, and the product that made this guide move the sponsor attribute to ID2 access identity |
| [Salesforce](profiles/salesforce.md) | Permission parity between embedded and external paths is stated. Agents do not pause before consequential actions by default |
| [ServiceNow](profiles/servicenow.md) | The most credible cross-estate governance product in the research, which is also a strategic dependency at the layer you wanted neutral |
| [SAP](profiles/sap.md) | Embedded-only by policy. That is an architecture constraint on your whole estate, not a product limitation |
| [AWS](profiles/aws.md) | The strongest runtime answer, including no CPU charge during input and output wait, which matters because agents mostly wait |
| [Google](profiles/google.md) | AP2 supplies both the deterministic-boundary pattern and its sharpest limit, from the same vendor |
| [Anthropic](profiles/anthropic.md) | The strongest structural interoperability answer, because MCP and Agent Skills are standards rather than products |
| [OpenAI](profiles/openai.md) | The thinnest profile here relative to prominence, which is a statement about available evidence, not about the product |
| [Gateways and identity](profiles/gateways-and-identity.md) | Extend your API management by default; buy dedicated conditionally. The gateway layer is itself attackable |
| [Evaluation and observability](profiles/evals-and-observability.md) | OpenTelemetry GenAI conventions are not stable. Instrument through a translation layer |

## The two facts that date this hub fastest

**Consolidation.** Security absorbed the AI detection and response specialists across six named acquisitions. Observability absorbed the evaluation specialists, and the boundary between the two dissolved. A best-of-breed choice at these layers is a bet on independence or on a favourable acquisition; both are legitimate and neither should be accidental.

**Standards in motion.** MCP is broadly adopted. A2A reached v1.0 stable with 150-plus organisations and thin production evidence. Agent Skills is the one artifact that genuinely ports. OpenTelemetry GenAI conventions are not stable. Open Semantic Interchange reached v1 under Apache-2.0 in January 2026.

## Corrections carried forward

Two circulating claims were investigated and rejected during this research, and are recorded so they are not repeated: a funding story about an observability vendor that traced to an AI content farm and was contradicted by the verified acquisition record, and a single-versus-multi-agent token comparison that was a misreading of a benchmark paper's domain fingerprint.
