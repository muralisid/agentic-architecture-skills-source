---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for systems of record to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Enterprise applications lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for systems of record."
prerequisites: ["/docs/layers/r04-systems-of-record"]
reading_time: "10 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r04-systems-of-record/sources"
---

# R04 Core Systems of Record: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

ERP, CRM, HRIS, and ITSM hold the records that agents want to read and change, and each already carries decades of access control, approval routing, and audit that agents did not invent and should not replace. What is new is that every one of these vendors now ships an agent, and four of the five also ship a governed path for *other people's* agents to act on the same records.

### 2. What changes with agents

The load-bearing change is quieter than the marketing: **the permission plane became reachable two ways.** Salesforce states the equivalence in one sentence: if you cannot do it in Salesforce, your agent cannot do it through the MCP server; actions run as the authenticated user with the same CRUD, field-level security, and sharing rules, and audit-log to that user. ServiceNow shipped its MCP server generally available inside every AI-native SKU and opened its workflows, playbooks, and approval chains to any agent, naming third-party assistants explicitly. Workday exposes hundreds of tools over MCP where external agents inherit its security and delegation model, business-process controls, and audit trail. Oracle publishes Fusion agents that agents on other platforms can discover and call.

That collapses the assumption underneath most 2025 architecture decks, that embedded means governed and external means ungoverned. Both paths now run through the same permission plane. What still differs is model control, the cost meter, and the customization ceiling.

### 3. Introduction options and sequencing

The guide's position, and the practitioner rule this track is built on: **wrap, do not reinvent.** Expose systems of record to agents through MCP servers that wrap the APIs those systems already publish, and leave the deterministic access control where it already lives, in the API and the record system. The API estate has carried authentication, entitlement, validation, and audit for years; an agent tool layer that reimplements any of that has added a second, weaker copy of a solved problem.

Write access follows the trust progression rather than a policy switch: whether an agent may write depends on the use case, the agent's demonstrated reliability, and the consequence class of the record. Treat it like a new colleague, review everything at first, and relax the gate as evidence accumulates. This is the A x L model applied to a specific permission, and it maps cleanly onto what the vendors ship: Oracle can confirm whether *a user or an agent* holds authority for an action and route it for approval; Workday assigns agent owners the way it assigns managers to workers.

One trap to design around: **an embedded agent does not pause by default.** Salesforce agents execute on configuration and context without stopping for approval unless a human checkpoint is explicitly wired in. The gate is your job, not the platform's.

### 4. Economics

Four meters now price the same activity differently, and none of them is a seat:

- Per action, with a token step function. One vendor prices a standard agent action at roughly ten cents covering up to 10,000 tokens, so an operation that spends 20,001 tokens bills three times, not twice. Verbose grounding silently multiplies cost.
- Per AI unit, prepaid and pooled, with per-step rates that differ by agent complexity and overage in the range of eight to eighteen cents per action.
- Per assist, pooled inside tiers, where the vendor does not publish per-action values, pool sizes, or overage rates, a genuine procurement problem that its own community guidance flags.
- Included, where agents ship inside the existing subscription at no incremental charge.

Plus a fifth line that is easy to miss: the governance plane is a separate per-user SKU in one stack and free in another, so any total-cost comparison that prices agent actions without pricing governance is wrong by a variable amount. And grounding competes with acting for the same budget where credits fund data operations, model calls, and agent actions from one pool, on top of a data-platform floor that runs to five figures a year before any agent works at scale.

### 5. Learning

The system of record is where outcome data lives, which makes it the natural home of the feedback loop: resolved cases, corrected records, and approval overrides are labeled examples. The constraint is that in an embedded agent you generally do not control what the vendor learns or when its behavior changes (see 7), so enterprise learning concentrates on what you do control: the tool definitions, the approval thresholds, and the eval suite that decides whether a new vendor release still meets your bar.

### 6. Risk and groundedness

Two findings worth stating precisely.

First, **there is no published incident of an embedded system-of-record agent corrupting financial or HR records at scale.** The incidents that exist are a different class and should not be conflated: platform vulnerabilities (a CVSS 9.4 indirect-injection flaw exfiltrating CRM data through a lead form to an expired allowlisted domain that cost about five dollars to buy; a CVSS 9.3 unauthenticated impersonation flaw; a second-order injection through agent-to-agent discovery where agents ran with the privilege of the *initiating* user and the root cause was three shipped default settings), and coding agents deleting development databases. Both matter. Neither is the failure mode most write-access debates imagine.

Second, grounding across systems breaks on **entity resolution, not retrieval**. The same customer is a different identifier in the CRM, the product database, the marketing platform, and the ticketing system, and an agent querying three at once has no reliable way to know they describe one entity. Analytics semantic layers do not solve this, because they were built for aggregate questions rather than for resolving entities, following relationships, and acting.

### 7. Security and determinism

Deterministic control stays where it already is. The MCP layer is a wrapper that carries the caller's identity into the API that already enforces entitlement, validation, and audit; it is not a new policy engine. Concretely: run tool calls as the authenticated user rather than a service account, keep field-level security and sharing rules in force, gate consequential writes with the record system's own approval machinery, and log to the user, not to the agent.

The upgrade problem is this layer's sharpest unsolved risk. **A model name is not a version**: behavior has changed under unchanged model identifiers, and vendors retire model versions on their own schedules. For embedded agents you usually do not hold the pin, and no vendor at this layer publishes a model-change notification service level or a customer-controlled pin for its first-party agents. Where a vendor supports bringing your own model, you regain the pin, which is a concrete and non-obvious argument for doing so even when the vendor's default model is better today. Whatever you choose, keep an eval suite that runs against every vendor release.

### 8. Sovereignty

Records carry residency obligations, and so do the agent artifacts derived from them: conversation logs, memories, and any grounding index built from record data. Where the agent runs, where its memory persists, and how long the vendor keeps it are procurement questions at this layer, and at least one major platform auto-deletes agent memory after 28 days of inactivity with no documented export path.

### 9. Vendor landscape

Summary; map below. Two camps and one holdout: vendors that ship embedded agents *and* open their permission plane to external agents (Salesforce, ServiceNow, Workday, Oracle), the governance-plane vendor selling control across all of them (Microsoft), and the vendor closing the path (SAP, whose API policy requires agentic access to route through its own assistant, a position two major analyst firms publicly criticized in May 2026).

### 10. Target state

Systems of record keep their authority. Agents reach them through MCP servers wrapping governed APIs, running as the requesting identity, with writes gated by consequence class and relaxed by demonstrated reliability. Cross-system workflows run on an external orchestrator, because no single vendor's permission plane is authoritative across systems and entity resolution is the binding constraint. Every embedded agent has an eval suite that gates the vendor's releases, and a documented answer to what happens when the vendor changes the model underneath it.

### 11. Migration path

Inventory the records agents will touch and their consequence classes; expose the read paths first through the API estate you already govern; wire approval gates for the first write use case and instrument the override rate; earn autonomy per workflow; keep the eval suite running against vendor releases. Stop buying: agent capability that cannot run as the requesting user; any platform whose agent memory has no export path; and multi-year commitments priced on meters whose rates the vendor does not publish.

### 12. Metrics

Share of agent actions running as the requesting identity (target: all); approval-override rate per write workflow, trended, because a falling rate is the evidence that earns autonomy; entity-resolution accuracy on cross-system questions; cost per action against the token step function; vendor-release eval pass rate; agent memory export capability, tested.

### 13. Data readiness and curation

Records are the highest-value grounding an enterprise has and the most permission-encumbered. The curation work here is entity resolution across systems, definition ownership for the fields agents will read, and provenance so an answer can be traced to the record and version it came from.

### Challenged defaults

**CD-17: Embedded vendor agents vs external agents through governed APIs. Verdict: decide by authority boundary, and know that nobody has measured this.** The honest finding first: there is no published head-to-head measurement of an embedded agent against an external agent performing the same CRM or ERP task, from vendors, analysts, or practitioners. Generic agent benchmarks show up to fiftyfold cost variation at similar accuracy, which tells you the harness matters more than the badge. So this choice is being made on architecture and economics reasoning, and anyone claiming a performance winner is extrapolating.

What the evidence does support is a discriminator. When the workflow's authority boundary sits inside one system of record, both paths enforce the same permissions, so choose on model control, meter, and ceiling; the embedded agent buys the vendor's grounding and prebuilt actions and costs you the pin and the ceiling. When the workflow crosses systems, no vendor's permission plane is authoritative, entity resolution binds, and agent-to-agent protocols are not yet production-grade for cross-vendor negotiation, so external orchestration is a requirement rather than a preference.

Two cautions on the sides. Against betting everything on embedded: an analyst forecast that fewer than 15% of firms will even turn on the agentic features in their automation suites in 2026, and paid attach in the single-digit percentages of installed bases for the most prominent embedded agent. Against betting everything on external: most agentic work reaching production runs on vendor platforms, and self-build is where the failure rate concentrates.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Agents act as the requesting user through wrapped APIs; entitlement stays in the record system; no service-account agents |
| C2 | Observability | Action-level telemetry from both the agent platform and the record system's audit log; override rates tracked per workflow |
| C3 | Traceability & audit | Native audit logs attribute to the human identity; answer-to-record provenance; approval decisions retained |
| C4 | Grounding in reality | Entity resolution across systems; definition ownership; record freshness |
| C5 | Impersonation & authenticity | Run-as-user rather than shared credentials; agent identity distinct from human identity in the directory |
| C6 | Data sovereignty & residency | Record residency extends to agent memory, logs, and derived indexes; vendor retention and export terms are procurement items |
| C7 | Data privacy | HR and customer records carry worker-information and consent duties; agent memory inherits them |
| C8 | Safety & human oversight | Consequence-class gating for writes; explicit approval wiring, since embedded agents do not pause by default |
| C9 | Cost accountability | Per-action meters with token step functions; grounding competes with acting; governance plane priced separately |
| C10 | Resilience & continuity | Eval suites gating vendor releases; a documented answer for silent model changes; degraded mode to human queues |

### Open questions

- No published head-to-head measurement of embedded versus external agents on identical tasks.
- No published migration of a production agent estate between system-of-record platforms, so portability claims at this layer are untested.
- No vendor-published behavior-regression change-management practice for embedded agents.

---
