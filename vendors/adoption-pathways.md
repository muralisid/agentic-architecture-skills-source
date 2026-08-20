---
reader_summary: "Choose an embedded, independent, or mixed adoption path from data gravity, permissions, control ownership, and exit cost."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Select the adoption path that fits the target architecture before comparing individual vendor profiles."
prerequisites: ["/docs/vendors/coverage-matrix"]
reading_time: "3 minutes"
evidence_status: "Author synthesis grounded in the guide architecture and dated vendor capabilities."
next: "/docs/vendors/profiles/microsoft"
---

# Adoption Pathways by Vendor Gravity

As of August 2026. Phase 7. How four differently-shaped enterprises should realistically approach selection and sequencing.

---

## The principle that governs all four

**Gravity predicts where you start looking and which integration surfaces are cheapest. It does not predict where you should end up.** The evidence is direct: incumbents bundle agents into their suites, and 66% of Copilot deployers still run at least two other enterprise AI assistants (Gartner, June 2026), while 45% of martech leaders say incumbent vendor agents fail their expectations (October 2025). Paid attach runs at roughly 4 to 6% of installed base for both of the largest embedded offerings.

So each pathway below names what to take from the incumbent, where to stay independent, and what the exit costs.

## Pathway 1: The Microsoft shop

**Take from the incumbent.** Identity and the governance plane. This is the strongest genuine capability in the research, and building an agent identity plane next to Entra is work with no upside. Productivity agents too, because they are bundled and the solitary-work wins are real.

**Stay independent at.** Evaluation and observability, agent data engineering, and the systems-of-record layer. Agent 365's cross-cloud registry sync was announced without coverage for the suite vendors' own agents, so if your estate runs Agentforce or Joule agents you need a second view regardless.

**Exit cost.** Low on skills and tool definitions, high on memory and on the governance plane's accumulated policy. Budget the governance plane as a long-term commitment rather than a component.

**The characteristic error.** Assuming one gateway governs everything. It governs the metered estate; the licensed estate is telemetry extraction and tenant policy.

## Pathway 2: The Salesforce shop

**Take from the incumbent.** Agents that operate on customer records, where the data and its permission model live. Permission parity between the embedded and external paths is stated, which means this is a genuine choice rather than a forced one.

**Stay independent at.** Everything outside the customer domain. CRM gravity does not extend to ERP or ITSM, and the single-platform narrative is strongest exactly where the coverage data is weakest.

**Exit cost.** Moderate on the agent configuration, high on the accumulated topic and action definitions. Note the hard platform limits on agents, topics and actions per org as a capacity input.

**The characteristic error.** Wiring approval gates late. Agents here do not pause before consequential actions by default.

## Pathway 3: The SAP shop

**Take from the incumbent.** ERP-grounded agents, because the embedded-only access policy leaves no alternative for the SAP leg of any workflow.

**Stay independent at.** Orchestration. Since the SAP leg must route through the vendor's agent surface, your cross-suite orchestration should live somewhere that can call it, not inside it.

**Exit cost.** The highest structural cost of the four, because the constraint is a policy rather than a technical boundary and it therefore does not erode with your engineering effort.

**The characteristic error.** Designing a cross-suite workflow before modelling how its SAP leg is reached. Do that modelling first; it determines the architecture.

## Pathway 4: The cloud-native enterprise

**Take from the incumbent.** The managed runtime, which is explicitly framework-agnostic across all three hyperscalers and is becoming the portable substrate.

**Stay independent at.** Frameworks, which churn; and memory services, whose benchmarks are vendor-authored and publicly disputed between vendors.

**Exit cost.** Low on execution, high on memory, as everywhere.

**The characteristic error.** Building capability ahead of control. This pathway reaches the A4 gate with high autonomy and no oversight instrumentation more often than any other.

## What every pathway should refuse

- Memory features with no deletion.
- Ingestion tools with no provenance.
- Eval tooling with no path from production traces to datasets.
- Any optimisation service that cannot show its grader.
- Any claim of comprehensive guardrail protection.

## Sources

synthesis/archetype-grid.md for the gravity evidence; [coverage-matrix.md](coverage-matrix.md) for layer coverage; the profiles in [profiles/](profiles/) for per-vendor detail; research/R04, R03, R07, R12, R14 for the refusals.
