---
reader_summary: "Adapt the Customer Service blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Customer-service lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Customer Service."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/finance"
---

# Customer service

A proposed workflow for customer service. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A customer disputes a bill. The agent needs the account record, the applicable tariff or contract, and the earlier conversation.

![Resolve a customer problem: Verify the customer, then Gather account facts, then Explain the issue, then Approve a remedy, then Check resolution.](/figures/blueprints/customer-service-mobile.svg)

## Start with the simplest useful solution

Compare the agent with searchable help articles, a billing calculator, and established escalation rules. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Intent and triage agent | Classifies, retrieves the customer's own context, routes | A3, L2 | The safest and most valuable agent in the department |
| Resolution agent | Handles the narrow, well-instrumented, recoverable intent set end to end | A3, L2 | Scope by intent, never by channel |
| Account action agent | Executes bounded account changes within the customer's own scope | A3 on reversible actions, A2 on irreversible, L1 | Refunds and commitments are gated. See controls |
| Agent-assist | Drafts and retrieves for a human handling the tail | A1, L1 | Consistently the highest-return application in the department and the least demoed |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Knowledge (**direct**: a governed knowledge base, never model memory), Human (**direct**: escalation to a real queue), Evidence (**direct**: conversations are legal evidence), Action (**direct**), Control (**direct**: a separate edge on the shared control plane), Improvement (**direct**: customer escalations label failures for free, making this the highest-value trace source in the enterprise), Execution (supporting).

## Controls and human decisions

Require account verification before disclosure. Apply refund limits outside the model. Let the customer reach a person.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure resolution and repeat contact together, time to a person, disputed answers, and cost per resolved issue.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

A contained conversation is not necessarily a resolved issue. Test difficult cases, language differences, and incorrect source records.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
