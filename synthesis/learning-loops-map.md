# The Learning-Loops Map

As of August 2026. Phase 4 synthesis, drawn from R06 intelligence and learning, R14 memory pipelines, R12 observability, and the learning axis of the maturity model.

---

## Two loops, and they must be governed separately

**The system flywheel** is offline, evaluated, versioned and gated: trace, evaluate, curate, improve, roll out in stages, roll back on regression. It changes what the agent is.

**Instance memory** is online and immediate: what an agent learns during and between sessions. It changes what one agent instance knows.

The failure mode that makes this distinction load-bearing is silent behaviour change. Instance memory that reshapes agent behaviour without passing a gate is an unversioned deployment nobody approved. Memory learnings are therefore promoted **through** the flywheel, never allowed to become policy on their own.

## Where each loop lives, by layer

| Layer | System flywheel | Instance memory |
|---|---|---|
| R02 Data platform | Retrieval quality evaluated per corpus; index versions promoted blue and green | None. The platform stores; it does not learn |
| R14 Agent data engineering | Curation proposals: taxonomy updates, ground-truth additions, data corrections, promoted through evals and human gates | Hot-path memory writes during sessions, background consolidation between them, quarantine before promotion to durable tiers |
| R03 Integration fabric | Tool description versions; failure patterns feeding gateway policy | None. The gateway enforces; it does not learn |
| R04 Systems of record | Override rates per workflow feeding approval-gate tuning | None at the record system. Entity memory about records lives at R14 |
| R05 Line of business and OT | Recommendation acceptance and override telemetry feeding model and threshold updates | Deliberately absent. Nothing in a control-adjacent loop learns online |
| R06 Intelligence and learning | **The owner of the mechanism.** Eval suites, judges, promotion gates, distillation, staged rollout | Feeds datasets; does not hold memory |
| R07 Agent platform | Agent versions promoted with their gate evidence; skills and instruction files versioned and signed | Session state, working context, compaction |
| R08 Productivity and collaboration | Task-type outcome data identifying where returns are negative and should be stopped | Personal assistant memory, which is where individual and organisational memory quietly blur |
| R09 Experience and channels | Escalation-triggered failures into eval datasets; the highest-value trace source in the estate because failures are labelled by real customers | Customer memory, consent-bound and the most regulated instance memory in the guide |
| R10 Security and identity | Detection content updated from incidents | None. Deterministic by design |
| R12 Observability and FinOps | The data layer both loops run on: traces to datasets, online scores promoting traces automatically | None |
| R13 Operating model | Runbooks and escalation criteria as curated corpora, revised from real exceptions | Human learning, which is the loop this guide most often forgets to design |

Two patterns are visible reading down the columns. Layers that enforce do not learn. And the highest-value trace source is R09, because customer escalation labels failures for free, which is an argument for instrumenting the customer-facing lane properly even when it is small.

## The promotion gate, corrected by evidence

The guide's inherited position was that soft rules graduate into hard rules on frequency and reliability, with humans controlling promotion. The direction survived; the mechanism needed three edits, because 2026 research inverted the assumption underneath it.

The assumption was that generating candidate rules is easy and promoting them is the control point. A direct study of that pipeline found the reverse. Execution works: human-written policies improved a frozen small agent by five success points and shortened interactions. **Generation is the bottleneck**: of 32 automatically learned policies, only seven were grounded and executable, nine were too generic to change behaviour, and sixteen were shortcuts, semantic errors or malformed, with trace-learned policies scoring below fixed prompting. And the gate itself failed in both directions, accepting a rule that cut success from five in twenty to one in twenty while rejecting a rule worth five points.

The three edits, now the guide's position:

1. **Gate on counterexample survival and eval-suite regression, not on frequency.** The mechanism with published success uses counterexample-guided induction over annotated traces with human review, converging in a handful of iterations in narrow domains.
2. **Name the enforcement tier.** A rule the model merely reads is still a soft rule. The hard tier is policy-as-code outside the model, versioned and deployed independently, which is where R10 arrives from the security side. This also bounds the ambition: statement-level analysis of real agent instruction files found roughly three quarters of policy statements depend on context that cannot be predefined, leaving about a quarter statically enforceable as written.
3. **Require a demotion path.** Accumulated context is not free. Machine-generated repository context files slightly reduced success while raising inference cost by a fifth. A promotion-only pipeline compounds cost and never sheds dead rules.

## Governing the judges

The flywheel's gate is only as good as its evaluators, and evaluators need governance of their own. Judge systems show systematic biases, agree with themselves more than they measure the intended property, and drift silently on hosted endpoints. So: judges are calibrated against human labels and periodically re-validated, versions are pinned, and the optimiser is kept decoupled from the evaluator so nothing grades its own work.

**Domain SMEs own the eval bar.** This is the guide's position from R06, and it is an organisational claim as much as a technical one: the people who can say whether an answer is correct are the people who do the work, not the platform team that built the pipeline.

## The rollout pattern

Shadow, then a 1% to 5% canary gated on session success, satisfaction and escalation rates, then full, with feature flags decoupling activation from deployment. Every promoted artifact has a rollback. This is ordinary software discipline, and the reason it needs stating is that agent behaviour changes frequently ship as content updates that bypass it.

## Mapping back to the L-axis

| L level | What the loop looks like | Who can honestly claim it |
|---|---|---|
| L0 Fixed policy | None. Behaviour changes by redeployment | Any archetype. Often the correct choice |
| L1 Curated learning | Humans update ground truth, heuristics and prompts offline on a schedule | The mid-market's honest target |
| L2 Governed learning | The system proposes; evals and human gates dispose; promoted artifacts land outside the model; demotion exists | Required for A4 and above |
| L3 Continuous learning | Online memory inside guardrails, with durable learnings promoted through the L2 gate | Usually digital natives first. Requires everything L2 requires, plus memory governance |

The rule that binds the axes stands: A4 and above require L2 or better, because at that autonomy level reliability has to be improvable, not merely observable.

## What is not known

No published measurement exists of what fraction of **enterprise** agent decisions can safely be converted to deterministic rules; the closest figure comes from analysis of instruction files rather than deployed decisions. There is no credible published evidence on which function owns agent quality in enterprises at scale. And there is no published enterprise analog of an error budget for agent quality, so quality SLOs are presented in R12 as an open pattern rather than a practice.

## Migration order

Write twenty to fifty tasks from real failures. Instrument production so traces flow into datasets without manual export. Put judges under calibration. Add staged rollout gates. Then optimise context, then distil, then consider weight updates. Stop buying eval tooling with no path from production traces to datasets, and any optimisation service that cannot show its grader.

## Sources

research/R06-intelligence-and-learning/sources.md, research/R14-agent-data-engineering/sources.md, research/R12-observability-and-finops/sources.md. Decisions D010 and D018 in DECISIONS.md.
