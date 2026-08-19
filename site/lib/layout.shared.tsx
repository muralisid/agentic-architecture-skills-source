import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appShortName,
    },
    links: [
      { text: 'Architecture', url: '/docs/architecture' },
      { text: 'Layers', url: '/docs/layers' },
      { text: 'Frameworks', url: '/docs/frameworks' },
      { text: 'Blueprints', url: '/docs/blueprints' },
      { text: 'Vendors', url: '/docs/vendors' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
