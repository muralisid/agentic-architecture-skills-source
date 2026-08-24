/**
 * Rasterises the wall chart for the home page's share card.
 *
 * next/og rasterises with Satori, which will not reliably render an 820KB SVG
 * carrying a hundred embedded logos, so the chart is turned into a PNG here
 * and the card embeds that. Committed like the icons are, so the site builds
 * without running this, and reproducible so it is not an unexplained binary.
 *
 * Run with `npm run og:chart` after changing public/diagrams/target-state.svg.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(siteDir, 'public', 'diagrams', 'target-state.svg');
const outPath = path.join(siteDir, 'app', 'og', 'wall-chart.png');

/**
 * The card places the chart at roughly 470 by 630. Rendering at double that
 * keeps the rule lines and the logos clean once Satori scales it down; going
 * wider costs bytes in the repository for detail no share card resolves.
 */
const WIDTH = 940;

async function main() {
  const svg = await readFile(source);
  const png = await sharp(svg, { density: 96 }).resize({ width: WIDTH }).png({ compressionLevel: 9 }).toBuffer();
  const { width, height } = await sharp(png).metadata();
  await writeFile(outPath, png);
  console.log(
    `build-og-chart: app/og/wall-chart.png written at ${width}x${height}, ${(png.length / 1024).toFixed(0)}KB`,
  );
}

await main();
