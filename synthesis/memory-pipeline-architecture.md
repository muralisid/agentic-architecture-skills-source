---
reader_summary: "Trace how enterprise content becomes permission-aware context and how durable memory acquires ownership, retention, consent, and erasure obligations."
audience: ["Enterprise architect", "Data architect", "CIO/CTO"]
decision_or_output: "Choose the memory tier and governance obligations for each workload, then define the curation pipeline that feeds it."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "7 minutes"
evidence_status: "Evidence-informed architecture with measured retrieval findings and clearly identified open governance gaps."
next: "/docs/architecture/economics-model"
---

# The Memory-Pipeline Architecture

As of August 2026. Phase 4 synthesis, drawn primarily from R14 agent data engineering and R02 data platform, with governance from R11 and R10.

---

## The claim this chapter defends

An agent's quality is set by what reaches its context, and what reaches its context is the output of a pipeline that most enterprises have not built. The evidence is direct rather than theoretical: a curated domain knowledge base cut hallucination from 35% to 6%, and growing a corpus from 54 to 1,128 uncurated documents dropped accuracy from 75% to under 40% until domain scoping fixed it. More data made the agent worse. That is the finding the whole discipline rests on.

The pipeline is therefore not a data-engineering detail underneath the architecture. It is the architecture, for anything an agent knows.

## Five tiers, and what actually feeds each

The tiers grade persistence. Governance tightens as persistence rises, because obligations attach to durability rather than to content.

| Tier | What it holds | Fed by | Lifetime | Governance weight |
|---|---|---|---|---|
| M1 Thread | The current conversation or run | The interaction itself | The run | Engineering discipline: compaction, tool-result clearing, structured notes |
| M2 Retrieved knowledge | Evidence assembled for the current turn | The curation pipeline below | The turn | Permission-aware retrieval; provenance on every span |
| M3 Session | State across a working session or long-running task | Session artifacts and durable execution state | Hours to days | Residency and classification inheritance; bounded retention |
| M4 Entity memory | Durable profiles of customers, assets, cases, employees | Promoted learnings plus governed source syncs | Months to years | Consent, retention, erasure, ownership. Real regulatory weight |
| M5 Cross-domain memory | Organisational knowledge spanning functions | Curation proposals promoted through the flywheel | Indefinite | Everything M4 carries, plus the widest poisoning blast radius |

The architectural line runs between M3 and M4. Everything at M3 and below is transient enough to be treated as engineering. Everything at M4 and above is a record, and a record has an owner, a retention schedule and an erasure obligation whether or not anyone designed one.

## The pipeline, stage by stage

Each stage has a published failure mode. They are given here because the stages are usually skipped in the order listed.

**1. Ingest with provenance.** Connector-level source authenticity. Nothing unattributed enters grounding or memory. Provenance is attached here, at parse time, carrying page and cell level identifiers, because provenance added later is provenance that will be wrong.

**2. Parse with fidelity.** Parsing quality caps everything downstream: even the best document parsers lose at least 14% of retrieval performance against ground-truth structure. Layout-aware parsing is the floor, and parsing fidelity deserves spot-check metrics rather than trust.

**3. Chunk per corpus.** There is no universal recipe. Chunking is evaluated per corpus against that corpus's real questions. Adopting one enterprise-wide chunking strategy is the cheapest-looking decision in the pipeline and one of the more expensive.

**4. Enrich contextually.** The best-evidenced single upgrade in the pipeline: contextual enrichment reduced retrieval failures by 49%, and by 67% combined with reranking. Add it where retrieval quality matters, which is not everywhere.

**5. Embed, versioned from day one.** Embedding model versions are stamped on every vector. The hidden cost is the model upgrade: a full-corpus re-embed runs from hours on multi-GPU hardware to four figures through an API. The disciplines that contain it are migrating only for eval gains above a stated threshold, blue and green index swaps, and cross-model conversion where applicable.

**6. Index with permissions carried.** ACLs crawled into chunk and vector metadata, retrieval pre-filtered on the caller's live identity, and fail-close when permission sync lags. This is not optional and the reason is specific: embeddings are recoverable text, with 92% exact reconstruction demonstrated for short inputs, so a vector inherits its source's classification, ACLs and privacy obligations in full.

**7. Retrieve with refusal available.** Weak evidence produces a refusal or an escalation, not an answer over it. Semantic contracts gate anything numeric, which is the mechanism that converts a class of silent wrong answers into visible refusals.

**8. Write back under governance.** Memory writes carry provenance and land in quarantine before promotion. The exposure is quantified: poisoning under 0.1% of a memory or knowledge base achieved over 80% attack success, and query-only memory injection reached 98.2% success. Memory poisoning is named first-class in the current agentic failure-mode taxonomy.

**9. Promote through the flywheel, or not at all.** Movement into M4 and M5 is a gated promotion, never an accumulation. The gate is the one established in R06: counterexample survival and eval regression rather than frequency, the promoted artifact landing outside the model, and a demotion path that is actually exercised.

## Purpose-scoped curation is what makes this affordable

The unit of curation is the use case, not the source system. This is the single decision that makes the pipeline economically viable at every archetype rather than only at enterprises with large data organisations.

Two consequences follow. First, curation labour is sized to the risk of the use case: automated with calibrated judges and sampled audits where volume demands it, human where liability demands it, always under a named accountable owner. Second, object-store vector pricing has tilted the economics toward many small purpose-scoped indexes rather than one enterprise index, which happens to be the same direction the accuracy evidence points.

Multi-view embedding is one instance of purpose-scoped curation: representing the same content through several semantic perspectives, indexed separately, so precision and recall can be tuned per question type at embedding cost rather than at model cost. The guide tested it in five rounds on public corpora in August 2026. Several vectors per document beat one decisively; purpose-specific views beat matched fixed-window chunks only where queries target one aspect of aspect-rich items and lose where queries concern whole documents; and conditioning the view design on the objective, the business context or the schema made retrieval worse in every form tested. The measured evidence and the design that survived are on the site's research pages (`/research`); the rule is chunks first, views only on a measured win against a control with the same embedding budget, keyword search fused throughout.

## Governance that has to be designed, not inherited

**Erasure cascades.** A deletion request must reach raw stores, derived memories, vectors, traces, telemetry and eval datasets. The published mechanics: deleted-vector exclusion sets consulted before approximate-nearest-neighbour queries, purpose-scoped namespaces, and deletion exposed as an audited callable operation. Erasure completion time across tiers is a metric, not an assumption.

**Residency inherits.** Embeddings, memories and summaries built from in-region data are in-region data. Region-scoped pipelines and indexes follow.

**Bitemporal facts.** Event time and ingestion time are recorded separately so a superseded fact is invalidated without destroying the history that explains an earlier decision. Stale grounding is a named production failure mode with a documented legal cost.

**The gap stated honestly.** Many-to-one derived artifacts, such as cross-document summaries and extracted memories, have no fully published permissions solution. Current practice stamps the intersection of source permissions, taking the most restrictive, and re-derives on ACL change. This is emerging practitioner-grade work, not a settled pattern, and the guide flags it as such rather than presenting it as solved.

## Where the pipeline sits in each archetype

- **Global regulated enterprise.** The pipeline sits on top of the existing lakehouse rather than replacing it. The hard part is not construction, it is ACL propagation and erasure cascade across an estate that predates the requirement.
- **Mid-market.** The pipeline is the one thing worth building rather than renting, because vendor rails supply retrieval and do not supply curation. Scope it to two or three use cases and appoint owners.
- **Digital native.** Retrieval is already strong and curation ownership is the gap. The cheap early intervention is a named owner per corpus and provenance from parse time, both of which are expensive to retrofit.

## Metrics

Retrieval quality per corpus, with coverage-aware measures where diversity matters. Parsing fidelity spot checks. Hallucination and refusal rates against curated versus uncurated baselines. Permission-propagation coverage across derived artifacts. Erasure completion time across tiers. Memory-write quarantine rates. Embedding drift alerts. Corpus freshness against source change lag.

## Migration order

Appoint corpus owners. Fix parsing. Evaluate chunking. Version embeddings. Wire ACL propagation. Stand up memory write governance **before** enabling durable memory. Add erasure mechanics with the first personal data, not after it. Stop buying ingestion tools without provenance, and memory features without deletion.

## Sources

Full evidence base in research/R14-agent-data-engineering/sources.md and research/R02-data-platform/sources.md. Memory-service benchmark claims are vendor-authored and publicly disputed between vendors; the guide's position is to treat all of them as contested and run your own acceptance suite.
