---
name: agentic-enterprise-architecture
description: >-
  The cross-layer reference for running AI agents inside an enterprise: seven
  planes across fourteen layers, the two plane rules, the four deterministic
  zones where a model may advise but never decide, the identity and delegation
  chain, enforcement outside the model, the data-to-memory pipeline, the
  learning flywheel, the autonomy contract (A0 to A5 by L0 to L3), the
  cross-cutting concern matrix, and a plain-words glossary. Use whenever a
  question concerns how an enterprise should architect, govern, secure or
  supervise agents, or when a term like A3, ID2, the evidence plane, the
  oversight gate or a deterministic zone needs its definition.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: enterprise
  kind: reference
---

# The agentic enterprise, cross-layer

Twelve pages, ordered so that reading them in sequence builds the argument. Load only what the question needs.

| File | What it answers |
|---|---|
| `references/01-target-state-architecture.md` | The whole design on one page: seven planes, the two rules that bind them, the two-estate reality, three builds by size and regulatory intensity |
| `references/02-plain-words-glossary.md` | Every term the other pages use, in plain words |
| `references/03-deterministic-zones.md` | The four places a model may advise but never decide, and how to build each boundary |
| `references/04-identity-and-delegation.md` | How an action stays traceable to the person who asked, hop by hop, with the standards |
| `references/05-enforcement.md` | Why the rules that stop an agent live outside the model, and the three tiers that enforce them |
| `references/06-data-to-memory.md` | How company information reaches an agent and what it may remember |
| `references/07-learning-flywheel.md` | How behaviour changes without anyone losing control: evals, promotion gates, demotion |
| `references/08-autonomy-contract.md` | How much an agent may do alone, decided per task, with the controls each level requires |
| `references/09-concern-matrix.md` | Ten cross-cutting concerns against fourteen layers: who owns and who enforces each |
| `references/10-master-target-state.md` | The three complete architectures, keyed to size and regulatory intensity |
| `references/11-maturity-model.md` | The autonomy and learning axes in full, with the gates between levels |
| `references/12-vision.md` | What an agentic enterprise is, and the shape of the residual human work |

## Finding things quickly

The files are long. Search rather than read end to end:

- A plane's responsibilities: `grep -n "plane" references/01-target-state-architecture.md`
- A specific autonomy level: `grep -n "A3\|A4" references/08-autonomy-contract.md references/11-maturity-model.md`
- Whether something is a zone: `grep -n "zone" references/03-deterministic-zones.md`
- Who enforces a concern: `grep -n "C[0-9]" references/09-concern-matrix.md`
- A term: `grep -in "<term>" references/02-plain-words-glossary.md`

## How to use it

Two rules travel with every answer drawn from this material.

**Enforcement lives in the control plane, never in the execution plane.** An instruction in a prompt is a preference; the same rule becomes a control when a gateway or policy decision point evaluates it.

**The evidence plane is fed by collection the agent cannot influence.** Anything an agent reports about itself is testimony rather than evidence.

## What this reference refuses to say

It publishes no timeline, no human-to-agent supervision ratio, and no build-versus-buy figures, because the evidence for those does not exist in a citable form. Six cross-cutting concerns have no complete published answer anywhere and are marked as open rather than papered over. Products are named for orientation as of the date on the wall chart, are representative rather than exhaustive, and are not endorsements. Where a number comes from a vendor, the text says so.
