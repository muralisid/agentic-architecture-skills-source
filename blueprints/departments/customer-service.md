---
reader_summary: "Adapt the Customer Service blueprint: target workflow, agent and human roles, deterministic gates, economics, metrics, and honest limits."
audience: ["CIO/CTO","Enterprise architect","Customer-service lead"]
decision_or_output: "Record the target workflow, accountable roles, deterministic controls, success measures, and stop conditions for Customer Service."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Blueprint synthesis: cited evidence, vendor-reported findings, author positions, and honest limits are labelled inline."
next: "/docs/blueprints/departments/finance"
---

# Department Blueprint: Customer Service

As of August 2026. Phase 6. The most publicly visible agent deployment, and the most reversible.

---

## 1. The scenario

A consumer business handles contacts across chat, email and voice. Volume concentrates in a narrow set of intents: order status, returns, billing disputes, account changes, and a long tail of everything else. A knowledge base exists. Agents work from macros. Executives have seen a demo promising 70% deflection.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Intent and triage agent | Classifies, retrieves the customer's own context, routes | A3, L2 | The safest and most valuable agent in the department |
| Resolution agent | Handles the narrow, well-instrumented, recoverable intent set end to end | A3, L2 | Scope by intent, never by channel |
| Account action agent | Executes bounded account changes within the customer's own scope | A3 on reversible actions, A2 on irreversible, L1 | Refunds and commitments are gated. See controls |
| Agent-assist | Drafts and retrieves for a human handling the tail | A1, L1 | Consistently the highest-return application in the department and the least demoed |

## 3. Planes activated

Knowledge (**direct**: a governed knowledge base, never model memory), Human (**direct**: escalation to a real queue), Evidence (**direct**: conversations are legal evidence), Action (**direct**), Control (**direct**: a separate edge on the shared control plane), Improvement (**direct**: customer escalations label failures for free, making this the highest-value trace source in the enterprise), Execution (supporting).

## 4. Controls

- **Mandatory AI disclosure.** Article 50 transparency duties are enforceable from 2 August 2026. No agent presents as a named human.
- Customer identity and entitlement checked before any account action; the agent acts strictly within the customer's own scope.
- Irreversible actions gated: refunds above a threshold, contractual commitments, account closure.
- Escalation to a real human queue, wired with working-state transfer, **before launch**. Never manufacture containment through queue unavailability.
- A vulnerable-customer path that bypasses the agent.
- Full conversation retention as legal evidence.
- Hardening for the public prompt-injection surface. Users here are anonymous and sometimes adversarial, unlike authenticated employees under an acceptable-use policy.

## 5. Economics

**Per run.** Roughly an order of magnitude below a human contact. Outcome-priced offerings list between $0.99 and $2.00 per automated resolution against a $6 to $12 human-handled comparator, all vendor list pricing as of mid-2026.

**Per resolved outcome.** Divide by resolution, and track repeat-contact rate beside it. A conversation that ends without escalation scores as contained whether the customer was helped or gave up, and re-contact multiplies true cost per issue while the dashboard improves.

## 6. Honest limits

- **Every documented reversal of an AI-first service programme set a containment or headcount target.** This is the strongest single finding in the department and it is a target-setting failure, not a technology failure.
- 74% of surveyed senior decision-makers had already rolled back or shut down a customer AI communications agent after a governance failure, rising to 81% among organisations with mature guardrails. Maturity correlates with catching failures, not avoiding them.
- **Statements here bind externally.** A tribunal held a company responsible for what its chatbot told a customer, rejecting the argument that the chatbot was a separate legal entity. A 2026 German appellate decision held that a chatbot is part of corporate communication rather than a third party, that liability attaches regardless of training-data provenance, and that general disclaimers do not provide sufficient protection.
- **No credible independent escalation-rate benchmark exists** as of mid-2026. The guide states the absence rather than repeating circulating figures.
- No independent production accuracy figures exist for voice agents; published latency distributions come from small vendor samples.

## 7. Metrics

Resolution rate. Repeat-contact rate within a defined window. Escalation by trigger. Containment reported only alongside resolution, never alone. Time to human when escalation fires. Complaint and regulator-contact rate. Cost per resolved issue.

## Sources

research/R09-experience-and-channels/findings.md and sources.md. Disclosure duties: research/R11-governance-risk-sovereignty/. Trace value: [../../synthesis/learning-loops-map.md](../../synthesis/learning-loops-map.md).
