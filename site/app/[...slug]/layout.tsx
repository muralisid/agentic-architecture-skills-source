import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { docsBaseOptions } from '@/lib/layout.shared';
import { Wordmark } from '@/components/site/wordmark';
import { BookMarked, Compass, FlaskConical, Layers, Scale } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/[...slug]'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...docsBaseOptions()}
      nav={{ title: <Wordmark />, mode: 'top' }}
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
          description: '25 contested choices, resolved',
          url: '/decisions',
          icon: <Scale />,
        },
        {
          title: 'Research',
          description: 'The retrieval experiments, with the reversals',
          url: '/research',
          icon: <FlaskConical />,
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
