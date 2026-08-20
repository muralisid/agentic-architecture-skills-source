# Publication hold

Files listed here are part of the guide and are **not published to the site** until the condition against each is met. They stay in the repository; the site build skips them and renders any link to them as plain text.

This exists because a patent provisional is pending. The general rule it enforces: nothing describing the reserved retrieval mechanisms becomes public before the filing receipt exists.

## Held

| Path | Reason | Released when |
|---|---|---|
| `techniques/multi-view-embeddings.md` | The only file in the corpus carrying mechanism-level detail of the multi-card retrieval pattern. | The provisional filing receipt is recorded in the private program state. |

## Deliberately not held, with reasons

Five files carry a one-line reference to the pattern by name. Each is a strict subset of what was already self-published in the LinkedIn article of 30 March 2026, which described several embeddings per item, one per semantic view, each in its own index, queried by matching view. Holding them would remove cross-references without withholding anything not already public.

| Path | What it says |
|---|---|
| `GLOSSARY.md` | The definition of the term. |
| `techniques/README.md` | A list entry naming the flagship technique. |
| `research/R14-agent-data-engineering/README.md` | Scope lines naming multi-view embedding design. |
| `research/R14-agent-data-engineering/findings.md` | One sentence pointing at the technique entry. |
| `synthesis/memory-pipeline-architecture.md` | One paragraph describing the pattern at concept level. |

If you want these stripped too, add them here and the build will drop them; but the trade is losing the cross-references for material that is already public.

`knowledge/` is never published by the site build at all, so the case-study interview behind the technique has never been a publication candidate.

## Releasing

1. Delete the row from the Held table.
2. Run `cd site && npm run build`. The page appears and links to it become links again.
3. Commit. The deploy pipeline publishes it.

Nothing else needs changing. The held file is ordinary repository content throughout.
