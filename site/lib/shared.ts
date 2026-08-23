import {
  siteName,
  siteShortName,
  siteDescription,
  siteUrl as configuredSiteUrl,
  legacyHosts as configuredLegacyHosts,
  sourceRepo,
  skillsRepo,
  wallChartAsOf as configuredWallChartAsOf,
} from './site.config.mjs';

export const appName = siteName;
export const appShortName = siteShortName;
export const appDescription = siteDescription;
export const siteUrl = configuredSiteUrl;
export const legacyHosts = configuredLegacyHosts;
export const wallChartAsOf = configuredWallChartAsOf;

export const docsRoute = '/';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

/** The canonical content repository. Links to it render only when it is public. */
export const gitConfig = sourceRepo;
export const repoUrl = `https://github.com/${sourceRepo.user}/${sourceRepo.repo}`;
export const sourceRepositoryPublic = process.env.SOURCE_REPOSITORY_PUBLIC === 'true';

/** The public repository that carries the generated skill bundles. Always public. */
export const skillsRepoSlug = `${skillsRepo.user}/${skillsRepo.repo}`;
export const skillsRepoUrl = `https://github.com/${skillsRepoSlug}`;

/** Where agents discover the published skills. */
export const skillsIndexPath = '/.well-known/agent-skills/index.json';
export const skillsIndexUrl = `${siteUrl}${skillsIndexPath}`;
