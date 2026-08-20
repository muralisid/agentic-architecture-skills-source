---
reader_summary: "Compare the data platform vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","Data platform lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for the data platform; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r02-data-platform/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r02-data-platform/sources"
---

# R02 Data Platform: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Snowflake (semantic views, Cortex Search/Analyst), Databricks (Unity Catalog metrics, Genie, Agent Bricks), BigQuery, MS Fabric/Power BI | Platforms with bundled semantics + vector | GA waves 2024-2025 | Bundled is table stakes; semantics converging via OSI |
| dbt Labs (Semantic Layer, MCP server, dbt Agents), Cube (D3), Looker (LookML + Conversational Analytics GA 2025) | Semantic-layer specialists | Active; OSI founders | Choose where determinism is the requirement |
| Open Semantic Interchange (OSI) | Portability spec | v1 Apache-2.0, Jan 2026 | Watch for lock-in relief across semantic stacks |
| pgvector + pgvectorscale; Elasticsearch/OpenSearch vector | Existing-engine vector | Mature; BBQ/DiskBBQ 2025 | The ladder's middle rungs |
| Pinecone, Weaviate, Qdrant, Milvus | Dedicated vector DBs | Funding continues; category retreating to verticals | Viability question belongs in selection |
| MongoDB Atlas, Oracle 23ai, SQL Server 2025 VECTOR, S3 Vectors | Platform-bundled vector | GA 2023-2025 | Prefer where the corpus already lives |
| Glean, Microsoft 365 semantic index, Amazon Q Business | Permission-aware enterprise search | Mature | The shipped ACL-sync reference architectures |
| SpiceDB/AuthZed (Zanzibar class) | ReBAC engines | Production (OpenAI, Workday, Netflix) | Pre-filtering infrastructure |
| Atlan, Collibra, Alation | Catalogs as agent context | MCP servers 2025-2026 | Context, not execution; pair with semantic contracts |
| Confluent (Tableflow, Streaming Agents), Debezium/Flink CDC | Freshness infrastructure | Tableflow GA Mar 2025 | CDC default; streaming earned |

Agent-washing watch: "AI-ready data platform" claims without ACL sync into indexes; catalogs marketed as agents; text-to-SQL demos benchmarked on toy schemas.

---
