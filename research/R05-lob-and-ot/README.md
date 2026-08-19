# R05: Line-of-business & OT

Status: complete (published 2026-08-19). Scope finalized at Batch C kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Estate**: EAM/CMMS, WMS, MES, field force scheduling and dispatch, GIS, historians, IoT and telemetry platforms; utilities stack (SCADA, ADMS, OMS, AMI), public sector case management
- **Boundary architecture**: OT/IT segmentation (Purdue model, DMZs, data diodes), IEC 62443 and NERC CIP constraints, industrial protocols (OPC UA)
- **Agent stance per loop**: read-only insight, advisory recommendation, supervised actuation; agents never inside safety-instrumented loops; digital twins and simulation as the safe interface
- **Work surfaces**: work order lifecycle, outage and incident workflows, field crew assistance as primary agent entry points

## Challenged-default candidates

Digital twin platforms as agent prerequisites vs direct historian access; vendor OT-AI suites vs IT-side advisory agents. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
