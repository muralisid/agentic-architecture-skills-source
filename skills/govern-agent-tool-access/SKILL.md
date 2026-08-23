---
name: govern-agent-tool-access
description: >-
  Design the layer between agents and the systems they act on: one gateway as
  the enforcement point, tools that wrap governed APIs rather than replace them,
  the Model Context Protocol as the tool contract, read-only defaults, safe
  action design with idempotency keys and receipts, and audit at action
  granularity. Use whenever connecting agents to enterprise systems, building or
  buying an MCP gateway, wrapping an API as a tool, reviewing what an agent may
  call, or deciding between an embedded vendor agent and an external agent
  through APIs.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: enterprise
  kind: task
---

# Govern how agents reach your systems

Every integration becomes an action surface the moment an agent can call it. The governance gaps in the estate stop being technical debt and become blast radius, so the design question is not which tools to expose but where the single enforcement point sits.

## 1. One gateway, before the first production agent

No direct model-to-server connections. The gateway is where server allowlisting, credential injection at execution time, per-tool access control on the caller's live identity, and audit at action granularity all happen. `references/integration-fabric.md` carries the pattern and the two caveats that matter: a public registry is discovery and not trust, and the gateway is itself attackable.

Credential injection is the specific control that repays the effort: agents never hold secrets, so a compromised agent leaks a session rather than a credential.

## 2. Wrap governed APIs, do not reinvent them

The entitlement model stays in the system of record. `references/systems-of-record.md` has the parity rule the major vendors now state in their own words: if a person cannot do it in the product, their agent cannot do it through the tool server either. Where a vendor states parity, inherit it rather than rebuilding it; where a vendor does not, that gap is your integration's problem.

## 3. Design the tools for safety, not only for capability

- Annotate every tool as read-only, destructive, or idempotent, and default to read-only. A missing annotation makes the caller's gateway unable to gate anything.
- Give consequential actions idempotency keys and receipts, so a retry cannot double-charge or double-send.
- Define compensation before shipping, not after the first bad write.
- Treat tool descriptions as prompt surface: they are read by the model, so they are curated, versioned, and diffed on change, and a description change is reviewed like a code change.

## 4. Earn write access

Write access follows a trust progression rather than a policy switch: review everything at first, watch the override rate, and relax the gate as evidence accumulates. This is the autonomy contract applied to one permission. Anything that lands in a deterministic zone stays behind a deterministic rule regardless of how good the override rate looks.

## 5. Choose embedded or external on the right axis

`references/systems-of-record.md` sets out the decision. Both paths now run through the same permission plane, so the old "embedded means governed" assumption is gone. What still differs is model control, the cost meter, and the customisation ceiling. If the authority boundary sits inside one system, choose on those three; if the work crosses systems, external orchestration is a requirement rather than a preference.

## What to check before signing off

The caller's identity survives every hop; credentials are short-lived and injected; every tool carries an annotation; consequential actions are idempotent with receipts and a compensation path; descriptions are versioned; the audit record names the person; and revocation has been exercised end to end. `references/identity-and-delegation.md` and `references/enforcement.md` carry the detail behind each.
