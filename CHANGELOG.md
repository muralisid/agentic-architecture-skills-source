---
reader_summary: "Review material changes to the guide, including corrections that may affect an earlier decision."
audience: ["All guide readers","Guide contributor"]
decision_or_output: "Determine whether a guide change requires an architecture, roadmap, or evidence review."
prerequisites: ["/docs/about-evidence"]
reading_time: "2 minutes"
evidence_status: "Maintainer change record linked to the repository history."
next: "/docs/contributing"
---

# Changelog

Revisions to the published guide. Newest first. Volatile facts also sit on the [re-verification list](RE-VERIFICATION.md), which is reviewed quarterly.

## 2026-09-12

**The intelligence ladder is now a run of slides.** Each of the nine pages shows one idea per slide, with a short explanation under it. New words are explained in plain words before they are named. Each page opens with what it covers and closes with what to remember. The pages hold 213 slides, up from 155 illustrations and prose sections. The bank example is gone, so the theory stands on its own. No new research: every claim and source is one the pages already carried.

## 2026-09-11

**Distillation pay-back rule corrected.** The distillation page gave two call-volume thresholds for when distillation pays back. The bank example sat between them. The page's own evidence note also says no general number is claimed. The thresholds are replaced by the pay-back arithmetic itself, and the bank example now points to it.

**Memory on the intelligence ladder.** Step 2 now covers what an agent remembers, using positions the guide already held: memory graded by how long it lasts, the source text kept, facts dated, every write checked before it is kept, and topics treated as search labels rather than memory. Step 1 treats a growing playbook as memory that passes the tested gate. Step 3 treats a record kept past the run as memory. The Deck B distinction now says facts about customers and cases belong in neither training method. The evaluation suite adds the cases memory breaks. No new research: every claim comes from pages and sources already on the site.

**Ladder illustrations corrected.** The Deck A overview had garbled labels on step 3; they are fixed, and step 2 now names memory. The instructions example labelled the naive draft as approved examples and said instructions shape how an analyst uses facts; both are corrected. The prompt illustration labelled the model as a stage called "examples beat adjectives"; it now reads "The model". The distillation illustration now names the pre-fine-tune model. Titles no longer use em dashes, and labels no longer use arrow characters or curly quotes. The Step 3 loop illustration is redrawn so the gateway checks each call before the tool runs, as the page says. One new illustration shows what an agent remembers.

## 2026-08-23 (second release)

**Renamed.** The guide is now Agentic Architecture Skills, published at www.agenticarchitectureskills.com, with two tracks: the agentic enterprise, and software built for agents to consume (D036). The previous deployment host redirects permanently.

**Archived (D038).** The vendor hub (index, coverage matrix, adoption pathways and ten profiles), the per-layer vendor tables, the roadmap checklist, the vendor question bank, the vendor scorecard and the fourteen research briefs are no longer published. They remain in the repository under `archive/`, unmaintained, with the reasoning recorded there. Roughly 18,000 words of material that dated within a quarter left the site. The one-page wall chart still names representative products and is now re-verified every two months. The roadmap checklist's spine and gates are absorbed by the first-agent pages; the evaluation questions that mattered survive in the decision catalog.

**Published as Agent Skills (D037).** Twelve skills, generated from the site's own pages: eight named for what an architect is doing (review an architecture, map the deterministic boundaries, assess readiness, choose first use cases, govern tool access, design the knowledge pipeline, build evals and evidence, size supervision and cost) and four carrying a whole section. They install into Claude Code, claude.ai, Codex, Cursor, Gemini CLI and Copilot. A discovery index at `/.well-known/agent-skills/index.json` carries a sha256 digest per bundle, and the bundles are byte-reproducible, so a digest changes only when the content does. The readiness skill ships a scorer that reproduces the published assessment's own rules.

**Positions unchanged by the pruning.** No verdict, finding or source moved. Every claim on the layer pages still carries its own dated evidence.

## 2026-08-23

**Published.** A research section (`/research`, nine pages) documenting the multi-card retrieval experiments: five rounds on public corpora between 2026-08-19 and 2026-08-22, with human relevance judgements where they exist, seeded and replicated on a second machine. The section carries the experiments, the adversarial review and the five headline reversals, the approach the evidence supports, and the reading list behind it. The site's visual design was aligned with the maintainer's marketing site (warm paper surfaces, serif display headings, an ember accent, a floating pill header and a full footer).

**The home page leads with the one-page chart.** The landing page now opens on the single-picture target-state architecture rather than a fourteen-item index of the layers: the chart is the technical artefact, and a list of layer names read as a table of contents. The layer grid is gone from the home page; the layers remain in the navigation, in the chart itself, and one click away from it.

**Fixed: the footer said "Maintained by" with a GitHub link** rather than the author byline introduced with D040, because a multi-line replacement silently matched nothing. It now carries the same byline as every page. The footer also still linked the archived vendor research; that link is removed.

**Authorship and citation (D040).** Every page now carries a visible byline linking to the author, a "Cite this page" block with a copyable citation and the licence, and structured data: one `Person` entity with `sameAs` links to LinkedIn and GitHub, referenced by a `TechArticle` node per page with its published and modified dates from the file's git history. The same attribution travels in the Markdown twin of every page, in `llms.txt` and `llms-full.txt`, and inside every published skill bundle. A new [about page](/about) is the author's entity home.

**Fixed: the Markdown twin of every page returned 404.** Appending `.md` to a URL, and requesting `Accept: text/markdown`, both silently failed because the rewrite pattern was built from a documents route of `/`, which asked for two leading slashes and matched nothing. Both work now, which restores the main affordance a model uses to read a page as clean text.

**Research became patterns (D039).** The research section is now a pattern catalogue at `/patterns`: nine named patterns for giving an agent the right context, each stating what to do, what it buys, when it does not apply, and the measurement behind it. The experiment pages remain as the evidence for each pattern. Two were retitled to say what they are for: the objective-conditioning rounds became "Why the view taxonomy comes from the corpus, not the goal", and the method page became "How to test a context design". The `/research` routes redirect. The skill that carried the experiments is now `design-agent-context` and leads with the patterns.

**Publication hold released (D035).** The maintainer decided not to pursue patent protection for the multi-card retrieval mechanisms. The held technique entry is published with a status note that the research pages supersede it, and the hold register stays in place, empty, as the build's mechanism.

**Positions revised by research.**

- Multi-view (multi-card) embeddings moved from "validated in one domain, transfer conditional" to a measured result: several vectors per document beat one decisively; purpose-specific views beat matched fixed-window chunks only where queries target one aspect (+0.188 nDCG@10 at ten aspects) and lose where queries concern whole documents (−0.032 to −0.042 on human-judged scientific abstracts). Recorded as CD-25 and in the glossary, the memory-pipeline chapter, and the R14 findings.
- The economics of the two-pass design are stated as a constant-factor saving of roughly two hundred times at comparable topic granularity. The earlier claim that the advantage widens with corpus size was a clustering artefact and is withdrawn.
- The relevance gate is described as a quarantine contributing a linear factor of one to two, not as the source of the saving.

**Claims investigated and withdrawn**, recorded so they are not repeated: that purpose alignment rather than embedding count explains the multi-vector benefit (a blind three-word window recovers 0.610 of the 0.674 gain on LIMIT); that the right amount of result diversity depends on whether a model or a person reads the results (the measured interaction vanishes under a cross-family judge); and that conditioning the view design on the objective, the business context, the schema, or a late selection step produces a better index (worse in every form tested, including real instruction-following data).

## 2026-08-19

The guide was researched, written and published on this date. Entries below record what landed and, where research changed a previously published position, what changed and why.

**Published.** Vision and target state; the Autonomy-Learning maturity model; the size-by-gravity archetype grid; light and heavy readiness assessments; all 14 layer research tracks; seven cross-layer synthesis chapters; the use-case portfolio framework and the roadmap generator; seven department and four vertical blueprints; the vendor hub with question bank, scorecard, coverage matrix, ten profiles and adoption pathways; the documentation site.

**Positions revised by research, in the order they were revised.**

- The definition of an agent was reframed. Learning moved from the definition to an orthogonal axis of the maturity model, because no mainstream definition requires it (D010).
- Adoption sequencing was split into two tracks, observed and recommended, because the adoption data contradicted the recommended order (D011).
- The deterministic boundary was sharpened to "models may inform, never decide" after evidence showed three of the four irreversible zones already run probabilistic signals internally (D013).
- Compliance posture became tiered rather than uniform after the AI Omnibus deferred Annex III obligations to 2 December 2027 (D014).
- Identity levels were reassigned by capability surface rather than by platform enrollment, once per-user licensing removed the cost brake on presence identity (D015).
- Rule promotion was re-gated on counterexample survival rather than frequency, after 2026 research found generation rather than promotion to be the bottleneck (D018).
- The accountable-human sponsor moved from presence identity to access identity, because the sponsor attribute already exists one level down (D019).
- An oversight-capacity gate was added to the higher autonomy levels, expressed as a burst rate, because no credible human-to-agent supervision ratio has ever been published (D022).
- The founding metaphor was corrected in the vision chapter. The residual-work claim stands and is sourced to 1983; the headcount extrapolation was removed, and the widely circulated lights-out crew figure is corrected in the text (D021).

**Claims investigated and rejected**, recorded so they are not repeated: a funding story about an observability vendor that traced to an AI content farm and was contradicted by the verified acquisition record; a single-versus-multi-agent token comparison that misread a benchmark paper's domain fingerprint; and the "128 robots, nine workers" automated-plant figure, where primary reporting says several dozen workers per shift.
