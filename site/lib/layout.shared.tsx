import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, repoUrl, sourceRepositoryPublic } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appShortName,
    },
    links: [
      { text: 'Architecture', url: '/architecture' },
      { text: 'Layers', url: '/layers' },
      { text: 'Decisions', url: '/decisions' },
      { text: 'Library', url: '/library' },
    ],
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}
