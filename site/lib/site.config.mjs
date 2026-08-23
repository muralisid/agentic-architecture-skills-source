/**
 * The single source of the site's names, URLs and repositories.
 *
 * Plain ESM on purpose: the build scripts (.mjs) and next.config.mjs import it
 * directly, and lib/shared.ts re-exports it for the TypeScript surface. Change
 * a name or a host here and every generated artifact follows: metadata, the
 * sitemap, robots, Open Graph cards, the content sync footer, the skill
 * manifests, and the wall chart's as-of line.
 */

export const siteName = 'Agentic Architecture Skills';
export const siteShortName = 'Architecture Skills';
export const siteDescription =
  'Architecture skills for the agentic enterprise and for software that agents consume first. Read the guide, or install it into your agent.';

/** Production host. Set NEXT_PUBLIC_SITE_URL in the deployment environment. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agenticarchitectureskills.com').replace(
  /\/$/,
  '',
);

/** Hosts that served the site before the domain moved; redirected permanently. */
export const legacyHosts = ['agentic-enterprise-ten.vercel.app'];

/** The canonical content repository: this repo. Private unless SOURCE_REPOSITORY_PUBLIC is true. */
export const sourceRepo = { user: 'muralisidfn7', repo: 'agentic-architecture-skills-source', branch: 'main' };

/** The public repository the skill bundles are published to, and its install name. */
export const skillsRepo = { user: 'muralisidfn7', repo: 'agentic-architecture-skills', branch: 'main' };

/**
 * The as-of date on the wall chart's product names. The two-monthly refresh
 * routine edits this string and nothing else when the products are re-verified.
 */
export const wallChartAsOf = 'August 2026';
