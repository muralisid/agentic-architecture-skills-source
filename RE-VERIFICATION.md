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

## Added 15 October 2026: industry estates and the capabilities frame

| Item | Why volatile | Where used | Re-check |
|---|---|---|---|
| AWS Bedrock AgentCore component list (Runtime, Gateway, Memory, Identity, Policy, Evaluations, Observability) and GA dates | Vendors rename and add components | /architecture/system-view, vocabulary audit | Quarterly, AWS what's-new |
| Microsoft Agent 365 as "the control plane for agents" (GA 1 May 2026) and Entra Agent ID sponsor rules (updated 3 September 2026) | Product wording and sponsor hand-over behaviour change | /architecture/system-view, /architecture/agent-lifecycle | Quarterly, Microsoft Learn |
| Google Agent Engine components (runtime, sessions, memory bank, evaluation, observability, identity) | Preview to GA moves | /architecture/system-view | Quarterly |
| AEMC final rule on payment difficulty and disconnection, 10 September 2026, effective 30 March 2027; the payment-plan standards rule still open | A second rule is pending; effective dates can move | /use-cases/billing-exceptions, /use-cases/utilities | Before each use of the hardship design; AEMC rule page |
| SAP S/4HANA Utilities release confidence on implausible reads (in product); SAP Joule billing-exception agents planned Q2 and Q3 2026, not confirmed shipped on 15 October 2026 | GA announcements expected | /use-cases/billing-exceptions, /layers/r07-agent-platform | Monthly until shipped; ASUG and SAP release notes |
| IBM AI Lighthouse Council for SAP utilities (11 September 2026): co-build, no results | Results may be published | /use-cases/billing-exceptions | Quarterly |
| Itron IEE Cloud AI (announced 16 September 2026); January 2027 availability from an aggregator, not Itron | GA date unconfirmed | /use-cases/billing-exceptions | Before citing availability |
| IBM Maximo 9.2 MCP server for work-order actions (12 August 2026) and Maximo Condition Insight (5 December 2025), GA wording not stated | GA status unclear | /use-cases/vegetation-inspection, /use-cases/energy-asset-investigation, /layers/r07-agent-platform | Quarterly |
| LiveEO Treeline Agent and MCP connector, early access (2 July 2026) | Early access to GA | /use-cases/vegetation-inspection | Quarterly |
| Kraken Bill Editor in development; Kraken and Sierra agents live at one unnamed utility (June 2026) | Named results may appear | /use-cases/utilities | Quarterly |
| Health NZ Heidi scribe licences (1,000 plus 100; later "about 1,250 staff"); Metro South rollout announced 31 August 2026 | Counts conflict across sources | /use-cases/healthcare | Before citing a count |
| Heidi II agents for chart prep, referrals, follow-ups and recalls (launched 28 September 2026), primary care first, no public hospital site | Rollout status changes | /use-cases/healthcare, /use-cases/referral-coordination | Quarterly |
| Epic agents (Art, Emmie, Penny, Agent Factory), Oracle Health Clinical AI Agent and Microsoft Dragon Copilot: not confirmed available in Australia or New Zealand on 15 October 2026 | Regional availability changes | /use-cases/healthcare and the four healthcare worked examples | Quarterly |
| Logan ENT ReferralAI (validation stage; 53.8 percent agreement in a 2023 study) and Oxford TrustedMDT pilot (approved December 2025) | May move to clinical use | /use-cases/referral-coordination, /use-cases/consult-briefing | Quarterly |
| Honeywell Experion Cognition (promised Q3 2026, not confirmed), Experion Operations Assistant (19 March 2026), Emerson AspenTech AVA (11 May 2026), Siemens Industrial Copilot and Eigen agent, AVEVA MCP for Operations Control (planned), Seeq Agent Q, Cognite Atlas AI | Vendor GA status moves; three vendor claims cross the information-path rule | /use-cases/energy, /use-cases/energy-asset-investigation | Quarterly |
| Aker BP with Cognite (16 September 2025; "more than 70 percent" engineering time, vendor) and with ABB (21 May 2026); Chevron with DataRobot Safe Start (2 June 2026); Shell with C3 AI (unverified) | Operator results and stages change; one source is machine-written | /use-cases/energy-asset-investigation, /use-cases/energy | Before citing a figure |
| ISO/IEC 42001 Annex A and ISO/IEC 22989 lifecycle stage names, read from secondary summaries | Standards texts are paywalled; wording may differ | /architecture/agent-lifecycle crosswalk | When a licensed copy is available |
| EU AI Act dates (Annex III 2 December 2027; Annex I 2 August 2028 per the tracker) | The amending act may move them | /layers/r11-governance-risk-sovereignty, /layers/r10-security-and-identity | Quarterly against the Official Journal |
| In Australia and New Zealand retailers bill households; Victoria's distributors own smart meters; NZ market parties exchange EIEP files over the registry SFTP hub | Market structure and file standards change slowly but do change | /use-cases/utilities, /use-cases/billing-exceptions | Yearly, AEMO and Electricity Authority pages |
| The Google Satellite Embedding dataset is built with Google DeepMind's AlphaEarth Foundations model (Earth Engine catalog, read 15 October 2026) | Dataset versions and model names change | /memory/sources, /memory/location-and-satellite-data | Yearly |
| Open Semantic Interchange published a v1 specification in January 2026 (CD-8) | A young specification; versions and adopters change | /decisions, /layers/r02-data-platform | Quarterly |
| Microsoft Entra Agent ID: sponsorship "should be maintained to ensure succession" when a sponsor moves or leaves, and a group can be a sponsor (learn.microsoft.com, agent owners, sponsors and managers, updated 3 September 2026, read 15 October 2026); no automatic hand-over is documented | Microsoft may add automatic succession | /architecture/agent-lifecycle | Quarterly |
| Google now calls its runtime "Agent Runtime" (the Agent Engine page redirects) and describes Agent Gateway as a policy enforcement point (Google Cloud docs, updated 13 October 2026) | Product names change | /architecture/system-view | Quarterly |
| Microsoft Foundry Toolboxes sit behind one managed MCP endpoint (Microsoft Learn, 11 October 2026) | Preview wording | /architecture/system-view | Quarterly |
| AWS AgentCore release dates: platform GA October 2025; Policy and Evaluations GA March 2026; Optimization GA July 2026; Agent Registry GA 31 August 2026 | Vendor release notes | /architecture/system-view, /architecture/agent-lifecycle | Quarterly |
| Cemri et al., "Why Do Multi-Agent LLM Systems Fail?", arXiv 2503.13657, 17 March 2025 (v3 26 October 2025): 14 failure modes in 3 groups, more than 1,600 annotated traces, 7 frameworks (verified 15 October 2026) | Preprint; later versions may change counts | /ladder/tools-and-the-loop | Yearly |
| IEC 61511 governs safety instrumented systems; ISO/IEC TR 5469 places AI outside the safety function. The earlier claim that IEC 61511 "requires" no AI could not be confirmed and was removed | Standards texts are paywalled; TR 5469 may be revised | /layers/r10-security-and-identity, /layers/r05-lob-and-ot | When a licensed copy is available |
| EU AI Act Article 50 transparency dates (2 August 2026; 2 December 2026) and the Colorado AI Act start date (1 January 2027), read from law-firm notes | Amendments and delays are common | /layers/r10-security-and-identity | Quarterly |
| Microsoft agent identity: the July 2026 identity mandate and the cap of 250 identities per blueprint come from Microsoft documents; Okta, SailPoint, CyberArk (Idira) and Ping release claims are second-hand | Vendor pages and dates move | /layers/r10-security-and-identity, /architecture/agent-lifecycle | Quarterly |
| SAP Maintenance Planner Agent (GA planned Q4 2025, not confirmed shipped); Seeq Agent Q (3 March 2026); Emerson AspenTech AVA (11 May 2026); Protex AI with Bendix, 84 percent (14 January 2026) [vendor]; Intelex with COMET (27 October 2025) | Vendor GA status and figures move | /use-cases/energy-asset-investigation, /use-cases/safety-coaching, /use-cases/production-measurement | Quarterly |
| No mining agent deployment found at BHP, Rio Tinto or Fortescue on 15 October 2026; AusIMM metal accounting summary (23 April 2026); NAMUR NE 175, the NSW Workplace Surveillance Act 2005 and GISTM (August 2020) not re-checked against primary texts | A named deployment may appear; standards texts not read directly | /use-cases/energy, /use-cases/production-measurement, /use-cases/safety-coaching, blueprints/verticals/mining-and-resources.md | Quarterly |
| My Health Record: reports shared by default from 1 July 2026, within 24 hours, reports not images (Australian Digital Health Agency, read 15 October 2026); short notice assessment with at least 24 hours' warning since 1 July 2023; the interoperability plan at 33 of 44 actions complete (January to March 2026 report) | Policy dates and progress counts change | /use-cases/healthcare, /use-cases/consult-briefing, /use-cases/compliance-evidence | Quarterly |
| Referral figures: Queensland 362,886 waiting in May 2026 (AMA Queensland, August 2026); Queensland 30, 90 and 365 day categories; Logan ENT about 700 referrals a month; ReferralAI 17,378 referrals at 53.8 percent agreement (PMC10642163, 2023); Waikato more than 8,000 e-referrals in 2023 | Waiting lists and study figures move | /use-cases/referral-coordination | Quarterly |
| Scribe and agent deployments: Health NZ 1,000 plus 100 licences (HINZ, 26 November 2025) against about 1,250 staff (minister); Metro South, 92 percent less admin time (31 August 2026) [vendor]; Healthdirect 1.55 million triage encounters (April 2023 to March 2025); NSW single record go-live March 2026, all districts by end 2028; Epic Art 69 against 46 percent (10 March 2026) [vendor]; Tampa General call abandonment 34 to 14.9 percent [vendor]; Oxford TrustedMDT announced 16 December 2025 | Vendor figures and rollout dates | /use-cases/healthcare and the four healthcare worked examples | Quarterly |
| Utilities rules and figures on the billing, vegetation and water pages: substituted meter data carries a quality flag (AEMO metering procedures); the AEMC payment-plan rule (consultation 18 June 2026, feedback due 22 October 2026); Red Energy penalty A$474,600 (February 2025); NZ EIEP1 files due by 5pm on the 5th of each month; Victorian line clearance plans due 31 March and Energy Safe Victoria infringements since 27 June 2022; span counts (Powercor 570,000, Utility Magazine 400,000, AusNet 314,000); Victoria Water Industry Standard clauses 18 and 20 and the five-hour trigger; the Arizona docket (24 March 2026) against its press release (27 March 2026) | Several are search excerpts or unchecked rules | /use-cases/billing-exceptions, /use-cases/vegetation-inspection, /use-cases/water-operations, /use-cases/utilities | Before each use; AEMC, AEMO and ESV pages |
| Self-hosting a model does not pay below about 100 to 250 million tokens a month or under 60 percent utilisation (CD-6, R01 findings 19 August 2026) | Model prices and hardware costs move | /decisions, /layers/r01-infrastructure | Quarterly |

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
| Prompt-cache prices (about 0.1 times the base input price for cached reads; 1.25 to 2 times for cache writes), the Claude Code figures (about 7 times for agent teams, about USD 13 per developer per active day), and the absence of a native per-agent budget in model gateways | Change with model and gateway releases | /memory/token-efficiency | January 2027 |
| Memory-service status (Microsoft Foundry memory in preview; no automatic expiry in AWS AgentCore memory) | Preview to GA and feature releases | /memory/six-architectures, /memory/permissions-and-lifecycle | January 2027 |
| Memory benchmark figures: LongMemEval vendor scores, the Redis rerun of 21 Sep 2026, the LoCoMo answer-key audit (one unreviewed post) | Scores move monthly; the audit has not been reviewed | /memory/what-the-benchmarks-measure, /memory/what-we-have-measured | April 2027 |
| Gartner's forecast that inference cost per agentic workflow rises more than fivefold through 2028 (17 Aug 2026) | Read only through search excerpts; the release returned 403 | /memory/token-efficiency | When the release is readable |
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
