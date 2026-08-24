import { readdirSync } from 'node:fs';
import path from 'node:path';

/**
 * The share image for a page.
 *
 * Where a page carries its own figure, that figure is what gets shared: the
 * picture the page was written around says more in a feed than a rendered
 * restatement of the title. Pages without one fall back to the generated card
 * at /og/docs, which is the same design in the same colours.
 *
 * The lookup is by convention, public/figures/<slug>.jpg against the page's
 * own slug, so adding a figure to a page gives it a share image with no second
 * place to register it and nothing to keep in step. The JPEG is written by
 * scripts/sync-content.mjs beside the figure the page displays, because a page
 * shows WebP and LinkedIn does not reliably render WebP in a share card.
 *
 * Server only: it reads the filesystem at module load, so it must be imported
 * from generateMetadata and route handlers, never from a client component.
 */

const FIGURE_ROOT = path.join(process.cwd(), 'public', 'figures');

/** Walked once at module load: this runs at build, and the tree is small. */
function collectFigures(dir: string, prefix: string, into: Set<string>) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      collectFigures(path.join(dir, entry.name), `${prefix}${entry.name}/`, into);
    } else if (entry.name.endsWith('.jpg')) {
      into.add(`${prefix}${entry.name.slice(0, -4)}`);
    }
  }
}

const figures = new Set<string>();
collectFigures(FIGURE_ROOT, '', figures);

/**
 * The figure a page provides, or null.
 *
 * A section landing page lives at slugs like ['patterns'] while its figure is
 * filed as patterns/index.jpg, so both spellings are tried.
 */
export function getProvidedFigure(slugs: string[]): string | null {
  if (slugs.length === 0) return null;
  const direct = slugs.join('/');
  const asIndex = `${direct}/index`;
  if (figures.has(direct)) return `/figures/${direct}.jpg`;
  if (figures.has(asIndex)) return `/figures/${asIndex}.jpg`;
  return null;
}
