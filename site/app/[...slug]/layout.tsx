import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { docsBaseOptions } from '@/lib/layout.shared';
import { Wordmark } from '@/components/site/wordmark';
import { readerTree, SECTIONS, sectionFor } from '@/lib/navigation';

export default function Layout({ children }: LayoutProps<'/[...slug]'>) {
  const tree = readerTree(source.getPageTree());
  return (
    <DocsLayout tree={tree} {...docsBaseOptions()} nav={{ title: <Wordmark />, mode: 'top' }} tabMode="navbar"
      tabs={SECTIONS.map((section, i) => ({ title: section.text, description: section.description, url: section.url,
        $folder: tree.children[i].type === 'folder' ? tree.children[i] : undefined,
        urls: new Set(source.getPages().filter((p) => sectionFor(p.url).id === section.id).map((p) => p.url)),
      }))}>
      {children}
    </DocsLayout>
  );
}
