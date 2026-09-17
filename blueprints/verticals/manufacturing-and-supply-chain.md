---
reader_summary: "Adapt the Manufacturing and Supply Chain blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Manufacturing operations lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Manufacturing and Supply Chain."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/verticals/public-sector"
---

# Manufacturing and supply chain

A proposed workflow for manufacturing and supply chain. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A production line produces an unexpected defect. A quality engineer needs inspection images, batch records, machine readings, and the approved process specification.

![Investigate a quality deviation: Detect a deviation, then Link the batch, then Compare past events, then Review the cause, then Verify corrective work.](/figures/blueprints/manufacturing-and-supply-chain-mobile.svg)

## Start with the simplest useful solution

Compare the agent with statistical process control, inspection rules, and established maintenance analysis. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Maintenance planning agent | Correlates condition data, history and work backlog; proposes and schedules maintenance | A3, L2 | The best internal case. Failures cost a rescheduled job |
| Quality investigation agent | Assembles process, batch and inspection evidence for a deviation; proposes root cause | A2 to A3, L2 | Proposes. Quality releases |
| Changeover assistance agent | Retrieves the procedure, the last changeover's issues and the current line state | A2, L1 | Directly the residual work the metaphor describes |
| Supply exception agent | The supply-chain department blueprint, applied to production materials | A3, L2 | See the department blueprint |
| Production control agent | Takes autonomous production action | Not recommended | No named-factory case with measured outcomes exists. See limits |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Knowledge (**direct**: historian, asset register, procedures, batch records), Human (**direct**: the floor crew is the point), Action (**direct** on the information path), Improvement (**direct**), Evidence, Control, Execution (supporting, with the OT boundary from R05).

## Controls and human decisions

Keep equipment control and product release in their approved systems. Use the agent to assemble evidence and suggest investigations.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure first-pass yield, investigation time, recurrence, false alarms, review effort, and recovery after an incorrect suggestion.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

Similarity to an earlier event does not establish the cause. Test competing explanations and validate the corrective action.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.

- [Government guidance on integrating AI in operational technology](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4347041/nsa-cisa-and-others-release-guidance-on-integrating-ai-in-operational-technology/), December 2025. Additional reading for deployments that interact with industrial systems.
