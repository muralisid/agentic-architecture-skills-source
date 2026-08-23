---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for the agent platform to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","AI platform lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for the agent platform."
prerequisites: ["/docs/layers/r07-agent-platform"]
reading_time: "10 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r07-agent-platform/sources"
---

# R07 Agent Platform: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Most enterprises running agents in production are not running a recognised agent framework. Observed telemetry across a thousand instrumented organisations found agent-framework adoption nearly doubling year over year to roughly 18%, which read the other way means about four fifths of organisations with agentic workloads have assembled their own. Practitioner surveys describe the same thing from the inside: orchestration is the most cited gap and the most improvised category, with teams wiring together their own arrangements because no vendor solution consistently works at production scale.

### 2. What changes with agents

The harness becomes the product. Everything that distinguishes a production agent from a demo lives here: how context is assembled and reset, how termination is decided, how state survives a crash, how verification happens, how the loop is prevented from running away. Research now shows this layer is not neutral plumbing. Holding task, environment and model constant, harness choices measurably change the agent's beliefs and downstream decisions even when terminal success looks the same, and in retrieval-heavy work the harness can matter more than the retrieval architecture. That has a direct implication for the guide's evidence standards: benchmark comparisons across harnesses are confounded.

### 3. Introduction options and sequencing

Buy the runtime, build the harness, is the pattern the market has converged on. Managed runtimes now accept whichever framework you bring, which makes the runtime the portable substrate and the harness the differentiator. Start with a single-agent loop and good tools; add orchestration only when the work decomposes into genuinely independent strands (see the contested choice); and put your portability investment into a harness abstraction rather than a framework choice.

### 4. Economics

Two cost structures matter. The orchestration layer's economics are dominated by the multiplier you choose: published figures put single agents at roughly four times chat token consumption and multi-agent systems at roughly fifteen times, and one vendor's own comparison of a solo agent against a planner-generator-evaluator harness on the same task reported roughly twenty times the cost and eighteen times the wall-clock for a quality difference they describe as immediately apparent. That is a real trade, not a free upgrade.

The second structure is the skill and context library. Progressive disclosure makes a large library economically viable: metadata for each capability costs on the order of a hundred tokens always loaded, the body loads only when triggered, and bundled files cost nothing until read, with scripts executing outside the context window entirely. Without that mechanism, a large library is simply a large prompt.

### 5. Learning

The lifecycle is where learning becomes governance at this layer. The only fully specified published agent-lifecycle state machine runs draft, approved, published, deprecated and retired, with named evaluation gates for promotion, versioning by lineage so a failing new version never reaches production, and a staleness policy that re-evaluates and automatically demotes. Its most interesting move is enforcing governance **through discoverability**: search returns only published agents, so quality degradation reduces reachability automatically rather than requiring a policy engine to intervene. It is a small proof of concept rather than observed enterprise operation, but it is the clearest published pattern available. Governance frameworks add the complementary rule that an agent's autonomy level is itself a versioned, review-gated property: prompt refinements take a light path, model updates and autonomy changes take a full one.

### 6. Risk and groundedness

The failure modes at this layer are well catalogued: a taxonomy built from 150 traces and validated on more than 1,600 across seven frameworks identifies fourteen failure modes in three categories, and its central conclusion is that multi-agent failures are **design** failures rather than model failures. A separate benchmark competition analysing 2,196 execution traces found token expenditure does not reliably predict task completion, that success correlates negatively with token usage and execution length, and that winning submissions improved guardrails rather than inventing architectures.

Production harness practice converges on four things: state lives outside the context window in inspectable artifacts; termination is explicit and multi-conditioned rather than "until the model stops"; verification is a separate agent or process, because models confidently praise their own mediocre work; and recovery is a first-class path rather than an exception handler.

### 7. Security and determinism

This track hands its promoted artifacts to the deterministic layer described in R10 and receives its tool governance from R03. The layer-specific control is the harness's own limits: iteration caps, wall-clock limits, cancellation checks between rounds, stop hooks, and approval gates with standing rules. Tool approval belongs in the harness because that is the only place that sees the whole loop.

### 8. Sovereignty

Harness state is data: session artifacts, memory files, and skill libraries carry the classification of what they contain and follow the residency posture set in R01.

### 9. Vendor landscape

Summary; map below. Frameworks consolidated during the year, with one major vendor merging two predecessors into a single framework that then kept changing surface for months after general availability. That churn is the cost of buying in at this layer and belongs in any selection decision.

### 10. Target state

A harness the enterprise owns and understands, running on a managed runtime it does not: explicit termination and budget conditions; state in inspectable artifacts; a separate verification path; a registry with evaluation-gated promotion and automatic demotion on staleness; a curated skill library with progressive disclosure; routing that leans on a deterministic first tier; and durable execution for anything that must survive a process dying.

### 11. Migration path

Single agent with good tools; explicit termination and budgets; artifacts-as-state; verification separated from generation; registry and promotion gates; skills library; orchestration last and only where the work is parallel. Stop buying: frameworks whose orchestration you cannot inspect, and platforms with no published deprecation policy.

### 12. Metrics

Harness-level: termination-condition trips by type, recovery success rate after crash, context resets per completed task, verification catch rate. Lifecycle: agents by state, promotion and demotion counts with the evidence behind each, staleness re-evaluations. Orchestration: parallel strand count against measured accuracy gain, cost multiplier per task class.

### 13. Data readiness and curation

Skills and instruction files are curated corpora with the same ownership and versioning discipline as any other. Two cautions from the published evidence: machine-generated context files have been measured to slightly reduce success while raising inference cost by about a fifth, and across a very large public skill corpus most skills were single-version and never updated, with only about 6% appearing on more than one marketplace. Reuse is asserted more often than demonstrated, and even single-vendor distribution is unsolved, since skill libraries commonly do not sync across that vendor's own surfaces.

### Challenged defaults

**CD-21: single agent with good tools vs multi-agent orchestration. Verdict: parallel breadth only, and the decisive variable is whether compute is held constant.** Almost every dispute in this debate dissolves once that question is asked. The headline multi-agent result, an orchestrator-worker system beating a single agent by roughly 90% on an internal research evaluation, was explicitly bought with roughly fifteen times the tokens, and the same publisher reports that token usage alone explains about 80% of the variance on a related benchmark. When reasoning tokens are held constant, a 2026 study across three model families found single agents consistently match or outperform multi-agent systems on multi-hop reasoning, and argues that many reported multi-agent advantages are better explained by unaccounted computation and context effects than by architecture.

So multi-agent buys parallel breadth and context isolation. It does not buy reasoning quality per token. The conditions where orchestrator-worker genuinely pays are conjunctive: the task decomposes into independent read-heavy strands, the total information exceeds one context window, the accuracy requirement exceeds what a single pass reaches, and the value clears the multiplier. The only published accuracy threshold puts the crossover above roughly 0.92 F1 on a document-extraction benchmark, where a hierarchical supervisor-worker pattern sat on the cost-accuracy frontier at 1.4 times baseline cost and a hybrid captured most of the gain at 1.15 times.

Where subagents must share evolving state, coordination cost dominates, and current models are measurably bad at the orchestration prompting that would fix it: a 2026 benchmark across ten topologies found an average combined pass rate of 17.2% with average information leakage over 200% per scenario. Production data agrees with the conservative reading: 59% of agentic application requests make only a single service call. Note also that the two camps disagree less than the framing suggests, since the leading multi-agent advocate states plainly that the approach is a poor fit where agents share context or have many dependencies, and that coding has fewer truly parallelisable parts than research.

### Agent types and the controls they need

Per-type control differentiation is published practice, with named enterprises. A government framework scales requirements by scope of actions, reversibility, autonomy level and task complexity; one pharmaceutical company runs five levels of agency where lower levels take a lightweight governance path, middle levels an impact assessment, and higher levels enterprise architecture review, with a runtime policy enforcement layer required *before* higher autonomy is enabled; a bank operates a deliberately bounded advisory agent with task-level autonomy only, no self-initiation and no decision authority.

The guide's own position goes one step further and is labelled as such: **for passive and embedded agents, the qualification that matters is eval-gated behavior plus exception logging that feeds learning, rather than autonomy.** No published taxonomy says this. Every one surveyed uses autonomy or action scope as the definitional axis, which classifies a bounded advisory system out of "agentic" entirely rather than qualifying it in by another route. The ingredients exist separately: evaluation gates already determine an agent's qualified scope of use in the lifecycle work above, and governance frameworks already prescribe feedback loops from monitoring into evaluation, plus immutability so failed trajectories cannot be deleted. Nobody has assembled them into a qualification criterion. We think they should be, and we flag that the consensus currently runs the other way.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Harness carries the caller identity into every tool call; approval rules held in the harness, enforced at the gateway |
| C2 | Observability | Loop telemetry: iterations, terminations by type, context resets, subagent fan-out |
| C3 | Traceability & audit | Session artifacts and event logs as the durable record; promoted agent versions traceable to their gate evidence |
| C4 | Grounding in reality | Verification separated from generation; self-assessment treated as unreliable by default |
| C5 | Impersonation & authenticity | Skills and instruction files signed and version-pinned; provenance for anything loaded into context |
| C6 | Data sovereignty & residency | Session state and skill libraries inherit content classification |
| C7 | Data privacy | Context and artifact retention bounded; memory handled per R14 |
| C8 | Safety & human oversight | Iteration and wall-clock caps, stop hooks, approval gates with standing rules, kill switch |
| C9 | Cost accountability | Per-run token and cost budgets enforced in the harness; multiplier chosen deliberately per task class |
| C10 | Resilience & continuity | Durable execution or artifacts-as-state; crash recovery tested; hibernate-and-wake for long waits |

### Open questions

- No credible published dataset on build-versus-buy outcomes at this layer: every circulating time-to-production, success-rate and maintenance-share figure traces to vendor content without methodology. The guide states the gap rather than citing weak numbers.
- No published enterprise A/B result for the tiered routing pattern; the strongest adjacent finding is that routing-method sophistication is not the lever, since 21 methods across 5 benchmarks converge within a fraction of a point while all trail an oracle by 10 to 30 points, and a simple nearest-neighbour approach beats trained methods on loss.
- No published migration case study with effort data.

---
