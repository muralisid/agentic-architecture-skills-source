---
reader_summary: "Assess six workload-specific prerequisites for safe agent delivery in a lightweight or regulated-enterprise mode, without hiding weak dimensions inside a total score."
audience: ["CIO/CTO", "Enterprise architect", "Transformation lead", "Risk and security lead"]
decision_or_output: "Produce a six-value readiness profile and the maximum autonomy level the target workload should attempt next."
prerequisites: ["/docs/architecture/archetype-grid"]
reading_time: "14 minutes"
evidence_status: "Evidence-informed author framework; source data and framework mappings are labelled, and the scoring method is a practitioner design rather than a validated benchmark."
next: "/docs/frameworks/use-case-portfolio"
---

# Agent Readiness Assessment: Light and Heavy Modes

As of August 2026. Phase 2 deliverable; feeds the Phase 5 roadmap checklist as its readiness input.

---

## Why two modes

Formal maturity frameworks live where regulation lives: the DCAM benchmark is operated by 430+ mostly financial institutions (EDM Association, May 2026), ISO 27001 counts 96,709 certificates globally but only ~4,260 in the US (ISO Survey 2024), and NIST CSF adoption concentrates in regulated sectors. Mid-market firms meet frameworks mainly through buyer-driven attestations and run practice manually (52% of SMBs manage privileged access with spreadsheets, shared vaults, or nothing; Devolutions 2025 [vendor]). An assessment that assumes framework fluency excludes most of the market; one that ignores frameworks is unadoptable where auditors rule.

So: **light mode**, a practical checklist a mid-market IT leader completes in an afternoon; **heavy mode**, the same dimensions mapped to the frameworks a regulated enterprise already operates. No major published readiness index differentiates instrument depth by size or regulatory intensity (Cisco AI Readiness Index, Oct 2025 [vendor]; ServiceNow/Oxford Economics Maturity Index, 2025 [vendor], whose average score fell 9 points year over year; Accenture with CMU SEI AI Adoption Maturity Model, Jun 2026); that split, plus agent-specific dimensions the general indexes lack, is this assessment's contribution.

## What the evidence says readiness is

Failure-cause data ranks the blockers this assessment weights:

- **Data readiness and integration readiness are co-equal top blockers.** Data: 82% of large-enterprise executives cite data quality as the critical AI barrier (KPMG Q3 2025), and Gartner predicts organizations will abandon 60% of AI projects unsupported by AI-ready data (Feb 2025). Integration: 95% of IT leaders cite integration difficulty, with only 27-29% of applications connected (MuleSoft [vendor]); at least one 2026 ranking places integration above data quality.
- **Operational discipline separates pilots from scale.** MIT's 95%-no-return finding attributes failure to the learning gap, not model quality (Aug 2025, methodology contested); McKinsey finds workflow redesign the strongest predictor of impact (high performers 2.8x likelier, Nov 2025); only 37% of practitioner teams run online evals (LangChain Dec 2025 [vendor]).
- **Identity gaps are risk exposure rather than a ranked failure cause** (only 10% have a non-human identity strategy, Okta 2025 [vendor]) and are weighted accordingly: a gate on autonomy, not on starting.
- For honesty: Gartner's official agentic cancellation drivers are "escalating costs, unclear business value or inadequate risk controls" (Jun 25 2025); cost and value discipline therefore appear as their own dimension rather than being absorbed into technology readiness.

## The six dimensions

1. **Data readiness**: quality and ownership of the data agents will ground on; ACL-aware retrievability; master data state for the entities agents act on.
2. **Integration readiness**: governed API coverage of the systems agents must touch; tool-exposure capability (the R03 gateway pattern); event availability for ambient triggers.
3. **Identity readiness**: agent identities as first-class principals; on-behalf-of flows; secrets never held by agents; Sponsor accountability assignable.
4. **Operational discipline**: observability of agent behavior; offline and online evals; incident practice and kill switches; drift monitoring.
5. **Governance and value discipline**: use-case intake with kill criteria; risk tiering; per-run cost visibility; the two-estate view (licensed platforms plus metered APIs).
6. **Workforce and operating model**: named agent owners and supervisors; exception-handling capacity; change readiness in affected teams.

Each dimension scores 0 to 3 (absent, ad hoc, managed, operated). The profile, not the total, is the output.

## Readiness gates autonomy

The assessment connects directly to the A x L maturity model: readiness caps the autonomy level any workload should attempt.

| Minimum profile | Safe ceiling |
|---|---|
| Any dimension at 0 for the target workload | A1 (assisted) only |
| Data and integration at 2+, others 1+ | A2 (delegated tasks) |
| Data, integration, identity, ops at 2+ | A3 (supervised autonomy) |
| All six at 2+, ops and governance at 3 | A4 (managed autonomy); L2 governed learning required |
| All six at 3, plus regulator-ready evidence | A5 candidacy, per domain only |

## Light mode (mid-market)

Twenty-four questions, four per dimension, each answerable **yes**, **partly**, or **no** by an IT leader and the workload owner without a consultancy. Answer for one target workload, not for the enterprise in general. A policy counts only when the team can show that it operates in the target scope.

### The complete 24-question instrument

#### Data readiness

1. Can you name the system of record and accountable data owner for each entity this agent will use or change?
2. Are material quality issues measured, visible, and assigned for remediation?
3. Do source permissions propagate into indexes, caches, traces, and other derived artifacts?
4. Can a purpose-scoped corpus be assembled, refreshed, and erased within the funding period?

#### Integration readiness

5. Do required systems expose governed APIs rather than depend on screen automation?
6. Does a tool gateway enforce allowlists, runtime credential injection, and audit?
7. Does the requesting human's identity survive every hop through on-behalf-of or equivalent delegation?
8. Are events, idempotency, retry, and compensation available for long-running or consequential actions?

#### Identity readiness

9. Does every production agent have an ID2 first-class identity and named business sponsor?
10. Are credentials short-lived, injected at execution, and never stored by the agent?
11. Are permissions task-scoped and reviewed whenever tools or capabilities change?
12. Has revocation or a kill switch been exercised end to end?

#### Operational discipline

13. Does a domain SME own twenty to fifty pass-or-fail eval tasks and a human baseline?
14. Are traces and action logs collected outside the agent's control?
15. Is an incident owner alerted after hours, with a tested escalation path?
16. Are drift, cost, supervision load, and rollback measured or drilled in production?

#### Governance and value discipline

17. Does intake define a resolved outcome, its value, and kill criteria before funding?
18. Are deterministic zones identified, with decisions enforced outside the model?
19. Are risk and classification tier, retention, and evidence duties set before launch?
20. Is cost per resolved outcome measured including supervision and wrong-outcome cost, with a budget envelope?

#### Workforce and operating model

21. Are the business sponsor, technical owner, corpus owner, and supervisor named?
22. Does the affected team know which exceptions stay human and where escalation goes?
23. Is burst supervision capacity calculated across the whole approved portfolio?
24. Are role, skill, works-council where relevant, and unassisted-practice impacts planned?

### Scoring the light instrument

- **Yes = 3:** the capability operates in the target workload's scope and current evidence can be shown.
- **Partly = 1:** some capability, plan, or evidence exists, but coverage or testing is incomplete.
- **No = 0:** the capability is absent or no current evidence can be shown.
- For each dimension, add its four answers, divide by four, and round down. This produces a dimension score from 0 to 3.
- Report the six scores as a profile in this order: data, integration, identity, operations, governance and value, workforce. Do not add them into a grand total; the gate table uses the shape of the profile.

This conservative mapping makes a collection of untested plans score lower than one operating control. Keep the evidence used for each **yes**: ownership records, quality reports, API inventories, access reviews, revocation drills, eval suites, trace samples, incident exercises, intake decisions, cost reports, and role assignments. Those artifacts can later support buyer attestations or the heavy assessment.

## Heavy mode (regulated enterprise)

The same six dimensions, each mapped to the framework the organization already operates, so agent readiness reuses existing assessment machinery instead of duplicating it:

| Dimension | Mapped frameworks |
|---|---|
| Data readiness | DCAM capability areas; DAMA-DMBOK knowledge areas (adoption unmeasured; used as vocabulary, not evidence) |
| Integration readiness | API governance policy per existing architecture review; NIST CSF PR.AA/PR.DS categories for the exposed surfaces |
| Identity readiness | NIST CSF 2.0 Identity Management; ISO 27001 Annex A access controls; CISA ZTMM identity pillar (note: measured adoption is federal; used as a maturity vocabulary elsewhere) |
| Operational discipline | NIST CSF Detect/Respond; SRE and model-risk practices; NIST AI RMF Measure/Manage functions |
| Governance and value | NIST AI RMF Govern function; ISO/IEC 42001 (early: ~350 certified organizations globally through Apr 2026); model risk management where applicable |
| Workforce and operating model | Existing operating-model and works-council processes; no formal framework claims |

Honest gaps stated in the instrument: CISA ZTMM adoption outside US federal government is unmeasured; DAMA-DMBOK adoption has never been surveyed; the circulating NIST AI RMF adoption percentages could not be verified to a primary source. Heavy mode cites frameworks it can evidence and labels vocabulary borrowings as such.

## Fictional worked example: Northstar Components

> **Teaching example only, not a benchmark.** Northstar Components is fictional. Its answers show how to calculate and interpret a profile; they are not typical scores for a mid-market manufacturer.

Northstar assesses an internal maintenance-work-order assistant. It records these answers in question order:

| Dimension | Answers | Calculation | Score |
|---|---|---:|---:|
| Data | Yes, Yes, Partly, Partly | floor((3 + 3 + 1 + 1) / 4) | 2 |
| Integration | Yes, Partly, Yes, Partly | floor((3 + 1 + 3 + 1) / 4) | 2 |
| Identity | Yes, Partly, Partly, No | floor((3 + 1 + 1 + 0) / 4) | 1 |
| Operations | Partly, Yes, Partly, No | floor((1 + 3 + 1 + 0) / 4) | 1 |
| Governance and value | Yes, Yes, Partly, Partly | floor((3 + 3 + 1 + 1) / 4) | 2 |
| Workforce | Yes, Partly, Partly, No | floor((3 + 1 + 1 + 0) / 4) | 1 |

The output is the profile **2, 2, 1, 1, 2, 1**, not a total of 9. From the autonomy gate table, Northstar can attempt an A2 delegated task. It should fund the missing ID2 controls, rollback drill, after-hours response, supervision-capacity calculation, and workforce plan before asking for A3. A single polished data score cannot compensate for those weaker dimensions.

## What this assessment deliberately is not

Not an AI strategy scorecard (Cisco, ServiceNow, and Accenture/SEI already score strategy, talent, and culture well); not a vendor evaluation (Phase 7); not a substitute for the use-case portfolio decision (Phase 5), which determines whether readiness investment is even pointed at the right workload.

## Sources

EDM Association Global Data Management Benchmark, May 2026; ISO Survey 2024; Fortra State of Cybersecurity 2025 [vendor]; Devolutions SMB Security 2025 [vendor]; KPMG AI Quarterly Pulse Q3 2025; Gartner press releases Feb 26 2025 (AI-ready data), Jul 29 2024 (abandonment), Jun 25 2025 (cancellation drivers); S&P Global 451 via CIO Dive, Mar 2025; MIT NANDA, Aug 2025 (methodology contested); McKinsey State of AI, Nov 2025; LangChain State of Agent Engineering, Dec 2025 [vendor]; MuleSoft Connectivity Benchmark 2025/2026 [vendor]; Okta AI at Work 2025 [vendor]; SailPoint agent report 2025 [vendor]; Cisco AI Readiness Index, Oct 2025 [vendor]; ServiceNow/Oxford Economics Enterprise AI Maturity Index 2025 [vendor]; Accenture and CMU SEI AI Adoption Maturity Model, Jun 8 2026; Openlayer ISO 42001 guide, Jun 2026.
