---
name: build-agent-evals-and-evidence
description: >-
  Build the two things that let an agent's behaviour change safely: an
  evaluation suite owned by the people who know the work, and an evidence trail
  the agent cannot influence. Covers eval tasks drawn from real failures, judge
  calibration, promotion gated on counterexample survival with a demotion path,
  staged rollout, traces and unit economics, and the evidence floor a deployer
  owes. Use whenever setting up evals for an agent, deciding whether a change
  may ship, designing observability or audit for agents, or answering what
  evidence a regulator or auditor will expect.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: task
---

# Build the evals and the evidence trail

These are one piece of work. The eval suite decides whether a change is an improvement; the evidence trail is what makes the answer checkable later by someone who was not there.

## 1. The eval suite

Twenty to fifty pass-or-fail tasks, drawn from real failures rather than imagined ones, owned by a domain expert rather than the platform team, with a human baseline on the same tasks. `references/learning-flywheel.md` has the construction and the promotion gate.

Three rules that the evidence forced:

- **Gate on counterexample survival and eval regression, never on frequency.** A pattern seen often is not a pattern that is right; the published promotion experiments failed in both directions when frequency was the gate.
- **Name the enforcement tier.** A rule the model merely reads is still a soft rule. The hard tier is policy as code, outside the model.
- **Ship a demotion path and exercise it.** Roughly three quarters of policy statements depend on context that cannot be predefined, so a promoted rule that stops working must be able to come back out.

## 2. Judges, and their limits

Where a model grades, the judge is a governed component: calibrate it against human labels on a schedule, pin its version, and never let anything grade its own work. `references/intelligence-and-learning.md` carries the calibration practice and the reward-hacking failure modes.

**The eval harness is an attack surface.** A zero-capability agent scored full marks on several major agent benchmarks, and on one, editing about ten lines in a single test configuration file passed every instance. The recurring vulnerability was no isolation between the agent and the evaluator. If evals are the governance instrument, they inherit the security requirements of one.

## 3. Rollout

Shadow, then canary, then full, with the eval suite run on every release and on every model change. A model name is not a version: pin what you can, and treat a vendor's model update as a change that re-runs the suite.

## 4. The evidence trail

`references/observability-and-finops.md` and `references/governance-and-evidence.md` carry this. The properties that matter:

- Traces, decisions and provenance are collected by a channel the agent cannot write to. Anything an agent reports about itself is testimony, not evidence.
- The span carries the person, the agent identity, the tool, the decision, the tokens and the cost, so the same record answers the audit question and the unit-economics question.
- Retention meets the deployer duty for the risk tier, and the trail is exportable.
- Cost is measured per resolved outcome, including supervision labour and the cost of wrong outcomes, not per run. Platforms meter per run; businesses decide per outcome.

## 5. What to refuse

Benchmark scores from a harness with no isolation between agent and evaluator. Containment or deflection as a target metric, in any form: every documented reversal of an AI-first programme set one. Any claim of improvement that rests on a judge from the same model family as the generator, unless a cross-family judge agrees.


## Applying this guidance

Treat the supplied references as a starting point, not proof that a recommendation fits the task. Check important claims against dated external evidence. Distinguish proposed industrial examples from delivered work and author-reported experiments. Use the user’s actual industry and constraints; utilities and mining are examples, not universal requirements. Keep working-file and internal repository references out of reader-facing reports.
