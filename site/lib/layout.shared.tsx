import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { repoUrl, sourceRepositoryPublic } from './shared';
import { Wordmark } from '@/components/site/wordmark';

export const NAV_LINKS = [
  { text: 'Architecture', url: '/architecture' },
  { text: 'Layers', url: '/layers' },
  { text: 'Decisions', url: '/decisions' },
  { text: 'Skills', url: '/skills' },
  { text: 'Patterns', url: '/patterns' },
  { text: 'Library', url: '/library' },
  { text: 'About', url: '/about' },
] as const;

/** Landing page: the floating pill header (components/site/site-header.tsx) reads these. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark />,
      transparentMode: 'always',
    },
    links: NAV_LINKS.map((link) => ({ ...link })),
    themeSwitch: { mode: 'light-dark' },
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}

/** Docs surface: sections live in the navbar tabs, so no duplicate flat links. */
export function docsBaseOptions(): Omit<BaseLayoutProps, 'nav'> {
  return {
    themeSwitch: { mode: 'light-dark' },
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}
