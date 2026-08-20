import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, repoUrl, sourceRepositoryPublic } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appShortName,
    },
    links: [
      { text: 'Industries', url: '/industries' },
      { text: 'Departments', url: '/departments' },
      { text: 'Answers', url: '/answers' },
      { text: 'Vendors', url: '/vendors' },
    ],
    ...(sourceRepositoryPublic ? { githubUrl: repoUrl } : {}),
  };
}
