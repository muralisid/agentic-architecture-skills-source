# Agentic Architecture Skills

The content source for [agenticarchitectureskills.com](https://www.agenticarchitectureskills.com): an open, vendor-neutral reference for the architecture of the agentic enterprise, and for software built to be consumed by agents. The site publishes its content as installable Agent Skills.

An open, vendor-neutral reference for the architecture of the agentic enterprise: what an enterprise looks like when every department and every role works with and manages a set of AI agents, agents perform the routine work, and humans set intent, supervise, and handle exceptions.

The mental model comes from a modern bottling plant: the floor runs without humans doing the physical work, while a few skilled people guide the line and step in when bottles stack wrong or a machine jams. Knowledge work is heading to the same shape. This repository researches, challenges, and documents how to get there responsibly, layer by layer of the enterprise landscape.

## What this repository produces

A complete published guide (docs site, built from this repo) covering:

1. **Vision and target state**: the Autonomy-Learning maturity model (A x L) and a layered master architecture
2. **Current state baselines**: enterprise archetypes and maturity readiness assessments (data, security)
3. **14 research tracks**: one per enterprise landscape layer, from infrastructure to operating model
4. **Production techniques library**: use-case-driven data curation and cost engineering patterns with real economics
5. **Roadmap framework**: checklist-governed; your answers on economics, sovereignty, risk, and audience produce your roadmap variant
6. **Vendor analysis**: a neutral question bank, a vendor-by-layer coverage matrix, and adoption pathways by vendor gravity
7. **Blueprints**: department and vertical target states (utilities & energy, banking & financial services, manufacturing & supply chain, public sector)

## Editorial stance

- **Evidence over buzz.** Nothing is recommended on adoption momentum or vendor narrative. Every recommended component must beat the simplest credible alternative on technical merit and enterprise economics (the "simplest credible alternative test").
- **Challenged defaults.** Every research track names the hyped or default choices at its layer and analyzes them honestly against cheaper, simpler alternatives.
- **Deterministic boundaries.** Security, identity, and access control are always deterministic; probabilistic reasoning runs inside them, never instead of them.
- **Sources are dated and flagged.** Vendor-published numbers are labeled as such. Volatile facts carry as-of dates and sit on a re-verification list.

## Repository map

| Path | Contents |
|---|---|
| `research/` | The 14 layer tracks (R01 to R14), each with brief, findings, vendor map, and sources |
| `synthesis/` | Cross-layer artifacts: maturity model, economics model, sovereignty matrix, concerns-by-layers matrix, memory-pipeline architecture, master target state |
| `techniques/` | Production-tested patterns with token-economics math |
| `frameworks/` | Roadmap checklist, readiness assessments, vendor question bank |
| `blueprints/` | Department and vertical target-state blueprints |
| `vendors/` | The vendor hub: coverage matrix, profiles, adoption pathways |
| `knowledge/` | Captured practitioner knowledge (structured interviews), citable like any source |
| `inputs/` | Raw canonical inputs (unvetted research material, not guide content) |
| `product/` | The authored site pages: the architecture, the fourteen layers, the decision catalog, and the research section documenting the retrieval experiments |
| `site/` | The docs site. Generated from the markdown above; the repo stays the source of truth |
| `CHANGELOG.md` | Published revisions, including positions research changed |
| `RE-VERIFICATION.md` | Volatile facts and when to re-check them |
| `GLOSSARY.md` | Canonical definitions used across the guide |
| `DECISIONS.md` | Program decision log |

## Status

| Phase | State |
|---|---|
| 0. Scaffolding | Complete |
| 1. Vision and target state | Baseline published: vision essay and the A x L maturity model |
| 2. Current state and maturity references | Baseline published: size-by-gravity archetype grid and light/heavy readiness assessment |
| 3. Layer research (pilot: R03 Integration fabric) | Complete: all 14 tracks published |
| 4. Synthesis + techniques library | Synthesis complete: master target state, concerns matrix, memory pipelines, economics, sovereignty, identity and security, learning loops. Techniques library open and growing |
| 5. Roadmap framework | Published: nine-factor roadmap generator and the use-case portfolio framework |
| 6. Blueprints | Published: 7 department and 4 vertical blueprints |
| 7. Vendor analysis | Published: question bank, scorecard, coverage matrix, 10 profiles, adoption pathways |
| 8. Publication | Site built and verified: Fumadocs on Next.js, ready to deploy on Vercel with root directory `site` |
| 9. Research section | Written 2026-08-23: the multi-card retrieval experiments (five rounds, public corpora, negative results included) and the recommended approach, at `/research` |

## Contributing

Contributions are welcome once tracks open. Read [CONTRIBUTING.md](CONTRIBUTING.md); the source-hygiene rules there are the review bar for every pull request. All PRs are reviewed and merged by the maintainer.

## Reading this as a website

The corpus renders as a documentation site with search, navigation and per-page source links. Run it locally:

```bash
cd site && npm install && npm run dev
```

Deploy on Vercel by importing this repository with the root directory set to `site`. See [site/README.md](site/README.md).

Maintainer: [@muralisidfn7](https://github.com/muralisidfn7)

## License

Dual licensed: content (markdown, research, guide text) under [CC BY-SA 4.0](LICENSE-CONTENT.md); code (site, scripts) under [MIT](LICENSE).
