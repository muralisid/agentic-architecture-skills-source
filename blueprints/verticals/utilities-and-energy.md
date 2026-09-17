---
reader_summary: "Adapt the Utilities and Energy blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Utilities operations lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Utilities and Energy."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "5 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/verticals/banking-and-financial-services"
---

# Power utilities and energy

A proposed workflow for power utilities and energy. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A utility finds a possible vegetation or equipment risk on a distribution route. Staff must reconcile imagery, GIS, asset records, and recent inspections before scheduling field work.

![Turn asset evidence into inspected work: Detect a concern, then Locate the asset, then Check the evidence, then Approve inspection, then Confirm the result.](/figures/blueprints/utilities-and-energy-mobile.svg)

## Start with the simplest useful solution

Compare the agent with scheduled inspection, GIS rules, and conventional condition monitoring. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Verdict |
|---|---|---|---|
| Event context agent | Watches alarm and event streams, assembles context an operator cannot hold in working memory, presents candidate interpretations | A2, L1 | Recommended. Output is an alert the operator may ignore |
| Asset reconciliation agent | Finds and explains disagreements between EAM, GIS and field-captured data, proposes corrections with provenance | A2 to A3 on the write path, L2 | Recommended. The write path is data quality, where a wrong recommendation costs a rejected change |
| Field assistance agent | Retrieves the right past incident, the applicable procedure and the asset history for the job in front of the crew | A2, L1 | Recommended. Degraded-connectivity behaviour must be specified |
| Switching assistance | Gather approved procedures for an operator | Assisted only | No autonomous switching authority in this proposed design |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

| Plane | Role |
|---|---|
| Knowledge | **Direct.** Historian data, asset registers, past incidents, procedures, all with lineage and freshness bounded by process dynamics |
| Human | **Direct.** The operator holds decision authority. Everything else in the blueprint serves that |
| Evidence | **Direct.** Operator-custodied session logging, not vendor-held. Every displayed option attributable to its source and timestamped |
| Execution | **Direct.** Deployment selected from data classification and operational constraints |
| Control | Supporting. Unnamed OT assets are not routable; access severable in seconds |
| Action | Supporting, and deliberately narrow. Read paths broad, write paths confined to data quality |
| Improvement | Supporting. Two loops at different speeds: fast operational learning from overrides, slow compounding asset learning from work orders |

## Controls and human decisions

Keep switching, protection, and physical control in approved control systems. Let the agent prepare evidence and proposed work. Test operation when connectivity fails.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure confirmed defects, missed risks in a sampled control set, inspection lead time, unnecessary visits, and crew review effort.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

Imagery can be old, obscured, or too coarse to establish clearance. Treat detection as a reason to inspect. Confirm asset identity and current conditions in the field.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.

- [Government guidance on integrating AI in operational technology](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4347041/nsa-cisa-and-others-release-guidance-on-integrating-ai-in-operational-technology/), December 2025. Additional reading for deployments that interact with industrial systems.
