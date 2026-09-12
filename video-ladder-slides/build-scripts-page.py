#!/usr/bin/env python3
"""Builds ladder-scripts.html: every ladder page as its slides, the words the video says over each
slide, and a read-through to listen to. Paths in the page are relative to the site repo root, so the
page can be published with the slide images and audio files beside it.

Usage: python3 build-scripts-page.py
Writes ladder-scripts.html and publish-files.json (the files to publish with the page).
"""
import html
import json
import os
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
ORDER = [
    "index", "instructions", "context", "tools-and-the-loop", "adapters-and-fine-tuning",
    "distillation", "reinforcement-fine-tuning", "continued-pretraining", "custom-pretraining",
]

esc = html.escape
files = []
toc = []
chapters = []

for number, name in enumerate(ORDER, start=1):
    journey = json.load(open(os.path.join(HERE, "journeys", f"{name}.json")))
    clips = json.load(open(os.path.join(HERE, "clips", f"{name}.json")))["clips"]
    audio = f"video-ladder-slides/audio/{name}.mp3"
    seconds = float(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(REPO, audio)],
        capture_output=True, text=True, check=True,
    ).stdout.strip())
    minutes = max(1, round(seconds / 60))
    files.append(audio)

    titles = {s["id"]: s["title"].replace("*", "") for s in journey["slides"]}
    by_slide = {}
    for clip in clips:
        by_slide.setdefault(clip["slide"], []).append(clip)
    folder = "index" if name == "index" else name
    anchor = "overview" if name == "index" else name

    body = []
    for section in journey["sections"]:
        if section["heading"]:
            body.append(f'<h3 class="section-head">{esc(section["heading"])}</h3>')
        for sid in section["slides"]:
            image = f"site/public/slides/ladder/{folder}/{sid}.webp"
            files.append(image)
            lines = []
            for clip in by_slide.get(sid, []):
                tag = '<span class="tag">On camera</span>' if clip["on_camera"] else ""
                lines.append(
                    f'<p class="line"><span class="clip">{esc(clip["clip_id"])}</span>'
                    f'<span class="words">{tag}{esc(clip["voiceover"])}</span></p>'
                )
            body.append(
                f'<article class="slide" id="{anchor}-{esc(sid)}">'
                f'<img src="{image}" alt="{esc(titles[sid])}" width="1920" height="1080" loading="lazy" decoding="async">'
                f'<div class="lines">{"".join(lines)}</div></article>'
            )

    words = sum(c["words"] for c in clips)
    toc.append(
        f'<li><a href="#{anchor}"><span class="toc-name">{esc(journey["chapter"])}</span>'
        f'<span class="toc-min">{minutes} min</span></a></li>'
    )
    chapters.append(
        f'<section class="chapter" id="{anchor}" aria-labelledby="{anchor}-title">'
        f'<div class="chapter-head"><div class="chapter-name">'
        f'<p class="page-no">Page {number} of {len(ORDER)}</p>'
        f'<h2 id="{anchor}-title">{esc(journey["chapter"])}</h2>'
        f'<p class="meta">{len(journey["slides"])} slides, {len(clips)} clips, {words} words, {minutes} minutes</p></div>'
        f'<audio controls preload="none" src="{audio}"></audio></div>'
        f'{"".join(body)}</section>'
    )

page = f"""<title>Intelligence Ladder Scripts</title>
<meta name="description" content="The nine intelligence ladder pages as slides, with the words each video will say.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Sora:wght@400;500;600&display=swap">
<style>
  :root {{
    --ground: #f7f6f2;
    --surface: #ffffff;
    --ink: #151a25;
    --muted: #5f6673;
    --line: #e4e0d7;
    --accent: #e0472a;
    --accent-ink: #a8321a;
    --tag-ground: #fbe6de;
    --shadow: 0 1px 2px rgba(21, 26, 37, .05), 0 10px 28px -16px rgba(21, 26, 37, .22);
    --display: "Newsreader", Georgia, "Times New Roman", serif;
    --text: "Sora", -apple-system, "Segoe UI", Arial, sans-serif;
  }}
  @media (prefers-color-scheme: dark) {{
    :root:not([data-theme="light"]) {{
      --ground: #13151a;
      --surface: #1b1e25;
      --ink: #ecebe6;
      --muted: #a3a8b2;
      --line: #2c3039;
      --accent: #ff6b4d;
      --accent-ink: #ff937b;
      --tag-ground: #3b231e;
      --shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 12px 30px -18px rgba(0, 0, 0, .6);
    }}
  }}
  :root[data-theme="dark"] {{
    --ground: #13151a;
    --surface: #1b1e25;
    --ink: #ecebe6;
    --muted: #a3a8b2;
    --line: #2c3039;
    --accent: #ff6b4d;
    --accent-ink: #ff937b;
    --tag-ground: #3b231e;
    --shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 12px 30px -18px rgba(0, 0, 0, .6);
  }}

  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: var(--ground); color: var(--ink); font: 400 15.5px/1.6 var(--text); -webkit-font-smoothing: antialiased; }}
  a {{ color: inherit; }}
  a:focus-visible {{ outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }}

  .top {{ max-width: 1120px; margin: 0 auto; padding: 48px 24px 8px; display: grid; gap: 28px; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: end; }}
  .kicker {{ margin: 0 0 10px; font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-ink); }}
  h1 {{ margin: 0; font: 600 44px/1.05 var(--display); letter-spacing: -.01em; text-wrap: balance; }}
  .lede {{ margin: 14px 0 0; max-width: 58ch; color: var(--muted); }}
  .toc ol {{ margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }}
  .toc li {{ border-bottom: 1px solid var(--line); counter-increment: page; }}
  .toc a {{ display: flex; gap: 12px; align-items: baseline; padding: 7px 2px; text-decoration: none; }}
  .toc a::before {{ content: counter(page); min-width: 1.4em; color: var(--muted); font-variant-numeric: tabular-nums; font-size: 13px; }}
  .toc a:hover .toc-name {{ color: var(--accent-ink); }}
  .toc-name {{ flex: 1; font-weight: 500; }}
  .toc-min {{ color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }}

  main {{ max-width: 1120px; margin: 0 auto; padding: 8px 24px 96px; }}
  .chapter {{ margin-top: 56px; }}
  .chapter-head {{
    position: sticky; top: 0; z-index: 2; display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: center; justify-content: space-between;
    padding: 14px 0 12px; background: var(--ground); border-bottom: 2px solid var(--ink);
  }}
  .page-no {{ margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent-ink); }}
  h2 {{ margin: 2px 0 0; font: 600 30px/1.1 var(--display); text-wrap: balance; }}
  .meta {{ margin: 4px 0 0; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }}
  audio {{ width: min(420px, 100%); height: 40px; }}

  .section-head {{ margin: 36px 0 4px; font: 600 13px/1.4 var(--text); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }}
  .slide {{ display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 28px; align-items: start; padding: 22px 0; border-bottom: 1px solid var(--line); }}
  .slide img {{ display: block; width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--line); box-shadow: var(--shadow); background: #fbfaf8; }}
  .lines {{ display: grid; gap: 10px; max-width: 62ch; padding-top: 2px; }}
  .line {{ margin: 0; display: grid; grid-template-columns: 3.4em minmax(0, 1fr); gap: 10px; }}
  .clip {{ padding-top: 3px; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }}
  .tag {{ display: inline-block; margin-right: 8px; padding: 1px 8px; border-radius: 999px; background: var(--tag-ground); color: var(--accent-ink); font-size: 12px; font-weight: 600; vertical-align: 1px; }}

  @media (max-width: 860px) {{
    .top {{ grid-template-columns: 1fr; padding-top: 32px; }}
    h1 {{ font-size: 36px; }}
    .slide {{ grid-template-columns: 1fr; gap: 14px; }}
    .chapter-head {{ position: static; }}
  }}
</style>
<header class="top">
  <div>
    <p class="kicker">Agentic Architecture Skills</p>
    <h1>Intelligence ladder scripts</h1>
    <p class="lede">Each page is shown as its slides, with the words the video will say over each one. Press play to hear a computer voice read the whole page. Your own voice comes later, when a page is filmed. The first and last lines of each page are you on camera.</p>
  </div>
  <nav class="toc" aria-label="Pages"><ol>{"".join(toc)}</ol></nav>
</header>
<main>{"".join(chapters)}</main>
"""

with open(os.path.join(HERE, "ladder-scripts.html"), "w") as fh:
    fh.write(page)
with open(os.path.join(HERE, "publish-files.json"), "w") as fh:
    json.dump(files, fh)
print(f"ladder-scripts.html written; {len(files)} files to publish with it")
