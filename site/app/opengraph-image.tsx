/**
 * The share card for the home page.
 *
 * The chart is the artefact the site is for, so the card shows the chart
 * itself rather than describing it. It is a tall reference and a share card is
 * landscape, so the whole thing sits full height on the right and the words go
 * beside it: nobody reads a fourteen-layer chart at thumbnail size, but its
 * density is legible at a glance and that is what the card has to convey.
 *
 * Next.js picks this file up by convention, serves it at /opengraph-image and
 * writes og:image and twitter:image for routes that do not set their own.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { ogFonts } from '@/app/og/card';
import { appName } from '@/lib/shared';

export const alt =
  'The agentic enterprise on one page: fourteen estate layers with their control points, seven planes, ten cross-cutting concerns, and four deterministic zones.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#fbfaf8';
const INK = '#0f172a';
const MUTED = '#5b6472';
const EMBER = '#f04a2a';
const BORDER = '#e7e2d9';

export default async function Image() {
  const chart = await readFile(path.join(process.cwd(), 'app', 'og', 'wall-chart.png'));
  const chartSrc = `data:image/png;base64,${chart.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: PAPER,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: EMBER, display: 'flex' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 700,
            padding: '64px 48px 56px 76px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Sora',
                fontWeight: 600,
                fontSize: 21,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: EMBER,
                marginBottom: 22,
              }}
            >
              Target-state architecture
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Newsreader',
                fontWeight: 600,
                fontSize: 76,
                lineHeight: 1.06,
                letterSpacing: -1.6,
                color: INK,
              }}
            >
              The agentic enterprise, on one page
            </div>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Sora',
                fontWeight: 400,
                fontSize: 26,
                lineHeight: 1.45,
                color: MUTED,
                marginTop: 22,
              }}
            >
              Fourteen layers, seven planes, ten concerns, and four boundaries no model decision crosses.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `2px solid ${BORDER}`,
              paddingTop: 22,
            }}
          >
            <div style={{ display: 'flex', fontFamily: 'Newsreader', fontWeight: 600, fontSize: 28, color: INK }}>
              {appName}
              <span style={{ color: EMBER }}>.</span>
            </div>
          </div>
        </div>

        {/* The chart, full height and flush right, bled off the edge. */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={chartSrc} alt="" width={470} height={628} style={{ objectFit: 'contain' }} />
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
