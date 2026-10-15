---
reader_summary: "Adapt the Utilities and Energy blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Utilities operations lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Utilities and Energy."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "12 minutes"
evidence_status: "Proposed design, revised 2026-10-15. Evidence status is stated per agent. Outcomes require local evaluation."
concepts: [layers, r05, r04, capabilities, autonomy, risk, zones, lifecycle]
next: "/docs/blueprints/verticals/banking-and-financial-services"
---

# Power utilities and energy

A proposed workflow for power utilities and energy. Revised 15 October 2026. The roles below are design options, not claims that these agents are deployed or that multiple agents are necessary.

The agents map one to one onto four utilities patterns, tested in the [line of business and OT layer (R05)](/library/layers/r05-lob-and-ot/findings#the-four-utilities-patterns-tested). The patterns did not test equally. One has a measured result, one has outside support, and two have no published production precedent. So each agent carries its own evidence status, following decision D017 in the [decision log](/library/decisions).

## The business opportunity

A distribution feeder trips and recloses three times in one week. Each event reaches the control room as a burst of alarms. Last month's aerial imagery shows vegetation close to one span on that feeder. The asset register and the map system disagree about which pole stands at that span. The last inspection record is two years old.

Before a crew goes out, staff must join five sources. They are the alarm history, the imagery, the map, the asset records and past inspections. The crew then needs the right procedure and the history of that site. After the job, what the crew found should correct the asset register. The work and its records must also hold up when the regulator asks about them later.

That is one path from a concern to inspected work. Four agents can help along it, each matching one R05 pattern.

![Turn asset evidence into inspected work. Detect a concern, locate the asset, check the evidence, approve the inspection, confirm the result.](/figures/blueprints/utilities-and-energy-mobile.svg)

## The estate

A distributor of about one million customers in Australia or New Zealand runs systems in all fourteen [layers](/layers). The table names the main ones. Vendors in brackets are examples, not a claim about any named utility. The table is industry knowledge, not a survey.

This blueprint covers the distributor. In Australia and New Zealand the retailer bills households, so billing, payment plans and hardship sit with the retailer. Victoria's distributors own the household smart meters, so they also run the meter head-end and meter data.

| Layer | Main systems at an electricity distributor | Standards and interfaces |
|---|---|---|
| [Infrastructure and compute (R01)](/layers/r01-infrastructure) | Two data centres plus public cloud. A separate OT network for the control centre and substations. Private radio and fibre. Mesh radio or cellular for smart meters | IEC 62443 zones and conduits. Security of Critical Infrastructure Act 2018 |
| [Data platform (R02)](/layers/r02-data-platform) | Warehouse or lakehouse (Snowflake, Databricks, Fabric, SAP Datasphere). A copy of the OT historian. BI (Power BI, Tableau). Data marts for reports to the AER | CIM (IEC 61968 and 61970) where used. AER reporting templates |
| [Integration fabric (R03)](/layers/r03-integration-fabric) | Integration bus or platform (SAP Integration Suite, MuleSoft, Boomi). API gateway. File transfer. A market gateway to AEMO's B2B e-Hub. Kafka in newer estates. A one-way OT to IT path through a DMZ | AEMO B2B procedures (aseXML). NEM12 and NEM13 meter data files. NZ EIEP files over the registry hub. OPC UA |
| [Systems of record (R04)](/layers/r04-systems-of-record) | Network billing to retailers (SAP, Oracle, in-house). Meter data management where it owns meters (Itron, Oracle, Siemens). Asset system (SAP PM, IBM Maximo, Oracle WAM). GIS (Esri, GE Smallworld). ERP. Records. Outside records: AEMO's MSATS or the NZ registry | IEC 61968-1. ISO 55001 asset management |
| [Line of business and OT (R05)](/layers/r05-lob-and-ot) | SCADA, distribution management (ADMS) and outage management (OMS) (GE Vernova, Schneider, Siemens, Oracle). DER management. Smart meter head-end (Itron, Landis+Gyr, EDMI). Substation automation. Historian (AVEVA PI). Field mobility. Vegetation platforms. Network planning tools. Contact centre telephony | DNP3. IEC 60870-5-104. IEC 61850. DLMS/COSEM for meters. ISA-18.2 alarm management. ISA-95 |
| [Intelligence and learning (R06)](/layers/r06-intelligence-and-learning) | Data science platforms (Databricks, Azure ML). Models inside packages. Load forecasting. Image analytics as a service (Tapestry, Neara, AiDash, LiveEO). Microsoft 365 Copilot | ISO/IEC 42001. NIST AI RMF |
| [Agent platform (R07)](/layers/r07-agent-platform) | Mostly new. Today: robotic process automation (UiPath, Power Automate) and rule engines (ServiceNow, Pega). Emerging: SAP Joule Studio, Copilot Studio, Agentforce, the Maximo MCP server | Model Context Protocol. Nothing utility-specific |
| [Productivity and collaboration (R08)](/layers/r08-productivity-and-collaboration) | Microsoft 365. Spreadsheets hold many exception trackers. Tablets in the field | None specific |
| [Experience and channels (R09)](/layers/r09-experience-and-channels) | Outage map and SMS alerts. Connections portal. Fault and life support lines. The retailer runs the bill portal, app and chat | WCAG 2.2. Consumer Data Right for energy |
| [Security and identity (R10)](/layers/r10-security-and-identity) | Workforce identity (Entra ID, Okta). Privileged access (CyberArk). Security monitoring (Splunk, Sentinel). OT monitoring (Claroty, Dragos, Nozomi). Data diodes on some OT links | AESCSF. SOCI Act risk management program rules. Essential Eight. NZISM in New Zealand |
| [Governance, risk and sovereignty (R11)](/layers/r11-governance-risk-sovereignty) | Risk and compliance tool (ServiceNow IRM, Archer, Protecht). Obligations register. Reports to the AER, or the Commerce Commission and Electricity Authority in NZ. Bushfire mitigation plan in Victoria | ISO 31000. ISO 37301. ISO/IEC 42001 |
| [Observability and FinOps (R12)](/layers/r12-observability-and-finops) | Application and interface monitoring (Dynatrace, Splunk, SAP Cloud ALM). Market message monitoring. Cloud cost tools. OT network visibility. Almost no tracing of model calls | OpenTelemetry. FinOps Framework |
| [Operating model and supervision (R13)](/layers/r13-operating-model) | IT service management (ServiceNow). Control room shifts with operator authorisation levels. Contractor management for vegetation and field work. No agent supervisor role yet | ITIL 4. ISA-18.2 alarm roles. Electricity safety management scheme in Victoria |
| [Agent data engineering (R14)](/layers/r14-agent-data-engineering) | Mostly new. Data catalogs (Purview, Collibra). Master data governance (SAP MDG). BI semantic models. A few retrieval pilots over manuals | CIM. ISO 19650 for asset information |

Three records must agree: the GIS network model, the asset register and the market's standing data. They often do not, and the gap drives exceptions. The historian is the safe copy of OT data for an agent to read. The [utilities page](/use-cases/utilities) draws this estate as a building, with the market boundary at the edge.

## Process maps

Each worked example maps the work on this estate, step by step. It shows the process today across these systems, then the same work with an agent. It names who approves, where, and what the agent reads and writes.

- [Prioritize vegetation inspections](/use-cases/vegetation-inspection): the distributor's own work. Imagery platform, GIS, the asset system, outage management and field mobility. The agent writes one proposed notification.
- [Resolve billing exceptions without deciding hardship](/use-cases/billing-exceptions): the retailer's work, on the other side of the B2B e-Hub. It shows the market requests that reach the distributor and the metering coordinator.
- [Investigate a water-network anomaly](/use-cases/water-operations): the same information path rule for control systems, at a water utility.
- [Build an AI use inventory a regulator can read](/use-cases/ai-use-inventory): one row per AI use, drawn from the agent registry.

## Start with the simplest useful solution

Compare the agent with scheduled inspection, GIS rules, and conventional condition monitoring. Use the same representative cases and count human review, errors, integration, and ongoing operation. Add an agent only where choosing what to investigate or handling varied evidence improves the result.

Fixed logic already does the autonomous part of grid operation well. Duke Energy's self-healing grid acts alone in production. This guide reads it as rules-based, not an agent (see the named deployments below). Agents earn a place on the information path around such systems, not inside them.

## Proposed responsibilities

| Agent | R05 pattern | What it does | Autonomy and learning | Zone or rule it touches | Evidence status (D017) |
|---|---|---|---|---|---|
| Event context agent | A: SCADA alert intelligence | Watches alarm and event streams. Joins them with work orders, asset history and past events. Checks each candidate reading against telemetry, work orders and history before any operator sees it | Delegated tasks (A2), curated learning (L1) | Safety actuation, as a boundary. Output goes to the alert channel only and is never a protection layer | Supported, with two corrections |
| Asset reconciliation agent | D: asset data quality flywheel | Finds where the asset management system (EAM), the map system (GIS) and field records disagree. Proposes each correction with its source records | Delegated tasks (A2), reviewed learning (L2) | Formal regulatory records. A named data owner approves every write | Measured. The only one of the four with a measured result |
| Field assistance agent | C: contextual safety coach | Retrieves the applicable procedure, the asset history and matched past incidents for the job in front of the crew | Assisted (A1), curated learning (L1) | Safety actuation, as a boundary. Permits, isolation and switching stay with the crew and the permit system | No published production precedent |
| Compliance verification agent | B: compliance verification | Checks the work and its records against the applicable obligations. Flags gaps for staff to review | Delegated tasks (A2), curated learning (L1) | Formal regulatory records. A named person attests | Design proposal. No published precedent |
| Switching assistance | Not one of the four | Gathers approved switching procedures for an operator | Assisted (A1), fixed (L0) | Safety actuation | No AI agent found operating switching anywhere. None is proposed here |

SCADA (supervisory control and data acquisition) is the control-room system that monitors and remotely operates field equipment. Assisted (A1) means the agent helps a person who does the work. Delegated tasks (A2) means a person reviews every output. Fixed (L0) means the agent does not learn. Curated learning (L1) means people update what it knows, offline. Reviewed learning (L2) means it proposes its own updates and people review them. Both scales are on the [autonomy contract](/architecture/autonomy-contract). The autonomy and learning positions are proposals. They are starting choices to test, not certification levels.

Start with one agent and ordinary tools. Separate a responsibility only when it needs different permissions, independent review, or its own operating schedule.

### Event context agent: Pattern A, supported with two corrections

R05 found real support for agents that review alert streams with work-order and event context. A process-control vendor shipped guided alarm response with an oil major on 1 October 2024 [vendor]. A refinery pilot in November 2025 gave operators twelve minutes of notice on pressure disturbances [vendor]. Both are process plants, not electric utility control rooms.

The first correction: the suggestion already ships, so the part worth designing is the validation loop. Build it before the suggestion. Each candidate reading is checked against live telemetry, open work orders and the asset's history. A reading that fails a check is dropped or shown as unverified. Only then does the operator see it, and the operator decides. Where a simulation of the network exists, run candidate actions through it too. The national-lab control-room reference architecture does this and never shows the model's raw answer ([R05 validation loop](/layers/r05-lob-and-ot#the-validation-loop)).

The second correction: "control always stays human" is a policy, not an industry fact. Reinforcement-learning agents hold closed-loop control at two named process plants. They are bounded, simulator-trained and run with the safety system untouched. That is a different discipline from a language-model agent. This guide recommends that control authority stays human for language-model agents. Closed-loop AI control is a separate exercise with its own safety case.

### Asset reconciliation agent: Pattern D, the only measured result

It is the only one of the four patterns with a measured result. In national-lab work, a language model converted control-room network models into planning models in under a minute. Staff usually take multiple weeks for that task. The converted model met the applicable model-validation standard. The specialist still checked the result ([R05 measured result](/layers/r05-lob-and-ot#the-measured-economic-result)).

The write-back gate is the real decision, not the reconciliation. Asset register changes flow into the regulated asset base (rate base in the US), conformity evidence and regulatory reporting. So the gate needs provenance and the same change control the sector already applies to its models. A named data owner approves every write. No field that feeds the regulated asset base should run at supervised autonomy (A3).

The other half of the flywheel is capture: every work order returning real condition data. That is an operating-model and incentive change, not an AI capability. It should be stated that way, or it will be sold as something a tool can deliver.

### Field assistance agent: Pattern C, no published production precedent

No production deployment of a contextual safety coach was found. The nearest published work is a June 2026 research prototype. It links permits, safety enforcement data and complaints into job-site hazard notes. Its authors call it a benchmark study and decline to claim fewer injuries. Essential Energy said in April 2026 it was preparing an AI that reads crew notes for safety signals. Its 76 percent detection figure is a projection, not a measurement ([iTnews, 16 April 2026](http://www.itnews.com.au/news/essential-energy-turns-to-ai-for-safety-inspections-625091)).

The caution is automation bias. A retrieval agent can anchor a crew on the last accident. Experienced crews read the site with their eyes, ears and nose, and one confident history can crowd that out. Decision support that is usually right measurably reduces how often people check it ([R05 human factors](/layers/r05-lob-and-ot#two-human-factors-failure-modes)). Show why each past incident matched. Say plainly when nothing close matched. Never present a past incident as today's hazard.

Vendors assert how field agents behave with poor connectivity. None specifies it. Specify and test it before deployment.

### Compliance verification agent: Pattern B, a design proposal with no published precedent

This pattern was demoted to a design proposal. The North American reliability body has described AI assisting compliance monitoring, with staff reviewing flagged cases. But adoption of that approach in the sector's own survey was 2 percent. No compliance-automation vendor has a named utility customer in the published record. The industry conversation runs the other way, toward auditing the AI.

The agent itself likely falls under critical-infrastructure information-protection rules. An agent that reads protected cyber system information triggers information-protection obligations. Its model and configuration become change-managed baselines. Inside the security perimeter, the access and system-security requirements apply to it. The published workaround is to run open-weight models locally with no public network access. Anyone building this is building something new.

### Switching and protection

No utility was found letting an AI agent operate protection or switching. The switching assistant gathers approved procedures and nothing more. Switching authority stays in the approved control system and with the operator.

### If a customer agent is added

This blueprint has no customer agent. If one is added, AER v Origin (6 July 2022) sets the line. Automated processes changed hardship payment plans without checking capacity to pay. Origin paid an A$17 million penalty. So a customer agent may answer and flag hardship signals. Any change to a payment plan, balance, tariff or debt goes to a trained person. Capacity to pay is checked case by case. That puts the agent under [the rule for decisions about people](/architecture/deterministic-zones) and beside the [movement of money](/architecture/deterministic-zones#movement-of-money) zone. Such an agent should sit at delegated tasks (A2) and curated learning (L1).

## Named, dated deployments

These are the anchors this blueprint is measured against. Outcomes are as reported by the party named. Almost none is independently audited. Sources are under External reading.

| Deployment | Date and reporter | Stage | Advises or acts | What it means here |
|---|---|---|---|---|
| Duke Energy self-healing grid. About 2.2 million customer outages avoided in 2025, by Duke's count | 5 February 2026. Duke, the operator | Production | Acts alone | The announcement does not say AI. Self-healing usually means fixed switching logic, so this guide reads it as rules-based, not an agent (an inference). It is the autonomy regulators already accept |
| CAISO, the California grid operator, next-day outage-request review. More than 500 requests analysed in under eight minutes a night | OATI, the vendor that built the agents, 2026 [vendor]. CAISO itself reported no results yet in July 2025 | Production, as stated by the vendor | Advises. Operators decide | An agent beside the control room, not in the control loop |
| Schneider Electric's Grid AI Assistant for distribution management | 4 June 2026. Schneider Electric [vendor] | Product announced. No utility named | Advises | Every operational action stays subject to user review |
| AER compliance bulletin on automated bidding | 5 August 2026. The AER, read through a law firm's alert of 10 August 2026 | Regulator guidance. It creates no new obligations | Not applicable | The participant owns every bid however it is made. Bids sent to AEMO, the market operator, with no participant check carry higher risk. Each rebid's logic should be recorded. Third-party providers may be liable |
| Vector (New Zealand) pole inspection from aerial images. Roadside pole check cut from 30 to 45 minutes to 5 to 7 | 20 August 2025. Tapestry, the vendor, using Vector's data [vendor] | Production | Advises | Detection triggers an inspection. The field confirms |
| AgenticGrid network planning, from Monash University with Transgrid and Essential Energy. A Broken Hill network model in about two hours, against about three weeks | Race for 2030 project page, undated, read October 2026 | Trial | Advises | The agents choose what to run, a conventional solver calculates, and engineers decide |
| AGL customer chat assistant. 36 percent of about 125,000 monthly chats contained | IBM case study, undated [vendor] | Production | Advises. Its one journey that acts alone, adding a concession card, is a fixed rule-based flow | Containment without the agent changing an account |
| AER v Origin, Federal Court. Automated processes changed hardship payment plans without checking capacity to pay. Over 100,000 breaches affecting over 90,000 customers, and an A$17 million penalty | 6 July 2022. The AER, the regulator, as reported by Region | Precedent. Automation, not AI | Acted alone | The line for any customer agent |

## Capabilities used

The seven capabilities are what an agent platform provides. [What an agent platform provides](/architecture/system-view) sets them out.

| Capability | Role |
|---|---|
| Knowledge and memory | **Direct.** Historian data, asset registers, past incidents, procedures, all with lineage and freshness bounded by process dynamics |
| Human oversight | **Direct.** The operator holds decision authority. Everything else in the blueprint serves that |
| Observability and audit trail | **Direct.** Operator-custodied session logging, not vendor-held. Every displayed option attributable to its source and timestamped. Every proposed register correction carries its provenance |
| Runtime | **Direct.** Deployment selected from data classification and operational constraints. Control-system data usually may not leave the perimeter |
| Identity and policy | Supporting. Unnamed OT assets are not routable; access severable in seconds. The compliance agent is itself inside the protected scope |
| Tool gateway | Supporting, and deliberately narrow. Read paths broad, write paths confined to data quality |
| Evaluation and release | Supporting. Two loops at different speeds: fast operational learning from overrides, slow compounding asset learning from work orders |

## Controls and human decisions

Keep switching, protection, and physical control in approved control systems. Let the agent prepare evidence and proposed work. Test operation when connectivity fails.

Give every tool call a task identity, a limited permission scope, and a recorded result. Before a write, check that the source record has not changed. Stop when required evidence is unavailable, the task budget is reached, or a proposal exceeds the authorised scope.

The named enforcement points, by agent:

- **Every agent.** Its own identity and a named sponsor, recorded through the [agent lifecycle](/architecture/agent-lifecycle). A tier from the [risk profile](/architecture/risk-profile). Any agent that reads control-system data is Tier 3 (strict). A tested path back to manual or rule-based control.
- **Event context agent.** The validation loop runs before display. Output appears in the alert channel, visually distinct from configured alarms. It is never credited as a protection layer. A brokered read path is defensible while output stays as alerts. If any output could reach a control action, use a one-way architecture instead (R05, CD-18).
- **Asset reconciliation agent.** The write-back gate: a change request with source records and timestamps, approved by a named data owner. The register applies the change, not the agent. This sits in the [formal regulatory records](/architecture/deterministic-zones#formal-regulatory-records) zone.
- **Field assistance agent.** Poor-connectivity behaviour specified and tested before deployment. Match reasons shown. "No close match" stated when true. Crew location and performance data never used to judge a person.
- **Compliance verification agent.** Runs inside the perimeter on locally hosted models with no public network access. Its model and configuration are change-managed baselines. Staff review every flagged case. A named person attests every record.
- **Switching assistance.** Read-only access to approved procedures. No path to the control system. This is the [safety actuation](/architecture/deterministic-zones#safety-actuation) zone.

## A useful investigation loop

Observe the exception, identify the missing fact, request that evidence, and check whether it changes the proposed action. Repeat only while there is a concrete unanswered question. End with a reviewed proposal, a confirmed result, or an explicit request for human help.

For the event context agent, the loop ends with the validation check, not with the suggestion. A suggestion that has not passed the check does not reach the operator as advice.

## Economics and measures

### Economics

Value here is counted in specialist hours, avoided truck rolls, deferred asset replacement and avoided outages, not in tokens. The one measured result shows the shape: weeks of specialist work done in minutes, with the specialist still checking. Data access is the constraint on the other side. An industry research body puts roughly 95 percent of utility data behind cybersecurity and customer-privacy walls (R05).

Use cost per run to control spend. Use cost per resolved outcome to decide whether the agent stays. Agree the baseline with the process owner. Count value only after the outcome is confirmed. Compare the value of recovered time and better outcomes with the full cost. The full cost covers tools, models, evidence preparation, supervision and correction.

### What proves it is working, and what proves it is not

Measure confirmed defects, missed risks in a sampled control set, inspection lead time, unnecessary visits, and crew review effort. Add the R05 measures:

- Alarm-to-action time, with the operator verification rate beside it.
- Recommendation acceptance and override rates.
- Register correction throughput and rejection rate.
- Work-order data completeness. This is the operating-model measure.
- Time to revert to manual, tested.

Signs it is not working: acceptance rises while verification falls, which is automation bias. Proposed corrections keep being rejected. An unverified reading reaches an operator. Crews report that the matched incident did not fit the job. The revert-to-manual test has not been run.

## Honest limits

Decision D028 makes this section mandatory. This blueprint had the longest limits section in the corpus, and that length was the finding. The full length is restored here.

### What does not work

- Imagery can be old, obscured, or too coarse to establish clearance. Treat detection as a reason to inspect. Confirm asset identity and current conditions in the field.
- Agent output cannot count as an independent protection layer. A highly managed alarm needs a defined proof test, and a probabilistic output cannot meet one.
- Advice that is usually right makes people check less. Acceptance rate alone cannot show whether the agent helps.
- One confident matched history can narrow what a crew notices on site.
- Vendors do not specify how field agents behave with poor connectivity. They assert it.
- Most utility data sits behind security and privacy walls. An agent cannot reason over records it cannot reach.
- The capture half of the asset flywheel is a change in how work orders are filled in. No tool delivers it.

### What has no published precedent

- Pattern B, compliance verification. No named utility, no named vendor customer.
- Pattern C, the contextual safety coach. No production deployment. The nearest work is a research prototype whose authors make no outcome claim.
- Language-model triage of SCADA alarms. None was found anywhere in the October 2026 research.
- A production AI alarm-triage deployment in an electric utility control room. The published work is research, refinery pilots and product announcements.
- A measured AI outage result at any Australian or New Zealand network operator for 2024 to 2026. None was found.

### What this guide refuses to claim

- That any utility lets a language-model agent operate protection or switching. None was found, and this blueprint proposes none.
- That any utility lets a language-model agent change a payment plan on its own. None was found.
- A much-quoted figure of 43 percent fewer billing exceptions at a US utility. It could not be found in any source checked, including the vendor announcement of 11 September 2026. It is left out.
- That adoption is mature. A PwC study reported in April 2026 found 61 percent of utilities still in test or pilot. None called themselves advanced. This was read through a consultancy's summary, not the study itself.
- That "control always stays human" is an industry fact. It is a recommendation for language-model agents.
- That the CAISO deployment is proven in production. Production is the vendor's word. CAISO reported no results in July 2025.
- That the AER bulletin was read in full. The bulletin itself timed out. Its content here rests on a law firm's alert.

### Limits to test

Evaluate ordinary cases, uncommon failures, conflicting evidence, and recovery after an interrupted action before expanding authority. Test the validation loop with readings designed to fail it. Test the write-back gate with a correction whose source record changed mid-review. Test each agent with its network connection cut.

## External reading

The workflow above is the guide's proposal. These sources support the general investigation and risk-management methods; they do not validate the proposed business result.

- [ReAct: reasoning and acting with language models](https://arxiv.org/abs/2210.03629), 2022. Research basis for alternating reasoning and tool use.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), 2023. General framework for managing AI risks.

Sources reviewed 17 September 2026.

- [Government guidance on integrating AI in operational technology](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4347041/nsa-cisa-and-others-release-guidance-on-integrating-ai-in-operational-technology/), December 2025. Additional reading for deployments that interact with industrial systems.

Pattern evidence, reviewed 19 August 2026.

- [R05 findings: the four utilities patterns, tested](/library/layers/r05-lob-and-ot/findings#the-four-utilities-patterns-tested), August 2026. The evidence status of Patterns A to D.
- [R05 sources](/library/layers/r05-lob-and-ot/sources), accessed 19 August 2026. The dated primary sources behind each pattern.

Named deployments and regulator sources, reviewed 14 October 2026.

- [Duke Energy announcement, reproduced by StockTitan](https://www.stocktitan.net/news/DUK/duke-energy-again-named-by-fortune-one-of-world-s-most-admired-jvuca3366htp.html), 5 February 2026. Operator-reported self-healing results.
- [Latitude Media on the CAISO outage-review pilot](https://www.latitudemedia.com/news/under-the-hood-of-caisos-ai-outage-management-pilot/), 28 July 2025. CAISO's own status: no results yet.
- [OATI field lessons](https://www.oati.com/ai-for-energy/), 2026. Vendor statement of production and the overnight review figure [vendor].
- [Schneider Electric Grid AI Assistant, via Eurelectric](https://www.eurelectric.org/stories/schneider-electric-grid-ai-assistant-for-advanced-distribution-management-system-adms-operations/), 4 June 2026. Actions stay subject to user review [vendor].
- [K&L Gates on the AER automated-bidding bulletin](https://www.klgates.com/thought-leadership/Electricity-Market-Participants-on-Notice-AER-Releases-Guidance-on-Automated-Bidding-and-Third-Party-Services-8-10-2026), 10 August 2026, on the bulletin of 5 August 2026.
- [Tapestry on Vector](https://x.company/blog/posts/tapestry-vector/), 20 August 2025. Pole inspection times, using Vector's data [vendor].
- [Race for 2030 on AgenticGrid](https://www.racefor2030.com.au/ai-model-helps-network-planners-answer-questions-fast/), undated, read October 2026. The Broken Hill trial.
- [IBM case study: AGL](https://www.ibm.com/case-studies/agl-energy), undated. Chat containment [vendor].
- [Region, reporting the AER release on Origin](https://region.com.au/origin-fined-17-million-admits-breaching-hardship-obligations-100000-times/572811). The Federal Court hardship penalty of 6 July 2022.
- [iTnews on Essential Energy](http://www.itnews.com.au/news/essential-energy-turns-to-ai-for-safety-inspections-625091), 16 April 2026. A projected, not measured, safety-signal result.
- [IBM announcement of 11 September 2026](https://www.ibm.com/new/announcements/ibm-launches-the-ibm-ai-lighthouse-council-for-sap-utilities). Checked for the 43 percent figure; it is not there.
- [innobu summary citing PwC](https://www.innobu.com/en/articles/ai-exception-cases-market-communication-metering-2026.html), updated 26 September 2026. The 61 percent adoption figure, reported April 2026.
