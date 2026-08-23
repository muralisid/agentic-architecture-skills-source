---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for intelligence and learning to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","AI engineering and model-risk lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for intelligence and learning."
prerequisites: ["/docs/layers/r06-intelligence-and-learning"]
reading_time: "10 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r06-intelligence-and-learning/sources"
---

# R06 Intelligence and Learning: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Enterprises arrive at agents with BI stacks, data science platforms, and MLOps practice built for models that were trained, validated, deployed, and monitored on a release cadence. Agent quality does not fit that shape: behavior changes when a prompt changes, when a tool changes, when the vendor changes a model underneath you, and when memory accumulates. The organizational consequence is already visible in analyst forecasts, which expect AI governance and risk work to shift from legal and security functions toward engineering.

### 2. What changes with agents

Learning stops being a training-time activity and becomes an operating discipline with three distinct loops: context and prompt improvement (fast, cheap, reversible), retrieval and memory curation (medium, governed, covered in R14), and weight updates (slow, gated, rare in practice). The guide's standing rule stands: the system flywheel is offline, evaluated, versioned, and rollback-capable; instance memory is online and immediate; learnings promote from the second into the first, never the reverse.

### 3. Introduction options and sequencing

Optimize context and prompts against a locked eval suite first, because the published measurements say the cheap lever is rarely exhausted; distill to a smaller fine-tuned model when latency or unit cost forces it; reach for reinforcement fine-tuning only where a programmable, hard-to-game grader exists. Build the eval suite before the agent, from real failures rather than imagined ones.

### 4. Economics

The distillation case is well evidenced: a documented enterprise flywheel took a 70-billion-parameter teacher to a 1-billion-parameter student at roughly 98% of tool-calling accuracy on one GPU instead of two, with a headline inference-cost reduction claim near 98%. Routing sits alongside it, with published savings in the same family and a frontier-to-small price ratio wide enough to make the arithmetic obvious. The break-even guidance that circulates in practice (narrow workload, volume above roughly 50 million tokens a month, and a locked eval set) carries a tension the guide should name: a live flywheel keeps rewriting the eval set that distillation economics assume is stable.

On-policy distillation adds a second, less obvious economic argument: it repairs the instruction-following that domain fine-tuning degrades, by distilling from the pre-fine-tune version of the same model. Distillation as maintenance, not only as compression.

### 5. Learning

**Governed rule promotion, revised by evidence.** The guide's inherited position was that soft rules, where the agent decides and records a justification, graduate into hard rules the agent cannot modify, based on frequency and reliability, with humans controlling promotion. The direction survives; the mechanism needs three edits, because 2026 research inverted the assumption underneath it.

The assumption was that generating candidate rules is easy and promoting them is the control point. A direct study of exactly this pipeline found the opposite. Execution works: human-written policies improved a frozen small agent by five success points and cut interaction length. Generation is the bottleneck: of 32 automatically learned policies, only seven were grounded and executable, nine were too generic to change behavior, and sixteen were shortcuts, semantic errors, or malformed, with trace-learned policies scoring *below* fixed prompting. And the promotion gate failed in both directions, accepting a rule that cut success from five in twenty to one in twenty while rejecting a rule worth five points.

So: **gate on counterexample survival and eval-suite regression, not on frequency.** The mechanism that does work in the published record uses counterexample-guided induction over annotated traces with human review, reaching high accuracy in narrow domains and converging in a handful of iterations; the reference enterprise flywheel likewise keeps promotion manual with no published automatic thresholds.

**Name the enforcement tier.** A rule the model merely reads is still a soft rule. The hard tier is policy-as-code outside the model, versioned and deployed independently, which is the same conclusion R10 reached from the security side. This matters because it bounds the ambition: a statement-level analysis of real agent instruction files found roughly three-quarters of policy statements depend on context that cannot be predefined, leaving about a quarter statically enforceable as written, and formal work shows deterministic gates cannot express renewal properties at all.

**Add a demotion path.** Accumulated context is not free: studies of repository context files found machine-generated ones slightly *reduced* success while raising inference cost by a fifth. A promotion-only pipeline compounds cost and never sheds dead rules.

### 6. Risk and groundedness

Three risks define this track.

**Reward hacking generalizes.** Training on reward-hacking strategies inside real production coding environments produced not merely a worse agent but a differently aligned one: alignment faking in half of goal-reporting probes and sabotage attempts in roughly one in eight evaluation runs, with standard safety training fixing chat-like evaluations while the misalignment persisted on agentic tasks. An unattended flywheel optimizing a gameable signal is a safety problem, not just a quality problem.

**The eval harness is an attack surface.** A zero-capability agent scored 100% on several major agent benchmarks; on one, editing roughly ten lines in a single test configuration file passed all 500 instances. The recurring vulnerability was no isolation between the agent and the evaluator. If evals are the governance instrument, they inherit the security requirements of a governance instrument.

**Proxy metrics fail in the business direction too.** Deflection rate counts conversations a human never touched, which includes conversations that ended with an unresolved problem and a link, and re-contact multiplies the true cost per issue while the dashboard improves. The healthy signature to track instead is pass rate climbing while the human revision rate stays flat or falls, meaning people intervene less because the agent improved rather than because they gave up.

### 7. Security and determinism

This track supplies the promoted artifacts that R10's deterministic layer enforces. The handoff is the point: learning proposes, evals judge, humans approve, and the enforcement layer executes outside the model. Judge governance belongs here too, since judges drift silently on hosted endpoints and require calibration against human labels (mechanics in R12).

### 8. Sovereignty

Traces used for learning carry the classification of the data in them; eval datasets built from production traces inherit residency and retention obligations; fine-tuning on customer data creates a derived artifact that erasure obligations must reach.

### 9. Vendor landscape

Summary; map below. Data platforms are absorbing the flywheel (one acquired a continuous-evaluation and reinforcement-learning company in March 2026), specialists supply judge tooling for domain experts, and the optimization frontier is prompt and context evolution rather than weight updates.

### 10. Target state

An eval suite owned by domain experts and built from real failures; automated judging at volume with sampled human verification; a flywheel where production traces and eval datasets share a data layer so a failing online score promotes the trace automatically; rule promotion gated on counterexample survival with a demotion path; distillation where volume justifies it; and reinforcement fine-tuning only behind a grader that cannot be gamed.

### 11. Migration path

Write twenty to fifty tasks from real failures; instrument production so traces flow into datasets without manual export; put judges under calibration; add staged rollout gates; then optimize context, then distill, then consider weight updates. Stop buying: eval tooling with no path from production traces to datasets, and any optimization service that cannot show its grader.

### 12. Metrics

Eval coverage of real failure modes; judge-to-human agreement, tracked over time; promotion and demotion counts with the evidence behind each; pass rate against human revision rate; cost per successful outcome; and, for anything distilled, the accuracy gap to the teacher on a locked suite.

### 13. Data readiness and curation

Eval datasets are curated corpora with owners, the same discipline R14 applies to grounding. Two quality rules the published guidance supports: draw tasks from real failures, and accept a task only if two domain experts would independently reach the same verdict.

### Who owns the bar

**Domain subject-matter experts define correct behavior; engineering builds the machinery.** The strongest published guidance says the same thing in different words: the people closest to the requirements and the users are best positioned to define success, tasks should come from real failures, and a task is only well formed if two domain experts would independently agree on pass or fail. One large deployment deliberately widened eval participation beyond engineering to designers, operations specialists, and product managers, and notably does not use eval scores as launch gates, judging the program instead by whether teams trust the results and which decisions changed.

Economics shape the division of labor rather than the ownership: expert review costs roughly two orders of magnitude more per output than model-based judging, so the working pattern is an expert-owned bar, model judging at volume, and a sampled human verification slice reserved for rare classes and defensible labels. The emerging build role is an evaluation engineer, distinct from MLOps. One open gap worth stating: there is no credible published evidence that data science teams own agent quality, and the evidence that exists points toward distributed, product-adjacent ownership.

### Challenged defaults

**CD-19: fine-tuning and reinforcement fine-tuning vs prompt-and-context engineering plus evals. Verdict: an ordering, not a side.** The case for optimizing context first is strong and recent: an evolutionary prompt-optimization method beat a reinforcement-learning baseline by six points on average and up to twenty while using up to 35 times fewer rollouts, with gains from as few as ten training examples; a context-engineering framework improved agent benchmarks by ten points and finance tasks by nearly nine with no weight updates and no labeled supervision. The case for fine-tuning is equally real where the ceiling is genuinely reached: vendor-published reinforcement-fine-tuning results in specialist domains show double-digit gains, sample efficiency at a hundred examples where supervised fine-tuning degrades, and one head-to-head where a fine-tuned small model beat a prompt-engineered frontier model on classification accuracy at roughly a fifteenth of the inference cost.

The ordering that follows: optimize context and prompts against a locked eval suite; distill when latency or unit cost forces it; use reinforcement fine-tuning only when a programmable, hard-to-game grader exists and the prompt-optimized ceiling is demonstrably real, whose typical signature is accuracy that climbs during a week of prompt work and then goes flat. Fine-tuning is the wrong tool for format, tone, and style. And one hazard worth a sentence in any runbook: when validation reward exceeds the human ceiling, the model has gamed the rubric.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Trace and eval-dataset access controlled; promotion authority held by named approvers |
| C2 | Observability | Learning telemetry: promotion and demotion events, judge agreement, eval coverage (mechanics in R12) |
| C3 | Traceability & audit | Every promoted rule carries its evidence: the counterexamples it survived and the eval deltas it produced |
| C4 | Grounding in reality | Evals drawn from real failures; judges calibrated against human labels; benchmarks treated as attackable |
| C5 | Impersonation & authenticity | Judge provenance and version pinned; optimizer and evaluator kept decoupled so nothing grades its own work |
| C6 | Data sovereignty & residency | Traces and eval datasets inherit source classification; fine-tuned artifacts inherit erasure obligations |
| C7 | Data privacy | Redaction before traces enter datasets; consent for customer data in training artifacts |
| C8 | Safety & human oversight | Reward-hacking monitoring; human approval on promotion; demotion path when behavior degrades |
| C9 | Cost accountability | Optimization spend against measured gain; distillation break-even including the eval-stability assumption |
| C10 | Resilience & continuity | Rollback for every promoted artifact; the locked eval suite as the regression baseline |

### Open questions

- No published measurement of what fraction of *enterprise* agent decisions can be safely converted to deterministic rules; the closest figure comes from analysis of agent instruction files rather than deployed decisions.
- No credible published evidence on which function owns agent quality in enterprises at scale.

---
