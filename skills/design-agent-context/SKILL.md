---
name: design-agent-context
description: >-
  Design what reaches an AI agent's context so it answers well: nine patterns
  for representing documents (several vectors per item rather than one), keeping
  keyword search fused in, deriving view taxonomies from the corpus, conditioning
  on the instruction at query time, spending the model on design rather than on
  reading everything, gating as a quarantine, diversifying inside a gated pool,
  and measuring against a matched control. Each pattern carries the measurement
  behind it. Use whenever designing or reviewing retrieval, RAG, chunking,
  embeddings, topic modelling, result selection or agent memory, whenever
  choosing how to index a corpus, or whenever someone proposes conditioning an
  index on the task.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: task
---

# Design what reaches the agent's context

Nine patterns, in the order you would apply them. `references/01-the-patterns.md` is the catalogue: each pattern says what to do, what it buys, when it does not apply, and the evidence. The other files are that evidence, for when a recommendation needs to be defended rather than followed.

## The patterns, in short

1. **Give a document several vectors.** One embedding averages everything the document says. A pooled index fell from 0.815 to 0.294 nDCG@10 as documents grew from one aspect to ten; any multi-vector representation held above 0.63.
2. **Make every representation beat a matched baseline.** Most of the gain is capacity, not cleverness: a blind three-word window recovered 0.610 of the 0.674 that purpose views gained. Start with plain chunks at the same budget and promote views only on a measured win.
3. **Keep keyword search in the loop**, fused by rank. Identifiers, names and quotations are where dense retrieval fails silently.
4. **Derive the views from the corpus**, never from your goal. A corpus sample was worth +0.224; the objective cost 0.068, and the harm grew with the context supplied.
5. **Condition on the instruction at query time** with a retriever trained for it, not by rebuilding the index.
6. **Let the model design and name; let machinery execute.** About two hundred times cheaper at comparable topic granularity, as a constant factor rather than a widening one.
7. **Gate as a quarantine, not as a saving.** A good gate discards a third of a corpus at high recall, and the order of magnitude comes from pattern 6.
8. **Diversify inside a gated pool**, with a distractor guard, when the question has several answers.
9. **Measure with a matched control**, rules fixed first, every arm reported.

## Using this well

Apply patterns 1 to 3 first: they carry most of the value and need no new machinery. Patterns 4 to 8 are workload-dependent, and pattern 9 is what tells you which of them are true for your corpus rather than for ours.

When a recommendation is challenged, go to the evidence rather than restating the pattern:

| Question | File |
|---|---|
| How much does one vector actually lose? | `references/02-aspect-dilution.md` |
| Where do purpose views lose? | `references/03-real-prose.md` |
| What does the gate really save? | `references/04-gate-and-economics.md` |
| Which diversification operator, and what does it cost? | `references/05-diversity-and-consumer.md` |
| Why not condition the index on the goal? | `references/06-why-not-to-condition-on-the-objective.md` |
| How should I test this on my own corpus? | `references/07-how-to-test-a-context-design.md` |
| What does the literature say? | `references/08-reading-list.md` |
| When is a knowledge graph worth it? | `references/10-technique-knowledge-graphs.md` |

Search rather than read end to end: `grep -n "nDCG@10" references/*.md` finds the measurements, `grep -n "Apply it when" references/01-the-patterns.md` finds the applicability rules.

## Carrying the numbers honestly

Every figure traces to a named experiment artifact. Differences of about 0.03 nDCG@10 on a few hundred queries are small but real when the paired test says so, and the pages give intervals rather than point estimates alone. The encoders were small, the corpora ran to twenty thousand documents, and everything was in English: say so when a claim is carried into a different setting.

Four things this evidence does not support, and which should not be asserted: that alignment rather than capacity explains the multi-vector benefit; that the two-pass cost advantage widens with corpus size; that the gate is where the saving comes from; and that the right amount of diversity depends on whether a model or a person reads the results.
