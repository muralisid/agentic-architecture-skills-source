# Vision and target state: working outline

Status: Phase 1 outline for review. The essay is drafted after interview 01 answers land; the maintainer's factory-floor story opens it in his own words.

## 1. The factory floor

A modern bottling plant runs with no human doing the physical work. A few skilled people watch the line, guide it, and step in when bottles stack wrong or a machine jams. The claim of this guide: knowledge work is heading to the same shape, and the architecture that gets an enterprise there safely can be described, layer by layer.

## 2. What "agentic enterprise" means (testable definition)

An enterprise where routine knowledge work executes through governed agents while humans set intent, supervise, manage exceptions, and hold accountability. Observable criteria (draft, to be finalized with interview 01):

- Every department operates named agents with owners, Sponsors, and risk tiers in a catalog
- Routine work items flow to agents by default; humans receive exceptions, approvals, and judgment calls
- Every agent action is attributable, auditable, and reversible or gated
- Agent changes ship through evals and staged rollout, like software
- Cost per task is known; someone owns the unit economics

## 3. What stays human

Intent and goal-setting, accountability (the Sponsor pattern), exception handling, relationship and trust work, judgment under ambiguity, and the governance of the machines themselves. The guide is explicit that "lights-out" applies to routine execution, not to responsibility.

## 4. The autonomy maturity model (A0 to A5, draft)

| Level | Name | Work execution | Human role | Required controls |
|---|---|---|---|---|
| A0 | Manual | Humans with conventional tools | All work | n/a |
| A1 | Assisted | Copilots suggest; humans execute | All decisions and actions | Basic usage policy |
| A2 | Delegated tasks | Agents execute bounded tasks on request | Review every output | Task scoping, output review, audit |
| A3 | Supervised autonomy | Agents run routine workflows end to end | Approve irreversible actions, handle exceptions | Approval gates, evals, budgets, kill switch |
| A4 | Managed autonomy | Agent teams run routine operations to SLOs | Manage exception queues; supervise | Eval-gated change, concern register enforced, supervisor dashboards |
| A5 | Governed lights-out | Full routine automation in scoped domains | Set policy, own accountability, audit outcomes | Proven eval maturity, continuous assurance, regulator-ready evidence |

The bottling plant floor is A3 to A4. A5 is earned per domain, never declared enterprise-wide.

## 5. The layered master view

The enterprise landscape layers (infrastructure, data, integration, systems of record, LoB/OT, intelligence, productivity, experience) plus the genuinely new layer (the agent platform), with security/identity, governance/sovereignty, and observability/FinOps as enforced cross-cutting planes. The master diagram will explicitly draw the data pipelines that organize enterprise data into the agent memory tiers (L1 to L5), because grounding and memory are supplied by pipelines, not by wishes. Produced as a diagram after Batch A research; described in prose in the Phase 1 essay.

## 6. Design principles (draft ten)

Six adapted from industry-converged practice: secure by design; deterministic by default; evidence before answer; integration controlled; governed memory; continuous improvement, governed.
Four added by this program: who pays the loop is a design input; govern both estates (licensed and metered); memory portability is an exit requirement; curation before context.

## 7. Day in the life (deferred to blueprints)

Role vignettes (executive, department manager, specialist, agent supervisor) are drafted per department in Phase 6, using the scenario-activation format.

## 8. What this guide is not

Not a vendor pitch, not hype amplification. Every recommendation passes the simplest credible alternative test; every hyped default gets challenged in the open.

## Open questions for interview 01

Captured in knowledge/interview-01-founding-pov.md; the essay is written only after those answers land.
