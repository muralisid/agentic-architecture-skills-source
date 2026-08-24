# The site

A [Fumadocs](https://fumadocs.dev) documentation site (Next.js, deployed on Vercel) that renders the guide corpus and publishes it as installable Agent Skills.

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

Set `NEXT_PUBLIC_SITE_URL` to `https://www.agenticarchitectureskills.com` so canonical links, Open Graph images, `sitemap.xml`, `robots.txt` and the skill manifests resolve correctly. Names, hosts and repositories all come from `lib/site.config.mjs`; change them there, not in the pages.

## What the site provides beyond the repository

Sidebar navigation and breadcrumbs, full-text search (Orama, built at compile time), per-page Open Graph images, `llms.txt` and `llms-full.txt` for machine consumption, per-page markdown export, a sitemap, and dark mode.

## Live

https://www.agenticarchitectureskills.com

The previous deployment host redirects to it permanently.

## The skill bundles

`npm run skills:build` generates the published Agent Skills from `skills/catalog.json` and the hand-written `skills/<name>/SKILL.md` bodies, writing:

- `public/.well-known/agent-skills/` : the discovery index, one `.zip` per skill, and a browsable `SKILL.md` beside each
- `lib/skills-catalogue.json` : what the site's catalogue page renders

Both are generated and git-ignored. `npm run skills:export` additionally writes `skills-export/`, the tree published to the public repository, including the plugin and marketplace files.

Bundles are byte-reproducible: the archive writer fixes entry order, timestamps, attributes and compression, so the same content always produces the same sha256 digest. `npm run validate:skills` checks the written output against the Agent Skills specification and confirms every digest matches its bundle.

To publish to `muralisid/agentic-architecture-skills`, the guard workflow needs one repository secret, `SKILLS_DEPLOY_KEY`: the private half of a deploy key with write access on that repository. Without it the workflow still builds and validates the bundles, and simply reports that it did not publish.

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
