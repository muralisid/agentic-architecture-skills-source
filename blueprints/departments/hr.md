---
reader_summary: "Adapt the HR and People blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","HR leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for HR and People."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/sales"
---

# HR and people

A proposed workflow for hr and people. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

An employee asks which leave policy applies to a particular location and contract. The answer depends on current policy and access-controlled employee information.

![Answer an employee policy question: Verify access, then Find current policy, then Check applicability, then Review exceptions, then Explain next steps.](/figures/blueprints/hr-mobile.svg)

## Start with the simplest useful solution

Compare the agent with a maintained policy search and a structured employee-service form. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Employee query agent | Answers policy, benefits, leave and payroll questions from a curated corpus | A3, L2 | The clear win. High volume, contained failure, measurable |
| Onboarding orchestration agent | Coordinates provisioning, scheduling and paperwork across systems | A3, L1 | Deterministic access decisions, as in the IT blueprint |
| Recruitment screening assistant | Summarises applications against stated criteria, surfaces evidence | A1, L0 | Deliberately the lowest position in any blueprint in this guide. See controls |
| Workforce insight agent | Analyses aggregate workforce data for planning | A2, L1 | Aggregate only. Individual-level inference is a different product with different duties |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Knowledge (**direct**), Control (**direct**), Evidence (**direct**: consultation records as well as action logs), Human (**direct**), Action (supporting), Improvement (supporting), Execution (supporting).

## Controls and human decisions

Separate policy assistance from employment decisions. Route hiring, performance, disciplinary, and disputed eligibility decisions to accountable people.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure correct policy application, reopened requests, stale answers, access violations, and employee effort.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

A policy answer may depend on local rules or individual agreements. The design requires a jurisdiction and employment-policy review before use.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
