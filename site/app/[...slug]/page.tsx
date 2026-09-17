import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { author, siteUrl } from '@/lib/shared';
import { articleSchema, jsonLd } from '@/lib/structured-data';
import { getProvidedFigure } from '@/lib/share-image';
import { Byline } from '@/components/site/byline';
import { CiteThisPage } from '@/components/site/cite-this-page';

export default async function Page(props: PageProps<'/[...slug]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const heroFigure = page.data.hero_figure;
  const video = page.data.video;
  const section = page.url.split('/')[1];

  return (
    <DocsPage id="main-content" toc={page.data.toc} full={page.data.full}>
      {/* Authorship, dates and licence for this page, for crawlers and for models. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              title: page.data.title,
              description: page.data.description,
              path: page.url,
              datePublished: page.data.datePublished,
              dateModified: page.data.dateModified,
              section,
            }),
          ),
        }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <Byline
        className="mt-3"
        datePublished={page.data.datePublished}
        dateModified={page.data.dateModified}
      />
      <div className="flex flex-row flex-wrap gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl}  />
        {heroFigure ? (
          <a href={`/figures/${heroFigure}.svg`} download className="rounded-full border px-3 py-1.5 text-sm font-medium">
            Download the architecture diagram (SVG)
          </a>
        ) : null}
      </div>
      {video ? (
        <div className="not-prose mt-6 overflow-hidden rounded-2xl border">
          <iframe
            src={video}
            title={`${page.data.title} in two minutes`}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
      {page.data.position ? <aside className="mt-6 border-l-2 border-ember pl-4 text-sm leading-6" aria-label="Where things stand">
        <p className="font-semibold">Where things stand</p>
        <p className="text-fd-muted-foreground">{page.data.position}</p>
        {page.data.lastReviewed ? <p className="mt-1 text-xs text-fd-muted-foreground">Reviewed {page.data.lastReviewed}</p> : null}
      </aside> : null}
      <DocsBody className="mt-8">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <CiteThisPage title={page.data.title} path={page.url} dateModified={page.data.dateModified} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[...slug]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  // A page that carries its own figure shares that figure; the rest get the
  // generated card. Twitter is set alongside because it does not inherit the
  // Open Graph image, and an unset one falls back to the site-wide card.
  const shareImage = getProvidedFigure(page.slugs) ?? getPageImageUrl(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    authors: [{ name: author.name, url: author.url }],
    creator: author.name,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      title: page.data.title,
      description: page.data.description,
      url: `${siteUrl}${page.url}`,
      authors: [author.url],
      publishedTime: page.data.datePublished,
      modifiedTime: page.data.dateModified,
      images: shareImage,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: shareImage,
    },
  };
}
