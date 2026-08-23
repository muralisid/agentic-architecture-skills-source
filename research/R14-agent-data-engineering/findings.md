---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for agent data engineering and memory to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Data and AI engineering lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for agent data engineering and memory."
prerequisites: ["/docs/layers/r14-agent-data-engineering"]
reading_time: "7 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r14-agent-data-engineering/sources"
---

# R14 Agent Data Engineering & Memory Pipelines: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Most enterprises have no data engineering *for agents*: documents are chunked naively if at all, embeddings are unversioned, memory is whatever the platform defaults to, permissions stop at the source system, and nobody owns corpus health. The discipline that fixes this acquired a name in mid-2025: context engineering (coined into prominence Jun 2025 by Lutke and Karpathy; formalized by Anthropic Sep 2025 [vendor]; institutionalized by Gartner, which predicts it in 80% of AI tools by 2028).

### 2. What changes with agents

Data preparation becomes a production system with its own quality floor and failure modes. The evidence for taking it seriously: parsing quality caps everything downstream (even the best document parsers lose at least 14% of RAG performance vs ground-truth structure; OHR-Bench, ICCV 2025); corpus curation determines accuracy (a curated domain knowledge base cut hallucination from 35% to 6%; growing a corpus from 54 to 1,128 uncurated documents dropped accuracy from 75% to under 40% until domain scoping fixed it, arXiv 2606.11350); and ungoverned grounding carries legal liability (Moffatt v. Air Canada, Feb 2024: the company was held responsible for its chatbot contradicting its own policy).

### 3. Introduction options and sequencing

Start with parsing fidelity (a layout-aware parser with provenance), evaluate chunking per corpus rather than adopting a universal recipe, add contextual enrichment where retrieval quality matters (the best-evidenced upgrade: 49% fewer retrieval failures, 67% with reranking; Anthropic contextual retrieval [vendor]), version embeddings from day one, and appoint the corpus owner before the corpus, not after the incident.

### 4. Economics

The pipeline's cost drivers: parsing (per-page), embedding (per token, with model-upgrade re-embeds as the hidden multiplier: full-corpus re-embeds run from hours on multi-GPU rigs to four figures via API; mitigations: migrate only for >5% eval gains, blue/green index swaps, cross-model conversion at ~100x savings where applicable, ACL 2025), and curation labor (human, automated, or mixed: see CD below). Object-store vector pricing (S3 Vectors GA Dec 2025 [vendor], up to 90% cheaper claimed) tilts economics toward more, smaller, purpose-scoped indexes.

### 5. Learning

This track is where the guide's two learning loops become pipelines. Instance memory: hot-path memory writes during sessions plus background consolidation between them (the published pattern pair; sleep-time compute [vendor]). System flywheel: curation proposals (taxonomy updates, ground-truth additions, data fixes) promoted through evals and human gates. The memory-services market has real machinery and contested marketing: benchmark claims between leading services are vendor-authored and publicly disputed; treat all memory-service benchmarks as contested and run your own.

### 6. Risk and groundedness

Memory is an attack surface with quantified exposure: poisoning under 0.1% of a memory or knowledge base achieved over 80% attack success (AgentPoison, NeurIPS 2024); query-only memory injection reached 98.2% injection success (MINJA, 2025); Microsoft's agentic failure-mode taxonomy names memory poisoning first-class (updated Jun 2026). Controls: memory write governance (provenance on every write, quarantine before promotion), freshness discipline (stale grounding is a named production failure mode with legal cost), and bitemporal facts (event time vs ingestion time) so superseded facts are invalidated without deleting history.

### 7. Security and determinism

**Permissions must travel with derivations.** The shipped pattern: ACLs into chunk and vector metadata, pre-filtered retrieval on the caller's live identity (in-index document-level ACLs are now native on major search platforms [vendor]). The reason this is non-negotiable: embeddings are recoverable text (92% exact reconstruction of short inputs; vec2text, EMNLP 2023, reproduced 2025), so vectors inherit the source's classification, ACLs, and privacy obligations (OWASP LLM08). **The open gap the guide states honestly**: many-to-one derived artifacts (cross-document summaries, extracted memories) have no fully published ACL solution; current practice stamps the intersection (most restrictive) of source permissions and re-derives on ACL change; this is emerging, practitioner-grade, and flagged as such.

### 8. Sovereignty

Derived artifacts inherit residency: embeddings, memories, and summaries built from in-region data are in-region data. Erasure obligations cascade: deletion must reach raw logs, derived memories, and vectors (deleted-vector exclusion sets consulted before ANN queries; purpose-scoped namespaces; deletion as an audited callable operation).

### 9. Vendor landscape

Summary; map below. Camps: parsers (a neutral open-source leader plus commercial APIs), pipeline frameworks, memory services (benchmarks contested), platform memory (GA'd through 2025), and managed answer engines productizing the whole loop.

### 10. Target state

A curation pipeline with named ownership per corpus: layout-aware parsing with provenance; per-corpus-evaluated chunking with contextual enrichment; versioned, drift-monitored embeddings; permission-carrying indexes; memory tiers with write governance, TTLs, and erasure; CDC-fed freshness; span-level lineage from every answer to its source. Curation labor sized to risk: automated with calibrated judges and sampled audits where volume demands, human where liability does, always under a named accountable owner.

### 11. Migration path

Appoint corpus owners; fix parsing; evaluate chunking; version embeddings; wire ACL propagation; stand up memory write governance before enabling durable memory; add erasure mechanics with the first personal data. Stop buying: ingestion tools without provenance; memory features without deletion.

### 12. Metrics

Retrieval quality per corpus (with coverage-aware metrics where diversity matters); parsing fidelity spot-checks; hallucination/refusal rates against curated vs uncurated baselines; permission-propagation coverage of derived artifacts; erasure completion time across tiers; memory-write quarantine rates; embedding drift alerts; corpus freshness vs source change lag.

### 13. Data readiness and curation

This track *is* the guide's curation-before-context principle as an engineering discipline. Multi-view embedding was tested by the guide in five rounds on public corpora in August 2026; the measured results, including the negative ones, and the design they support are on the site's research pages (`/research`). The production origin of the pattern is a social-media domain; on public enterprise-flavoured and scientific corpora the measured position is that several vectors per document beat one, purpose-specific views beat matched chunks only where queries target one aspect, and conditioning the views on the objective does not help.

### Challenged defaults

**CD-11: One universal enterprise index vs use-case-scoped, purpose-curated indexes. Verdict: two layers, not one pole.** A permission-aware universal index earns its place for discovery and cross-silo questions (the shipped architectures and the published critique of pure federation: live fan-out inherits latency, ranking, and weakest-link search quality). Purpose-scoped, curated indexes (or scoped routing over the universal index) earn theirs for high-stakes agent tasks, on measured evidence: retrieval dilutes as corpora broaden (75% to under 40% in the Wyoming DOT case; passage-count degradation replicated at ICLR 2025; the distracting-effect result), universal indexes inherit oversharing debt at scale, and even the largest universal-index vendor shipped scoping controls as mitigation. The trade is formalized as coverage versus trust (arXiv 2607.05217). The guide's curation-before-context lens predicts exactly this outcome.

**The curator question (from H22, softened by evidence): every corpus an agent depends on needs a named accountable owner; curation labor is sized to risk.** The strong version (a dedicated human curator per domain) is not supported as published fact: automated curation with calibrated LLM judges and sampled human audits is real, growing, and works at scales humans cannot reach (audit-surface reduction of 99% published, with the over-flagging caveat that naive judges flag 37.8% of content). The half that survives everything: accountability cannot be automated (Air Canada), and the knowledge-management lineage (KCS's named Knowledge Domain Expert; three decades of KM failures attributed to unowned content) says ownerless corpora decay. Where liability or regulation binds, the owner is a human doing real curation; elsewhere the owner governs an automated loop.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | ACLs propagated into chunks, vectors, and derived artifacts; pre-filtered retrieval; intersection-stamping for many-to-one derivations (emerging) |
| C2 | Observability | Pipeline telemetry: parsing fidelity, embedding drift, freshness lag, memory-write rates |
| C3 | Traceability & audit | Provenance from parse time (page/cell) through chunk, embedding version, retrieval, claim; memory writes audited |
| C4 | Grounding in reality | Curated corpora with owners; contextual enrichment; freshness discipline; bitemporal fact handling |
| C5 | Impersonation & authenticity | Source authenticity at ingestion; no unattributed content into grounding or memory |
| C6 | Data sovereignty & residency | Derived artifacts inherit source residency; region-scoped pipelines and indexes |
| C7 | Data privacy | Embeddings as recoverable personal data; erasure cascades (logs, memories, vectors, exclusion sets); TTLs; consent at ingestion |
| C8 | Safety & human oversight | Memory write governance with quarantine; poisoning monitoring; human gates on promotion to durable tiers |
| C9 | Cost accountability | Re-embedding budgets; curation labor accounting; per-corpus index costs |
| C10 | Resilience & continuity | Rebuildable derived artifacts (everything regenerable from raw); blue/green migrations; full re-index as recovery |

### Open questions

- ACLs on many-to-one derived artifacts: no complete published solution; track for standardization.
- Memory-service benchmarks: all vendor-contested; the guide recommends running the acceptance suite from the graph-vs-vector entry.

---
