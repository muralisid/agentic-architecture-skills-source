---
reader_summary: "Choose a knowledge graph only when relationship traversal, explainability, and maintenance economics beat a simpler retrieval design."
audience: ["Enterprise architect", "Data architect", "AI platform lead"]
decision_or_output: "Record a graph-versus-retrieval decision with workload evidence, operating cost, and exit criteria."
prerequisites: ["/docs/techniques"]
reading_time: "10 minutes"
evidence_status: "Contested-choice synthesis; dated evidence and maintainer positions are distinguished inline."
next: "/docs/reference"
---

# When a Knowledge Graph Earns Its Keep: Graph Databases vs Embedding Retrievers

As of August 2026. A contested-choice study: the claimed value, the simplest credible alternative, the evidence both ways, and the economics.

---

## The wrong question, and the right one

"Should we use a knowledge graph or embeddings?" compares things that live at different levels. A graph database stores explicit nodes, relationships, and transactions; embeddings are approximate retrieval indexes over source material; topic models are navigation metadata; GraphRAG is an indexing technique, not a database. The right question is: **which derived indexes should sit around your canonical source records, and how should queries be routed among them?**

## Verdict

**Routed hybrid, vector-first.** The default path for unstructured enterprise content is: a canonical raw/event store; lexical search (BM25) plus contextual dense embeddings, with multiple purpose-views where content is aspect-rich; reranking over a candidate set; topics as versioned, regenerable navigation metadata. Add a selective, provenance-linked graph only when real workloads require deterministic relationship traversal: lineage, dependency and impact analysis, authorization paths, temporal validity, or transactional shared state. Route queries by type; fuse when in doubt.

Four designs are rejected: graph-only memory; vector-only retrieval without lexical search and raw sources; topic summaries as the source of truth; and fine-tuned model weights as factual memory.

## The evidence, both ways

Where graphs win:

- Corpus-global sensemaking: community-summary GraphRAG beats vector RAG on comprehensiveness and diversity over large corpora (Edge et al., arXiv Apr 2024 [Microsoft]).
- Multi-hop, relationship-intensive questions: on MultiHop-RAG, dense retrieval scored 65.77 F1, community GraphRAG 71.17, and dense-plus-graph integration 77.62. The errors are complementary, and integration beats either alone (Han et al., arXiv Feb 2025).
- Lightweight entity graphs: HippoRAG's graph-plus-PageRank reached 89.1% Recall@5 on a two-hop benchmark versus 68.2% for a strong dense retriever (NeurIPS 2024).
- Relationship-native domains (dependencies, IAM paths, fraud rings, lineage): deterministic path queries are the point; approximating connectivity with embeddings is the wrong tool.

Where vectors win:

- Simple and single-hop factual retrieval: reranked vector RAG is comparable or better, and graph context can inject noise while inflating prompts several-fold (GraphRAG-Bench, ICLR 2026; Han et al., 2025).
- Economics: LLM-intensive graph indexing cost $51 to $389 per benchmark corpus at 2025 prices, and graph construction ran 5,560 seconds where the dense baseline took 135 (TREX, Mar 2025; Han et al.). Microsoft's own LazyGraphRAG concedes the point: indexing at vector-RAG cost, 0.1% of full GraphRAG (Microsoft Research blog, Nov 2024 [vendor]).
- Agent memory specifically: retaining raw text and adding derived retrieval keys improved recall by 9.4% and QA by 5.4%, while replacing raw text with facts or summaries hurt (LongMemEval, ICLR 2025). A 2026 comparison found vector memory systems Pareto-optimal against graph memory implementations on a conversational benchmark (arXiv preprint 2601.07978; one benchmark, one implementation per class: indicative, not conclusive).

## Decision matrix

| Requirement | Best default |
|---|---|
| Semantic search over documents and conversations | Dense + sparse retrieval |
| Exact names, IDs, quotations, numbers | BM25, metadata filters |
| Fine-grained semantic matching | Rerank a small candidate set (cross-encoder or multi-vector) |
| "How is A connected to B?", dependency, lineage, authorization paths | Graph (Cypher-class queries) |
| Multi-hop questions | Vector seeding, then bounded graph traversal |
| Themes and corpus-wide synthesis | Topic/community summaries, then retrieve supporting passages |
| Rapid ingestion, frequent updates | Raw store + lexical/vector indexes |
| Auditability and authoritative facts | Canonical event store with provenance |
| Mixed production workloads | Routed hybrid |

## Routing policy

- Exact, local, recent, quotation, or identifier question: lexical + dense.
- Semantic or functional similarity: dense and purpose-view embeddings.
- Dependency, path, ownership, lineage, or multi-hop: retrieve seed entities, then bounded graph expansion.
- Themes, trends, whole-corpus synthesis: topic summaries, then original passages.
- Ambiguous or high-stakes: run vector and graph paths, fuse, require source evidence, and guard the fusion against topically adjacent non-answers, which measurably damage accuracy (The Distracting Effect, ACL 2025).

Commit raw events immediately; generate embeddings, topics, and edges asynchronously; make every derived artifact rebuildable and independently versioned.

## If you do add a graph

Extraction is the risk, not storage. LLM relation extraction omits and invents edges; entity resolution is hard; corrections must invalidate affected edges and summaries; broad variable-length traversals grow exponentially unless bounded. Minimum edge hygiene: every generated edge carries a source-span ID, extraction model and version, confidence, creation time, and validity interval. ACID guarantees internal consistency of the stored graph; it does not make an extracted edge true.

Two boundaries worth stating plainly:

- **Topics are metadata, never memory.** Interpretable and useful for navigation and synthesis (LLM-generated topics align better with human categories than classical baselines: TopicGPT, NAACL 2024), but they drift with prompts and corpus changes; store them versioned and regenerable.
- **Fine-tuning is machinery, never memory.** Adapters are excellent for extraction, routing, and reranking, and poor as a store of facts, which are hard to delete, permission, or cite in weights; retrieval beats fine-tuning for injecting new facts (Fine-Tuning or Retrieval?, EMNLP 2024).

## Production note

In the authors' production experience in the social media domain, a vector-first architecture with topics as derived metadata and no graph has carried the workload; no query class has yet demanded deterministic traversal. That is consistent with the verdict: the graph is added when relationships become real data, not because the consumers are agents.

## Acceptance test before you commit

There is no credible published benchmark of any specific full stack against another for your workload. Validate on a stratified test set covering: local facts, semantic recall, exact identifiers, multi-hop relations, temporal contradictions, corpus-global synthesis, unanswerable questions, deletions, and ACL enforcement. Measure correctness, evidence recall, faithfulness, p95 latency, cost, ingestion lag, and permission leakage. Route accordingly.

## Sources

- Edge et al., From Local to Global (GraphRAG), arXiv Apr 2024. https://arxiv.org/abs/2404.16130 [Microsoft]
- Han et al., RAG vs GraphRAG: A Systematic Evaluation, arXiv Feb 2025 (v3). https://arxiv.org/abs/2502.11371
- GraphRAG-Bench (When to use Graphs in RAG), ICLR 2026. https://arxiv.org/abs/2506.05690
- HippoRAG, NeurIPS 2024. https://openreview.net/forum?id=hkujvAPVsg
- TREX, arXiv Mar 2025. https://arxiv.org/abs/2503.02922 ; LightRAG, EMNLP 2025. https://arxiv.org/abs/2410.05779
- LazyGraphRAG, Microsoft Research blog, Nov 2024 [vendor]
- LongMemEval, ICLR 2025 ; agent-memory cost and accuracy study, arXiv 2601.07978 (preprint)
- TopicGPT, NAACL 2024. https://aclanthology.org/2024.naacl-long.164/
- Fine-Tuning or Retrieval?, EMNLP 2024. https://aclanthology.org/2024.emnlp-main.15/
- The Distracting Effect, ACL 2025. https://arxiv.org/abs/2505.06914
- BGE-M3, arXiv 2024. https://arxiv.org/abs/2402.03216 ; ColBERTv2, NAACL 2022. https://arxiv.org/abs/2112.01488
- Neo4j operations and Cypher documentation (graph capabilities and traversal guidance) [vendor]
