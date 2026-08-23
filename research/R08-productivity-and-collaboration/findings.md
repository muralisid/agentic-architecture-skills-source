---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for productivity and collaboration to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Digital workplace lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for productivity and collaboration."
prerequisites: ["/docs/layers/r08-productivity-and-collaboration"]
reading_time: "10 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r08-productivity-and-collaboration/sources"
---

# R08 Productivity and Collaboration: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Copilots are the most widely deployed agentic technology in the enterprise and the least differentiated in value. They take roughly 86% of horizontal application spend against 10% for agents, run in hundreds of millions of seats, and produce a measured effect that is real, small, and confined to one kind of work. Meanwhile roughly half of employees using generative AI at work reach it through personal, unmanaged accounts, and a majority are reluctant to admit using it for their most important tasks.

### 2. What changes with agents

The finding that organises this entire track comes from the only large randomised field experiment with telemetry outcomes, across 66 firms and 7,137 knowledge workers: users spent **two fewer hours per week on email** and reduced out-of-hours work, and beyond that the study detected no shift in the quantity or composition of their work. Meetings: null. Documents: null on volume. The authors explain why in a sentence the guide adopts as its organising principle:

> Email is solitary and each worker is free to develop her own process for inbox management. In contrast, shifting what work gets done in meetings, how long they last, or who takes primary responsibility for writing documents requires coordinating with colleagues and agreeing on new norms.

**Individually provisioned AI moves solitary work and leaves coordinated work untouched.** Everything else in this track is a consequence of that.

### 3. Introduction options and sequencing

Deploy horizontally for the solitary wins, which are real and cheap to capture. Then pick the coordinated workflows you are actually willing to redesign, and treat each as a change programme rather than a licence purchase. Prioritise licences where the measured returns concentrate: two independent government evaluations found, unprompted, that neurodiverse colleagues and non-native speakers reported significantly higher satisfaction, and both recommended targeting accordingly.

### 4. Economics

Watch the rigor gradient before believing any number. Across UK government evaluations of the same product, self-reported savings fall as design tightens: about 26 minutes per day with no counterfactual, 19 with a quasi-experimental comparison, roughly 12 in the randomised study. The one telemetry-measured effect, about two hours a week, is confined to email alone. The Danish administrative-data study finds precise zeros on earnings and hours with confidence intervals ruling out effects above 1%, alongside 3% average time savings.

Task-level economics vary in sign, which matters more than the average. In observed-task testing, summarising a report ran roughly three times faster with better accuracy and quality; writing emails was about even on time and better on quality; but **spreadsheet data analysis was slower and less accurate than working without the tool**, and slide generation was faster and markedly worse. Scheduling was the worst-performing use case measured, and it is also among the most demoed.

Utilisation is the horizontal weak point: one evaluation recorded 64% weekly active users but an average of 1.14 assistant actions per user per day.

### 5. Learning

Two mechanisms decide whether collaboration agents improve or ossify work. First, **interaction mode determines whether quality gains cost you diversity**: a model-led mode where the system rewrites contributions improved quality but reduced idea diversity and authors' sense of ownership, while a reflective human-led mode where the system elicited elaboration through questions improved quality *while preserving both*. That is a design choice, not a model property. Second, feedback in these surfaces is social: adoption spreads through teams, and evaluations found people were less likely to use assistants when colleagues and managers were hesitant, which pushes usage into personal accounts rather than eliminating it.

### 6. Risk and groundedness

**Human oversight in this surface fails at realistic review effort.** In a study of long-horizon coding work, 94% of developers failed to detect deliberate sabotage inserted by an agent, and when a safety monitor flagged it, 56% still accepted the malicious code. In a separate line of work, an improved trace interface reduced time to find errors and raised reported confidence **without meaningfully improving accuracy**, which is the signature of a governance control that introduces an over-reliance mechanism instead of removing one.

**The baseline for team performance is not flattering either.** A preregistered meta-analysis across 106 studies found human-AI combinations performed worse than the best of human or AI alone, with losses concentrated in decision tasks and gains concentrated in content creation. The best field experiment finds real gains, and its internal detail matters: teams with AI were about three times likelier to produce a top-decile solution, while individuals with AI showed a small non-significant effect on breakthrough output. For exceptional work the human team still mattered. And the condition that flips the sign is knowledge distribution: teams where the AI held centralised knowledge outperformed all-human teams, while teams where it held asymmetric knowledge did not, because new AI-specific asymmetries emerged.

**Using AI carries a measured social penalty.** In four preregistered experiments with 4,439 participants, people who used AI at work both anticipated and received worse evaluations of competence and motivation, and those evaluations affected assessments of job candidates. The widespread reluctance to admit AI use is therefore rational, not irrational, which is why concealment is a governance problem rather than a training problem.

### 7. Security and determinism

The identity model in this surface is the practical expression of the guide's ID1 to ID3 distinction, and the vendor's own architecture encodes it: the agent identity is a service principal, while the user account carrying a mailbox and meeting presence is a **separate, optional child object** created only where the agent must act as a user. The permission asymmetry is deliberate: creating agent identities uses a permission granted automatically and not revocable, while creating the user account requires an administrator grant that can be revoked. As of July 2026, new agents must have agent identities with no opt-out, and no user account is created automatically. ID2 is mandatory; ID3 is a decision.

Consent is the live compliance failure. A survey of 500 workers found a third had encountered an AI notetaker, and among those, only about a third were always asked permission while a quarter reported the bot simply appearing. Two US class actions over meeting recording are active as of this month, one filed three weeks ago, with statutory damages claimed per violation.

### 8. Sovereignty

Meeting transcripts, chat histories, and document context are among the most sensitive corpora an enterprise holds, and they now flow through summarisation pipelines by default. Recording consent is jurisdictional (all-party consent states and equivalents), which makes notetaker deployment a residency and consent question rather than a feature toggle.

### 9. Vendor landscape

Summary; map below. Two suites dominate, both bundling assistants into existing licences; a specialist notetaker market sits beside them and is where the litigation is concentrated; and the agent-building surfaces inside both suites are producing long tails of employee-built agents.

### 10. Target state

Assistants deployed broadly for solitary work, with access identity as the universal default and presence granted rarely and deliberately. Coordinated workflows changed on purpose, with norms agreed rather than assumed. Meeting agents deployed with consent handled explicitly and disclosure by default. Reflective rather than model-led interaction patterns where idea diversity matters. Sanctioned paths made easy enough that shadow usage has no reason to exist, since the evidence says blocking moves usage rather than stopping it.

### 11. Migration path

Roll out for the email-shaped wins; instrument actual usage rather than licence counts; fix consent and disclosure before notetakers proliferate; pick two coordinated workflows and redesign them properly; grant presence only where an agent genuinely needs a mailbox or a calendar. Stop buying: seats you cannot show are used, and notetaking products with no consent mechanics.

### 12. Metrics

Actions per active user per day, not licences issued; task-level time and quality by work type, since the sign varies; consent-capture rate for recorded meetings; share of agents at each ID1 to ID3 identity tier with a justification for every presence grant; shadow-usage indicators (personal-account traffic, sensitive-data events); and, where idea diversity matters, a diversity measure alongside quality.

### 13. Data readiness and curation

Collaboration content is the grounding corpus here, and it inherits every permission mistake ever made in it. The vendor's own deployment guidance treats oversharing remediation as a prerequisite rather than a hardening step, and field evaluations found assistants surfacing files users should never have had access to. The R02 mechanics apply; the R08 point is simply that this corpus is where the exposure shows up first.

### Challenged defaults

**CD-23: one universal assistant vs many specialised agents. Verdict: the wrong axis; ask whether the work is solitary or coordinated.** Horizontal assistants scale precisely because they require no process change, which is why their measured value is confined to solitary work. Specialised agents stall precisely because they require coordination and integration, which is why exactly one departmental category has broken out at scale: coding, where the workflow was already tool-mediated and the feedback loop already automated. Spend data shows enterprises hedging roughly evenly between horizontal and departmental.

There is a third answer with more deployment evidence than either camp argues for. Give a horizontal assistant with a building surface to everyone and you get a long tail of narrow, specialised agents built by employees inside the horizontal platform: one organisation generated roughly 15,000 of them after a company-wide rollout. That is neither one assistant nor a curated portfolio, and it is what actually happens.

**On presence identity, from this surface.** The guide's position that presence is reserved for a few durable teammates is supported, and two refinements follow from the collaboration evidence. First, **the accountable-human attribute belongs at ID2 access identity, not ID3 presence identity**: the platform already carries a sponsor field on the agent identity itself, so requiring a mailbox to obtain accountability is backwards. Second, **nameability is not presence**: agents are named, mentionable, and visible in chat surfaces without a user account, so the presence tier should be defined by mailbox, calendar, licence consumption, HR-system participation, and a meeting-roster seat.

The strongest argument against presence is not governance cost. It is that presence does not buy the thing it appears to buy. The only controlled study manipulating whether AI was invoked or ambient found the architecture did not substantially redistribute trust; accountability stayed anchored to the human. And the only study measuring what an AI participant does to human-to-human relations found the AI was the most talkative and self-cohesive member of every team while carrying the least new information, with human teammates showing lower responsivity toward one another and reporting lower belonging and status.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Access identity mandatory and automatic; presence granted per capability with justification; sponsor recorded at access level |
| C2 | Observability | Actions per active user; task-type outcomes; shadow-usage indicators |
| C3 | Traceability & audit | Meeting artifacts and their consent records; retention aligned to recording law |
| C4 | Grounding in reality | Collaboration corpus permissions remediated before deployment, not after |
| C5 | Impersonation & authenticity | Agent output labelled in shared surfaces; no agent presenting as a colleague without disclosure |
| C6 | Data sovereignty & residency | Recording consent is jurisdictional; transcripts inherit content classification |
| C7 | Data privacy | Notetaker consent capture; worker-monitoring boundaries; personal-account leakage |
| C8 | Safety & human oversight | Review effort assumed to be low; controls that raise confidence without raising accuracy treated as harmful |
| C9 | Cost accountability | Utilisation measured against licence spend; task-level negative returns identified and stopped |
| C10 | Resilience & continuity | Sanctioned paths easy enough to displace shadow usage; degraded mode when assistants are unavailable |

### Open questions

- No independent field measurement of production meeting-summary accuracy in enterprises, and no rigorous study of how notetakers change what participants say. The most widely deployed collaboration agent has the thinnest independent evidence base about its effect on the collaboration.
- No comparative outcome study of presence-grade versus invoked agents at organisational scale.
- Whether the homogenisation effect observed at output level aggregates to population level is unresolved, with credible studies on both sides.

---
