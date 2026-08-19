# The Economics Model

As of August 2026. Phase 4 synthesis. Two levels: what the invoice measures, and what the decision requires.

---

## Why two levels

Every platform meters per run: tokens, actions, credits, agent seats. Every business case is decided per outcome. The gap between those two units is where agent programmes are won and lost, and it is not a rounding error. A conversation that ends without escalation is one run on the invoice whether the customer was helped or gave up.

So this model has two levels and insists on both. Level 1 reconciles to the invoice. Level 2 decides whether to keep going.

## Level 1: cost per run

The unit the platform charges for. It exists to reconcile with finance, to attribute spend to a sponsor, and to catch anomalies early.

| Component | What drives it | Where it is controlled |
|---|---|---|
| Model tokens | Input plus output, multiplied by the loop | Harness budgets and iteration caps (R07); prompt caching |
| The loop multiplier | Agentic work costs several times plain chat: roughly 4x for single agents and 15x for multi-agent systems, both vendor-published | The orchestration decision. Chosen deliberately per task class, not adopted as a default |
| Tool and retrieval calls | Fan-out per run, retry behaviour | Gateway rate limits as budget controls (R03); retry-storm alerts |
| Runtime | Sandbox time, cold starts, idle share | Capability-tiered isolation and utilisation telemetry (R01) |
| Platform seats | Per-user or per-agent licences amortised over actual use | Utilisation measurement, which is where the mid-market failure appears |
| Pipeline amortisation | Parsing, embedding, and the re-embed on model upgrade | Migrate only above a stated eval-gain threshold; blue and green index swaps (R14) |

**Anchors, all as of mid-2026 and vendor-published unless noted.** Outcome-priced customer service agents list between $0.99 and $2.00 per automated resolution against a $6 to $12 human-handled comparator. One major CRM platform meters at $0.10 per agent action. Where outcomes are not priced, action or credit metering supplies the unit.

**The regime decides who absorbs the multiplier.** This is the structural question, and it shapes architecture more than it shapes budget:

| Regime | Who absorbs the loop | What it favours architecturally | The trap |
|---|---|---|---|
| Human seat | The vendor | Heavy use by every licensed user | Paying per employee for 1.14 assistant actions per user per day, which one evaluation actually recorded against 64% weekly active users |
| Agent seat | The vendor, per agent | Few durable agents, treated as pets | Agent proliferation under a per-agent meter, or presence granted because the licence no longer prices it |
| Metered API | You | Ephemeral fleets, treated as cattle | Discovering the loop multiplier in production, which is how the digital-native archetype usually learns it |

Most enterprises run all three at once. That is the two-estate problem expressed in money: your gateway meters only what flows through it.

## Level 2: cost per resolved outcome

The unit the decision requires. Three terms, and the second and third are the ones business cases omit.

```
Cost per resolved outcome
    =   run cost / resolution rate
      + supervision minutes per item x loaded supervisor rate
      + failure rate x cost of a wrong outcome
```

**Term 1: divide by resolution, never by containment.** Containment counts conversations that never reached a human, whether or not the customer was helped. Resolution counts problems actually solved. Every documented reversal of an AI-first service programme set a containment or headcount target. Track repeat-contact rate alongside it, because re-contact multiplies true cost per issue while the containment dashboard improves.

**Term 2: supervision labour is a real cost and it is usually zero in the model.** The oversight capacity gate on A4 exists because supervision has a capacity limit; this term exists because it also has a price. Instrument supervision load, intervention rate and wait time per item (R12 carries the mechanics), and put the resulting minutes into the business case at a loaded rate. A programme whose unit economics only work when supervision is free has not been costed.

**Term 3: wrong outcomes cost more than no outcome.** Where statements bind externally, this term dominates: a tribunal has held a company responsible for what its chatbot told a customer, and a 2026 appellate decision held that general disclaimers do not provide sufficient protection. Internally the term is smaller but not zero, and R08 supplies the uncomfortable version: in observed-task testing, spreadsheet data analysis was **slower and less accurate** than working without the tool, and slide generation was faster and markedly worse. A negative-return task does not become positive at scale.

## The who-pays-the-loop worksheet

Six questions, answered per workload rather than per enterprise. The answers determine the regime, and the regime determines a great deal of the architecture.

1. **How many runs per unit of business value?** High ratio favours metered with hard caps. Low ratio favours seats.
2. **Is the work bursty or steady?** Bursty work under a seat regime pays for idle capacity. Steady work under metering is predictable and often cheaper.
3. **Does the agent need to persist?** Durable agents with accumulated memory fit agent-seat pricing. Ephemeral fleets do not, and treating them as pets is how the meter runs away.
4. **Which estate does it run in?** Licensed platform work is not metered by you and not visible to your gateway. Budget for it separately and extract its telemetry deliberately.
5. **Who is the sponsor?** Every agent needs a named business sponsor holding the envelope. This is recommended design rather than established practice: the construct is productised across identity, workforce and control-plane products, and no enterprise has yet published running per-agent budgets.
6. **What does a wrong answer cost here?** This sets term 3, and it decides whether the workload belongs in a customer-facing lane at all.

## Budget envelopes, not salaries

The control is a sponsor-owned envelope with unit-economics targets, hard per-run caps and variance alerting, backed by anomaly detection and showback maturing to chargeback. It is deliberately not framed as a salary: agent consumption is volatile in a way payroll is not, so the useful analogy is a budget with alarms rather than a fixed cost per head. Central funding stays on the shared platform layer; per-agent envelopes sit with sponsors.

## Where tokens are the wrong unit entirely

R05 supplies the corrective. In line-of-business and operational-technology settings, value is measured in specialist hours recovered, avoided truck rolls and deferred asset replacement. A model that reports token cost per run in a utility control room is measuring the cheapest input in the system. Use Level 1 for control and Level 2 in the currency the function actually manages.

## What the guide will not claim

There is no peer-reviewed unit-economics comparison of self-hosted model serving against metered APIs; the ranges in circulation come with heavy caveats and are published as such in R01. There is no published head-to-head cost comparison of embedded versus external agents on identical tasks. And no enterprise has published running per-agent budget envelopes. Where an economics claim in this guide rests on vendor pricing pages rather than on outcomes, the text says so.

## Sources

research/R12-observability-and-finops/, research/R09-experience-and-channels/, research/R08-productivity-and-collaboration/, research/R13-operating-model/, research/R14-agent-data-engineering/, research/R01-infrastructure/, research/R05-lob-and-ot/. Loop multiplier figures are vendor-published (2025). Outcome and action pricing are vendor list prices as of mid-2026 and sit on the quarterly re-verification list.
