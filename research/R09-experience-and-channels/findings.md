# R09 Experience and Channels: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Customer-facing agents are the most publicly visible agentic deployments and the most reversible. Adoption is broad, satisfaction is conditional, and rollback is normal rather than exceptional: a survey of 2,527 senior decision-makers across ten countries found 74% had already rolled back or shut down an AI customer communications agent after a governance failure, rising to 81% among organisations with mature guardrails, which says maturity correlates with catching failures rather than avoiding them.

### 2. What changes with agents

Three things distinguish this layer from every other in the guide. Statements made here are **externally binding**: a tribunal has held that a company is responsible for what its chatbot tells a customer, rejecting the argument that the chatbot was a separate legal entity as a remarkable submission, and a 2026 German appellate decision held that a chatbot is part of corporate communication rather than a third party, that liability attaches regardless of training-data provenance, and that general disclaimers do not provide sufficient protection. The users are **anonymous and sometimes adversarial**, unlike authenticated employees under an acceptable-use policy. And **disclosure is now mandatory** in the EU, with obligations that took effect this month.

### 3. Introduction options and sequencing

Start where the intent set is narrow, well-instrumented, and recoverable. Instrument resolution rather than containment from the first day, because the metric choice determines the outcome (see the contested choice). Wire escalation to a real human queue with working-state transfer before launch, not after the first failure.

### 4. Economics

The unit economics are not in dispute directionally: agent cost per contact is roughly an order of magnitude below a human contact. What is disputed is what fraction of contacts genuinely close, and that is where the published reversals live. One useful discipline: measure repeat-contact rate alongside containment, because a conversation that ends without escalation scores as contained whether the customer was helped or gave up, and re-contact multiplies the true cost per issue while the dashboard improves.

### 5. Learning

The strongest independent causal evidence in this whole domain is on the **assist** side: in a study of 5,172 support agents, AI assistance raised issues resolved per hour by about 15%, with the largest gains for novices, alongside improved customer sentiment and employee retention, and small quality declines for the most experienced agents. Nothing on the deflection side has comparable evidentiary standing. That asymmetry should shape where an enterprise puts its first learning loop.

### 6. Risk and groundedness

Advertised and achieved diverge sharply, and the most useful evidence is a vendor publishing against its own marketing: a benchmark from a major CRM vendor's research arm found the best model reaching 58.3% on single-turn business-to-consumer tasks and falling to 30 to 35% multi-turn, with knowledge questions lower still, and confidentiality awareness near zero under standard prompts, rising to 24 to 62% with hardened prompts at a cost of 1 to 11 points of task success. Compare the same vendor's self-reported production figure of 84% resolution across 380,000 conversations. Different task mixes and different definitions of resolution; the guide reports both and the gap between them.

Consumer outcomes are a step function on resolution. In independent research across six countries, 74% were satisfied with their most recent AI interaction and satisfaction exceeded 90% when the issue was resolved without further steps, but net promoter score declined by as much as 70 points when the agent failed to resolve, and in the US full resolution followed a failed AI interaction only about half the time.

Adversarial users are a first-class threat here in a way they are not internally: a dealership assistant was manipulated into agreeing to sell a vehicle for a dollar and asserting the offer was binding. Read alongside the liability decisions, that defines the exposure precisely.

### 7. Security and determinism

The controls with evidence behind them, in order: ground answers in a governed knowledge system rather than the model, which the analyst market conceded by opening a dedicated evaluation category for customer-service knowledge management this month; **label AI responses unconditionally**; constrain the action space and refuse rather than improvise on policy questions, budgeting for the measured task-success cost of refusal behaviour; assume adversarial input and test for it; and do not rely on disclaimers, which a court has now expressly rejected.

The clearest published case of a control that worked came from an incident: a support bot invented a product policy to explain behaviour actually caused by a race condition, responses were not labelled as AI, and customers cancelled within hours. The remediation included fixing the underlying bug and labelling all AI responses in support email, a control adopted fourteen months before EU law made it mandatory.

### 8. Sovereignty and disclosure

Article 50 of the EU AI Act became enforceable on 2 August 2026, seventeen days before this writing, and was not deferred by the omnibus that delayed the high-risk regime. It requires that people be informed they are interacting with an AI system at the latest at the time of first interaction, in a clear, distinguishable and accessible manner, with the "unless obvious" exception to be interpreted restrictively; penalties reach 15 million euro or 3% of worldwide turnover, and the obligation applies extraterritorially where outputs are used in the EU. Synthetic-content marking has a grace period to 2 December 2026. The US position is a patchwork with three different triggers: commerce-triggered disclosure in one state since 2019, request- and sector-triggered disclosure in another since 2024, and status-triggered obligations plus duties in a third from January 2027.

**The disclosure paradox is the sharpest unresolved tension in this track, and the guide states it plainly.** A field experiment with more than 6,200 customers found that disclosing bot identity up front cut purchase rates by more than 79%, while undisclosed bots matched proficient human agents. Yet independent 2026 research found customers who were aware they were interacting with AI reported satisfaction 34 percentage points higher than those who were not. Disclosure destroys persuasion and improves service. EU law now removes the choice, so the live design question is how to disclose, not whether.

### 9. Vendor landscape

Summary; map below. The analyst market maintains four distinct customer-service categories whose vendor rosters barely overlap with internal agent platforms, which is the structural evidence for a separate edge. One suite vendor is pushing the other way with unified customer and employee service agents.

### 10. Target state

A separate customer-facing edge on a shared control plane: channel and telephony infrastructure, containment and escalation instrumentation wired to workforce management, disclosure and consent mechanics, and brand-safety guardrails hardened against anonymous adversaries, all distinct. Knowledge corpus, customer identity data, tool and action layer, evaluation harnesses, observability and model access all shared with the rest of the estate, because duplicating them is a defect rather than a safeguard.

### 11. Migration path

Pick a narrow intent set; instrument resolution and repeat contact; build escalation with working-state transfer; disclose by default; harden against adversarial input; expand by measured resolution rather than by containment target. Stop buying: containment-priced contracts, and any customer-facing agent whose grounding is the model rather than a governed knowledge base.

### 12. Metrics

Resolution rate and repeat-contact rate as a pair; escalation rate by trigger with context-preservation checks; net promoter effect on failed interactions specifically, since that is where the damage concentrates; disclosure coverage; adversarial test pass rate; and cost per resolved issue rather than cost per contact.

### 13. Data readiness and curation

Knowledge quality is the binding constraint, which the market conceded by creating a dedicated evaluation category for customer-service knowledge management. This is also the layer where agent-readability of the enterprise's own content becomes a commercial question: in one large-scale scorecard, product detail pages were the least machine-readable page type at 66%, below returns, contact and FAQ pages, meaning the pages that matter most for conversion are the least legible to the customer's agent.

### Challenged defaults

**CD-20: AI-first customer service versus human-first with AI assistance. Verdict: the framing is wrong; the real choice is containment-as-target versus resolution-as-target.** Every documented reversal traces to an organisation that set a containment or headcount target and discovered the resolution did not follow. One financial-services firm cut 45 roles citing a voice bot that had reduced calls by 2,000 per week, then found volumes were rising while managers offered overtime and put team leaders back on phones; the company called the redundancy decision an error, admitted it had not adequately considered all relevant business considerations, and offered the roles back. A payments company that automated two thirds of conversations reversed within fifteen months, its chief executive conceding the company had focused too much on efficiency and cost, with lower quality as the result. A restaurant chain ended a three-year voice ordering partnership on what turned out to be an acoustics problem rather than a language problem.

The analyst forecasts point the same way from four directions: autonomous resolution of most common issues is projected for the end of the decade, but half of organisations expecting to cut customer service workforces are projected to abandon those plans, no Fortune 500 company is expected to fully eliminate human customer service, and half of companies that cut service staff citing AI are expected to rehire, often under different titles. Notably, only about a fifth of surveyed service leaders had actually cut agent staffing.

Organisations that report durable gains set a resolution target and let containment be an outcome. That reframing is supported by both the strongest independent causal study, where assistance raised resolution per hour, and the strongest independent consumer research, where satisfaction is a step function on resolution and collapses on failure.

**CD-24: separate stack or shared platform for customer-facing agents. Verdict: separate lane and separate edge, shared control plane.** Genuinely distinct and worth funding separately: the channel and telephony layer, whose hard problems (acoustics, barge-in, interruption handling under telephony constraints) have no internal analogue; containment and escalation instrumentation integrated with workforce management; disclosure and consent mechanics; guardrails hardened against anonymous adversaries; and the legal-attribution and evidentiary layer. Genuinely shared, and duplicating them is a defect: knowledge corpus, customer identity data, tool and action layer, evaluation harnesses, observability, model access.

The strongest justification for a separate investment lane is legal rather than technical. Customer-facing failures are legally attributable, contractually binding, and publicly visible; internal-agent failures are contained and recoverable. That asymmetry justifies different governance, different funding gates, and different risk appetite regardless of which platform the thing runs on. Honest caveat: no published enterprise case demonstrates a deliberately unified customer and internal stack at scale with measured outcomes, and none attributes success to deliberate separation either. This verdict rests on market structure and risk profile, not on measured architecture outcomes.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Customer identity and entitlement checks before any account action; agent acts within the customer's own scope |
| C2 | Observability | Resolution, repeat contact, escalation by trigger, containment separated from resolution |
| C3 | Traceability & audit | Full conversation records as legal evidence; what was said, to whom, when |
| C4 | Grounding in reality | Governed knowledge base rather than model memory; refusal over improvisation on policy |
| C5 | Impersonation & authenticity | Mandatory AI disclosure; no agent presenting as a named human |
| C6 | Data sovereignty & residency | Conversation data residency; recording and consent law by jurisdiction |
| C7 | Data privacy | Customer data minimisation in prompts and logs; consent for training use |
| C8 | Safety & human oversight | Escalation to a real queue; irreversible actions gated; vulnerable-customer paths |
| C9 | Cost accountability | Cost per resolved issue, not per contact; outcome pricing understood before signing |
| C10 | Resilience & continuity | Defined fallback when no human is available; never manufacture containment through queue unavailability |

### Open questions

- No credible independent escalation-rate benchmark exists as of mid-2026; the guide states the absence rather than repeating circulating figures.
- Whether agentic-commerce access can lawfully be refused is unsettled: an appellate court overturned an injunction against an agentic browser on the reasoning that the platform's own users, not the agent vendor, accessed the platform.
- No independent production accuracy figures for voice agents; published latency distributions come from small vendor samples.

---
