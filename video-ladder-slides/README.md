# The ladder slides and video scripts

Every intelligence ladder page is a run of simple slides. One idea per slide. The page
shows a slide and then its explanation, all the way down. The same slides and the same
words carry a video for that page.

The journey files in `journeys/` are the source. The page MDX in `product/ladder/` is
generated from them, so the page and the video script can never drift apart.

Working state as of 2026-09-12. Read this first before changing anything here.

## Where things stand

| Page | Slides | Clips | Read-through |
| --- | ---: | ---: | ---: |
| The intelligence ladder | 34 | 92 | 10.6 min |
| Step 1: Instructions | 20 | 69 | 7.6 min |
| Step 2: Context | 22 | 81 | 9.3 min |
| Step 3: Tools and the loop | 25 | 77 | 8.3 min |
| Adapters and supervised fine-tuning | 24 | 72 | 8.1 min |
| Distillation | 23 | 63 | 7.4 min |
| Reinforcement fine-tuning | 17 | 59 | 6.7 min |
| Continued pretraining | 24 | 81 | 9.3 min |
| Custom pretraining and architecture | 24 | 84 | 9.2 min |
| **Total** | **213** | **678** | **76 min** |

- All nine pages pass `lint.py`, `lint-domain.py` and the site content check.
- Nothing is filmed. Nothing is merged. The work sits on branch `ladder/slide-journeys`.
- A merge to `main` deploys the site, so it needs Murali's yes.
- Review page for him: `ladder-scripts.html`, published as a private artifact at
  https://claude.ai/code/artifact/9f09f912-3add-4e0a-9464-74d23c84ca7b
  It shows every slide, the words the video says over it, and a read-through to listen to.

## Decisions that must not be undone

- One slide, then its explanation. No folded blocks and no old illustrations.
- No industry example. A financial crime example was removed on purpose. Explain the
  theory plainly. A domain example only where an idea needs one.
- Every new word is explained in plain words before it is named. One new word per slide.
- Every page opens with "What we will cover" and closes with "What to remember".
- One video per page. The first and last clip are Murali on camera. The rest are the
  slide full screen with no bubble. One clip per image.
- Writing rules: no em dash, no arrow characters, no curly quotes, and no sentence over
  20 words. Short sentences, plain words, one idea each.
- Nothing is filmed or published without Murali's yes on that page's script.

## The order to run things

Run these from this folder. Replace `x` with a page name, such as `context`.

1. Edit `journeys/x.json`. The slides, their builds and the narration all live there.
2. `python3 lint.py journeys/x.json` for the writing rules, and `python3 lint-domain.py
   journeys/x.json` to catch any leftover industry wording.
3. `python3 write-page.py x` writes `product/ladder/x.mdx`. It keeps the frontmatter and
   the evidence tail, and it checks that every slide sits in a section.
4. `node render.mjs journeys/x.json --variant site` renders the frames. Variants are
   `site` (final state), `video` (caption bar and presenter zone) and `film` (full width,
   one frame per build, for the video).
5. `node export-site.mjs journeys/x.json` writes the WebP slides, the captions and the
   registry the site reads.
6. In `site/`: `npm run sync` then `node ../scripts/check-content.mjs`.
7. `node video-script.mjs ../product/ladder/x.mdx` cuts the clips into `clips/x.json`.
   Each clip is 10 to 24 words. If it reports a slide it cannot cut, reword one sentence
   on that slide rather than changing the rules.
8. `python3 make-audio.py x Daniel 150` records the read-through. This needs macOS,
   because it uses the built-in `say` voice.
9. `python3 build-scripts-page.py` writes `ladder-scripts.html` and the list of files to
   publish with it.

## What is in git and what is not

In git: the journeys, the clips, the renderer, the scripts, the fonts, the WebP pictures
and the MP3 read-throughs.

The site build refuses to publish if reserved words appear anywhere in the repository, so
no product name is written down here. `lint.py` reads the words to catch from
`products.local.txt`, which is not committed. Build it from the private blocklist, one
word per line, or the product check quietly stays off.

Not in git: the rendered frames, the source PNG pictures, the intermediate audio and the
generated review pages. Frames come back with `render.mjs`. The read-throughs are kept
because they can only be recorded on a Mac.

## Open questions for Murali

1. Length. Each page is a 7 to 11 minute video. One video per page, or two shorter ones?
2. The overview explains model, agent, fine-tuning and the rest in newly written plain
   words. Do they sound like him?
3. A few pictures of small models have two dot eyes, like a little robot. Redraw or keep?
4. Moffatt v. Air Canada is still a source on the context page. Keep or drop?

## Filming

Filming runs through the video tool with the presenter set to "me". The plan is
built from the clips, with the first and last clip on camera, and every middle clip using
its `film` frame as the image. Rendering bills per clip, so it needs his yes each time.
The old draft `vid_8ec5e5081a9343e4` still has the removed example in it, so it is parked.

A new draft, `vid_c50025d38a684250`, carries only the overview page's first two clips
(c001, c002 from `clips/index.json`) as a preview: full screen, no presenter bubble,
landscape, cream theme, presenter "me". Frame `frames/index/film/ov-01-b1.png` was
rendered for clip 2 and uploaded as its exact image asset. Stills are not drawn yet and
nothing is filmed. Waiting on Murali's yes before drawing or filming.

`render.mjs` now reads `CHROME_PATH` and `CHROME_EXTRA_ARGS` env vars instead of only the
hardcoded macOS Chrome path, so it can render on a Linux container too (needs
`--no-sandbox` there since it runs as root).
