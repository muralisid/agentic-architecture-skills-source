# The guide site

A [Fumadocs](https://fumadocs.dev) documentation site (Next.js, deployed on Vercel) that renders the guide corpus.

## How content gets here

**The repository is the source of truth; this site is a view of it.** No guide content is authored in `site/`. Instead, `scripts/sync-content.mjs` reads the markdown in `research/`, `synthesis/`, `techniques/`, `frameworks/`, `blueprints/`, `vendors/`, plus `GLOSSARY.md`, `DECISIONS.md`, `CHANGELOG.md` and `RE-VERIFICATION.md`, and generates `content/docs/`.

The sync step:

- derives the page title from the H1 and the description from the standfirst, removing both from the body so they are not duplicated on the page
- rewrites relative markdown links to site routes, and falls back to a GitHub link when the target is not published on the site
- turns bare repo paths mentioned in prose into links
- appends a footer linking each page to its source file
- writes `meta.json` files that control sidebar order and section titles

`content/docs/` is generated and git-ignored. Edit the repository markdown, not the generated output.

## Commands

```bash
npm install
npm run dev     # syncs content, then starts the dev server
npm run build   # syncs content, then builds
```

## Deploying to Vercel

Import the repository and set **Root Directory** to `site`. Framework preset is Next.js; the default build command runs the sync step first.

Set `NEXT_PUBLIC_SITE_URL` to the production URL so canonical links, Open Graph images, `sitemap.xml` and `robots.txt` resolve correctly.

## What the site provides beyond the repository

Sidebar navigation and breadcrumbs, full-text search (Orama, built at compile time), per-page Open Graph images, `llms.txt` and `llms-full.txt` for machine consumption, per-page markdown export, a sitemap, and dark mode.

## Live

https://agentic-enterprise-ten.vercel.app

## Automatic deployment

Vercel's Git integration builds and deploys on every push to `main`. Two gates run inside that build, so the protection travels with the deployment rather than living only in CI:

1. `scripts/check-content.mjs`: no em dashes in guide content, no broken internal links. This runs through `npm run validate` on every production build.
2. `scripts/boundary-scan.mjs`: no reserved terms from the private publication blocklist, which is supplied as the `BOUNDARY_BLOCKLIST` environment variable and never committed. A missing, empty, or malformed list fails every CI or hosted build.

The publication hold always applies. A local build without `BOUNDARY_BLOCKLIST` warns because contributors may not possess the private list. CI and hosted builds refuse to continue without a valid list containing at least one HARD term.

`.github/workflows/guard.yml` runs the same two checks on pull requests, where the blocklist comes from the `BOUNDARY_BLOCKLIST` repository secret and a missing secret fails the check.

Run either gate locally:

```bash
node scripts/check-content.mjs
BLOCKLIST=/path/to/blocklist.txt node scripts/boundary-scan.mjs
```
