# The Autonomy-Learning Maturity Model (A x L)

As of August 2026.

---

## Why another maturity model

Ladders for agent autonomy already exist, and this guide builds on them rather than pretending otherwise. Google DeepMind published autonomy levels 0-5 framed as a human-interaction paradigm and a deliberate deployment choice (Morris et al., arXiv Nov 2023, ICML 2024). Feng, McDonald, and Zhang published L1-L5 defined by the user's role, from operator to observer, with a proposal for autonomy certificates (arXiv Jun 2025). Hugging Face researchers published levels of agency defined by who controls program flow, with an argument against the fully autonomous top level (Mitchell et al., arXiv Feb 2025). Salesforce ships an L0-L4 agentic maturity model keyed to orchestration scope (Apr 2025 [vendor]). All descend from Sheridan and Verplank's ten levels of automation (1978) and the SAE driving levels.

What none of these models carries is a learning axis: across the field we surveyed, learning capability appears in almost no maturity model at all. Yet in enterprise practice, whether an agent can improve, and under what governance, determines the operating model around it more than its autonomy does: a fixed-policy agent is configured; a learning agent is managed. This model therefore has two dimensions.

## Axis 1: Autonomy (A0 to A5)

Who executes the work, and what role the human plays. The A-levels are an enterprise operating-model ladder, applied per workload; they are closest in spirit to Feng's user-role levels and DeepMind's interaction paradigms.

| Level | Name | Work execution | Human role | Required controls |
|---|---|---|---|---|
| A0 | Manual | Humans with conventional tools | All work | n/a |
| A1 | Assisted | Copilots suggest; humans execute | All decisions and actions | Usage policy |
| A2 | Delegated tasks | Agents execute bounded tasks on request | Review every output | Task scoping, output review, audit |
| A3 | Supervised autonomy | Agents run routine workflows end to end | Approve irreversible actions, handle exceptions | Approval gates, evals, budgets, kill switch |
| A4 | Managed autonomy | Agent teams run routine operations to SLOs | Manage exception queues, supervise | Eval-gated change, concern register enforced, supervisor dashboards |
| A5 | Governed lights-out | Full routine automation in scoped domains | Set policy, own accountability, audit outcomes | Proven eval maturity, continuous assurance, regulator-ready evidence |

The bottling plant of the vision chapter operates at A3 to A4. Two cautions on A5, both from the evidence: a published argument exists against building fully autonomous agents at all (Mitchell et al., 2025), and production deployments in 2026 cluster at low autonomy levels (Gartner, 2025-2026). A5 is a governed end-state that few workloads should reach, entered per domain and never declared enterprise-wide.

## Axis 2: Learning (L0 to L3)

Where and how the agent improves, and under what governance. This axis is the model's contribution, introduced by this guide.

| Level | Name | How the agent improves | Governance |
|---|---|---|---|
| L0 | Fixed policy | It does not; behavior changes only by redeployment | Standard change management |
| L1 | Curated learning | Humans update its ground truth, heuristics, and prompts offline | Versioned content, review before release |
| L2 | Governed learning | The system proposes improvements (rules, retrieval, routing) that promote through evals and human gates | The learning flywheel: trace, evaluate, curate, promote, roll back; promotion criteria explicit |
| L3 | Continuous learning | Online memory and adaptation inside guardrails, with promotion of durable learnings through the L2 gate | Memory governance (provenance, TTL, erasure), drift monitoring, freeze switch |

Two rules connect the axes:

1. **Autonomy is promoted by earned trust, and learning maturity is the evidence.** An agent moves up A-levels when demonstrated reliability justifies it (consistent with Anthropic's graduated-trust guidance, Aug 2025 [vendor]), and demonstrated reliability at scale requires at least L2: without governed learning, reliability can only be observed, not improved. As a practical rule, this guide holds that A4 and above should require L2 or better.
2. **The teammate region.** The vision chapter's claim, "without a learning loop you have a fixed-policy agent, not a teammate," lands here: L0-L1 agents are automation you configure; L2-L3 agents are teammates you manage, with a named accountable human governing what they learn.

## Using the model

- **Per workload, never enterprise-wide.** An enterprise holds a portfolio of (A, L) positions. The autonomy level is a deliberate deployment choice, not the maximum the technology allows (a principle borrowed from DeepMind's levels work).
- **Movement is earned, and reversible.** Promotion between A-levels follows demonstrated reliability against explicit eval criteria; demotion follows incidents. Feng et al.'s autonomy-certificate idea is a useful institutional form for this.
- **The controls column is the contract.** Each A-level names the minimum control set; the guide's cross-cutting concern register (identity, observability, traceability, grounding, impersonation, sovereignty, privacy, safety, cost, resilience) applies at every level and tightens as A rises.
- **Anti-pattern: agentwashing the ladder.** Claiming A3 or higher for systems that are scripted automation with a chat front end. The test is behavioral: does routine work flow to the agent by default, and does a human approve only exceptions and irreversible actions?

## Sources

- Morris et al., Levels of AGI, arXiv Nov 2023 / ICML 2024. https://arxiv.org/abs/2311.02462
- Feng, McDonald, Zhang, Levels of Autonomy for AI Agents, arXiv Jun 2025. https://arxiv.org/abs/2506.12469
- Mitchell, Ghosh, Luccioni, Pistilli, Fully Autonomous AI Agents Should Not Be Developed, arXiv Feb 2025. https://arxiv.org/abs/2502.02649
- Salesforce, Agentic Maturity Model, Apr 10 2025. https://www.salesforce.com/news/stories/agentic-maturity-model/ [vendor]
- Anthropic, framework for safe and trustworthy agents, Aug 4 2025 [vendor]
- Kasirzadeh and Gabriel, Characterizing AI Agents, arXiv Apr 2025. https://arxiv.org/abs/2504.21848
- Sheridan and Verplank (1978); Parasuraman, Sheridan, Wickens (2000); SAE J3016 (lineage)
- Gartner, agentic AI maturity and adoption commentary, 2025-2026 (via press releases and licensed reprints)
