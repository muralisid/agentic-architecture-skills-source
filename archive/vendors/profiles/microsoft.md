---
reader_summary: "Assess Microsoft against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether Microsoft merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "3 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/vendors/profiles/salesforce"
---

# Vendor Profile: Microsoft

As of August 2026. Answers to the question bank where the research establishes them. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

The widest genuine footprint in the guide's coverage matrix. Four surfaces matter: **Microsoft 365 Copilot** (the horizontal assistant), **Agent 365** (the governance plane, GA 1 May 2026, $15 per user per month standalone [vendor]), **Entra Agent ID** (agent identity, preview May 2025 [vendor]), and **Azure AI Foundry** plus **Microsoft Agent Framework** (the build and run surface; framework 1.0 GA April 2026, with the surface still moving through July 2026 [vendor]).

## How it answers the bank

**Identity (A).** The strongest answers in the market. Agent identities became mandatory on the collaboration surfaces from July 2026 [vendor], the identity architecture encodes the access-versus-presence split directly, and the sponsor construct is productised in Entra ID Governance with automatic transfer and access expiry [vendor]. This is the product that made the guide's D019 revision necessary: the sponsor attribute exists at ID2 access identity, so ID3 presence is not required to obtain accountability.

**Determinism (B).** Deterministic information-flow control shipped in Agent Framework, with published results of zero policy-violating injections on a standard benchmark against 20 to 152 without it. That is a genuinely differentiated answer to B2.

**Memory and exit (C, F).** Purview handles evidence retention across the Microsoft estate [vendor]. The exit question is the weak one, as it is for every platform in this market: memory portability has no standard and no published migration.

**Economics (D).** Per-user rather than per-agent pricing on the governance plane. This is the answer to D5 that buyers most often miss: per-user licensing removed the cost brake that used to limit presence identity, so proliferation is now a governance problem rather than a budget one.

## Coverage

Core at R08 productivity, R10 identity, R07 agent platform. Real at R01, R02 (Fabric), R03, R06, R11 (Purview), R12, R13 (sponsors). Adjacent at R04 outside Dynamics, R05, R14.

## Watchouts

- **Agent 365's registry sync with other clouds was announced without coverage for the systems-of-record vendors' own agents** [vendor]. If your estate runs Agentforce or Joule agents, confirm what the governance plane actually sees before treating it as one pane of glass.
- Framework churn is the cost of buying in early: Agent Framework merged two predecessors and its surface was still moving a quarter after 1.0.
- Paid attach for the horizontal assistant runs at roughly 4 to 6% of the installed base, and 66% of Copilot deployers run at least two other enterprise AI assistants (Gartner, June 2026). Gravity here shapes the shortlist, not the outcome.

## Evidence status

Identity and governance claims are well documented and partly third-party corroborated. Adoption figures are vendor-derived through earnings coverage. The information-flow-control result is vendor-published against a public benchmark.

## Sources

research/R08, R10, R07, R11, R12, R13 vendors.md and sources.md.
