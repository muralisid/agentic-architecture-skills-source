---
reader_summary: "Understand how agent data engineering and memory changes in an agentic enterprise and choose the evidence page that matches your decision."
audience: ["CIO/CTO","Enterprise architect","Data and AI engineering lead"]
decision_or_output: "Choose which agent data engineering and memory question to resolve, then continue to the scoped brief."
prerequisites: ["/docs/design"]
reading_time: "2 minutes"
evidence_status: "Layer orientation: detailed claims and evidence are carried by the linked findings and source register."
next: "/docs/layers/r14-agent-data-engineering/findings"
---

# R14: Agent data engineering & memory pipelines

Status: complete (published 2026-08-19). Scope finalized at Batch A kickoff with maintainer POV; see findings.md and sources.md.

## Scope inventory (v0)

- **Ingestion and preparation**: connectors, parsing and OCR, chunking strategy, metadata enrichment (entities, ownership, freshness), PII handling and consent at ingestion
- **Purpose-driven curation**: use-case-scoped corpora, multi-view/multi-card embedding design, LLM-guided taxonomy with classical topic modelling on embeddings, SME-in-the-loop curation workflows, knowledge hub editorial process
- **Memory feeding**: promotion policies into entity and cross-domain memory tiers, TTL and refresh, ACL propagation into indexes, index lifecycle and re-embedding operations
- **Economics and quality**: retrieval quality evaluation per view (recall and precision), embedding-vs-LLM cost engineering, data contracts with source owners

## Challenged-default candidates

Full-corpus LLM processing vs LLM-guided curation with deterministic machinery (the founding technique of this track); one universal index vs use-case-scoped multi-view indexes. Each track proposes its final list at kickoff.

## Files

`findings.md` and `sources.md` carry this track's research. The scoping brief and the vendor map were archived on 2026-08-23 (see `archive/`, decision D038).
