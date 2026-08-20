---
reader_summary: "Verify the dated evidence behind the integration fabric findings and identify claims that need re-verification."
audience: ["Enterprise architect","Integration architecture lead","Research and assurance lead"]
decision_or_output: "Confirm which integration fabric claims are current and strong enough to support the decision."
prerequisites: ["/docs/layers/r03-integration-fabric/findings"]
reading_time: "3 minutes"
evidence_status: "Dated source register with vendor-published material identified where applicable."
next: "/docs/layers/r04-systems-of-record"
---

# R03 Integration Fabric: sources

All accessed 2026-08-19. [vendor] marks vendor-published claims about the publisher's own market.

## Primary anchors

- MCP specification 2026-07-28 and release post, MCP Blog, Jul 28 2026. https://blog.modelcontextprotocol.io/posts/2026-07-28/ ; changelog https://modelcontextprotocol.io/specification/2026-07-28/changelog
- MCP joins the Agentic AI Foundation (Linux Foundation), MCP Blog and Anthropic, Dec 9 2025. https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/
- MCP Registry (preview) about page. https://modelcontextprotocol.io/registry/about
- NSA CSI: MCP Security Design Considerations, May 20 2026 (PDF Jun 2 2026). https://media.defense.gov/2026/Jun/02/2003943289/-1/-1/0/CSI_MCP_SECURITY.PDF
- OWASP Top 10 for Agentic Applications 2026, Dec 9 2025. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ ; OWASP MCP Top 10 (beta) via mapping analysis, Equixly, Jun 4 2026. https://equixly.com/blog/2026/06/04/mapping-nsa-s-mcp-guidance-to-the-owasp-mcp-top-10-how-to-test-for-the-risks/
- CSA Agentic MCP Security Best Practices v1. https://labs.cloudsecurityalliance.org/agentic/agentic-mcp-security-best-practices-v1/
- MCPTox tool-poisoning benchmark, arXiv 2508.14925, Aug 19 2025. https://arxiv.org/abs/2508.14925
- MCP breach timeline (consolidated), AuthZed, updated May 30 2026. https://authzed.com/blog/timeline-mcp-breaches
- postmark-mcp malicious server, Koi Security, Sep 2025. https://www.koi.ai/blog/postmark-mcp-npm-malicious-backdoor-email-theft
- Backslash Security scan of 7,000+ MCP servers, Jun 25 2025. https://www.backslash.security/blog/hundreds-of-mcp-servers-vulnerable-to-abuse
- Enterprise MCP gateway architecture (production case study), arXiv 2608.10760, Aug 11 2026. https://arxiv.org/html/2608.10760v1
- A2A v1.0 announcement, Mar 2026. https://a2a-protocol.org/latest/announcing-1.0/ ; Linux Foundation A2A launch Jun 23 2025 and one-year release Apr 2026. https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year
- ACP merges into A2A, LF AI & Data, Aug 29 2025. https://lfaidata.foundation/communityblog/2025/08/29/acp-joins-forces-with-a2a-under-the-linux-foundations-lf-ai-data/
- IETF ID-JAG draft. https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant ; Okta Cross App Access announcements, Jun 23 2025 and Jun 23 2026 [vendor]. https://www.okta.com/newsroom/press-releases/okta-introduces-cross-app-access-to-help-secure-ai-agents-in-the/
- Gartner iPaaS market share 2024 (via leader announcements, May 2025). https://www.gartner.com/en/documents/6747734 ; Gartner RPA market share 2024 via UiPath release, Jul 1 2025. https://www.businesswire.com/news/home/20250701663839/en/
- Gartner: >40% of agentic AI projects canceled by end-2027, Jun 25 2025. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027
- BMC 20th Annual Mainframe Survey, Sep 2025 [vendor]. https://www.bmc.com/newsroom/releases/20th-annual-bmc-mainframe-survey.html

## Vendor surveys (used with flags)

- MuleSoft Connectivity Benchmark 2025 and 2026 [vendor]. https://www.salesforce.com/blog/mulesoft-connectivity-benchmark-2025/ ; https://blogs.mulesoft.com/agentic-perspectives/connectivity-benchmark-report/
- Postman State of the API 2025, Oct 2025 [vendor]. https://www.postman.com/state-of-api/2025/
- Salt Security State of API Security 2025 [vendor]. https://content.salt.security/state-api-report.html
- Digibee State of Enterprise Integration 2023 [vendor]. https://www.digibee.com/en/news/digibee-releases-2023-state-of-enterprise-integration-report/
- Confluent Data Streaming Report 2025, May 20 2025 [vendor]. https://www.confluent.io/press-release/data-streaming-report-2025/ ; Solace EDA maturity survey, Nov 2021 [vendor, dated]. https://www.prnewswire.com/news-releases/the-great-eda-migration-85-of-businesses-striving-for-event-driven-architecture-301432457.html
- UiPath FY2025 filings and agentic updates [vendor]. https://ir.uipath.com/ ; https://www.uipath.com/blog/digital-transformation/what-customers-telling-about-agentic

## Gateway and platform capability sources [vendor]

Kong Konnect MCP (Oct 2025) https://konghq.com/blog/product-releases/mcp-support-across-konnect ; Apigee MCP https://cloud.google.com/blog/products/ai-machine-learning/mcp-support-for-apigee ; AWS AgentCore Gateway GA (Oct 2025) https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available ; Azure APIM MCP preview (May 2025) https://techcommunity.microsoft.com/blog/integrationsonazureblog/expose-rest-apis-as-mcp-servers-with-azure-api-management-and-api-center-now-in-/4415013 ; Cloudflare Portals (Aug 26 2025) https://blog.cloudflare.com/zero-trust-mcp-server-portals/ ; agentgateway to LF (Aug 25 2025) https://www.solo.io/blog/solo-contributes-agentgateway-linux-foundation

## Maintainer knowledge

- Kickoff answers 2026-08-19: estate composition (H16), gateway-first stance (H17), debate nominations (CD-2..CD-5). Held in the private workbench per working protocol.

## Re-verification list (volatile facts)

| Fact | As-of | Re-check by |
|---|---|---|
| MCP spec current version 2026-07-28; registry still preview (~2,000 entries) | Aug 2026 | Nov 2026 |
| A2A production usage evidence (org counts only; no usage metrics) | Aug 2026 | Q1 2027 |
| Incumbent gateway MCP maturity states (Kong/Apigee/AWS/Azure/WSO2) | Aug 2026 | Nov 2026 |
| EMA/XAA and ID-JAG standardization progress | Aug 2026 | Q4 2026 |
| RPA agentic adoption (~450 of 10,800 UiPath customers) | 2025 | Q1 2027 |
| Excluded pending primary source: "75% of API gateway vendors will have MCP features by end-2026" (attributed to Gartner, unlocated) | n/a | do not publish |
