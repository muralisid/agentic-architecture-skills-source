---
reader_summary: "Compare systems of record vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","Enterprise applications lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for systems of record; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r04-systems-of-record/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r04-systems-of-record/sources"
---

# R04 Core Systems of Record: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Salesforce Agentforce; Headless 360 + hosted MCP | Embedded + external path | MCP hosted GA Enterprise+ Apr 2026; Headless 360 MCP beta Jul 2026 | Permission parity stated explicitly; agents do not pause by default; hard limits on agents, topics, actions per org [vendor] |
| ServiceNow AI Agents; Action Fabric | Embedded + external path | Action Fabric May 2026; MCP GA in every AI-native SKU | Also acts as MCP client; assist meter rates not published [vendor] |
| Workday Illuminate; Agent System of Record; Agent-Ready Tools | Embedded + external path + agent registry | ASoR GA Feb 2026; tools early access, GA projected H2 2026 | Agent System User accounts, agent owners, inherited controls [vendor] |
| Oracle Fusion AI Agents; AI Agent Studio | Embedded + external path | 22 agents in 26B at no extra cost; MCP and A2A from 26A | Approval routing treats agents as principals [vendor] |
| SAP Joule; Joule Studio 2.0 | Embedded only, by policy | Studio pro-code rebuild May 2026; A2A bidirectional planned Q4 2026 | API policy requires agentic access via Joule; publicly criticized by two analyst firms [vendor] |
| Microsoft Agent 365 | Governance plane across estates | GA May 2026, $15/user/month | Registry sync with other clouds; no coverage announced for the SoR vendors' own agents [vendor] |

Agent-washing watch: "agent" features that are saved prompts over existing UI actions; permission claims that cannot show run-as-user in the audit log; assist or credit meters whose rates are not published.

---
