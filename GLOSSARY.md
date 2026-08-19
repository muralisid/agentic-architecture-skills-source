# Glossary

Canonical definitions used across the guide. Terms are defined once here and used consistently everywhere. Additions and corrections via PR.

**Agent.** An LLM autonomously using tools in a loop to pursue a goal, deciding its own next step. Distinct from a workflow.

**Workflow.** Orchestration of models and tools through predefined code paths. Cheaper, lower variance, and preferred wherever the task allows (see Deterministic by default).

**Agentic enterprise.** An enterprise where routine knowledge work executes through governed agents while humans set intent, supervise, manage exceptions, and hold accountability. The recognition test is a trust progression: agents operate under their own identity with a named accountable human, and autonomy expands with demonstrated reliability. Formalized by the Autonomy-Learning maturity model (A x L).

**Autonomy-Learning maturity model (A x L).** The guide's two-axis model, applied per workload. Autonomy A0 to A5: A0 manual, A1 assisted, A2 delegated tasks, A3 supervised autonomy, A4 managed autonomy, A5 governed lights-out. Learning L0 to L3: L0 fixed policy, L1 curated learning, L2 governed learning (the flywheel), L3 continuous learning inside guardrails. The learning axis is this guide's contribution; A4 and above should require L2 or better. See synthesis/maturity-model.md.

**Fixed-policy agent.** An agent that acts autonomously but does not learn; behavior changes only by redeployment. Still an agent by every mainstream definition, and the right choice for many workloads. This guide's position: without a learning loop you have a fixed-policy agent, not a teammate.

**Harness.** The engineering shell around the model: context assembly, tool routing, termination conditions, budgets, checkpoints, recovery.

**Agent identity, Level 1/2/3.** Level 1: credential-only (shared keys, service accounts); ungoverned, the anti-pattern. Level 2: first-class IAM principal with task-scoped permissions and audit (access identity). Level 3: organizational presence (directory entry, mailbox, calendar, manager, licenses) (presence identity).

**Access identity vs presence identity.** Access identity lets an agent act on systems under governance (Level 2). Presence identity makes the agent addressable as a colleague: email, meetings, org chart (Level 3). The trade-off is collaboration ergonomics vs attack and compliance surface.

**Memory tiers (L1 to L5).** L1 thread (current conversation), L2 retrieved knowledge (evidence for the current turn), L3 session, L4 entity memory (long-term profiles of customers, assets, cases), L5 cross-domain organizational memory. Higher tiers carry ownership, consent, retention, and erasure obligations.

**Memory planes.** Working context (engineering discipline), the agent's persistent store (governance-heavy), and organizational memory (shared substrate). Distinct from memory tiers, which grade persistence within stores.

**Two learning loops.** The system flywheel (offline, evaluated, versioned, gated: trace, eval, curate, improve, staged rollout) and instance memory (online, immediate, exposed to drift and poisoning). They must be governed separately; memory learnings are promoted through the flywheel, never allowed to silently reshape behavior.

**Learning flywheel.** The offline improvement loop above. Includes distillation: replacing large models with fine-tuned small ones once labeled traces exist.

**Pricing regimes.** Human seat (per-employee subscription), agent seat (per-agent license), metered API (per token). Determines who absorbs the loop multiplier and shapes architecture: seat pricing favors few durable agents, metering favors ephemeral fleets.

**Loop multiplier.** Token cost of agentic work relative to plain chat (published vendor figures: roughly 4x for single agents, 15x for multi-agent systems; vendor-published, as of 2025).

**Two-estate problem.** An enterprise's own gateway can only govern the metered estate (API traffic it proxies). Licensed platforms (Copilot, Agentforce, Frontier) run outside it. Architecture, audit, and cost control must span both estates.

**Deterministic boundary principle (models may inform, never decide).** Identity, entitlements, access control, and audit are always enforced by deterministic systems outside the model. In the four zones where consequences are irreversible (access control, movement of money, safety actuation, formal regulatory records), the decision rule is deterministic over verifiable credentials and policies; model outputs are advisory inputs. Probabilistic signals inside those zones are normal and useful; probabilistic decisions are not. See research/R10-security-and-identity/findings.md.

**Curation before context.** Data is prepared for agents per purpose and use case. The LLM guides (taxonomy, topics, judgment) while cheaper deterministic machinery executes at scale (embeddings, topic modelling, classifiers). Production-grade agents stand on curated data, not raw corpora pushed through the model.

**Multi-view (multi-card) embeddings.** Representing the same content through several semantic perspectives (for example problem, entity, intent, trend views), each indexed separately, to improve retrieval precision and recall per question type at embedding cost rather than LLM cost.

**MCP (Model Context Protocol).** The open standard for connecting agents to tools and data. An MCP gateway governs tool access (RBAC, allowlists, credential injection, audit); distinct from an LLM gateway, which governs model calls (routing, caching, budgets).

**Grounding (evidence before answer).** Responses trace to trusted enterprise sources with provenance; weak evidence is excluded, flagged, or escalated rather than answered over.

**Challenged default.** A technology treated as the obvious choice at some layer (often by hype), which this guide re-examines against the simplest credible alternative on evidence and economics.

**Agent washing.** Marketing existing automation or chat products as "agents" without autonomous tool-using behavior. Named by analysts as widespread; a reason the vendor question bank exists.

**Sponsor / Owner.** The accountability pattern for agents: a required business Sponsor accountable for the agent's purpose and lifecycle, and a technical Owner managing configuration and credentials.

**Capability-surface gating.** Controls are chosen by what an agent can actually do, not by its product category. Execution isolation follows code, browsing, and computer use; presence controls follow mailboxes, meeting seats, and directory visibility; the assessment is repeated on every tool grant, because agents accrete capability over time.

**Evidence floor / Article-12-grade instrumentation.** The guide's two-level compliance posture. An evidence floor applies to every production agent: registry entry, retained action logs, named oversight, and provenance-carrying grounding. Article-12-grade instrumentation (EU AI Act logging depth, oversight capture, technical documentation) applies to the tier that could plausibly classify high-risk. Proportionality replaces blanket compliance.

**Provenance-carrying grounding.** Retrieval that stores source chunks and identifiers alongside embeddings so every answer is citable to its sources by construction. The guide's position: the highest-leverage single component of an evidence architecture, necessary but not sufficient for audit evidence.

**Budget envelope (agent).** Sponsor-owned spending allowance for an agent, with unit-economics targets, hard per-run caps, and variance alerting. Deliberately not framed as a salary: agent consumption is volatile, so the control is an envelope with alarms rather than a fixed cost.

**Validation loop (agent output before an operator).** The pattern published in control-room research: the model's raw response is never displayed; candidate actions are simulated against a digital twin or checked against rules, filtered, and only surviving options are shown for a human decision. The model proposes, physics or policy disposes.

**Governed rule promotion.** Moving learned agent behavior into fixed policy. Evidence-revised form: gate on counterexample survival and eval regression rather than frequency; land the promoted artifact in an enforcement layer outside the model (a rule the model merely reads is still a soft rule); and keep a demotion path, since most agent decisions cannot be converted to static rules at all.

**Wrap, do not reinvent.** Agents reach enterprise systems through tool servers that wrap already-governed APIs, carrying the caller's identity so entitlement, validation, and audit stay where they already work. The tool layer is a wrapper, not a second policy engine.

**Evals.** Systematic, versioned tests of agent quality, safety, grounding, and regressions: golden datasets, scenario tests, adversarial prompts, LLM-as-judge with human review. A production gate, not an afterthought.
