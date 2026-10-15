---
concepts: [layers, r05, zones, autonomy, risk, lifecycle]
---

# Mining and resources

Start with a bounded investigation or evidence task. Mining examples in this guide build on safety, production, and audit work described by the author. The complete agent extensions remain proposals.

## Opportunities

- [Safety coaching from CCTV, incident and observation data](/use-cases/safety-coaching).
- [Investigate production discrepancies](/use-cases/production-measurement).
- [Collect and check compliance evidence](/use-cases/compliance-evidence).
- [Investigate recurring audit issues across sites](/use-cases/systemic-audit-issues).

Each opportunity uses one proposed agent. The autonomy and learning levels and the zones are this guide's recommendation, not observed deployments.

| Agent | What it does | Autonomy and learning | Zone or rule it touches | Evidence status |
|---|---|---|---|---|
| Safety coaching agent | Checks a detected CCTV event against the safety procedure. Drafts coaching for a safety owner to approve | Delegated tasks (A2), curated learning (L1) | The rule for decisions about people. The agent never decides discipline or any other matter about a person | Proposal. Builds on the author's earlier CCTV risk work. The agent extension has not been deployed |
| Production discrepancy agent | Checks measurements, sensor health and operating records when production estimates disagree. Prepares a reconciliation case | Delegated tasks (A2), curated learning (L1) | Formal regulatory records. A person accepts any change to the production record | Proposal. Builds on the author's computer-vision measurement work. The agent extension has not been deployed |
| Compliance evidence agent | Asks the owning team for a specific record. Checks issuer, date and scope. Prepares a traceable package for the reviewer | Delegated tasks (A2), curated learning (L1) | Formal regulatory records. A named person attests | Proposal. Builds on the author's earlier standards-to-checklist work |
| Audit pattern agent | Tests competing explanations for findings that recur across sites. Requests the records that would confirm or rule out each one | Delegated tasks (A2), curated learning (L1) | Formal regulatory records, read only. An engineering or assurance owner decides the response | Proposal. Builds on the author's topic-modelling work on audit gaps |

Delegated tasks (A2) means a person reviews every output. Curated learning (L1) means people update what the agent knows, offline, and review each change before release. Both scales are on the [autonomy contract](/architecture/autonomy-contract). The zones are set out on the [deterministic zones](/architecture/deterministic-zones) page. None of these agents touches safety actuation. Equipment, isolation and stop decisions stay in the site's approved control systems.

## The estate

A miner with several mine sites and a processing plant runs systems in all fourteen [layers](/layers). The table names the main ones. Vendor names in brackets are examples, not endorsements. Most come from industry knowledge and are typical, not sourced.

| Layer | Main systems at a miner with a processing plant |
|---|---|
| [Infrastructure and compute (R01)](/layers/r01-infrastructure) | Site server rooms. Rugged computers on trucks and drills. Private LTE or wireless mesh for autonomous haulage (Nokia, Rajant). Remote operations centre in the city. Cloud |
| [Data platform (R02)](/layers/r02-data-platform) | Historian (AVEVA PI). Fleet management database. Geology database (acQuire, Maptek). Block models. Lab system (CCLAS, LabWare). Lakehouse (Palantir Foundry at Rio Tinto). Reports and dashboards |
| [Integration fabric (R03)](/layers/r03-integration-fabric) | A buffer network between plant and business networks, with historian copies. Fleet system adapters. Equipment maker telematics (Caterpillar, Komatsu). Rail and port scheduling links. Integration platform |
| [Systems of record (R04)](/layers/r04-systems-of-record) | ERP. Enterprise asset management (SAP PM, Ellipse, Maximo). Metal accounting (ION Algosys, Caspeo). Production database. HSE and critical control (Cority, Enablon, Intelex, Forwood). Isolation and permit system. Fly-in fly-out rostering. Procurement. Tenement register (Trimble Landfolio). Documents. GIS |
| [Line of business and OT (R05)](/layers/r05-lob-and-ot) | Fleet management (Modular Mining DISPATCH, Cat MineStar, Wenco, Hexagon). Autonomous haulage (Komatsu FrontRunner, Cat Command). Drill systems. Collision avoidance (Hexagon). Fatigue monitoring (Seeing Machines). Slope monitoring (GroundProbe). Plant control (ABB 800xA, Rockwell PlantPAx, Citect). Expert control on mills. Belt scales. On-stream analysers. Mine planning (Deswik, Maptek, Datamine). Geology modelling (Leapfrog) |
| [Intelligence and learning (R06)](/layers/r06-intelligence-and-learning) | Expert control on mills and flotation. Fleet dispatch optimisation. Predictive maintenance on haul fleets (BHP). Ore vision. Drilling optimisation (Hexagon Drill Assist). Exploration models |
| [Agent platform (R07)](/layers/r07-agent-platform) | Mostly new. Robotic process automation in finance and payroll. Palantir AIP (Rio Tinto). Cat AI Assistant. Agents sold inside apps (Groundhog) |
| [Productivity and collaboration (R08)](/layers/r08-productivity-and-collaboration) | Email, Teams, SharePoint and Excel. Pre-start and toolbox talk material. Tablets for short interval control. Radio |
| [Experience and channels (R09)](/layers/r09-experience-and-channels) | Dispatch consoles. In-cab displays. Remote operations centre video walls. Inspection apps. Crib-room screens |
| [Security and identity (R10)](/layers/r10-security-and-identity) | Corporate directory. A separate OT directory. Privileged access. OT network monitoring. Security event monitoring. Contractor site access. Fleet network security |
| [Governance, risk and sovereignty (R11)](/layers/r11-governance-risk-sovereignty) | Risk register. Critical control management. Tailings governance (GISTM). Statutory mine safety system. Royalties. Reserve reporting (JORC Code). Emissions reporting (NGER). Land access |
| [Observability and FinOps (R12)](/layers/r12-observability-and-finops) | IT monitoring. Historian interface health. OT asset inventory. Service management. Fleet network health. Equipment maker licence management |
| [Operating model and supervision (R13)](/layers/r13-operating-model) | Dispatchers. Mine technical services: geology, survey and planning. Metallurgists. Maintenance. Remote operations centre (BHP, Rio Tinto, Fortescue in Perth). HSE. Statutory roles such as the site senior executive or registered manager |
| [Agent data engineering (R14)](/layers/r14-agent-data-engineering) | Mostly new. Pipelines from historian to lakehouse. Geology and survey file exchange. Document capture for permits and assays. Equipment master data |

Agents run on the business side or in the cloud. A read broker in the buffer network serves them plant data from the historian copy. Nothing an agent does writes to plant control, collision avoidance, fatigue monitoring or the permit and isolation system. The [energy and resources](/use-cases/energy) page draws this estate as a building, with the boundary to the plant as a wall. It also gives the generator and oil and gas estate beside the miner's.

## Process maps

Each worked example maps the work on this estate, step by step. It shows the process today across these systems, then the same work with an agent. It names who approves, where, and what the agent reads and writes.

- [Investigate production discrepancies](/use-cases/production-measurement): truck tonnes from the pit against belt-scale tonnes at the plant. Fleet system, historian, lab system, EAM calibration records and metal accounting.
- [Safety coaching from CCTV, incident and observation data](/use-cases/safety-coaching): a detected event becomes coaching the safety owner approves. Video system, HSE system, permits, roster and learning system.
- [Investigate recurring audit issues across sites](/use-cases/systemic-audit-issues): the same finding at several sites. Audit system, EAM history, inspection records and procedures.
- [Investigate an asset before planning work](/use-cases/energy-asset-investigation): a mill bearing or conveyor drive runs outside its normal range. Historian, asset performance management, EAM and engineering tools.

## Enterprise capabilities

Use verified asset identity, dated observations, governed access to records, and reliable work-order interfaces. Preserve measurement uncertainty and field evidence. An agent can gather and explain evidence; the responsible operating process controls physical actions and formal assurance.

## Start and measure

Choose one site, zone, or process with a clear owner and representative historical cases. Compare with existing alarms, rules, and expert review. Measure confirmed outcomes, false conclusions, review time, and total cost. Test interrupted work and conflicting information before expanding.

## People and controls

Assign an operational owner, an engineering reviewer, data owners, and a support route. Do not count generated work items as completed field work. Use the same access boundaries during evaluation as during production.

Score each agent on the [risk profile](/architecture/risk-profile) and register it with a named sponsor through the [agent lifecycle](/architecture/agent-lifecycle).

## Explore the design

- [Enterprise architecture](/architecture).
- [Line of business and OT (R05)](/layers/r05-lob-and-ot).
- [Knowledge and memory](/memory).
- [Value and investment](/use-cases/value-and-investment).

## Evidence and limits

These are proposed applications. Their value and safety require evaluation on local data and within the organization's operating procedures. The linked cases distinguish practitioner experience from external evidence and proposed extensions.

A research round on 15 October 2026 searched for mining agent deployments. None was found at BHP, Rio Tinto or Fortescue. They show machine learning in production, platform deals and job advertisements that mention agents. No agent was found from Deswik, Komatsu, Modular Mining, Maptek, Datamine or Wenco for these processes. Absence in twenty searches is not proof of absence. Each agent above is a proposal built on work the author described. None is evidence that the full agent works.

The estate table is typical practice, not a survey of one company. The Global Mining Guidelines Group (GMG) has published guidelines for the industry. Three came out in 2019: autonomous systems, short interval control and interoperability. A system safety guideline followed in December 2023. No GMG guideline on AI agents was found.

Sources:

- [BHP Insights, AI in mining](https://www.bhp.com/news/bhp-insights/2024/08/artificial-intelligence-is-unearthing-a-smarter-future), August 2024.
- [Business Wire, Rio Tinto renews Palantir](https://www.businesswire.com/news/home/20241112799701/en), 12 November 2024 [vendor].
- [Global Mining Review, GMG guideline on autonomous systems in mining](https://www.globalminingreview.com/mining/24042019/guideline-published-for-the-implementation-of-autonomous-systems-in-mining/), 24 April 2019.
- [ABMEC copy of the GMG guideline for applying system safety in mining](https://abmec.org.uk/download/240322-gmg-guideline-for-applying-system-safety-in-autonomous-mining/), December 2023.
- [AusIMM, how AI is changing metal accounting](https://www.ausimm.com/courses/course-news/how-is-ai-transforming-metal-accounting-for-the-modern-mine/), 23 April 2026.
- [Proactivo, GMG gathering in Lima on why mining AI pilots stall](https://proactivo.com.pe/?p=770040), September 2026.
