---
name: agentic-enterprise-layers
description: >-
  One page for each of the fourteen layers of an enterprise estate that AI
  agents touch: infrastructure, data platform, integration fabric, systems of
  record, line of business and operational technology, intelligence and
  learning, agent platform, productivity, experience and channels, security and
  identity, governance and sovereignty, observability and cost, supervision, and
  agent data engineering. Each gives the target state, the mechanisms with dated
  numbers, the contested choices with verdicts, the cross-cutting concerns, and
  what the evidence does not support. Use when a question concerns one part of
  the estate, a specific protocol or standard, where a control is enforced, or
  what good looks like at that layer.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: enterprise
  kind: reference
---

# The fourteen layers

`references/00-the-fourteen-layers.md` is the map: which layer owns what, and how the layers group into the seven planes. Then one file per layer.

| Layer | File | Owns |
|---|---|---|
| R01 | `references/r01-infrastructure.md` | Sandboxes, egress control, workload identity, model serving |
| R02 | `references/r02-data-platform.md` | Governed indexes, permission-aware retrieval, semantic contracts |
| R03 | `references/r03-integration-fabric.md` | The tool gateway, MCP as the tool contract, safe action design |
| R04 | `references/r04-systems-of-record.md` | Wrapping governed APIs, permission parity, write access by trust |
| R05 | `references/r05-lob-and-ot.md` | The operational-technology boundary, where agents stay off the control path |
| R06 | `references/r06-intelligence-and-learning.md` | Evals, judges, promotion gates, distillation, fine-tuning verdicts |
| R07 | `references/r07-agent-platform.md` | The harness, the runtime, the registry, skills, durable execution |
| R08 | `references/r08-productivity-and-collaboration.md` | Assistants in the productivity suite, presence identity, consent |
| R09 | `references/r09-experience-and-channels.md` | Customer-facing agents, disclosure, machine-readability, liability |
| R10 | `references/r10-security-and-identity.md` | Agent identity, credentials, guardrails against gates, kill switches |
| R11 | `references/r11-governance-risk-sovereignty.md` | The evidence floor, risk tiers, residency, the AI Act |
| R12 | `references/r12-observability-and-finops.md` | Traces, unit economics, budget envelopes, rollout |
| R13 | `references/r13-operating-model.md` | Supervision capacity, oversight design, accountability |
| R14 | `references/r14-agent-data-engineering.md` | Parsing, chunking, embeddings, memory governance, erasure |

## Reading a layer page

Each follows the same five sections, so the same question can be asked of any layer: **Target state** (what to aim for), **Mechanisms** (how, with the measured numbers), **Design decisions** (the contested choices and their verdicts), **Cross-cutting concerns** (the C1 to C10 row for that layer, naming where each is enforced), and **Evidence and limits** (what the evidence does not support, and what the layer refuses to claim).

## Finding things quickly

The files are long. Search first:

- Where a control is enforced: `grep -n "Cross-cutting" -A 20 references/r10-security-and-identity.md`
- A protocol or standard: `grep -rn "MCP\|OAuth\|RFC" references/`
- A contested choice: `grep -rn "CD-" references/`
- What a layer refuses to claim: `grep -n "Evidence and limits" -A 30 references/r07-agent-platform.md`

## How to use it

Layer pages describe what an enterprise owns; they are not product recommendations. Products are named for orientation only, with an as-of date, and vendor-published numbers are labelled as such. Where a layer's evidence runs out, the page says so; carry that qualification into any answer rather than filling the gap.
