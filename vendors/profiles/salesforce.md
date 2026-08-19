# Vendor Profile: Salesforce

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

**Agentforce**, embedded in the CRM that holds roughly 20.0% market share, five times its nearest rival (IDC via Salesforce, April 2026 [vendor-published]). Two access paths as of 2026: agents embedded in the platform, and an external path through hosted MCP (GA for Enterprise and above, April 2026) plus Headless 360 MCP (beta, July 2026) [vendor].

## How it answers the bank

**Identity and access (A).** Permission parity between the embedded and external paths is stated explicitly [vendor], which is the claim that collapsed the older assumption that embedded means governed and external does not. This is the finding behind D016.

**Determinism (B).** The B3 answer matters and surprises buyers: **Agentforce agents do not pause before consequential actions by default** [vendor]. Approval gating is something you wire, not something you inherit. Ask for the current default in writing.

**Economics (D).** Metered at the agent-action level, listed at $0.10 per action [vendor], which is among the clearest meters in the market. Note the hard platform limits on agents, topics and actions per org [vendor]; they are a capacity-planning input, not a footnote.

**Interoperability (F).** MCP support on both paths. MuleSoft supplies a large connector estate that is a credible tool-catalog candidate, though vendor connectivity survey claims should be held to the evidence bar.

## Coverage

Core at R04 systems of record (customer records) and R09 experience. Real at R03 (MuleSoft), R05 (Field Service), R07. Adjacent elsewhere. The matrix cell to watch is R12, where coverage is claimed rather than demonstrated.

## Watchouts

- **CRM gravity does not extend to ERP or ITSM.** The single-platform narrative is strongest in this vendor's material and weakest in the coverage data: the top ten ERP vendors hold only 30.9% combined, so a CRM-anchored agent strategy inherits fragmentation everywhere else.
- Paid attach runs at roughly 4 to 6% of the installed base.
- Field service agents ship with no named utility customer publishing outcomes, and offline behaviour is unspecified [vendor]. For the utilities blueprint, that is a blocking gap rather than a detail.

## The worked example

The "only we connect these six systems" slide is the guide's canonical exercise in neutralising vendor narrative. Run it through F1, A4, C3, D1 and F2 of the question bank. The claim is usually true and almost never the point: every one of the six has a governed API, and the real questions are where entitlement is decided, whether permissions reach the index built across them, what each connection costs to run, and what happens to them if you leave.

## Evidence status

Permission parity, metering and platform limits are vendor-published and documented. Market share is vendor-published from a third-party tracker. Attach rates are analyst-derived from earnings.

## Sources

research/R04, R09, R03, R05 vendors.md and sources.md; synthesis/archetype-grid.md.
