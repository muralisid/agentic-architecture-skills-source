---
reader_summary: "Contribute research, corrections, techniques, and blueprints while preserving the guide evidence standard."
audience: ["Guide contributor","Researcher","Enterprise practitioner"]
decision_or_output: "Choose the correct contribution path and prepare the evidence and review material it requires."
prerequisites: ["/docs/about-evidence"]
reading_time: "2 minutes"
evidence_status: "Repository contribution policy and review requirements."
next: "/docs"
---

# Contributing

Thank you for helping build a vendor-neutral, evidence-led reference for agentic enterprise architecture. Contributions of research, corrections, production techniques, and vendor intelligence are all welcome.

## The review bar

Every pull request is reviewed against these acceptance criteria (they are the repo's source-hygiene rules, not suggestions):

1. **Dated sources.** Every claim carries a dated source link. Primary sources preferred: vendor documentation, engineering blogs, regulator texts, named analyst reports.
2. **Vendor claims flagged.** Numbers published by a vendor about its own product are explicitly labeled vendor-published.
3. **As-of dates on volatile facts.** Pricing, GA status, and product names carry an as-of date.
4. **Simplest credible alternative test.** A recommendation must beat the simplest credible alternative on evidence and enterprise economics. "Everyone uses X" is not evidence.
5. **Style.** No em dashes. Plain, factual statements. Terms used as defined in GLOSSARY.md.
6. **Track structure respected.** Changes to a research track keep the template sections intact, including Cross-Cutting Concerns (C1 to C10) and Challenged Defaults.

## What to contribute

- **Corrections**: factual errors, stale product facts, broken sources. Fastest to merge.
- **Research gaps**: evidence that a track missed something material. Open an issue first.
- **Production techniques**: patterns you have run in production, with economics (before/after cost, scale, failure modes). These go to `techniques/` using the format in that directory's README.
- **Product corrections**: a renamed, withdrawn or superseded product on the one-page wall chart, with a primary source and a date.
- **Challenges**: disagree with a published conclusion? Open an issue with your evidence. Contested points get additional research; disagreements resolve on technical reality and economics.

## Workflow

1. For anything larger than a correction, open an issue (templates provided) or start a Discussion first
2. Fork, branch (`rNN/short-topic` for track work), make your change
3. Open a PR using the template; complete the checklist honestly
4. The maintainer (@muralisidfn7) reviews against the bar above and merges

## What not to submit

- Third-party copyrighted material (decks, slide images, paywalled text). Cite and summarize instead.
- Vendor marketing repackaged as findings.
- Confidential information from any employer or client.

## Code of conduct

See CODE_OF_CONDUCT.md. In short: argue about evidence, never about people.
