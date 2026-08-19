# Category Profile: Gateways, Identity and Access

As of August 2026. The independent layer between your agents and everything they touch. Vendor-published facts flagged.

---

## The categories

**MCP gateways.** Purpose-built proxies for agent tool traffic: allowlisting, credential injection, tool-description integrity, elicitation mediation, audit.

**API management incumbents with MCP capability.** Existing gateways extended to route, authorise and auto-generate MCP tools from managed APIs.

**LLM gateways.** A different product governing model calls: routing, caching, budgets. Frequently confused with the above, and the confusion is expensive.

**Agent identity and access.** Okta for AI Agents (GA 29 April 2026), CyberArk Secure AI Agents (GA November 2025, zero standing privilege for agents), SailPoint Agentic Fabric (May 2026), plus a consolidating field of non-human identity specialists [all vendor].

## The contested choice, and the guide's verdict

**Buy a dedicated MCP gateway, or extend the API management platform you already run?**

The verdict from R03 is **extend the incumbent by default, buy dedicated conditionally**. The gateway-first principle is carried by the incident record: an ungoverned tool layer is where agent security failures concentrate. What is not carried by the evidence is that you need a new product to get one. If you already run API management, the extension path lands the pattern on an investment that already has your identity integration, your audit pipeline and your operational practice.

Buy dedicated when the incumbent cannot enforce the arriving standards, when tool-description integrity and elicitation mediation are unavailable, or when your agent traffic is genuinely separable from your API estate.

## How the categories answer the bank

**A3, A4, A6.** This layer is where token exchange and on-behalf-of actually happen, so it holds the best answers to the delegation-chain questions. Credentials injected at execution and never held by the agent is the pattern to require.

**B2, B4.** The gateway is the enforcement point that makes an approval rule a control rather than a preference, and it is one of the multiple kill-switch locations. If a vendor's approval story does not name an enforcement point outside the model, this is the layer that supplies one.

**A1, A2.** The identity specialists supply first-class agent identities, human owners, short-lived tokens and kill switches [vendor]. Zero standing privilege for agents is the strongest available answer to A6.

## Watchouts

- **The gateway layer is itself attackable.** Concentrating tool traffic creates a target, and the research flags this explicitly rather than treating the gateway as a solved control.
- **Registry listing is not trust.** Server allowlists, signed and version-pinned servers, and shadow-server discovery are separate disciplines from having a gateway.
- **Consolidation is active.** The non-human identity specialists have raised over $340M combined, with two acquired at roughly $400M and $1B. A best-of-breed choice here is a bet on independence or on a favourable acquisition.
- **Behavioural baselining for agents in the SOC is unsolved.** No vendor in this category has an answer, and any that claims one deserves the strongest form of the E-section questioning.

## Sources

research/R03-integration-fabric/ and research/R10-security-and-identity/ vendors.md and sources.md.
