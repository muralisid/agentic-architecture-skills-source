import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, repoUrl, sourceRepositoryPublic } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appShortName,
    },
    links: [
      { text: 'Start', url: '/docs' },
      { text: 'Decide', url: '/docs/decide' },
      { text: 'Design', url: '/docs/design' },
      { text: 'Apply', url: '/docs/apply' },
      { text: 'Reference', url: '/docs/reference' },
      { text: 'About / Evidence', url: '/docs/about-evidence' },
    ],
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}
