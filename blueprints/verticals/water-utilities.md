# Water utilities

Connect asset evidence, readings, work management, and people. Begin with decision support and reviewed work requests before considering any change to physical operations.

## Opportunities

- [Investigate a water-network anomaly](/use-cases/water-operations).
- [Collect compliance evidence](/use-cases/compliance-evidence).

Each opportunity uses one proposed agent. The A x L positions and zones are this guide's position, not observed deployments.

| Agent | What it does | A x L position | Zone or floor it touches | Evidence status (D017) |
|---|---|---|---|---|
| Network anomaly agent | Gathers telemetry, work orders and asset history for an unusual pressure or flow reading. Weighs a faulty sensor, planned work and a real network issue. Prepares a work request for a person to review | A2, L1 | Safety actuation, as a boundary. It never operates valves or pumps, changes treatment, or writes to SCADA | Supported for advice only: named utilities run machine learning that alerts staff. No precedent for a language-model agent doing this triage |
| Compliance evidence agent | Asks the owning team for a specific record. Checks issuer, date and scope. Prepares a traceable package for the reviewer | A2, L1 | Formal regulatory records. A named person attests | Design proposal. No published precedent at a named utility |

SCADA (supervisory control and data acquisition) is the control-room system that monitors and remotely operates pumps, valves and treatment plant. A2 means delegated tasks, with a person reviewing every output. L1 means curated learning: people update what the agent knows, offline, and review each change before release. The zones are set out on the [deterministic zones](/architecture/deterministic-zones) page.

## Enterprise capabilities

Use verified asset identity, dated observations, governed access to records, and reliable work-order interfaces. Preserve measurement uncertainty and field evidence. An agent can gather and explain evidence; the responsible operating process controls physical actions and formal assurance.

## Start and measure

Choose one site, zone, or process with a clear owner and representative historical cases. Compare with existing alarms, rules, and expert review. Measure confirmed outcomes, false conclusions, review time, and total cost. Test interrupted work and conflicting information before expanding.

## People and controls

Assign an operational owner, an engineering reviewer, data owners, and a support route. Do not count generated work items as completed field work. Use the same access boundaries during evaluation as during production.

Score each agent on the [risk profile](/architecture/risk-profile) and register it with a named sponsor through the [agent lifecycle](/architecture/agent-lifecycle). An agent that reads control-system data is Tier 3, Strict.

## Explore the design

- [Enterprise architecture](/architecture).
- [Industrial systems](/layers/r05-lob-and-ot).
- [Knowledge and memory](/memory).
- [Value and investment](/use-cases/value-and-investment).

## Evidence and limits

These are proposed applications. Their value and safety require evaluation on local data and within the organization's operating procedures. The linked cases distinguish practitioner experience from external evidence and proposed extensions.

Named, dated evidence, reviewed 14 October 2026. Outcomes are as reported by the party named. None is independently audited.

- Watercare in Auckland is rolling out 5,000 wastewater sensors. An AI layer learns normal behaviour and alerts staff to inflow, blockages and pump-station problems. Staff decide on maintenance. Reported by Watercare, 18 August 2025 ([Watercare](https://www.watercare.co.nz/home/about-us/latest-news-and-media/watercare-s-wastewater-network-smartens-up-with-rollout-of-5000-sensors)).
- Sydney Water built an acoustic leak AI with the University of Technology Sydney (UTS). It located likely failures within 200 metres with 80 percent accuracy. This was reported by its developers, February 2023 ([Trenchless Australasia, 22 February 2023](https://www.trenchless-australasia.com/2023/02/22/sydney-water-takes-on-more-tech/)).
- Both systems advise staff. Neither source says the AI can change anything in the network.
- No language-model triage of SCADA alarms was found anywhere in the October 2026 research.
- No agent with autonomous control authority was found at any named water utility ([R05 findings](/library/layers/r05-lob-and-ot/findings), August 2026).
- No compliance verification agent was found at any named utility ([R05 Pattern B](/library/layers/r05-lob-and-ot/findings#the-four-utilities-patterns-tested)). An agent that reads protected system information may itself fall inside the critical-infrastructure rules it checks. Confirm that before building.
- Ofwat, the UK water regulator, describes agentic AI in UK water as largely experimental. This comes from a trade summary of Ofwat's AI plan of June 2026 ([Kurrant, 18 June 2026](https://kurrant.com/kurrantly-news/ofwat-backs-ai-for-the-water-sector-as-data-centre-demand-strains-supply/)), not the plan itself.
