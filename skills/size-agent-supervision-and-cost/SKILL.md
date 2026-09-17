---
name: size-agent-supervision-and-cost
description: >-
  Work out how much human supervision an agent portfolio actually needs and what
  it costs per resolved outcome. Covers supervision as a burst-rate capacity
  constraint across the whole portfolio rather than per workload, the oversight
  gate above A3, cost per run against cost per resolved outcome including
  supervision labour and wrong outcomes, and budget envelopes. Use whenever
  building a business case for agents, sizing an oversight or approval team,
  answering how many agents one person can supervise, or reviewing an agent
  programme whose economics assume the supervision is free.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: enterprise
  kind: task
---

# Size the supervision, then the cost

Two numbers decide whether an agent programme is viable, and business cases routinely omit both: the supervision capacity the portfolio consumes, and the cost per resolved outcome once supervision and wrong outcomes are counted.

## 1. Supervision is a portfolio constraint, in bursts

Workloads are approved one at a time and supervised collectively. Five workloads that each consume a third of one supervisor's burst capacity do not fit inside one supervisor, and the arithmetic is never performed because no single approval exceeds the limit. Size the portfolio, not the workload.

Size it on the burst rate rather than the average. Exceptions do not arrive evenly: they cluster where the work clusters, and a queue sized for the mean fails exactly when it matters. `references/supervision-and-oversight.md` carries the burst-rate treatment and the instrumentation that makes it observable.

**No credible human-to-agent supervision ratio has ever been published.** Refuse to quote one, including the widely circulated figures. What can be measured in your own estate: exceptions per hour at peak, minutes per exception, and the share auto-approved. Those three give a capacity number that is yours rather than borrowed.

## 2. The oversight gate above A3

Autonomy above A3 carries an oversight-capacity precondition, expressed as a burst rate, on the autonomy axis itself rather than as a separate axis. `references/autonomy-contract.md` states it. The reason it is a precondition and not a trade: modelling oversight as an independent axis would imply an organisation can buy autonomy by accepting less oversight, which is the trade the gate exists to forbid.

Watch the shape, not only the level. Auto-approval rises with experience, and so does the interrupt rate: the expected pattern is calibrated oversight rather than a ratchet toward less of it. A falling interrupt rate with rising volume is a signal to check whether the approvals are still being read.

## 3. Two levels of cost

`references/economics-model.md` sets out both:

- **Cost per run** reconciles to the invoice. It is what platforms meter and what your finance team will see.
- **Cost per resolved outcome** decides the business case. It includes the runs that did not resolve anything, the supervision labour, and the cost of wrong outcomes.

A cost model that prices agent actions but not the governance plane is wrong by a variable amount, and in one vendor stack the governance plane is a separately priced per-user item. Budget envelopes per workload, enforced in the harness and at the gateway, are what stops a runaway loop from becoming an invoice.

## 4. What to measure

Exceptions per hour at peak; minutes per exception; auto-approval share and interrupt rate over time; resolved outcomes; cost per resolved outcome including supervision; the rate of wrong outcomes and what each costs; and the budget envelope against actual spend. `references/observability-and-finops.md` has the instrumentation and the traps, including the metrics that flatter a programme without measuring it.


## Applying this guidance

Treat the supplied references as a starting point, not proof that a recommendation fits the task. Check important claims against dated external evidence. Distinguish proposed industrial examples from delivered work and author-reported experiments. Use the user’s actual industry and constraints; utilities and mining are examples, not universal requirements. Keep working-file and internal repository references out of reader-facing reports.

## Additional task references

- [Measure value and full cost](references/use-cases-value-and-investment.md): consult when this aspect is part of the task.
