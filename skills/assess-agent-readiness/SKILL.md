---
name: assess-agent-readiness
description: >-
  Score whether an organisation is ready to run a specific agent workload, and
  say how much autonomy that workload may safely have. Asks twenty-four
  questions across six dimensions (data, integration, identity, operational
  discipline, governance and value, workforce), computes a profile and the
  autonomy ceiling it supports (A1 to A4), and lists what to fix before asking
  for more. Use whenever someone asks whether they are ready for AI agents,
  wants a readiness score or a gap list, is choosing an autonomy level for a
  workload, or is about to buy an agent platform before proving a workload.
license: CC-BY-SA-4.0
compatibility: The scoring script needs Python 3.9 or newer; no packages and no network. The assessment can also be scored by hand from the reference.
metadata:
  track: enterprise
  kind: task
---

# Assess readiness, then set the autonomy ceiling

Readiness is assessed per workload, never for an organisation as a whole. Two workloads in the same company routinely sit two autonomy levels apart, because readiness is about the data, the systems and the oversight that this particular work touches.

## 1. Pick the workload and the mode

Name one workload: the work, the systems it touches, the people who do it now. Then choose the mode from `references/readiness-assessment.md`: the light mode (24 questions) suits most organisations and takes an hour with the right people in the room; the heavy mode adds evidence requirements and suits regulated estates.

## 2. Ask the twenty-four questions

Four questions per dimension, each answered **yes**, **partly**, or **no** by the people who own the systems, not by the people who want the agent. The questions are in `references/readiness-assessment.md` with the guidance on what a yes actually requires. Answer honestly: an inflated score produces an autonomy level the estate cannot support, and the failure shows up in production.

## 3. Score it

Run the script, or score by hand with the same rules (yes 2, partly 1, no 0, and a dimension's score is the floor of its four answers' mean):

```
python3 scripts/score_readiness.py --interactive
python3 scripts/score_readiness.py --answers answers.json
```

It prints the six-dimension profile, the autonomy ceiling, and the binding constraint. `--answers` takes a JSON object of `{"data": ["yes","partly","yes","no"], ...}` for the six dimension keys.

## 4. Read the ceiling as a cap, not a target

The mapping from profile to ceiling is in `references/readiness-assessment.md` and the controls each level requires are in `references/autonomy-contract.md`. Two rules travel with it:

- The ceiling is the highest autonomy the evidence supports, not a recommendation to go there. Start below it and earn the move.
- Above A3, an oversight-capacity gate applies as well: the question is whether the supervisors can absorb the burst rate of exceptions, not whether the average load fits. `references/autonomy-contract.md` states it.

## 5. Report the gaps as work

For every dimension scoring below the level the workload needs, name the specific thing to fix and who owns it. `references/enterprise-archetypes.md` helps set expectations: a mid-market estate and a regulated global estate reach the same ceiling by different routes, and the archetype says which gaps are structural rather than a matter of effort.

## What the score does not decide

Whether the use case is worth doing. Readiness caps autonomy; value and evaluability decide funding, and those are a separate question with their own gates.
