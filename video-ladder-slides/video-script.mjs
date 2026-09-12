// Turns a page into a Scout7 video script. The page is the source: each <Slide> block's paragraphs
// are its builds, and the video speaks exactly those words.
//
//   node video-script.mjs /path/to/product/ladder/index.mdx
//
// Clips hold 12 to 24 words, start at a sentence and end on a full stop, and never cross a slide.
// Each clip shows the frame of the build its last sentence belongs to. The first and last clips are
// on camera. Writes clips/<page>.json and prints the script with any clip that breaks the rules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MAX = 24;
const MIN = 10;

const mdxFile = path.resolve(process.argv[2]);
const name = path.basename(mdxFile, '.mdx');
const journey = JSON.parse(fs.readFileSync(path.join(HERE, 'journeys', `${name}.json`), 'utf8'));
const builds = Object.fromEntries(journey.slides.map((s) => [s.id, (s.builds || []).length || 1]));

const plain = (text) => text
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<Term[^>]*>([\s\S]*?)<\/Term>/g, '$1')
  .replace(/\*\*?([^*]+)\*\*?/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();
const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;
const sentencesOf = (text) => text.split(/(?<=[.!?])\s+/).filter(Boolean);

const blocks = [...fs.readFileSync(mdxFile, 'utf8').matchAll(/<Slide journey="[^"]+" id="([^"]+)">\s*([\s\S]*?)<\/Slide>/g)];
const problems = [];
const clips = [];

for (const [, slideId, body] of blocks) {
  const paragraphs = body.split(/\n\s*\n/).map(plain).filter(Boolean);
  if (paragraphs.length !== builds[slideId]) {
    problems.push(`${slideId}: ${paragraphs.length} paragraphs but ${builds[slideId]} builds`);
  }
  const units = paragraphs.flatMap((p, b) => sentencesOf(p).map((sentence) => ({
    build: Math.min(b, builds[slideId] - 1), sentence, words: wordCount(sentence),
  })));

  // Cut the slide's sentences into the fewest clips of MIN to MAX words, as even as possible.
  const n = units.length;
  const best = Array(n + 1).fill(null);
  best[0] = { count: 0, spread: 0, from: -1 };
  for (let i = 1; i <= n; i += 1) {
    let w = 0;
    for (let j = i - 1; j >= 0; j -= 1) {
      w += units[j].words;
      if (w > MAX) break;
      if (w < MIN || !best[j]) continue;
      const cand = { count: best[j].count + 1, spread: best[j].spread + (w - 18) ** 2, from: j };
      if (!best[i] || cand.count < best[i].count || (cand.count === best[i].count && cand.spread < best[i].spread)) best[i] = cand;
    }
  }
  const groups = [];
  if (best[n]) {
    for (let i = n; i > 0; i = best[i].from) groups.unshift(units.slice(best[i].from, i));
  } else {
    problems.push(`${slideId}: no cut into clips of ${MIN} to ${MAX} words, so one clip per sentence`);
    units.forEach((u) => groups.push([u]));
  }
  for (const g of groups) {
    clips.push({ slide: slideId, build: g[g.length - 1].build, sentences: g.map((u) => u.sentence), words: g.reduce((a, u) => a + u.words, 0) });
  }
}

const out = clips.map((c, i) => ({
  clip_id: `c${String(i + 1).padStart(3, '0')}`,
  slide: c.slide,
  build: c.build + 1,
  voiceover: c.sentences.join(' '),
  words: c.words,
  on_camera: i === 0 || i === clips.length - 1,
  frame: `frames/${name}/film/${c.slide}-b${c.build + 1}.png`,
}));

for (const c of out) {
  if (c.words > MAX) problems.push(`${c.clip_id} (${c.slide}): ${c.words} words, over ${MAX}`);
  if (c.words < MIN) problems.push(`${c.clip_id} (${c.slide}): ${c.words} words, under ${MIN}`);
}

fs.mkdirSync(path.join(HERE, 'clips'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'clips', `${name}.json`), `${JSON.stringify({ page: journey.page, chapter: journey.chapter, clips: out }, null, 2)}\n`);

const words = out.reduce((a, c) => a + c.words, 0);
console.log(`${name}: ${blocks.length} slides, ${out.length} clips, ${words} words, about ${(words / 2.8 / 60).toFixed(1)} min at Scout7's 2.8 words a second`);
for (const c of out) console.log(`  ${c.clip_id} ${c.on_camera ? 'CAMERA' : c.slide + ' b' + c.build} (${c.words}) ${c.voiceover}`);
if (problems.length) {
  console.log(`${problems.length} problems:`);
  problems.forEach((p) => console.log(`  ${p}`));
}
