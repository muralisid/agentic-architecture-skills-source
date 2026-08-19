# The Sovereignty Decision Matrix

As of August 2026. Phase 4 synthesis, drawn from R11 governance, R01 infrastructure, R03 integration fabric, and the residency findings in R02, R14, R10 and R12.

---

## The decision this page makes

Sovereignty is usually argued as a binary: cloud or not. The evidence supports a different frame. Sovereignty is a routing decision made per workload and per classification, and by 2026 most of the spectrum is satisfiable inside managed offerings. Self-hosting is the answer to a narrow set of triggers, not the default posture of a cautious enterprise.

The expensive error is not choosing the wrong point on the spectrum. It is routing the primary workload correctly and letting a derived artifact leak: an embedding, a trace, a session snapshot, an eval dataset.

## The deployment spectrum

| Tier | What it means | What it costs you | When it is the right answer |
|---|---|---|---|
| S0 Managed API, no locality guarantee | Frontier models on the provider's default footprint | Nothing structural | Public and internal-unclassified data with no residency term in the contract |
| S1 Managed API, region-pinned | Provider commitment to a region for processing and retention | Modest premium, narrower model availability | Most regulated internal work. This tier absorbs far more requirements than it is given credit for |
| S2 Managed sovereign offering | Provider operating under a sovereignty framework, often with local entity, local operations staff and contractual controls | Higher cost, slower feature arrival | Public-sector procurement and regulated data where a framework names the requirement |
| S3 Self-hosted open-weight in your own tenancy | You run the serving stack | Real engineering cost, capacity planning, model currency burden | Data classification that forbids processing outside your control; OT and control-system data |
| S4 Air-gapped or on-premises isolated | No egress path at all | The highest cost in the model, and permanent | Classified environments and control-system perimeters where the network boundary is the control |

**The economics caveat, stated as R01 states it.** There is no peer-reviewed unit-economics comparison of self-hosted serving against metered APIs. Figures in circulation carry heavy caveats. The guide's position is that S3 and S4 are chosen for a classification or perimeter trigger, not for a cost argument, because the cost argument cannot currently be made from evidence.

## Classification-routed deployment

Routing is decided at the gateway on data classification, not on user preference or workload owner. The routing table is a control-plane artifact, versioned and audited like policy.

| Classification | Default tier | Escalation trigger |
|---|---|---|
| Public | S0 | None |
| Internal | S1 | Contractual residency term with a customer |
| Confidential, personal data | S1 or S2 | Jurisdiction with a data-localisation rule, or a sectoral regulator naming a framework |
| Regulated, sector-specific | S2 | Framework requires local entity or local operations personnel |
| Control-system and safety-related | S3 or S4 | Always. The perimeter is the control |

## What triggers escalation, as of August 2026

The regulatory picture moved substantially in 2025 and 2026, and several items are in flight rather than settled. All of the following sit on the quarterly re-verification list.

- **EU Data Act.** Applicable since 12 September 2025. Cloud switching charges are cost-based now and banned from 12 January 2027. Watch for audit auto-renewal traps in existing contracts.
- **EU Cloud and AI Development Act.** Proposed June 2026, introducing a four-level cloud sovereignty framework tied to public procurement. EUCS remains unresolved.
- **India DPDP Rules.** Notified November 2025, phasing in through 13 May 2027, with consent-manager and enforcement machinery from November 2026.
- **United States.** A churning state landscape: Colorado's act repealed and replaced with obligations from 1 January 2027; California SB 53 and Texas TRAIGA effective 1 January 2026; federal preemption pressure via executive order.
- **China.** AIGC labelling in force since September 2025, anthropomorphic interactive services measures since July 2026, with draft agent-specific rules circulating.
- **EU AI Act.** Article 50 transparency duties enforceable from 2 August 2026. The AI Omnibus deferred Annex III high-risk obligations to 2 December 2027 and Annex I to 2 August 2028, which changes the deadline but not the classification work.

## The rule that actually gets broken: derived artifacts inherit residency

Named independently in R02, R14, R12, R07 and R10, which is why it is stated here as an invariant rather than a recommendation.

Embeddings, chunk stores, topic models, summaries, extracted memories, session artifacts, traces, telemetry, eval datasets and fine-tuned weights built from in-region data **are** in-region data. Where a derivation mixes sources, it inherits the strictest classification among them.

The operational consequences:

1. Pipelines and indexes are region-scoped, not just source systems.
2. Observability backends are part of the sovereignty surface. Traces contain prompts and retrieved content.
3. Identity provider and policy engine locality join the surface, because credentials, tokens and security telemetry carry residency obligations like any other data.
4. Session state and skill libraries inherit the classification of the content they touched.
5. The open gap from R14 applies here directly: many-to-one derived artifacts have no complete published permissions solution, and intersection-stamping is the current practitioner answer.

## Per-archetype posture

- **Global regulated enterprise.** Runs the full routing table, usually across S1 to S3, with S4 only where a control-system perimeter demands it. The hard work is not the routing decision; it is proving that derived artifacts followed it.
- **Mid-market.** Should live at S0 and S1 and treat any requirement for S2 or above as a signal to decline the workload or buy it as a service. Building sovereign infrastructure without a platform team is how this archetype spends its entire agent budget on plumbing.
- **Digital native.** Typically S0 by default and discovers S1 or S2 at the first regulated customer. The cheap early move is making classification routing a gateway capability from the start, even when everything routes to S0 today.

## What this page does not resolve

Whether provenance-carrying grounding gains formal auditor recognition is unsettled; watch Big Four methodologies and JTC 21 standards. Final EU classification guidelines and the multi-purpose presumption's wording are not published. And the multi-agent incident reporting gap has no frame at all: when several agents contribute to one incident across jurisdictions, no regulation or standard says who reports what.

## Sources

research/R11-governance-risk-sovereignty/sources.md carries the regulatory citations with dates. Residency inheritance evidence in research/R02, R14, R12, R10. Deployment spectrum economics in research/R01-infrastructure/findings.md.
