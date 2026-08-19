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
