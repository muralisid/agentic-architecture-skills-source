---
concepts: [layers, lifecycle, capabilities, autonomy, risk, zones, delegation, value]
---

# Healthcare

A proposed design for a public hospital network in Australia or New Zealand. Four agents carry referrals, follow-up, meeting preparation and accreditation evidence around the patient. Clinicians keep every clinical decision. Written 15 October 2026.

## Opportunities

- [From referral to a confirmed appointment](/use-cases/referral-coordination).
- [Keep agreed follow-up from getting lost](/use-cases/care-follow-up).
- [Prepare the evidence before a consult or multidisciplinary meeting](/use-cases/consult-briefing).
- [Collect and check compliance evidence](/use-cases/compliance-evidence).

The [healthcare page](/use-cases/healthcare) shows the estate these agents work in.

## 1. The scenario

A GP faxes a referral to the ENT clinic. A clerk keys it into the patient administration system (PAS). Two items are missing, so the clerk faxes the GP and waits. A consultant triages it a week later. Meanwhile a patient leaves the ward with a blood test due in three weeks. The doctor who ordered it has moved to another team. On Thursday the lung cancer meeting needs results from six screens and a private lab report that has not arrived. And the hospital can be told to expect its accreditation assessors with 24 hours' notice.

Each piece of work crosses many systems and is carried by hand. None of it needs a clinical decision from an agent. All of it needs evidence that holds up later.

## 2. Agent team design

Four agents, each on fixed steps. Each is a separate agent because each needs different permissions and a different supervisor. Model calls only read documents and draft text. Fixed rules decide order, limits and status.

| Agent | What it does | Autonomy and learning | Zone or rule it touches | Evidence status |
|---|---|---|---|---|
| Referral intake agent | Takes in referrals, proposes the patient match, checks completeness, chases missing items, prepares the triage view, offers slots and books | Delegated tasks (A2), fixed (L0) | The rule for decisions about people. Clinicians triage. Clerks decide any doubt about identity. | Parts exist as bots and triage suggestion models. No agent doing the whole flow was found in Australia or New Zealand. |
| Follow-up tracking agent | Turns agreed actions into tasks, links completion evidence, chases owners, reminds patients within limits | Delegated tasks (A2), fixed (L0) | The rule for decisions about people. Its credential cannot close a clinical task. | No published precedent in Australia or New Zealand |
| Meeting preparation agent | Gathers records for listed patients, drafts a brief with a source on every fact, refreshes it, drafts the outcome note | Delegated tasks (A2), fixed (L0) | The rule for decisions about people. The MDT decides and the chair signs. | One approved pilot in England (Oxford, December 2025). None found in Australia or New Zealand. |
| Accreditation evidence agent | Collects evidence on a schedule and checks it by fixed rules. Asks owners for gaps. Builds packs and a short notice index. | Delegated tasks (A2), curated learning (L1) | Formal regulatory records. A named person attests. | No published precedent in any industry |

A2 means delegated tasks: a person or a fixed rule approves each output. L0 means fixed: the agent does not learn from cases. L1 means curated learning: people choose what it learns from and review each change. The scales are on the [autonomy contract](/architecture/autonomy-contract). All four agents are [Tier 3 (strict)](/architecture/risk-profile), because each reaches regulated health data or feeds a formal record.

Start with one agent. Meeting preparation carries the least risk, because the agent only reads and drafts, and a clinician signs.

## 3. Capabilities used

Six of the [seven capabilities](/architecture/system-view) do direct work here.

| Capability | Direct or supporting | What it does in this design |
|---|---|---|
| Runtime | Supporting | Hosts four small agents in an Australian or New Zealand region. No special compute. |
| Tool gateway | Direct | One governed route to the PAS, EMR, FHIR server, secure messaging and SMS. Read-only tools for meeting preparation and accreditation. |
| Knowledge and memory | Direct | Versioned referral criteria as reference data. Task memory per referral and per follow-up action. The source list for each brief. |
| Identity and policy | Direct | Each agent has its own identity on the [delegation chain](/architecture/delegation-chain). The meeting agent reads only listed patients, for a named MDT lead. The registry records each agent's sponsor and owner. |
| Evaluation and release | Direct | Each agent runs on past cases before go-live. A step moves from clerk approval to a fixed rule only when its error rate is known. |
| Observability and audit trail | Direct | Traces keyed to each task, stored outside the agent. PAS and EMR audit logs under each agent's account. Every brief version kept. |
| Human oversight | Direct | Clerks, coordinators, clinicians and the quality manager approve at named steps. Each agent has a named sponsor and owner on the [agent lifecycle](/architecture/agent-lifecycle). |

## 4. Controls

Each control is enforced outside the model, at a named point.

- **The PAS account.** The referral agent's account can write only referral status, waiting list entries and bookings. It has no permission to create or merge a patient.
- **The task server.** The follow-up agent's account cannot close a clinical task. Only the responsible team can.
- **The EMR access scope.** The meeting agent reads only patients on the MDT list. It has no emergency override access.
- **Read-only accounts.** The accreditation agent reads the learning, maintenance and incident systems and SharePoint. It cannot write to them.
- **The register and the agency portal.** Only a named person can attest or submit. This is the formal regulatory records zone on the [deterministic zones](/architecture/deterministic-zones) page.
- **Fixed rules.** Completeness checks, booking order, contact limits, escalation times and evidence status are rules approved by a named owner.
- **Templates.** Outgoing messages use approved templates only. Each of the first three agents holds all three parts of the Rule of Two, so none rises above A2.
- **Healthcare identifiers.** IHI lookups use the organisation's NASH certificate and are logged per call. Check the HI Service rules before a vendor hosts the agent.
- **My Health Record.** Documents are used only where the service's access policy and the patient's controls allow.
- **No clinical suggestion without a TGA check.** No agent sets urgency, reads a result, or recommends treatment. A suggestion model needs its own validation and a TGA check first.

## 5. Economics

The unit for control is cost per run. It counts model calls, tool calls and platform time for one referral, task, brief or pack.

The unit for the decision is cost per resolved outcome, as set out on [value and investment](/use-cases/value-and-investment). Add all model, tool and platform cost, failed and retried runs included. Add the review time of clerks, coordinators, clinicians and the quality manager at a loaded rate. Add the cost of fixing wrong outcomes. Divide by the outcomes accepted as resolved.

A resolved outcome is different for each agent.

- Referral intake: a referral that reaches a confirmed booking or a clear decline, with no wrong patient match.
- Follow-up tracking: an agreed action closed with evidence by the right person.
- Meeting preparation: a brief signed with no missing or stale item on the day.
- Accreditation evidence: a requirement with a current, checked and attested pack.

The value shows up as clerk and coordinator hours and fewer bounced referrals. It also shows up as fewer deferred cases and a register that is always current. Do not count booking speed as clinical benefit. Keep any harm visible on its own, not inside an average.

## 6. Honest limits

**What has no published precedent in Australia or New Zealand.**

- No public health service was found running its own agent runtime, agent registry or identity per agent.
- No agent was found checking that agreed follow-up was completed.
- No agent was found collecting NSQHS or Nga Paerewa evidence.
- No agent was found preparing MDT briefs. The nearest case is Oxford's TrustedMDT pilot in England.
- No agent was found running referral intake end to end. Robotic process automation bots and triage suggestion models exist, and the models are at validation stage.

**What is not confirmed.** Epic's agents are not confirmed in Australia. Microsoft Dragon Copilot is not offered in Australia or New Zealand. Oracle's clinical agent has no Australian listing. Heidi II is rolling out in primary care first, with no public hospital site found. All were checked on 15 October 2026.

**What this design refuses to claim.** It does not claim clinical benefit from faster booking. It does not let an agent set urgency, read a result, close a clinical task, or recommend treatment.

**What was not verified.** The current NSQHS version, its number of actions and the period to fix a Not Met action. Step times and volumes are typical, unsourced, except the named Queensland and Logan figures.

## 7. Metrics

**What proves it is working.**

- Time from referral receipt to ready for triage falls.
- Fewer referrals bounce back for missing items.
- More agreed actions close with evidence, and overdue ones are found sooner.
- Fewer MDT cases are deferred for missing information.
- The short notice evidence index is ready within hours.

**What proves it is not.**

- Any wrong patient match.
- Any clinical task closed by an agent.
- Clerk overrides rising over time.
- Patient contacts beyond the agreed limits.
- Stale or unsourced facts found in a signed brief.
- Reviewers often disagreeing with the agent's evidence status.

## The estate

A public hospital network, by layer. Vendors in brackets are examples, not a market share claim.

| Layer | Systems today |
|---|---|
| [Infrastructure and compute (R01)](/layers/r01-infrastructure) | State data centres. Private cloud. Australian cloud regions. Vendor-hosted EMR. Virtual desktops. |
| [Data platform (R02)](/layers/r02-data-platform) | Clinical data repository. Data warehouse. State collections. Dashboards. Registries. |
| [Integration fabric (R03)](/layers/r03-integration-fabric) | Integration engine (Rhapsody, InterSystems). FHIR server. Secure messaging (HealthLink, Medical-Objects, Argus). My Health Record gateway. Healthcare Identifiers Service. |
| [Systems of record (R04)](/layers/r04-systems-of-record) | EMR (Epic, Oracle Health). PAS (iPM, webPAS). Laboratory system. Radiology system and image archive. Pharmacy. Patient index. Incident system. HR and rostering. |
| [Line of business and OT (R05)](/layers/r05-lob-and-ot) | Emergency, theatre, maternity, ICU and oncology systems. Community health. Bed flow. Medical devices. |
| [Intelligence and learning (R06)](/layers/r06-intelligence-and-learning) | EMR alerts. Early warning scores. Radiology AI. Speech recognition. Ambient scribes (Heidi, Lyrebird, iMedX). |
| [Agent platform (R07)](/layers/r07-agent-platform) | Mostly absent. Robotic process automation bots. Chatbots. Virtual triage. Vendor agents (Heidi II). |
| [Productivity and collaboration (R08)](/layers/r08-productivity-and-collaboration) | Microsoft 365 and Teams. Fax servers. Policy library. |
| [Experience and channels (R09)](/layers/r09-experience-and-channels) | SMS and letters. Booking centre. Telehealth. Patient portal where one exists. GP portals. |
| [Security and identity (R10)](/layers/r10-security-and-identity) | Entra ID. Tap-badge sign-on. NASH certificates. Security monitoring. |
| [Governance, risk and sovereignty (R11)](/layers/r11-governance-risk-sovereignty) | Clinical governance. Accreditation. Privacy officer. AI governance group. Risk register. |
| [Observability and FinOps (R12)](/layers/r12-observability-and-finops) | Application monitoring. Integration error queues. IT service management. |
| [Operating model and supervision (R13)](/layers/r13-operating-model) | Digital health division. Central referral hub. Quality and safety unit. Virtual care centre. |
| [Agent data engineering (R14)](/layers/r14-agent-data-engineering) | Document capture and OCR. Patient index stewardship. Terminology mapping. |

## External reading

- Australian Commission on Safety and Quality in Health Care, [AI Clinical Use Guide](https://www.safetyandquality.gov.au/resources/ai-clinical-use-guide), August 2025.
- Australian Commission on Safety and Quality in Health Care, [short notice assessments](https://www.safetyandquality.gov.au/accreditation/accreditation-national-safety-and-quality-standards/short-notice-assessments), from 1 July 2023.
- Australian Digital Health Agency, [My Health Record sharing by default](https://www.digitalhealth.gov.au/healthcare-providers/initiatives-and-programs/better-access-to-health-information), in force 1 July 2026.
- Australian Digital Health Agency, [National Healthcare Interoperability Plan 2023-2028](https://www.digitalhealth.gov.au/about-us/strategies-and-plans/national-healthcare-interoperability-plan), published 11 July 2023.
- HL7 Australia, [AU Core](https://hl7.org.au/fhir/core), accessed 15 October 2026.
- Health New Zealand, [NHI FHIR API](https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/digital-services-hub/explore-apis/national-health-index-fhir-api), accessed 15 October 2026.
- HL7, [FHIR R4 Task](https://hl7.org/fhir/R4/task.html), reviewed 15 October 2026.
- University of Oxford, [TrustedMDT pilot](https://www.ox.ac.uk/news/2025-12-16-oxford-built-multi-agent-assistant-cancer-care-be-piloted-collaboration-microsoft), 16 December 2025.
- The Medical Republic, [Heidi II agents](https://www.medicalrepublic.com.au/?p=129487), 30 September 2026.
- PMC10642163, [AI in referral triage on Clinical Prioritisation Criteria](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10642163/), 2023.
- AMA Queensland, [Queensland's hidden waiting list](https://amaq.com.au/Web/News/Media-releases/2026-Media-Releases/Public-Outpatients-Working-Group-to-shine-a-light-on-Queensland%E2%80%99s-hidden-waiting-list.aspx), August 2026.
