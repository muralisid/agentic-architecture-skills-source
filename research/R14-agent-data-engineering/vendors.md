# R14 Agent Data Engineering & Memory Pipelines: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Docling (LF AI & Data) | Parsing, open source | ~61k stars; MIT | Neutral local option; provenance-preserving; table/layout fidelity |
| LlamaIndex/LlamaCloud (Parse, Extract, Classify), Unstructured | Parsing/ingestion APIs | Active [vendor] | Vendor benchmarks self-reported; strong table extraction (Unstructured per third-party roundups) |
| Anthropic contextual retrieval (recipe) | Enrichment pattern | Published Sep 2024 [vendor] | The best-evidenced chunk upgrade; $1.02/M tokens floor with caching |
| Mem0, Zep (Graphiti), Letta, LangMem | Memory services | Active; benchmarks vendor-contested | Bitemporal facts (Zep) and sleep-time consolidation (Letta) are the durable ideas |
| AWS AgentCore Memory; Vertex Memory Bank | Platform memory | GA Oct 2025; preview Jul 2025 [vendor] | Managed extraction strategies; check erasure mechanics |
| S3 Vectors; platform vector stores | Index substrate | GA Dec 2025 [vendor] | Economics favor purpose-scoped indexes |
| Azure AI Search document-level ACLs; SpiceDB | Permission propagation | 2025 | The shipped pre-filter patterns |
| Debezium/Flink CDC; Tableflow | Freshness | Mature; GA Mar 2025 | CDC-fed incremental re-embedding |
| Databricks Agent Bricks; kapa.ai-class answer engines | Managed curation loops | Jun 2025; production [vendor] | Automated curation with eval generation; the CD's automation side |
| Glean; Microsoft 365 semantic index | Universal indexes | Mature [vendor] | The CD-11 discovery layer |

Agent-washing watch: "memory" without deletion or provenance; parsers benchmarked only on clean PDFs; universal-index pitches that never mention permission-sync lag or oversharing remediation.

---
