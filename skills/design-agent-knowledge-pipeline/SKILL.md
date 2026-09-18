---
name: design-agent-knowledge-pipeline
description: >-
  Design how company information reaches an agent and what it may remember:
  parsing with provenance, chunking evaluated per corpus, versioned embeddings,
  indexes that carry permissions, retrieval that can refuse, citation by
  construction, memory writes through quarantine, and deletion that cascades to
  every derived copy. Includes the measured evidence on retrieval design. Use
  whenever building or reviewing retrieval or RAG for agents, designing agent
  memory, choosing chunking or embedding strategy, or answering how permissions
  and deletion apply to an index.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: task
---

# Design the pipeline from data to a cited answer

Two rules govern everything below, and both are consequences of one fact: anything derived from a document is still that document. Embeddings are recoverable text, with exact reconstruction of short inputs demonstrated, so a vector inherits its source's classification, access rules, residency and deletion duties in full.

## The nine stages

`references/data-to-memory-pipeline.md` walks them with the measured failure mode of each. In short:

1. **Parse with provenance** attached at parse time, page and cell level. Parsing quality caps everything downstream and the best parsers still lose retrieval performance against ground-truth structure.
2. **Chunk per corpus**, evaluated against that corpus's own questions. There is no universal recipe, and adopting one enterprise-wide is the cheapest-looking decision in the pipeline.
3. **Enrich contextually** where retrieval quality matters. This is the best-evidenced single upgrade.
4. **Embed versioned**, with the model version stamped on every vector, because the upgrade is the expensive part.
5. **Index with permissions carried**, filtered before the search on the caller's live identity, failing closed when a permission sync lags. Filtering after the search leaks counts and starves results.
6. **Retrieve with refusal available.** Weak evidence produces a refusal or an escalation, not an answer over it.
7. **Cite by construction**, span level.
8. **Write memory through quarantine.** Poisoning under a tenth of a percent of a store has achieved over eighty percent attack success, and query-only injection has reached ninety-eight.
9. **Erase in cascade**, reaching raw stores, indexes, memories, traces and eval sets, with deletion exposed as an audited operation.

## Choosing the retrieval design

`references/retrieval-recommended-approach.md` is a measured result rather than a preference, from five rounds on public corpora with human relevance judgements. The short form:

- Never index aspect-rich documents as one vector. A pooled index collapsed from 0.815 to 0.294 nDCG@10 as documents grew from one aspect to ten.
- Start with plain chunks at matched capacity and keep keyword search fused in. Most of the multi-vector benefit is capacity, not cleverness, and keyword search carries identifiers and quotations that dense retrieval misses.
- Add purpose-specific views only where they beat matched chunks on your own queries. They won by 0.188 where queries target one aspect and lost by 0.032 to 0.042 where queries concern whole documents.
- Derive any view taxonomy from the corpus, never from the objective. Conditioning the design on the goal made retrieval worse in every form tested, including on real human-judged data.
- Let a model design and name; let classical machinery embed, gate, cluster and rank. That is where the constant-factor saving is, and it is roughly two hundred times at comparable topic granularity, not a widening scaling law.

## Memory tiers

The architectural line sits where information persists past the end of a session. Below it, engineering. Above it, a record with an owner, a retention schedule and an erasure duty whether or not anyone designed one. Promotion into a durable tier is a gated act, never an accumulation.

## The gap to state rather than solve

Artifacts built from many sources at once (cross-document summaries, extracted memories, cluster labels) have no complete published permissions answer. Current practice stamps the intersection of the sources' permissions and re-derives when any of them changes. Say so when it comes up rather than implying the problem is solved.

`references/agent-data-engineering.md` and `references/data-platform.md` carry the engineering detail, the cost figures and the vendor-published claims, each labelled.


## Applying this guidance

Treat the supplied references as a starting point, not proof that a recommendation fits the task. Check important claims against dated external evidence. Distinguish proposed industrial examples from delivered work and author-reported experiments. Use the user’s actual industry and constraints; utilities and mining are examples, not universal requirements. Keep working-file and internal repository references out of reader-facing reports.

## Additional task references

- [Choose the representation for the question](references/memory-choosing-representations.md): consult when this aspect is part of the task.
- [Represent how equipment behaves over time](references/memory-time-series.md): consult when this aspect is part of the task.
- [Represent places and changes over time](references/memory-location-and-satellite-data.md): consult when this aspect is part of the task.
- [Combine different kinds of evidence](references/memory-combining-evidence.md): consult when this aspect is part of the task.
- [Keep memory usable and accountable](references/memory-permissions-and-lifecycle.md): consult when this aspect is part of the task.

## Intelligence and memory pillars

- [Memory](references/memory-guide.md): use this explanation when choosing task capability, representation, or evidence requirements.
- [Memory: text embeddings](references/memory-text-embeddings-guide.md): use this explanation when choosing task capability, representation, or evidence requirements.
- [Memory: image embeddings](references/memory-image-embeddings-guide.md): use this explanation when choosing task capability, representation, or evidence requirements.
- [Memory: video embeddings](references/memory-video-embeddings-guide.md): use this explanation when choosing task capability, representation, or evidence requirements.
- [Memory: audio embeddings](references/memory-audio-embeddings-guide.md): use this explanation when choosing task capability, representation, or evidence requirements.
