---
name: map-deterministic-boundaries
description: >-
  Work out which actions an AI agent must never decide on its own, and design
  the deterministic control around each one. Covers the four zones where a model
  may advise but never decide (access and entitlements, movement of money,
  safety actuation, formal regulatory records), the identity and delegation
  chain that keeps every action traceable to the person who asked, and where
  enforcement belongs. Produces a zone register and the control for each entry.
  Use whenever designing authorization, payments, approvals, or record-keeping
  for agents, whenever deciding what an agent may do unsupervised, and whenever
  a guardrail or a prompt instruction is being proposed as a security control.
license: CC-BY-SA-4.0
compatibility: Reference material only. No tools, network access, or scripts required; any agent that can read Markdown can use it.
metadata:
  track: both
  kind: task
---

# Map the deterministic boundaries

The output is a register: every consequential action the system can take, the zone it falls in, the deterministic rule that decides it, and where that rule is evaluated. Build it in four steps.

## 1. Inventory the actions

List every action the agent can cause, directly through a tool or indirectly by handing work to another system. Include the ones that look harmless: sending a message, changing a status, adding a comment. For each, record what it changes, who it affects, and whether it can be undone without a person.

## 2. Classify against the four zones

`references/deterministic-zones.md` defines them. Four questions decide the classification:

- Does the action grant, widen, or bypass access to something?
- Does it move money, commit to spending, or authorise a payment?
- Can it affect physical safety, directly or by changing what a control system does?
- Does it create, amend, or submit a record that a regulator, a court, or an auditor will treat as authoritative?

Any yes puts the action in a zone. In a zone the rule is the same: the model may produce evidence, a recommendation, or a draft, and a deterministic rule over verified identity and policy makes the decision.

## 3. Design the control for each entry

For each zone action, name three things: the deterministic rule, the place it is evaluated, and the record it leaves. `references/enforcement.md` gives the three tiers (the gateway, the policy decision point, and rules promoted outside the model) and what each can and cannot enforce. Two anti-patterns to reject explicitly:

- A prompt instruction, a system prompt, or a model-based guardrail as the thing that grants or denies. Guardrails are advisory: measured evasion rates make them unfit as the boundary.
- Post-filtering results after the agent has already retrieved them. Filter before, on the caller's live identity.

## 4. Trace the identity chain

Every action in the register must be attributable to a person. `references/identity-and-delegation.md` carries the chain from the accountable sponsor through the agent's own identity to the system of record, and the standards that implement each hop (token exchange, rich authorization requests, resource indicators). Check three properties: the agent has its own identity rather than a shared credential; it acts with the requesting person's permissions rather than a broader service account; and the audit record names the person, not just the agent.

`references/security-and-identity.md` has the deeper treatment, including credential lifetime, revocation, and what a kill switch has to reach.

## The register

| Action | Zone | Deterministic rule | Evaluated at | Record left | Reversible |
|---|---|---|---|---|---|

Sign it. The register is what later work assumes exists, and an unsigned draft tends to be treated as one person's opinion.

## The caveat that keeps this honest

Authorization bounds the blast radius; it does not bound intent. An agent that is tricked will act within its permissions, so the register limits what a successful attack can reach and never prevents one.
