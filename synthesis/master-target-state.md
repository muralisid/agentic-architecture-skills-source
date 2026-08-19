# Master Target-State Architecture

As of August 2026. Phase 4 synthesis, informed by all 14 research tracks.

---

## Why there are three architectures and not one

The archetype grid established that two axes predict an enterprise's agent journey: size with regulatory intensity, and incumbent vendor gravity. Only the first changes the architecture. Gravity changes the shortlist and the integration surface, which is a procurement and interface question, not a structural one. A Salesforce-gravity enterprise and an SAP-gravity enterprise of the same size and regulatory intensity build the same shape and wire it to different systems.

So this page carries three complete architectures, keyed to the axis that actually moves the structure:

| Architecture | Grid cells | Defining constraint |
|---|---|---|
| A. Global regulated enterprise | Cells 1 and 2 | Two estates, sovereignty routing, and evidence obligations exist from day one |
| B. Mid-market | Cell 3 | No platform team. Agents scale on vendor rails or not at all |
| C. Digital native | Cell 4 | Capability is not the constraint. Governance discipline is |

Where a real enterprise spans cells, apply the architectures per operating unit rather than averaging them.

## The common frame: seven planes

All three architectures are the same seven planes with different contents. The planes are not the 14 research tracks; the tracks are the layers of the estate, and these are the planes of the agentic system built across it.

**1. Execution plane.** Where agent work runs: sandboxes and runtimes sized by capability set, durable resumable sessions, model serving. Contributed by R01, R07.

**2. Action plane.** How agents reach systems: tool servers wrapping already-governed APIs, carrying the caller's identity. The gateway sits here. Contributed by R03, R04, R05.

**3. Knowledge plane.** What agents know: curated per-purpose corpora, permission-aware indexes, provenance carried from parse time, the memory tiers. Contributed by R02, R14.

**4. Control plane.** What is allowed: agent registry with owner and risk tier, identity issuance, policy decision, approval gates, budgets, kill switches. Contributed by R10, R11, R07.

**5. Improvement plane.** How behaviour changes: traces to eval datasets, judged promotion with counterexample survival, staged rollout, demotion. Contributed by R06, R14.

**6. Evidence plane.** What can be proven afterward: traces, decision records, provenance chains, consultation records. Collected outside the agent's control. Contributed by R12, R11.

**7. Human plane.** Who is accountable and who supervises: sponsors, exception queues, escalation design, oversight capacity. Contributed by R13, R08, R09.

Two rules bind the planes together, and they are the ones most often broken in practice:

- **Enforcement lives in the control plane, never in the execution plane.** An approval rule held in the harness is a preference. The same rule enforced at the gateway is a control. R07 and R03 state this from opposite sides.
- **The evidence plane is fed by collection the agent cannot influence.** Anything an agent reports about itself is testimony, not evidence.

## Architecture A: Global regulated enterprise

**The estate it lands on.** 700 to 900 applications. M365 everywhere. A heavily customised ERP core, or a Salesforce customer core, or both. ServiceNow for ITSM. Mainframe still load-bearing. Formal frameworks genuinely operated rather than cited.

**The defining feature: the architecture is doubled at the edge.** This enterprise runs two estates that cannot be collapsed. The metered estate flows through its own gateways and is fully governable. The licensed estate (productivity copilots, embedded suite agents) runs on vendor control planes that its gateway will never see. Every plane above must therefore have an answer for both, and the honest answer for the licensed estate is usually telemetry extraction and tenant policy rather than enforcement. Designing as though one gateway governs everything is the most common structural error at this archetype.

| Plane | What it is built from |
|---|---|
| Execution | Isolation tiered by capability set rather than by product category: hardened microVM-class sandboxes for code, browsing and computer use; lighter isolation for retrieval-only agents. Classification-routed model serving across managed, sovereign-region and, where classification demands, self-hosted open-weight. Durable execution so long-running work survives restarts |
| Action | MCP gateway built by extending the existing API management investment rather than buying a parallel product, which is the default verdict from R03. Token exchange and on-behalf-of so the agent acts as the requesting user. Entitlement decisions stay inside the record systems. Read-only defaults with destructive-action gating |
| Knowledge | Existing lakehouse retained. On top of it, per-use-case curated corpora rather than one enterprise index. ACLs crawled into index metadata with pre-filtered retrieval and fail-close on sync error. Provenance attached at parse time. Semantic contracts on anything numeric |
| Control | Agent registry binding identity to owner, sponsor, risk tier and permitted scope. First-class agent identities with just-in-time least privilege and short-lived credentials. A deterministic policy decision point on every consequential action. Kill switches at runtime, gateway, harness and identity plane |
| Improvement | Governed flywheel (L2) as the default for anything at A3 or above. Promotion gated on counterexample survival and eval regression, with the promoted artifact landing in an enforcement layer outside the model, and a demotion path. Domain SMEs own the eval bar |
| Evidence | Tiered by classification plausibility: an evidence floor for every production agent, Article-12-grade instrumentation for the tier that could plausibly classify high-risk. Provenance-carrying grounding as the mechanism, not a separate compliance system |
| Human | Sponsor per agent with automatic transfer on departure. Exception handling inside existing functions rather than a new agent-supervision organisation. Oversight capacity designed to the A4 gate. Workforce consultation where co-determination applies, run early, because it does not slow adoption |

**Sequencing.** Internal workflows first, deliberately, to build the control, knowledge and evidence planes on lower-stakes traffic. Customer-facing agents as a separate lane on the same control plane, with their own edge (D020). OT and safety-adjacent last, and read-only or advisory when they arrive.

**The failure mode to design against.** Governance built as an approval gate rather than as instrumentation. The programme then stalls at A2 with every agent waiting on a committee, and the business routes around it into the licensed estate, where none of the controls apply.

## Architecture B: Mid-market

**The estate it lands on.** 150 to 300 SaaS applications. M365 plus Business Central or NetSuite. No governed API estate. Practice is manual and attestation-driven rather than framework-operated. Thin or absent platform engineering.

**The defining feature: the control plane is rented.** This archetype does not build a control plane and should not try. It adopts the one its productivity vendor provides, accepts its limits, and spends its scarce build capacity on the one plane that vendors do not supply well.

| Plane | What it is built from |
|---|---|
| Execution | Entirely vendor-provided. No self-hosting, no sandbox estate. The question is which vendor rails, not which runtime |
| Action | Vendor connectors and iPaaS. Where a governed API does not exist, an agent should not be writing to that system yet. Build the API before you build the agent, or do not automate the write |
| Knowledge | **The one thing worth building.** Vendor rails supply retrieval; they do not supply curated corpora. Purpose-scoped curation with a named owner per corpus is where this archetype's agent quality actually comes from, and it is affordable because curation cost scales with the risk of the use case rather than with the size of the estate |
| Control | Tenant policy plus the vendor's agent registry. One independent capability at most, chosen because it can actually be operated by the people present |
| Improvement | L1 curated learning is the honest target. Humans update ground truth and heuristics on a schedule. L2 requires eval machinery this archetype rarely has, and claiming it without the machinery is the common self-deception here |
| Evidence | The evidence floor only: registry entry, retained action logs, named oversight, provenance-carrying grounding. Article-12-grade instrumentation is not proportionate unless a specific workload plausibly classifies |
| Human | Sponsor per agent, usually a department head rather than a dedicated role. Supervision folded into existing jobs. Oversight capacity still calculated, because the A4 gate does not become optional at smaller scale |

**Sequencing.** Take the bundled solitary-work wins first, because R08 shows they are real, cheap and immediate. Then pick one coordinated workflow the organisation is genuinely willing to redesign, and treat it as a change programme rather than a licence purchase. Stop there until that one lands.

**The failure mode to design against.** Buying a platform the organisation cannot staff. The second failure mode is subtler: measuring adoption by licence utilisation, which one evaluation recorded at 64% weekly active users against 1.14 assistant actions per user per day.

## Architecture C: Digital native

**The estate it lands on.** Best-of-breed SaaS, strong engineering culture, high API coverage, weak formal governance. Adoption already started in engineering, which matches the observed first-mover data.

**The defining feature: the planes are built out of order.** This archetype builds execution, action and knowledge quickly and well, and arrives at the control, evidence and human planes late, usually under external pressure such as a first enterprise customer's security review. The architecture below is written in the order the discipline should be applied, not the order it usually happens.

| Plane | What it is built from |
|---|---|
| Execution | Built on primitives. Container or microVM sandboxes already exist. Durable execution is the gap most often discovered late, when the first long-running agent loses its state |
| Action | Gateway-first MCP over the existing API estate, which is genuinely an afternoon here. The discipline that is missing is not the gateway but the allowlist: registry listing is not trust, and server versions must be signed and pinned |
| Knowledge | Strong retrieval, weak curation ownership. The gap is a named owner per corpus and provenance carried from parse time, both of which are cheap to add early and expensive to retrofit |
| Control | The real gap. Agent registry with owner and risk tier, deterministic policy decision on consequential actions, and per-run budget enforcement. Budgets matter more here than elsewhere because metered pricing plus fast iteration is how this archetype discovers the loop multiplier the expensive way |
| Improvement | Capable of L2 or L3 and usually the first to reach it. The discipline to add is decoupling: the optimiser must not grade its own work, judges must be version-pinned, and every promoted artifact needs a rollback |
| Evidence | Built late and retrofitted painfully. The cheapest intervention available to this archetype is to collect traces outside the agent's control from the first week, because that decision cannot be made retroactively |
| Human | Supervision informal and undocumented. The A4 gate is where this archetype most often fails an honest self-assessment: autonomy is high, oversight capacity has never been calculated, and intervention rates are not instrumented |

**Sequencing.** Whatever the engineering organisation is already doing, plus the control and evidence planes now rather than at the first customer security review. The A x L rule that A4 requires L2 is the specific check against shipping autonomy ahead of governance.

**The failure mode to design against.** Claiming a maturity level the oversight design does not support. This archetype has the capability to run A4 workloads and rarely has the instrumentation to prove it is doing so safely.

## The data-to-memory pipeline, in all three

Every architecture above includes a knowledge plane, and the plane is not a store. It is a pipeline that converts enterprise data into agent-usable memory at five tiers, with governance that tightens as the tier persists. The end-to-end design is its own chapter: see [memory-pipeline-architecture.md](memory-pipeline-architecture.md). Three properties of it are architectural rather than data-engineering concerns, and belong here:

1. **Curation is scoped by purpose, not by source.** The unit is the use case, not the system of record. This is what makes curation affordable at every archetype including the mid-market.
2. **Derived artifacts inherit the strictest classification of their sources**, and embeddings are personal data where their sources are, so erasure must cascade into vectors, memories, traces and eval datasets.
3. **Promotion into durable tiers is gated, not automatic.** Entity and cross-domain memory are the tiers that create ownership, consent and retention obligations, and the tiers where poisoning does lasting damage.

## What this page does not decide

Platform choice, vendor selection and the specific sequencing of use cases. Those follow from the roadmap checklist (Phase 5) and the vendor question bank (Phase 7), and they follow rather than lead: the use-case portfolio decides more than the platform does.

## Sources

Rolled up from all 14 research tracks; every claim above is sourced in the corresponding track's sources.md. Archetype definitions from [archetype-grid.md](archetype-grid.md). Maturity levels and the oversight gate from [maturity-model.md](maturity-model.md). Concern ownership from [concerns-by-layers-matrix.md](concerns-by-layers-matrix.md).
