import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { repoUrl, sourceRepositoryPublic } from './shared';
import { Wordmark } from '@/components/site/wordmark';

/**
 * `proxied` marks a section this app does not render.
 *
 * /content is rewritten to the system that publishes the blog, so there is no
 * route here for the client router to navigate to. Those links are rendered as
 * plain anchors: a client-side navigation would ask this app for a payload it
 * cannot produce, and prefetching one would fail on every header render.
 */
export const NAV_LINKS = [
  { text: 'Architecture', url: '/architecture' },
  { text: 'Security', url: '/security' },
  { text: 'Agentic OS', url: '/agentic-os' },
  { text: 'Ladder', url: '/ladder' },
  { text: 'Layers', url: '/layers' },
  { text: 'Decisions', url: '/decisions' },
  { text: 'Skills', url: '/skills' },
  { text: 'Patterns', url: '/patterns' },
  { text: 'Library', url: '/library' },
  { text: 'Blogs', url: '/content', proxied: true },
  { text: 'About', url: '/about' },
] as const;

/** Landing page: the floating pill header (components/site/site-header.tsx) reads these. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark />,
      transparentMode: 'always',
    },
    // `external` keeps fumadocs from client-routing a proxied section, the same
    // reason the pill header renders those as anchors. The flag itself is
    // dropped rather than spread, since it is not part of the link contract.
    links: NAV_LINKS.map(({ text, url, ...rest }) => ({
      text,
      url,
      ...('proxied' in rest && rest.proxied ? { external: true } : {}),
    })),
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
