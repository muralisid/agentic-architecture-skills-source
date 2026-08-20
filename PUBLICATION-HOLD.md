# Publication hold

Files listed here are part of the guide and are **not published to the site or a public source repository** until the condition against each is met. The site build skips them and renders links to them as plain text.

This exists because a patent provisional is pending. The general rule it enforces: nothing describing the reserved retrieval mechanisms becomes public before the filing receipt exists.

While any row remains under Held, the canonical repository must remain private and `SOURCE_REPOSITORY_PUBLIC` must stay unset. A site filter cannot retract a tracked file from public Git history. This hold temporarily supersedes D001's public-repository assumption. If a public source mirror is needed sooner, generate it from the publishable set into a separate repository with no shared history.

Visibility check recorded 20 August 2026: GitHub reported `muralisidfn7/agentic-enterprise` as `PRIVATE`. Re-check before every release because repository visibility is external state.

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

1. Record the filing receipt and obtain explicit approval from the IP owner.
2. Delete the row from the Held table, leaving the table header intact if no held rows remain.
3. Remove only the newly released mechanism terms from the private `BOUNDARY_BLOCKLIST`; retain every term that is still reserved.
4. Confirm that the canonical repository and its history may become public.
5. Set `SOURCE_REPOSITORY_PUBLIC=true` in the build environment.
6. Run `cd site && npm run build`. The page appears, source links become links again, and all remaining held paths stay excluded.
7. Commit. The deploy pipeline publishes it.

Until those steps are complete, the held file is ordinary private repository content and the generated site is the only public evidence view.
