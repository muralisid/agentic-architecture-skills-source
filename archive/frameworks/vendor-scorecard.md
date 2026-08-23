---
reader_summary: "Run non-negotiable disqualifiers before weighted scoring, then compare only products that can support the target workload safely."
audience: ["CIO/CTO", "Enterprise architect", "Procurement and risk lead"]
decision_or_output: "Produce an auditable shortlist with disqualifiers, evidence quality, weights, and exit risk visible."
prerequisites: ["/docs/frameworks/vendor-question-bank"]
reading_time: "9 minutes"
evidence_status: "Author evaluation method; vendor scores are time-sensitive and require primary evidence plus contractual confirmation."
next: "/docs/vendors"
---

# The Vendor Scorecard

As of August 2026. Phase 7. How to score the question bank without letting a total hide a disqualifier.

---

## The rule that makes this work

**Some questions are disqualifiers, not scores.** A weighted total lets a vendor compensate for an unacceptable answer with strength elsewhere, which is precisely how platforms with no enforcement boundary win evaluations on ecosystem depth. So the scorecard runs in two passes: disqualifiers first, scoring second, and a vendor that fails a disqualifier does not get scored.

This is the same shape as the use-case portfolio's evaluability gate, and for the same reason.

## Pass 1: disqualifiers

Each is scoped, because a disqualifier for one use case is irrelevant for another. Apply only the ones your use case triggers.

| Question | Disqualifying answer | Scope |
|---|---|---|
| A1 first-class identity | Agents run on shared credentials with no per-agent identity | Any production use |
| B1 who decides | Model output is the authorisation decision in any of the four deterministic zones | Any use touching access, money, safety actuation, or regulatory records |
| B2 enforcement outside the model | Approval exists only as instruction to the model | Any use with an irreversible action |
| C3 ACL propagation | Source permissions do not reach the index, or retrieval is not pre-filtered on live identity | Any corpus that is not uniformly readable |
| C4 erasure cascade | Deletion does not reach vectors, memories and traces | Any personal data |
| D3 hard caps | No enforceable spend cap | Any metered workload |

A vendor failing a scoped disqualifier is not a weak candidate for that use case. It is not a candidate.

## Pass 2: scoring

Everything surviving pass 1 scores each remaining question 0 to 3.

| Score | Meaning |
|---|---|
| 0 | No answer, or the answer redirects to roadmap, a customer story, or an adjacent capability |
| 1 | Answered in principle, not demonstrable today |
| 2 | Answered specifically, with a document or configuration surface |
| 3 | Answered specifically **and** verified: you saw it, or a reference customer confirmed it |

The gap between 2 and 3 is where most evaluations quietly stop. Insist on 3 for anything in your disqualifier scope.

## Weighting by use case, not by preference

Weight the six sections against the use case's actual risk profile. Three worked weightings:

| Section | Internal knowledge assistant | Customer-facing service agent | Agent touching money or records |
|---|---|---|---|
| A Identity and access | 2 | 2 | 3 |
| B Determinism and control | 1 | 3 | 3 |
| C Memory and data | 3 | 2 | 2 |
| D Economics | 2 | 3 | 1 |
| E Evaluation and change | 2 | 3 | 3 |
| F Interoperability and exit | 3 | 1 | 2 |

Two observations that fall out of these weightings and are worth stating. Exit weighs heaviest on internal assistants, because that is where memory accumulates and where switching cost compounds quietly. Economics weighs heaviest on customer-facing agents, because volume is unbounded and the meter is the only thing that is.

## The output is a profile, not a number

Publish the section scores, not the total. A vendor scoring 3 on identity and 1 on determinism is a different product from one scoring 2 and 2, and the average erases exactly the distinction that matters. This mirrors the readiness assessment, where the profile governs and the total is decorative.

## Recording the evidence

Every score carries the answer, its date, and who gave it. Scores older than two quarters are re-collected rather than carried forward, because product facts in this market change quarterly. A scorecard is a dated artifact, not a standing asset.

## What the scorecard cannot tell you

Whether the vendor will still be selling this product in three years, whether the ecosystem you are buying survives its next consolidation wave, and whether the capability you saw demonstrated works on your data. The first two are judgement. The third is a proof of concept on your own corpus, which no question bank replaces.

## Sources

[vendor-question-bank.md](vendor-question-bank.md). Disqualifier rationale in research/R10-security-and-identity/, research/R14-agent-data-engineering/, research/R12-observability-and-finops/. Profile-over-total method from [readiness-assessments.md](readiness-assessments.md).
