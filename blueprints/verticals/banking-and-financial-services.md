# Vertical Blueprint: Banking and Financial Services

As of August 2026. Phase 6. The richest regulatory material in the guide, and the vertical where the deterministic boundary was proved rather than argued.

---

## 1. The scenario

A retail and commercial bank runs core banking, a customer servicing estate across branch, contact centre and digital, payments infrastructure, a lending origination and servicing chain, and a control stack covering financial crime, model risk, operational resilience and conduct. Every one of those is regulated, and three of them are regulated by different regulators with different reporting timelines.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Servicing agent | Handles narrow, recoverable customer intents within the customer's own scope | A3, L2 | Customer-facing lane, full control set |
| Financial crime investigation agent | Assembles alert context, retrieves history, drafts the narrative, proposes disposition | A3 on disposition proposal, L2 | The strongest internal case in the vertical: alert volume is high, the labels are real, and the analyst stays the decider |
| Credit file assembly agent | Gathers, validates and structures the evidence a credit decision requires | A3, L1 | Assembles evidence. Does not decide credit |
| Regulatory reporting draft agent | Drafts narrative against governed numbers | A1 to A2, L1 | Drafts. Attestation is deterministic and human |
| Payment exception agent | Investigates failed and returned payments, proposes remediation | A3, L2 | Remediation executes through mandate-bound authorisation |

## 3. Planes activated

Control (**direct**: two deterministic zones plus model risk management), Evidence (**direct**: several regimes at once), Knowledge (**direct**), Action (**direct**), Human (**direct**), Improvement (**direct**), Execution (**direct**: sovereignty and classification routing).

## 4. Controls

- **Movement of money is deterministic.** Authorisation is a rule over verifiable credentials and scoped mandates; fraud and anomaly models feed it as advisory input. This is not a constraint the guide invented for banks: card networks already work this way, and the 2025 to 2026 agentic payment stack was built independently by three networks, each landing on scoped, revocable, cryptographically bound mandates consumed by deterministic authorisation.
- **Formal regulatory records are deterministic.** Records regimes mandate accountability and immutable records rather than deterministic generation. Drafting is permitted, attestation is not delegable.
- **Credit and creditworthiness assessment is Annex III high-risk** under the EU AI Act, with obligations deferred to 2 December 2027. Deferral moves the deadline, not the classification work, and standards lead times run beyond twelve months.
- Model risk management alignment, which most banks already operate and which absorbs agent governance more cleanly than a parallel AI committee.
- Operational resilience duties (DORA-class) apply to the agent platform as a critical service, including third-party concentration risk on model providers.
- Article-12-grade instrumentation for the plausibly high-risk tier; evidence floor everywhere else.

## 5. Economics

**Per run.** Higher than average: investigation work is retrieval-heavy with wide tool fan-out.

**Per resolved outcome.** Cost per alert dispositioned, per case closed, per payment exception cleared, each including the analyst's review minutes. The compliance cost is proportional to classification plausibility, not uniform, which is the point of the tiered posture.

**The unusual term.** In this vertical, the cost of a wrong outcome is frequently a regulatory finding rather than a customer refund, and that term dominates the model. A business case that omits it is not conservative, it is wrong.

## 6. Honest limits

- **Deterministic authorisation does not protect intent formation.** One of the agentic payment protocols was successfully red-teamed via prompt injection operating entirely within mandate bounds. The gate bounds the blast radius; upstream injection defence and human confirmation of intent remain necessary.
- No published production case exists of an agent holding autonomous credit or payment authority in a regulated bank.
- Financial crime disposition automation faces a supervisory expectation of human accountability that no published deployment has displaced.
- The multi-agent incident reporting gap bites hardest here: when several agents contribute to one incident across jurisdictions, no regulation or standard says who reports what.

## 7. Metrics

Alert disposition rate and quality-assurance failure rate together. False-positive reduction measured against a held-out baseline rather than against the prior year. Analyst review minutes per alert. Payment exception clear rate and duplicate-action rate. Evidence-pack completeness for the plausibly high-risk tier. Regulatory finding count, which is the metric that actually governs.

## Sources

research/R10-security-and-identity/ (deterministic zones, payment stack, intent-formation caveat), research/R11-governance-risk-sovereignty/ (Annex III, Omnibus, records regimes, resilience), research/R04-systems-of-record/, research/R09-experience-and-channels/, research/R06-intelligence-and-learning/ (model risk alignment).
