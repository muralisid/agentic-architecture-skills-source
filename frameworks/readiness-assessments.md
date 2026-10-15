---
reader_summary: "Revised October 2026. Check seven areas one agent workload needs before it runs, in a light or a regulated-enterprise mode, without hiding a weak area inside a total score."
audience: ["CIO/CTO", "Enterprise architect", "Transformation lead", "Risk and security lead"]
decision_or_output: "Produce a seven-score readiness profile and the highest autonomy level the target workload should attempt next."
prerequisites: ["/docs/architecture/archetype-grid"]
reading_time: "16 minutes"
evidence_status: "Evidence-informed author framework, revised October 2026 to seven areas and 28 questions. Source data and framework mappings are labelled. The scoring method and its thresholds are a practitioner design, not a validated benchmark."
next: "/docs/frameworks/use-case-portfolio"
---

# Agent Readiness Assessment: Light and Heavy Modes

As of October 2026. Version 2: seven areas and 28 questions.

---

## Why two modes

Formal maturity frameworks live where regulation lives: the DCAM benchmark is operated by 430+ mostly financial institutions (EDM Association, May 2026), ISO 27001 counts 96,709 certificates globally but only ~4,260 in the US (ISO Survey 2024), and NIST CSF adoption concentrates in regulated sectors. Mid-market firms meet frameworks mainly through buyer-driven attestations and run practice manually (52% of SMBs manage privileged access with spreadsheets, shared vaults, or nothing; Devolutions 2025 [vendor]). An assessment that assumes framework fluency excludes most of the market; one that ignores frameworks is unadoptable where auditors rule.

So: **light mode**, a practical checklist a mid-market IT leader completes in an afternoon; **heavy mode**, the same areas mapped to the frameworks a regulated enterprise already operates. No major published readiness index differentiates instrument depth by size or regulatory intensity (Cisco AI Readiness Index, Oct 2025 [vendor]; ServiceNow/Oxford Economics Maturity Index, 2025 [vendor], whose average score fell 9 points year over year; Accenture with CMU SEI AI Adoption Maturity Model, Jun 2026); that split, plus agent-specific areas the general indexes lack, is this assessment's contribution.

## What the evidence says readiness is

Failure-cause data ranks the blockers this assessment weights:

- **Data readiness and integration readiness are co-equal top blockers.** Data: 82% of large-enterprise executives cite data quality as the critical AI barrier (KPMG Q3 2025), and Gartner predicts organizations will abandon 60% of AI projects unsupported by AI-ready data (Feb 2025). Integration: 95% of IT leaders cite integration difficulty, with only 27-29% of applications connected (MuleSoft [vendor]); at least one 2026 ranking places integration above data quality.
- **Operational discipline separates pilots from scale.** MIT's 95%-no-return finding attributes failure to the learning gap, not model quality (Aug 2025, methodology contested); McKinsey finds workflow redesign the strongest predictor of impact (high performers 2.8x likelier, Nov 2025); only 37% of practitioner teams run online evals (LangChain Dec 2025 [vendor]).
- **Identity gaps are risk exposure rather than a ranked failure cause** (only 10% have a non-human identity strategy, Okta 2025 [vendor]) and are weighted accordingly: a gate on autonomy, not on starting.
- For honesty: Gartner's official agentic cancellation drivers are "escalating costs, unclear business value or inadequate risk controls" (Jun 25 2025); cost and value therefore appear as their own area rather than being absorbed into technology readiness.
- **Several controls now have a source but had no question.** Five Eyes guidance covers policy decision points and approval before high-impact actions ([Five Eyes, 1 May 2026](https://www.ncsc.govt.nz/assets/guidance/Documents/Careful-adoption-of-agentic-AI-services_FINAL.pdf)). The ASD Information Security Manual (ISM) covers agent registers ([Cipher Projects on the ISM, September 2026](https://www.cipherprojects.com/blog/posts/asd-ism-september-2026-update/)). MAS expects an AI inventory that records identifiers, tools and guardrails ([MAS guidelines, 7 Oct 2026](https://www.mas.gov.sg/-/media/mas-media-library/regulation/guidelines/bd/guidelines-on-artificial-intelligence-risk-management-for-financial-institutions/guidelines-on-artificial-intelligence-risk-management.pdf)). The OAIC's guidance covers automated decisions about people ([Allens, Oct 2026](https://www.allens.com.au/insights-news/insights/2026/10/mandatory-automated-decision-making-disclosure-requirements-are-coming-key-takeaways-from-the-oaic-guidance/)). EY calls for spend ceilings and automatic shut-offs per agent ([EY, 1 Jun 2026](https://ey.com/en_us/insights/ai/agentic-ai-token-costs)). AWS documents expiry rules for agent memory ([AWS, 4 Sep 2026](https://aws.amazon.com/blogs/machine-learning/designing-lifecycle-policies-for-agentcore-memory/)) [vendor].

## What changed in version 2

Version 1 had six groups and 24 questions. Its governance and value group mixed controls on actions with cost. Version 2 splits that group into two areas, so there are now seven. It adds questions for the controls listed above. Of the 28 questions, nine are new, eight are changed or merged, and eleven are kept. The old corpus question now sits in question 4. The old "review permissions when tools change" now sits in question 19.

The method does not change. Answer for one workload. Score yes 3, partly 1, no 0. Report the profile, never a total. The weakest area caps autonomy. Two overrides are new. They tie the result to [the risk profile](/architecture/risk-profile).

## The seven areas

1. **Data**: who owns the data the agent uses, which class it is in, its quality, and how agent memory is governed.
2. **Integration and tools**: governed APIs, a tool gateway, the person's identity carried on every hop, and safe long-running actions.
3. **Identity and registry**: one registry for every agent, including agents inside vendor products; short-lived credentials; an off switch that has been tested.
4. **Controls on actions**: the risk tier, a policy decision point outside the model, sandboxed code, and a person who decides when a decision affects a person.
5. **Testing and operations**: evals owned by a domain expert, logs the agent cannot change, re-testing on every change, and incident practice.
6. **Cost and value**: a resolved outcome defined before funding, token budgets with a hard stop, cost per resolved outcome, and a named owner for AI spend.
7. **People and operating model**: named owners and supervisors, clear exceptions, burst supervision capacity, and the effect on roles.

Each area scores 0 to 3 (absent, ad hoc, managed, operated). The profile, not the total, is the output.

## Readiness gates autonomy

The assessment connects directly to the A x L maturity model. Readiness caps the autonomy level any workload should attempt. Read the profile in this order: data, integration, identity, controls, testing, cost, people.

| Profile | Highest autonomy |
|---|---|
| Any area at 0 for the target workload | A1 (assisted) only |
| Data and integration at 2 or more, all others at 1 or more | A2 (delegated tasks) |
| Data, integration, identity, controls and testing at 2 or more, others at 1 or more | A3 (supervised autonomy) |
| All seven at 2 or more, with controls, testing and cost at 3 | A4 (managed autonomy), with L2 governed learning and the [oversight-capacity gate](/architecture/autonomy-contract#the-oversight-gate-as-a-burst-rate) |
| All seven at 3, plus regulator-ready evidence | A5 candidacy, per domain only |

![Seven bars score Northstar's readiness areas from 0 to 3: data 2, integration 2, identity 1, controls 1, testing 2, cost 1, people 2. A dashed line runs from the lowest score, 1, to the ceiling table, where the row for data and integration at 2 or more, all others at 1 or more, gives A2.](/figures/architecture/readiness-profile-to-ceiling.svg)

Two overrides apply after the table. Both come from [the risk profile](/architecture/risk-profile).

- **Tier 3 needs controls at 3.** A Tier 3 workload needs controls at 3 for A3 or above. The tier comes from [the tier rules](/architecture/risk-profile#the-tier-rules).
- **The Rule of Two caps at A2.** A session with untrusted input, sensitive data and external action is capped at A2, whatever the scores. Meta's Rule of Two allows a session at most two of those three ([Meta, 31 Oct 2025](https://ai.meta.com/blog/practical-ai-agent-security/)) [vendor].

Against version 1: the A3 gate was data, integration, identity and operations at 2 or more. Testing takes the place of operations, so the real addition at A3 is the new controls area at 2. The A4 gate keeps its shape. "Operations and governance at 3" becomes "controls, testing and cost at 3".

## Light mode (mid-market)

Twenty-eight questions, four per area. Each is answered **yes**, **partly** or **no** by an IT leader and the workload owner, without a consultancy. Answer for one target workload, not for the enterprise in general. A policy counts only when the team can show that it operates in the target scope.

### The complete 28-question instrument

#### Area 1: Data

1. Can you name the system of record and accountable owner for each kind of data this agent will use or change?
2. Is every source the agent can reach classified into the [five data classes](/library/architecture/sovereignty-matrix) before go-live, and do outputs carry the highest class of their inputs?
3. Are material data-quality problems measured, visible and assigned for repair?
4. Is agent memory governed: classes and permissions carry into it, writes are checked, and entries expire and can be erased?

#### Area 2: Integration and tools

5. Do the systems the agent needs offer governed APIs, rather than screen automation?
6. Does a tool gateway enforce an allowlist of tools and versions, inject credentials at run time, and log every call?
7. Does the requesting person's identity survive every hop to the system of record?
8. Are events, retries, duplicate protection and undo steps available for long or consequential actions?

#### Area 3: Identity and registry

9. Is every agent in one registry, with its own identity, a named business sponsor and a technical owner, reviewed at least quarterly?
10. Does the registry also list agents inside vendor products, so both estates are visible?
11. Are credentials short-lived, injected at execution, never held by the agent, and no wider than the data class allows?
12. Has switching the agent off been tested end to end, with the time measured?

#### Area 4: Controls on actions

13. Is the [risk tier](/architecture/risk-profile) set from the factor profile before launch, with its retention and evidence duties?
14. Does a policy decision point outside the model approve or deny every write and zone action, and fail closed?
15. If the agent runs code or SQL, is it sandboxed with no network by default and no production credentials, with production changes only through plan-then-apply?
16. Where a decision significantly affects a person, does a named person with authority to change it decide, with the required notice given?

#### Area 5: Testing and operations

17. Does a domain expert own 20 to 50 pass-or-fail tasks and a human baseline, and must the agent pass them before go-live?
18. Are traces and action logs collected where the agent cannot change them?
19. Does any change to the model, prompt, tools, permissions, data sources or memory policy re-run the evals and risk profile before release?
20. Is there an on-call incident owner with a tested escalation path, and are rollback and drift checks drilled?

#### Area 6: Cost and value

21. Does intake define a resolved outcome, its value, and stop conditions before funding?
22. Are tokens and spend metered per agent, with a budget and a hard stop that fires before the next call?
23. Is cost per resolved outcome measured with the one definition in [the economics model](/library/architecture/economics-model)?
24. Does AI spend have a named owner, and is it shown back to the business units that use it?

#### Area 7: People and operating model

25. Are the corpus owner, eval owner and exception supervisors named, with time set aside?
26. Does the affected team know which exceptions stay human and where escalation goes?
27. Is burst supervision capacity calculated across the whole approved portfolio?
28. Are role, skill, works-council where relevant, and unassisted-practice effects planned?

A few terms. A policy decision point allows or denies each action by fixed rules, outside the model. A zone action is an action inside one of the [deterministic zones](/architecture/deterministic-zones). Plan-then-apply means the agent proposes a change and a deterministic system applies it after approval. The two estates are agents behind your own gateway and agents inside vendor products.

### Scoring the light instrument

- **Yes = 3:** the capability operates in the target workload's scope and current evidence can be shown.
- **Partly = 1:** some capability, plan, or evidence exists, but coverage or testing is incomplete.
- **No = 0:** the capability is absent or no current evidence can be shown.
- Questions 15 and 16 start with a condition. If the condition does not hold for the workload, answer yes and record why. The risk profile should show the same thing.
- For each area, add its four answers, divide by four, and round down. This gives an area score from 0 to 3.
- Report the seven scores as a profile in this order: data, integration, identity, controls, testing, cost, people. Do not add them into a grand total. The gate table reads the shape of the profile.
- Then apply the two overrides. Each can only lower the ceiling.

This conservative mapping makes a collection of untested plans score lower than one operating control. Keep the evidence used for each **yes**: ownership records, data-class records, quality reports, memory expiry settings, API inventories, gateway allowlists, registry entries, revocation drills, risk-profile records, policy decision logs, eval suites, trace samples, incident exercises, intake decisions, token budgets, cost reports, and role assignments. Those artifacts can later support buyer attestations or the heavy assessment.

## Heavy mode (regulated enterprise)

The same seven areas, each mapped to the framework the organization already operates, so agent readiness reuses existing assessment machinery instead of duplicating it:

| Area | Mapped frameworks |
|---|---|
| Data | DCAM capability areas; DAMA-DMBOK knowledge areas (adoption unmeasured; used as vocabulary, not evidence); the organization's existing data classification scheme |
| Integration and tools | API governance policy per existing architecture review; NIST CSF PR.AA/PR.DS categories for the exposed surfaces |
| Identity and registry | NIST CSF 2.0 Identity Management; ISO 27001 Annex A access controls; CISA ZTMM identity pillar (note: measured adoption is federal; used as a maturity vocabulary elsewhere); ASD ISM agent registers and the MAS AI inventory, where they apply |
| Controls on actions | NIST AI RMF Govern function; ISO/IEC 42001 (early: ~350 certified organizations globally through Apr 2026); model risk management where applicable; Five Eyes agentic AI guidance; automated decision duties such as the OAIC guidance, where they apply |
| Testing and operations | NIST CSF Detect/Respond; SRE and model-risk practices; NIST AI RMF Measure/Manage functions |
| Cost and value | Existing investment approval and FinOps processes; no formal framework claims |
| People and operating model | Existing operating-model and works-council processes; no formal framework claims |

Honest gaps stated in the instrument: CISA ZTMM adoption outside US federal government is unmeasured; DAMA-DMBOK adoption has never been surveyed; the circulating NIST AI RMF adoption percentages could not be verified to a primary source. The ISM detail comes from a compliance firm's summary, because the official ISM files could not be retrieved; check it against the current ISM before relying on it. Heavy mode cites frameworks it can evidence and labels vocabulary borrowings as such.

## Fictional worked example: Northstar Components

> **Teaching example only, not a benchmark.** Northstar Components is fictional. Its answers show how to calculate and interpret a profile; they are not typical scores for a mid-market manufacturer.

Northstar assesses an internal maintenance-work-order assistant. The assistant drafts work orders and writes them into the asset system. It records these answers in question order:

| Area | Questions | Answers | Calculation | Score |
|---|---|---|---:|---:|
| Data | 1 to 4 | Yes, Yes, Partly, Partly | floor((3 + 3 + 1 + 1) / 4) | 2 |
| Integration and tools | 5 to 8 | Yes, Partly, Yes, Partly | floor((3 + 1 + 3 + 1) / 4) | 2 |
| Identity and registry | 9 to 12 | Yes, No, Partly, No | floor((3 + 0 + 1 + 0) / 4) | 1 |
| Controls on actions | 13 to 16 | Partly, No, Yes, Yes | floor((1 + 0 + 3 + 3) / 4) | 1 |
| Testing and operations | 17 to 20 | Yes, Yes, Partly, Partly | floor((3 + 3 + 1 + 1) / 4) | 2 |
| Cost and value | 21 to 24 | Yes, Partly, Partly, No | floor((3 + 1 + 1 + 0) / 4) | 1 |
| People and operating model | 25 to 28 | Yes, Yes, Partly, Partly | floor((3 + 3 + 1 + 1) / 4) | 2 |

What set each score:

- **Data, 2.** Owners are named (question 1). Every source is classified, all as Internal (2). Quality problems are measured but not all assigned for repair (3). Memory keeps permissions but has no expiry yet (4).
- **Integration and tools, 2.** The asset system has governed APIs (5). The planner's identity reaches it on every hop (7). The gateway logs every call but does not pin tool versions (6). Retries exist, but there is no undo step for a cancelled work order (8).
- **Identity and registry, 1.** The agent is in the registry with a sponsor and an owner (9). The vendor agents inside the asset suite are not listed (10). Credentials are short-lived but wider than the data class needs (11). The off switch has never been tested (12).
- **Controls on actions, 1.** The tier is set, but its retention and evidence duties are not written down (13). Writes reach the asset system with no policy decision point in front of them (14). The assistant runs no code or SQL and makes no decision about a person. So questions 15 and 16 are yes, with the reason recorded.
- **Testing and operations, 2.** A maintenance planner owns 30 pass-or-fail tasks and a human baseline (17). Logs sit where the agent cannot change them (18). Prompt changes re-run the evals, but tool changes do not (19). There is an on-call owner, but rollback has never been drilled (20).
- **Cost and value, 1.** Intake set the outcome, its value and the stop conditions (21). Tokens are metered per agent, with no hard stop (22). Cost per resolved outcome leaves out supervision time (23). No one owns AI spend (24).
- **People and operating model, 2.** The owners and supervisors are named, with time set aside (25). The team knows which exceptions stay human (26). Burst capacity is worked out for this workload only, not the whole portfolio (27). Role and skill effects are planned, but unassisted practice is not (28).

The output is the profile **2, 2, 1, 1, 2, 1, 2**, not a total of 11. No area is at 0. Data and integration are at 2 and every other area is at 1 or more. So the ceiling table gives A2, delegated tasks.

Neither override changes that. [The risk profile](/architecture/risk-profile) puts the assistant at Tier 2, because it writes work orders into the asset system. Its sources are all Internal, so a session never holds sensitive data and the Rule of Two is not met.

To ask for A3, Northstar must bring identity and controls up to 2. For identity, test the off switch and time it, and list the vendor agents in the registry. For controls, put a policy decision point in front of every write. A strong data score cannot make up for those gaps.

## What this assessment deliberately is not

Not an AI strategy scorecard (Cisco, ServiceNow, and Accenture/SEI already score strategy, talent, and culture well). Not a risk assessment: the tier comes from [the risk profile](/architecture/risk-profile), and this assessment only reads it. Not a substitute for the [use-case portfolio](/library/frameworks/use-case-portfolio) decision, which determines whether readiness investment is even pointed at the right workload.

## Sources

EDM Association Global Data Management Benchmark, May 2026; ISO Survey 2024; Fortra State of Cybersecurity 2025 [vendor]; Devolutions SMB Security 2025 [vendor]; KPMG AI Quarterly Pulse Q3 2025; Gartner press releases Feb 26 2025 (AI-ready data), Jul 29 2024 (abandonment), Jun 25 2025 (cancellation drivers); S&P Global 451 via CIO Dive, Mar 2025; MIT NANDA, Aug 2025 (methodology contested); McKinsey State of AI, Nov 2025; LangChain State of Agent Engineering, Dec 2025 [vendor]; MuleSoft Connectivity Benchmark 2025/2026 [vendor]; Okta AI at Work 2025 [vendor]; SailPoint agent report 2025 [vendor]; Cisco AI Readiness Index, Oct 2025 [vendor]; ServiceNow/Oxford Economics Enterprise AI Maturity Index 2025 [vendor]; Accenture and CMU SEI AI Adoption Maturity Model, Jun 8 2026; Openlayer ISO 42001 guide, Jun 2026; Five Eyes, Careful adoption of agentic AI services, May 1 2026; Cipher Projects, ASD ISM September 2026 update; MAS Guidelines on AI Risk Management, Oct 7 2026; Allens on the OAIC automated decision-making guidance, Oct 2026; EY on agentic AI token costs, Jun 1 2026; AWS, lifecycle policies for AgentCore Memory, Sep 4 2026 [vendor]; Meta, Agents Rule of Two, Oct 31 2025 [vendor].
