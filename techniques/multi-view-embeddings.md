# Multi-View Embeddings with LLM-Guided Taxonomy

As of August 2026. Format per the techniques library: problem, mechanism, worked example, economics, when to use, failure modes, references.

---

## Problem

Two failures push teams toward this technique.

**Single vectors go muddy on multi-aspect content.** A pooled embedding of a document that discusses several things is approximately an average of its aspects. Under simplifying assumptions (near-orthogonal aspects, mean pooling), a query that matches exactly one aspect of a k-aspect document scores on the order of 1/sqrt(k) of what it would score against that aspect alone: the document matches everything weakly and nothing strongly. There are also proven representational limits: for a fixed embedding dimension, some combinations of documents can never be returned as a top-k result by any single-vector index, a bound that state-of-the-art embedders visibly hit on the LIMIT stress-test dataset; multi-vector and sparse representations escape these bounds (Weller, Boratko, Naim, Lee, arXiv:2508.21038, Aug 2025).

**Reading a corpus with a frontier LLM does not scale.** Full-LLM processing costs grow linearly with corpus size at frontier-token prices. Embedding the same corpus is roughly two orders of magnitude cheaper per token (public API pricing, 2026), and LLM-intensive graph-index construction has produced per-corpus indexing bills of $51 to $389 on standard benchmark corpora (TREX, arXiv Mar 2025).

## Mechanism

1. **The LLM designs; it does not execute.** For the use case at hand, an LLM proposes a taxonomy of semantic views (for example: the problem discussed, the identity of the speaker, the intent expressed) and the vocabulary that defines each. A human curates and hardens the taxonomy. This design step is the alignment mechanism: views must match the questions the system will be asked.
2. **Each item gets multiple cards.** For every content item, short purpose-specific texts (cards) are built per view, from extracted signals plus a snippet of the source. Each card is embedded separately with a small encoder, in one batched pass. The result is several vectors per item, each meaning one thing.
3. **A cheap gate filters the corpus.** A composite cosine score against small sets of anchor phrases (domain, objective, intent) acts as a multi-prototype classifier: a high-recall pre-filter costing embedding arithmetic, not LLM tokens. Items below threshold are quarantined, not deleted.
4. **Structure is discovered, then named.** Survivors are clustered; density clustering over reduced embeddings handles unknown cluster counts and noise. An LLM then names and consolidates topics working from keyword lists, never from raw documents, so LLM cost scales with the number of topics, not the number of items.
5. **Retrieval reads the right cards.** Queries search the card subset matching their purpose; scores can combine across cards. Lexical search (BM25) rides alongside for identifiers and exact phrases, fused by reciprocal rank.
6. **New items assign before anything re-clusters.** Incoming content is first assigned to existing clusters by similarity; discovery runs only on the unassigned residue, keeping structure stable as the corpus grows.

## Worked example

The pattern is validated in production in the social media domain: an audience-research system where an LLM-designed set of purpose views replaced full-LLM reading of every post, so frontier-model spend became a function of topics discovered rather than posts fetched, while purpose-specific views made clustering and targeting sharper than a single vector per post allowed. We treat that as a hypothesis validated in one domain and applicable to others; transfer to general enterprise corpora is analyzed as conditionally valid but is not yet empirically proven (see the conditions below).

## Economics

The claim "LLM designs, classical machinery executes" is the best-evidenced part of the technique:

- Taxonomy-then-classifiers matched GPT-4 used directly as the classifier (0.658 vs 0.655 accuracy on user-intent classification) with far higher scalability (TnT-LLM, Microsoft, KDD 2024).
- A 2026 production study reports roughly one hundredth the per-document cost of direct frontier-model classification, at higher accuracy (0.81 vs 0.76) (Databricks, Jul 2026 [vendor]).
- Small models taught by LLMs can outperform their teachers at execution (Distilling Step-by-Step, ACL Findings 2023; SetFit, 2022).
- If an LLM must touch every chunk once (contextual enrichment before embedding), the published floor is about $1.02 per million document tokens with caching (Anthropic contextual retrieval, Sep 2024 [vendor]).

The cost advantage is a scaling law, not a one-off saving: O(N) embeddings plus O(topics) LLM calls versus O(N) LLM calls, so the gap widens with corpus size.

## When to use

- Aspect-rich content where different questions target different facets of the same item.
- Classification- and discovery-shaped workloads over large corpora: research, tagging, routing, theme discovery.
- Purpose-scoped retrieval feeding downstream automation, where per-view precision matters.

## When not to use

- Single-aspect content with a strong retriever already in place: derived-text indexing can even hurt strong retrievers (Weller et al., EACL 2024).
- Identifier and exact-match lookups: dense retrieval alone fails there; that is a lexical-hybrid requirement, not a multi-view one.
- Corpora too small to amortize the taxonomy design, or workloads where one frontier call per item is genuinely affordable and simpler.

## Failure modes

1. **Taxonomy-query misalignment.** Views nobody queries add storage without recall; queried aspects without a view reproduce the muddy-vector problem. The LLM-designs-human-curates step is the control.
2. **Encoder-domain mismatch.** Small general encoders can lose separability on specialized jargon. Test first: label a small stratified sample and measure the gate's discrimination (AUC); swap or adapt the encoder if the margin is weak.
3. **Long documents.** Snippet truncation that works for short posts is invalid for long documents; cards must be built from extracted spans and overlapping sub-chunks.
4. **ACL leakage through derived artifacts.** Topic labels, centroids, and summaries derived from restricted documents can leak across permission boundaries; derivation must be permission-partitioned or filtered. This constraint barely exists in public social data and is mandatory in the enterprise.
5. **Diversity without a guard.** Deliberately including low-similarity results helps coverage-driven, multi-answer questions and shows no benefit on simple factual QA (DIVA, NAACL 2025; ARAGOG, 2024); the most damaging additions are topically adjacent passages that do not answer (The Distracting Effect, ACL 2025). Scope diversity to the query classes it serves, and measure it with coverage-aware metrics (alpha-nDCG, sub-question coverage), which plain recall cannot see.
6. **Index bloat.** Multiple vectors per item multiply storage; coarse purpose-views are the compromise between one muddy vector and per-token late interaction, whose storage runs 10-30x dense retrieval (ColBERT family critiques).

## Transfer status and conditions

Validated in the social media domain; conditionally valid for large enterprise corpora on analysis, with five testable conditions before commitment: measured gate separability on the target domain; a query-aligned view taxonomy; span-based card extraction for long documents; lexical hybrid for identifiers; and ACL-aware derivation of all artifacts. Empirical enterprise validation is future work.

## References

- Weller, Boratko, Naim, Lee, On the Theoretical Limitations of Embedding-Based Retrieval, arXiv:2508.21038, Aug 2025. https://arxiv.org/abs/2508.21038
- TnT-LLM, KDD 2024. https://arxiv.org/abs/2403.12173
- Databricks, Scaling document classification to 100k+ labels, Jul 20 2026. https://www.databricks.com/blog/scaling-document-classification-100k-labels [vendor]
- Distilling Step-by-Step, ACL Findings 2023. https://arxiv.org/abs/2305.02301 ; SetFit, 2022. https://github.com/huggingface/setfit
- Anthropic, Contextual Retrieval, Sep 2024. https://www.anthropic.com/news/contextual-retrieval [vendor]
- Multi-View Document Representation Learning, ACL 2022. https://aclanthology.org/2022.acl-long.414/ ; MADRAL, KDD 2022 ; Dense X Retrieval, EMNLP 2024. https://arxiv.org/abs/2312.06648
- Weller et al., When do Generative Query and Document Expansions Fail?, EACL 2024. https://arxiv.org/abs/2309.08541
- DIVA, NAACL 2025. https://aclanthology.org/2025.naacl-long.56/ ; ARAGOG, arXiv Apr 2024. https://arxiv.org/abs/2404.01037 ; The Distracting Effect, ACL 2025. https://arxiv.org/abs/2505.06914
- TREX, arXiv Mar 2025. https://arxiv.org/abs/2503.02922 ; BERTopic, 2022. https://maartengr.github.io/BERTopic/
- ColBERTv2, NAACL 2022. https://arxiv.org/abs/2112.01488
