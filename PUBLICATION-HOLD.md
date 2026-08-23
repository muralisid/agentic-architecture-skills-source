# Publication hold

Files listed in the Held table are part of the guide and are **not published to the site or a public source repository** until the condition against each is met. The site build skips them and renders links to them as plain text. The register stays in place as the mechanism: the site build, the boundary scan, and the CI guard all read it.

**Status, 23 August 2026: the register is empty.** The hold existed because a patent provisional was pending. On 2026-08-23 the maintainer decided not to pursue patent protection for the multi-card retrieval mechanisms, after five rounds of experiments found no supported technical effect beyond the corpus-derived representation that prior art already covers (see the site's research section). The previously held technique entry is published, carrying a status note that the research pages supersede it. D033's suspension of the public-repository assumption ends with this release; making the canonical repository public is the maintainer's own action.

## Held

| Path | Reason | Released when |
|---|---|---|

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

## Release record

| Path | Held from | Released | Decision |
|---|---|---|---|
| `techniques/multi-view-embeddings.md` | 2026-08-20 | 2026-08-23 | Maintainer decision: no patent filing; the experiments are published as the research section and supersede the entry |
