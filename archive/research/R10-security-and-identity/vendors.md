---
reader_summary: "Compare security and identity vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","Security and identity lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for security and identity; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r10-security-and-identity/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r10-security-and-identity/sources"
---

# R10 Security & Identity: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Microsoft Entra Agent ID + Agent 365 (Defender/Purview for Agents) | Identity + control plane | Agent ID preview May 2025; Agent 365 GA May 1 2026, $15/user/mo standalone | Per-user licensing removes the per-agent cost brake; sponsor role productized [vendor] |
| Okta for AI Agents | Identity | GA Apr 29 2026 | First-class identities, human owners, short-lived tokens, kill switch [vendor] |
| CyberArk Secure AI Agents | Privileged access | GA Nov 2025 | Zero standing privilege for agents [vendor] |
| SailPoint Agentic Fabric | Identity governance | May 2026 | Discover, govern, certify agent access [vendor] |
| Astrix (Cisco, pending), Oasis (Cyera), Entro, Clutch, GitGuardian | NHI specialists | Consolidating 2026 | $340M+ combined funding; two acquired at ~$400M and ~$1B |
| CrowdStrike (Pangea AIDR), Check Point (Lakera), Palo Alto (Protect AI), SentinelOne (Prompt Security), F5 (CalypsoAI), Cisco (Robust Intelligence) | AIDR inside platforms | Acquisitions 2024-2025, integration ongoing | The CD-13 absorption wave |
| Zenity, Noma, WitnessAI, TrojAI | Independent AI security | Funded through 2025-2026 | Differentiate on agent-graph/posture and research (ATLAS co-authorship) |
| NeMo Guardrails, Guardrails AI, Prompt Guard, Azure Prompt Shields, Bedrock Guardrails (+ Automated Reasoning checks GA Aug 2025) | Guardrails | Mature; bypass evidence published | Advisory layer, never the boundary |
| OPA/Rego, Cedar, OpenFGA/SpiceDB; Microsoft FIDES (Agent Framework) | Deterministic authorization | Production engines; FIDES shipped 2026 | The boundary; sub-ms evaluation |

Agent-washing watch: "AI firewall" claims resting on bypassable classifiers; agent-identity features that are relabeled service accounts without lifecycle, JIT, or revocation.

---
