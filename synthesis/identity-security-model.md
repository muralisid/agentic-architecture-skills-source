---
reader_summary: "Design the identity, delegation, and deterministic authorization chain that keeps consequential agent actions governable."
audience: ["CIO/CTO", "Enterprise architect", "Security architect"]
decision_or_output: "Set the minimum production identity level and the enforcement boundary for each agent capability."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "8 minutes"
evidence_status: "Evidence-informed architecture: standards, primary research, vendor capabilities, and open gaps are labelled inline."
next: "/docs/architecture/learning-loops-map"
---

# The Identity and Security Model

As of August 2026. Phase 4 synthesis, drawn from R10 security and identity, with enforcement points from R03, R04, R07 and R01, and disclosure duties from R08, R09 and R11.

---

## One sentence

Agents get first-class identities with a named accountable human, they act as the person who asked, every consequential action is decided by a deterministic rule the agent cannot bypass, and the controls applied to any given agent follow what it can actually do rather than what it is called.

## The identity levels, in their current form

The taxonomy has been revised twice by research, and both revisions matter.

| Level | What it is | Verdict |
|---|---|---|
| ID1 Credential-only | Shared keys and service accounts. No per-agent identity | The anti-pattern. Ungoverned by construction, and the state most enterprises are actually in |
| ID2 Access identity | A first-class IAM principal with task-scoped permissions, short-lived credentials, audit, **and a named accountable sponsor** | The floor for anything in production |
| ID3 Presence identity | Organisational presence: directory entry, mailbox, calendar seat, manager, licences | A collaboration-ergonomics choice with a real security cost, not an accountability upgrade |

**Revision one: the sponsor belongs at ID2, not ID3.** Identity platforms carry a sponsor attribute on the agent identity itself, and agents are nameable and mentionable in collaboration surfaces without a user account. Requiring a mailbox in order to obtain accountability inverts the control: it grants the phishing and discoverability surface in exchange for a property that was already available one level down. Recorded as D019.

**Revision two: levels are assigned by capability surface, not by platform enrollment.** Per-user rather than per-agent licensing removed the cost brake that used to make presence identity self-limiting, so registration in a control plane no longer indicates exposure. What creates exposure is concrete: a mailbox, a meeting seat, directory visibility, code execution, browsing, computer use. The assessment is repeated on every tool grant, because agents accrete capability over time and nothing re-runs the risk assessment when they do. Recorded as D015.

Practical consequence: an agent with no mailbox that can execute code needs harder isolation than an agent with a mailbox that can only retrieve documents. Product category predicts neither.

## The delegation chain

An agent acts as the human who asked, and that assertion must survive every hop.

```
human identity
  -> agent identity (ID2, sponsor recorded)
    -> token exchange / on-behalf-of at the gateway
      -> tool server wrapping a governed API
        -> the record system's own entitlement check
```

Four properties make this chain trustworthy rather than decorative:

1. **Credentials are injected at execution and never held by the agent.** The gateway holds them; the agent holds a request.
2. **Entitlement is decided where it already lives.** The record system's permission model is authoritative. The tool layer is a wrapper, not a second policy engine. This is the wrap-do-not-reinvent principle from R04.
3. **The assertion is carried end to end** through token exchange and on-behalf-of flows, with the arriving standards enforced at the gateway.
4. **Sub-agents inherit a narrowed scope, never a widened one**, and purpose binding travels with the delegation.

## The deterministic boundary, in its final form

**Models may inform, never decide.** In the four zones where consequences are irreversible, the decision rule is deterministic over verifiable credentials and policies, and model output is an advisory input.

| Zone | What stays deterministic | What probabilistic signals legitimately do |
|---|---|---|
| Access control and entitlement | The authorisation decision | Risk scoring feeding conditional access policy |
| Movement of money | The authorisation decision, scoped by mandate | Fraud scoring on every transaction |
| Safety actuation | The safety function itself, and standards exclude machine learning from it | Advisory diagnostics and operator decision support outside the protection layer |
| Formal regulatory records | Attestation and the immutable record | Drafting and summarisation before attestation |

Three of the four zones already run probabilistic signals inside them, which is the point: the boundary is on the decision, not on the presence of a model. The convergent proof is the agentic payment stack built independently by three networks in 2025 and 2026, each landing on issuer-anchored or cryptographically signed mandates with hard constraints, consumed by deterministic authorisation.

**Implementation.** The authorisation boundary is policy-as-code in the tool-call path: a policy decision point the agent cannot bypass, evaluated on every consequential action. Sub-millisecond formally verified engines exist for the simple case, and richer policy languages handle joins. Deterministic information-flow control and formal output verification are available where the workload warrants them.

**Guardrails are the advisory layer, not the boundary.** Measured evasion against major commercial guardrails reaches 72% to 77%, and up to 100% in some configurations, and guardrail-triggered denial of service is itself exploitable. They retain genuine value for content policy, personal-data detection and telemetry, where a miss is tolerable. They are not an access control.

**The caveat that is easy to skip.** Deterministic authorisation bounds the blast radius; it does not protect intent formation. One of the payment protocols was red-teamed successfully via prompt injection operating entirely **within** mandate bounds. Upstream injection defence and human confirmation of intent remain necessary, and no gate substitutes for them.

## Threats, and where each is actually addressed

| Threat | Where it is addressed | The honest state |
|---|---|---|
| Prompt injection | Defence in depth: input handling, information-flow control, the deterministic gate bounding damage | Not solved. Bounded |
| Memory poisoning | Write governance with provenance and quarantine before promotion (R14) | Quantified exposure: under 0.1% of a store poisoned achieved over 80% attack success |
| Tool supply chain | Allowlists, signed and version-pinned servers, shadow-server discovery | Registry listing is not trust. This is the sentence to remember |
| Sandbox escape and exfiltration | Capability-tiered isolation, egress allowlists, no ambient credentials in sandboxes (R01) | Mature controls, inconsistently applied |
| Agent impersonation and spoofing | Workload identity attestation, server identity verification | Standards arriving; enforcement at the gateway |
| Human-trust exploitation | Disclosure duties, labelling of agent output in shared and public surfaces | Named in current threat taxonomies. No technical control at the model layer addresses it |

## Operations

Agent activity flows to the security operations centre as an extension of the existing function rather than a parallel one, with new runbooks rather than only new training. Credential revocation is drilled. Policy engines fail closed. The kill switch is multi-point, available at runtime, gateway, harness and identity plane, and an observability outage must not disable it.

**The unsolved piece, stated plainly.** Behavioural baselining for agents in the security operations centre is not solved. Agent behaviour is legitimately variable, so both the human-user and the workload baselining methods misfire. This is on the re-verification list rather than in the recommended architecture.

## Per-archetype floor

- **Global regulated enterprise.** ID2 for every production agent, capability-surface gating operated as a process rather than a policy document, and the deterministic gate on every consequential action. ID3 granted per capability with written justification.
- **Mid-market.** ID2 through the productivity vendor's agent identity, which is genuinely sufficient here. The realistic risk is ID1 by accident: shared API keys in an automation nobody registered.
- **Digital native.** Capability is present, the registry is the gap. The specific early move is a policy decision point in the tool-call path before the estate grows past the point where retrofitting it means touching every integration.

## Sources

research/R10-security-and-identity/sources.md carries the primary citations. Enforcement points in R03 and R04. Isolation in R01. Disclosure duties in R09 and R11. Decisions D013, D015, D019 in DECISIONS.md.
