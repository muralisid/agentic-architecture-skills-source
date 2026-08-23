---
name: choose-first-agent-use-cases
description: >-
  Decide which AI agent use cases to fund first and which to refuse, using three
  admission gates (can the outcome be evaluated, does it decide inside a
  deterministic zone, is the grounding data ready) and a portfolio shape that
  keeps the first wave learnable. Includes worked department blueprints for the
  service desk, customer service and finance. Use whenever someone is choosing
  or prioritising agent use cases, building a pipeline or roadmap of AI
  workloads, writing an intake process, or arguing for a use case whose value
  is obvious but whose success cannot be measured.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: enterprise
  kind: task
---

# Choose the first use cases

The order matters: admit on evaluability, refuse on zone violations, then shape the portfolio. A candidate that passes on value alone is the common and expensive mistake.

## Gate 1: can the outcome be evaluated?

Evaluability is a gate, not a weighted criterion, and the reason is structural: the eval suite is what every later promotion, autonomy increase and reliability claim rests on. A use case whose success cannot be stated as a pass or fail on a known set of cases cannot earn autonomy, no matter how valuable it is.

Ask for three things before admitting a candidate: a definition of a resolved outcome, twenty to fifty pass-or-fail tasks drawn from real work, and a human baseline on the same tasks. If they do not exist, the candidate goes to a make-it-evaluable queue with an owner and a date. It does not go into the build queue, and it is not rejected either. `references/use-case-portfolio.md` has the intake form and the kill criteria.

## Gate 2: does it decide inside a deterministic zone?

Walk the candidate's actions against the four zones in `references/deterministic-zones.md`: access and entitlements, movement of money, safety actuation, formal regulatory records. A candidate that requires a model to make the decision inside a zone is refused as designed, and often survives as a redesign where the model drafts or recommends and a deterministic rule decides.

## Gate 3: is the grounding ready?

The data the agent will read must have an owner, permissions that travel into every derived copy, and a refresh path. More data is not better: a curated corpus cut hallucination from thirty-five percent to six in the published case, while growing an uncurated corpus made accuracy worse. If the corpus is not ready, the corpus is the project.

## Shape the portfolio

From the candidates that pass, choose a first wave that is learnable rather than impressive:

- Start where work is solitary rather than coordinated. Individually provisioned AI reliably improves solitary work and reliably fails to change coordinated work, because coordination needs new agreements between people.
- Prefer read-heavy before write-heavy, and reversible before irreversible.
- Prefer high volume with a stable shape, so twenty to fifty eval tasks actually represent the work.
- Cap the wave by supervision capacity across the whole portfolio, not per workload. Five workloads that each consume a third of a supervisor do not fit inside one supervisor, and the arithmetic is never done because no single approval exceeds the limit.

The department blueprints in `references/` show the shape end to end: `blueprint-it-service-desk.md` (the richest first-wave candidate, and the one that generates its own eval suite), `blueprint-customer-service.md` (where the containment trap lives), and `blueprint-finance.md` (where the zone boundary bites earliest). Each names the agents by function, states an autonomy and learning position, and ends with what the evidence does not support.

## Record the decision

For each candidate: the resolved outcome and its value, the evaluability verdict with the eval owner, the zone check, the grounding status, the autonomy level being requested, and the kill criteria. `references/autonomy-contract.md` states the controls each level requires, which is what the request is actually asking for.
