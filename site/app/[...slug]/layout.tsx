import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { docsBaseOptions } from '@/lib/layout.shared';
import { appShortName } from '@/lib/shared';
import { BookMarked, Compass, Layers, Scale } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/[...slug]'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...docsBaseOptions()}
      nav={{ title: appShortName, mode: 'top' }}
      tabMode="navbar"
      tabs={[
        {
          title: 'Architecture',
          description: 'The cross-layer design',
          url: '/architecture',
          icon: <Compass />,
        },
        {
          title: 'Layers',
          description: 'Fourteen deep dives',
          url: '/layers',
          icon: <Layers />,
        },
        {
          title: 'Decisions',
          description: '24 contested choices, resolved',
          url: '/decisions',
          icon: <Scale />,
        },
        {
          title: 'Library',
          description: 'The research behind it all',
          url: '/library',
          icon: <BookMarked />,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
