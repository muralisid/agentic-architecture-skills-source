---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for security and identity to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Security and identity lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for security and identity."
prerequisites: ["/docs/layers/r10-security-and-identity/brief"]
reading_time: "8 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r10-security-and-identity/vendors"
---

# R10 Security & Identity: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Enterprise security meets agents unprepared on identity and over-instrumented on everything else. Non-human identities already outnumber humans roughly 100:1 and 97% carry excessive privileges [vendor surveys], yet only 23% of organizations have a formal agent identity strategy and 92% doubt legacy IAM can manage the risk (CSA/Oasis, Jan 2026 [sponsored]). Sharing human credentials with agents remains common practice. Meanwhile the SOC has telemetry pipelines, SIEM, and incident discipline, but no baselines for what normal agent behavior looks like.

### 2. What changes with agents

The threat landscape acquired its own canon in a single year: OWASP's Top 10 for Agentic Applications (Dec 2025: goal hijack, tool misuse, identity and privilege abuse, supply chain, unexpected code execution, memory poisoning, insecure inter-agent communication, cascading failures, human-trust exploitation, rogue agents); MITRE ATLAS grew fourteen agent-focused techniques (Oct 2025) on its way to 84 techniques and 42 case studies; Microsoft's failure-mode taxonomy v2 (Jun 2026) counts 99 MCP-related CVEs in 2025 alone; and six national cyber agencies published joint adoption guidance naming five risk categories on May 1, 2026. Identity becomes the perimeter: every control in this track hangs off the agent having a first-class, least-privileged, short-lived identity.

### 3. Introduction options and sequencing

Identity first: register every agent with an owner and risk tier (ID2 floor), eliminate shared credentials, adopt just-in-time elevation over a minimal baseline with automatic drop-back (the published least-privilege pattern for agents). Then wire agent telemetry into the SIEM and rebuild the runbooks (see 7). Guardrails and content filters come last, as an advisory layer, never as the boundary.

### 4. Economics

Security capability is arriving inside platforms enterprises already own: six AI-security acquisitions by platform vendors in roughly fourteen months (Cisco/Robust Intelligence; Palo Alto/Protect AI; SentinelOne/Prompt Security; F5/CalypsoAI; CrowdStrike/Pangea; Check Point/Lakera) plus two non-human-identity deals (Cisco/Astrix ~$400M; Cyera/Oasis ~$1B). The buy-side consequence: price standalone AI-security tooling against the capability your incumbent platform will ship next quarter. Deterministic gates are also the cheap option at runtime: policy-engine evaluation costs sub-millisecond to low-millisecond versus roughly 1.5 seconds for LLM-based guardrail calls.

### 5. Learning

Detection content is the layer's flywheel: agent-incident learnings become new ATLAS-mapped detections, updated runbooks, and tightened policy-as-code, promoted through the same governed path as any rule change. Guardrail thresholds are tuned against measured false-positive cost, which is real (0% bypass was achieved in one study only at a 16% false-positive rate).

### 6. Risk and groundedness

The reference incidents: EchoLeak (CVE-2025-32711, CVSS 9.3), a zero-click exfiltration through a Copilot-attached mailbox; in-the-wild indirect prompt injection documented by Unit 42; supply-chain compromise of agent tooling. The structural finding behind them (Bhattarai and Vu, Feb 2026): token-uniform processing means command/data separation cannot be achieved by training alone; without architectural mediation, authorization becomes an exploit-discovery problem.

### 7. Security and determinism: models may inform, never decide

This track carries the guide's deterministic-boundary principle in its final, evidence-hardened form. **Decisions in the four zones (access control, money movement, safety actuation, regulatory records) are made by deterministic rules over verifiable credentials and policies; model outputs are advisory inputs.** Three of the four zones already run probabilistic signals inside them, and that is fine: identity platforms feed ML risk scores into deterministic Conditional Access; card networks score every transaction with ML while authorization stays rule-bound; filings are drafted with AI and attested deterministically. The convergent proof is the 2025-2026 agentic payment stack, built independently by Visa (Trusted Agent Protocol: issuer-anchored delegation tokens scoped by amount, merchant, category), Mastercard (Agent Pay: agentic tokens bound to agent, merchant, and consent, revocable in real time), and Google with 60+ partners (AP2: cryptographically signed Verifiable Credential mandates carrying hard constraints): all are deterministic authorization consuming probabilistic signals. Safety actuation is the one zone where standards exclude ML from the function itself (IEC 61511; ISO/IEC TR 5469:2024). Records regimes mandate accountability and retained communications, not deterministic generation. FINRA 24-09 says existing technology-neutral obligations continue to apply and creates no new interpretation; FINRA 25-07, published April 14, 2025, asks for comment on AI-generated communication and recordkeeping rather than settling a new interpretation. ESMA 2024 and the Deloitte Australia refund supply adjacent evidence.

Two implementation consequences. First, the authorization boundary is policy-as-code in the tool-call path: a policy decision point (Cedar-class sub-millisecond engines, formally verified; OPA/Rego for richer joins) the agent cannot bypass, complemented where warranted by deterministic information-flow control (Microsoft's FIDES shipped in Agent Framework: zero policy-violating injections on AgentDojo versus 20-152 without) and formal output verification (Bedrock Automated Reasoning checks, GA Aug 2025 [vendor]). Second, probabilistic guardrails are the advisory layer, not the boundary: measured evasion reaches 72-77% against major commercial guardrails and up to 100% in some configurations, and guardrail-triggered denial of service is itself exploitable. They retain real value for content policy, PII detection, and telemetry, where misses are tolerable.

One caveat the guide states plainly: deterministic authorization does not protect intent formation. Google's AP2 was red-teamed via prompt injection operating *within* mandate bounds. The gate bounds the blast radius; upstream injection defense and human confirmation of intent remain necessary.

### 8. Sovereignty

Agent credentials, tokens, and security telemetry carry residency obligations like any data; identity-provider and policy-engine locality join the sovereignty surface established in R01/R03.

### 9. Vendor landscape

Summary; map below. Camps: identity incumbents shipping agent identity (all four majors GA'd within twelve months), NHI specialists being acquired, AIDR capability consolidating into SOC platforms, guardrail products (several now inside security platforms), and policy-engine infrastructure.

### 10. Target state

Every agent holds a registered, least-privileged, short-lived identity with a named owner and risk tier; presence-grade capability (mailbox, meeting seat, directory visibility) is granted per capability surface to a small set of durable teammates whose Sponsors accept the discoverability and phishing surface; all consequential actions pass a deterministic policy decision point; probabilistic detection feeds the SOC through the SIEM with agent-specific runbooks; the four zones stay deterministic at the decision.

### 11. Migration path

Inventory and register agents; kill shared credentials; JIT least privilege; SIEM ingestion and runbook rebuild; policy-as-code at the tool path (with R03's gateway as the enforcement point); guardrails as advisory; capability-surface review for anything approaching presence. Stop buying: standalone AI-security point tools without checking the incumbent platform's roadmap; guardrail products positioned as the security boundary.

### 12. Metrics

Agent identity coverage (no shared credentials); percentage of consequential actions behind a deterministic PDP; time-to-revoke an agent credential; agent-specific SOC detections and mean time to respond; guardrail false-positive cost; presence-surface inventory (which agents hold which ID3 capabilities and why).

### 13. Data readiness and curation

Detection content, policy-as-code, and runbooks are curated corpora with owners, like any other; reasoning traces and mandate logs become evidence artifacts with retention obligations (handled in R11).

### Challenged defaults

**CD-13: SIEM extension vs dedicated AI-security platforms. Verdict: the market is resolving it toward platform absorption; buy accordingly, but do not mistake absorption for parity.** Six platform acquisitions in fourteen months mean AIDR-class capability is arriving inside SOC platforms enterprises already run, which supports the SOC-extension organizational design. The honest gap: as of mid-2026, behavioral baselining of agents remains unsolved in mainstream SIEMs (RSAC 2026 reporting; headline-verified), and Gartner maintains guardian agents as a distinct runtime category (10-15% of the agentic market by 2030). Independents differentiate on agent-graph posture and research depth (the ATLAS agent techniques were co-authored by a specialist). Re-verify quarterly; this is the fastest-consolidating market in the guide.

**CD-16: Standalone guardrail engines vs platform-native guardrails plus deterministic gates. Verdict: deterministic gates own the authorization boundary; guardrails are an advisory layer wherever they run.** The bypass evidence is decisive (72-100% evasion in published measurement; 0% bypass achieved only at 16% false positives and 1.5s latency), the deterministic alternative is faster by three orders of magnitude, and the platform-native trend is itself converging on determinism (formal-logic output verification, information-flow control). Choose guardrail products for content policy and PII coverage across models, platform-native ones where the platform already hosts the workload, and never let either be the thing that authorizes an action.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | The track's core: registered first-class agent identities, JIT least privilege, short-lived credentials, deterministic PDP on every consequential action |
| C2 | Observability | Agent security telemetry to SIEM; behavioral baselining flagged as open gap |
| C3 | Traceability & audit | Policy decisions, mandate logs, and reasoning traces as first-class evidence; tamper-evident retention |
| C4 | Grounding in reality | Detection content mapped to ATLAS/OWASP; threat intel currency |
| C5 | Impersonation & authenticity | Agent identity attestation; anti-spoofing for agent-to-human communication (ASI09 human-trust exploitation) |
| C6 | Data sovereignty & residency | Credential, token, and telemetry residency; IdP and policy-engine locality |
| C7 | Data privacy | Minimization in security telemetry; privacy of humans in agent traces |
| C8 | Safety & human oversight | The four deterministic zones; intent confirmation for consequential actions; kill switch integration |
| C9 | Cost accountability | Platform-absorption pricing test for tooling; guardrail FP cost measured |
| C10 | Resilience & continuity | Credential revocation drills; degraded mode when policy engines fail (fail-close) |

### Open questions

- SIEM behavioral baselining for agents: unsolved; re-check post-RSAC 2027.

---
