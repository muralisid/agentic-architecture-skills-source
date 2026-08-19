# Vertical Blueprint: Manufacturing and Supply Chain

As of August 2026. Phase 6. The literal bottling plant.

---

## 1. The scenario

A manufacturer runs an ERP for planning, an MES on the shop floor, a historian collecting process data, a maintenance system against an asset register, a WMS in the warehouse, and a quality function that owns both specification and release. Changeover between products is the expensive event. Unplanned downtime is the expensive failure.

This is the vertical the guide's founding metaphor came from, and testing it here is the most direct check available on whether the metaphor generalises.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Maintenance planning agent | Correlates condition data, history and work backlog; proposes and schedules maintenance | A3, L2 | The best internal case. Failures cost a rescheduled job |
| Quality investigation agent | Assembles process, batch and inspection evidence for a deviation; proposes root cause | A2 to A3, L2 | Proposes. Quality releases |
| Changeover assistance agent | Retrieves the procedure, the last changeover's issues and the current line state | A2, L1 | Directly the residual work the metaphor describes |
| Supply exception agent | The supply-chain department blueprint, applied to production materials | A3, L2 | See the department blueprint |
| Production control agent | Takes autonomous production action | Not recommended | No named-factory case with measured outcomes exists. See limits |

## 3. Planes activated

Knowledge (**direct**: historian, asset register, procedures, batch records), Human (**direct**: the floor crew is the point), Action (**direct** on the information path), Improvement (**direct**), Evidence, Control, Execution (supporting, with the OT boundary from R05).

## 4. Controls

- **The OT boundary from the utilities blueprint applies unchanged.** Agents on the information path, not the control path. Agent output is never an independent protection layer. Safety-instrumented functions exclude machine learning by standard.
- Batch and quality records carry regulatory weight in regulated manufacturing; drafting is permitted, release is not delegable.
- Agent output visually distinct from control-system alerts.
- Tested revert-to-manual; agent failure must not degrade production.
- Where the plant is in scope for industrial security regimes, agent connectivity is a segmentation question before it is an architecture question.

## 5. Economics

Value is measured in unplanned downtime avoided, changeover minutes recovered, scrap and rework reduced, and deferred asset replacement. Token cost is negligible against any of these.

The metaphor's own economics, stated honestly: physical automation at scale supports the direction, with one major logistics operator passing a million robots against roughly 1.2 million warehouse staff, employees per facility at a sixteen-year low, and packages shipped per employee rising more than twentyfold over a decade. What that supports is the direction and the shape of the residual work, not a ratio and not a timeline.

## 6. Honest limits

This is the vertical where the guide's founding metaphor gets tested, so the limits are stated at length.

- **The canonical lights-out figure is wrong.** The widely circulated claim that a famous automated electronics plant runs 128 robots with nine workers is a misquote; the primary reporting says several dozen workers per shift. Fourteen years later no plant of that kind has reached full lights-out at scale.
- **No named-factory case exists** of an MES agent taking autonomous production action with measured outcomes. Circulating figures trace to content farms.
- The residual work is real and stable: supervise, adjust, maintain, expand, improve are the tasks the human-factors literature identified in 1983 and has found stable since. That is what the metaphor supports.
- The honest version, and the one this guide defends: **different humans, doing different work, under a different failure model.** Not fewer humans on a schedule.

## 7. Metrics

Unplanned downtime. Changeover duration and first-pass yield after changeover. Maintenance schedule adherence and emergency work ratio. Deviation investigation cycle time. Specialist hours recovered. Time to revert to manual, drilled and timed.

## Sources

research/R05-lob-and-ot/, research/R13-operating-model/ (the metaphor test, the human-factors record, the crew-figure correction), research/R03-integration-fabric/, [../../synthesis/vision-and-target-state.md](../../synthesis/vision-and-target-state.md).
