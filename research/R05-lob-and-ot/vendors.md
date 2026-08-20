---
reader_summary: "Compare line-of-business systems and operational technology vendors against the capabilities and evidence this layer actually requires."
audience: ["Enterprise architect","Line-of-business and OT lead","Procurement and vendor-management lead"]
decision_or_output: "Produce an evidence request and shortlist for line-of-business systems and operational technology; market presence alone is not sufficient."
prerequisites: ["/docs/layers/r05-lob-and-ot/findings","/docs/frameworks/vendor-question-bank"]
reading_time: "2 minutes"
evidence_status: "Time-sensitive vendor landscape: verify current capabilities, availability, and terms with primary evidence."
next: "/docs/layers/r05-lob-and-ot/sources"
---

# R05 Line-of-Business and Operational Technology: vendor map

As of 2026-08-19. Vendor capability claims are vendor-published unless third-party sourced. Re-verify quarterly.

| Vendor / product | Category | Maturity (Aug 2026) | Notes |
|---|---|---|---|
| Honeywell (Alarm Guidance with Chevron; Experion Operations Assistant) | Process control, alarm assistance | Shipped Oct 2024; refinery pilot Nov 2025 | Advisory; the clearest shipped instance of pattern A [vendor] |
| Yokogawa FKDPP | Autonomous closed-loop control (RL, not LLM) | Production at two named plants since 2023 and 2025 | The counterexample to universal human control; simulator-validated, phased, SIS retained [vendor] |
| IBM Maximo (Condition Insights Agent, Maximo Assistant) | EAM advisory agents | 2025-2026; investment-planning agent slated 2026 | Explicitly advisory: humans act on insights [vendor] |
| SAP asset and service agents | EAM | Production Planning and Operations Agent GA planned Q1 2026 | Widely cited asset-agent trio traces to partner blogs, not SAP primaries; treat as unconfirmed [vendor] |
| Salesforce Agentforce for Field Service; ServiceMax/PTC | Field service agents | Scheduling and troubleshooting GA 2025 | No named utility customer with published outcomes; offline behavior unspecified [vendor] |
| NREL eGridGPT (reference architecture) | Control-room research | Published May 2024 | The validation-loop pattern; reviewed by two grid operators |
| FoSMo (National Grid, Keen AI, four GB networks); EPRI Open Power AI Consortium | Shared asset-data efforts | SIF Alpha Jun 2026; consortium from Mar 2025 | Data pooling because most utility data is behind walls |

Agent-washing watch: alarm products claiming risk reduction (they cannot be credited as protection layers); field agents whose offline mode is undefined; MES agent case studies with unattributed percentage claims.

---
