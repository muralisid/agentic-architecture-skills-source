#!/usr/bin/env python3
"""Check a slide journey JSON file against the writing rules for Murali's site and videos.

Usage: python3 lint.py journeys/instructions.json [more files]
Exits 1 when any error is found. Warnings also need fixing before review.
"""
import json
import pathlib
import re
import sys

BANNED = {
    "—": "em dash",
    "–": "en dash",
    "→": "arrow character (type -> instead)",
    "…": "ellipsis character",
    "“": "curly quote",
    "”": "curly quote",
    "‘": "curly quote",
    "’": "curly apostrophe",
}
BOLTED = re.compile(
    r",\s+(which|where|because|often|meaning|making|so that|while|when|since|leaving|as it)\b", re.I
)
# The guide names no products of its own. The words to catch are kept out of git,
# because the site build refuses to publish a repository that carries them. Put one
# word or phrase per line in products.local.txt to switch this check on.
_words = pathlib.Path(__file__).with_name("products.local.txt")
_list = [w.strip() for w in _words.read_text().splitlines() if w.strip()] if _words.exists() else []
PRODUCTS = re.compile("|".join(re.escape(w) for w in _list), re.I) if _list else None
LAYOUTS = {
    "title", "statement", "picture", "tiles", "steps", "flow",
    "cycle", "compare", "list", "number", "branch", "rule", "bars", "table",
}


def wc(text):
    return len(text.replace("*", "").split())


def sentences(text):
    return [s for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s]


def walk(node, path, out):
    if isinstance(node, str):
        out.append((path, node))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, f"{path}[{i}]", out)
    elif isinstance(node, dict):
        for k, v in node.items():
            walk(v, f"{path}.{k}", out)


def lint(file):
    errors, warnings = [], []
    with open(file) as fh:
        data = json.load(fh)

    strings = []
    walk(data, "$", strings)
    for path, s in strings:
        for ch, name in BANNED.items():
            if ch in s:
                errors.append(f"{path}: {name} in {s!r}")
        if PRODUCTS and PRODUCTS.search(s):
            errors.append(f"{path}: product name in {s!r}")

    clips = words = 0
    slides = data.get("slides", [])
    for slide in slides:
        sid = slide.get("id", "?")
        if slide.get("layout") not in LAYOUTS:
            errors.append(f"{sid}: unknown layout {slide.get('layout')!r}")

        title = slide.get("title", "")
        if wc(title) > 8:
            errors.append(f"{sid}: title has {wc(title)} words (max 8): {title!r}")
        if title.count("*") not in (2, 4):
            warnings.append(f"{sid}: title should mark its accent with *asterisks*: {title!r}")
        if slide.get("text") and wc(slide["text"]) > 14:
            errors.append(f"{sid}: text has {wc(slide['text'])} words (max 14)")

        for item in slide.get("items", []):
            if isinstance(item, str) and wc(item) > 6:
                errors.append(f"{sid}: item has {wc(item)} words (max 6): {item!r}")
        for side in ("left", "right"):
            for row in (slide.get(side) or {}).get("rows", []):
                if wc(row) > 6:
                    errors.append(f"{sid}: {side} row has {wc(row)} words (max 6): {row!r}")

        caption = slide.get("caption", "")
        if not caption:
            errors.append(f"{sid}: missing caption")
        if wc(caption) > 35:
            errors.append(f"{sid}: caption has {wc(caption)} words (max 35)")
        for s in sentences(caption):
            if wc(s) > 20:
                errors.append(f"{sid}: caption sentence over 20 words: {s!r}")
            if BOLTED.search(s):
                warnings.append(f"{sid}: caption clause bolted on the end: {s!r}")

        builds = slide.get("builds", [])
        if not builds:
            errors.append(f"{sid}: no builds")
        for build in builds:
            for clip in build.get("narration", []):
                clips += 1
                words += wc(clip)
                if wc(clip) > 24:
                    errors.append(f"{sid}: clip has {wc(clip)} words (max 24): {clip!r}")
                for s in sentences(clip):
                    if wc(s) > 20:
                        errors.append(f"{sid}: sentence over 20 words: {s!r}")
                    if BOLTED.search(s):
                        warnings.append(f"{sid}: clause bolted on the end: {s!r}")

    print(
        f"{file}: {len(slides)} slides, {clips} clips, {words} narration words, "
        f"about {words / 139:.1f} min at 139 wpm"
    )
    for w in warnings:
        print("  WARN ", w)
    for e in errors:
        print("  ERROR", e)
    return not errors


if __name__ == "__main__":
    results = [lint(f) for f in sys.argv[1:]]
    sys.exit(0 if all(results) else 1)
