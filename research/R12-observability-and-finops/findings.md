---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for observability and FinOps to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Operations and FinOps lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for observability and FinOps."
prerequisites: ["/docs/layers/r12-observability-and-finops/brief"]
reading_time: "7 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r12-observability-and-finops/vendors"
---

# R12 Observability & FinOps: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Almost everyone watches, few evaluate, and nobody owns the bill. 89% of agent teams have some observability, but it rates as the weakest layer of their stack; 52% run evals at all and only 37.3% run them online (LangChain survey, Dec 2025 [vendor]). On cost: 52% of engineering leaders report no clear AI cost owner, an estimated 26% of AI spend is wasted, and 72% experienced an unexpected AI cost spike in the past year (Harness 2026 [vendor survey]; pair with FinOps Foundation data for neutrality: 98% of FinOps practitioners now manage AI spend, up from 63% a year earlier).

### 2. What changes with agents

Agents are traced actors with unit economics, not services with uptime. Three consequences: traces become the flywheel's raw material and the audit trail's substance (joining R06 and R11); cost becomes per-outcome rather than per-month (tokens per request doubled year over year at the median, so spend can rise while prices fall); and quality becomes an operations metric with service objectives, not a launch-time checkbox.

### 3. Introduction options and sequencing

Instrument from the first agent using OpenTelemetry GenAI conventions, with eyes open: **the conventions are not stable as of August 2026**: everything GenAI remains in development status and was moved to a dedicated repository (June 2026) that had no tagged release by mid-July. Agent spans and MCP conventions exist and are the right vocabulary; instrument as if the schema will change, keep a translation layer, and avoid deep coupling to any proprietary SDK you may want to leave. Stand up offline evals before launch, online evals and staged rollouts before scale, and budget enforcement before autonomy.

### 4. Economics

The FinOps model the evidence supports (H26, refined): **a sponsor-owned budget envelope per agent with unit-economics targets and variance alerting**; FinOps provides metering, showback maturing to chargeback, and anomaly detection; central funding stays on the shared platform layer. The Sponsor construct is productized (identity platforms carry a literal sponsor role; workforce systems budget agents; control planes ship per-agent billing policies with limits and alerts; CRM platforms meter to the agent-action level at $0.10 per action [vendor]), but no enterprise has published running per-agent budgets yet, so the guide labels this recommended design, not established practice. "Salary-like" is deliberately avoided: consumption is volatile, and the working analogy is a budget envelope with alarms. Unit economics get real anchors: outcome-priced agents exist ($0.99 to $2.00 per automated resolution [vendor pricing] against a $6-12 human-handled comparator), and where outcomes are not priced, action/credit metering supplies the unit.

### 5. Learning

Production evals are the flywheel's gate, and the judges themselves need governance: LLM-as-judge systems show systematic biases, agree with themselves more than they measure the right thing, and drift silently on hosted endpoints (2025-2026 findings), so judge calibration against human labels and periodic re-validation are part of the discipline, not optional. The published rollout pattern for agent changes: shadow, then 1-5% canary gated on session success, satisfaction, and escalation rates, then full, with flags decoupling activation from deployment (a pattern significant enough that a frontier lab bought a flags-and-experimentation company for $1.1B).

### 6. Risk and groundedness

The signature failures: runaway loops and retry storms (a self-reported $1.3M multi-agent incident; 60% of LLM call errors are rate-limit driven, so retry storms are an ecosystem-wide phenomenon, not an anecdote [vendor telemetry]); silent quality regression (the online-eval gap); and unmonitored guardrails (block-rate spikes signal attack, block-rate drops signal misconfiguration; both need alerts).

### 7. Security and determinism

Budget enforcement is a deterministic control: per-invocation hard caps (iterations, timeout, tokens) with cost-attribution tags are shipped platform features [vendor], and gateway-level hierarchical budgets that return errors on exhaustion are the established open-source pattern. Observability data itself carries obligations: traces containing prompts and outputs are evidence (R11) and personal data (R14 erasure mechanics apply).

### 8. Sovereignty

Telemetry residency follows data residency: traces with prompts and retrieved content inherit source classification; observability backends join the sovereignty surface.

### 9. Vendor landscape

Summary; map below. The category consolidated dramatically in twelve months: most named LLM-observability specialists are now inside larger platforms, and the eval/observability boundary dissolved.

### 10. Target state

Every agent traced end to end (session, model calls, tool calls, cost) on standards-based vocabulary with a translation layer; offline and online evals with calibrated judges gating all behavior changes through staged rollouts; per-agent budget envelopes with sponsor ownership, hard caps, and anomaly alerting; quality SLOs (session success, containment, escalation) tracked per release; two-estate visibility bridged (licensed platform analytics APIs plus metered-estate telemetry in one view).

### 11. Migration path

Instrument first agents (OTel vocabulary, translation layer); stand up eval discipline (offline, then online, then judge calibration); wire budget caps and anomaly alerts; establish sponsor-owned envelopes with showback; bridge licensed-estate analytics; mature to chargeback where allocation is clean. Stop buying: observability that cannot ingest or export standard telemetry; eval tooling with no path from production traces to datasets.

### 12. Metrics

Trace coverage (agents, sessions, tool calls); online-eval coverage and judge-calibration currency; canary gate pass rates; cost per session and per outcome; budget-cap trips and anomaly detections; time-to-explain a spend spike (the 20%-can-explain-overnight-doubling stat is the baseline to beat); licensed-estate visibility lag.

### 13. Data readiness and curation

Traces are a curated corpus: retention, redaction, and provenance rules apply; eval datasets curated from production traces are the R14 discipline applied to the system's own behavior.

### Challenged defaults

**CD-15: Extend APM with OTel GenAI vs dedicated LLM observability platforms. Verdict: the question dissolved; choose on the real fault lines.** In twelve months the specialists were largely absorbed: Dynatrace agreed to acquire Arize for $915M (Aug 13, 2026; verify close), ClickHouse acquired Langfuse (Jan 2026, MIT license retained), Cisco folded Galileo into Splunk (May 2026), CoreWeave took Weights & Biases (2025), OpenAI bought Statsig ($1.1B, Sep 2025); LangSmith and Braintrust remain independent and well funded. The surviving decision criteria: (1) OTel-native pipeline versus proprietary SDK (with the caveat that OTel GenAI is itself unstable, so either path needs a translation layer); (2) eval-loop depth (datasets, experiments, judge tooling) versus infrastructure correlation (agents next to the databases and queues they touch); (3) self-hosting requirements (the open-source option is now owned by a database vendor but keeps its license). Most enterprises land on their APM incumbent for correlation plus one eval-capable tool for the loop; the merged-category trend suggests even that seam closes. Re-verify quarterly; two of the cited deals had not closed at research time.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Trace access controlled (traces contain prompts and data); per-agent cost attribution keyed to agent identity |
| C2 | Observability | The track itself; coverage metrics; two-estate bridging |
| C3 | Traceability & audit | Traces as evidence artifacts (R11); retention and integrity; span-level linkage answer-to-source |
| C4 | Grounding in reality | Eval datasets curated from production; judge calibration against human labels |
| C5 | Impersonation & authenticity | Telemetry authenticity (agents cannot forge their own traces; collection outside the agent's control) |
| C6 | Data sovereignty & residency | Telemetry residency inherits source classification; backend locality |
| C7 | Data privacy | Prompt/output redaction in traces; erasure cascades include telemetry |
| C8 | Safety & human oversight | Canary gates with human review; guardrail metrics alerting both directions; kill-switch integration |
| C9 | Cost accountability | The track's core: envelopes, caps, showback-to-chargeback, anomaly detection, cost-per-outcome |
| C10 | Resilience & continuity | Budget-exhaustion behavior defined (fail to human queues); observability outage does not blind the kill switch |

### Open questions

- No published enterprise error-budget analog for agent quality SLOs: presented as an open pattern.
- OTel GenAI stability: the single most important re-verification item for this track.

---
