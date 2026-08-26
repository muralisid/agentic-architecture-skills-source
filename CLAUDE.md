# Working conventions for this repository

This file governs AI-assisted sessions and human contributors alike.

## What this repo is

The research corpus and content source for Agentic Architecture Skills (formerly The Agentic Enterprise Architecture Guide), a public, vendor-neutral reference published at agenticarchitectureskills.com and distributed as installable Agent Skills. See README.md for the map and DECISIONS.md for the decision log. The full program plan lives with the maintainer; the phase status table in README.md is the public view.

## Writing style (hard rules)

- Never use em dashes. Use commas, colons, semicolons, parentheses, or separate sentences.
- Plain, factual statements. State facts and let conclusions be implied. No dramatic hooks, thesis statements, or aphorisms.
- Define terms in GLOSSARY.md once and use them consistently; do not redefine per page.

## Source hygiene (the review bar for every PR)

- Every claim carries a dated source link. Primary sources preferred: vendor docs, engineering blogs, regulator texts, named analyst reports.
- Vendor-published numbers are explicitly flagged as vendor-published.
- Product facts (pricing, GA status, names) carry an as-of date and are added to the re-verification list.
- Simplest credible alternative test: nothing is recommended on adoption momentum or vendor narrative; every recommended component must beat the simplest credible alternative on evidence and enterprise economics.
- `inputs/` holds raw unvetted material; nothing is cited into guide content directly from `inputs/` without verification.

## Working protocol (every phase and every track)

1. Draft the scope plus a short set of targeted POV questions for the maintainer (typically 5 to 8)
2. Maintainer answers; the POV is captured into `knowledge/` and treated as a first-class, citable source
3. Scope is finalized; research runs against it
4. Draft findings, including the mandatory Challenged Defaults section and the Cross-Cutting Concerns section (C1 to C10, see research/_TEMPLATE/findings.md)
5. Challenge round: the maintainer challenges with technical depth; contested points trigger additional targeted research; disagreements resolve by validated technical reality and enterprise economics, not by either author's preference
6. Joint review at the gate; content is finalized only after the POV step, the challenge round, and the review

## Git workflow

- Routine content and site work commits directly to `main`. Every push to `main` deploys, so a pull request is for changes that need reading as a whole before they are public, not for ordinary work.
- **Commits must be authored by a GitHub account with access to the Vercel project, or the deployment is refused.** `murali.sid@gmail.com` resolves to `muralisid`, which has access. `murali@fn7.io` resolves to the separate `muralisidfn7` account, which does not, and Vercel rejects those commits with "Git author must have access to the project" or "Deployment was blocked". This applies to merge commits as well, which take the identity of whoever clicks Merge, so merge from an account that has access.
- Branch naming when a branch is used: `phase-N/short-topic` or `rNN/short-topic` for track work.
- Third-party IP: do not commit third-party decks, slides, or documents. Store extracted structure notes and citations instead, with permission status flagged. See inputs/README.md.
