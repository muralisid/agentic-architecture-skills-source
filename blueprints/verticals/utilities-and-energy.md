# Vertical Blueprint: Utilities and Energy

As of August 2026. Phase 6. The vertical where agents meet physics, and the one where this guide is most willing to say no.

---

## 1. The scenario

A distribution utility runs an asset register in an EAM system, work management on top of it, a field workforce on mobile devices, a GIS that disagrees with the asset register in ways everyone has learned to work around, an outage management system, an ADMS, and a control room where operators watch alarms and event streams. Storm season doubles the alarm load and halves the time available to think about any one of them.

Four candidate agent applications present themselves: alarm and event triage in the control room, asset data reconciliation across systems that disagree, field crew assistance at the job, and switching order generation.

Three of those four are good ideas. The fourth is the one every vendor demonstrates.

## 2. Agent team design

| Agent | What it does | A x L position | Verdict |
|---|---|---|---|
| Event context agent | Watches alarm and event streams, assembles context an operator cannot hold in working memory, presents candidate interpretations | A2, L1 | Recommended. Output is an alert the operator may ignore |
| Asset reconciliation agent | Finds and explains disagreements between EAM, GIS and field-captured data, proposes corrections with provenance | A2 to A3 on the write path, L2 | Recommended. The write path is data quality, where a wrong recommendation costs a rejected change |
| Field assistance agent | Retrieves the right past incident, the applicable procedure and the asset history for the job in front of the crew | A2, L1 | Recommended. Degraded-connectivity behaviour must be specified |
| Switching order agent | Generates switching orders | Not recommended at any autonomy level | The sector's own survey ranks this the **lowest**-adopted AI use case, at 1.08 on a five-point scale. That is the practitioners answering |

**The organising principle: agents on the information path, not the control path.** The control path is governed by standards written for deterministic systems, and those standards have not been updated to bless probabilistic ones. Agent output is never an independent protection layer.

## 3. Planes activated

| Plane | Role |
|---|---|
| Knowledge | **Direct.** Historian data, asset registers, past incidents, procedures, all with lineage and freshness bounded by process dynamics |
| Human | **Direct.** The operator holds decision authority. Everything else in the blueprint serves that |
| Evidence | **Direct.** Operator-custodied session logging, not vendor-held. Every displayed option attributable to its source and timestamped |
| Execution | **Direct.** Local deployment inside the perimeter, because control-system data typically may not leave it |
| Control | Supporting. Unnamed OT assets are not routable; access severable in seconds |
| Action | Supporting, and deliberately narrow. Read paths broad, write paths confined to data quality |
| Improvement | Supporting. Two loops at different speeds: fast operational learning from overrides, slow compounding asset learning from work orders |

## 4. Controls

- **The validation loop, which is this vertical's signature pattern.** Raw model output is never displayed. Candidate actions are simulated against a digital twin or checked against rules, filtered, and only surviving options reach the operator. The model proposes; physics or policy disposes.
- Agent output confined to the alert or prompt channel and visually distinct from configured alarms. An operator must never mistake a suggestion for an alarm.
- Per-agent identity as a security principal with least privilege, access severable in seconds, and no routing to unnamed OT assets.
- Local open-weight deployment inside the perimeter. This is the published pattern, and it is a classification decision rather than a cost decision.
- Tested revert-to-manual. Agent failure must not degrade the control system.
- Recommendation acceptance and override telemetry, custodied by the operator.

## 5. Economics

Value here is measured in avoided truck rolls, avoided outages, deferred asset replacement and hours of specialist engineering time. Token cost is the cheapest input in the system and reporting it is close to meaningless.

The one measured result in the published literature sets the shape: a model converted energy-management-system node-breaker models into bus-branch planning models in under a minute, work the national-lab authors describe as usually taking regional-entity staff multiple weeks, and the converted case matched the actual state-estimation case closely enough to satisfy the applicable model-validation standard. Weeks of specialist time collapsing into minutes, with the specialist still checking the result. That is the economics of this vertical.

The constraint on the other side: an industry research body puts roughly 95% of utility data behind cybersecurity and customer-privacy walls, which is why the credible collective efforts are data-pooling consortia rather than model competitions.

## 6. Honest limits

This section is longer here than in any other blueprint, and that is the finding.

- **No published production AI alarm-triage deployment exists in an electric utility control room.** The published work is research, refinery pilots and product announcements. The event context agent above is a design proposal with shipped analogues, not an established practice, and the guide labels it as such.
- **No published agent holds autonomous control authority at any named water utility, anywhere.**
- **No named-factory case exists** of an MES agent taking autonomous production action with measured outcomes. Widely circulated figures in this space trace to content farms.
- **30% of surveyed sector entities report active bans on public AI tools.** Any blueprint that assumes tool availability is describing a different industry.
- The sector's own adoption ranking is sobering across the board: writing log entries scored 1.35 and predicting equipment failures 1.76, both on a five-point scale.

## 7. Metrics

Alarm-to-operator ratio during upsets, measured as a burst rate over ten minutes, never as a daily average. Recommendation acceptance and override rates, by agent and by operator. Asset register disagreement count, trending down. Truck rolls avoided. Specialist hours recovered on model and data work. Time to revert to manual, drilled and timed.

## Sources

research/R05-lob-and-ot/findings.md and sources.md carry every claim above, including the sector survey and the model-conversion result. Validation loop and alarm-load discipline: research/R05 and research/R13-operating-model/. Sovereignty posture: [../../synthesis/sovereignty-matrix.md](../../synthesis/sovereignty-matrix.md).
