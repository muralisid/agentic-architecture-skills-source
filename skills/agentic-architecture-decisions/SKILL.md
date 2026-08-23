---
name: agentic-architecture-decisions
description: >-
  Twenty-five technology choices for AI agent systems that are usually made by
  habit, each resolved with a verdict, the discriminator that decides your case,
  and what would change it: graph database against embedding retrieval,
  dedicated gateway against extending API management, single agent against
  multi-agent orchestration, guardrail products against deterministic gates,
  embedded vendor agents against external agents, fine-tuning against context
  engineering, and more. Use whenever someone asks should we use X or Y, cites a
  popular default, or needs to know what evidence settled a position and when.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: reference
---

# The contested choices, resolved

| File | What it holds |
|---|---|
| `references/decision-catalog.md` | The twenty-five choices (CD-1 to CD-25), each with a verdict, the discriminator, and its status |
| `references/programme-decision-log.md` | The programme's own decisions (D001 onward): what was decided, when, and why |
| `references/changelog.md` | What changed on publication, including the positions research reversed |
| `references/re-verification-list.md` | The volatile facts, what to re-check, and when |

## How to answer a "should we use X or Y" question

1. Find the choice: `grep -n "CD-" references/decision-catalog.md` lists all twenty-five with their one-line verdicts.
2. Read the **discriminator**, not just the verdict. The verdict is the common answer; the discriminator is the property of a specific situation that decides it. Quote the discriminator and apply it to the case in front of you.
3. Check the **status**. The catalog distinguishes converged, refined, reframed, supported with reframe, and position. A position is the authors' judgement where evidence is thin, and should be presented that way.
4. Check the **re-verification list** before repeating a dated product fact. Several entries are explicitly volatile.

## The reframes

Four of the twenty-five conclude that the question itself is wrong. Those are the most useful ones to reach for, because a team arguing about the wrong axis will not settle it by choosing a side:

- Multi-agent against single agent: the decisive variable is whether compute was held constant in the comparison.
- AI-first against human-first service: the failure is the containment target, not the axis.
- One universal assistant against many specialised agents: solitary against coordinated work is the variable that predicts success.
- Fine-tuning against prompt and context engineering: an ordering, not a side.

## What this reference will not do

Choose a vendor. The catalog resolves architecture choices on evidence and economics; product selection depends on facts that date within a quarter, and the guide stopped publishing a vendor comparison for that reason. Where a decision has no published head-to-head measurement, the entry says so rather than inferring one.
