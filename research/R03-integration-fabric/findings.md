---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for the integration fabric to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Integration architecture lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for the integration fabric."
prerequisites: ["/docs/layers/r03-integration-fabric"]
reading_time: "10 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r03-integration-fabric/sources"
---

# R03 Integration Fabric: findings

As of August 2026. Pilot track: this format calibrates all remaining tracks. Every claim sourced in sources.md; [vendor] flags inline.

---

## 1. Current state

The typical large enterprise runs a four-part composite, and agents will land on all four at once:

- **Load-bearing legacy.** Mainframes and the ESB generation still carry critical flows: 87% of surveyed mainframe shops run CICS averaging 30,000 transactions per second at peak, and 72% report growing capacity (BMC survey, Sep 2025 [vendor]). Integration churn is chronic: 98% of surveyed IT leaders rebuilt integrations for key applications within twelve months, and only 7% report an established integration strategy (Digibee, 2023 [vendor]).
- **Partial API coverage.** Gartner predicted fewer than half of enterprise APIs would be managed by 2025 (Dec 2021); vendor surveys agree from the inside: 27% of applications connected and 27% of APIs ungoverned (MuleSoft, 2026 [vendor]); fewer than 40% of organizations enforce central API governance (Postman, Oct 2025 [vendor]); only 19% of CISOs claim full API visibility (Salt Security, 2025 [vendor]).
- **iPaaS and RPA sprawl.** iPaaS reached $8.5B revenue in 2024, up 23.4%; RPA $3.8B, up 18% but at what Gartner calls an inflection point (Gartner market share analyses, 2025). UiPath alone reports 10,800+ customers, of which roughly 450 were building agent workflows in 2025 [vendor].
- **Event backbone: widely installed, unevenly leveraged.** Kafka-class streaming penetrates a majority of large enterprises [vendor claims], but full event-driven maturity is rare (13% in the best available survey, Solace 2021 [vendor, dated]). The independent evidence here is thin; we state the direction, not a number.

## 2. What changes with agents

The integration fabric becomes the **enforcement plane of the agentic enterprise**. Three shifts:

1. **A tool contract emerges.** MCP standardizes how agents reach systems; as of the 2026-07-28 specification it has neutral governance (Agentic AI Foundation under the Linux Foundation, Dec 2025), a stateless core with header-based routing designed explicitly so gateways can route and authorize without parsing bodies, a formal extensions framework including Enterprise Managed Authorization, and a deprecation policy. Every major platform ships MCP support.
2. **Every integration becomes an action surface.** Agents consume APIs at machine speed and initiate writes; API design itself is shifting (one in four developers now designs APIs for AI agents, Postman Oct 2025 [vendor]). The estate's governance gaps stop being technical debt and become blast radius.
3. **Events become agent triggers.** The underused backbone acquires a purpose: ambient agents subscribe to business events rather than polling. This is the cheapest path to proactive agents and the strongest argument for finally treating streaming as an enterprise fabric.

## 3. Introduction options and sequencing

Fastest first: (a) expose already-governed APIs as MCP tools through the API management layer you have (incumbent gateways now do this without backend changes); (b) put a gateway in front of all MCP traffic before the first production agent, not after; (c) let RPA carry the API-less systems under agent supervision rather than blocking on wrappers; (d) activate event triggers for the first ambient use cases. Sequencing rule: govern the specific API paths agents will touch before exposing them; never wrap ungoverned plumbing (see CD-5).

## 4. Economics

Tool calls are the meter: each agent action is an API call plus model tokens, and agents are chattier than humans (retry storms and polling loops are real cost events; rate limiting is a budget control, not just protection). Cost levers at this layer: reuse of incumbent gateway licenses vs a parallel gateway estate (CD-2); MCP auto-generation of tools from existing API specs collapsing integration build cost; RPA license carry vs agent metering for the workloads bots still serve; caching of list results (supported natively in the 2026-07-28 spec).

## 5. Learning

The tool layer generates the flywheel's raw material: tool-call traces, failure rates per tool, selection patterns. Learning lands as improved routing (which tool for which intent), improved tool descriptions, and promotion of proven tool chains into deterministic workflows. Gate everything: new tools and changed descriptions pass evals before exposure, because descriptions are prompt surface (see 7).

## 6. Risk and groundedness

The failure modes that matter: injection through tool results and descriptions; runaway write loops; partial failures in multi-step actions. Controls, in order: read-only by default (MCP tool annotations carry readOnly/destructive/idempotent hints since 2025-03-26); idempotency keys and receipts on every mutating tool; compensation defined before shipping, not after; human approval for irreversible actions via protocol-level primitives (elicitation since 2025-06-18; the 2026-07-28 multi-round-trip `input_required` flow makes approvals gateway-mediable).

## 7. Security and determinism

**Gateway-first is not caution; it is the evidence-backed minimum.** The 2025-2026 record: tool poisoning demonstrated in April 2025 and benchmarked at up to 72.8% attack success with under 3% refusal across 20 models (MCPTox, arXiv Aug 2025); a real supply-chain backdoor in the wild (postmark-mcp, Sep 2025, ~300 organizations affected); critical RCEs (CVE-2025-6514, CVSS 9.6, 437k downloads; MCP Inspector CVE-2025-49596); cross-tenant leaks (Asana, Jun 2025); a data-exfiltration chain through a support ticket (Supabase, Jul 2025). NSA guidance (May 2026), the OWASP Agentic Top 10 (Dec 2025), the OWASP MCP Top 10 (beta), and CSA best practices converge on the same posture: vet servers like software, allowlist, proxy, inspect, and log.

The gateway pattern: no direct model-to-server connections; server allowlisting; credential injection at execution time so agents never hold secrets; per-tool RBAC on the caller's identity (OAuth token exchange per RFC 8693; on-behalf-of flows; the arriving standards, Okta's Cross App Access adopted as MCP's Enterprise Managed Authorization extension, and the IETF ID-JAG draft, make the gateway their enforcement point, not their replacement); tool-description integrity checks (diff and re-approve on change); SIEM-bound audit at action granularity. Two honest caveats: the registry is preview and explicitly not a trust signal; and the gateway layer is itself attackable (a hosting-layer path traversal leaked tokens controlling 3,000+ servers, Oct 2025), so the gateway needs its own hardening story, not a halo.

Identity tier: ID2 (first-class IAM principal) is the floor for any agent touching this layer; deterministic entitlement enforcement stays outside the model, per the guide's standing principle.

## 8. Sovereignty

Every tool call is a potential jurisdictional event: the gateway is where data-classification routing happens (route sensitive classes to in-region tools and models). Server hosting location matters as much as data location, and third-party MCP hosting inherits the Smithery lesson: an intermediary is part of your sovereignty surface.

## 9. Vendor landscape

Three converging camps: dedicated MCP gateways (open source under neutral governance, plus commercial entrants), API management incumbents adding MCP capability within a single year, and iPaaS/RPA platforms pivoting agentic. Agent-washing watch: "MCP support" claims without an authentication story, and relabeled orchestration marketed as agents (Gartner flags agent washing broadly, estimating only ~130 of thousands of claimed agentic vendors are real).

## 10. Target state

A governed tool plane: MCP as the tool contract; a gateway (dedicated or incumbent-extended) as the single enforcement point for identity, allowlists, credentials, inspection, and audit; a curated internal tool catalog (the public registry is discovery, not trust); events as the trigger fabric for ambient agents; RPA as supervised deterministic execution where APIs don't reach; agent-to-agent adoption deferred to demand (CD-4); the legacy core strangled behind governed APIs rather than modernized as a prerequisite (CD-5).

## 11. Migration path

Inventory the agent-relevant systems; govern the top API paths agents will touch; stand up the gateway before the first production agent; expose governed APIs as tools; wire approval and idempotency patterns; activate event triggers; expand tool coverage by use-case demand. Stop buying: point-to-point integrations without an agent-exposable surface, and any new middleware whose roadmap has no MCP story.

## 12. Metrics

Percentage of agent-relevant systems reachable through governed tools; tool-call success and retry rates; mean time to expose a new governed tool; percentage of mutating tools with idempotency and compensation; shadow MCP server count (discovered vs cataloged); description-change events reviewed before redeploy; security incidents per thousand tool calls.

## 13. Data readiness and curation

Tool schemas are data contracts; their quality decides agent groundedness at this layer. Tool descriptions are prompt surface and must be curated, versioned, and integrity-checked like code. Tool results feed grounding and memory: normalize and provenance-tag them at the gateway where practical.

---

## Challenged defaults

### CD-2: Dedicated MCP gateway vs extending the API management layer

**Verdict: conditional, converging.** Default for enterprises with mature API management: extend the incumbent, because the 2026-07-28 spec was deliberately redesigned to be routable and authorizable by ordinary HTTP gateways, and every major incumbent shipped MCP capability within a year (Kong 3.12, Apigee, AWS AgentCore Gateway and API Gateway native proxy, Azure APIM with API Center as private registry, WSO2, Tyk). Choose a dedicated gateway when you need agent-specific controls the incumbents don't yet model well (tool-description diffing and poisoning scans, multi-runtime federation, elicitation mediation), with neutral-governance open source (agentgateway under the Linux Foundation, IBM ContextForge, Cloudflare Portals) lowering the risk. Either way, the gateway is the enforcement point for the arriving auth standards (EMA/XAA, ID-JAG); a product choice does not substitute for the standards. Re-verify quarterly: this market is converging fast, and the widely repeated claim that 75% of API gateway vendors will ship MCP features by end-2026 could not be traced to a primary source.

### CD-3: RPA estate: replace vs coexist

**Verdict: coexist, supervised; replacement is earned per workload.** The market still grew 18% in 2024; only about 4% of the largest vendor's customers were building agent workflows in 2025; and Gartner predicts over 40% of agentic projects canceled by end-2027. The stable pattern: bots remain the deterministic execution layer for API-less systems, agents add reasoning and exception handling above them, and individual bot workloads migrate to governed APIs plus agents when the economics and reliability case is proven. The RPA vendors' own agentic pivots (UiPath, Automation Anywhere) confirm the direction without justifying a rip-and-replace.

### CD-4: Agent-to-agent protocols now vs plain APIs until standards settle

**Verdict: not yet, for most.** The standards story went right: consolidation (ACP merged into A2A), neutral governance (Linux Foundation, Jun 2025), a stable v1.0 (Mar 2026), 150+ member organizations. What's missing is usage: the published milestones are organization counts, and independent analysis finds production evidence anecdotal, while teams approximate coordination with MCP primitives. Adopt A2A selectively where cross-organization agent federation is a real, present requirement; otherwise treat inter-agent calls as ordinary governed APIs and revisit when production metrics exist. The one vendor survey claiming 40% A2A usage is self-reported and far above observable evidence [vendor].

### CD-5: Legacy ESB: modernize first vs bypass

**Verdict: strangle, don't wait; but govern before you wrap.** Modernization-first fails the base rate (74% of programs fail to complete, and total cost runs multiples of estimates), and the mainframe core is not leaving on agent timelines. The tool layer makes bypass cheap: incumbent gateways expose existing governed APIs as agent tools with zero backend change. The discipline that keeps this from amplifying debt: govern the specific API paths agents will use before exposing them (86% of IT leaders say agents add complexity without proper integration [vendor]; NSA warns that automation over brittle interfaces raises blast radius), and let each strangler increment retire real load rather than adding a parallel estate.

---

## Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | ID2 identity floor; OAuth token exchange and on-behalf-of; EMA/XAA and ID-JAG enforced at the gateway; per-tool RBAC; credentials injected at execution, never held by agents |
| C2 | Observability | Gateway emits per-tool-call traces (caller, tool, decision, latency, tokens); shadow-server discovery telemetry |
| C3 | Traceability & audit | Action-granular, SIEM-bound audit at the gateway; description-version history; who-approved-what for gated actions |
| C4 | Grounding in reality | Tool results are the grounding source: schema quality, provenance tagging, freshness of exposed data |
| C5 | Impersonation & authenticity | Server identity verification against the allowlist; registry is not trust; signed/pinned server versions; agent identity asserted end-to-end via token exchange |
| C6 | Data sovereignty & residency | Classification-based routing at the gateway; server and hosting locality part of the sovereignty surface |
| C7 | Data privacy | Minimization at the tool schema; DLP on tool results; consent context propagated with the caller identity |
| C8 | Safety & human oversight | Read-only defaults; destructive-hint gating; elicitation/MRTR approval flows; kill switch at the gateway |
| C9 | Cost accountability | Per-tool and per-agent metering at the gateway; rate limits as budget controls; retry-storm alerts |
| C10 | Resilience & continuity | Timeouts, circuit breakers, idempotent retries with receipts; graceful degradation to human queues when tools fail |

## Open questions and contested points

- Independent (non-vendor) quantification of event-backbone underuse: none found; revisit when neutral data appears.
- The "75% of API gateway vendors" projection: unverified; excluded from publishable claims.
- Whether EMA/XAA becomes the de facto enterprise auth pattern or fragments: watch through late 2026.
