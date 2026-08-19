# R02 Data Platform: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Warehouses and lakehouses are mature; what agents need from them mostly is not: AI-ready data practices are absent or uncertain in 63% of surveyed data organizations (Gartner Q3 2024 survey), semantic definitions live in BI tools or nowhere, permissions live in source systems and rarely follow data into indexes, and freshness is batch-cadenced by default.

### 2. What changes with agents

The platform stops serving dashboards and starts serving *actors*. Three consequences: grounding becomes a product (curated, permission-aware, fresh, provenance-carrying retrieval surfaces); definitions become contracts (an agent that improvises a metric definition produces confident wrong numbers); and permissions must travel (every derived artifact, index, embedding, summary, inherits source obligations, because embeddings are recoverable: 92% exact reconstruction of short inputs from vectors; vec2text, EMNLP 2023).

### 3. Introduction options and sequencing

Ground the first agents on the best-modeled data you have; add governed semantics where answers carry financial or regulatory weight; sync ACLs into every index from the first connector, not retroactively; adopt CDC-fed incremental freshness when decision cadence demands it. Sequencing rule: the readiness assessment's data dimension gates which workloads may proceed.

### 4. Economics

Grounding cost is dominated by pipeline and index operations, not storage: re-embedding on model upgrades is the hidden line item (full-corpus re-embeds forced by model incompatibility; reference costs from hours-on-8xH200 to four figures via API); object-store-native vectors cut storage economics sharply (up to 90% claimed; S3 Vectors GA Dec 2025 [vendor]), which favors more, smaller, purpose-scoped indexes. Streaming freshness commonly costs ~10x batch; the CDC middle path delivers minutes-level freshness near batch cost (documented case: $400/month five-minute batch vs $7,600/month streaming for the same stated requirement).

### 5. Learning

The platform feeds the flywheel with retrieval traces and answer-to-source citations; it learns through curated context: definitions, exemplars, and query patterns promoted through evals (Uber's production text-to-SQL improved through 20+ algorithm iterations on curated workspaces, no formal semantic layer). Where numbers matter, learning lands as semantic-model coverage growth, measured by refusal and error rates.

### 6. Risk and groundedness

The signature failure is the silent wrong number: enterprise text-to-SQL collapses on real complexity without curated context (frontier models solved ~6% of Spider 2.0 enterprise workflows at publication; scaffolds now reach 65-96% on the leaderboard, self-reported). Governed semantics change the failure mode: with ontology-checked querying, accuracy rose from 54% to 72% *and* the system learned to say "I don't know" ~8% of the time instead of answering wrongly (data.world lineage, arXiv 2311.07509 and 2405.11706). Controls: semantic contracts for high-stakes numeric answers; refusal over improvisation; provenance on every answer.

### 7. Security and determinism

**ACL-aware retrieval is deterministic security applied to grounding.** The shipped pattern: crawl source permissions into index metadata and pre-filter inside the vector query on the caller's live identity (Azure AI Search document-level Entra ACLs [vendor]; connector-crawled permission maps in Glean and Amazon Q [vendor], fail-close on errors); ReBAC engines (SpiceDB class, used by OpenAI, Workday, Netflix) pre-compute authorized objects. Post-filtering is the anti-pattern: it leaks counts and starves results. Known failure modes: permission-sync lag (revocation takes effect at crawl cadence), group-membership drift, ACL-less documents defaulting to public, and above all inherited oversharing: agents amplify historical permission sprawl (the Copilot/SharePoint record: roughly 16% of business-critical data overshared per Concentric-derived reporting; Microsoft's Restricted Search is a stopgap by its own description). Hygiene precedes retrieval; no retrieval layer fixes wrong ACLs.

### 8. Sovereignty

Indexes and embeddings are data: they carry residency obligations of their sources, and derived artifacts (summaries, memories) inherit the most restrictive source classification. Region-scoped indexes and classification-routed grounding follow the R01 routing posture.

### 9. Vendor landscape

Summary; map below. Camps: platforms with bundled vector and semantics (now table stakes), semantic-layer specialists converging via the Open Semantic Interchange, dedicated vector databases retreating to verticals, catalogs repositioning as agent context layers, and permission-aware enterprise search.

### 10. Target state

Grounding as a governed product: well-modeled data with governed semantics where stakes demand determinism; permission-aware indexes with pre-filtered retrieval; CDC-fed freshness proportional to decision cadence; provenance from answer back to source span; catalogs supplying ownership, lineage, and definitions as agent context.

### 11. Migration path

Model and document the domains agents will ground on; stand up ACL sync with the first index; add semantic contracts to the first finance-grade use case; move freshness to CDC where staleness has cost; expand semantic coverage by measured refusal/error rates. Stop buying: standalone vector infrastructure where the platform already bundles it; semantic-layer products ahead of a use case that needs determinism.

### 12. Metrics

Grounded-answer citation rate; silent-error rate vs refusal rate on numeric questions; permission-sync lag (change-to-index); index freshness vs decision cadence; re-embedding cost per model upgrade; semantic-model coverage of high-stakes questions.

### 13. Data readiness and curation

This layer is where the guide's curation-before-context principle becomes infrastructure: curated business context (definitions, exemplars, scoped corpora) is the binding variable across every result in this track; the R14 track carries the pipeline discipline.

### Challenged defaults

**CD-8: Semantic-layer products vs governed views. Verdict: per use case, chosen by failure mode.** Three independent evidence lineages agree that governed semantics lift accuracy 8-38 points, and more decisively, convert silent wrong answers into refusals or deterministic answers (data.world 16.7 to 54.2 to 72% with explicit refusals; dbt paired benchmark Apr 2026 [vendor]: 98-100% via semantic layer on modeled scope vs 84-90% text-to-SQL, but only 72.7% coverage of the full question set; Cube Apr 2026 [vendor]: +17-23 points from a 4KB semantic document). That failure-mode conversion is what makes governed semantics a prerequisite where wrong numbers are fatal. Elsewhere, well-modeled data with curation reaches 84-95% (MotherDuck's "good data modeling *is* the semantic layer"; Uber in production), and the layer's ceremony is not free. The binding variable is curated business context; the product is its most governable packaging. Note where the analyst current is heading: Gartner's agentic-analytics guide predicts 60% failure by 2028 for MCP-only projects lacking consistent semantics (secondhand via vendor recaps; verify before citing hard). The Open Semantic Interchange (Sep 2025; v1 spec Jan 2026) is the portability path to watch.

**CD-9: Dedicated vector databases vs the simplest substrate. Verdict: the ladder, stated openly.** Brute force below ~100K vectors; pgvector on the database you already run to roughly 1-10M (sub-20ms at 1M with >95% recall); pgvectorscale-class extensions to ~50M at a fraction of dedicated-service cost (28x lower p95 than a dedicated baseline at 99% recall, ~75% cheaper; Timescale [vendor]); dedicated or managed engines for extreme scale, heavy write rates, or filter-heavy multi-tenancy (where pgvector's p99 degrades 3-4x). The flagship consolidation: Instacart moved search from Elasticsearch onto Postgres+pgvector (May 2025) with a 10x write-load cut and ~80% storage/indexing savings. Platform-bundled vector capability is table stakes (GA across every major platform, 2023-2025), and the preference for it is strongest where the corpus already lives on that platform, because governance and ACL inheritance come free. Two honest qualifiers: operations burden can justify managed services earlier than scale does (multi-hour, high-memory index builds; filtered-search recall cliffs), and the dedicated market is retreating into verticals (Pinecone's explored sale; Qdrant's continued funding), so long-term vendor viability belongs in the selection questions.

**CD-10: Data mesh vs governed central warehouse. Verdict: mesh ideas on a governed substrate.** Mesh matured into an operating model, not a substrate (Thoughtworks Jan 2026), while adoption retreated (Gartner's obsolete-before-plateau; Starburst's "repositioned, not adopted"). For agent grounding, the shipping ACL-sync architectures all assume a governed central index, and pure mesh multiplies exactly the surfaces agents punish: permission sync, definitional consistency, freshness monitoring. Keep the mesh's real inventions, domain ownership, data contracts, SLAs on definitions, and apply them on centrally governed infrastructure.

**CD-12: Real-time vs batch grounding. Verdict: CDC is the default; streaming is earned.** Freshness failures are real (similarity ranking ignores time; deprecated documents outrank current ones), and the fix for most workloads is CDC-fed incremental indexing at minutes-level freshness near batch cost. Event-native grounding (streaming agents on Flink-class infrastructure [vendor]) is earned by sub-minute decision windows: fraud, operational triage, inventory. The streaming-to-table convergence (Tableflow GA Mar 2025 [vendor]) is lowering the marginal cost of freshness over time; revisit the boundary yearly.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | ACLs crawled into index metadata; pre-filtered retrieval on caller's live identity; ReBAC pre-computation; fail-close on sync errors |
| C2 | Observability | Retrieval traces, permission-sync lag metrics, freshness telemetry per index |
| C3 | Traceability & audit | Answer-to-source-span provenance; embedding model version stamps; lineage (OpenLineage-class) into agent context |
| C4 | Grounding in reality | The layer's whole purpose: curated context, semantic contracts, refusal over improvisation |
| C5 | Impersonation & authenticity | Source authenticity via connector provenance; no unattributed corpora in grounding |
| C6 | Data sovereignty & residency | Indexes and embeddings carry source residency; region-scoped indexes; derived artifacts inherit strictest classification |
| C7 | Data privacy | Embeddings treated as personal data where sources are (vec2text); erasure cascades to vectors and derived artifacts; minimization at index scope |
| C8 | Safety & human oversight | High-stakes numeric answers gated by semantic contracts; refusal behavior monitored |
| C9 | Cost accountability | Re-embedding and index costs per corpus; freshness cost vs decision cadence |
| C10 | Resilience & continuity | Blue/green index migrations; degraded-mode retrieval; periodic full re-index as recovery baseline |

### Open questions

- Gartner "60% MCP-only failure by 2028" SPA: secondhand; obtain the primary before citing hard.
- Stale-embedding accuracy-loss quantification: circulating figures unverified; measure per corpus instead.

---
