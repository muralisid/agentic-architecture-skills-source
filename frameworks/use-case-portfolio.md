---
reader_summary: "Choose which agent use cases deserve funding by gating for evaluability, deterministic safety, and grounding before comparing outcome economics."
audience: ["CIO/CTO", "Enterprise architect", "Portfolio and transformation lead"]
decision_or_output: "Produce a quarterly admit, make-evaluable, redesign-or-reject, or prepare-grounding decision for every candidate use case."
prerequisites: ["/docs/frameworks/readiness-assessments"]
reading_time: "10 minutes"
evidence_status: "Evidence-informed author framework; cited findings support the gates, while weights and example values remain enterprise-specific."
next: "/docs/architecture/autonomy-contract"
---

# The Use-Case Portfolio Framework

As of August 2026. Phase 5 deliverable. Which use cases get budget this quarter, and which do not.

---

## Why this comes before platform choice

Platform selection is downstream of the use-case portfolio and is usually run upstream of it, which is how enterprises buy a capability and then look for something to do with it. The winning use cases determine where the data gravity is, which permission model matters, which pricing regime you are exposed to, and how much supervision capacity you need. Choose them first.

## Evaluability is a gate, not a score

**The primary sort is evaluability: can a domain expert write twenty to fifty pass-or-fail tasks from real failures for this use case?**

This is a gate rather than a weighted criterion, and the distinction is the whole framework. A weighted criterion lets a high-value use case with unmeasurable success outrank a modest one with a clean success definition, and that trade is exactly how programmes end up unable to improve. Without evaluability there is no eval suite; without an eval suite there is no learning loop, no promotion gate, no staged rollout and no honest claim about reliability. Everything the A x L model calls L2 rests on it.

The supporting evidence is the failure data rather than a preference: only a minority of practitioner teams run online evals at all, the most-cited analysis of AI programme failure attributes it to the learning gap rather than model quality, and the promotion-gate study found automated gates erring in both directions when the eval basis was weak.

**What happens to a valuable use case that fails the gate.** It does not get rejected and it does not get funded. It goes to the *make-it-evaluable queue*, and the funded work is defining success: getting a domain SME to write the tasks, instrumenting the current human process to produce a baseline, and finding the real failures the tasks should encode. That work is cheap relative to building the agent and it is the highest-return spend in an immature programme. Fund the definition, not the agent.

## The three admission gates

A use case is fundable this quarter only if it passes all three.

**Gate 1: Evaluability.** A domain SME can write twenty to fifty pass-or-fail tasks drawn from real failures, and a baseline exists or can be measured. Domain SMEs own this bar, not the platform team.

**Gate 2: Deterministic-zone check.** Does the use case require a decision inside access control, movement of money, safety actuation, or a formal regulatory record? If yes, it is fundable only in a redesigned form where the model informs and a deterministic rule decides. If the value of the use case depends on the model making that decision, reject it. This gate exists to stop a class of proposal that is attractive, expensive and unshippable.

**Gate 3: Grounding readiness.** A curated corpus with a named owner either exists or can exist within the funding period, scoped to this use case rather than to a source system. Corpus size is not the measure: growing a corpus from 54 to over 1,100 uncurated documents dropped accuracy from 75% to under 40% until domain scoping fixed it.

## Scoring what survives the gates

```
priority  =  (value per resolved outcome  x  outcomes per quarter)
             / cost per resolved outcome
             x  reversibility factor
```

- **Value per resolved outcome** in the currency the function manages. For operational and field work that is specialist hours, avoided truck rolls and deferred replacement, not tokens.
- **Cost per resolved outcome** is Level 2 of the economics model, including supervision labour and the cost of wrong outcomes. Using cost per run here is the most common way a portfolio gets built on a number that is not the number.
- **Reversibility factor** discounts use cases whose failures are expensive to undo: 1.0 where a wrong outcome is caught and corrected internally, falling sharply where a wrong outcome is externally binding. A tribunal has held a company responsible for what its chatbot told a customer, and a 2026 appellate decision held that general disclaimers do not provide sufficient protection.

Rank on the score. Do not adjust the ranking for enthusiasm, executive sponsorship or vendor availability. If those pressures need a channel, give them one at the portfolio-constraint step below, where the trade is visible.

## Portfolio-level constraints

Ranking alone produces a portfolio that cannot be run. Three constraints apply across the whole set rather than to any single use case.

**1. Supervision capacity is shared and finite.** This is the constraint most often missed. The oversight-capacity gate applies at portfolio level, not only per workload: five approved A3 workloads each consuming a third of one supervisor's burst capacity do not fit inside one supervisor, and the arithmetic is never done because each workload was approved separately. Calculate the burst-rate load of the whole approved set against the people who will actually hold it.

**2. Do not fund a portfolio that sits in one plane.** A quarter of use cases that all need the knowledge plane and none that exercise the control or evidence planes produces good demos and no platform. Deliberately fund at least one use case that forces the plane you are weakest in.

**3. Balance blast radius.** A portfolio entirely made of low-consequence use cases never builds the controls needed for consequential ones, and a portfolio weighted to high-consequence work outruns the evidence. The internal-first recommendation is this constraint applied over time rather than a claim that internal work is more valuable.

## Kill criteria, written at funding time

Every funded use case carries its kill criteria before work starts, because kill criteria written after a programme is underway are negotiated rather than applied. The minimum set:

- Eval pass rate fails to reach the agreed threshold within the funding period.
- Cost per resolved outcome does not converge toward the target trajectory.
- Supervision load per item does not fall, or intervention rate rises without a corresponding autonomy expansion. Note the asymmetry: rising interventions **with** expanding standing permission is calibrated oversight working correctly, and is not a kill signal.
- The corpus owner role goes unfilled for the period.

Stopping is a normal outcome and should be reported as one. Roughly three quarters of surveyed organisations have already rolled back or shut down a customer-facing agent after a governance failure, and the rate rises among organisations with mature guardrails, which says maturity correlates with catching failures rather than avoiding them.

## Cadence

Run the portfolio quarterly. Re-rank every quarter with measured rather than estimated inputs: after one cycle you have real cost per resolved outcome and real supervision load, and the second ranking is worth considerably more than the first. Keep the make-it-evaluable queue funded continuously; it is the pipeline that feeds every later quarter.

## Fictional worked example: Northstar's first portfolio round

> **Teaching example only, not a benchmark.** Northstar Components and every value below are fictional. The numbers demonstrate the arithmetic and decision sequence; they must not be used as expected costs, benefits, thresholds, or industry comparisons.

Northstar considers three candidates. It applies the gates before calculating priority:

| Candidate | Evaluability | Deterministic-zone check | Grounding | Admission decision |
|---|---|---|---|---|
| Supplier-invoice exception evidence pack | Pass: 35 pass/fail cases from prior exceptions | Pass after redesign: the model assembles evidence; ERP rules and an authorized person decide payment | Pass: procurement corpus has an owner | Score it |
| Maintenance work-order assistant | Pass: 28 historical diagnostic tasks | Pass: recommendations are advisory and cannot actuate equipment | Pass: manuals and asset history can be purpose-scoped | Score it |
| Customer-renewal negotiation agent | Fail: the team cannot yet define a reliable success baseline beyond revenue | Unchecked | Unchecked | Fund the make-it-evaluable work, not the agent |

Only the first two reach the score:

| Candidate | Fictional value per resolved outcome | Outcomes per quarter | Fictional cost per resolved outcome | Reversibility | Priority index |
|---|---:|---:|---:|---:|---:|
| Supplier-invoice exception evidence pack | 45 | 1,200 | 12 | 0.90 | 4,050 |
| Maintenance work-order assistant | 180 | 220 | 35 | 0.80 | 905 |

For the invoice case, `(45 x 1,200 / 12) x 0.90 = 4,050`. The index is for ranking Northstar's candidates; it has no meaning across enterprises unless the currency, measurement period, and treatment of labour and failure costs are identical.

Northstar then applies the portfolio constraints rather than funding the top row automatically. The invoice case exercises the control and evidence planes; the maintenance case exercises the knowledge and action planes. Peak review demand for both is tested against the same staffed supervision pool. The invoice case is funded first, the maintenance case remains next in sequence, and the renewal idea receives a small definition budget to create real eval tasks and a baseline.

The invoice case also receives kill criteria at approval: stop if the eval target is missed during the funding period, measured cost per resolved exception fails to converge toward the approved trajectory, peak review demand exceeds staffed capacity, or corpus ownership lapses. These are fictional decision mechanics, not recommended numeric thresholds.

## Sources

Evaluability and promotion evidence: research/R06-intelligence-and-learning/. Cost per resolved outcome: [../synthesis/economics-model.md](../synthesis/economics-model.md). Supervision capacity: research/R13-operating-model/ and [../synthesis/maturity-model.md](../synthesis/maturity-model.md). Corpus scoping and curation: research/R14-agent-data-engineering/. Reversal and liability evidence: research/R09-experience-and-channels/.
