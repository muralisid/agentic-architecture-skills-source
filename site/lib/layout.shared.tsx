import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, repoUrl, sourceRepositoryPublic } from './shared';

const NAV_LINKS = [
  { text: 'Architecture', url: '/architecture' },
  { text: 'Layers', url: '/layers' },
  { text: 'Decisions', url: '/decisions' },
  { text: 'Library', url: '/library' },
];

/** Landing page: top navbar with the section links. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appShortName,
    },
    links: NAV_LINKS,
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}

/** Docs surface: sections live in the navbar tabs, so no duplicate flat links. */
export function docsBaseOptions(): Omit<BaseLayoutProps, 'nav'> {
  return {
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}
