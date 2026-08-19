# R07 Agent Platform: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| LangGraph / LangChain, OpenAI Agents SDK, Claude Agent SDK, Google ADK, CrewAI, Pydantic AI | Frameworks | Active | Roughly 18% of instrumented organisations use any recognised framework |
| Microsoft Agent Framework | Framework (consolidated) | 1.0 GA Apr 2026, surface still moving through Jul 2026 | Merged two predecessors; churn is the cost of buying in [vendor] |
| Bedrock AgentCore, Vertex Agent Engine, Azure AI Foundry Agent Service | Managed runtimes | GA | Explicitly framework-agnostic; the runtime is becoming the portable substrate [vendor] |
| Temporal, Restate, DBOS, Inngest | Durable execution | Production | Checkpoints preserve data, not execution; a run in one process dies with it [vendor] |
| Agent Skills (open format) | Capability packaging | Cross-vendor adoption through 2026 | The one artifact that genuinely ports; distribution and admin management still unsolved |
| A2A | Inter-agent protocol | v1.0 stable, 150+ organisations | Landed in major platforms; production evidence still thin |

Agent-washing watch: orchestration you cannot inspect; "autonomous" claims with no published termination conditions; skill marketplaces whose listings are single-version and unmaintained.

---
