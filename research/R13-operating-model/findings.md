---
reader_summary: "Use the evidence, target state, sequencing, economics, and open gaps for the operating model to make architecture decisions."
audience: ["CIO/CTO","Enterprise architect","Operating-model and workforce lead"]
decision_or_output: "Record the target-state posture, sequencing priority, and unresolved risk for the operating model."
prerequisites: ["/docs/layers/r13-operating-model"]
reading_time: "18 minutes"
evidence_status: "Dated evidence synthesis: vendor-published findings, author positions, and unresolved gaps are identified inline."
next: "/docs/layers/r13-operating-model/sources"
---

# R13 Operating Model and Organization: findings

As of August 2026. Every claim sourced in sources.md; [vendor] flags inline.

---

### 1. Current state

Enterprises are adding agents to org structures designed for humans operating tools. The scaffolding is arriving from vendors rather than from practice: identity platforms now require a named human sponsor per agent with automatic transfer when that person leaves, and workforce systems now onboard and budget agents alongside employees. What has not arrived is evidence that any of it changes outcomes, or any published account of how many agents one person can actually supervise.

### 2. What changes with agents

The work that remains is not a smaller version of the work that existed. It is supervision, exception handling, curation, and design, which are different activities with different failure modes. The literature on supervising automated systems is 43 years old and its central finding is uncomfortable: the better the automation, the worse the human monitors it, and the less able they are to take over. Every operating-model decision in this track is downstream of that.

### 3. Introduction options and sequencing

Assign named accountability before autonomy, not after. Keep supervisors close to the work they supervise (see the specialisation finding in section 5). Design for prevention and legibility rather than interception, because that is what the measured evidence says actually shapes outcomes. And instrument the supervision load itself, since nobody can tell you what it should be.

### 4. Economics

The honest position: the headcount case is unproven for knowledge work. The strongest administrative-data study available, linking survey responses to national register data across 25,000 workers and 7,000 workplaces, found precise nulls on earnings and hours, ruling out effects larger than 2% two years after the technology became widely available. What moved was task content, with new work concentrating in AI quality review, ethics and compliance, and integration. Meanwhile the labour-market evidence on entry-level roles is genuinely contested: payroll-data studies find a substantial relative decline for 22-to-25-year-olds in exposed occupations operating through reduced hiring rather than separations, while postings-data studies find no clear divergence and note the decline predates the technology. Both can be true if the effect concentrates in the small share of firms actually adopting, and is invisible in aggregates.

One counterweight worth carrying into every business case: automating a task is not automating a job. When ATMs cut tellers per branch by roughly a third, banks opened far more branches and total teller employment grew.

### 5. Learning

Two findings shape how supervision itself should be organised.

**Integrated supervisors outperform specialists, and the mechanism is discretion.** In the only large randomised field experiment on agentic customer service (647 workers, 680,676 chats), workers who both handled frontline work and supervised the agent produced a positive spillover onto the work the agent never touched. Dedicated supervisors, by contrast, are exposed continuously to failed interactions and lose contextual knowledge of the underlying problems. And escalations that supervisors initiated on their own judgment produced substantially smaller quality declines than escalations the monitoring algorithm triggered. Supervisors who stay close to the work intervene better.

**Supervision needs its own monitoring layer.** The same deployment ran algorithmic monitoring that watched the agent's workflow and flagged conversations at elevated risk of failure. This is exactly what the 1983 human-factors literature prescribed as the fix for the monitoring problem: alarms on alarms. A 43-year-old prescription, independently rebuilt.

### 6. Risk and groundedness

Four evidenced claims about human supervision of probabilistic systems, and one common assumption the evidence denies.

**The binding constraint on span of control is wait time, not per-item effort.** In the foundational supervisory-control measurements, interaction time per unit stayed nearly flat as units were added (18.2 to 15.7 seconds from two units to eight) while wait time grew roughly eightfold (8.7 to 67.6 seconds). Capacity models that ignore queueing overstate capacity by up to 67%, and by 36% even in exception-based designs built specifically to avoid queueing. Anyone planning agent supervision by counting agents rather than modelling queues will be wrong in a predictable direction.

**Over-reliance is a verification-cost problem, not a discipline problem.** Manipulating the cost of checking moves over-reliance measurably; automation bias tracks verification complexity and appears even in single-task settings; and in a study of 54,791 real agent-generated code-review comments, the strongest predictor of a human acting on a comment was whether it carried an inline suggestion, while long complex comments were less likely to be acted on. Training and instruction do not prevent the bias. Cheap verification does.

**The best available intervention still leaves roughly half of wrong outputs accepted, and interventions that work are the ones people dislike.** Cognitive forcing reduced acceptance of incorrect AI output from 64% to 48% on the measured subtask, and the designs that reduced over-reliance most were rated most difficult, least preferred, and least trusted. An organisation optimising reviewer satisfaction is optimising against oversight quality.

**Supervisors cannot self-assess their own effectiveness.** In a randomised trial with experienced developers on their own repositories, participants forecast that AI would cut completion time by 24%, estimated afterwards that it had cut it by 20%, and were measured 19% slower. Self-reported oversight effectiveness is not a control.

**Denied assumption: more human involvement produces more oversight.** A 2026 study comparing four oversight strategies for computer-use agents found that strategy shaped users' *exposure* to problematic actions far more reliably than their ability to *correct* them once visible, with no strategy uniformly best. Effective oversight is not achieved by maximising human involvement; it is achieved by structuring supervision so decision-critical moments surface in time. In the same direction, multi-operator research found teams deliberately operating below maximum capacity outperformed teams at maximum.

One further caution the guide states plainly: a human oversight requirement is not automatically a control. A survey of 41 oversight policies found they largely legitimise systems rather than constrain them, and that explanations increase acceptance of recommendations regardless of correctness. An under-resourced human in the loop becomes a liability sink. The published test worth applying to any proposed oversight design asks whether the named person has sufficient causal power, suitable epistemic access, self-control, and fitting intentions.

### 7. Security and determinism

Named accountability is a governance construct, not a security control. In one lab's internal red-team exercise, a phished employee's prompt asking an agent to read cloud credentials and post them externally succeeded in 24 of 25 attempts, because model-layer defences anchor on user intent and there is nothing anomalous to detect when the user types the instruction. Accountability determines who answers for the outcome; the controls in R10 determine whether it happens.

### 8. Sovereignty and workforce law

**A date correction the guide must carry.** The EU AI Act requires employers deploying high-risk AI at the workplace to inform workers' representatives and affected workers before putting it into service. That obligation sits inside the high-risk package, and the AI Omnibus regulation (in force 27 July 2026) deferred standalone Annex III high-risk obligations, which is where employment sits, from 2 August 2026 to **2 December 2027**. Read as a package, the practical trigger for employment-related AI is therefore December 2027, not this month. The same instrument softened the AI-literacy duty from ensuring a sufficient level to taking measures supporting it. Transparency obligations were not deferred. This is a reasoned reading of the package rather than a quoted holding, and it sits on the re-verification list.

**What does not wait for the AI Act.** In co-determined jurisdictions the binding constraint is national labour law, and it is already in force. In Germany, technical systems objectively *suitable* for monitoring behaviour or performance require full, enforceable co-determination regardless of employer intent, and the test covers the whole product even where only part of it is capable. Since 2021 the statute names AI explicitly in three places: expert consultation for assessing AI is **deemed necessary by law**, with the employer bearing the cost; the employer must inform and consult in good time on work processes "including the use of artificial intelligence"; and selection guidelines for hiring, transfer, regrading and dismissal remain co-determined when drawn up with AI. A large-scale rollout can also qualify as an operational change triggering negotiated balancing-of-interests and social-plan obligations.

Case law has already drawn the boundary in a way that matters architecturally. A 2024 interim decision found **no** co-determination right where employees used a public chatbot through their own private accounts, nothing was installed on company systems, and the employer received no usage data from the operator, so the only technical facility was the browser. The obvious corollary is that company accounts, company-installed systems, or employer access to usage data do create the right. Note the tension this produces: the data-protection-compliant path (company-provided accounts, training features disabled) is precisely the fact pattern that triggers co-determination. Separately, a group-wide productivity-suite rollout with central monitoring capability must be negotiated at group level rather than site by site.

Regulators have also closed the "a human clicked approve" loophole in advance. German data-protection guidance states that where AI produces proposals with legal effect, the deciding human must have genuine decision latitude, and that inadequate staffing, time pressure and opacity must not lead to results being adopted unchecked: **merely formal human participation is not sufficient**. The European court has held that a score can itself be the automated decision where the downstream decision-maker attributes a determining role to it.

One trap worth naming for architects: repurposing a general-purpose assistant to evaluate candidates can make the deploying enterprise a **provider** of a high-risk system, with the full provider obligations, not merely a deployer.

### 9. Consultation does not slow adoption, and the evidence points the other way

This is the most counterintuitive finding in the track, and it comes from the European Commission's own synthesis for its algorithmic-management initiative. Comparative survey work puts algorithmic-management adoption at roughly 79% of organisations across four large EU economies against 90% in the United States, and the two most common reasons EU employers give for **not** adopting are high cost and **staff resistance**. The Commission's reading is that effective social dialogue and the involvement of workers and their representatives "have proved to be powerful drivers of higher adoption of these technologies in the workplace," and it names the failure mode explicitly as **contested adoption**: where workers are excluded from adoption decisions and do not understand how the systems work, resistance undermines effectiveness and prevents the benefits being captured. International labour research reaches a compatible conclusion, that social dialogue shapes AI toward complementing skills rather than replacing them.

What consultation does cost is time on specific systems. The best-documented case is a works council that spent roughly eighteen months in conflict before agreeing an HR platform deployment with its AI functions switched off entirely. Circulating figures for how many weeks co-determination adds to a rollout come from vendor marketing and should not be cited.

Practice in co-determined firms has converged on a small set of recognisable instruments: a risk-tiered framework agreement where the top tier of systems, typically those deciding individual personnel measures, may not be introduced at all; a structured questionnaire the employer must answer so the works council can classify each system; a joint AI committee; graded transparency by risk tier; and an employee right to correction of obviously erroneous AI recommendations. Where no agreement was achievable, one large manufacturer's works council instead built structured system profiles covering purpose, data, correctability, mitigations and residual risk, which is a useful fallback pattern. A published analysis of these agreements notes that in the companies studied no job cuts had occurred because of the AI systems, and that co-determination standards were successfully applied inside foreign-headquartered groups.

**What negotiated agreements actually contain, and how rare they are.** Formal AI clauses in collective agreements are far rarer than the discourse implies: roughly 240 of 285,000 French company agreements between 2017 and 2024, only 4 of 247 surveyed German establishments with a dedicated AI works agreement, about 20% of surveyed European service-sector unions with any AI-related agreement, and only a handful of more than 500 reviewed US contracts naming AI explicitly, most using broader technology or automation language. Informal consultation is much more common than formal agreement, which means the governance action is happening ahead of, and mostly outside, the contract text.

Where clauses do exist, they fall into two distinct architectures, and a governance framework that anticipates only the first will miss the second entirely. The **entertainment model** treats AI as an intellectual-property and consent problem: who owns the likeness, who consented, what was disclosed, who gets paid. The **industrial model** treats it as technological change and job security: advance notice, joint committees, manning levels, no-layoff commitments, and limits on discipline. The strongest enforcement mechanisms found anywhere sit in the industrial model, where one 2024 port agreement pairs substantive prohibitions with third-party audit, liquidated damages of ten thousand dollars per day, and a contractual right to withhold labour on an unacknowledged violation.

**The most portable clause in the entire corpus, arrived at independently from opposite sectors, is "no discipline based solely on the system."** A parcel-delivery contract states that no employee shall be disciplined based solely on information from tracking or telematics systems, that a worker's failure to recall accurately what the technology shows is not by itself dishonesty, and that the employer must corroborate by direct observation. A nurses' bill of rights asserts the right to override AI decisions without the threat of discipline or discharge. It maps directly onto the human-oversight requirements in every major AI governance framework, and it is materially easier to audit than a fairness metric. The guide recommends it as a default clause in any agent deployment that touches performance management.

Advance-notice periods are converging into a usable range: six months for the most disruptive technology classes, forty-five days before implementation after a joint review meeting, one hundred and twenty days for local negotiation with a capped demonstration period, and, in one legislative draft, one month before high-risk decision-making with consultation repeated annually.

One caution on sourcing that applies throughout this section: a widely cited healthcare national agreement contains no instance of the phrase "artificial intelligence," and the technology committee it does contain is inherited language from a previous cycle. Cite the clause, not the press release.

Worker sentiment sets the outer boundary and is stable: large-scale EU polling finds majorities view workplace AI positively and expect productivity gains, while **74% support banning fully automated decision-making at work** and 78% oppose AI automatically dismissing workers. Meanwhile roughly 43% of workers exposed to algorithmic management report not being informed about the monitoring that affects them, and about a third report no procedure exists to contest an automated decision. Two live gaps the Commission itself names are worth designing around rather than waiting for: workers' representatives currently have **no consultation rights** under the AI Act or data-protection law, only information rights, and human overseers are **not protected from adverse treatment** for overriding an automated decision. A guide-level recommendation follows directly: protect the overseer explicitly in policy, because the law does not yet.

### 10. Vendor landscape

Summary; map below. Two camps: identity and governance platforms productising named accountability, and workforce systems extending HR constructs to agents. The second camp's flagship consumer-facing attempt was withdrawn within three days.

### 11. Target state

Named human accountability per agent with revocable scoped credentials and automatic transfer on departure. Supervision integrated with the work rather than specialised into a separate function, unless volume forces otherwise and rotation protects against erosion. Oversight designed for prevention and legibility, with verification made cheap by construction. Supervision load measured and capped by queueing behaviour rather than agent count. Skills deliberately maintained, including periodic work without agent assistance.

### 12. Migration path

Assign sponsors; instrument supervision load and intervention rates before scaling; keep supervisors on frontline work; build the monitoring-of-the-monitor layer; consult workforce representatives before deployment where the law requires it, and as good practice where it does not. Stop buying: supervision products that report agent counts rather than queue behaviour, and oversight designs whose only control is a human clicking approve.

### 13. Metrics

Intervention rate and its trend (a falling rate is not automatically good, since it may be fatigue rather than reliability); escalation mix by trigger (human-initiated versus algorithm-triggered, since the first correlates with better outcomes); wait time per supervised item, not agent count; verification cost per review; skill-maintenance practice; and periodic blind checks, because self-reported effectiveness is unreliable.

### 14. Data readiness and curation

The curated corpora here are the runbooks, escalation criteria, and the record of what supervisors decided and why. That record is also the training material for the next supervisor, and the evidence base for whether oversight worked.

### The founding metaphor, tested

The guide opens with a bottling plant running without humans doing the physical work, and argues knowledge work is heading to the same shape. Research tested the claim, and the result is worth stating precisely because the metaphor is load-bearing.

**Supported: the shape of the residual work.** The tasks left to humans (supervise, adjust, maintain, expand, improve) are exactly the ones the human-factors literature identified in 1983 and has found stable ever since. Physical automation at scale supports the direction: one major logistics operator passed a million robots against roughly 1.2 million warehouse staff, with employees per facility at a sixteen-year low and packages shipped per employee rising more than twentyfold over a decade.

**Not supported: the rate, and specifically the crew size.** Two corrections. First, the widely circulated claim that a famous automated electronics plant runs 128 robots with nine workers is wrong: the primary reporting says several dozen workers per shift. Fourteen years later, no plant of that kind has reached full lights-out at scale, and the guide should not use the nine-worker figure. Second, the best-documented agentic deployment in knowledge work is nowhere near lights-out: agent-eligible conversations were under 10% of volume, and within that subset the agent completed only 35% without a human taking over.

**The honest version of the metaphor is not "fewer humans" but "different humans, doing different work, under a different failure model."** That is the version this guide defends. The shape of the residual crew is evidenced. A headcount ratio and a timeline are not.

Which humans become what differs by function, and the guide's position is that this differentiation is the useful answer: operations work moves toward exception handling and supervision, knowledge work moves toward design and curation of what agents execute, and client-facing work stays human because the thing being sold is a relationship.

### Span of control: the guide's most important negative finding

**No published human-to-agent supervision ratio exists from any credible source.** A major vendor introduced "human-agent ratio" as a management metric in 2025 and published no numbers, and its 2026 successor still publishes none. Anyone quoting a figure for how many agents one person can supervise is extrapolating, not citing.

What can be said, from adjacent measurement: the fan-out relation makes supervisory capacity a function of neglect time divided by interaction time *plus wait time*; the only directly measured capacity in a comparable task fell between four and six units, in a low-stakes simulation; published ratios across domains span a thirty- to fiftyfold range driven entirely by task, autonomy, and consequence; consequence-weighted domains regulate below one-to-one, with nuclear control rooms requiring multiple licensed operators per unit and continuous presence at the controls; and the process industries provide the only standards-embedded workload figure, where more than one alarm per operator per minute is treated as very likely unacceptable and more than a hundred alarms in the first ten minutes of an upset is expected to lead operators to abandon the system.

That last body of practice carries the most transferable lesson: the standards committee holds that a per-ten-minute rate cannot validly be converted into a per-hour or per-day figure, and removed the per-day metric precisely because averaging destroys its meaning. Any "N agents per reviewer" target expressed as a daily average will be met on paper and violated in every burst.

### Challenged defaults

**CD-22: agents as tools operated by existing roles vs agents as workforce with managers and org-chart presence. Verdict: keep the accountability, drop the personnel metaphor.** The accountability substance is real and now productised: a named human sponsor per agent, sponsorship that transfers automatically rather than lapsing, scoped credentials with expiry and re-approval. The personnel framing is a different claim, and the evidence against it is unusually direct: the flagship attempt to give agents employee records and managers was announced and withdrawn within three days after backlash, and the objection was not technical but that treating bots as colleagues disrespected the humans already employed. Enterprises are consolidating AI responsibility into existing structures rather than creating new ones, over half of chief AI officer roles are added duties on existing jobs, the largest firms are the least likely to appoint one, and no agent-supervision occupation appears in labour-market data; the clearest real posting for an agent operations role asks for site-reliability experience.

No study compares outcomes under the two framings. But the large field experiment achieves per-agent named accountability with no org-chart presence at all, which is the accountability substance without the personnel metaphor, and its integration-versus-specialisation result favours keeping supervision inside existing roles.

### Cross-cutting concerns

| # | Concern | Treatment at this layer |
|---|---|---|
| C1 | Identity & access | Named sponsor per agent with transfer on departure; scoped, expiring credentials; accountability distinct from control |
| C2 | Observability | Supervision load, intervention rates, escalation mix by trigger, wait time per item |
| C3 | Traceability & audit | Record of supervisory decisions and their rationale; workforce consultation records where required |
| C4 | Grounding in reality | Runbooks and escalation criteria as curated corpora; blind checks against self-report |
| C5 | Impersonation & authenticity | Clear signalling of what is agent-produced in internal work products |
| C6 | Data sovereignty & residency | Workforce data in supervision telemetry carries employment-law obligations |
| C7 | Data privacy | Supervisor performance data is worker data; monitoring the monitors has its own consultation duties |
| C8 | Safety & human oversight | The whole track; design for prevention and legibility; verification made cheap; rotation against erosion |
| C9 | Cost accountability | Supervision cost counted in the business case; oversight workload is not free |
| C10 | Resilience & continuity | Skill maintenance including deliberate unassisted practice; succession for sponsors |

### Open questions

- No published supervision ratio for agents, and no rotation or shift-design research specific to agent oversight.
- The labour-market effect on entry-level roles is contested between payroll data and postings data; the guide publishes the contest.
- Whether the 2026 finding that the vigilance decrement is bias shift rather than sensitivity loss changes oversight design; if it holds, interventions aimed at improving detection target the wrong mechanism.

---
