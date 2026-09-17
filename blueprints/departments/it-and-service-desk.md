---
reader_summary: "Adapt the IT and Service Desk blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","IT and service-management lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for IT and Service Desk."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/customer-service"
---

# IT and service desk

A proposed workflow for it and service desk. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A colleague cannot access an approved application. The service team needs to distinguish a missing entitlement from an outage or a device fault.

![Resolve a service request: Check identity, then Read service history, then Diagnose the request, then Approve the change, then Confirm recovery.](/figures/blueprints/it-and-service-desk-mobile.svg)

## Start with the simplest useful solution

Compare the agent with a current knowledge article and a rules-based request form. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Why here |
|---|---|---|---|
| Triage agent | Classifies, enriches with asset and entitlement context, routes | A3, L2 | Highest volume, cheapest failure, cleanest labels. This is the eval-suite factory for everything else |
| Knowledge agent | Answers from a curated, owned corpus; refuses and escalates on weak evidence | A2 to A3, L1 to L2 | The corpus is the product. Refusal behaviour is the quality signal |
| Provisioning agent | Executes bounded, reversible fulfilment: group membership, licence assignment, software deployment | A3, L1 | Deliberately L1. Provisioning is where a learned shortcut becomes an entitlement error |
| Diagnostic agent | Correlates telemetry, reproduces, proposes a fix with evidence | A2, L2 | Proposes only. The human applies |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

| Plane | Role |
|---|---|
| Knowledge | **Direct.** Curated per-intent corpora with named owners. The whole quality story |
| Action | **Direct.** Tool servers wrapping the ITSM platform's governed APIs and the identity platform's provisioning APIs |
| Control | **Direct.** Registry, agent identity, the deterministic gate on provisioning |
| Improvement | **Direct.** Ticket outcomes are labelled by resolution, which makes this the best-instrumented learning loop in the enterprise |
| Evidence | Supporting. Standard evidence floor |
| Execution | Supporting. Retrieval-grade isolation is sufficient; no code execution needed |
| Human | **Direct.** Tier 2 becomes the exception queue, and its shape changes |

## Controls and human decisions

Never approve your own privilege increase. Check entitlement in the identity system before every change.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure successful recovery, reopened tickets, time to human support, and specialist review minutes.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

A ticket marked closed does not prove the colleague can work. Diagnose unfamiliar failures with a specialist.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
