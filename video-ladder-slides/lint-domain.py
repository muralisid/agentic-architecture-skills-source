#!/usr/bin/env python3
"""List every slide that still mentions the financial crime example.

Usage: python3 lint-domain.py journeys/instructions.json [more files]
A hit is not always wrong ("take into account"), but each one needs a look.
"""
import json
import re
import sys

PATTERN = re.compile(
    r"\b(bank|banks|banking|financial|finance|alerts?|analysts?|transactions?|typolog\w*|launder\w*|"
    r"smurf\w*|swift|suspicious|dispositions?|regulators?|fraud|mules?|accounts?)\b",
    re.I,
)

hits_total = 0
for f in sys.argv[1:]:
    with open(f) as fh:
        journey = json.load(fh)
    for slide in journey["slides"]:
        text = json.dumps(slide, ensure_ascii=False)
        hits = sorted({m.group(0).lower() for m in PATTERN.finditer(text)})
        if hits:
            hits_total += 1
            print(f"{f}: {slide['id']} {slide['title']!r}: {', '.join(hits)}")
print("no financial example left" if not hits_total else f"{hits_total} slides still mention it")
sys.exit(1 if hits_total else 0)
