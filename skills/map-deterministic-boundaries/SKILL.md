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

- Does the action grant, widen, or bypass access, change security configuration, or move personal data across a boundary?
- Does it move money, commit to spending, or authorise a payment?
- Can it actuate anything physical (safety actuation), directly or by changing what a control system does?
- Does it create, amend, or submit a record that a regulator, a court, or an auditor will treat as authoritative?

Any yes puts the action in a zone. In a zone the rule is the same: the model may produce evidence, a recommendation, a draft, or a block, and a deterministic rule over verified identity and policy makes the decision. Models may take permission away, never grant it. In a zone they never approve.

Two more questions decide whether a rule beside the zones applies:

- Does it delete, drop, destroy, or reset production data or an environment?
- Does it make or shape a significant decision about a person: credit, employment, insurance, health, housing, education, benefits, or utility hardship or disconnection?

A yes to the first applies the destruction rule. The action is its own rule in the policy decision point, never folded into a broader permission. It runs plan-then-apply: the agent proposes, a deterministic system applies after approval. A named person approves that exact action, once. Two people sign for production deletion. The target has deletion protection, and backups sit where the agent's identity cannot delete them.

A yes to the second applies the people-decisions floor. A named person with authority to change the outcome decides; the model may score and draft. The person affected gets the notice the law requires. Each decision is logged with the model's inputs. Sign-off does not lower the risk tier.

## 3. Design the control for each entry

For each zone action, name three things: the deterministic rule, the place it is evaluated, and the record it leaves. `references/enforcement.md` gives the three tiers (the gateway, the policy decision point, and rules promoted outside the model) and what each can and cannot enforce. Two anti-patterns to reject explicitly:

- A prompt instruction, a system prompt, or a model-based guardrail as the boundary. A model may deny, escalate, or quarantine on top of the deterministic rule; it never grants. Measured evasion rates make guardrails unfit as the boundary.
- Post-filtering results after the agent has already retrieved them. Filter before, on the caller's live identity.

## 4. Trace the identity chain

Every action in the register must be attributable to a person. `references/identity-and-delegation.md` carries the chain from the accountable sponsor through the agent's own identity to the system of record, and the standards that implement each hop (token exchange, rich authorization requests, resource indicators). Check three properties: the agent has its own identity rather than a shared credential; it acts with the requesting person's permissions rather than a broader service account; and the audit record names the person, not just the agent.

`references/security-and-identity.md` has the deeper treatment, including credential lifetime, revocation, and what a kill switch has to reach.

## The register

| Action | Zone, rule, or floor | Deterministic rule | Evaluated at | Record left | Reversible |
|---|---|---|---|---|---|

Sign it. The register is what later work assumes exists, and an unsigned draft tends to be treated as one person's opinion.

## The caveat that keeps this honest

Authorization bounds the blast radius; it does not bound intent. An agent that is tricked will act within its permissions, so the register limits what a successful attack can reach and never prevents one. Write destructive verbs as separate rules, and allow intent checks by model reviewers or signed mandates only in a subtract-only role.


## Applying this guidance

Treat the supplied references as a starting point, not proof that a recommendation fits the task. Check important claims against dated external evidence. Distinguish proposed industrial examples from delivered work and author-reported experiments. Use the user’s actual industry and constraints; utilities and mining are examples, not universal requirements. Keep working-file and internal repository references out of reader-facing reports.
