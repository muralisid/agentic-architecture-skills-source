---
name: review-agent-architecture
description: >-
  Review an agent architecture, design document, or proposed rollout against a
  vendor-neutral reference: the seven planes, the two plane rules, the four
  deterministic zones, the ten cross-cutting concerns, and twenty-five contested
  technology choices with verdicts. Produces findings ordered by severity, each
  naming the rule broken and the evidence behind it. Use whenever someone asks
  for a review or a second opinion on an AI agent design, an architecture
  decision record, a vendor proposal, or a plan to put agents into production,
  and whenever a design needs checking for boundary violations before it ships.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: task
---

# Review an agent architecture

Read the design under review first. `references/target-state-architecture.md` is the shape to compare it against: seven planes across fourteen layers, what each plane is responsible for, and the two-estate reality every design has to survive. Then work the four passes below in order and stop at the first pass that produces a blocking finding, because a broken boundary makes the later passes moot.

## Pass 1: the two plane rules

Both rules are violated more often than any other part of the reference. Check each against the design:

1. **Enforcement lives in the control plane, never in the execution plane.** An instruction in a prompt is a preference. The same rule becomes a control when a gateway or a policy decision point evaluates it. Ask: if the model ignored this instruction, what would stop the action? If the answer is "nothing", the design has no control here.
2. **The evidence plane is fed by collection the agent cannot influence.** Anything an agent reports about itself is testimony. Ask: could a misbehaving agent suppress or alter this record?

`references/enforcement.md` carries the three enforcement tiers and what belongs in each.

## Pass 2: the four deterministic zones

For every action the design lets an agent take, ask whether it lands in a zone where a model may advise but never decide: access and entitlements, movement of money, safety actuation, formal regulatory records. A model output inside a zone must be an input to a deterministic rule, never the decision. `references/deterministic-zones.md` has the zone-by-zone detail and the implementation pattern.

Findings here are blocking. Everything else is a matter of degree.

## Pass 3: the ten cross-cutting concerns

Walk `references/cross-cutting-concerns.md` and, for each concern, name who owns it and where it is enforced in this design. A concern with no named enforcement point is a gap; say so plainly rather than assuming a platform covers it. Six concerns have no complete published answer anywhere, and the matrix marks them: do not report those as defects of the design under review.

## Pass 4: the contested choices

`references/decision-catalog.md` holds twenty-five choices usually made by habit, each with a verdict and the discriminator that decides a given case. Where the design has made one of these choices, check it against the discriminator rather than the verdict: the verdict is the common answer, the discriminator is what makes it right or wrong here. Quote the discriminator in the finding.

## Reporting

Order findings by severity: deterministic-zone violations, then enforcement placed inside the model, then evidence the agent can influence, then unowned concerns, then contested choices made against their discriminator. For each finding give the rule, what the design does, what it should do instead, and the reference file and section that supports it. Where the reference has no answer, say the reference has no answer rather than inventing one.

## What this reference will not tell you

Product selection, pricing, and sequencing. It names representative products for orientation only, and it publishes no timeline, no supervision ratio, and no build-versus-buy figures, because the evidence for those does not exist in a form worth quoting.
