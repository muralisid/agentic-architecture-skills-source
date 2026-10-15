---
name: assess-agent-readiness
description: >-
  Score whether an organisation is ready to run a specific agent workload, and
  say how much autonomy that workload may safely have. Asks twenty-eight
  questions across seven areas (data, integration and tools, identity and
  registry, controls on actions, testing and operations, cost and value, people
  and operating model), scores yes 3, partly 1, no 0, and reports a profile,
  never a total. Reads the autonomy ceiling the profile supports (A1 up to A5
  candidacy), applies two overrides (a Tier 3 workload needs controls at 3 for
  A3 or above; a session with untrusted input, sensitive data and external
  action is capped at A2), and lists what to fix before asking for more. Use
  whenever someone asks whether they are ready for AI agents, wants a readiness
  score or a gap list, is choosing an autonomy level for a workload, or is about
  to buy an agent platform before proving a workload.
license: CC-BY-SA-4.0
compatibility: The scoring script needs Python 3.9 or newer; no packages and no network. The assessment can also be scored by hand from the reference.
metadata:
  track: enterprise
  kind: task
---

# Assess readiness, then set the autonomy ceiling

Readiness is assessed per workload, never for an organisation as a whole. Two workloads in the same company routinely sit two autonomy levels apart, because readiness is about the data, the systems and the oversight that this particular work touches.

## 1. Pick the workload and the mode

Name one workload: the work, the systems it touches, the people who do it now. Then choose the mode from `references/readiness-assessment.md`: the light mode (28 questions) suits most organisations and takes an hour with the right people in the room; the heavy mode maps the same seven areas to the frameworks a regulated estate already runs.

## 2. Ask the twenty-eight questions

Seven areas, four questions each: data; integration and tools; identity and registry; controls on actions; testing and operations; cost and value; people and operating model. Each question is answered **yes**, **partly**, or **no** by the people who own the systems, not by the people who want the agent. The questions are in `references/readiness-assessment.md` with the guidance on what a yes actually requires. Questions 15 and 16 start with a condition. If it does not hold for the workload, answer yes and record why. Answer honestly: an inflated score produces an autonomy level the estate cannot support, and the failure shows up in production.

Also get the workload's risk tier (1, 2 or 3) from its risk profile. Note whether one session holds untrusted input, sensitive data and external action. The two overrides need both.

## 3. Score it

Run the script, or score by hand with the same rules. Yes is 3, partly 1, no 0. An area's score is its four answers added, divided by four, rounded down.

```
python3 scripts/score_readiness.py --interactive
python3 scripts/score_readiness.py --answers answers.json --tier 2
python3 scripts/score_readiness.py --answers answers.json --tier 3 --rule-of-two
```

It prints the seven-area profile, the autonomy ceiling, the reason for it, the overrides, and what to fund before the next level. `--answers` takes a JSON object of `{"data": ["yes","partly","yes","no"], ...}` with the seven area keys: data, integration, identity, controls, testing, cost, people. Report the profile in that order, never a total.

## 4. Read the ceiling, then apply the overrides

The ceiling table is in `references/readiness-assessment.md`. The weakest area sets it:

- Any area at 0: A1.
- Data and integration at 2 or more, all others at 1 or more: A2.
- Data, integration, identity, controls and testing at 2 or more, others at 1 or more: A3.
- All seven at 2 or more, with controls, testing and cost at 3: A4, with L2 governed learning and the oversight-capacity gate.
- All seven at 3, plus regulator-ready evidence: A5 candidacy, per domain only.

Two overrides then apply. Each can only lower the ceiling:

- A Tier 3 workload needs controls at 3 for A3 or above.
- A session with untrusted input, sensitive data and external action is capped at A2, whatever the scores.

## 5. Read the ceiling as a cap, not a target

The controls each level requires are in `references/autonomy-contract.md`. Two rules travel with the ceiling:

- The ceiling is the highest autonomy the evidence supports, not a recommendation to go there. Start below it and earn the move.
- At A4 and above, an oversight-capacity gate applies as well: the question is whether the supervisors can absorb the burst rate of exceptions, not whether the average load fits. `references/autonomy-contract.md` states it.

## 6. Report the gaps as work

For every area scoring below the level the workload needs, name the specific thing to fix and who owns it. `references/enterprise-archetypes.md` helps set expectations: a mid-market estate and a regulated global estate reach the same ceiling by different routes, and the archetype says which gaps are structural rather than a matter of effort.

## What the score does not decide

Whether the use case is worth doing. Readiness caps autonomy; value and evaluability decide funding, and those are a separate question with their own gates.


## Applying this guidance

Treat the supplied references as a starting point, not proof that a recommendation fits the task. Check important claims against dated external evidence. Distinguish proposed industrial examples from delivered work and author-reported experiments. Use the user's actual industry and constraints; utilities and mining are examples, not universal requirements. Keep working-file and internal repository references out of reader-facing reports.

## Additional task references

- [Build an agentic enterprise](references/use-cases-enterprise-transformation.md): consult when this aspect is part of the task.
