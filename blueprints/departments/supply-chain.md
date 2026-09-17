---
reader_summary: "Adapt the Supply Chain and Operations blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Supply-chain leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Supply Chain and Operations."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/verticals/utilities-and-energy"
---

# Supply chain and operations

A proposed workflow for supply chain and operations. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A late delivery could stop planned work. The planner must compare inventory, supplier commitments, transport status, and acceptable substitutes.

![Investigate a delivery exception: Detect the delay, then Gather supply facts, then Compare options, then Approve a change, then Confirm execution.](/figures/blueprints/supply-chain-mobile.svg)

## Start with the simplest useful solution

Compare the agent with eRP exception reports, reorder rules, and established planning workflows. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Exception resolution agent | Investigates supply and order exceptions, gathers evidence across systems, proposes disposition | A3, L2 | The core of the department's value |
| Supplier communication agent | Chases, confirms and reconciles with suppliers across email and portals | A3, L1 | External-facing. Disclosure applies |
| Planning analysis agent | Explains plan variance and demand-signal disagreement with provenance | A2, L2 | Explains; the planner decides |
| Document processing agent | Extracts and validates shipping, customs and compliance documents | A3, L1 | Parsing fidelity is the ceiling here |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Action (**direct**: ERP, WMS and EDI through wrapped APIs), Knowledge (**direct**: parsing fidelity caps everything), Improvement (**direct**), Human, Control, Evidence, Execution (supporting).

## Controls and human decisions

Require approval for purchases and contractual changes. Prevent repeated tool calls from creating duplicate orders.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure delivery recovery, stockouts, rework, duplicate actions, planner effort, and total cost of the chosen remedy.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

A proposed substitute may violate engineering, quality, or contractual requirements. Obtain the relevant approval before changing the plan.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.

- [Government guidance on integrating AI in operational technology](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4347041/nsa-cisa-and-others-release-guidance-on-integrating-ai-in-operational-technology/), December 2025. Additional reading for deployments that interact with industrial systems.
