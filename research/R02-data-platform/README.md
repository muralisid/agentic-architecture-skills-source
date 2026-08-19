# R02: Data platform

Status: complete (published 2026-08-19). Scope finalized at Batch A kickoff with maintainer POV; see brief.md, findings.md, vendors.md, sources.md.

## Scope inventory (v0)

- **Current estate**: lake/warehouse/lakehouse, streaming and CDC, BigData estate, data catalogs and metadata management, MDM, data quality, lineage
- **Agent grounding**: semantic and metrics layers, vector stores and hybrid search, permission-aware retrieval with ACL sync from source systems into every index; graph databases treated as a challenged default, not an assumption (first named debate)
- **Governance**: data classification, data contracts and data products (mesh operating model), consent capture, retention
- **Agent-era additions**: freshness pipelines for grounding, index lifecycle management, storage and embedding cost tiers, synthetic data

## Challenged-default candidates

Graph databases vs topic modelling with contextual embeddings as the retriever (first named debate); dedicated vector databases vs pgvector or existing search engines; data mesh operating models vs a plainly governed warehouse. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
