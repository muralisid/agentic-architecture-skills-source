# Production techniques library

Use-case-driven data curation and cost-engineering techniques that make agents survive production. One file per technique. The library is open-ended: submissions welcome via the technique-submission issue template, held to the same format.

## Required format (every entry)

1. **Problem**: what breaks or costs too much without this technique
2. **Mechanism**: how it works, concretely enough to rebuild
3. **Worked example**: at least one production case (anonymized is fine); the scale it ran at
4. **Economics**: token or cost math, before and after; order of magnitude acceptable
5. **When to use / when not to**: decision criteria
6. **Failure modes and limits**
7. **References**: dated sources; maintainer knowledge cited from `knowledge/`

## Planned initial entries

- Multi-view (multi-card) embeddings with LLM-guided topic modelling (flagship entry, from the maintainer's production experience)
- When a knowledge graph earns its keep: graph databases vs embeddings-and-topic-modelling retrievers, an honest contested-choice study
- Corrective RAG cascade and relevance evaluation before answering
- Compaction, tool-result clearing, and structured note-taking
- Distillation flywheel: fine-tuned small models replacing large routers
- Semantic and prompt caching
- Deterministic routing tiers: skill selector, classifier, LLM router, fallback
