// Cleans a generated concept picture for use on a slide: covers the stamped logo with the paper
// beside it (in the full-size source, before any scaling), crops to the slide aspect, and writes
// a contrast-stretched crop of the patched corner so the patch can be checked by eye.
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/muralisid/github_other/agentic-architecture-skills-source/site/package.json');
const sharp = require('sharp');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const at = (p) => path.join(HERE, p);

const JOBS = [
  {
    src: 'pictures/drafts/bank-a.png',
    out: 'pictures/ov-05.png',
    // Logo sits at about x 75-212, y 40-178. Plain paper at x 560-730 covers it.
    patch: { from: { left: 560, top: 30, width: 170, height: 170 }, to: { left: 60, top: 26 } },
    crop: { left: 0, top: 64, width: 1536, height: 960 },
  },
];

for (const job of JOBS) {
  const patch = await sharp(at(job.src)).extract(job.patch.from).toBuffer();
  const patched = await sharp(at(job.src)).composite([{ input: patch, ...job.patch.to }]).png().toBuffer();
  await sharp(patched).extract(job.crop).png().toFile(at(job.out));
  await sharp(patched)
    .extract({ left: 0, top: 0, width: 560, height: 280 })
    .normalise()
    .png()
    .toFile(at(job.out.replace('.png', '-check.png')));
  console.log(`wrote ${job.out}`);
}
