# The Vendor-by-Layer Coverage Matrix

As of August 2026. Phase 7, built from the vendor map in each of the 14 research tracks. Every vendor claim here is vendor-published unless a third-party source is named, and product facts carry an as-of date of August 2026.

---

## What this matrix shows and does not show

It shows where a platform genuinely does work at a layer, distinguished from where it claims coverage. It does not rank vendors, and it is not a shortlist. Use it to see which layers your candidate leaves to someone else, because that gap is your integration work and usually your surprise.

**Legend.** **Core** means this layer is the product. **Real** means genuine capability that is not the product's centre. **Adjacent** means it touches the layer through another product or a partner. **Claimed** means marketed coverage the research could not substantiate as distinct capability.

## The matrix

| Layer | Hyperscalers (AWS, Azure, Google) | Microsoft estate (M365, Agent 365, Foundry) | Salesforce | ServiceNow | SAP | Independents |
|---|---|---|---|---|---|---|
| R01 Infrastructure and compute | **Core** | Real | Adjacent | Adjacent | Adjacent | Sandbox specialists: **Core** |
| R02 Data platform | **Core** | Real (Fabric) | Adjacent | Adjacent | Real | Snowflake, Databricks: **Core** |
| R03 Integration fabric | Real | Real | Real (MuleSoft) | Real | Real | API management incumbents and MCP gateways: **Core** |
| R04 Systems of record | Adjacent | Real (Dynamics) | **Core** | **Core** | **Core** | Workday, Oracle: **Core** |
| R05 Line of business and OT | Adjacent | Adjacent | Real (Field Service) | Real | Real | Honeywell, Yokogawa, IBM Maximo, PTC: **Core** |
| R06 Intelligence and learning | Real | Real | Adjacent | Adjacent | Adjacent | Databricks, NVIDIA blueprint, eval specialists: **Core** |
| R07 Agent platform | **Core** (managed runtimes) | **Core** | Real | Real | Real | Frameworks and durable-execution vendors: **Core** |
| R08 Productivity and collaboration | Real (Google Workspace) | **Core** | Adjacent | Adjacent | Adjacent | Slack, notetakers: Real |
| R09 Experience and channels | Adjacent | Real | **Core** | Real | Adjacent | CCaaS and conversational AI: **Core** |
| R10 Security and identity | Real | **Core** (Entra Agent ID) | Adjacent | Adjacent | Adjacent | Okta, CyberArk, SailPoint, NHI specialists: **Core** |
| R11 Governance, risk, sovereignty | Real | Real (Purview) | Adjacent | **Core** (Control Tower) | Adjacent | GRC and AI-governance specialists: **Core** |
| R12 Observability and FinOps | Real | Real | Claimed | Adjacent | Adjacent | APM vendors and eval specialists: **Core** |
| R13 Operating model | Adjacent | Real (sponsors in Entra) | Adjacent | Adjacent | Adjacent | Workday Agent System of Record: Real |
| R14 Agent data engineering | Real | Real | Adjacent | Adjacent | Adjacent | Parsers, pipeline frameworks, memory services: **Core** |

## What the matrix makes visible

**Nobody covers fourteen layers.** The widest genuine footprints are the hyperscalers on the lower layers and Microsoft across identity, productivity and platform. Both leave the systems-of-record layer to the suite vendors, and all of them leave the line-of-business and operational-technology layer almost entirely to industrial specialists.

**The independents own the layers where the discipline is newest.** Agent data engineering, evaluation, non-human identity and MCP gateways all have independent leaders and platform followers. That is normal for a young category and it is also why the consolidation observations below matter.

**Two layers have thin coverage from everyone.** R13 operating model has almost no product surface at all, which is consistent with the finding that agent supervision has not become an occupation. And R05 has real coverage from industrial vendors and effectively none from the agent platform market, which is the coverage picture you would predict from the safety standards.

## Consolidation, as of August 2026

The category is consolidating fast enough that a coverage matrix is a dated artifact. Two waves are visible in the research:

- **Security absorbed the AI-detection and response specialists.** Six named acquisitions across 2024 to 2025 moved that capability inside platform vendors. The non-human identity specialists are consolidating on the same pattern, with two acquired at roughly $400M and $1B.
- **Observability absorbed the LLM-evaluation specialists**, and the boundary between evaluation and observability dissolved in the process. Most named specialists are now inside larger platforms.

The practical consequence for buyers: a best-of-breed choice at these layers is a bet on either independence or a favourable acquisition. Both are legitimate; neither should be made accidentally.

## Standards, which move the matrix more than products do

MCP is the connective tissue and is broadly adopted. A2A reached v1.0 stable with 150-plus organisations, and production evidence remains thin. Agent Skills in an open format is the one artifact that genuinely ports across vendors. OpenTelemetry GenAI semantic conventions are **not** stable as of mid-2026, so instrument through a translation layer rather than against the conventions directly. Open Semantic Interchange reached v1 under Apache-2.0 in January 2026 and is the portability development to watch at the data layer.

## How to use this with the question bank

Find your candidate's **Adjacent** and **Claimed** cells. Those are the layers where the question bank will produce the most revealing answers, because that is where marketing coverage and product capability diverge.

## Sources

Every cell is derived from the corresponding track's vendors.md, which carries the dated citations and vendor flags: research/R01 through research/R14. Vendor capability claims are vendor-published unless third-party sourced. This matrix sits on the quarterly re-verification list.
