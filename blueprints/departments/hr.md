---
reader_summary: "Adapt the HR and People blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","HR leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for HR and People."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Blueprint synthesis: cited evidence, vendor-reported findings, author positions, and honest limits are labelled inline."
next: "/docs/blueprints/departments/sales"
---

# Department Blueprint: HR and People

As of August 2026. Phase 6. The department where the agent is subject to employment law as well as AI law.

---

## 1. The scenario

An HR function runs recruitment, onboarding, employee query handling, performance and development cycles, and workforce reporting. Employee queries are high volume and highly repetitive. Recruitment is high volume and high consequence. Both look like obvious agent candidates and they sit on opposite sides of a legal line.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Employee query agent | Answers policy, benefits, leave and payroll questions from a curated corpus | A3, L2 | The clear win. High volume, contained failure, measurable |
| Onboarding orchestration agent | Coordinates provisioning, scheduling and paperwork across systems | A3, L1 | Deterministic access decisions, as in the IT blueprint |
| Recruitment screening assistant | Summarises applications against stated criteria, surfaces evidence | A1, L0 | Deliberately the lowest position in any blueprint in this guide. See controls |
| Workforce insight agent | Analyses aggregate workforce data for planning | A2, L1 | Aggregate only. Individual-level inference is a different product with different duties |

## 3. Planes activated

Knowledge (**direct**), Control (**direct**), Evidence (**direct**: consultation records as well as action logs), Human (**direct**), Action (supporting), Improvement (supporting), Execution (supporting).

## 4. Controls

- **Recruitment screening and employment decisions sit in the EU AI Act's Annex III high-risk category.** The AI Omnibus deferred those obligations to 2 December 2027, which changes the deadline and not the classification work. Standards lead times run beyond twelve months, so classification work starts now.
- **Merely formal human participation is not sufficient.** A human who rubber-stamps a ranked list has not exercised oversight, and regulator guidance says so directly. Design the review so the human can reach a different answer, which means showing the evidence rather than the score.
- **The provider-flip trap.** Substantially modifying a purchased system, or putting your own name on it, can make you its provider rather than its deployer, with the heavier obligation set. This is an architecture constraint from the first decision, not a procurement footnote.
- **Co-determination duties.** In several European jurisdictions, introducing systems capable of monitoring employee performance triggers works-council rights independently of AI law. The published boundary case turned on capability rather than intent.
- Worker data in supervision and monitoring telemetry carries its own consultation duties. Monitoring the monitors is itself monitoring.
- The portable contract clause worth knowing: **no discipline based solely on the system's output.** It appears across otherwise very different bargaining architectures and travels well into policy even where no union is present.

## 5. Economics

**Per run.** Low. Query handling is retrieval-shaped.

**Per resolved outcome.** Cost per query resolved, with the HR business partner's time as the comparator. The recruitment agents are not costed on efficiency at all: their business case is consistency and evidence quality, and an efficiency case for screening automation is a signal that the classification work has not been done.

## 6. Honest limits

- **Consultation does not slow adoption.** The counterintuitive finding: EU adoption runs at 79% against 90% in the US, with staff resistance the second-most-cited reason for non-adoption, and the Commission naming "contested adoption" as the failure mode. Early consultation is faster than late consultation, not slower.
- Formal AI clauses in collective agreements remain rare while informal consultation is common. The absence of a clause is not the absence of a duty.
- No published evidence supports agent autonomy in performance or disciplinary decisions, and the guide recommends against building it.
- Employee-facing agents inherit the R08 finding: they will improve solitary work such as query handling and will not change coordinated work such as performance cycles, because changing those requires agreeing new norms.

## 7. Metrics

Query resolution and reopen rate. Corpus freshness against policy change. Escalation rate to HR business partners. For recruitment: reviewer override rate, which should be materially above zero, because a near-zero override rate is evidence of rubber-stamping rather than of accuracy. Consultation records completeness.

## Sources

research/R13-operating-model/findings.md (co-determination, union architectures, the consultation finding), research/R11-governance-risk-sovereignty/ (Annex III, the Omnibus deferral, the provider flip), research/R08-productivity-and-collaboration/, research/R04-systems-of-record/ (HRIS).
