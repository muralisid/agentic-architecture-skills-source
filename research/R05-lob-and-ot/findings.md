---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for line-of-business systems and operational technology to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Line-of-business and OT lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for line-of-business systems and operational technology."
prerequisites: ["/docs/layers/r05-lob-and-ot"]
reading_time: "12 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r05-lob-and-ot/sources"
---

# R05 Line-of-Business and Operational Technology: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

This is the layer where agents meet physics. Asset registers, work management, field mobility, and the OT estate (SCADA, historians, control systems) carry decades of engineering discipline, safety standards, and regulatory obligation that predate anything in this guide. The adoption baseline is correspondingly sober: in the electric sector's own survey of 47 reliability, balancing, planning, and generation entities, the AI use case with the *lowest* reported adoption was generating switching orders (1.08 on a five-point scale), writing log entries scored 1.35, predicting equipment failures 1.76, and 30% of respondents reported active bans on public AI tools.

### 2. What changes with agents

Less than the vendor literature suggests, and in a specific place. The pattern that generalizes is **agents on the information path, not the control path**: watching alarm and event streams with context the operator cannot hold in working memory, reconciling asset data across systems that disagree, retrieving the right past incident for the job in front of a crew. The control path remains governed by standards that were written for deterministic systems and have not been updated to bless probabilistic ones.

### 3. Introduction options and sequencing

Read before recommend, recommend before act, and treat every step across that line as a separate engineering exercise with its own validation. The sequencing that matches both the standards and the evidence: start where the agent's output is an alert or a suggestion an operator can ignore; build the validation loop before you build the suggestion (see 6); and reserve the write path for data quality, where a wrong recommendation costs a rejected change rather than a trip or an injury.

### 4. Economics

Value at this layer is measured in avoided truck rolls, avoided outages, deferred asset replacement, and hours of engineering time, not in tokens. The one measured result in the published literature is instructive: an LLM converted energy-management-system node-breaker models into bus-branch planning models in under a minute, a task the national-lab authors describe as usually taking regional-entity staff multiple weeks, and the converted case matched the actual state-estimation case closely enough to satisfy the applicable model-validation standard. That is the economics of this layer: not cheaper inference, but weeks of specialist time collapsing into minutes, with the specialist still checking the result.

The constraint on the other side is data access: an industry research body puts roughly 95% of utility data behind cybersecurity and customer-privacy walls, which is why the credible collective efforts are data-pooling consortia rather than model competitions.

### 5. Learning

Two loops matter here and they run at different speeds. Operational learning is fast and local: which alerts the operator dismissed, which recommendations were overridden, which data fixes were rejected. Asset learning is slow and compounding: every work order that captures real condition data improves the register that everything else grounds on. The second is where the durable value sits, and it is an operating-model change more than a modeling one.

### 6. Risk and groundedness

The consequence anchor for this layer is an alarm flood: 3,712 alarms in twelve hours at a refinery in September 2022, with two fatalities and roughly $597M in property damage, where the flood was identified as a contributing factor to delays and errors. That is the problem an alert-intelligence agent is trying to help with, and it is also the reason the standards are strict.

The most important architectural idea in the published work is the **validation loop**, and it is not the suggestion. The national-lab control-room reference architecture deliberately does not show the model's raw response: candidate actions are simulated against a digital twin, filtered, and only then displayed as options, with the operator deciding. Sequenced that way, the model proposes and physics disposes. Any pattern in this track that reaches an operator should be built the same way.

Two failure modes to design against. Automation bias: decision-support systems at or above roughly 85% accuracy measurably reduce operator verification, and the sector regulator names loss of skill base and overreporting of positive outcomes as failure modes to assess. And aperture narrowing: operators integrate shift handover, sounds, vibrations, smells, and site conditions, and a retrieval agent that presents one confident history can crowd that out.

### 7. Security and determinism

The multinational guidance published in December 2025 by nine cyber agencies is the clearest statement available: maintain the ability to revert to manual or deterministic control; prefer push-based or unidirectional architectures that preserve OT segmentation; send sanitized OT data outbound to separate secured systems rather than embedding opaque models inside safety-critical loops; require software bills of materials for AI components and the ability to disable AI features. There is no AI part in the industrial security standard series and no AI requirement in the electric sector's critical-infrastructure protection standards; the binding constraints are the existing ones, and a compliance-touching agent inherits them (see the demoted pattern below).

The alarm standard gives agent output a legitimate home. Its 2024 edition formalizes a taxonomy where an *alert* is information the operator does not need to respond to but can if able, distinct from a configured alarm. Agent output belongs in that channel. It cannot be credited as an independent protection layer, because the highly-managed-alarm category requires a defined proof-test method and frequency that a probabilistic output cannot satisfy, and because alarms sit in administrative controls in the risk hierarchy, which adding an agent does not change.

### 8. Sovereignty

Operational data is jurisdictionally sensitive in its own way: control-system data is often contractually or legally barred from leaving the operator's perimeter, which is why the published control-room work runs open-weight models locally with no public network access. That constraint, not general residency law, is what usually decides deployment here.

### 9. Vendor landscape

Summary; map below. Three groups: process-control incumbents shipping alarm and operations assistance, enterprise asset management vendors adding advisory agents, and field-service platforms adding agent front ends. A recurring gap across all three: offline and degraded-connectivity behavior is asserted rather than specified, which matters most for the safety pattern.

### 10. Target state

Agents sit on the information path with a validated presentation layer: alert-channel output, digital-twin or rule-based validation before display, operator decision, and full attribution of who or what proposed each action. Asset data quality runs as a governed flywheel with a human-gated write path to the register. Control authority stays with humans and deterministic systems, and any exception is an explicit, separately engineered decision with its own safety case.

### 11. Migration path

Start with asset data reconciliation, where the write gate is a change request rather than a control action. Add alert intelligence with the validation loop built first. Add field retrieval last and specify its degraded-connectivity behavior before deployment. Stop buying: OT-adjacent agent products that cannot state their offline behavior, and any claim that an agent recommendation constitutes a protection layer.

### 12. Metrics

Alarm-to-action time and operator verification rate (watch the second for automation bias); recommendation acceptance and override rates; asset-register correction throughput and rejection rate; work-order data completeness (the operating-model metric); and, for anything touching OT, time to revert to manual, tested.

### 13. Data readiness and curation

Asset registers, historian tags, and work-order histories are the corpora here, and they are typically the worst-curated data in the enterprise while being the most consequential. Provenance and lineage are not optional: the sector's own guidance lists data provenance, quality, and lineage as production requirements, and the write-back gate depends on being able to show where a proposed correction came from.

### The four utilities patterns, tested

The guide's four patterns come from practitioner experience in utilities. Research tested each against published evidence, and the result is a split verdict worth stating plainly, because the honest answer is more useful than a uniform one: **two patterns have external support, one has a measured result, and two have no published production precedent anywhere.** Where a pattern has no precedent, the guide presents it as a design proposal grounded in the constraints rather than as observed practice.

**Pattern A: SCADA alert intelligence. Supported, with two corrections.** Agents that review alert streams with work-order and event context, and augment the operator, are real: a major control-system vendor shipped guided alarm response with an oil major in October 2024 and piloted an operations assistant at a refinery in November 2025 with twelve minutes of notice on pressure disturbances. Two corrections to the original framing. First, "suggestions may come later" is already behind the field; the frontier is *validated* suggestion, and the validation loop described in section 6 is the part worth designing. Second, "control always stays human, never the agent" is a defensible policy position rather than an industry fact: reinforcement-learning agents hold direct closed-loop control at two named process plants, permanently adopted after phased commissioning. But note what earned that authority: bounded reinforcement learning with a small action space on a well-understood unit operation, trained against a high-fidelity simulator rather than the live plant, formally evaluated before commissioning, running on the regulatory control layer with the independent safety instrumented system untouched. That is a different engineering discipline from an LLM-based agent. The guide's position, stated precisely: **control authority stays human for LLM-based agents**, and closed-loop AI control is a separate exercise with its own safety case.

**Pattern B: compliance verification agent. Demoted to a design proposal with no published precedent.** The shape is real enough that the sector's own reliability body has described it, suggesting AI could assist compliance monitoring with staff reviewing flagged instances. But adoption is the second-lowest of eleven organizational approaches at 2%, writing compliance reports scores 1.41 on a five-point scale, and no vendor in the compliance-automation market has a named utility customer in the published record. The industry conversation is actually running the other way, toward auditing the AI rather than the AI auditing. And the pattern has an unaddressed problem: a compliance agent that reads regulations and interrogates humans about a protected environment likely becomes in-scope itself, since touching protected cyber system information triggers information-protection obligations, its model and configuration become change-managed baselines, and inside the security perimeter the access and system-security requirements apply. The published workaround is to run open-weight models locally with no public network access. Anyone building this is building something new.

**Pattern C: contextual safety coach. Kept as a design pattern with no published production precedent.** The nearest published work is a June 2026 research prototype that links permit filings, safety enforcement data, and complaints by spatial and temporal alignment to generate job-site hazard narratives, and whose authors explicitly decline to claim injury or complaint reduction and describe it as a benchmark study rather than a deployed system. Vendor tools that draft job safety analyses from templates exist; retrieval of matched incident history does not appear in the published record. The design cautions from section 6 apply with force here: anchoring a crew on the last accident, and narrowing the aperture that keeps experienced crews safe.

**Pattern D: asset data quality flywheel. Kept, and the strongest of the four.** It is the only pattern with a measured result: the model-reconciliation case in section 4, validated against the applicable standard. The published direction supports the rest, with the sector body noting AI may go beyond identifying anomalies to recommending corrections. Two sharpenings. The capture half, that every work order returns real condition data, is an operating-model and incentive change, not an AI capability, and should be stated as such or it will be sold as something a tool can deliver. And the write-back gate, not the reconciliation, is the architectural decision: asset master changes propagate into rate base, conformity evidence, and regulatory reporting, so the gate needs the same provenance and change-management discipline the sector already applies to models.

### Challenged defaults

**CD-18: agents reading OT through historians and a unified namespace vs direct OT integration. Verdict: the real question is where the control point lives, and consequence class decides it.** Everyone credible agrees enforcement must sit outside the model, because an agent's behavior is the output of a model that its inputs can manipulate, which makes behavior the wrong foundation for a control. The genuine disagreement is whether a broker with per-agent identity, least privilege, inline inspection, operator-custodied logging, and a tested isolation plan is sufficient, or whether physical unidirectionality is required. The discriminator is consequence class: if any output of the agent reaches or influences a control action, the multinational guidance points to unidirectional architectures and a documented path back to manual or deterministic control. If the agent produces only alerts, recommendations, and data-quality findings, a brokered read path with those controls is defensible. Transport choice (historian, unified namespace, protocol gateway) is downstream of that question, not upstream of it.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Per-agent identity as a security principal with least privilege; unnamed OT assets not routable; access severable in seconds |
| C2 | Observability | Operator-custodied session logging (not vendor-held); recommendation acceptance and override telemetry |
| C3 | Traceability & audit | Every displayed option attributable to its source (agent versus operator), timestamped; provenance on proposed data corrections |
| C4 | Grounding in reality | Historian and register data with lineage; digital-twin validation before display; freshness bounded by process dynamics |
| C5 | Impersonation & authenticity | Agent output confined to the alert or prompt channel, visually distinct from configured alarms |
| C6 | Data sovereignty & residency | Control-system data typically may not leave the perimeter; local open-weight deployment is the published pattern |
| C7 | Data privacy | Field-workforce data (location, performance) carries worker protections |
| C8 | Safety & human oversight | Agent output is never an independent protection layer; operator holds decision authority; tested revert-to-manual |
| C9 | Cost accountability | Value measured in specialist hours, avoided truck rolls, and deferred replacement, not tokens |
| C10 | Resilience & continuity | Specified degraded-connectivity behavior for field agents; agent failure must not degrade the control system |

### Open questions

- No published production AI alarm-triage deployment in an electric utility control room; the published work is research, refinery pilots, and product announcements.
- No published agent with autonomous control authority at any named water utility, anywhere.
- No named-factory case of an MES agent taking autonomous production action with measured outcomes; widely circulated figures trace to content farms.
- Vendor offline and degraded-connectivity behavior for field agents is asserted, never specified.
- The assurance methodology the energy regulator points to was built for conventional machine learning, not for language models.

---
