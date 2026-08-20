---
reader_summary: "Compare the integration fabric vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","Integration architecture lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for the integration fabric; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r03-integration-fabric/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "4 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r03-integration-fabric/sources"
---

# R03 Integration Fabric: vendor map

As of 2026-08-19. All vendor capability claims are vendor-published unless a third-party source appears in sources.md. Maturity states carry dates; this layer converges fast, re-verify quarterly.

## Categories at this layer

1. **Dedicated MCP gateways**: purpose-built proxies for agent tool traffic (allowlisting, credential injection, tool-description integrity, elicitation mediation, audit).
2. **API management incumbents with MCP capability**: existing gateways extended to route, authorize, and auto-generate MCP tools from managed APIs.
3. **iPaaS platforms pivoting agentic**: connector estates repositioned as agent tool catalogs.
4. **RPA platforms pivoting agentic**: bot estates gaining reasoning layers.
5. **Event streaming platforms**: the trigger fabric for ambient agents.
6. **Inter-agent protocol infrastructure**: A2A implementations and agent discovery/identity projects.

## Vendor map

| Vendor / product | Category | Embedded or independent | Maturity (as of Aug 2026) | Notes |
|---|---|---|---|---|
| agentgateway (Solo.io origin) | Dedicated MCP+A2A gateway | Independent, Linux Foundation since Aug 25 2025 | OSS, active | Neutral governance is the differentiator |
| IBM ContextForge | Dedicated MCP gateway | Independent OSS (IBM) | OSS, active | Federates MCP, A2A, REST-to-MCP on Kubernetes |
| Cloudflare MCP Server Portals | Dedicated gateway (SaaS) | Independent | Open beta since Aug 26 2025 | Zero Trust policy over all MCP traffic |
| Lasso Security, TrueFoundry, MintMCP, Lunar.dev MCPX, Obot, Composio | Dedicated gateways (commercial) | Independent | Varied; mostly 2025 entrants | Security-enforcement and catalog features vary widely; assess against the gateway feature consensus (allowlist, credential injection, inspection, audit) |
| Docker MCP Gateway/Toolkit; Microsoft MCP Gateway (OSS) | Dedicated gateways | Independent OSS | Developer-oriented | Not enterprise control planes by themselves |
| Kong (Konnect MCP, Gateway 3.12 MCP + OAuth 2.1 plugin) | APIM incumbent | Independent | Shipped Oct 2025 | Auto-generates MCP servers from managed APIs |
| Google Apigee | APIM incumbent | Independent (GCP) | Shipped 2025; managed MCP servers for Google services Dec 2025 | Exposes Apigee-governed APIs as tools via API hub |
| AWS (Bedrock AgentCore Gateway; API Gateway native MCP proxy) | APIM incumbent + agent platform | Embedded in AWS | AgentCore Gateway GA Oct 2025; API GW proxy Dec 2025 | Turns APIs/Lambda into MCP tools with inbound/outbound authorization |
| Microsoft (Azure API Management MCP; API Center private registry) | APIM incumbent | Embedded in Azure | Public preview May 2025 | Private registry pattern worth copying regardless of stack |
| WSO2, Tyk, Traefik, Zuplo | APIM incumbents | Independent | Shipping or positioning 2025-2026 | WSO2 auto-generates MCP servers from OpenAPI |
| MuleSoft (Salesforce) | iPaaS pivoting agentic | Embedded (Salesforce gravity) | Agentic messaging through 2026 | Its surveys are load-bearing marketing; flag numbers [vendor] |
| Boomi, Informatica, Workato | iPaaS pivoting agentic | Independent/embedded varies | 2025-2026 agentic features | Connector estates as tool catalogs; governance depth varies |
| UiPath (agentic automation platform) | RPA pivoting agentic | Independent | Launched Apr 2025; ~450 customers building agents in 2025 [vendor] | 10,800+ customer estate is the coexistence base |
| Automation Anywhere (Process Reasoning Engine) | RPA pivoting agentic | Independent | 2025 | Same pattern: reasoning over deterministic bots |
| Confluent (Kafka), Solace, Redpanda | Event streaming | Independent | Mature | The trigger fabric; maturity of enterprise EDA practice lags installation |
| A2A implementations (Google, Microsoft, AWS platform integrations); AGNTCY (Cisco origin, LF) | Inter-agent infrastructure | Mixed | A2A v1.0 Mar 2026; adoption evidence thin | See CD-4: defer broad adoption to demand |

## Agent-washing watch

- "MCP support" without an authentication story (no OAuth resource-server behavior, no token exchange): treat as a demo, not a capability.
- Connector catalogs relabeled as "agent tools" with no per-tool authorization or audit.
- Orchestration products marketed as agents; Gartner estimates only ~130 of thousands of self-described agentic vendors are real (Jun 2025).

## What rolls up to Phase 7

This layer contributes the clearest convergence story for the vendor-by-layer matrix: incumbents absorbed the new protocol within a year, so the buy decision is mostly "extend what you govern" vs "add a specialized enforcement point", not a new platform bet. Lock-in surfaces to track: private tool catalogs and their metadata, gateway policy configuration, and per-vendor auth extensions ahead of the standards.
