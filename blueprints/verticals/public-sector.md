---
reader_summary: "Adapt the Public Sector blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Public-sector digital-services lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Public Sector."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Blueprint synthesis: cited evidence, vendor-reported findings, author positions, and honest limits are labelled inline."
next: "/docs/frameworks/vendor-question-bank"
---

# Vertical Blueprint: Public Sector

As of August 2026. Phase 6. Sovereignty-first, and the vertical where "the citizen cannot choose another provider" changes the design.

---

## 1. The scenario

A public body runs case management for benefits or permits, a citizen contact function across phone, web and counter, records management with statutory retention, and a procurement process that will decide the architecture more than any architect will. Caseloads are backlogged. Staff turnover is high. Every decision is appealable.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Case preparation agent | Assembles the file, checks completeness, flags missing evidence, drafts the summary | A3, L2 | The strongest case in the vertical. Prepares; the officer decides |
| Citizen enquiry agent | Answers process and status questions from a governed corpus | A3, L2 | Full customer-facing control set, plus accessibility duties |
| Records and retention agent | Classifies, applies retention schedules, prepares disclosure responses | A3, L1 | Statutory retention is deterministic |
| Translation and plain-language agent | Adapts official communication for language and reading level | A2, L1 | High value, low risk, consistently underused |
| Eligibility decision agent | Decides entitlement | Not recommended at any autonomy level | Access to essential public services is Annex III high-risk, and the decision is appealable by design |

## 3. Planes activated

Control (**direct**), Evidence (**direct**: appealability makes the evidence plane load-bearing), Execution (**direct**: sovereignty routing), Knowledge (**direct**), Human (**direct**), Action, Improvement (supporting).

## 4. Controls

- **Access to essential public services is Annex III high-risk** under the EU AI Act, deferred to 2 December 2027. Classification work starts now; standards lead times run beyond twelve months.
- **Every decision must be explainable to the person it affects and defensible on appeal.** That is a stronger requirement than auditability, and it constrains architecture: the evidence shown to the officer must be the evidence in the file.
- Merely formal human participation is not sufficient. An officer who confirms a recommendation has not decided; design the review so a different answer is reachable.
- Sovereignty routing at tier SV2 or above is normal here, and procurement frameworks increasingly name it. The proposed EU Cloud and AI Development Act introduces a four-level cloud sovereignty framework tied to public procurement.
- Statutory retention is deterministic and long. Agent memory, traces and derived artifacts inherit it, which is a retention obligation most agent platforms were not designed for.
- Accessibility duties apply to citizen-facing agents as they do to any other public digital service.

## 5. Economics

**Per run.** Ordinary. The unusual constraint is the sovereignty tier, which narrows model availability and raises cost, and which is a compliance decision rather than an economic one.

**Per resolved outcome.** Cost per case progressed, and backlog reduction, against the caseworker's loaded hour. The value that matters politically is usually cycle time to the citizen rather than cost per case, and instrumenting the first is more useful than optimising the second.

## 6. Honest limits

- The citizen cannot choose another provider. Every failure mode that a commercial customer resolves by leaving is resolved here by complaint, appeal, or ombudsman, which makes containment metrics actively harmful in this vertical.
- No published production case exists of an agent holding autonomous eligibility authority in a benefits or permits process, and the guide recommends against building one.
- Public bodies frequently sit at low readiness on the data and integration dimensions, and the readiness assessment's rule applies: any dimension at zero caps autonomy at assisted, whatever the ambition.
- Procurement timelines and framework availability often decide the platform before the architecture does. Naming this early is more useful than pretending otherwise.

## 7. Metrics

Cycle time to the citizen, at the 90th percentile. Backlog trend. Case preparation completeness and officer override rate, which should be materially above zero. Appeal rate and appeal-upheld rate, which is the real quality signal. Enquiry resolution and repeat-contact rate. Retention compliance across derived artifacts.

## Sources

research/R11-governance-risk-sovereignty/ (Annex III, sovereignty frameworks, retention), research/R09-experience-and-channels/, research/R04-systems-of-record/, research/R13-operating-model/ (oversight sufficiency), [../../frameworks/readiness-assessments.md](../../frameworks/readiness-assessments.md).
