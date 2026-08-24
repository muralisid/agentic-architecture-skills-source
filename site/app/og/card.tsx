/**
 * The share card every page hands to a scraper.
 *
 * One design for the whole site, in the site's own colours: paper ground,
 * ember rule, Newsreader for the title and Sora for everything else. The
 * previous cards came from the fumadocs default, which is dark purple and
 * bears no relation to the pages it advertises.
 *
 * The description is clamped rather than trusted. Page descriptions here run
 * to forty words, and an unclamped card overflows its own footer: the reason
 * the old cards had the site name struck through by a fourth line of body
 * text. Satori has no line-clamp, so the clamp happens on the string.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const FONT_DIR = path.join(process.cwd(), 'app', 'og', 'fonts');

/** Loaded once per build rather than per card. */
let fontCache: Array<{ name: string; data: Buffer; weight: 400 | 600; style: 'normal' }> | null = null;

export async function ogFonts() {
  if (!fontCache) {
    const [newsreader, sora, soraBold] = await Promise.all([
      readFile(path.join(FONT_DIR, 'newsreader-600.woff')),
      readFile(path.join(FONT_DIR, 'sora-400.woff')),
      readFile(path.join(FONT_DIR, 'sora-600.woff')),
    ]);
    fontCache = [
      { name: 'Newsreader', data: newsreader, weight: 600, style: 'normal' },
      { name: 'Sora', data: sora, weight: 400, style: 'normal' },
      { name: 'Sora', data: soraBold, weight: 600, style: 'normal' },
    ];
  }
  return fontCache;
}

/**
 * Clamp so the card never runs into its own footer.
 *
 * A whole sentence is preferred to a trailing ellipsis: these descriptions
 * open with a sentence that stands on its own, so cutting at the full stop
 * reads as written rather than as truncated. Only when the first sentence is
 * itself too long, or ends too early to say anything, does it fall back to a
 * word boundary and an ellipsis.
 */
function clamp(text: string, limit: number) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;

  // The last sentence that finishes inside the limit, not the first.
  let sentenceEnd = -1;
  for (const match of clean.slice(0, limit + 1).matchAll(/[.!?](?:\s|$)/g)) {
    if (match.index !== undefined) sentenceEnd = match.index;
  }
  if (sentenceEnd >= limit * 0.55) return clean.slice(0, sentenceEnd + 1);

  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[,;:.]$/, '')}...`;
}

const PAPER = '#fbfaf8';
const INK = '#0f172a';
const MUTED = '#5b6472';
const EMBER = '#f04a2a';
const BORDER = '#e7e2d9';

export interface OgCardProps {
  title: string;
  description?: string;
  /** The section a page sits in, shown as the eyebrow. */
  eyebrow?: string;
  site: string;
}

export function OgCard({ title, description, eyebrow, site }: OgCardProps) {
  // Long titles get a smaller face rather than a wrapped-off-the-card one.
  const titleSize = title.length > 52 ? 62 : title.length > 34 ? 74 : 86;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: PAPER,
        padding: '68px 76px',
        position: 'relative',
      }}
    >
      {/* The ember rule down the left, the site's one piece of furniture. */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 14,
          background: EMBER,
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {eyebrow ? (
          <div
            style={{
              display: 'flex',
              fontFamily: 'Sora',
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: EMBER,
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            fontFamily: 'Newsreader',
            fontWeight: 600,
            fontSize: titleSize,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: INK,
          }}
        >
          {clamp(title, 78)}
        </div>

        {description ? (
          <div
            style={{
              display: 'flex',
              fontFamily: 'Sora',
              fontWeight: 400,
              fontSize: 29,
              lineHeight: 1.45,
              color: MUTED,
              marginTop: 26,
            }}
          >
            {clamp(description, 155)}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `2px solid ${BORDER}`,
          paddingTop: 26,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Newsreader',
            fontWeight: 600,
            fontSize: 30,
            color: INK,
          }}
        >
          {site}
          <span style={{ color: EMBER }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Sora',
            fontWeight: 400,
            fontSize: 24,
            color: MUTED,
          }}
        >
          agenticarchitectureskills.com
        </div>
      </div>
    </div>
  );
}
