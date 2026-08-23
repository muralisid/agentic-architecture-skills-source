---
reader_summary: "Compose a six-stage enterprise roadmap from nine explicit factors, with entry and exit evidence instead of unsupported calendar promises."
audience: ["CIO/CTO", "Enterprise architect", "Transformation lead"]
decision_or_output: "Produce a stage-gated roadmap whose modifiers reflect your audience, archetype, risk, readiness, sovereignty, vendor gravity, capacity, and costs."
prerequisites: ["/docs/frameworks/readiness-assessments", "/docs/frameworks/use-case-portfolio"]
reading_time: "12 minutes"
evidence_status: "Author framework assembled from cited research; gates are evidence-informed, while the composition method is a practitioner design."
next: "/docs/architecture/master-target-state"
---

# The Roadmap Checklist

As of August 2026. Phase 5 deliverable. A generator, not a menu: answer nine questions, and the modifiers they emit compose into your roadmap.

---

## How this works

There is a fixed spine of six stages. Each stage has an **entry gate** (what must be true to begin) and an **exit gate** (what must be proven to leave). No stage carries a duration, because no published evidence supports one and the guide does not defend timelines it cannot source.

Nine factors modify the spine. Each answer emits modifiers: gates added, work pulled forward or deferred, prohibitions, and defaults set. Your roadmap is the spine plus every modifier your answers emit.

**Conflict rule: when two modifiers conflict, the more restrictive wins.** This is what makes the generator deterministic rather than a matter of interpretation, and it is the rule that stops an aggressive risk appetite from cancelling out a regulatory constraint.

## The spine

### Stage 0: Ground

**Entry gate.** None. Everyone starts here, including enterprises with agents already in production, because the point of Stage 0 is to find out what you actually have.

**Work.** Run the readiness assessment across its six dimensions. Run the first use-case portfolio round. Define the sponsor model. Write down the deterministic-zone list for your business: which decisions will never be made by a model here.

**Exit gate.** A recorded readiness profile. At least three use cases through all three portfolio admission gates. A named sponsor per candidate use case. The deterministic-zone list written down and agreed, not assumed.

### Stage 1: First value

**Entry gate.** Stage 0 exit.

**Work.** Take the solitary-work wins, which are real, cheap and immediate. Ship one evaluable use case at A2. Instrument the evidence floor: registry entry, retained action logs, named oversight, provenance-carrying grounding.

**Exit gate.** A measured cost per resolved outcome for that one use case, not an estimated one. An eval suite that exists and is owned by a domain SME. Traces collected outside the agent's control, which is a decision that cannot be made retroactively.

### Stage 2: Platform

**Entry gate.** Stage 1 exit.

**Work.** Control plane: agent registry with owner and risk tier, first-class agent identities with short-lived credentials, a policy decision point in the tool-call path, tool servers wrapping governed APIs. Knowledge plane: purpose-scoped curation with named corpus owners, ACL propagation into derived artifacts, provenance attached at parse time.

**Exit gate.** No production agent running on credential-only identity. Every consequential action passing a deterministic gate the agent cannot bypass. An erasure cascade tested end to end, including vectors and traces. A kill switch drilled at more than one point.

### Stage 3: Scale

**Entry gate.** Stage 2 exit.

**Work.** Expand the portfolio. Stand up the L2 learning loop: promotion gated on counterexample survival and eval regression, promoted artifacts landing outside the model, demotion path live. Per-agent budget envelopes with variance alerting. Bridge two-estate telemetry into one view.

**Exit gate.** At least one promoted artifact **and** at least one demoted artifact, because a promotion-only pipeline has not been tested. Budget envelopes live with anomaly alerting. Licensed-estate telemetry visible alongside metered-estate telemetry.

### Stage 4: Autonomy

**Entry gate.** Stage 3 exit, plus oversight capacity calculated per the A4 gate: fan-out with wait time included, expressed as a burst rate, using measured interaction and wait times from the workload itself.

**Work.** Run A4 workloads. Instrument supervision load, intervention rate, escalation mix by trigger and wait time per item. Design rotation and deliberate unassisted practice against skill erosion.

**Exit gate.** Burst-rate capacity measured in production and not exceeded, including across the whole approved portfolio rather than per workload. Intervention rate instrumented and behaving as calibrated oversight predicts: broader standing permission alongside more frequent intervention, not less.

### Stage 5: Extend

**Entry gate.** Stage 4 exit for the internal lane.

**Work.** Open the lanes that carry different failure models. Customer-facing: a separate edge on the shared control plane. Operational technology: read-only or advisory, never inside a protection layer, with tested revert-to-manual.

**Exit gate.** Per lane. Customer-facing measured on resolution rather than containment, with escalation to a real human queue that exists before launch. OT measured in specialist hours and avoided interventions, with the agent's output visually distinct from configured alarms.

## The nine factors

### F1 Audience

| Answer | Modifiers emitted |
|---|---|
| Internal-first | Spine unchanged. Customer-facing deferred to Stage 5 |
| Customer-facing now | The customer lane runs in parallel from Stage 2 with its own edge. Adds three gates before launch: disclosure compliance, escalation to a real human queue, resolution instrumented from day one. Prohibition: no A3 or above customer-facing before Stage 3 exit |
| Both | Two portfolios with separate supervision budgets. Separate edges, shared control plane. Duplicating knowledge, identity, evaluation and observability across the two is a defect, not a safeguard |

### F2 Archetype

| Answer | Modifiers emitted |
|---|---|
| Global regulated enterprise | Stage 2 doubles: the metered estate is governed, the licensed estate is telemetry-extracted and tenant-policied, and pretending one gateway covers both is the archetype's characteristic error. Adds sovereignty routing to the Stage 2 exit gate |
| Mid-market | Stage 2 is rented except the knowledge plane, which is the one thing worth building. L1 curated learning is the honest ceiling unless eval machinery is genuinely acquired. Stage 4 is rarely reached, and that is a legitimate destination rather than a failure |
| Digital native | Control and evidence planes pull forward into Stage 1, because they are the work this archetype defers and the work that is expensive to retrofit. Adds an explicit A4 self-assessment against the oversight gate, since capability here usually outruns instrumentation |

### F3 Regulatory intensity

| Answer | Modifiers emitted |
|---|---|
| Light | Evidence floor only. Article-12-grade instrumentation is not proportionate |
| Sectoral | Evidence floor plus the sector regulator's specific requirements. Note that sectoral regulators are moving faster than horizontal law, so the sector requirement usually binds first |
| High-risk plausible | Article-12-grade instrumentation for the plausible tier. Classification work starts at Stage 0, not at Stage 4, because standards lead times run beyond twelve months. The provider-flip trap is a design constraint from the first architecture decision |

### F4 Sovereignty

| Answer | Modifiers emitted |
|---|---|
| Tier SV0 to SV1 | No modifier |
| Tier SV2 | Sovereign-offering selection added to Stage 2. Derived-artifact residency proof added to the Stage 2 exit gate |
| Tier SV3 to SV4 | Serving infrastructure becomes its own stage before Stage 2. Model currency burden explicitly owned. No cost argument may be claimed, because no peer-reviewed unit economics exist for the comparison |

### F5 Risk appetite

| Answer | Modifiers emitted |
|---|---|
| Conservative | Reversibility weighted harder in the portfolio score. A3 ceiling until Stage 4 exit |
| Balanced | Default |
| Aggressive | **Does not remove gates.** It shifts the portfolio mix toward higher blast radius earlier, which raises the Stage 2 control-plane bar rather than lowering it. An aggressive appetite buys earlier consequential work, paid for with earlier controls |

### F6 Data readiness

Taken directly from the readiness assessment's six dimensions, scored 0 to 3. The profile governs, not the total.

| Answer | Modifiers emitted |
|---|---|
| Any dimension at 0 for the target workload | A1 only. Stage 1 is the entire roadmap until the zero is fixed |
| Data and integration at 2 or above, others at 1 or above | A2 permitted |
| Data, integration, identity and operations at 2 or above | A3 permitted |
| All six at 2 or above, with operations and governance at 3 | A4 candidacy; L2 governed learning and the Stage 4 oversight-capacity gate still apply |
| All six at 3 | A4 permitted after the Stage 4 gate; A5 needs a separate domain-specific candidacy review with regulator-ready evidence |
| Identity dimension below 2 | Hard cap on autonomy regardless of other scores. Identity gaps gate autonomy, they do not gate starting |

### F7 Vendor gravity

Gravity changes the interface, not the architecture. These modifiers are correspondingly light.

| Answer | Modifiers emitted |
|---|---|
| Productivity-led | Stage 1 solitary wins are bundled and immediate. Adds a utilisation measure to the Stage 1 exit gate, because mistaking licence utilisation for value is this path's failure mode |
| Record-system-led | Stage 2 action plane is tool servers wrapping the suite's already-governed APIs. Embedded agents where the record and its permission model live; build on primitives for anything spanning suites |
| Cloud-native | The gateway is trivial and the registry is the gap. Allowlist discipline added to the Stage 2 exit gate: registry listing is not trust |

### F8 Build capacity

| Answer | Modifiers emitted |
|---|---|
| No platform team | Stage 2 is rented. Do not attempt a platform. One independent capability at most, chosen because it can be operated by the people present |
| One team | Stage 2 scoped to the control plane only. Knowledge plane bought or outsourced, with corpus ownership retained internally, because ownership is the part that cannot be outsourced |
| Platform organisation | Full spine |

### F9 Cost preference

| Answer | Modifiers emitted |
|---|---|
| Fixed, seat-based | Utilisation measurement becomes a stage-exit criterion. Capability-surface gating must be operated as a live process, because per-user licensing removed the cost brake that used to limit presence identity |
| Variable, metered | Per-run budget enforcement in the harness moves to a Stage 2 exit criterion rather than a Stage 3 refinement. The loop multiplier is a design input, not a surprise |
| Mixed | A two-estate cost view is required at the Stage 3 exit gate |

## Running the generator

1. Answer the nine factors honestly, using the readiness assessment for F6 rather than estimating it.
2. Collect every modifier emitted. Apply the conflict rule: more restrictive wins.
3. Write the resulting stage list with its composed entry and exit gates. This is your roadmap.
4. Run the use-case portfolio against it quarterly. Stage exits and portfolio rounds are different cadences and should not be merged.
5. Re-run the whole generator when a factor answer changes. A first regulated customer, an acquisition, or a shift from metered to seat pricing each change the roadmap, and the change is a new roadmap rather than an amendment.

## Fictional worked example: Northstar Components

> **Teaching example only, not a benchmark.** Northstar Components is fictional. Its profile and roadmap illustrate the composition method; none of the numbers or choices below are evidence about manufacturing firms.

Northstar is a mid-market manufacturer with one platform team, an ERP-led estate, mixed seat and API pricing, sectoral obligations, and an internal-first programme. Its answers are:

| Factor | Fictional answer | Modifier carried into the roadmap |
|---|---|---|
| F1 Audience | Internal-first | Keep the customer lane closed until Stage 5 |
| F2 Archetype | Mid-market | Rent most of Stage 2; own corpus scope and stewardship |
| F3 Regulatory intensity | Sectoral | Add the sector regulator's evidence requirements |
| F4 Sovereignty | SV1 | No deployment modifier; retain the contractual residency control |
| F5 Risk appetite | Balanced | Keep the default gates |
| F6 Data readiness | Data 2, integration 2, identity 1, operations 1, governance 2, workforce 1 | Permit A2; do not advance autonomy until the weaker dimensions improve |
| F7 Vendor gravity | Record-system-led | Wrap the ERP's governed APIs rather than reconstructing its permissions |
| F8 Build capacity | One team | Scope Stage 2 to the control plane; buy the knowledge tooling but retain corpus ownership |
| F9 Cost preference | Mixed | Require a combined licensed-and-metered cost view at the Stage 3 exit |

Applying the restrictive-wins rule produces this roadmap:

1. **Stage 0:** record the six-dimension profile, select three evaluable internal use cases, name sponsors, and write the deterministic-zone list.
2. **Stage 1:** ship one A2 use case against the ERP, measure cost per resolved outcome, and retain traces outside the agent's control.
3. **Stage 2:** rent the platform capabilities the one team cannot operate, but implement ID2 identities, the policy gate, API wrappers, corpus ownership, and the erasure test. The A2 ceiling remains until identity, operations, and workforce reach 2.
4. **Stage 3:** expand only after the Stage 2 evidence exists; add governed learning and the combined cost view.
5. **Stages 4 and 5:** remain gated, not scheduled. Stage 4 needs measured burst supervision capacity; Stage 5 needs Stage 4 exit for the internal lane.

The output is deliberately not a calendar. It tells Northstar what evidence unlocks the next decision and which attractive work is premature.

## What the generator does not decide

Vendor selection, which follows from the question bank in Phase 7. Department and vertical specifics, which are the blueprints in Phase 6. And the order of use cases inside a stage, which is the portfolio framework's job and depends on measurements you will only have after the first cycle.

## Sources

[readiness-assessments.md](readiness-assessments.md) for F6. [use-case-portfolio.md](use-case-portfolio.md) for the portfolio cadence. [../synthesis/maturity-model.md](../synthesis/maturity-model.md) for the A-levels and the oversight gate. [../synthesis/master-target-state.md](../synthesis/master-target-state.md) for the planes referenced in Stage 2. [../synthesis/sovereignty-matrix.md](../synthesis/sovereignty-matrix.md) for the F4 tiers. Evidence for every gate lives in the research tracks named in those chapters.
