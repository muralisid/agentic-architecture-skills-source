---
reader_summary: "Identify which enterprise archetype best matches your scale, data gravity, vendor gravity, and operating capacity before copying someone else's architecture."
audience: ["CIO/CTO", "Enterprise architect"]
decision_or_output: "Select a primary archetype and record the architectural defaults and watchouts it implies."
prerequisites: ["/docs/architecture/vision-and-target-state"]
reading_time: "6 minutes"
evidence_status: "Author synthesis grounded in adoption and architecture evidence; archetypes are decision aids, not measured market segments."
next: "/docs/frameworks/readiness-assessments"
---

# Enterprise Archetypes: The Size-by-Gravity Grid

As of August 2026. Phase 2 deliverable: the personas every later chapter references.

---

## Two axes, not three personas

Enterprises differ along two dimensions that predict their agent journey better than any flat segmentation:

**Axis 1: Size and regulatory intensity.** This axis predicts the estate. SaaS portfolios run about 152 applications at firms under 500 employees and 660 to 900 at large enterprises (Zylo Jan 2025 [vendor]; MuleSoft Feb 2025 [vendor]: 897 apps, 29% integrated). ERP product lines are explicitly segmented by size (NetSuite's 44,000 midmarket customers vs Oracle Fusion's 12,000 enterprises; SAP's ~141,000-customer installed base skews large). Regulation compounds size: it decides whether formal frameworks are operated or merely cited (see the readiness assessment).

**Axis 2: Incumbent vendor gravity.** This axis shapes the **default agent shortlist and the integration surface, not the outcome**. The evidence for that careful wording: incumbents bundle agents into their suites (Gemini folded into Workspace plans at no add-on cost, Jan 2025 [vendor]; more than 90% of the Fortune 500 touch Copilot), yet Gartner finds 66% of M365 Copilot deployers run at least two other enterprise AI assistants (Jun 2026) and 45% of martech leaders say incumbent vendor agents fail their expectations (Oct 2025), while paid attach runs only 4 to 6% of installed bases for both Copilot and Agentforce. Gravity tells you where an enterprise will *start looking* and which integration surfaces are cheapest; it does not tell you where they end up.

Gravity strength varies by system: CRM gravity is strong (Salesforce holds 20.0% share, five times its nearest rival; IDC via Salesforce, Apr 2026 [vendor-published]), ITSM gravity is strongest (ServiceNow 44.4%; Apps Run The World 2025), productivity gravity is near-binary (Microsoft ~77% of SaaS enterprise productivity per Gartner 2025, with Google concentrated in SMB and education; methodology note: domain counts favor Google, enterprise seats and revenue favor Microsoft). ERP gravity is comparatively weak: the top ten ERP vendors hold only 30.9% combined (Apps Run The World, Aug 2026), so ERP-centric agent strategies inherit fragmentation.

## The grid, with four worked cells

Rows: size/regulation. Columns: dominant gravity. Not every cell is common; these four cover most real enterprises. Each cell sketches: typical estate, default agent shortlist, natural integration surface, watchouts.

### Cell 1: Global regulated enterprise, Microsoft plus SAP gravity

The most common large-enterprise shape. Estate: 700-900 applications, M365 everywhere, SAP (or Oracle) core with heavy customization, ServiceNow ITSM, mainframe still load-bearing, formal frameworks genuinely operated. Default shortlist: M365 Copilot and Agent 365 class for productivity, embedded suite agents (Joule class) for ERP workflows, plus at least one independent platform (the 66% multivendor finding applies most here). Integration surface: mature but partial API management; the R03 gateway-first pattern lands naturally on existing APIM investment. Watchouts: two-estate governance from day one (licensed platforms plus metered APIs); sovereignty routing; works-council and model-risk processes gate autonomy levels.

### Cell 2: Large enterprise, Salesforce gravity

Customer-operations-centric businesses. Estate: Salesforce as the customer system of record with a large ecosystem attach, M365 or Google for productivity, fragmented back office. Default shortlist: Agentforce class embedded agents for CRM-grounded workflows; the guide's use-case-led platform rule applies (embedded where the data lives, build-on-primitives for cross-suite workflows). Integration surface: MuleSoft-style iPaaS commonly present; treat its connector estate as a tool-catalog candidate but hold vendor survey claims to the evidence bar. Watchouts: CRM gravity does not extend to ERP or ITSM domains; avoid one-platform narratives (the Phase 7 question bank exists for exactly this cell's sales pressure).

### Cell 3: Mid-market, Microsoft gravity

The most numerous cell. Estate: roughly 150-300 SaaS apps, M365 plus Business Central or NetSuite, no formal framework operation (practice is manual and attestation-driven), thin platform engineering. Default shortlist: whatever is bundled: Copilot-class first, embedded suite agents second; build-on-primitives only for a genuinely differentiating workflow. Integration surface: little governed API estate; iPaaS or direct connectors dominate; the readiness assessment's light mode applies. Watchouts: this cell scales agents on vendor rails or not at all; the platform-building step from the recommended sequencing matters most here precisely because there is no platform team to inherit it.

### Cell 4: Digital native, cloud-native gravity

Estate: best-of-breed SaaS, strong engineering culture, high API coverage, weak formal governance. Default shortlist: build on primitives (SDKs, MCP, open components) with selective embedded agents; adoption starts in engineering (matching the observed first-mover data). Integration surface: already API-first; the gateway pattern is an afternoon, the governance culture is the gap. Watchouts: eval and audit discipline lag capability; the A x L model's rule (A4 requires L2 governed learning) is the check against shipping autonomy ahead of governance.

## How the grid is used

Every later chapter writes against these cells: current-state baselines, the path from a first agent to the target state, and readiness modes (light for cell 3, heavy for cell 1). Where a real enterprise spans cells (a regulated group with a digital-native subsidiary), treat the cells per operating unit.

## Sources

Zylo 2025 SaaS Management Index, Jan 2025 [vendor]; Okta Businesses at Work 2025, Mar 2025 [vendor]; MuleSoft Connectivity Benchmark 2025/2026 [vendor]; Apps Run The World ERP and ITSM vendor analyses, 2025-Aug 2026; IDC CRM tracker via Salesforce, Apr 2026 [vendor-published]; Gartner productivity-suite share, 2025 (doc 6860166); Gartner Copilot/agents assessment, Jun 9 2026 (doc 7974937; 66% multivendor); Gartner martech survey press release, Oct 29 2025 (45% dissatisfaction); Google Workspace Gemini bundling, Jan 2025 [vendor]; Microsoft Copilot adoption disclosures via earnings coverage [vendor-derived]; Salesforce Agentforce attach analyses of earnings, 2026. Methodology note: productivity-suite share differs by measure (domains vs seats vs revenue); this chapter uses the enterprise-seat view.
