# Department Blueprint: Finance

As of August 2026. Phase 6. Two of the four deterministic zones live in this department.

---

## 1. The scenario

A finance function runs accounts payable and receivable, procurement, month-end close, management reporting, treasury, and statutory reporting. Invoice matching is partly automated and heavily exception-driven. Close is a fixed calendar with a compressed tail. Statutory filings carry personal accountability.

## 2. Agent team design

| Agent | What it does | A x L position | Notes |
|---|---|---|---|
| Invoice exception agent | Investigates match failures, gathers evidence, proposes disposition | A3, L2 | The highest-volume, best-labelled work in the department |
| Reconciliation agent | Explains variances across ledgers and subledgers with provenance | A2 to A3, L2 | Explains; the accountant disposes |
| Close assistance agent | Assembles schedules, chases open items, drafts commentary against actuals | A2, L1 | Compresses the tail of close, which is where the overtime lives |
| Reporting draft agent | Drafts management and statutory narrative from governed numbers | A1 to A2, L1 | Drafts only. Attestation is deterministic and human |

## 3. Planes activated

Knowledge (**direct**: semantic contracts on every numeric answer), Action (**direct**: wrapped ERP and banking APIs), Control (**direct**: the two deterministic zones), Evidence (**direct**: records regimes), Human (**direct**), Improvement (supporting), Execution (supporting).

## 4. Controls

- **Movement of money is a deterministic zone.** Payment authorisation is a rule over verifiable credentials and mandates. Fraud and anomaly scoring feed that rule as advisory input, which is exactly how card networks already work. The convergent proof is the agentic payment stack built independently by three networks, each landing on scoped, revocable, cryptographically bound mandates consumed by deterministic authorisation.
- **Formal regulatory records are a deterministic zone.** Records regimes mandate accountability and immutable records, not deterministic generation. Drafting with a model is permitted; attestation is not delegable. The cautionary tale is a public professional-services refund after AI-generated content reached a government deliverable.
- Semantic contracts gate every numeric answer, which converts a class of silent wrong numbers into visible refusals.
- Segregation of duties survives agent introduction: the agent that proposes a payment cannot be the agent that approves it, and neither decides entitlement.
- Model risk management alignment where the enterprise operates one.

## 5. Economics

**Per run.** Moderate. Exception investigation is retrieval-heavy with tool fan-out.

**Per resolved outcome.** Cost per exception cleared, including the accountant's review minutes. The value is concentrated in the close calendar rather than in per-invoice cost: hours recovered in the compressed tail are worth more than the same hours recovered in week two.

## 6. Honest limits

- Spreadsheet and numeric analysis is a documented weak spot. In observed-task testing, spreadsheet data analysis was **slower and less accurate** than working without the tool. Treat any agent proposal that centres on ad-hoc numeric analysis with suspicion, and route numbers through the semantic layer rather than through the model.
- No published production case exists of an agent with autonomous payment authority in a regulated enterprise, and this guide would not recommend one if it did.
- Fine-grained entitlement in ERP estates is frequently the real blocker. If the human permission model is loose, an agent acting as the requesting user inherits the looseness.

## 7. Metrics

Exception clear rate and rework rate. Close-tail hours. Refusal rate on numeric questions, which should be visible and stable. Segregation-of-duties violations, which should be zero and are worth alerting on. Cost per exception cleared including review.

## Sources

research/R04-systems-of-record/, research/R10-security-and-identity/ (deterministic zones and the payment stack), research/R11-governance-risk-sovereignty/ (records regimes), research/R08-productivity-and-collaboration/ (the numeric-analysis finding), research/R02-data-platform/ (semantic contracts).
