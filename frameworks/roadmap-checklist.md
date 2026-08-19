# The Roadmap Checklist

As of August 2026. Phase 5 deliverable. A generator, not a menu: answer nine questions, and the modifiers they emit compose into your roadmap.

---

## How this works

There is a fixed spine of six stages. Each stage has an **entry gate** (what must be true to begin) and an **exit gate** (what must be proven to leave). No stage carries a duration, because no published evidence supports one and the guide does not defend timelines it cannot source.

Nine factors modify the spine. Each answer emits modifiers: gates added, work pulled forward or deferred, prohibitions, and defaults set. Your roadmap is the spine plus every modifier your answers emit.

**Conflict rule: when two modifiers conflict, the more restrictive wins.** This is what makes the generator deterministic rather than a matter of interpretation, and it is the rule that stops an aggressive risk appetite from cancelling out a regulatory constraint.

## The spine

### S0 Ground

**Entry gate.** None. Everyone starts here, including enterprises with agents already in production, because the point of S0 is to find out what you actually have.

**Work.** Run the readiness assessment across its six dimensions. Run the first use-case portfolio round. Define the sponsor model. Write down the deterministic-zone list for your business: which decisions will never be made by a model here.

**Exit gate.** A recorded readiness profile. At least three use cases through all three portfolio admission gates. A named sponsor per candidate use case. The deterministic-zone list written down and agreed, not assumed.

### S1 First value

**Entry gate.** S0 exit.

**Work.** Take the solitary-work wins, which are real, cheap and immediate. Ship one evaluable use case at A2. Instrument the evidence floor: registry entry, retained action logs, named oversight, provenance-carrying grounding.

**Exit gate.** A measured cost per resolved outcome for that one use case, not an estimated one. An eval suite that exists and is owned by a domain SME. Traces collected outside the agent's control, which is a decision that cannot be made retroactively.

### S2 Platform

**Entry gate.** S1 exit.

**Work.** Control plane: agent registry with owner and risk tier, first-class agent identities with short-lived credentials, a policy decision point in the tool-call path, tool servers wrapping governed APIs. Knowledge plane: purpose-scoped curation with named corpus owners, ACL propagation into derived artifacts, provenance attached at parse time.

**Exit gate.** No production agent running on credential-only identity. Every consequential action passing a deterministic gate the agent cannot bypass. An erasure cascade tested end to end, including vectors and traces. A kill switch drilled at more than one point.

### S3 Scale

**Entry gate.** S2 exit.

**Work.** Expand the portfolio. Stand up the L2 learning loop: promotion gated on counterexample survival and eval regression, promoted artifacts landing outside the model, demotion path live. Per-agent budget envelopes with variance alerting. Bridge two-estate telemetry into one view.

**Exit gate.** At least one promoted artifact **and** at least one demoted artifact, because a promotion-only pipeline has not been tested. Budget envelopes live with anomaly alerting. Licensed-estate telemetry visible alongside metered-estate telemetry.

### S4 Autonomy

**Entry gate.** S3 exit, plus oversight capacity calculated per the A4 gate: fan-out with wait time included, expressed as a burst rate, using measured interaction and wait times from the workload itself.

**Work.** Run A4 workloads. Instrument supervision load, intervention rate, escalation mix by trigger and wait time per item. Design rotation and deliberate unassisted practice against skill erosion.

**Exit gate.** Burst-rate capacity measured in production and not exceeded, including across the whole approved portfolio rather than per workload. Intervention rate instrumented and behaving as calibrated oversight predicts: broader standing permission alongside more frequent intervention, not less.

### S5 Extend

**Entry gate.** S4 exit for the internal lane.

**Work.** Open the lanes that carry different failure models. Customer-facing: a separate edge on the shared control plane. Operational technology: read-only or advisory, never inside a protection layer, with tested revert-to-manual.

**Exit gate.** Per lane. Customer-facing measured on resolution rather than containment, with escalation to a real human queue that exists before launch. OT measured in specialist hours and avoided interventions, with the agent's output visually distinct from configured alarms.

## The nine factors

### F1 Audience

| Answer | Modifiers emitted |
|---|---|
| Internal-first | Spine unchanged. Customer-facing deferred to S5 |
| Customer-facing now | The customer lane runs in parallel from S2 with its own edge. Adds three gates before launch: disclosure compliance, escalation to a real human queue, resolution instrumented from day one. Prohibition: no A3 or above customer-facing before S3 exit |
| Both | Two portfolios with separate supervision budgets. Separate edges, shared control plane. Duplicating knowledge, identity, evaluation and observability across the two is a defect, not a safeguard |

### F2 Archetype

| Answer | Modifiers emitted |
|---|---|
| Global regulated enterprise | S2 doubles: the metered estate is governed, the licensed estate is telemetry-extracted and tenant-policied, and pretending one gateway covers both is the archetype's characteristic error. Adds sovereignty routing to the S2 exit gate |
| Mid-market | S2 is rented except the knowledge plane, which is the one thing worth building. L1 curated learning is the honest ceiling unless eval machinery is genuinely acquired. S4 is rarely reached, and that is a legitimate destination rather than a failure |
| Digital native | Control and evidence planes pull forward into S1, because they are the work this archetype defers and the work that is expensive to retrofit. Adds an explicit A4 self-assessment against the oversight gate, since capability here usually outruns instrumentation |

### F3 Regulatory intensity

| Answer | Modifiers emitted |
|---|---|
| Light | Evidence floor only. Article-12-grade instrumentation is not proportionate |
| Sectoral | Evidence floor plus the sector regulator's specific requirements. Note that sectoral regulators are moving faster than horizontal law, so the sector requirement usually binds first |
| High-risk plausible | Article-12-grade instrumentation for the plausible tier. Classification work starts at S0, not at S4, because standards lead times run beyond twelve months. The provider-flip trap is a design constraint from the first architecture decision |

### F4 Sovereignty

| Answer | Modifiers emitted |
|---|---|
| Tier S0 to S1 | No modifier |
| Tier S2 | Sovereign-offering selection added to S2. Derived-artifact residency proof added to the S2 exit gate |
| Tier S3 to S4 | Serving infrastructure becomes its own stage before S2. Model currency burden explicitly owned. No cost argument may be claimed, because no peer-reviewed unit economics exist for the comparison |

### F5 Risk appetite

| Answer | Modifiers emitted |
|---|---|
| Conservative | Reversibility weighted harder in the portfolio score. A3 ceiling until S4 exit |
| Balanced | Default |
| Aggressive | **Does not remove gates.** It shifts the portfolio mix toward higher blast radius earlier, which raises the S2 control-plane bar rather than lowering it. An aggressive appetite buys earlier consequential work, paid for with earlier controls |

### F6 Data readiness

Taken directly from the readiness assessment's six dimensions, scored 0 to 3. The profile governs, not the total.

| Answer | Modifiers emitted |
|---|---|
| Any dimension at 0 for the target workload | A1 only. S1 is the entire roadmap until the zero is fixed |
| Data and integration at 2 or above, others at 1 or above | A2 permitted |
| All dimensions at 2 or above | A3 permitted |
| Identity dimension below 2 | Hard cap on autonomy regardless of other scores. Identity gaps gate autonomy, they do not gate starting |

### F7 Vendor gravity

Gravity changes the interface, not the architecture. These modifiers are correspondingly light.

| Answer | Modifiers emitted |
|---|---|
| Productivity-led | S1 solitary wins are bundled and immediate. Adds a utilisation measure to the S1 exit gate, because mistaking licence utilisation for value is this path's failure mode |
| Record-system-led | S2 action plane is tool servers wrapping the suite's already-governed APIs. Embedded agents where the record and its permission model live; build on primitives for anything spanning suites |
| Cloud-native | The gateway is trivial and the registry is the gap. Allowlist discipline added to the S2 exit gate: registry listing is not trust |

### F8 Build capacity

| Answer | Modifiers emitted |
|---|---|
| No platform team | S2 is rented. Do not attempt a platform. One independent capability at most, chosen because it can be operated by the people present |
| One team | S2 scoped to the control plane only. Knowledge plane bought or outsourced, with corpus ownership retained internally, because ownership is the part that cannot be outsourced |
| Platform organisation | Full spine |

### F9 Cost preference

| Answer | Modifiers emitted |
|---|---|
| Fixed, seat-based | Utilisation measurement becomes a stage-exit criterion. Capability-surface gating must be operated as a live process, because per-user licensing removed the cost brake that used to limit presence identity |
| Variable, metered | Per-run budget enforcement in the harness moves to an S2 exit criterion rather than an S3 refinement. The loop multiplier is a design input, not a surprise |
| Mixed | A two-estate cost view is required at the S3 exit gate |

## Running the generator

1. Answer the nine factors honestly, using the readiness assessment for F6 rather than estimating it.
2. Collect every modifier emitted. Apply the conflict rule: more restrictive wins.
3. Write the resulting stage list with its composed entry and exit gates. This is your roadmap.
4. Run the use-case portfolio against it quarterly. Stage exits and portfolio rounds are different cadences and should not be merged.
5. Re-run the whole generator when a factor answer changes. A first regulated customer, an acquisition, or a shift from metered to seat pricing each change the roadmap, and the change is a new roadmap rather than an amendment.

## What the generator does not decide

Vendor selection, which follows from the question bank in Phase 7. Department and vertical specifics, which are the blueprints in Phase 6. And the order of use cases inside a stage, which is the portfolio framework's job and depends on measurements you will only have after the first cycle.

## Sources

[readiness-assessments.md](readiness-assessments.md) for F6. [use-case-portfolio.md](use-case-portfolio.md) for the portfolio cadence. [../synthesis/maturity-model.md](../synthesis/maturity-model.md) for the A-levels and the oversight gate. [../synthesis/master-target-state.md](../synthesis/master-target-state.md) for the planes referenced in S2. [../synthesis/sovereignty-matrix.md](../synthesis/sovereignty-matrix.md) for the F4 tiers. Evidence for every gate lives in the research tracks named in those chapters.
