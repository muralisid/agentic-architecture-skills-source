/**
 * Derives the raster icons from app/icon.svg.
 *
 * The SVG is the source and covers every current browser. These two exist for
 * the cases it does not reach: favicon.ico for clients that ask for it by name
 * before reading any markup, and apple-icon.png for the iOS home screen, which
 * needs an opaque tile because it composites the artwork onto whatever is
 * behind it. Both are committed so the site can be built without running this,
 * and both are reproducible so neither is an unexplained binary.
 *
 * Run with `npm run icons`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(siteDir, 'app', 'icon.svg');

/** The warm paper the site sits on, so the iOS tile matches the pages. */
const PAPER = '#fbfaf8';

/** ICO is a directory of images; each entry points at a PNG we embed whole. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size, 0 for true colour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

async function main() {
  const svg = await readFile(source);
  // Rasterise from a high density rather than scaling a small bitmap, so the
  // rounded corners and the stroke stay clean at sixteen pixels.
  const render = (size) => sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();

  const [sixteen, thirtyTwo, fortyEight] = await Promise.all([render(16), render(32), render(48)]);
  await writeFile(
    path.join(siteDir, 'app', 'favicon.ico'),
    ico([
      { size: 16, data: sixteen },
      { size: 32, data: thirtyTwo },
      { size: 48, data: fortyEight },
    ]),
  );

  // The mark occupies about two thirds of the tile, which is roughly what the
  // platform icons around it do, and sits on paper rather than transparency.
  const inner = await sharp(svg, { density: 512 }).resize(124, 124).png().toBuffer();
  await sharp({
    create: { width: 180, height: 180, channels: 4, background: PAPER },
  })
    .composite([{ input: inner, top: 28, left: 28 }])
    .png()
    .toFile(path.join(siteDir, 'app', 'apple-icon.png'));

  console.log('build-icons: favicon.ico (16, 32, 48) and apple-icon.png (180) written from app/icon.svg');
}

await main();
