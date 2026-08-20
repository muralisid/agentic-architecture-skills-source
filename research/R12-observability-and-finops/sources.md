---
reader_summary: "Verify the dated evidence behind the observability and FinOps findings and identify claims that need re-verification."
audience: ["Enterprise architect","Operations and FinOps lead","Research and assurance lead"]
decision_or_output: "Confirm which observability and FinOps claims are current and strong enough to support the decision."
prerequisites: ["/docs/layers/r12-observability-and-finops/findings"]
reading_time: "2 minutes"
evidence_status: "Dated source register with vendor-published material identified where applicable."
next: "/docs/layers/r13-operating-model"
---

# R12 Observability & FinOps: sources

All accessed 2026-08-19. [vendor] marks vendor-published claims about the publisher's own market.

OTel: agent-observability blog (Mar 2025), GenAI follow-up (2026), semantic-conventions-genai repo state (Jun-Jul 2026); FinOps Foundation: FinOps for AI (updated Feb 17 2026), State of FinOps 2026, FOCUS 1.3; Tokenomics Foundation (CIO coverage); Harness State of AI in FinOps 2026 [vendor]; Datadog State of AI Engineering 2026 [vendor telemetry]; Entra sponsor roles (Microsoft Learn) [vendor]; Workday ASOR (Feb 2025 announce; GA Feb 2026) [vendor]; Agent 365 billing policies (Nov 18 2025) [vendor]; Agentforce Flex Credits (May 15 2025) + Digital Wallet [vendor]; consolidation: Dynatrace-Arize (Aug 13 2026), ClickHouse-Langfuse (Jan 16 2026), Cisco-Galileo (Apr-May 2026), CoreWeave-W&B (2025), OpenAI-Statsig (Sep 2 2025), LangChain Series B (Oct 20 2025), Braintrust Series B (Feb 17 2026); judge reliability: arXiv 2606.19544 (Jun 2026), arXiv 2508.06225 (Aug 2025), GoDaddy calibration (Nov 24 2025); rollout discipline: arXiv 2606.08867 (100M-user framework, Jun 2026), canary pattern catalogs; Bedrock Guardrails CloudWatch metrics [vendor]; AgentCore harness caps and pricing [vendor]; LiteLLM budget docs [vendor OSS]; incidents: OpenClaw $1.3M (self-reported, May 2026, medium confidence), $47K A2A loop (vendor blog, LOW confidence); outcome pricing: Intercom, Zendesk [vendor]; two-estate: Microsoft Graph Copilot usage APIs GA (Oct 2025) with documented gaps, Anthropic Admin Usage & Cost + Enterprise Analytics APIs [vendor].
Excluded: fabricated Langfuse funding story (content-farm; on the do-not-cite list). Re-verify by Q4 2026: OTel stability; Dynatrace-Arize close and Phoenix fate; Workday budgeting depth; vendor GA states.
