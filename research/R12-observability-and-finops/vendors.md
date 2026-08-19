# R12 Observability & FinOps: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Datadog (LLM Observability, AI Agents Console), New Relic, Dynatrace (+Arize pending), Grafana, Elastic | APM with GenAI | Console preview Jun 2025; Arize deal announced Aug 13 2026 | Infra correlation; check GA states [vendor] |
| LangSmith (LangChain), Braintrust | Independent specialists | $125M at $1.25B (Oct 2025); $80M at $800M (Feb 2026) | Eval-loop depth; proprietary SDKs |
| Langfuse (ClickHouse) | OSS observability | Acquired Jan 2026; MIT retained; 19 of Fortune 50 used it | The self-hosting path |
| Arize Phoenix, W&B Weave (CoreWeave), Galileo (Splunk) | Absorbed specialists | 2025-2026 acquisitions | Watch OSS project fates |
| OpenTelemetry GenAI conventions | Standards | NOT stable; new repo, no release (mid-2026) | Instrument with a translation layer |
| FinOps Foundation (FOCUS 1.3, FinOps for AI), Tokenomics Foundation | FinOps standards | FOCUS split-cost allocation; token normalization forming | The metering vocabulary |
| AgentCore harness caps, LiteLLM budgets, Copilot/Agentforce billing policies and wallets | Budget enforcement | Shipped 2025-2026 | Deterministic caps; per-agent metering [vendor] |
| Intercom Fin, Zendesk, Sierra | Outcome-priced agents | List prices live | The cost-per-outcome anchors [vendor] |

Agent-washing watch: "AI observability" that renders token counts without eval integration; cost dashboards that cannot attribute to an agent or answer why spend doubled overnight; fabricated funding news from AI content farms (one instance caught and excluded during this research).

---
