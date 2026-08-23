---
reader_summary: "Use production patterns only when their mechanism, economics, limits, and evidence match the workload in front of you."
audience: ["Enterprise architect", "Platform engineer", "Data and AI lead"]
decision_or_output: "Choose a production technique after comparing it with the simplest credible alternative."
prerequisites: ["/docs/design"]
reading_time: "3 minutes"
evidence_status: "Mixed: each published technique states its own evidence status; planned and held entries are not implementation guidance."
next: "/docs/techniques/when-a-knowledge-graph-earns-its-keep"
---

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

## Publication status

- **Published:** [When a knowledge graph earns its keep](when-a-knowledge-graph-earns-its-keep.md), a contested-choice study comparing graph databases with embedding retrievers.
- **Tested; results published as a research section, entry released from the publication hold on 2026-08-23:** Multi-view (multi-card) embeddings with LLM-guided topic modelling. The pattern was tested in five rounds of experiments on public corpora (2026-08-19 to 2026-08-22); the results, including the negative ones, and the approach the evidence supports are published on the site's research pages (`/research`, with the design at `/research/recommended-approach`). The technique entry, [Multi-view embeddings with LLM-guided taxonomy](multi-view-embeddings.md), is published with a status note; it predates the experiments, and the research pages, not the entry, are the implementation guidance.
- **Planned, not yet guidance:** Corrective RAG cascades; compaction and structured note-taking; distillation flywheels; semantic and prompt caching; deterministic routing tiers.
