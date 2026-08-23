---
reader_summary: "Check which volatile legal, product, price, standards, and market claims require a fresh source before use."
audience: ["Enterprise architect","Risk and assurance lead","Guide contributor"]
decision_or_output: "Identify claims that must be re-verified before they support a current architecture or procurement decision."
prerequisites: ["/docs/about-evidence"]
reading_time: "3 minutes"
evidence_status: "Freshness register: each item records why it is volatile and when it should be checked again."
next: "/docs/changelog"
---

# The Re-verification List

Volatile facts carry an as-of date of August 2026. This list is reviewed quarterly, and every item names what to check and where the claim is used. Staleness is the main threat to a reference guide in this category.

---

## Completed for the August 2026 release

| Item | Result | Primary source |
|---|---|---|
| Joint agentic-AI cyber guidance date | Verified as May 1, 2026 on the CISA release bulletin and Australian Cyber Security Centre publication page | https://content.govdelivery.com/accounts/USDHSCISA/bulletins/41544ff; https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services |
| FINRA AI recordkeeping language | RN 24-09 preserves existing technology-neutral obligations and creates no new interpretation. RN 25-07, published April 14, 2025, asks for comment on AI-generated communications and recordkeeping; it is not a final interpretation | https://www.finra.org/rules-guidance/notices/24-09; https://www.finra.org/rules-guidance/notices/25-07 |

---

## Due Q4 2026

| Item | What to check | Where it is used |
|---|---|---|
| OpenTelemetry GenAI semantic conventions | Whether the conventions have reached a stable release. Not stable as of mid-2026 | R12 findings; the observability category profile. The single most important item on this list |
| Dynatrace and Arize | Whether the transaction announced 13 August 2026 closed, and what happened to the open-source project | R12 vendors; evaluation and observability profile |
| MCP registry and server trust | Registry status and whether signed and pinned server distribution has matured | R03 findings; gateways and identity profile |
| EU AI Act enforcement | Article 50 enforcement in practice since 2 August 2026, and any movement on classification guidelines | R11 findings; sovereignty matrix; HR and public sector blueprints |
| Kubernetes Agent Sandbox | Production readiness | R01 findings |
| Generative and encoder price table in the economics experiment | Whether the per-token prices as of 2026-08-19 still hold; the cost ratio is recomputed from the editable price table in the benchmark artifact. The constant-factor claim, not the prices, is the position | Research pages: the cheap gate and the bill; the recommended approach |
| Framework consolidation | Whether the agent framework field has consolidated further, and support states | R07 findings and vendors |

## Due H1 2027

| Item | What to check | Where it is used |
|---|---|---|
| SOC behavioural baselining for agents | Whether any vendor has a credible answer. Unsolved as of August 2026; re-check after RSAC 2027 | R10 findings; concerns matrix open gaps |
| Provenance-carrying grounding as audit evidence | Whether Big Four methodologies or JTC 21 standards give it formal recognition | R11 findings; economics of the evidence floor |
| Agent lifecycle patterns | Whether registry-governed lifecycle has moved from proof of concept to observed operation | R07 findings |
| Memory-service benchmarks | Whether any independent benchmark exists. All current claims are vendor-authored and disputed between vendors | R14 vendors; memory-pipeline architecture |
| Multi-agent incident reporting | Whether any regulator or standards body has published a frame. None exists as of August 2026 | R11 findings; concerns matrix open gaps |

## Standing items, checked every quarter

| Item | Why |
|---|---|
| All vendor pricing and packaging | Product facts in this market change quarterly. Outcome pricing, per-action metering and governance-plane pricing are all list prices as of mid-2026 |
| The vendor coverage matrix | Consolidation is active in security, identity and observability. A coverage matrix is a dated artifact |
| `skills` CLI discovery from a bare domain | Whether `npx skills add <domain>` reaches `/.well-known/agent-skills/index.json`. At CLI 1.5.23 (August 2026) it downloads the domain directly and fails, while its own error message recommends that form. Re-check on a CLI release and restore the instruction when it works | The install page; the public skills README |
| Product names on the one-page wall chart | Names and availability move faster than capability. Re-verified every two months against primary sources; the per-layer vendor tables were archived on 2026-08-23 rather than maintained at that rate |
| Vendor question-bank answers collected from suppliers | An answer more than two quarters old is a hypothesis, not a fact |

## Items deliberately not on this list

Claims sourced to peer-reviewed research, standards texts, regulation, and primary human-factors literature. These age slowly and are cited with dates. The 1983 residual-work finding underpinning the founding metaphor has been stable for four decades and is not a re-verification candidate.
