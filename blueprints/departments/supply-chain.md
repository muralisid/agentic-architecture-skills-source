---
reader_summary: "Adapt the Supply Chain and Operations blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Supply-chain leader"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Supply Chain and Operations."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "3 minutes"
evidence_status: "Blueprint synthesis: cited evidence, vendor-reported findings, author positions, and honest limits are labelled inline."
next: "/docs/blueprints/verticals/utilities-and-energy"
---

# Department Blueprint: Supply Chain and Operations

As of August 2026. Phase 6. The department the founding metaphor came from.

---

## 1. The scenario

A distribution business runs an ERP for planning, a WMS in the warehouse, transport management, a supplier base reached by EDI and portals, and a planning team that spends most of its week reconciling exceptions: short shipments, late suppliers, allocation conflicts, and demand signals that disagree.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Exception resolution agent | Investigates supply and order exceptions, gathers evidence across systems, proposes disposition | A3, L2 | The core of the department's value |
| Supplier communication agent | Chases, confirms and reconciles with suppliers across email and portals | A3, L1 | External-facing. Disclosure applies |
| Planning analysis agent | Explains plan variance and demand-signal disagreement with provenance | A2, L2 | Explains; the planner decides |
| Document processing agent | Extracts and validates shipping, customs and compliance documents | A3, L1 | Parsing fidelity is the ceiling here |

## 3. Planes activated

Action (**direct**: ERP, WMS and EDI through wrapped APIs), Knowledge (**direct**: parsing fidelity caps everything), Improvement (**direct**), Human, Control, Evidence, Execution (supporting).

## 4. Controls

- Idempotency and compensation on every agent-initiated action. A duplicated purchase order is a real cost, and retry behaviour is where duplication comes from.
- Approval gates by consequence class: quantity and date changes below a threshold flow, commercial terms do not.
- Supplier-facing communication carries disclosure and is retained.
- Parsing provenance at page and cell level, because a customs document error is a compliance event.
- Degraded-mode behaviour specified: the warehouse does not stop when an agent does.

## 5. Economics

**Per run.** Moderate, with tool fan-out across systems.

**Per resolved outcome.** Cost per exception cleared, against the planner's loaded hour. The compounding value is upstream: every exception whose root cause is recorded improves the master data everything else grounds on, which is the slow loop that matters more than the fast one.

## 6. Honest limits

- **No named-factory case exists of an MES agent taking autonomous production action with measured outcomes.** Widely circulated figures in this space trace to content farms. This blueprint stops at the planning and administrative layer for that reason.
- Warehouse and shop-floor actuation is R05 territory and carries the OT boundary: agents on the information path, not the control path.
- Parsing quality caps document processing. Even the best parsers lose at least 14% of retrieval performance against ground-truth structure, so document agents need spot-check metrics rather than trust.
- Master data quality is usually the real constraint, and no agent fixes it faster than it degrades without an owner.

## 7. Metrics

Exception clear rate and rework rate. Duplicate-action rate, which should be zero. Parsing fidelity spot checks. Master data disagreement count, trending down. Supplier response cycle time. Planner hours recovered.

## Sources

research/R03-integration-fabric/ (idempotency, compensation, EDI), research/R04-systems-of-record/, research/R05-lob-and-ot/ (the OT boundary and the MES finding), research/R14-agent-data-engineering/ (parsing).
