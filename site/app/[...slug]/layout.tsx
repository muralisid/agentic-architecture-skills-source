import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { docsBaseOptions } from '@/lib/layout.shared';
import { Wordmark } from '@/components/site/wordmark';
import { BookMarked, Boxes, Compass, Download, Layers, ListOrdered, Scale, Shapes } from 'lucide-react';

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
          title: 'Agentic OS',
          description: 'What it is, and the five parts it takes',
          url: '/agentic-os',
          icon: <Boxes />,
        },
        {
          title: 'Ladder',
          description: 'Seven rungs, and when to climb',
          url: '/ladder',
          icon: <ListOrdered />,
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
          title: 'Skills',
          description: 'Install the guide into your agent',
          url: '/skills',
          icon: <Download />,
        },
        {
          title: 'Patterns',
          description: 'Context patterns, with the evidence for each',
          url: '/patterns',
          icon: <Shapes />,
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
