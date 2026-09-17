---
reader_summary: "Adapt the Sales blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Sales leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Sales."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/marketing"
---

# Sales

A proposed workflow for sales. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

An account manager wants to identify where an existing customer might benefit from another service. The evidence spans contracts, product use, service issues, and previous commitments.

![Prepare an account opportunity: Read account context, then Find a useful need, then Test the opportunity, then Review the offer, then Learn from results.](/figures/blueprints/sales-mobile.svg)

## Start with the simplest useful solution

Compare the agent with cRM reports, renewal alerts, and a structured account review. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Account research agent | Assembles account context from CRM, news, product usage and past interactions with provenance | A2, L1 | The unglamorous winner. Solitary work, measurable, contained |
| CRM hygiene agent | Proposes and applies structured updates from call notes and email | A3 on structured fields, A2 on narrative, L1 | Where the administrative time actually goes |
| Inbound qualification agent | Engages inbound enquiries, qualifies against stated criteria, routes | A3, L2 | Customer-facing. Inherits the entire customer-service control set |
| Forecast analysis agent | Explains pipeline movement against history, flags inconsistency | A2, L2 | Explains; the manager forecasts |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Action (**direct**: CRM gravity is strongest here, and agents reach records through wrapped governed APIs), Knowledge (**direct**), Improvement (**direct**), Control (**direct** for the inbound agent, which sits in the customer-facing lane), Human, Evidence, Execution (supporting).

## Controls and human decisions

Use permitted account data. Have the account owner approve claims, pricing, and external contact.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure qualified opportunities, conversion, margin, customer retention, and preparation time against a comparable baseline.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

An observed pattern is a lead to investigate. It does not establish customer intent or permission to contact someone.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
