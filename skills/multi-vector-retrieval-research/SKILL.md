---
name: multi-vector-retrieval-research
description: >-
  The measured evidence on retrieval design for agents, from five rounds of
  experiments on public corpora with human relevance judgements: whether several
  embeddings per document beat one, whether purpose-specific views beat matched
  chunks, whether a cheap relevance gate and topic-level processing pay for
  themselves, which diversity operator to use, and whether conditioning an index
  on the task objective helps (it does not). Includes the recommended pipeline
  and the reversals. Use when designing or reviewing retrieval, chunking,
  embedding views, topic modelling or result diversity, when someone proposes
  conditioning an index on the objective, or when a retrieval claim needs
  evidence rather than intuition.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: reference
---

# Multi-vector retrieval: what held and what did not

Start with `references/01-recommended-approach.md`. It is the design the evidence supports, with the measurement and the published work behind each step. The rest is the evidence trail.

| File | What it settles |
|---|---|
| `references/00-overview.md` | The four claims tested, the corpus ladder, and how to read the numbers |
| `references/01-recommended-approach.md` | The recommended pipeline, nine decisions, each with its measurement |
| `references/02-aspect-dilution.md` | Several vectors against one, and how much of the gain is capacity rather than alignment |
| `references/03-real-prose.md` | Where purpose views lose: human-judged abstracts, whole-document queries |
| `references/04-gate-and-economics.md` | What a cheap gate actually discards, and the constant-factor saving |
| `references/05-diversity-and-consumer.md` | The coverage-relevance frontier, and a claim that did not survive a cross-family judge |
| `references/06-objective-conditioning.md` | Five rounds, five forms of conditioning the index on the goal, all negative |
| `references/07-method-and-reversals.md` | The discipline, and the five headline reversals with what caught each |
| `references/08-reading-list.md` | About thirty-five papers, with how each relates to these results |
| `references/09-technique-multi-view-embeddings.md` | The pattern entry that predates the experiments, with its status note |
| `references/10-technique-knowledge-graphs.md` | When a knowledge graph earns its keep against embedding retrieval |

## The short answer

Never index aspect-rich documents as one vector. Start with plain chunks at matched capacity, fuse keyword search in, and add purpose-specific views only where they beat those chunks on your own queries. Derive any view taxonomy from the corpus, never from the objective. Where the objective must shape retrieval, use a retriever trained to follow instructions. Spend the model on designing and naming, not on reading every document. Measure with coverage-aware metrics against a control with the same embedding budget.

## What is withdrawn

Four claims this programme once made and no longer supports: that alignment rather than capacity explains the multi-vector benefit; that the two-pass cost advantage widens with corpus size; that the relevance gate is where the saving comes from; and that the right amount of result diversity depends on whether a model or a person reads the results. `references/07-method-and-reversals.md` explains what caught each, and the pattern behind all of them: a control that is not matched is not a control, and a measurement that cannot come out negative is not measuring.

## Using the numbers

Every figure traces to a committed experiment artifact named on the page. Differences of about 0.03 nDCG@10 on a few hundred queries are small but real when the paired test says so; the pages give intervals and p-values rather than point estimates alone. The encoders were small, the corpora ran to twenty thousand documents, and everything was in English: carry those limits into any claim built on this evidence.
