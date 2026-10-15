---
reader_summary: "See how the seven capabilities of an agent platform work across the fourteen layers of the enterprise."
audience: ["Enterprise architect", "CIO/CTO", "Platform lead"]
decision_or_output: "Choose a target architecture posture and assign ownership for each capability without replacing governed systems of record."
prerequisites: ["/docs/architecture/autonomy-contract"]
reading_time: "10 minutes"
evidence_status: "Cross-track synthesis; evidence, author positions, and open implementation gaps are identified in linked chapters."
next: "/docs/architecture/concerns-by-layers-matrix"
---

# Master Target-State Architecture

As of August 2026. Phase 4 synthesis, informed by all 14 research tracks.

---

## Why there are three architectures and not one

The archetype grid established that two axes predict an enterprise's agent journey: size with regulatory intensity, and incumbent vendor gravity. Only the first changes the architecture. Gravity changes the shortlist and the integration surface, which is a procurement and interface question, not a structural one. A Salesforce-gravity enterprise and an SAP-gravity enterprise of the same size and regulatory intensity build the same shape and wire it to different systems.

So this page carries three complete architectures, keyed to the axis that actually moves the structure:

| Architecture | Grid cells | Defining constraint |
|---|---|---|
| A. Global regulated enterprise | Cells 1 and 2 | Your own agents and vendor-embedded agents to govern, sovereignty routing, and evidence obligations, all from day one |
| B. Mid-market | Cell 3 | No platform team. Agents scale on vendor rails or not at all |
| C. Digital native | Cell 4 | Capability is not the constraint. Governance discipline is |

Where a real enterprise spans cells, apply the architectures per operating unit rather than averaging them.

## The common frame: seven capabilities

All three architectures use the same seven capabilities with different contents. The capabilities are not the 14 research tracks. The tracks are the layers of the enterprise. These are the capabilities of the agent platform built across them.

**1. Runtime.** Where agent work runs: sandboxes and runtimes sized by what the agent is allowed to do, durable resumable sessions, model serving. Contributed by infrastructure and compute (R01) and the agent platform (R07).

**2. Tool gateway.** How agents reach systems: tool servers wrapping already-governed APIs, carrying the caller's identity. The gateway sits here. Contributed by the integration fabric (R03), systems of record (R04) and line of business and OT (R05).

**3. Knowledge and memory.** What agents know: curated per-purpose corpora, permission-aware indexes, provenance carried from parse time, and memory. Contributed by the data platform (R02) and agent data engineering (R14).

**4. Identity and policy.** What is allowed: agent registry with owner and risk tier, identity issuance, policy decision, approval gates, budgets, kill switches. Contributed by security and identity (R10), governance, risk and sovereignty (R11) and the agent platform (R07).

**5. Evaluation and release.** How behaviour changes: traces to eval datasets, judged promotion with counterexample survival, staged rollout, demotion. Contributed by intelligence and learning (R06) and agent data engineering (R14).

**6. Observability and audit trail.** What can be proven afterward: traces, decision records, provenance chains, consultation records. Collected outside the agent's control. Contributed by observability and FinOps (R12) and governance, risk and sovereignty (R11).

**7. Human oversight.** Who is accountable and who supervises: sponsors, exception queues, escalation design, oversight capacity. Contributed by the operating model and supervision (R13), productivity and collaboration (R08) and experience and channels (R09).

Two rules bind the capabilities together, and they are the ones most often broken in practice:

- **Policy is enforced outside the model.** An approval rule held in the agent's own harness is a preference. The same rule enforced at the gateway is a control. The agent platform (R07) and integration fabric (R03) tracks state this from opposite sides.
- **The audit trail is written where the agent cannot touch it.** Anything an agent reports about itself does not count as evidence.

## Architecture A: Global regulated enterprise

**The estate it lands on.** 700 to 900 applications. M365 everywhere. A heavily customised ERP core, or a Salesforce customer core, or both. ServiceNow for ITSM. Mainframe still load-bearing. Formal frameworks genuinely operated rather than cited.

**The defining feature: the architecture is doubled at the edge.** This enterprise runs two kinds of agents that cannot be collapsed into one. Your own agents run through your own gateways and are fully governable. Vendor-embedded agents (productivity copilots, embedded suite agents) run on the vendor's platform. Your gateway will never see them. Every capability above must therefore have an answer for both. For vendor-embedded agents, the honest answer is usually telemetry extraction and tenant policy rather than enforcement. Designing as though one gateway governs everything is the most common structural error at this archetype.

| Capability | What it is built from |
|---|---|
| Runtime | Isolation levels set by what the agent is allowed to do, rather than by product category: hardened microVM-class sandboxes for code, browsing and computer use; lighter isolation for retrieval-only agents. Classification-routed model serving across managed, sovereign-region and, where classification demands, self-hosted open-weight. Durable execution so long-running work survives restarts |
| Tool gateway | MCP gateway built by extending the existing API management investment rather than buying a parallel product, which is the default verdict from the integration fabric track (R03). Token exchange and on-behalf-of so the agent acts as the requesting user. Entitlement decisions stay inside the record systems. Read-only defaults with destructive-action gating |
| Knowledge and memory | Existing lakehouse retained. On top of it, per-use-case curated corpora rather than one enterprise index. ACLs crawled into index metadata with pre-filtered retrieval and fail-close on sync error. Provenance attached at parse time. Semantic contracts on anything numeric |
| Identity and policy | Agent registry binding identity to owner, sponsor, risk tier and permitted scope. First-class agent identities with just-in-time least privilege and short-lived credentials. A deterministic policy decision point on every consequential action. Kill switches at runtime, gateway, harness and identity |
| Evaluation and release | Governed flywheel (reviewed learning, L2) as the default for anything at supervised autonomy (A3) or above. Promotion gated on counterexample survival and eval regression, with the promoted artifact landing in an enforcement point outside the model, and a demotion path. Domain SMEs own the eval bar |
| Observability and audit trail | Set by how plausibly a workload classifies as high-risk: an audit trail baseline for every production agent, and EU AI Act record keeping for the use that could plausibly classify as high-risk. Provenance-carrying grounding as the mechanism, not a separate compliance system |
| Human oversight | Sponsor per agent with automatic transfer on departure. Exception handling inside existing functions rather than a new agent-supervision organisation. Oversight capacity designed to the managed autonomy (A4) gate. Workforce consultation where co-determination applies, run early, because it does not slow adoption |

**Sequencing.** Internal workflows first, deliberately, to build identity and policy, knowledge and memory, and the audit trail on lower-stakes traffic. Customer-facing agents run as a separate lane on the same identity and policy service, with their own edge (D020). OT and safety-adjacent last, and read-only or advisory when they arrive.

**The failure mode to design against.** Governance built as an approval gate rather than as instrumentation. The programme then stalls at delegated tasks (A2) with every agent waiting on a committee, and the business routes around it into vendor-embedded agents, where none of the controls apply.

## Architecture B: Mid-market

**The estate it lands on.** 150 to 300 SaaS applications. M365 plus Business Central or NetSuite. No governed API estate. Practice is manual and attestation-driven rather than framework-operated. Thin or absent platform engineering.

**The defining feature: identity and policy is rented.** This archetype does not build its own identity and policy capability and should not try. It adopts the one its productivity vendor provides, accepts its limits, and spends its scarce build capacity on the one capability that vendors do not supply well.

| Capability | What it is built from |
|---|---|
| Runtime | Entirely vendor-provided. No self-hosting, no sandbox estate. The question is which vendor rails, not which runtime |
| Tool gateway | Vendor connectors and iPaaS. Where a governed API does not exist, an agent should not be writing to that system yet. Build the API before you build the agent, or do not automate the write |
| Knowledge and memory | **The one thing worth building.** Vendor rails supply retrieval; they do not supply curated corpora. Purpose-scoped curation with a named owner per corpus is where this archetype's agent quality actually comes from, and it is affordable because curation cost scales with the risk of the use case rather than with the size of the estate |
| Identity and policy | Tenant policy plus the vendor's agent registry. One independent control at most, chosen because it can actually be operated by the people present |
| Evaluation and release | Curated learning (L1) is the honest target. Humans update ground truth and heuristics on a schedule. Reviewed learning (L2) requires eval machinery this archetype rarely has, and claiming it without the machinery is the common self-deception here |
| Observability and audit trail | The audit trail baseline only: registry entry, retained action logs, named oversight, provenance-carrying grounding. EU AI Act record keeping is not proportionate unless a specific workload plausibly classifies as high-risk |
| Human oversight | Sponsor per agent, usually a department head rather than a dedicated role. Supervision folded into existing jobs. Oversight capacity still calculated, because the managed autonomy (A4) gate does not become optional at smaller scale |

**Sequencing.** Take the bundled solitary-work wins first, because R08 shows they are real, cheap and immediate. Then pick one coordinated workflow the organisation is genuinely willing to redesign, and treat it as a change programme rather than a licence purchase. Stop there until that one lands.

**The failure mode to design against.** Buying a platform the organisation cannot staff. The second failure mode is subtler: measuring adoption by licence utilisation, which one evaluation recorded at 64% weekly active users against 1.14 assistant actions per user per day.

## Architecture C: Digital native

**The estate it lands on.** Best-of-breed SaaS, strong engineering culture, high API coverage, weak formal governance. Adoption already started in engineering, which matches the observed first-mover data.

**The defining feature: the capabilities are built out of order.** This archetype builds the runtime, the tool gateway and knowledge and memory quickly and well. It arrives at identity and policy, the audit trail and human oversight late. This usually happens under external pressure, such as a first enterprise customer's security review. The architecture below is written in the order the discipline should be applied, not the order it usually happens.

| Capability | What it is built from |
|---|---|
| Runtime | Built on primitives. Container or microVM sandboxes already exist. Durable execution is the gap most often discovered late, when the first long-running agent loses its state |
| Tool gateway | Gateway-first MCP over the existing API estate, which is genuinely an afternoon here. The discipline that is missing is not the gateway but the allowlist: registry listing is not trust, and server versions must be signed and pinned |
| Knowledge and memory | Strong retrieval, weak curation ownership. The gap is a named owner per corpus and provenance carried from parse time, both of which are cheap to add early and expensive to retrofit |
| Identity and policy | The real gap. Agent registry with owner and risk tier, deterministic policy decision on consequential actions, and per-run budget enforcement. Budgets matter more here than elsewhere. Usage-based pricing plus fast iteration is how this archetype learns, the expensive way, that looping agents multiply cost |
| Evaluation and release | Capable of reviewed learning (L2) or continuous learning inside limits (L3) and usually the first to reach it. The discipline to add is decoupling: the optimiser must not grade its own work, judges must be version-pinned, and every promoted artifact needs a rollback |
| Observability and audit trail | Built late and retrofitted painfully. The cheapest intervention available to this archetype is to collect traces outside the agent's control from the first week, because that decision cannot be made retroactively |
| Human oversight | Supervision informal and undocumented. The managed autonomy (A4) gate is where this archetype most often fails an honest self-assessment: autonomy is high, oversight capacity has never been calculated, and intervention rates are not instrumented |

**Sequencing.** Whatever the engineering organisation is already doing, plus identity and policy and the audit trail now rather than at the first customer security review. The autonomy and learning scales hold a specific check against shipping autonomy ahead of governance. Managed autonomy (A4) requires reviewed learning (L2).

**The failure mode to design against.** Claiming a maturity level the oversight design does not support. This archetype has the capability to run A4 workloads and rarely has the instrumentation to prove it is doing so safely.

## The data-to-memory pipeline, in all three

Every architecture above includes knowledge and memory, and it is not a store. It is a pipeline that converts enterprise data into agent-usable memory of five kinds. Governance tightens as the memory persists. The end-to-end design is its own chapter: see [memory-pipeline-architecture.md](memory-pipeline-architecture.md). Three properties of it are architectural rather than data-engineering concerns, and belong here:

1. **Curation is scoped by purpose, not by source.** The unit is the use case, not the system of record. This is what makes curation affordable at every archetype including the mid-market.
2. **Derived artifacts inherit the strictest classification of their sources**, and embeddings are personal data where their sources are, so erasure must cascade into vectors, memories, traces and eval datasets.
3. **Promotion into durable memory is gated, not automatic.** Entity memory and cross-domain memory create ownership, consent and retention obligations, and are where poisoning does lasting damage.

## What this page does not decide

Platform choice, vendor selection and the specific sequencing of use cases. Those follow from the use-case portfolio framework and the layer pages' own verdicts, and they follow rather than lead: the use-case portfolio decides more than the platform does.

## Sources

Rolled up from all 14 research tracks; every claim above is sourced in the corresponding track's sources.md. Archetype definitions from [archetype-grid.md](archetype-grid.md). Maturity levels and the oversight gate from [maturity-model.md](maturity-model.md). Concern ownership from [concerns-by-layers-matrix.md](concerns-by-layers-matrix.md).
