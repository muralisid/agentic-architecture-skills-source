# Mining and resources

Start with a bounded investigation or evidence task. Mining examples in this guide build on safety, production, and audit work described by the author; complete agent extensions remain proposals.

## Opportunities

- [Safety coaching from CCTV events](/use-cases/safety-coaching).
- [Investigate production discrepancies](/use-cases/production-measurement).
- [Collect and check compliance evidence](/use-cases/compliance-evidence).
- [Investigate recurring audit issues](/use-cases/systemic-audit-issues).

Each opportunity uses one proposed agent. The A x L positions and zones are this guide's position, not observed deployments.

| Agent | What it does | A x L position | Zone or floor it touches | Evidence status (D017) |
|---|---|---|---|---|
| Safety coaching agent | Checks a detected CCTV event against the safety procedure. Drafts coaching for a safety owner to approve | A2, L1 | People-decisions floor. The agent never decides discipline or any other matter about a person | Proposal. Builds on the author's earlier CCTV risk work. The agent extension has not been deployed |
| Production discrepancy agent | Checks measurements, sensor health and operating records when production estimates disagree. Prepares a reconciliation case | A2, L1 | Formal regulatory records. A person accepts any change to the production record | Proposal. Builds on the author's computer-vision measurement work. The agent extension has not been deployed |
| Compliance evidence agent | Asks the owning team for a specific record. Checks issuer, date and scope. Prepares a traceable package for the reviewer | A2, L1 | Formal regulatory records. A named person attests | Proposal. Builds on the author's earlier standards-to-checklist work |
| Audit pattern agent | Tests competing explanations for findings that recur across sites. Requests the records that would confirm or rule out each one | A2, L1 | Formal regulatory records, read only. An engineering or assurance owner decides the response | Proposal. Builds on the author's topic-modelling work on audit gaps |

A2 means delegated tasks, with a person reviewing every output. L1 means curated learning: people update what the agent knows, offline, and review each change before release. The zones are set out on the [deterministic zones](/architecture/deterministic-zones) page. None of these agents touches safety actuation. Equipment, isolation and stop decisions stay in the site's approved control systems.

## Enterprise capabilities

Use verified asset identity, dated observations, governed access to records, and reliable work-order interfaces. Preserve measurement uncertainty and field evidence. An agent can gather and explain evidence; the responsible operating process controls physical actions and formal assurance.

## Start and measure

Choose one site, zone, or process with a clear owner and representative historical cases. Compare with existing alarms, rules, and expert review. Measure confirmed outcomes, false conclusions, review time, and total cost. Test interrupted work and conflicting information before expanding.

## People and controls

Assign an operational owner, an engineering reviewer, data owners, and a support route. Do not count generated work items as completed field work. Use the same access boundaries during evaluation as during production.

Score each agent on the [risk profile](/architecture/risk-profile) and register it with a named sponsor through the [agent lifecycle](/architecture/agent-lifecycle).

## Explore the design

- [Enterprise architecture](/architecture).
- [Industrial systems](/layers/r05-lob-and-ot).
- [Knowledge and memory](/memory).
- [Value and investment](/use-cases/value-and-investment).

## Evidence and limits

These are proposed applications. Their value and safety require evaluation on local data and within the organization's operating procedures. The linked cases distinguish practitioner experience from external evidence and proposed extensions.

The research round of October 2026 did not cover mining. No mining deployment was researched, so this page names none and cites no outside result. Each agent above is a proposal built on work the author described. None is evidence that the full agent works. The page has no external sources yet.
