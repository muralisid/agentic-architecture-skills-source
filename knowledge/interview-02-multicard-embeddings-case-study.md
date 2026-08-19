# Interview 02: the multi-card embeddings case study

Status: captured conversationally 2026-08-19; answers synthesized into the published baseline chapters. Full capture held privately per the working protocol.
Purpose: capture the flagship production technique for the techniques library in enough detail to reconstruct the mechanism and the economics. Feeds `techniques/multi-view-embeddings.md` and the R02/R14 challenged-defaults debate (graph databases vs embeddings-and-topic-modelling retrievers).

## Questions

### Context and problem
1. What was the product and use case? What was the corpus (you mentioned social media data): volume per day, total size, languages, noise level?
2. What did the naive approach look like (processing the full corpus through an LLM), and what did it cost or fail at? Any numbers you recall, even order of magnitude, are valuable.

### Mechanism
3. What exactly is a "card" in your multi-card embeddings design? What cards or views did you create per content item, and what functional knowledge defined them?
4. How did the LLM guide the topic taxonomy: one-time bootstrap, periodic refresh, or continuous? What did you ask it to produce, and how was its output validated?
5. Topic modelling mechanics: which algorithm (BERTopic, LDA, custom clustering), which embedding model, what clustering granularity, and how were topics labeled?
6. How did retrieval work at query time: which cards were searched for which question types, how were results ranked, and was there a fusion step?

### Evidence
7. Economics: before/after cost comparison (LLM tokens avoided vs embedding and compute cost added). What was the net saving, roughly?
8. Quality: how did you measure that the multi-card retriever was better (recall/precision, human evaluation, downstream task metrics)? What was the improvement?

### Limits and generalization
9. Where did it break or underperform? What content or question types did not fit the card design?
10. Operations: re-embedding cadence, taxonomy drift handling, pipeline tooling used.
11. The honest counterfactual: would a knowledge graph have helped in this case? Where in general do you concede a graph wins, and where is it hype?
12. What is reusable as a general pattern for any enterprise corpus vs specific to social media data?
