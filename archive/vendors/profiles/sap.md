---
reader_summary: "Assess SAP against the guide's architecture, control, evidence, economics, and exit requirements."
audience: ["CIO/CTO","Enterprise architect","Procurement and vendor-management lead"]
decision_or_output: "Decide whether SAP merits workload-specific due diligence, and record evidence gaps and exit risks."
prerequisites: ["/docs/frameworks/vendor-question-bank","/docs/frameworks/vendor-scorecard"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor profile: vendor-published claims are labelled and require current contractual verification."
next: "/docs/vendors/profiles/aws"
---

# Vendor Profile: SAP

As of August 2026. Vendor-published facts flagged; product facts on the quarterly re-verification list.

---

## What it is

**Joule**, plus **Joule Studio 2.0** (pro-code rebuild, May 2026) [vendor]. The distinguishing fact is a policy rather than a capability: **agentic access to SAP is required to go through Joule**, which makes this the one major system of record in the research with an embedded-only posture. Bidirectional A2A is planned for Q4 2026 [vendor].

## How it answers the bank

**Identity and access (A), interoperability (F).** The embedded-only policy is the answer to most of section F, and it is a restrictive one. Where the other four major suite vendors shipped external agent paths with stated permission parity in H1 2026, this one did not. Two analyst firms have publicly criticised the position [vendor context].

**Determinism (B), memory (C).** Not established in public material to the standard the bank asks for. Ask directly.

## Coverage

Core at R04 (ERP records). Real at R02, R03, R05, R07. Adjacent elsewhere.

## Watchouts

- **The embedded-only policy is an architecture constraint on your whole estate, not a product limitation.** A workflow spanning SAP, a CRM and an ITSM platform must route its SAP leg through the vendor's own agent surface. Model that before committing, because it determines where your orchestration lives.
- Widely cited claims about an SAP asset-agent trio trace to partner blogs rather than primary vendor material and should be treated as unconfirmed [vendor].
- ERP gravity is the weakest of the major categories, with the top ten vendors holding 30.9% combined, so ERP-anchored agent strategies inherit fragmentation.

## Evidence status

The access policy and Studio rebuild are vendor-published. The analyst criticism is reported. Several circulating capability claims are unconfirmed and flagged as such in the source track.

## Sources

research/R04, R05, R02 vendors.md and sources.md.
