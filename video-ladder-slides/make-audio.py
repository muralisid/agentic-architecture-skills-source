#!/usr/bin/env python3
"""Reads a page's video script aloud with a computer voice, for checking the words before filming.

Usage: python3 make-audio.py index [voice] [words-per-minute]

Needs clips/<page>.json from video-script.mjs. Writes audio/<page>.m4a and audio/<page>.html.
The page embeds the audio and prints the script slide by slide under its section headings.
"""
import base64
import html
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
name = sys.argv[1]
voice = sys.argv[2] if len(sys.argv) > 2 else "Daniel"
rate = sys.argv[3] if len(sys.argv) > 3 else "150"

with open(os.path.join(HERE, "clips", f"{name}.json")) as fh:
    script = json.load(fh)
with open(os.path.join(HERE, "journeys", f"{name}.json")) as fh:
    journey = json.load(fh)
titles = {s["id"]: s["title"].replace("*", "") for s in journey["slides"]}
heading_of = {}
for sec in journey.get("sections", []):
    for sid in sec["slides"]:
        heading_of[sid] = sec["heading"]

# A longer pause between slides than between clips on the same slide.
spoken, prev = [], None
for clip in script["clips"]:
    if prev and clip["slide"] != prev:
        spoken.append("[[slnc 700]]")
    spoken.append(clip["voiceover"])
    prev = clip["slide"]

out_dir = os.path.join(HERE, "audio")
os.makedirs(out_dir, exist_ok=True)
txt = os.path.join(out_dir, f"{name}.txt")
aiff = os.path.join(out_dir, f"{name}.aiff")
m4a = os.path.join(out_dir, f"{name}.m4a")
with open(txt, "w") as fh:
    fh.write(" ".join(spoken))
subprocess.run(["say", "-v", voice, "-r", rate, "-f", txt, "-o", aiff], check=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", aiff, "-c:a", "aac", "-b:a", "64k", m4a], check=True)
seconds = float(subprocess.run(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", m4a],
    capture_output=True, text=True, check=True,
).stdout.strip())

rows, prev_slide, prev_heading = [], None, "start"
for clip in script["clips"]:
    sid = clip["slide"]
    if sid != prev_slide:
        heading = heading_of.get(sid)
        if heading != prev_heading and heading:
            rows.append(f"<h2>{html.escape(heading)}</h2>")
        prev_heading = heading
        rows.append(f'<h3><span class="sid">{html.escape(sid)}</span> {html.escape(titles.get(sid, sid))}</h3>')
        prev_slide = sid
    camera = ' <span class="cam">on camera</span>' if clip["on_camera"] else ""
    rows.append(f'<p><span class="cid">{clip["clip_id"]}</span>{camera} {html.escape(clip["voiceover"])}</p>')

audio_b64 = base64.b64encode(open(m4a, "rb").read()).decode()
words = sum(c["words"] for c in script["clips"])
page = f"""<title>{html.escape(script['chapter'])} Script</title>
<style>
  :root {{ --paper: #fbfaf8; --ink: #0f172a; --muted: #5b6472; --border: #e6e2da; --ember: #f04a2a; --ember-ink: #b02c10; }}
  body {{ background: var(--paper); color: var(--ink); font-family: -apple-system, 'Segoe UI', Arial, sans-serif; font-size: 16px; line-height: 1.6; }}
  main {{ max-width: 760px; margin: 0 auto; padding: 32px 20px 80px; }}
  h1 {{ font-family: Georgia, serif; font-weight: 500; font-size: 32px; margin: 0 0 6px; }}
  .meta {{ color: var(--muted); margin: 0 0 16px; }}
  audio {{ width: 100%; margin: 8px 0 24px; }}
  h2 {{ font-family: Georgia, serif; font-weight: 500; font-size: 22px; margin: 32px 0 4px; padding-top: 16px; border-top: 1px solid var(--border); }}
  h3 {{ font-size: 15px; margin: 18px 0 4px; }}
  .sid {{ color: var(--muted); font-weight: 400; margin-right: 6px; }}
  p {{ margin: 2px 0; }}
  .cid {{ color: var(--muted); font-size: 12px; margin-right: 8px; }}
  .cam {{ color: var(--ember-ink); font-size: 12px; font-weight: 600; }}
</style>
<main>
  <h1>{html.escape(script['chapter'])}</h1>
  <p class="meta">Full script, read by a computer voice so you can check the words. {len(script['clips'])} clips, {words} words, {seconds / 60:.1f} minutes.</p>
  <audio controls preload="auto" src="data:audio/mp4;base64,{audio_b64}"></audio>
  {''.join(rows)}
</main>
"""
with open(os.path.join(out_dir, f"{name}.html"), "w") as fh:
    fh.write(page)
print(f"{name}: {seconds / 60:.1f} min of audio, {len(script['clips'])} clips -> audio/{name}.m4a and audio/{name}.html")
