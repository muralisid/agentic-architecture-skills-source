# Vendor Profile: AWS

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

**Bedrock AgentCore** (Runtime, Gateway, Identity, Memory), GA 13 October 2025 [vendor], plus **Bedrock Automated Reasoning checks** (GA August 2025) [vendor]. The positioning is a managed agent runtime rather than a framework, explicitly framework-agnostic.

## How it answers the bank

**Execution and isolation (A5, and the R01 questions).** The strongest runtime answer in the research: per-session microVMs, sessions up to eight hours, no CPU charge during input and output wait, and VPC or PrivateLink connectivity [vendor]. The no-charge-on-wait detail is economically meaningful for long-running agents, which spend most of their wall-clock waiting.

**Determinism (B).** Automated Reasoning checks are formal output verification, which is a genuinely distinct answer to B1 and B5: not a probabilistic guardrail, but a check with a proof obligation. Scope is narrow by design.

**Interoperability (F).** Framework-agnostic by positioning, which makes the runtime the portable substrate rather than a lock-in surface. This is the general direction the research observed across all three hyperscalers: the runtime is becoming portable while memory is not.

## Coverage

Core at R01 infrastructure and R07 agent platform (managed runtime). Real at R02, R03, R06, R10, R12, R14. Adjacent at R04, R05, R08, R09.

## Watchouts

- Memory is the lock-in surface here as everywhere. AgentCore Memory has no export standard and no published migration.
- The no-CPU-charge-on-wait economics apply to this runtime, not to the model meter behind it. Do not conflate them when modelling cost per run.

## Evidence status

Runtime characteristics and GA dates are vendor-published with documentation. No peer-reviewed comparison exists of self-hosted serving against this or any metered path.

## Sources

research/R01, R07, R10 vendors.md and sources.md.
