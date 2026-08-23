---
reader_summary: "Assess ServiceNow against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether ServiceNow merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/vendors/profiles/sap"
---

# Vendor Profile: ServiceNow

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

The strongest single-domain gravity in the guide's data: 44.4% ITSM share (Apps Run The World, 2025). Three surfaces: **AI Agents** embedded in the workflow platform, **Action Fabric** (May 2026) as the tool and action layer, and **AI Control Tower** (launched May 2025, kill switches and cross-platform coverage by May 2026) as a runtime governance plane [vendor].

## How it answers the bank

**Determinism and control (B).** The strongest B4 answer among the suite vendors: AI Control Tower ships kill switches and governs agents across AWS, Azure, GCP and M365 [vendor]. That is a governance plane designed for a heterogeneous estate rather than for its own.

**Interoperability (F).** MCP is GA in every AI-native SKU, and the platform acts as an MCP **client** as well as a server [vendor]. Being a client matters: it means the platform can consume your other tool servers rather than requiring everything to move inside it.

**Economics (D).** The weak answer. Assist meter rates are not published [vendor], which makes D1 unanswerable from public material. Require it in writing before signing.

## Coverage

Core at R04 (ITSM records) and R11 (governance and control tower). Real at R03, R05, R07, R09. Adjacent elsewhere.

## Watchouts

- The control tower is the most credible cross-estate governance product in the research, and it is also a strategic position: governing your other platforms from here creates a dependency at exactly the layer you were trying to keep neutral. That is a legitimate trade, and it should be a deliberate one.
- ITSM gravity is the strongest in the market, which makes this the archetype where the guide's warning about gravity is most needed: gravity predicts where you start looking, not where you should end up.

## Evidence status

Control tower coverage and MCP posture are vendor-published with documentation. Market share is third-party. Metering is not publicly established.

## Sources

research/R04, R11, R03 vendors.md and sources.md; synthesis/archetype-grid.md.
