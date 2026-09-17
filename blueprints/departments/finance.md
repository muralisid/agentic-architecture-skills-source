---
reader_summary: "Adapt the Finance blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Finance leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Finance."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/departments/hr"
---

# Finance

A proposed workflow for finance. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

An invoice does not match the purchase order and receipt. A finance analyst must establish whether the mismatch is timing, quantity, price, or an incorrect record.

![Investigate a reconciliation exception: Find the exception, then Collect records, then Reconcile the facts, then Review the proposal, then Record the outcome.](/figures/blueprints/finance-mobile.svg)

## Start with the simplest useful solution

Compare the agent with deterministic three-way matching and a well-designed exception queue. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Invoice exception agent | Investigates match failures, gathers evidence, proposes disposition | A3, L2 | Start where exception records and reviewer decisions are available |
| Reconciliation agent | Explains variances across ledgers and subledgers with provenance | A2 to A3, L2 | Explains; the accountant disposes |
| Close assistance agent | Assembles schedules, chases open items, drafts commentary against actuals | A2, L1 | Compresses the tail of close, which is where the overtime lives |
| Reporting draft agent | Drafts management and statutory narrative from governed numbers | A1 to A2, L1 | Drafts only. Attestation is deterministic and human |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Knowledge (**direct**: semantic contracts on every numeric answer), Action (**direct**: wrapped ERP and banking APIs), Control (**direct**: the two deterministic zones), Evidence (**direct**: records regimes), Human (**direct**), Improvement (supporting), Execution (supporting).

## Controls and human decisions

Use accounting software for calculations. Keep payment approval and segregation of duties in established systems.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure exceptions cleared correctly, rework, close-cycle delays, reviewer minutes, and duplicate postings.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

A plausible explanation does not prove a balance is correct. Keep the original documents and the calculated reconciliation available.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
