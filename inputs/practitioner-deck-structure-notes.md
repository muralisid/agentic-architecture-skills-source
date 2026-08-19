# Practitioner reference deck: structure notes

A product-neutral "Enterprise Agentic AI Reference Architecture" deck (27 slides, August 2026, draft for discussion) was shared privately with the maintainer. **Author attribution and any use of its content are pending the author's permission**; until granted, these notes record only the deck's high-level structure as program input, with no verbatim content.

## Why it matters to this program

It is the strongest runtime-level reference architecture seen so far: banking-flavored, explicitly vendor-neutral, and organized as ten numbered layers with cross-cutting capabilities and scenario walk-throughs. It informs track R07 (agent platform) and the blueprint presentation format.

## Structure (high level)

- Six design principles covering security by design, preferring deterministic paths over unnecessary LLM processing, grounding answers in evidence, controlled integration, governed memory, and governed continuous improvement
- Ten layers: experience; control plane and governance; AI risk and safety; agent platform; routing and decision engine; knowledge and retrieval; memory and persistence (a five-tier memory model from thread to cross-domain); agent runtime; enterprise integration; enterprise systems
- Cross-cutting capabilities: ModelOps, a governed improvement flywheel, memory governance, data and operations foundation, security by design
- Three scenario-activation walk-throughs showing, per scenario, which layers activate directly and which support (relationship manager briefing, payment investigation, regulatory change impact)

## Ideas this program adopts (as concepts, independently researched)

- Tiered memory (L1 thread to L5 cross-domain) as the memory vocabulary
- Multi-view retrieval indexes as a retrieval technique family
- The scenario-activation format for blueprints
- Deterministic-by-default routing tiers

Action: obtain the author's permission to attribute and, if granted, to reproduce structure diagrams; recorded as an open task in the program.
