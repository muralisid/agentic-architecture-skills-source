---
reader_summary: "Adapt the Public Sector blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Public-sector digital-services lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Public Sector."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/decisions"
---

# Public sector

A proposed workflow for public sector. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A public body needs to assemble the records for a permit or benefits case. Staff must identify missing evidence, apply the correct policy version, and provide an understandable explanation.

![Prepare a complete service case: Receive the case, then Find required evidence, then Identify missing facts, then Officer review, then Explain the outcome.](/figures/blueprints/public-sector-mobile.svg)

## Start with the simplest useful solution

Compare the agent with structured forms, document checklists, and case-management rules. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Case preparation agent | Assembles the file, checks completeness, flags missing evidence, drafts the summary | A3, L2 | The strongest case in the vertical. Prepares; the officer decides |
| Citizen enquiry agent | Answers process and status questions from a governed corpus | A3, L2 | Full customer-facing control set, plus accessibility duties |
| Records and retention agent | Classifies, applies retention schedules, prepares disclosure responses | A3, L1 | Statutory retention is deterministic |
| Translation and plain-language agent | Adapts official communication for language and reading level | A2, L1 | High value, low risk, consistently underused |
| Eligibility decision agent | Decides entitlement | Not recommended at any autonomy level | Assess applicable law and preserve an effective route to human review |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Control (**direct**), Evidence (**direct**: appealability makes the evidence plane load-bearing), Execution (**direct**: sovereignty routing), Knowledge (**direct**), Human (**direct**), Action, Improvement (supporting).

## Controls and human decisions

Keep consequential decisions with authorised officers under applicable policy. Provide a way to correct records and challenge an outcome.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure time to a complete case, repeat requests, decision corrections, accessibility, and the effort required from the applicant.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

Test cases involving missing records, language differences, and unusual circumstances. An incomplete digital record must not be treated as proof that a claim is false.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
