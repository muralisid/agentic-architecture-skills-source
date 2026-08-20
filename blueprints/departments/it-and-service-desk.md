---
reader_summary: "Adapt the IT and Service Desk blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","IT and service-management lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for IT and Service Desk."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Blueprint synthesis: cited evidence, vendor-reported findings, author positions, and honest limits are labelled inline."
next: "/docs/blueprints/departments/customer-service"
---

# Department Blueprint: IT and Service Desk

As of August 2026. Phase 6. Internal-facing, and the department where production agents actually concentrate.

---

## 1. The scenario

A mid-sized enterprise runs roughly 40,000 service desk tickets a quarter. Password and access requests, software provisioning, VPN and connectivity, laptop and peripheral faults, and a long tail of application questions. Tier 1 resolves the routine, escalates the rest, and the escalation queue is where the expensive time goes. Knowledge articles exist, are partly stale, and nobody owns them.

This is the first place most enterprises put agents, and the adoption data supports the instinct: software engineering, IT operations and the service desk are where production agents concentrate. It is also the department where the guide's own advice most cleanly applies, because the work is internal, the failures are contained, and success is objectively measurable.

## 2. Agent team design

| Agent | What it does | A x L position | Why here |
|---|---|---|---|
| Triage agent | Classifies, enriches with asset and entitlement context, routes | A3, L2 | Highest volume, cheapest failure, cleanest labels. This is the eval-suite factory for everything else |
| Knowledge agent | Answers from a curated, owned corpus; refuses and escalates on weak evidence | A2 to A3, L1 to L2 | The corpus is the product. Refusal behaviour is the quality signal |
| Provisioning agent | Executes bounded, reversible fulfilment: group membership, licence assignment, software deployment | A3, L1 | Deliberately L1. Provisioning is where a learned shortcut becomes an entitlement error |
| Diagnostic agent | Correlates telemetry, reproduces, proposes a fix with evidence | A2, L2 | Proposes only. The human applies |

**Access provisioning is a deterministic zone.** The provisioning agent gathers context, checks policy, assembles the request and can execute a pre-approved pattern; it does not decide entitlement. That decision is made by a rule over verifiable attributes, outside the model. This is the single most important design line in the blueprint, and it is the one most often crossed because provisioning automation looks like a workflow problem.

## 3. Planes activated

| Plane | Role |
|---|---|
| Knowledge | **Direct.** Curated per-intent corpora with named owners. The whole quality story |
| Action | **Direct.** Tool servers wrapping the ITSM platform's governed APIs and the identity platform's provisioning APIs |
| Control | **Direct.** Registry, agent identity, the deterministic gate on provisioning |
| Improvement | **Direct.** Ticket outcomes are labelled by resolution, which makes this the best-instrumented learning loop in the enterprise |
| Evidence | Supporting. Standard evidence floor |
| Execution | Supporting. Retrieval-grade isolation is sufficient; no code execution needed |
| Human | **Direct.** Tier 2 becomes the exception queue, and its shape changes |

## 4. Controls

- Agents act as the requesting user through wrapped ITSM and identity APIs. Entitlement stays in the identity platform. No service-account agents.
- Deterministic policy decision on every provisioning action, evaluated in the tool-call path.
- Knowledge corpus with a named owner and a review cadence. Stale grounding here produces confidently wrong answers about policies that changed.
- ACLs propagated into the index: a service desk corpus contains HR, security and finance content that not every requester may see.
- Kill switch at the gateway, drilled. Provisioning is the fastest way for an agent error to become an access incident.

## 5. Economics

**Per run.** Retrieval-heavy, short loops, low multiplier. This is among the cheapest agent workloads in the enterprise.

**Per resolved outcome.** Divide by tickets genuinely resolved, not by tickets closed without escalation. The service desk equivalent of the containment trap is auto-closure, and reopen rate is the metric that exposes it. Include Tier 2 supervision minutes.

**The honest comparator.** The published deployment closest to this shape had agent-eligible conversations under 10% of total volume, and within that subset the agent completed 35% without a human taking over. Build the business case on that shape rather than on a deflection-rate target, and the programme survives its first quarter of measurement.

## 6. Honest limits

- **The long tail does not automate.** The routine is where the value is; the tail is where the tickets that hurt live, and it is tail work that Tier 2 actually does.
- **Auto-closure is measurable and meaningless.** It is containment wearing a different name.
- **Knowledge corpora rot fastest here** because IT policy changes constantly. A corpus without an owner degrades to worse than no corpus, and the accuracy evidence is direct: an uncurated corpus grew from 54 to over 1,100 documents and accuracy fell from 75% to under 40% until domain scoping fixed it.
- **No published comparison exists** of embedded ITSM-vendor agents against external agents on identical ticket sets, so platform arguments here rest on architecture rather than outcome data.

## 7. Metrics

Resolution rate and reopen rate together, never resolution alone. Escalation mix by trigger. Time to resolution at the 90th percentile, not the mean, because the mean hides the tail this blueprint cannot automate. Corpus freshness against policy change lag. Refusal rate, which should be non-zero and stable. Tier 2 supervision minutes per resolved ticket, trending down.

## Sources

research/R04-systems-of-record/, research/R06-intelligence-and-learning/, research/R09-experience-and-channels/ (the containment lesson transfers), research/R10-security-and-identity/, research/R13-operating-model/, research/R14-agent-data-engineering/.
