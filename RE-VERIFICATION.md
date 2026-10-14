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

## Added for the memory architectures section, September 2026

| Item | Why volatile | Where used | Re-check |
|---|---|---|---|
| Context windows, long-context price tiers and cache rates for every model family on the long-context page | Prices change quarterly; one Flash line changes price on 2027-01-01; one provider re-routed its Pro model on 2026-09-14 | /memory/long-context-is-not-memory | December 2026, against first-party pricing pages |
| Status of the four managed memory services (one still in preview as of 2026-06-02) | Preview to GA transitions | /memory/six-architectures | December 2026 |
| Every vendor benchmark row: LoCoMo, LongMemEval and BEAM scores reported by memory vendors | Vendors re-publish monthly under new judges | /memory/what-the-benchmarks-measure, /memory/the-ten-million-token-question | December 2026 |
| Whether an independent evaluation of any commercial memory system on BEAM has appeared | Would change the section's open question | /memory/the-ten-million-token-question | December 2026 |
| The MemPalace benchmark file and history page | The project has retracted claims before | /memory/what-we-have-measured | December 2026 |

## Completed for the August 2026 release

| Item | Result | Primary source |
|---|---|---|
| Joint agentic-AI cyber guidance date | Verified as May 1, 2026 on the CISA release bulletin and Australian Cyber Security Centre publication page | https://content.govdelivery.com/accounts/USDHSCISA/bulletins/41544ff; https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services |
| FINRA AI recordkeeping language | RN 24-09 preserves existing technology-neutral obligations and creates no new interpretation. RN 25-07, published April 14, 2025, asks for comment on AI-generated communications and recordkeeping; it is not a final interpretation | https://www.finra.org/rules-guidance/notices/24-09; https://www.finra.org/rules-guidance/notices/25-07 |

---
| OpenAI self-serve fine-tuning wind-down | Announced 7 May 2026. New organisations blocked 7 May 2026; organisations without fine-tuned inference in 60 days blocked 2 July 2026; all remaining customers blocked 6 January 2027. Used on /ladder/adapters-and-fine-tuning. Re-check before the January 2027 date passes | https://developers.openai.com/api/docs/deprecations |

## Added 14 October 2026: corrections round

| Item | Why volatile | Where used | Re-check |
|---|---|---|---|
| Agent identity GA states: Okta (scheduled 30 Apr 2026, unconfirmed), SailPoint (trade press 4 Aug 2026), CyberArk now Idira (vendor blog Jan 2026), Ping (announced 27 May 2026); Microsoft Agent 365 parts still in preview at GA (agent user accounts, cross-cloud registry sync); AWS Agent Registry GA date given as 31 Aug and 6 Aug 2026 | Preview to GA transitions; vendor pages change | R10 target-state table and identity mechanics; identity chain | January 2027, against each vendor's own release notes |
| Microsoft FIDES status (experimental, Python-only, no code-execution support as of 7 Oct 2026) | A framework feature can graduate in one release | R10 policy decision point; enforcement page | January 2027 |
| gVisor host code-execution flaw reported in 2026 on one aggregator page | Unconfirmed against the project's advisories | R01 sandbox section and evidence | Before the next R01 edit |
| ASD ISM agent controls ISM-2133 to ISM-2135 and amended ISM-2113 (September 2026) | Control numbers taken from a compliance firm's walkthrough; the ISM release notes timed out | R10 threat canon | Against cyber.gov.au before quoting a number |
| MAS AI risk management guidelines phasing (12 and 24 months from 7 Oct 2026) | Transition dates from the response-to-feedback paper | R10 and R11 | On the MAS page before the first milestone |
| OAIC automated-decision transparency rule start, 10 Dec 2026, and the Commonwealth AI impact-assessment deadline, 15 Dec 2026 | Read through law-firm summaries and search excerpts; government pages timed out | R11 regulatory geometry | On the OAIC and DTA pages before December 2026 |
| Queensland FAIRA: policy says required, framework page says non-mandated | The agency may reconcile the two pages | R11 regulatory geometry | December 2026 |
| Card-network agent dispute and liability rules (none binding as of Oct 2026; one forecast says April 2027 at the earliest) and Coinbase x402 agent-wallet budget design | Network rules are being written | R10 payment stack; deterministic zones | April 2027 |
| SAP utilities agents dated Q2 and Q3 2026 in user-group coverage | Dates slipped once already; shipped status unconfirmed on 14 Oct 2026 | Utilities use cases (pending rebuild) | Before the utilities pages publish |
| AER automated-bidding guideline update (bulletin of 5 Aug 2026 read through a law-firm alert) | The guideline deadline was delayed | Utilities use cases (pending rebuild) | Before the utilities pages publish |
| Model-based approvers as defaults: Codex Auto-review (30 Apr 2026) and Claude Code auto mode as default (14 Aug 2026); AWS guardrail scores feeding AgentCore Policy | Vendor defaults and figures (99.1 percent auto-approved; 13.6 against 89 percent) change with releases and are unreplicated | Deterministic zones; enforcement; risk profile | January 2027 |
| Agentic payment stack: AP2 spec version, Visa TAP, Mastercard Verifiable Intent (co-development with Google read through search summaries), Stripe shared payment tokens, Coinbase x402 agent wallets | Protocols are months old and liability rules are unwritten | Deterministic zones, movement of money | April 2027 |
| CSA agentic autonomy levels v2.0 (18 Mar 2026) and the Agentic Universe draft (1 Apr 2026) | Reported as AI-assisted and not formally reviewed; may be revised or withdrawn | Risk profile crosswalk; agent types | January 2027 |
| Anthropic's measure of 0.8 percent of tool calls appearing irreversible (18 Feb 2026) | Vendor telemetry on its own platform, not independently checked | Agent types, evidence | When an independent measure appears |
| Entra Agent ID sponsor rules (sponsor required at creation; passes to the leaver's manager), updated 3 Sep 2026 | Vendor-documented product behaviour, subject to change | Agent lifecycle; identity chain | January 2027 |
| Utilities figures reported by vendors or consultancies: AGL 36 percent containment (IBM), PG&E 67 percent (PolyAI), Vector pole inspection times (Tapestry), Westnetz 90 percent and EWE 99.5 percent (consultancy citing PwC), Kraken's A$170 million at Origin against Origin's own A$100 to 150 million | Self-reported outcomes that the reporters may revise; the Origin deck was seen only in a search excerpt | Utilities, energy, billing exceptions, vegetation and water pages; utilities blueprint | January 2027, against the utilities' own filings |
| Packaged-application vendor counts and dates: SAP agent and skill counts (Q1 2026) and the Autonomous Suite (12 May 2026), Oracle's edition exclusions (Forrester, 8 May 2026), Salesforce Agentforce revenue (27 May 2026) and per-action pricing, Microsoft Dynamics 365 agent dates (April to September 2026) | Vendor marketing counts and roadmap dates move quarterly | Agents and packaged applications | January 2027 |

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

## September 2026 industrial examples

Next review: December 2026, or before an adoption decision. The following are vendor descriptions, not independently verified outcome claims.

- [NVIDIA video search and summarization](https://build.nvidia.com/nvidia/video-search-and-summarization/blueprintcard): supported inputs, deployment requirements, and documented capability. Checked 2026-09-17.
- [Roboflow Workflows](https://docs.roboflow.com/workflows): supported processing and integration features. Checked 2026-09-17.
- [LandingAI document grounding](https://landing.ai/llms/visual-grounding-and-auditability-how-landingai-ade-makes-every-extraction-defensible): source-page grounding claims and product scope. Checked 2026-09-17.
- [AiDASH vegetation management case](https://www.aidash.com/resource/aidash-transforming-vegetation-management-for-national-grid-using-satellite-analytics-and-ai/): current case description. Checked 2026-09-17.
- [AlphaEarth annual embeddings](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL): availability, annual intervals, resolution, and comparability across releases. Checked 2026-09-17.
