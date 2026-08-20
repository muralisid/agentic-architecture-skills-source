---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for infrastructure and compute to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Infrastructure and platform lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for infrastructure and compute."
prerequisites: ["/docs/layers/r01-infrastructure/brief"]
reading_time: "8 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r01-infrastructure/vendors"
---

# R01 Infrastructure & Compute: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Enterprise infrastructure meets agents with cloud landing zones, Kubernetes estates that are less industrial than claimed (over half of surveyed platform teams admit clusters are manual snowflakes; Spectro Cloud 2025 [vendor]), and no agent-specific provisions: no egress control for autonomous processes, no workload identity for agents (only 23% of organizations have a formal agent identity strategy; CSA 2025), no isolation tier for machine-driven execution.

### 2. What changes with agents

Three new infrastructure classes appear: **execution sandboxes** (isolated, ephemeral environments where agents run code, browse, and use computers), **durable session infrastructure** (agents are long-running, interruptible processes whose state must survive crashes and pauses), and **egress-controlled networking** (autonomous processes need allowlisted, proxied paths to the world). The orchestration workload itself has a distinctive profile: bursty, I/O-bound, idle 30 to 70% of wall-clock waiting on model and tool calls, which upends conventional capacity thinking.

### 3. Introduction options and sequencing

Start on managed runtimes for orchestration (they arrive with per-session isolation and idle-friendly billing); adopt sandbox capability the day the first act-capable agent ships, not later; put egress control in place before autonomy expands; introduce self-hosted serving only when a sovereignty classification demands it (see CD-6). Kubernetes enters where it already lives: self-hosted model serving and multi-environment portability.

### 4. Economics

The orchestration layer's cost levers are idle-time economics: consumption billing that charges nothing during I/O wait (AgentCore pricing model [vendor]) and hibernation of idle agents (Cloudflare Durable Objects [vendor]). The serving layer's lever is utilization: self-hosting only beats metered APIs at roughly 100-250M+ tokens per month sustained per workload against frontier APIs, at 60%+ utilization, with honest 1.3-2x operations multipliers; against budget open-weight APIs the break-even recedes to billions of tokens per month (four consistent practitioner analyses, 2025-2026; none peer-reviewed; at 10% utilization cost per token rises roughly 10x). Cold starts stopped being the objection: GPU memory snapshots cut cold starts about 10x (vendor benchmarks), and serverless GPU instances start in seconds (Cloud Run GPUs GA Jun 2025 [vendor]), making scale-to-zero viable for bursty agent work. GPU market note (mid-2026): Hopper-class capacity is cheap and abundant (reserved H100 bottomed at $1.70/GPU-hr in Oct 2025, rebounding ~40% by Mar 2026; SemiAnalysis), Blackwell-class is scarce and reserved; the assumption that compute always gets cheaper is not safe for the newest silicon.

### 5. Learning

Infrastructure telemetry (session traces, sandbox events, egress logs) feeds the flywheel; the layer itself learns through capacity models per agent class and through promotion of proven session patterns into templates. Snapshot/restore infrastructure is also what makes eval-replay cheap.

### 6. Risk and groundedness

The incident record defines the risks: an agent deleted a production database during an explicit code freeze (Replit, Jul 2025); a compromised IDE extension carried a data-wiping prompt to ~950K installs (Amazon Q, Jul 2025); frontier models exploit container weaknesses when present (SANDBOXESCAPEBENCH, arXiv 2603.02277: plain containers are an insufficient boundary). Controls: environment separation (dev/prod isolation for agents as hard policy), microVM-class isolation for act-capable work, snapshots as the undo button, and blast-radius design before capability grants.

### 7. Security and determinism

**Sandboxes: gate on capability set, not product category.** Act-capable agents (code execution, browsing, computer use) require microVM/gVisor/Hyper-V-class isolation; this is now industry consensus (per-session microVMs in Bedrock AgentCore GA Oct 2025 [vendor]; Hyper-V-isolated Azure dynamic sessions with egress off by default [vendor]; OpenAI's per-session virtual computer [vendor]; Anthropic's open-sourced sandbox runtime with proxy-enforced domain allowlists [vendor]; OWASP Agentic Top 10 Dec 2025; the CNCF Agent Sandbox project, not yet production-ready). Chat-and-retrieve agents do not need compute sandboxes, but they are not exempt from controls: the marquee 2025 exploit (EchoLeak, CVE-2025-32711, CVSS 9.3) was a zero-click exfiltration from a retrieval agent, entirely in natural-language space; the decisive controls there are egress restriction, output sanitization, and data boundaries. And because agents accrete tools over time, gate on the capability combination (the lethal-trifecta / Rule-of-Two frame: private data, untrusted content, external communication or state change), re-evaluated on every tool grant.

**Networking**: all sandbox and agent egress through allowlisting proxies; block cloud metadata endpoints and private ranges from sandboxes (Unit 42 guidance); private connectivity to model providers exists on all hyperscalers (PrivateLink-class) but is opt-in, never default.

**Workload identity**: agents need first-class compute identity: directory-based (Entra Agent ID class), standards-track (IETF WIMSE architecture covers AI agents; SPIFFE in production for agents at Block), and OAuth-extension based (Cross App Access, adopted as MCP's Enterprise Managed Authorization). ID2 is the floor; shared human credentials for agents, still common, are the ID1 anti-pattern.

### 8. Sovereignty

The 2025-2026 shift: sovereignty demands are increasingly met *without* self-hosting. Air-gapped managed AI is real (Gemini GA on Google Distributed Cloud air-gapped, Aug 2025, authorized to US Secret/Top Secret [vendor]); sovereign regions run managed model services under local control (AWS European Sovereign Cloud GA Jan 2026 with Bedrock [vendor]); Gartner projects most European and Middle East enterprises geopatriating workloads by 2030. True self-hosting is justified by air-gap and classification levels, not generic residency.

### 9. Vendor landscape

Summary here; the map is in the vendors section. Camps: managed agent runtimes (hyperscalers plus edge platforms), sandbox specialists, durable-execution engines, Kubernetes-native serving (standardizing fast under CNCF), and workload-identity providers.

### 10. Target state

Agents run on managed or platform-provided runtimes with per-session isolation; act-capable work executes in microVM-class sandboxes behind egress proxies; every agent holds a first-class workload identity; sessions are event-logged and resumable; model access is metered by default, routed to sovereign or self-hosted serving only by data classification; capacity and cost are managed per agent class with idle-time economics.

### 11. Migration path

Adopt a managed runtime for the first production agents; stand up sandbox capability with the first act-capable agent; enforce egress allowlists before expanding autonomy; introduce workload identity with the identity program (R10); revisit self-hosting only on sovereignty triggers. Stop buying: GPU capacity ahead of a proven sustained workload; bespoke agent hosting where a managed runtime suffices.

### 12. Metrics

Percentage of act-capable agents in isolated sandboxes; egress-allowlist coverage; sessions resumable after crash (tested); agent identity coverage (no shared credentials); orchestration cost per session and idle-time share; serving utilization where self-hosted.

### 13. Data readiness and curation

This layer contributes session event logs and sandbox artifacts to grounding and audit; their retention, redaction, and provenance follow the same governance as any agent memory.

### Challenged defaults

**CD-6: Self-hosted GPU estates vs metered APIs. Verdict: metered by default, with the correction that the cost path is open-weight via metered APIs, not self-hosting.** The market moved: open-weight models now lag the frontier by only ~4 months (Epoch AI, May 2026) and are available at budget API prices that push self-hosting break-evens to billions of tokens per month. Enterprises still run 81% of LLM workloads on closed models (Menlo Dec 2025 [VC]), and control, not cost, is their stated reason for going open. Self-hosting earns its place for air-gap and classification requirements, and rarely on cost alone: below roughly 100-250M sustained tokens per month per workload, or below 60% utilization, the numbers do not close. The Airbnb counter-example (public commitment to Qwen for cost and speed, Oct 2025) marks the boundary: at hyperscale consumer volume, cost-driven open-weight adoption is real, via APIs.

**CD-7: Kubernetes-everywhere vs managed agent runtimes. Verdict: split by layer.** Model serving is where Kubernetes standardized (Dynamic Resource Allocation GA in v1.34; llm-d donated to CNCF Mar 2026; the CNCF AI Conformance program), and it matters only if you self-host models at all. Agent orchestration fits managed runtimes: per-session isolation is native, billing matches the idle-heavy profile, and Kubernetes needed a new project just to match the isolation primitive (Agent Sandbox, not yet production-ready). Choose Kubernetes for orchestration only with existing platform engineering strength and genuine multi-environment portability needs; note the lock-in symmetry: managed runtimes are proprietary control planes, and the portability camp sells its own ecosystem.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | First-class workload identity per agent (directory, WIMSE/SPIFFE, or OAuth-extension based); no shared human credentials; ID2 floor |
| C2 | Observability | Session traces, sandbox lifecycle events, egress logs; idle-time and utilization telemetry |
| C3 | Traceability & audit | Event-logged sessions; sandbox snapshots as forensic artifacts; egress decisions logged |
| C4 | Grounding in reality | Sandbox and session artifacts carry provenance for anything promoted to grounding |
| C5 | Impersonation & authenticity | Workload identity attestation (WIMSE-class); no ambient credentials in sandboxes |
| C6 | Data sovereignty & residency | Classification-routed serving (managed, sovereign region, air-gapped); sandbox and session data residency explicit |
| C7 | Data privacy | Session memory sanitization on termination (microVM pattern); redaction in session logs |
| C8 | Safety & human oversight | Environment separation as hard policy; capability-set gating; kill switch at runtime level |
| C9 | Cost accountability | Per-session cost, idle-share, and utilization metrics; budget caps at the runtime |
| C10 | Resilience & continuity | Durable, resumable sessions (event log or durable-execution engine); snapshot/restore; degraded-mode to human queues |

### Open questions

- Kubernetes Agent Sandbox production readiness: re-check Q4 2026.
- Peer-reviewed unit economics for self-hosting: none found; ranges published with caveats.

---
