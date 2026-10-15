---
reader_summary: "Use the guide's canonical vocabulary for autonomy, identity, memory, controls, economics, and enterprise operations."
audience: ["CIO/CTO", "Enterprise architect", "All guide readers"]
decision_or_output: "Resolve terminology before comparing architectures, assessments, or vendor claims."
prerequisites: []
reading_time: "12 minutes"
evidence_status: "Definitions summarize the guide; author-defined terms and evidence limitations are identified in their linked chapters."
next: "/docs"
---

# Glossary

## Canonical terms

Canonical definitions used across the guide. Terms are defined once here and used consistently everywhere. Additions and corrections via PR.

**Agent.** An LLM autonomously using tools in a loop to pursue a goal, deciding its own next step. Distinct from a workflow.

**Workflow.** Orchestration of models and tools through predefined code paths. Cheaper, lower variance, and preferred wherever the task allows (see Deterministic by default).

**Agentic enterprise.** An enterprise where routine knowledge work executes through governed agents while humans set intent, supervise, manage exceptions, and hold accountability. A useful evidence-informed design pattern is a trust progression: agents operate under their own identity with a named accountable human, and autonomy expands with demonstrated reliability. This is not a universal classification test. The Autonomy-Learning maturity model (A x L) makes the progression explicit per workload.

**The autonomy and learning scales.** Two scales, applied per task. Autonomy A0 to A5: A0 manual, A1 assisted, A2 delegated tasks, A3 supervised autonomy, A4 managed autonomy, A5 governed lights-out. Learning L0 to L3: L0 fixed, L1 curated learning, L2 reviewed learning (the flywheel), L3 continuous learning inside limits. A4 and above require L2 or better. See product/architecture/autonomy-contract.mdx.

**Fixed-policy agent.** An agent that acts autonomously but does not learn; behavior changes only by redeployment. Still an agent by every mainstream definition, and the right choice for many workloads. This guide's position: without a learning loop you have a fixed-policy agent, not a teammate.

**Harness.** The engineering shell around the model: context assembly, tool routing, termination conditions, budgets, checkpoints, recovery.

**Agent identity (ID1 to ID3).** ID1: shared credentials (shared keys, service accounts); ungoverned, the anti-pattern. ID2: the agent's own identity, with task-scoped permissions, audit and a named sponsor. ID3: the agent's own identity plus an agent user account (directory entry, mailbox, calendar, manager, licences).

**Agent identity vs agent user account.** An agent identity lets an agent act on systems under governance (ID2). An agent user account makes it addressable as a colleague: email, meetings, org chart (ID3). The trade-off is collaboration against attack and compliance surface. Microsoft Entra Agent ID uses this pair.

**Sponsor and owner.** The sponsor is the business person accountable for why an agent exists, what it may do and whether it should keep running; named at creation and recorded on the ID2 identity. The owner is the technical custodian who runs its configuration, credentials, evals and incidents. Some vendors use "owner" for the accountable person; this guide does not.

**Delegation chain.** The record that traces every agent action back to the person who asked: who delegated, to which agent, with which permissions, for which task. Built from the agent's own identity and short-lived tokens exchanged at the gateway. The industry's term; this guide once called it the identity chain. See product/architecture/delegation-chain.mdx.

**Span of control.** How many agents or tasks one person can supervise at once. It shrinks as waiting times grow. Used in place of the engineering word fan-out.

**Agent lifecycle.** The nine stages every agent passes through: register, sponsor and owner, entitle, evaluate, approve, operate, change, periodic review, retire. The registry record carries the stage, the risk tier and the autonomy levels. See product/architecture/agent-lifecycle.mdx.

**Change trigger.** A change to an agent's model, prompt, tools, permissions, data sources, memory policy, autonomy level or sponsor. A trigger re-runs evals and the risk profile before release. No standard defines re-approval; this is the guide's rule.

**Orphaned agent.** An agent that keeps running after its owner's or sponsor's account is disabled. Sponsorship passes to a named successor, and periodic review retires what nobody claims.

**Designed, permitted and exercised autonomy.** Three readings of an agent's autonomy level: what the build allows, what the autonomy contract permits, and what the logs show. Controls follow the higher of permitted and exercised; exercised above permitted is an incident.

**Working memory / working context.** Information selected for the agent's current decision, including the current task, relevant evidence, and recent results. This guide uses working context for the material supplied to a model call; application task state can contain more than that call sees.

**Thread memory.** Retained conversation and task state scoped to one continuing thread or case, including messages, tool results, and pending work. It can be persisted across interruptions; thread scope does not prescribe a retention duration.

**Long-term memory.** Information deliberately retained for reuse across tasks or threads under explicit scope, ownership, access, and lifecycle rules. It is not synonymous with a vector database.

**Episodic memory.** Retained records of particular experiences or events, with their context, actions, evidence, and outcomes where known.

**Semantic memory.** Retained facts and concepts, with source, scope, and validity information where applicable. Distinct from semantic search, a way to retrieve similar content.

**Procedural memory.** Retained knowledge of how to perform work, including approved instructions, methods, and tool-use procedures. Proposed lessons from episodes require the appropriate validation and approval before becoming enterprise procedures.

These memory-role terms follow the distinctions in [CoALA](https://arxiv.org/abs/2309.02427) (2023, revised 2024) and the implementation-oriented [LangGraph memory overview](https://docs.langchain.com/oss/python/concepts/memory), reviewed 18 September 2026. The enterprise approval and lifecycle requirements are this guide's design guidance. Purpose, retention scope, information form, and storage implementation are separate dimensions.

**Two learning loops.** The system flywheel (offline, evaluated, versioned, gated: trace, eval, curate, improve, staged rollout) and instance memory (online, immediate, exposed to drift and poisoning). They must be governed separately; memory learnings are promoted through the flywheel, never allowed to silently reshape behavior.

**Learning flywheel.** The offline improvement loop above. Includes distillation: replacing large models with fine-tuned small ones once labeled traces exist.

**Pricing regimes.** Human seat (per-employee subscription), agent seat (per-agent license), metered API (per token). Determines who absorbs the loop multiplier and shapes architecture: seat pricing favors few durable agents, metering favors ephemeral fleets.

**Your own agents and vendor-embedded agents.** Agents you build run through your own gateway, so every action can be governed, budgeted and traced on your terms. Agents embedded in vendor products (suite copilots, agents inside record systems) run on the vendor's platform; you govern them through tenant settings and the records the vendor exports. Architecture, audit and cost control must cover both.

**Packaged application (COTS).** Commercial off-the-shelf software run largely as the vendor ships it, such as billing, finance, customer or workforce systems. The enterprise cannot rewrite it, so the use-case question becomes: is the process inside one package or across several, and does the vendor have a generally available agent on this edition within two quarters. See product/use-cases/packaged-applications.mdx.

**Models may take permission away, never grant it.** Identity, entitlements, access control and audit are always enforced by deterministic systems outside the model. Probabilistic components (a model, a classifier, a model-based reviewer) may deny, escalate or quarantine; they may never grant a permission outside the deterministic envelope. In the four zones (access control, movement of money, safety actuation, formal regulatory records) they may not approve at all. Probabilistic signals inside those zones are normal and useful; probabilistic decisions are not. See product/architecture/deterministic-zones.mdx.

**Destruction rule.** Any delete, drop, destroy or reset on production data or environments is its own rule in the policy decision point, never folded into a broader permission. It runs plan-then-apply, with a named person approving that exact action once, two signatures for production deletion, deletion protection on the target, and backups outside the agent's reach. Sits beside the four zones; added October 2026.

**The rule for decisions about people.** Where an agent makes or shapes a significant decision about a person (credit, employment, insurance, health, housing, education, benefits, utility hardship or disconnection), a named person with authority to change the outcome decides. The model may score and draft. The person affected receives the notice the law requires, and the decision is logged with the model's inputs. A rule of accountability, notice and audit; it never lowers the risk tier. Anchors: GDPR Article 22, EU AI Act Annex III.

**Plan-then-apply.** The agent proposes a plan; a deterministic system applies it after approval. The pattern for any agent that changes production, and the mechanism behind the destruction rule.

**Risk tier (Tier 1 basic, Tier 2 enhanced, Tier 3 strict).** One of three levels set by the worst of nine factors: autonomy, the verb the agent's credential holds, system reach, reversibility of the consequence, blast radius, highest data class and egress, untrusted input, decision consequence for people, and oversight strength as a modifier. The tier picks the controls, the sign-off and the review cadence, and travels on the registry record. Five conditions are always High. See product/architecture/risk-profile.mdx.

**Rule of Two.** One agent session holds at most two of: untrusted input, sensitive data, and the power to change state or communicate out. All three together caps autonomy at A2 and puts a person on every action. From Meta's agent security guidance (October 2025) and the "lethal trifecta" (June 2025).

**Impact.** The fourth classification question for an agent: the zones it touches, whether it can delete anything, whether it shapes decisions about people, and the reversibility and reach of its actions. With its permissions, impact sets the risk tier.

**Multi-view (multi-card) embeddings.** A pattern that represents the same content through several purpose-specific embeddings (for example problem, entity, intent views), each indexed separately, so a question about one aspect matches that aspect rather than a blurred average. Tested by the guide on public corpora in August 2026: several vectors per document beat one decisively; purpose-specific views beat matched fixed-window chunks only where queries target one aspect, and lose where queries concern whole documents; conditioning the view design on the objective did not help in any form tested. The evidence and the recommended design are on the site's research pages.

**Sovereignty tiers (SV0 to SV4).** Deployment postures selected per workload and classification: SV0 managed API without a locality guarantee; SV1 region-pinned managed API; SV2 managed sovereign offering; SV3 self-hosted open-weight model in the enterprise tenancy; SV4 air-gapped or isolated on premises. A higher number is a stricter deployment constraint, not greater maturity.

**MCP (Model Context Protocol).** The open standard for connecting agents to tools and data. An MCP gateway governs tool access (RBAC, allowlists, credential injection, audit); distinct from an LLM gateway, which governs model calls (routing, caching, budgets).

**Grounding (evidence before answer).** Responses trace to trusted enterprise sources with provenance; weak evidence is excluded, flagged, or escalated rather than answered over.

**Agent washing.** Marketing existing automation or chat products as "agents" without autonomous tool-using behavior. Named by analysts as widespread; the reason every claim on this site carries its evidence status.

**Permissions (what its credentials let it do).** Controls are chosen by what an agent's own credentials let it do (read, write, delete, run code or SQL, browse, send externally, pay, change access, actuate), plus three flags: whether it takes untrusted input, the highest data class it can reach, and whether it writes long-term memory. Not by its product category. Isolation follows code, browsing and computer use; the agent user account follows mailboxes, meeting seats and directory visibility; the assessment is repeated on every tool grant, because agents gather permissions over time.

**Role (what the agent does for people).** Converse, create, assist or coordinate, with a business-domain tag. A label that implies no authority and sets no controls; the domain tag can trigger the rule for decisions about people.

**Interface a model builds.** A screen, card or form assembled by a model at run time. A display rule in the experience layer, not an agent type: validated before display, every fact shows its source, action buttons come only from a fixed catalogue, and personalising by behaviour or emotion needs consent.

**Audit trail baseline and EU AI Act record keeping.** Two levels of records. The audit trail baseline applies to every production agent: a registry entry, retained action logs collected where the agent cannot write, named oversight, and grounding that carries its sources. EU AI Act record keeping (Article 12 logging depth, oversight capture, technical documentation) applies to the tier that could plausibly classify as high-risk. Proportionality replaces blanket compliance.

**Provenance-carrying grounding.** Retrieval that stores source chunks and identifiers alongside embeddings so every answer is citable to its sources by construction. The guide's position: the highest-leverage single component of an evidence architecture, necessary but not sufficient for audit evidence.

**Agent budget.** A sponsor-owned spending allowance for an agent, with unit-economics targets, hard per-run caps and variance alerts. Not a salary: agent consumption is volatile, so the control is an allowance with alarms rather than a fixed cost.

**Validation loop (agent output before an operator).** The pattern published in control-room research: the model's raw response is never displayed; candidate actions are simulated against a digital twin or checked against rules, filtered, and only surviving options are shown for a human decision. The model proposes, physics or policy disposes.

**Governed rule promotion.** Moving learned agent behavior into fixed policy. Evidence-revised form: gate on counterexample survival and eval regression rather than frequency; land the promoted artifact in an enforcement layer outside the model (a rule the model merely reads is still a soft rule); and keep a demotion path, since most agent decisions cannot be converted to static rules at all.

**Solitary versus coordinated work.** The variable that predicts whether an assistant delivers measured value. Individually provisioned AI reliably improves solitary work such as email, and reliably fails to change coordinated work such as meetings and shared documents, because changing those requires agreeing new norms with colleagues. Deployment decisions should follow this distinction rather than the horizontal-versus-specialised framing.

**Containment versus resolution.** In customer-facing deployments, containment counts conversations that never reached a human, whether or not the customer was helped; resolution counts problems actually solved. Every documented reversal of an AI-first service programme set a containment or headcount target. The guide's position: target resolution and let containment be an outcome.

**Calibrated oversight.** The evidenced shape of trust progression: as operators gain experience they grant broader standing permission AND intervene more often, rather than supervising less. Oversight capacity is designed for prevention and legibility, not interception, and verification is made cheap by construction.

**Oversight-capacity gate.** The precondition on A4 and above: supervision capacity calculated from the span of control with wait time included, expressed as a burst rate rather than a daily or hourly average, instrumented in production, and resting on verification that is cheap by construction. Added because no credible human-to-agent supervision ratio has ever been published.

**The seven capabilities.** What an agent platform provides and every lifecycle stage calls on, distinct from the fourteen layers of the estate itself: a runtime, a tool gateway, knowledge and memory, identity and policy, evaluation and release, observability and an audit trail, and human oversight. Two rules bind them: policy is enforced outside the model, and the audit trail is written where the agent cannot touch it. Named after the components AWS, Microsoft and Google ship.

**Cost per resolved outcome.** The decision-level unit in the economics model: all model, tool and platform cost for the period, failed and retried attempts included, plus supervision time at a loaded rate, plus the cost of fixing wrong outcomes, divided by the outcomes accepted as resolved under the agreed quality standard. Report the resolution rate, failure rate, serious errors and repeat contacts beside it, and divide by resolution, never by containment. Distinct from cost per run, which is the unit platforms meter. One definition since October 2026 (D051); earlier pages carried three.

**Evals.** Systematic, versioned tests of agent quality, safety, grounding, and regressions: golden datasets, scenario tests, adversarial prompts, LLM-as-judge with human review. A production gate, not an afterthought.

## Representation and evidence

**Distilling model intelligence into an enterprise capability.** In this guide's business language, selecting and applying model capabilities to a useful task, with enterprise information, tools, controls, and measures. This broader activity does not necessarily involve model distillation, the training technique.

**Time-series embedding.** A learned representation of observations over time, used to compare behavior or support another analysis. The sampling interval, units, observation window, and operating conditions remain relevant. [TS2Vec](https://arxiv.org/abs/2106.10466), 2021, source reviewed 2026-09-17.

**Geospatial embedding.** A learned representation associated with a location or area. Its meaning depends on the data and training objective. An annual representation can capture temporal patterns without giving an exact event date. [AlphaEarth dataset documentation](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL), reviewed 2026-09-17.

**Multimodal evidence.** Evidence in more than one form, such as text, images, audio, video, or sensor readings. This describes the inputs, not a guarantee that one model understands them all equally well.

**Multiple-model system.** A system using different models for different jobs, such as a visual detector, a time-series encoder, and a language model. Multiple models do not necessarily imply multiple agents.

**Representation alignment.** Learning a shared relationship between representations so comparisons across them are meaningful. Equal vector dimensions alone do not establish alignment.

**Evidence fusion.** Combining findings from separate searches or models into a reviewed set of evidence for a task. In the guide's proposed designs, asset identity, place, time, permissions, and original source links connect the findings.
