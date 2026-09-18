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

**Autonomy-Learning maturity model (A x L).** The guide's two-axis model, applied per workload. Autonomy A0 to A5: A0 manual, A1 assisted, A2 delegated tasks, A3 supervised autonomy, A4 managed autonomy, A5 governed lights-out. Learning L0 to L3: L0 fixed policy, L1 curated learning, L2 governed learning (the flywheel), L3 continuous learning inside guardrails. The learning axis is this guide's contribution; A4 and above should require L2 or better. See synthesis/maturity-model.md.

**Fixed-policy agent.** An agent that acts autonomously but does not learn; behavior changes only by redeployment. Still an agent by every mainstream definition, and the right choice for many workloads. This guide's position: without a learning loop you have a fixed-policy agent, not a teammate.

**Harness.** The engineering shell around the model: context assembly, tool routing, termination conditions, budgets, checkpoints, recovery.

**Agent identity (ID1 to ID3).** ID1: credential-only (shared keys, service accounts); ungoverned, the anti-pattern. ID2: first-class IAM principal with task-scoped permissions, audit, and a named accountable sponsor (access identity). ID3: organizational presence (directory entry, mailbox, calendar, manager, licenses) (presence identity).

**Access identity vs presence identity.** Access identity lets an agent act on systems under governance (ID2). Presence identity makes the agent addressable as a colleague: email, meetings, org chart (ID3). The trade-off is collaboration ergonomics vs attack and compliance surface.

**Working memory / working context.** Information selected for the agent's current decision, including the current task, relevant evidence, and recent results. This guide uses working context for the material supplied to a model call; application task state can contain more than that call sees.

**Thread memory.** Retained conversation and task state scoped to one continuing thread or case, including messages, tool results, and pending work. It can be persisted across interruptions; thread scope does not prescribe a retention duration.

**Long-term memory.** Information deliberately retained for reuse across tasks or threads under explicit scope, ownership, access, and lifecycle rules. It is not synonymous with a vector database.

**Episodic memory.** Retained records of particular experiences or events, with their context, actions, evidence, and outcomes where known.

**Semantic memory.** Retained facts and concepts, with source, scope, and validity information where applicable. Distinct from semantic search, a way to retrieve similar content.

**Procedural memory.** Retained knowledge of how to perform work, including approved instructions, methods, and tool-use procedures. Proposed lessons from episodes require the appropriate validation and approval before becoming enterprise procedures.

These memory-role terms follow the distinctions in [CoALA](https://arxiv.org/abs/2309.02427) (2023, revised 2024) and the implementation-oriented [LangGraph memory overview](https://docs.langchain.com/oss/python/concepts/memory), reviewed 18 September 2026. The enterprise approval and lifecycle requirements are this guide's design guidance. Purpose, retention scope, information form, and storage implementation are separate dimensions.

**Memory tiers (M1 to M5).** M1 thread (current conversation), M2 retrieved knowledge (evidence for the current turn), M3 session, M4 entity memory (long-term profiles of customers, assets, cases), M5 cross-domain organizational memory. These are legacy scope labels, not an ordered taxonomy of memory kinds or retention duration. Apply ownership, access, retention, and erasure rules at every scope.

**Memory planes.** Working context (engineering discipline), the agent's persistent store (governance-heavy), and organizational memory (shared substrate). Distinct from memory roles (episodic, semantic, procedural) and from the legacy scope labels M1 to M5.

**Two learning loops.** The system flywheel (offline, evaluated, versioned, gated: trace, eval, curate, improve, staged rollout) and instance memory (online, immediate, exposed to drift and poisoning). They must be governed separately; memory learnings are promoted through the flywheel, never allowed to silently reshape behavior.

**Learning flywheel.** The offline improvement loop above. Includes distillation: replacing large models with fine-tuned small ones once labeled traces exist.

**Pricing regimes.** Human seat (per-employee subscription), agent seat (per-agent license), metered API (per token). Determines who absorbs the loop multiplier and shapes architecture: seat pricing favors few durable agents, metering favors ephemeral fleets.

**Loop multiplier.** Token cost of agentic work relative to plain chat (published vendor figures: roughly 4x for single agents, 15x for multi-agent systems; vendor-published, as of 2025).

**Two-estate problem.** An enterprise's own gateway can only govern the metered estate (API traffic it proxies). Licensed platforms (Copilot, Agentforce, Frontier) run outside it. Architecture, audit, and cost control must span both estates.

**Deterministic boundary principle (models may inform, never decide).** Identity, entitlements, access control, and audit are always enforced by deterministic systems outside the model. In the four zones where consequences are irreversible (access control, movement of money, safety actuation, formal regulatory records), the decision rule is deterministic over verifiable credentials and policies; model outputs are advisory inputs. Probabilistic signals inside those zones are normal and useful; probabilistic decisions are not. See research/R10-security-and-identity/findings.md.

**Curation before context.** Data is prepared for agents per purpose and use case. The LLM guides (taxonomy, topics, judgment) while cheaper deterministic machinery executes at scale (embeddings, topic modelling, classifiers). Production-grade agents stand on curated data, not raw corpora pushed through the model.

**Multi-view (multi-card) embeddings.** A pattern that represents the same content through several purpose-specific embeddings (for example problem, entity, intent views), each indexed separately, so a question about one aspect matches that aspect rather than a blurred average. Tested by the guide on public corpora in August 2026: several vectors per document beat one decisively; purpose-specific views beat matched fixed-window chunks only where queries target one aspect, and lose where queries concern whole documents; conditioning the view design on the objective did not help in any form tested. The evidence and the recommended design are on the site's research pages.

**Sovereignty tiers (SV0 to SV4).** Deployment postures selected per workload and classification: SV0 managed API without a locality guarantee; SV1 region-pinned managed API; SV2 managed sovereign offering; SV3 self-hosted open-weight model in the enterprise tenancy; SV4 air-gapped or isolated on premises. A higher number is a stricter deployment constraint, not greater maturity.

**Roadmap stages (Stage 0 to Stage 5).** The guide's delivery sequence: Stage 0 Ground, Stage 1 First value, Stage 2 Platform, Stage 3 Scale, Stage 4 Autonomy, and Stage 5 Extend. A stage is exited by evidence, not by elapsed time.

**MCP (Model Context Protocol).** The open standard for connecting agents to tools and data. An MCP gateway governs tool access (RBAC, allowlists, credential injection, audit); distinct from an LLM gateway, which governs model calls (routing, caching, budgets).

**Grounding (evidence before answer).** Responses trace to trusted enterprise sources with provenance; weak evidence is excluded, flagged, or escalated rather than answered over.

**Challenged default.** A technology treated as the obvious choice at some layer (often by hype), which this guide re-examines against the simplest credible alternative on evidence and economics.

**Agent washing.** Marketing existing automation or chat products as "agents" without autonomous tool-using behavior. Named by analysts as widespread; the reason every claim on this site carries its evidence status.

**Sponsor / Owner.** The accountability pattern for agents: a required business Sponsor accountable for the agent's purpose and lifecycle, and a technical Owner managing configuration and credentials.

**Capability-surface gating.** Controls are chosen by what an agent can actually do, not by its product category. Execution isolation follows code, browsing, and computer use; presence controls follow mailboxes, meeting seats, and directory visibility; the assessment is repeated on every tool grant, because agents accrete capability over time.

**Evidence floor / Article-12-grade instrumentation.** The guide's two-level compliance posture. An evidence floor applies to every production agent: registry entry, retained action logs, named oversight, and provenance-carrying grounding. Article-12-grade instrumentation (EU AI Act logging depth, oversight capture, technical documentation) applies to the tier that could plausibly classify high-risk. Proportionality replaces blanket compliance.

**Provenance-carrying grounding.** Retrieval that stores source chunks and identifiers alongside embeddings so every answer is citable to its sources by construction. The guide's position: the highest-leverage single component of an evidence architecture, necessary but not sufficient for audit evidence.

**Budget envelope (agent).** Sponsor-owned spending allowance for an agent, with unit-economics targets, hard per-run caps, and variance alerting. Deliberately not framed as a salary: agent consumption is volatile, so the control is an envelope with alarms rather than a fixed cost.

**Validation loop (agent output before an operator).** The pattern published in control-room research: the model's raw response is never displayed; candidate actions are simulated against a digital twin or checked against rules, filtered, and only surviving options are shown for a human decision. The model proposes, physics or policy disposes.

**Governed rule promotion.** Moving learned agent behavior into fixed policy. Evidence-revised form: gate on counterexample survival and eval regression rather than frequency; land the promoted artifact in an enforcement layer outside the model (a rule the model merely reads is still a soft rule); and keep a demotion path, since most agent decisions cannot be converted to static rules at all.

**Wrap, do not reinvent.** Agents reach enterprise systems through tool servers that wrap already-governed APIs, carrying the caller's identity so entitlement, validation, and audit stay where they already work. The tool layer is a wrapper, not a second policy engine.

**Solitary versus coordinated work.** The variable that predicts whether an assistant delivers measured value. Individually provisioned AI reliably improves solitary work such as email, and reliably fails to change coordinated work such as meetings and shared documents, because changing those requires agreeing new norms with colleagues. Deployment decisions should follow this distinction rather than the horizontal-versus-specialised framing.

**Containment versus resolution.** In customer-facing deployments, containment counts conversations that never reached a human, whether or not the customer was helped; resolution counts problems actually solved. Every documented reversal of an AI-first service programme set a containment or headcount target. The guide's position: target resolution and let containment be an outcome.

**Calibrated oversight.** The evidenced shape of trust progression: as operators gain experience they grant broader standing permission AND intervene more often, rather than supervising less. Oversight capacity is designed for prevention and legibility, not interception, and verification is made cheap by construction.

**Oversight-capacity gate.** The precondition on A4 and above in the A x L model: capacity calculated from the fan-out relation with wait time included, expressed as a burst rate rather than a daily or hourly average, instrumented in production, and resting on verification that is cheap by construction. Added because no credible human-to-agent supervision ratio has ever been published.

**The seven planes.** The planes of the agentic system built across the enterprise estate, distinct from the 14 layers of the estate itself: execution, action, knowledge, control, improvement, evidence, and human. Enforcement lives in the control plane, never in the execution plane, and the evidence plane is fed by collection the agent cannot influence.

**Cost per resolved outcome.** The decision-level unit in the economics model: run cost divided by resolution rate, plus supervision minutes at a loaded rate, plus the failure rate multiplied by the cost of a wrong outcome. Distinct from cost per run, which is the unit platforms meter.

**Make-it-evaluable queue.** Where a valuable use case goes when a domain expert cannot yet write pass-or-fail tasks for it. The funded work is defining success (writing the tasks, measuring the human baseline, finding the real failures), not building the agent. The highest-return spend in an immature programme.

**Portfolio supervision constraint.** Oversight capacity applied across the whole approved use-case set rather than per workload, because workloads are approved individually and supervised collectively.

**Evals.** Systematic, versioned tests of agent quality, safety, grounding, and regressions: golden datasets, scenario tests, adversarial prompts, LLM-as-judge with human review. A production gate, not an afterthought.

## Representation and evidence

**Distilling model intelligence into an enterprise capability.** In this guide's business language, selecting and applying model capabilities to a useful task, with enterprise information, tools, controls, and measures. This broader activity does not necessarily involve model distillation, the training technique.

**Time-series embedding.** A learned representation of observations over time, used to compare behavior or support another analysis. The sampling interval, units, observation window, and operating conditions remain relevant. [TS2Vec](https://arxiv.org/abs/2106.10466), 2021, source reviewed 2026-09-17.

**Geospatial embedding.** A learned representation associated with a location or area. Its meaning depends on the data and training objective. An annual representation can capture temporal patterns without giving an exact event date. [AlphaEarth dataset documentation](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL), reviewed 2026-09-17.

**Multimodal evidence.** Evidence in more than one form, such as text, images, audio, video, or sensor readings. This describes the inputs, not a guarantee that one model understands them all equally well.

**Multiple-model system.** A system using different models for different jobs, such as a visual detector, a time-series encoder, and a language model. Multiple models do not necessarily imply multiple agents.

**Representation alignment.** Learning a shared relationship between representations so comparisons across them are meaningful. Equal vector dimensions alone do not establish alignment.

**Evidence fusion.** Combining findings from separate searches or models into a reviewed set of evidence for a task. In the guide's proposed designs, asset identity, place, time, permissions, and original source links connect the findings.
