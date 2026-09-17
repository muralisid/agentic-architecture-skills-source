---
reader_summary: "Adapt the Banking and Financial Services blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Banking architecture and risk lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Banking and Financial Services."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Proposed design, revised 2026-09-17. Outcomes require local evaluation."
next: "/docs/blueprints/verticals/manufacturing-and-supply-chain"
---

# Banking and financial services

A proposed workflow for banking and financial services. Revised 17 September 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

## The business opportunity

An analyst investigates an account-service or transaction exception. The task needs source records, the relevant policy, and an explanation a reviewer can check.

![Prepare a reviewable case: Gather the case, then Check source records, then Compare explanations, then Review the decision, then Keep the evidence.](/figures/blueprints/banking-and-financial-services-mobile.svg)

## Start with the simplest useful solution

Compare the agent with existing case-management rules and analyst search tools. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

## Proposed responsibilities

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Servicing agent | Handles narrow, recoverable customer intents within the customer's own scope | A3, L2 | Customer-facing lane, full control set |
| Financial crime investigation agent | Assembles alert context, retrieves history, drafts the narrative, proposes disposition | A3 on disposition proposal, L2 | The strongest internal case in the vertical: alert volume is high, the labels are real, and the analyst stays the decider |
| Credit file assembly agent | Gathers, validates and structures the evidence a credit decision requires | A3, L1 | Assembles evidence. Does not decide credit |
| Regulatory reporting draft agent | Drafts narrative against governed numbers | A1 to A2, L1 | Drafts. Attestation is deterministic and human |
| Payment exception agent | Investigates failed and returned payments, proposes remediation | A3, L2 | Remediation executes through mandate-bound authorisation |

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule. The autonomy and learning positions are starting choices to test, not certification levels.

## How the architecture supports the task

Control (**direct**: two deterministic zones plus model risk management), Evidence (**direct**: several regimes at once), Knowledge (**direct**), Action (**direct**), Human (**direct**), Improvement (**direct**), Execution (**direct**: sovereignty and classification routing).

## Controls and human decisions

Keep credit decisions, payment authority, and regulated reporting under the institution's approved controls. Confirm the exact legal requirements for the intended jurisdiction and activity.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

## Economics and measures

Measure review quality, rework, analyst time, customer impact, and completeness of the decision record.

Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and improved outcomes with the full cost of tools, models, evidence preparation, supervision, and correction.

## Limits to test

This is a design proposal, not evidence of regulatory compliance. A control at execution does not by itself protect against misleading information earlier in the workflow.

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.
