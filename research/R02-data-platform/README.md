---
reader_summary: "Understand how the data platform changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","Data platform lead"]
decision_or_output: "Choose which the data platform question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r02-data-platform/findings"
---

# R02: Data platform

Status: complete (published 2026-08-19). Scope finalized at Batch A kickoff with maintainer POV; see findings.md and sources.md.

## Scope inventory (v0)

- **Current estate**: lake/warehouse/lakehouse, streaming and CDC, BigData estate, data catalogs and metadata management, MDM, data quality, lineage
- **Agent grounding**: semantic and metrics layers, vector stores and hybrid search, permission-aware retrieval with ACL sync from source systems into every index; graph databases treated as a challenged default, not an assumption (first named debate)
- **Governance**: data classification, data contracts and data products (mesh operating model), consent capture, retention
- **Agent-era additions**: freshness pipelines for grounding, index lifecycle management, storage and embedding cost tiers, synthetic data

## Challenged-default candidates

Graph databases vs topic modelling with contextual embeddings as the retriever (first named debate); dedicated vector databases vs pgvector or existing search engines; data mesh operating models vs a plainly governed warehouse. Each track proposes its final list at kickoff.

## Files

`findings.md` and `sources.md` carry this track's research. The scoping brief and the vendor map were archived on 2026-08-23 (see `archive/`, decision D038).
