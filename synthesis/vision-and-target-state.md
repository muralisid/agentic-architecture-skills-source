# The Agentic Enterprise: Vision and Target State

As of August 2026. Claims marked as the authors' position are labeled in the text; all other claims carry their sources inline or in the source list.

---

## The factory floor

Some years ago I stood on the floor of a Schweppes bottling plant. The line ran without a single person doing the physical work. The ERP knew exactly where every pallet should go; robots carried pallets into the warehouse and back out to the loading trucks. The deterministic plan lived in the system of record. The machines executed it, end to end.

There were still people on the floor, and watching what they did was the education. They cleared jams and restacked bottles when the line got stuck. They watched quality signals and decided when to intervene. They reconfigured the line between products and formats. They maintained the machines. Nobody lifted a bottle; everybody was accountable for the bottles.

The claim of this guide is that knowledge work is heading to the same shape, and that the architecture which gets an enterprise there safely can be described, layer by layer. The plan will live in systems of record. Agents will execute it. People will set intent, watch quality, handle exceptions, reconfigure, and maintain, and they will hold all of the accountability.

**The metaphor was tested, and it holds in one direction only.** The shape of that residual work is well evidenced: supervise, adjust, maintain, expand, improve are exactly the tasks the human-factors literature identified in 1983 and has found stable ever since. The rate is not evidenced, and the guide does not claim it. Two corrections came out of the research and are stated here rather than buried in a track: the widely circulated claim that a famous automated electronics plant runs 128 robots with nine workers is wrong, since the primary reporting says several dozen workers per shift; and the best-documented agentic deployment in knowledge work had agent-eligible conversations under 10% of volume, of which the agent completed 35% without a human taking over.

So the honest version of the metaphor is not "fewer humans" but **different humans, doing different work, under a different failure model**. That is the version this guide defends. Which humans become what differs by function: operations work moves toward exception handling and supervision, knowledge work moves toward design and curation of what agents execute, and client-facing work stays human because the thing being sold is a relationship. The full test, including the finding that no credible human-to-agent supervision ratio has ever been published, is in research/R13-operating-model/findings.md.

## What "agentic enterprise" means

An agentic enterprise is one where routine knowledge work executes through governed agents while humans set intent, supervise, manage exceptions, and hold accountability.

The industry has converged on a minimal definition of an agent: a model autonomously using tools in a loop toward a goal (Anthropic, Dec 2024; OpenAI, 2025; Google, Sep 2024). This guide accepts that definition and adds a second, orthogonal axis that the standard definition does not carry: whether the agent learns.

**Without a learning loop, you have a fixed-policy agent, not a teammate.** This is the authors' position, stated as such: a fixed-policy agent is still an agent by every mainstream definition, and fixed policies are the right choice for many workloads. But an enterprise of fixed-policy agents is an automated enterprise, not an agentic one. The difference shows up in the operating model: you configure automation, but you manage a teammate, and managing presupposes that the thing you manage can improve. Learning here is broader than model training: improving heuristics, adding facts to ground truth, and promoting judged behavior into rules all count. The maturity model chapter makes learning an explicit axis, which, in our survey of existing autonomy and maturity models, no prior model does.

## The test: earned trust under named accountability

How do you recognize a genuinely agentic enterprise when you walk into one? Not by counting chatbots. The test is a trust progression under named human accountability:

- Every agent operates under its own identity, with a named human accountable for its purpose, its work, and its learning. This pattern is no longer aspirational; it is productized: agent identity platforms now require a business Sponsor per agent and model agents reporting to managers (Microsoft Entra Agent ID documentation, Apr 2026 [vendor]; ServiceNow AI Control Tower, May 2025 [vendor]; Workday Agent System of Record, Feb 2025 [vendor]), and at least one major bank runs digital employees with logins and human managers in production (BNY, reported Jul-Oct 2025).
- Autonomy is earned per behavior, not granted per agent: it expands with demonstrated reliability, and contracts when reliability fails (Anthropic trust framework, Aug 2025, and human-agent teaming guidance, Jun 2026 [vendor]).
- Supporting evidence an auditor can check: agents registered in a catalog with owners and risk tiers; routine work flowing to agents by default with humans receiving exceptions and approvals; every agent action attributable and gated or reversible; agent behavior changes shipping through evals and staged rollout like software.

A useful research finding on why partnership is the right frame: in a randomized field experiment with 776 professionals, individuals working with AI matched the performance of two-person teams without it, and teams with AI performed best (The Cybernetic Teammate, NBER w33641, Mar 2025).

## What stays human

Lights-out applies to routine execution, never to responsibility. Humans keep: intent and goal-setting; accountability (the Sponsor pattern); exception handling and judgment under ambiguity; relationship and trust work; and the governance of the machines themselves, including the rules agents may never modify.

Four zones stay deterministic no matter how capable models become, in the authors' judgment: access control and entitlements; movement of money; safety actuation; and formal regulatory records. Probabilistic reasoning runs inside these deterministic boundaries, never instead of them. The security and governance tracks of this guide test these zones against regulatory guidance in detail.

## How enterprises start, and how this guide recommends starting

These are two different questions, and the guide keeps them separate.

What the market does first, by weight of evidence: software engineering, IT operations and service desk, knowledge management, and customer service are the functions where production agents concentrate (McKinsey State of AI, Nov 2025; Menlo Ventures, Nov 2025; LangChain State of Agent Engineering, Dec 2025; Gartner CIO poll, May 2025). Production agents skew internal: roughly half focus on internal administration versus a quarter customer-facing in Gartner's poll. Sales and marketing absorb outsized budgets while ranking mid-pack for production agents; one contested-methodology study frames that budget concentration as the signature misallocation of the current wave (MIT NANDA, Aug 2025).

What this guide recommends, and why it differs: start where iteration is cheap and evaluation is objective; use internal employee workflows deliberately to build the foundational platform (identity, memory, evals, governance) before extending to risk-heavier domains; and treat customer-facing agents as a separate investment lane with a different stack. The analyst world now institutionalizes that last claim by running separate platform evaluations for customer-service and employee-service conversational AI (Forrester Waves, Q2 and Q3 2026). The recommended path is the authors' practitioner judgment about what succeeds, rather than a description of what is most attempted; the roadmap chapter carries the full framework, including use-case portfolio selection, which decides more than any platform choice does.

## What this guide is, and is not

This guide is a growing library: layer-by-layer architecture tracks across the enterprise landscape, a techniques library with economics, contested-choice verdicts argued from evidence both ways, maturity and readiness models, department and vertical blueprints, and vendor analysis against a neutral question bank. Every recommendation must beat the simplest credible alternative on evidence and enterprise economics. Vendor-published numbers are labeled as such. Where the authors take a position ahead of the evidence, the text says so, as it does twice in this chapter.

It is not a vendor pitch, and it is not hype amplification. That bottling plant did not automate its floor by believing in robots. It got there by engineering, measurement, and a floor crew that never stopped being accountable.

## Sources

- Anthropic, Building Effective Agents, Dec 19 2024. https://www.anthropic.com/engineering/building-effective-agents [vendor]
- OpenAI, A Practical Guide to Building Agents, 2025. https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf [vendor]
- Google, Agents whitepaper, Sep 2024. [vendor]
- Microsoft Learn, Administrative relationships in Entra Agent ID, Apr 16 2026. https://learn.microsoft.com/en-us/entra/agent-id/agent-owners-sponsors-managers [vendor]
- ServiceNow, AI Control Tower launch, May 6 2025 [vendor]; Workday, Agent System of Record, Feb 11 2025 [vendor]
- BNY digital employees: HR Grapevine, Jul 17 2025; Axios, Oct 17 2025
- Anthropic, framework for safe and trustworthy agents, Aug 4 2025; Lessons on building effective human-agent teams, Jun 24 2026 [vendor]
- Dell'Acqua et al., The Cybernetic Teammate, NBER working paper 33641, Mar 2025. https://www.nber.org/papers/w33641
- McKinsey, The State of AI in 2025, Nov 2025; Menlo Ventures, 2025 State of Generative AI in the Enterprise, Nov 2025; LangChain, State of Agent Engineering, Dec 2025; Gartner CIO webinar poll via press release, Jun 11 2025; MIT NANDA, The GenAI Divide, Aug 2025 (methodology contested); Forrester, Conversational AI Waves for Customer Service (Q2 2026) and Employee Services (Q3 2026)
