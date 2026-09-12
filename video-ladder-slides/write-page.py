#!/usr/bin/env python3
"""Writes a ladder page as one slide, then its explanation, from the page's journey.

Usage: python3 write-page.py index        (or instructions, context, ...)

Headings come from the journey's "sections". Each build of a slide becomes one paragraph.
The page keeps its frontmatter and its closing evidence note and research list, minus any
research line about the banking case. "Where the depth is" comes back from the published
page when that page had it, placed before the test for moving on.
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/Users/muralisid/github_other/agentic-architecture-skills-source"

# Links on the page only. The video script strips them.
MANUAL_LINKS = {
    "index": {
        "ov-09": [("Step one is the instructions.", "Step one is the [instructions](/ladder/instructions).")],
        "ov-10": [("Step two is context.", "Step two is [context](/ladder/context).")],
        "ov-11": [("Step three is the tools and the loop.", "Step three is the [tools and the loop](/ladder/tools-and-the-loop).")],
        "ov-16": [("the agent's governed memory.", "the agent's [governed memory](/ladder/context#memory-is-context-that-lasts).")],
    },
}
BRANCH_LINKS = [
    (r"\badapters and (?:supervised )?fine-tuning\b", "/ladder/adapters-and-fine-tuning"),
    (r"\bdistillation\b", "/ladder/distillation"),
    (r"\breinforcement fine-tuning\b", "/ladder/reinforcement-fine-tuning"),
    (r"\bcontinued pretraining\b", "/ladder/continued-pretraining"),
    (r"\bcustom pretraining and architecture\b|\bcustom architecture\b", "/ladder/custom-pretraining"),
    (r"\bstep (?:2|two)\b", "/ladder/context"),
    (r"\bstep (?:3|three)\b", "/ladder/tools-and-the-loop"),
]


def link_branch(paras, own):
    done = set()
    out = []
    for p in paras:
        for pattern, url in BRANCH_LINKS:
            if url == own or url in done:
                continue
            spans = [m.span() for m in re.finditer(r"\[[^\]]*\]\([^)]*\)", p)]
            m = re.search(pattern, p, re.I)
            if m and not any(a <= m.start() < b for a, b in spans):
                p = p[: m.start()] + f"[{m.group(0)}]({url})" + p[m.end():]
                done.add(url)
        out.append(p)
    return out


def main(name):
    page_file = f"{REPO}/product/ladder/{name}.mdx"
    with open(os.path.join(HERE, "journeys", f"{name}.json")) as fh:
        journey = json.load(fh)
    jid = "ladder/index" if journey["page"] == "/ladder" else journey["page"].lstrip("/")
    own = "/" + ("ladder" if name == "index" else jid)
    slides = {s["id"]: s for s in journey["slides"]}

    sections = journey.get("sections")
    if not sections:
        sys.exit(f"{name}: the journey has no sections")
    covered = [sid for sec in sections for sid in sec["slides"]]
    if sorted(covered) != sorted(slides):
        sys.exit(f"{name}: sections do not cover every slide once: {sorted(set(slides) ^ set(covered))}")

    current = open(page_file).read()
    front = re.match(r"^---\n.*?\n---\n", current, re.S).group(0)
    tail_at = current.find("<EvidenceBadge")
    if tail_at < 0:
        sys.exit(f"{name}: no evidence note found at the end of the page")
    tail = "\n".join(line for line in current[tail_at:].strip().split("\n") if not re.search(r"\bbank", line, re.I))

    published = subprocess.run(
        ["git", "-C", REPO, "show", f"HEAD:product/ladder/{name}.mdx"], capture_output=True, text=True
    ).stdout
    depth = re.search(r"^## Where the depth is\n(.*?)(?=^## |\Z)", published, re.S | re.M)
    depth_text = re.sub(r"<(TeachingIllustration|GuideFigure)\b[\s\S]*?/>\s*", "", depth.group(1)).strip() if depth else None

    out = [front]
    for sec in sections:
        if depth_text and sec["heading"] and sec["heading"].startswith("The test"):
            out += ["## Where the depth is", "", depth_text, ""]
            depth_text = None
        if sec["heading"]:
            out += [f"## {sec['heading']}", ""]
        for sid in sec["slides"]:
            s = slides[sid]
            paras = [" ".join(b.get("narration", [])) for b in s["builds"]]
            for old, new in MANUAL_LINKS.get(name, {}).get(sid, []):
                hit = [i for i, p in enumerate(paras) if old in p]
                if not hit:
                    sys.exit(f"{sid}: link text not found: {old}")
                paras[hit[0]] = paras[hit[0]].replace(old, new, 1)
            if s["layout"] == "branch":
                paras = link_branch(paras, own)
            out += [f'<Slide journey="{jid}" id="{sid}">', ""]
            for p in paras:
                if re.search(r"[<>{}*]", p):
                    sys.exit(f"{sid}: a character that breaks the page: {p!r}")
                out += [p, ""]
            out += ["</Slide>", ""]
    if depth_text:
        out += ["## Where the depth is", "", depth_text, ""]
    out += [tail, ""]

    with open(page_file, "w") as fh:
        fh.write("\n".join(out))
    print(f"{name}: {len(slides)} slides in {len(sections)} sections written to {page_file}")


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        main(arg)
