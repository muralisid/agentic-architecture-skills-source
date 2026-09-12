// Builds review.html: every slide journey as thumbnails with the site caption and the spoken lines,
// plus the video style frames. Images are embedded, so the file opens anywhere.
//
//   node build-review.mjs frames/index/video/ov-05-019.png [more style frames]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire('/Users/muralisid/github_other/agentic-architecture-skills-source/site/package.json');
const sharp = require('sharp');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ORDER = [
  'index', 'instructions', 'context', 'tools-and-the-loop', 'adapters-and-fine-tuning',
  'distillation', 'reinforcement-fine-tuning', 'continued-pretraining', 'custom-pretraining',
];

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plain = (s) => esc(String(s || '').replace(/\*/g, ''));
const countWords = (s) => s.split(/\s+/).filter(Boolean).length;

async function dataUri(file, width, quality) {
  const buf = await sharp(file).resize({ width }).webp({ quality }).toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

const chapters = [];
for (const name of ORDER) {
  const file = path.join(HERE, 'journeys', `${name}.json`);
  if (!fs.existsSync(file)) continue;
  const journey = JSON.parse(fs.readFileSync(file, 'utf8'));
  const stats = { lines: 0, words: 0, pictures: 0 };
  const slides = [];
  for (const slide of journey.slides) {
    const builds = (slide.builds || []).map((b) => b.narration || []);
    for (const line of builds.flat()) {
      stats.lines += 1;
      stats.words += countWords(line);
    }
    if (slide.layout === 'picture' && !slide.image) stats.pictures += 1;
    const png = path.join(HERE, 'frames', name, 'site', `${slide.id}.png`);
    slides.push({ slide, builds, thumb: fs.existsSync(png) ? await dataUri(png, 640, 74) : null });
  }
  chapters.push({ name, journey, slides, stats });
}

const frames = [];
for (const f of process.argv.slice(2)) frames.push(await dataUri(path.join(HERE, f), 1440, 82));

const total = chapters.reduce((a, c) => ({ lines: a.lines + c.stats.lines, words: a.words + c.stats.words, pictures: a.pictures + c.stats.pictures, slides: a.slides + c.slides.length }), { lines: 0, words: 0, pictures: 0, slides: 0 });
const minutes = (w) => (w / 139).toFixed(1);

const summaryRows = chapters.map((c) => `<tr><td><a href="#${c.name}">${esc(c.journey.chapter)}</a></td><td>${c.slides.length}</td><td>${c.stats.lines}</td><td>${minutes(c.stats.words)}</td><td>${c.stats.pictures}</td></tr>`).join('');

const sections = chapters.map((c) => {
  const rows = c.slides.map(({ slide, builds, thumb }) => {
    const spoken = builds.map((lines, b) => `<p class="bn">Build ${b + 1}</p><ol class="build">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>`).join('');
    return `<li class="slide" id="${esc(slide.id)}">
      ${thumb ? `<img src="${thumb}" alt="${plain(slide.title)}" loading="lazy">` : '<div class="noimg">Not rendered</div>'}
      <div class="text">
        <p class="meta">${esc(slide.id)}, ${esc(slide.layout)}${slide.layout === 'picture' && !slide.image ? ', picture still to make' : ''}</p>
        <h3>${plain(slide.title)}</h3>
        <p class="label">On the site</p>
        <p class="caption">${esc(slide.caption)}</p>
        <p class="label">Spoken</p>
        ${spoken}
      </div>
    </li>`;
  }).join('');
  return `<section class="chapter" id="${c.name}"><h2>${esc(c.journey.chapter)}</h2>
    <p class="chapter-meta">${c.slides.length} slides, ${c.stats.lines} spoken lines, about ${minutes(c.stats.words)} minutes</p>
    <ol class="slides">${rows}</ol></section>`;
}).join('');

const html = `<title>Ladder Slide Journeys</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,500;1,500&family=Sora:wght@400;600&display=swap" rel="stylesheet">
<style>
  :root { --paper: #fbfaf8; --card: #ffffff; --ink: #0f172a; --muted: #5b6472; --border: #e6e2da; --ember: #f04a2a; --ember-ink: #b02c10; --ember-soft: #fff1ec; }
  body { background: var(--paper); color: var(--ink); font-family: Sora, Arial, sans-serif; font-size: 15px; line-height: 1.55; }
  main { max-width: 1180px; margin: 0 auto; padding: 48px 24px 96px; }
  h1, h2, h3 { font-family: Newsreader, Georgia, serif; font-weight: 500; letter-spacing: -0.01em; }
  h1 { font-size: 44px; line-height: 1.1; margin: 0 0 12px; }
  h2 { font-size: 34px; margin: 64px 0 4px; padding-top: 24px; border-top: 1px solid var(--border); }
  h3 { font-size: 22px; margin: 2px 0 10px; }
  .lede { color: var(--muted); max-width: 720px; margin: 0 0 28px; }
  .eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--ember-ink); margin: 0 0 10px; }
  table { border-collapse: collapse; width: 100%; background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--border); }
  th { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
  tr:last-child td { border-bottom: 0; }
  .table-wrap { overflow-x: auto; }
  a { color: var(--ember-ink); }
  .frames { display: grid; gap: 20px; margin-top: 20px; }
  .frames img { width: 100%; border-radius: 14px; border: 1px solid var(--border); display: block; }
  .chapter-meta { color: var(--muted); margin: 0 0 20px; }
  .slides { list-style: none; margin: 0; padding: 0; display: grid; gap: 18px; }
  .slide { display: grid; grid-template-columns: minmax(0, 420px) minmax(0, 1fr); gap: 24px; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 16px; }
  .slide img, .noimg { width: 100%; aspect-ratio: 16 / 9; border-radius: 10px; border: 1px solid var(--border); display: block; }
  .noimg { display: grid; place-items: center; color: var(--muted); }
  .meta { margin: 0; font-size: 12px; color: var(--muted); }
  .label { margin: 10px 0 2px; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
  .caption { margin: 0; }
  .build { margin: 6px 0 0; padding-left: 20px; }
  .build li { margin: 2px 0; }
  .bn { margin: 8px 0 0; font-size: 12px; color: var(--ember-ink); font-weight: 600; }
  @media (max-width: 800px) { .slide { grid-template-columns: 1fr; } }
</style>
<main>
  <p class="eyebrow">Draft for review</p>
  <h1>The intelligence ladder as slide journeys</h1>
  <p class="lede">Each ladder page becomes a run of simple slides, one idea each. The same slides carry the video. Under every slide you see the line the site prints, then the lines you would speak.</p>
  <div class="table-wrap"><table>
    <thead><tr><th>Page</th><th>Slides</th><th>Spoken lines</th><th>Minutes</th><th>Pictures to make</th></tr></thead>
    <tbody>${summaryRows}<tr><td><strong>All pages</strong></td><td><strong>${total.slides}</strong></td><td><strong>${total.lines}</strong></td><td><strong>${minutes(total.words)}</strong></td><td><strong>${total.pictures}</strong></td></tr></tbody>
  </table></div>
  ${frames.length ? `<h2>Video style frames</h2><p class="chapter-meta">Your photo is mocked in the bubble. The caption bar shows the line being spoken. The orange box is a sample highlight.</p><div class="frames">${frames.map((f) => `<img src="${f}" alt="Video style frame">`).join('')}</div>` : ''}
  ${sections}
</main>
`;

fs.writeFileSync(path.join(HERE, 'review.html'), html);
console.log(`review.html: ${chapters.length} pages, ${total.slides} slides, ${(html.length / 1e6).toFixed(1)} MB`);
