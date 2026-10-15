---
concepts: [layers, r05, r03, zones, autonomy, risk, lifecycle, capabilities]
---

# Water utilities

Connect asset evidence, readings, work management, and people. Begin with decision support and reviewed work requests before considering any change to physical operations.

## Opportunities

- [Investigate a water-network anomaly](/use-cases/water-operations).
- [Collect compliance evidence](/use-cases/compliance-evidence).

Each opportunity uses one proposed agent. The autonomy and learning levels and the zones are proposals, not observed deployments.

| Agent | What it does | Autonomy and learning | Zone or rule it touches | Evidence status (D017) |
|---|---|---|---|---|
| Network anomaly agent | Gathers telemetry, work orders and asset history for an unusual pressure or flow reading. Weighs a faulty sensor, planned work and a real network issue. Prepares a work request for a person to review | Delegated tasks (A2), curated learning (L1) | Safety actuation, as a boundary. It never operates valves or pumps, changes treatment, or writes to SCADA | Supported for advice only: named utilities run machine learning that alerts staff. No precedent for a language-model agent doing this triage |
| Compliance evidence agent | Asks the owning team for a specific record. Checks issuer, date and scope. Prepares a traceable package for the reviewer | Delegated tasks (A2), curated learning (L1) | Formal regulatory records. A named person attests | Design proposal. No published precedent at a named utility |

SCADA (supervisory control and data acquisition) is the control-room system that monitors and remotely operates pumps, valves and treatment plant. Delegated tasks (A2) means a person reviews every output. Curated learning (L1) means people update what the agent knows, offline, and review each change before release. Both scales are on the [autonomy contract](/architecture/autonomy-contract). The zones are set out on the [deterministic zones](/architecture/deterministic-zones) page.

## The estate

A metropolitan water and wastewater utility runs systems in all fourteen [layers](/layers). The table names the main ones. Vendors in brackets are examples, not a claim about any named utility. The table is industry knowledge, not a survey.

A water utility bills households directly, usually every quarter. Most meters are still mechanical and read by a person, and digital meters are being rolled out. There is no wholesale market like electricity's. The utility answers to an economic regulator, a health regulator and an environment regulator.

| Layer | Main systems at a water utility | Standards and interfaces |
|---|---|---|
| [Infrastructure and compute (R01)](/layers/r01-infrastructure) | Data centres plus public cloud. A separate OT network. Telemetry radio or cellular to pumps, reservoirs and treatment plants. Low-power networks (LoRaWAN, NB-IoT) for sensors and digital meters | IEC 62443 zones and conduits. Security of Critical Infrastructure Act 2018 |
| [Data platform (R02)](/layers/r02-data-platform) | Warehouse or lakehouse. A historian copy. BI. Water quality lab data and hydraulic model outputs | Regulator reporting templates |
| [Integration fabric (R03)](/layers/r03-integration-fabric) | Integration bus or platform. API gateway. File transfer. An IoT platform for sensors. A one-way OT to IT path through a DMZ. No energy market gateway | OPC UA. MQTT |
| [Systems of record (R04)](/layers/r04-systems-of-record) | Customer billing system, the CIS (SAP, Hansen, Oracle, TechnologyOne). Asset system (IBM Maximo, SAP PM). GIS (Esri). ERP. Records. Lab system, LIMS (LabWare, Thermo SampleManager) | ISO 55001. WSAA ISO 55001 guidelines for the water industry |
| [Line of business and OT (R05)](/layers/r05-lob-and-ot) | SCADA (Schneider Geo SCADA Expert, AVEVA, Citect). RTUs and PLCs. Treatment plant control. Historian (AVEVA PI). Network event analytics (TaKaDu, StormHarvester, Xylem). Hydraulic models (InfoWorks WS Pro, WaterGEMS). Leak sensors. Digital meter head-end (Itron Temetra, Taggle). Field mobility. Contact centre | DNP3. Modbus. OPC UA. ISA-18.2 alarm management. ISA-95 |
| [Intelligence and learning (R06)](/layers/r06-intelligence-and-learning) | Data science platforms. Models inside packages. Anomaly detection on telemetry. Acoustic leak models | ISO/IEC 42001. NIST AI RMF |
| [Agent platform (R07)](/layers/r07-agent-platform) | Mostly new. Robotic process automation and rule engines. Customer chatbots. New agent builders and tool servers | Model Context Protocol |
| [Productivity and collaboration (R08)](/layers/r08-productivity-and-collaboration) | Microsoft 365. Shift logs, email and Teams. A paper logbook in some control rooms | None specific |
| [Experience and channels (R09)](/layers/r09-experience-and-channels) | Customer portal and app for paying, moving and reading. Contact centre. SMS and web notices for outages and restrictions | WCAG 2.2. PCI DSS for payments |
| [Security and identity (R10)](/layers/r10-security-and-identity) | Workforce identity. Customer identity (Okta CIC, Azure AD B2C). Privileged access. Security monitoring. OT monitoring | SOCI Act rules. Essential Eight. IEC 62443 |
| [Governance, risk and sovereignty (R11)](/layers/r11-governance-risk-sovereignty) | Risk and compliance tool and obligations register. Reports to the economic regulator (ESC in Victoria, IPART in NSW), the health regulator and the environment regulator. Taumata Arowai in New Zealand | ISO 31000. AS/NZS 10002:2022 complaints. ISO/IEC 42001 |
| [Observability and FinOps (R12)](/layers/r12-observability-and-finops) | Application and interface monitoring. Cloud cost tools. Almost no tracing of model calls | OpenTelemetry |
| [Operating model and supervision (R13)](/layers/r13-operating-model) | Control room shifts with authorisation levels. Treatment plant operators. Billing team leads and QA sampling. Contact centre QA | ITIL 4. ISA-18.2 alarm roles |
| [Agent data engineering (R14)](/layers/r14-agent-data-engineering) | Mostly new. Data catalogs. Contact centre knowledge bases. Asset information standards work (WSAA with BIM4Water) | ISO 19650 for asset information |

In water, the CIS, the asset system and GIS must agree on the property, the meter and the main. The historian is the safe copy of OT data for an agent to read. The [utilities page](/use-cases/utilities) draws this estate as a building.

## Process maps

Each worked example maps the work on this estate, step by step. It shows the process today across these systems, then the same work with an agent. It names who approves, where, and what the agent reads and writes.

- [Investigate a water-network anomaly](/use-cases/water-operations): an alarm, a sensor fault or a real issue. SCADA and the historian copy, event analytics, the asset system, the CRM and the LIMS. The agent writes advice and drafts only.
- [Resolve billing exceptions without deciding hardship](/use-cases/billing-exceptions): written for an energy retailer, with a water variant. A suspect read becomes a re-read order to the reading contractor.
- [Prioritize vegetation inspections](/use-cases/vegetation-inspection): the electricity version of image-led asset work. The same write path test applies to water asset work.
- [Build an AI use inventory a regulator can read](/use-cases/ai-use-inventory): one row per AI use, drawn from the agent registry.

## Enterprise capabilities

Use verified asset identity, dated observations, governed access to records, and reliable work-order interfaces. Preserve measurement uncertainty and field evidence. An agent can gather and explain evidence; the responsible operating process controls physical actions and formal assurance.

## Start and measure

Choose one site, zone, or process with a clear owner and representative historical cases. Compare with existing alarms, rules, and expert review. Measure confirmed outcomes, false conclusions, review time, and total cost. Test interrupted work and conflicting information before expanding.

## People and controls

Assign an operational owner, an engineering reviewer, data owners, and a support route. Do not count generated work items as completed field work. Use the same access boundaries during evaluation as during production.

Score each agent on the [risk profile](/architecture/risk-profile) and register it with a named sponsor through the [agent lifecycle](/architecture/agent-lifecycle). An agent that reads control-system data is Tier 3 (strict).

## Explore the design

- [Enterprise architecture](/architecture).
- [Line of business and OT (R05)](/layers/r05-lob-and-ot).
- [Knowledge and memory](/memory).
- [Value and investment](/use-cases/value-and-investment).

## Evidence and limits

These are proposed applications. Their value and safety require evaluation on local data and within the organization's operating procedures. The linked cases distinguish practitioner experience from external evidence and proposed extensions.

Named, dated evidence, reviewed 14 October 2026. Outcomes are as reported by the party named. None is independently audited.

- Watercare in Auckland is rolling out 5,000 wastewater sensors. An AI layer learns normal behaviour and alerts staff to inflow, blockages and pump problems. Staff decide on maintenance. Reported by Watercare, 18 August 2025 ([Watercare](https://www.watercare.co.nz/home/about-us/latest-news-and-media/watercare-s-wastewater-network-smartens-up-with-rollout-of-5000-sensors)).
- Sydney Water built an acoustic leak AI with the University of Technology Sydney (UTS). It located likely failures within 200 metres with 80 percent accuracy. This was reported by its developers, February 2023 ([Trenchless Australasia, 22 February 2023](https://www.trenchless-australasia.com/2023/02/22/sydney-water-takes-on-more-tech/)).
- Both systems advise staff. Neither source says the AI can change anything in the network.
- No language-model triage of SCADA alarms was found anywhere in the October 2026 research.
- No agent with autonomous control authority was found at any named water utility ([R05 findings](/library/layers/r05-lob-and-ot/findings), August 2026).
- No compliance verification agent was found at any named utility ([R05 Pattern B](/library/layers/r05-lob-and-ot/findings#the-four-utilities-patterns-tested)). An agent that reads protected system information may itself fall inside the critical-infrastructure rules it checks. Confirm that before building.
- Ofwat, the UK water regulator, describes agentic AI in UK water as largely experimental. This comes from a trade summary, not the plan itself ([Kurrant, 18 June 2026](https://kurrant.com/kurrantly-news/ofwat-backs-ai-for-the-water-sector-as-data-centre-demand-strains-supply/)).
