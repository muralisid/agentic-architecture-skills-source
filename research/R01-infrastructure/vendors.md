# R01 Infrastructure & Compute: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| AWS Bedrock AgentCore (Runtime, Gateway, Identity, Memory) | Managed agent runtime | GA Oct 13 2025 | Per-session microVMs, 8h sessions, no CPU charge on I/O wait; VPC/PrivateLink |
| Azure AI Foundry Agent Service + Container Apps dynamic sessions | Managed runtime + sandboxes | Agent Service GA May 2025; sessions GA 2024 | Hyper-V isolation; egress off by default |
| Google Vertex AI Agent Engine | Managed runtime | GA billing from Mar 2025 | Memory Bank preview Jul 2025 |
| Cloudflare Agents SDK on Durable Objects | Edge agent runtime | 2025 | Stateful agent-per-object, hibernation, free idle |
| E2B, Daytona, Modal | Sandbox specialists | 2025 Series A funding; production | Firecracker/gVisor classes; sub-90ms container starts (Daytona) |
| Anthropic sandbox-runtime (OSS) | Sandbox tooling | Open-sourced Oct 2025 | Proxy-enforced domain allowlists [vendor] |
| Kubernetes Agent Sandbox (CNCF) | K8s isolation primitive | Announced Nov 2025; not production-ready (Apr 2026) | gVisor with Kata support |
| Temporal, Restate, DBOS, Inngest | Durable execution | Temporal $300M Series D Feb 2026; OpenAI SDK integration | The checkpoint-vs-durable-execution distinction matters |
| llm-d (CNCF), vLLM, KServe | K8s-native serving | llm-d to CNCF Mar 2026; DRA GA in K8s 1.34 | Relevant only when self-hosting |
| Entra Agent ID; Okta XAA/EMA; SPIFFE/WIMSE | Workload identity | Entra preview May 2025; XAA 25+ ISVs Jun 2026; WIMSE to IESG Jul 2026 | Identity is the R10 join point |

Agent-washing watch: "agent infrastructure" that is a VM with a queue; sandbox claims without isolation class stated (container vs microVM); runtime pricing that bills idle wait.

---
