/**
 * The share card for the home page.
 *
 * Every docs page had one through the /og/docs route; the root had none at
 * all, so a scraper following a link to the site itself got a card with no
 * image while the markup still claimed summary_large_image. That is the one
 * page most links point at.
 *
 * Next.js picks this file up by convention, serves it at /opengraph-image and
 * writes the og:image and twitter:image tags for routes that do not set their
 * own. Docs pages set theirs in metadata and still win.
 */
import { ImageResponse } from 'next/og';
import { OgCard, ogFonts } from '@/app/og/card';
import { appName } from '@/lib/shared';

export const alt = 'Agentic Architecture Skills: a vendor-neutral reference architecture for the agentic enterprise.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        title="The agentic enterprise, on one page"
        description="One chart carrying the whole target state: the components, the control points, and the boundaries a model may not cross."
        eyebrow="Target-state architecture"
        site={appName}
      />
    ),
    { ...size, fonts: await ogFonts() },
  );
}
