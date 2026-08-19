# Department Blueprint: Sales

As of August 2026. Phase 6. The department that absorbs the most budget and ranks mid-pack for production agents.

---

## 1. The scenario

A B2B sales organisation runs a CRM as the customer system of record, an outbound motion, an inbound qualification funnel, a quoting process, and a forecast cycle that consumes a day of every manager's week. Reps spend a widely lamented share of their time on administration.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Account research agent | Assembles account context from CRM, news, product usage and past interactions with provenance | A2, L1 | The unglamorous winner. Solitary work, measurable, contained |
| CRM hygiene agent | Proposes and applies structured updates from call notes and email | A3 on structured fields, A2 on narrative, L1 | Where the administrative time actually goes |
| Inbound qualification agent | Engages inbound enquiries, qualifies against stated criteria, routes | A3, L2 | Customer-facing. Inherits the entire customer-service control set |
| Forecast analysis agent | Explains pipeline movement against history, flags inconsistency | A2, L2 | Explains; the manager forecasts |

Deliberately absent: an autonomous outbound agent. See honest limits.

## 3. Planes activated

Action (**direct**: CRM gravity is strongest here, and agents reach records through wrapped governed APIs), Knowledge (**direct**), Improvement (**direct**), Control (**direct** for the inbound agent, which sits in the customer-facing lane), Human, Evidence, Execution (supporting).

## 4. Controls

- Agents act as the requesting user; CRM entitlement and territory rules stay in the CRM.
- The inbound qualification agent is customer-facing and gets the customer-facing edge: disclosure, escalation to a real human, resolution instrumented, conversation retention.
- Commitments are gated. Pricing, discounting and contractual terms are not agent decisions.
- CRM write access follows a trust progression: structured field updates first, narrative later, never both on day one.

## 5. Economics

**Per run.** Low to moderate.

**Per resolved outcome.** The honest unit here is not deals. It is administrative hours recovered per rep per week, and qualified-opportunity rate for the inbound agent. Attributing revenue to a sales agent is a claim the guide will not help anyone make.

## 6. Honest limits

- **Sales and marketing absorb outsized budgets while ranking mid-pack for production agents.** One contested-methodology study frames that budget concentration as the signature misallocation of the current wave. The concentration is real even where the study's methodology is disputed.
- **Autonomous outbound is a reputational liability with a compliance surface.** Disclosure duties apply, anonymous recipients are not bound by an acceptable-use policy, and the failure is public. The guide does not recommend it.
- Product-usage and intent data quality caps the account research agent, and in most enterprises that data is worse than the CRM.
- No published measurement exists of agent effect on win rate that separates the agent from the sales process changes shipped alongside it.

## 7. Metrics

Administrative hours per rep per week, measured rather than surveyed. CRM field completeness and correction rate. Inbound response time and qualified-opportunity rate. For the qualification agent, the full customer-facing metric set including repeat contact.

## Sources

research/R04-systems-of-record/ (CRM gravity, write trust progression), research/R09-experience-and-channels/ (the inbound agent's control set), [../../synthesis/vision-and-target-state.md](../../synthesis/vision-and-target-state.md) (budget concentration).
