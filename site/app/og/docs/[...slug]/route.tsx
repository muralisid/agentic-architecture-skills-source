import { getPageImageUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { OgCard, ogFonts } from '@/app/og/card';
import { appName } from '@/lib/shared';

export const revalidate = false;

/** The section a page sits in, used as the card's eyebrow. */
const SECTIONS: Record<string, string> = {
  architecture: 'Architecture',
  layers: 'Layers',
  decisions: 'Decisions',
  patterns: 'Patterns',
  skills: 'Skills',
  library: 'Library',
};

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const segments = slug.slice(0, -1);
  const page = source.getPage(segments);
  if (!page) notFound();

  return new ImageResponse(
    <OgCard
      title={page.data.title}
      description={page.data.description}
      eyebrow={SECTIONS[segments[0] ?? '']}
      site={appName}
    />,
    {
      width: 1200,
      height: 630,
      fonts: await ogFonts(),
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
