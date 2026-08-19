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
