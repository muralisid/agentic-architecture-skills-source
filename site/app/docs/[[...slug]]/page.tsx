import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { repoUrl, sourceRepositoryPublic } from '@/lib/shared';
import { ReaderContext } from '@/components/reader-context';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const worksheet = worksheetForPage(page.url);

  return (
    <DocsPage id="main-content" toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.reader_summary ?? page.data.description}</DocsDescription>
      <ReaderContext
        audience={page.data.audience}
        decisionOrOutput={page.data.decision_or_output}
        prerequisites={page.data.prerequisites}
        readingTime={page.data.reading_time}
        evidenceStatus={page.data.evidence_status}
        next={page.data.next}
      />
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={sourceRepositoryPublic ? repoUrl : undefined}
        />
      </div>
      {worksheet ? (
        <aside className="not-prose mt-6 flex flex-col justify-between gap-4 rounded-2xl border bg-fd-card p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">Turn the framework into an output</p>
            <p className="mb-0 mt-1 font-medium">{worksheet.description}</p>
          </div>
          <Link href={worksheet.href} className="shrink-0 rounded-lg bg-fd-primary px-4 py-2.5 text-center text-sm font-medium text-fd-primary-foreground">
            Open interactive worksheet
          </Link>
        </aside>
      ) : null}
      <DocsBody className="mt-8">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

function worksheetForPage(pageUrl: string) {
  const worksheets: Record<string, { href: string; description: string }> = {
    '/docs/frameworks/readiness-assessments': {
      href: '/tools/readiness',
      description: 'Answer all 24 questions and produce a six-dimension readiness profile.',
    },
    '/docs/frameworks/use-case-portfolio': {
      href: '/tools/portfolio',
      description: 'Route one use case through all three admission gates before prioritising it.',
    },
    '/docs/frameworks/roadmap-checklist': {
      href: '/tools/roadmap',
      description: 'Compose nine factor answers into a six-stage, gate-based roadmap.',
    },
  };
  return worksheets[pageUrl];
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.reader_summary ?? page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
