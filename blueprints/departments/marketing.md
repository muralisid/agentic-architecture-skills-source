---
reader_summary: "Adapt the Marketing blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Marketing leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Marketing."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/supply-chain"
---

# Marketing

A proposed workflow for marketing. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

A marketing team needs to explain a new service to a specific audience using accurate claims and approved brand material.

![Prepare a supported campaign: Define the audience, then Gather approved facts, then Draft variants, then Review the claims, then Measure response.](/figures/blueprints/marketing-mobile.svg)

## Start with the simplest useful solution

Compare the agent with templates, approved copy, and a conventional campaign experiment. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Content drafting agent | Produces drafts against brief, brand corpus and prior performance | A2, L1 | Human edit before publication is the control, not a courtesy |
| Campaign operations agent | Assembles, schedules and QAs campaign mechanics across platforms | A3, L1 | The best-evidenced win: mechanical, bounded, verifiable |
| Performance analysis agent | Explains campaign performance against history with provenance | A2, L2 | Explains; the marketer decides |
| Localisation agent | Adapts approved content per market against local rules | A2 to A3, L1 | Local disclosure and labelling rules vary sharply |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Knowledge (**direct**: brand and claims corpus with an owner), Human (**direct**: publication approval), Evidence (**direct**: synthetic-content labelling), Improvement (**direct**), Action, Control, Execution (supporting).

## Controls and human decisions

Review product claims and image rights. Apply audience permissions and publication approval outside the model.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure incremental qualified response, conversion, cost, complaints, and correction effort.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

Generating more content is not evidence of business growth. Test audience relevance and factual accuracy before increasing volume.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
