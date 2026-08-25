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

/** Hosts that served the site before the domain moved; redirected permanently. */
export const legacyHosts = ['agentic-enterprise-ten.vercel.app'];

/** The domain this site is published on, whatever a deployment environment says. */
export const canonicalUrl = 'https://www.agenticarchitectureskills.com';

/**
 * Where /content is served from.
 *
 * The blog is published by a separate system and proxied in under this site's
 * domain, so readers and search engines see one site rather than two. It is
 * rewritten rather than redirected for the same reason: a redirect would put
 * the other host in the address bar and split the domain's authority.
 *
 * The upstream already serves its pages and its assets under /content, so the
 * path maps across unchanged and nothing at this site's root can collide.
 * Change the host here and both the rewrite and the header link follow.
 */
export const contentOrigin = 'https://content-qvce2clv4jox71shenyzdfm0qvc2-8852319685.scout7.ai';

const configuredUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim().replace(/\/$/, '');

/**
 * The absolute base for every URL the build emits: canonical links, Open Graph,
 * the sitemap, robots, and the download URLs in the skill discovery index.
 *
 * NEXT_PUBLIC_SITE_URL can override it, for a staging host or a rename. It may
 * not name a host that legacyHosts redirects away from: a stale deployment
 * variable pointing at the old host would otherwise publish download URLs that
 * redirect to themselves, and an agent following the index would loop until it
 * gave up. A host we are redirecting away from can never be the canonical one.
 */
export const siteUrl =
  configuredUrl && !legacyHosts.some((host) => configuredUrl.includes(host)) ? configuredUrl : canonicalUrl;

/** The canonical content repository: this repo. Private unless SOURCE_REPOSITORY_PUBLIC is true. */
export const sourceRepo = { user: 'muralisid', repo: 'agentic-architecture-skills-source', branch: 'main' };

/** The public repository the skill bundles are published to, and its install name. */
export const skillsRepo = { user: 'muralisid', repo: 'agentic-architecture-skills', branch: 'main' };

/**
 * The as-of date on the wall chart's product names. The two-monthly refresh
 * routine edits this string and nothing else when the products are re-verified.
 */
export const wallChartAsOf = 'August 2026';

/**
 * The author, as one entity.
 *
 * Every page carries this: in the page metadata, in the structured data, in the
 * visible byline, in the Markdown an agent reads, and in every published skill
 * bundle. `sameAs` is what lets a search engine or a model resolve the byline
 * to a real person rather than treating each mention as a separate string, so
 * these URLs must stay accurate and must not be reordered casually.
 */
export const author = {
  name: 'Murali Sid',
  legalName: 'Muralidhar Siddavatam',
  jobTitle: 'Founder and AI Systems Architect',
  url: 'https://linkedin.com/in/muralisid',
  linkedin: 'https://linkedin.com/in/muralisid',
  github: 'https://github.com/muralisid',
  sameAs: ['https://linkedin.com/in/muralisid', 'https://github.com/muralisid'],
  /** The page on this site that describes the author; the entity's home. */
  page: '/about',
  knowsAbout: [
    'Agentic enterprise architecture',
    'AI agent governance',
    'Retrieval and context design for AI agents',
    'Enterprise integration and identity for agents',
  ],
};

/** How a citation of this site should read. */
export const citation = {
  publisher: siteName,
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
};
