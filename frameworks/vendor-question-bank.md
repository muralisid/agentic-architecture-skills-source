---
reader_summary: "Ask capability and evidence questions before reviewing vendors so product narratives cannot define the evaluation."
audience: ["CIO/CTO", "Enterprise architect", "Procurement and risk lead"]
decision_or_output: "Create a workload-specific evidence request and identify disqualifying gaps before scoring products."
prerequisites: ["/docs/blueprints", "/docs/frameworks/roadmap-checklist"]
reading_time: "11 minutes"
evidence_status: "Vendor-neutral author framework; answers require current vendor evidence and contractual verification."
next: "/docs/frameworks/vendor-scorecard"
---

# The Vendor Question Bank

As of August 2026. Phase 7. Thirty questions, each with what a good answer contains and what a bad answer sounds like.

---

## How to use this

Ask these before a demo, not after. A demo answers "can it do the thing"; these answer "what happens when it does the thing at scale, in your estate, under your obligations, for three years."

Each question carries two calibrations. **Good answers are specific and checkable**: a document link, a configuration surface, a named limit. **Bad answers are the reason this bank exists**: they redirect to roadmap, to a customer story, or to a capability adjacent to the one you asked about. Agent washing is named by analysts as widespread, and the redirect is how it presents.

Score the answers with [vendor-scorecard.md](vendor-scorecard.md).

## A. Identity and access (6)

**A1. Does each agent get a first-class identity in a directory, or does it run on a shared credential?**
Good: a named identity type, lifecycle documentation, and how it appears in your existing identity governance. Bad: "it uses your existing service accounts."

**A2. Is there an accountable-human sponsor attribute on the agent identity, and what happens when that person leaves?**
Good: automatic transfer or expiry, documented. Bad: "customers usually track that in a spreadsheet."

**A3. Does the agent act as the requesting user, and does the downstream system see the human identity?**
Good: on-behalf-of or token exchange, with a statement about what the target system's audit log records. Bad: "it has its own permissions, which you configure."

**A4. Where is the entitlement decision made?**
Good: in the system of record, with the tool layer as a wrapper. Bad: anything describing a permission model the vendor invented that mirrors yours.

**A5. What can this agent do without a further grant: execute code, browse, use a computer, hold a mailbox, join meetings, appear in the directory?**
This is the capability-surface question and it decides your controls. Good: an enumerated list. Bad: a product-tier answer.

**A6. Are agent credentials short-lived, and is there zero standing privilege?**
Good: token lifetimes and a revocation path with a stated latency. Bad: "credentials are stored securely."

## B. Determinism and control (5)

**B1. Which decisions in your product are made by the model, and which by deterministic rules?**
The single most revealing question in the bank. Good: a clear line, usually with authorisation on the deterministic side. Bad: "the model is very reliable."

**B2. Can I enforce an approval gate the agent cannot bypass, outside the model?**
Good: an enforcement point named, ideally a gateway or policy engine. Bad: "you can instruct it in the system prompt."

**B3. Does the agent pause before consequential actions by default, or does it act?**
Ask because at least one major platform's agents do not pause by default, which surprises buyers. Good: a documented default plus how to change it. Bad: "you can build approval into your flow."

**B4. Where is the kill switch, how many of them are there, and what is the stop latency?**
Good: more than one, at different layers, with a drill procedure. Bad: "you can disable the agent in the admin console."

**B5. Are your guardrails advisory or enforcing, and what is your measured evasion rate?**
Good: an honest "advisory, here is what they catch." Bad: any claim of comprehensive protection. Measured evasion against major commercial guardrails reaches 72% to 77%, and up to 100% in some configurations.

## C. Memory and data (6)

**C1. What memory tiers exist, and which persist beyond a session?**
Good: an explicit tier model. Bad: "it remembers context."

**C2. Can I export my agent's memory, in what format, and has anyone done it?**
Memory is the deepest lock-in surface in this market and there is no export standard. Good: a format, an API and a named customer who has migrated. Bad: "export is on the roadmap."

**C3. Do source ACLs propagate into embeddings, chunks and derived artifacts, and is retrieval pre-filtered on the caller's live identity?**
Good: yes, with the sync mechanism and the behaviour when sync lags. Bad: "we respect your permissions" without a mechanism.

**C4. When a user is deleted, what happens to their vectors, memories, traces and eval datasets?**
The erasure cascade question. Good: a documented cascade with a completion-time commitment. Bad: "deletion is handled at the source."

**C5. Does every answer carry provenance to source spans, stored alongside the embedding?**
Good: yes, at retrieval time, exposed in the API. Bad: citations generated by the model.

**C6. What happens to my data on model upgrade: is there a re-embed, who pays, and how is the index swapped?**
Good: blue and green swaps with a stated cost owner. Bad: "upgrades are seamless."

## D. Economics (5)

**D1. What is the meter, exactly: tokens, actions, credits, seats, resolutions?**
Good: a single sentence a finance person understands. Bad: a pricing page requiring a calculator and an assumption set.

**D2. What is the loop multiplier for agentic work versus chat on your platform?**
Good: a number or a measured range. Bad: "it depends on your use case," offered without an offer to measure it.

**D3. Can I set a hard per-run and per-agent cap, and what happens when it is hit?**
Good: enforcement plus a defined behaviour, ideally failing to a human queue. Bad: alerting only.

**D4. Can I attribute cost to an individual agent and its sponsor?**
Good: per-agent metering exposed in the billing API. Bad: cost per tenant.

**D5. If your pricing is per-user rather than per-agent, what stops agent proliferation?**
Per-user licensing removed the cost brake that used to limit presence identity. Good: an acknowledgement plus governance surfaces. Bad: "proliferation has not been an issue."

## E. Evaluation and change (4)

**E1. Is there a path from production traces to eval datasets without manual export?**
Good: a documented pipeline. Bad: "you can download traces."

**E2. Can domain experts build and own evals without writing code?**
The eval bar belongs to domain SMEs. Good: a judge-building surface aimed at non-engineers. Bad: a notebook.

**E3. When you change the underlying model, how do I know, and how do I test before it reaches production?**
No vendor has published a behaviour-regression change-management practice for embedded agents, so the honest answer is rare and worth rewarding. Good: advance notice, a pinning option and a staging path. Bad: "we handle model updates for you."

**E4. Can I roll back an agent version, and has a customer done it?**
Good: versioning with rollback and an example. Bad: "you can restore a previous configuration."

## F. Interoperability and exit (4)

**F1. Do you support MCP and A2A, as client, as server, or both, and which version?**
Good: specific. Bad: "we support open standards."

**F2. If I leave, what comes with me: prompts, skills, evals, memory, traces, tool definitions?**
Rank the answers by what actually ports. Skills in an open format port; memory rarely does. Bad: "your data is always yours."

**F3. Which parts of my configuration are expressible outside your product?**
Good: an honest map of the proprietary surface. Bad: a claim of no lock-in, which is never true and signals the vendor has not thought about it.

**F4. What have you deprecated in the last twenty-four months, and what notice did customers get?**
The roadmap-stability question, and the most predictive one in the bank. Good: a list with dates. Bad: "we do not deprecate."

## Applying the bank to a narrative

The worked example the guide uses: a vendor slide claiming that only their platform connects six named systems. Run it through the bank and the claim decomposes. F1 asks whether the connections are open-protocol or proprietary. A4 asks where entitlement is decided in each of the six. C3 asks whether permissions propagate into the index built across them. D1 asks what each connection costs to run. F2 asks what happens to those six connections if you leave.

The claim is usually true and almost never the point. Every one of the six systems has a governed API, and the question is not whether one vendor can reach them but what happens to identity, permissions, cost and exit when they do.

## The freshness rule

Every answer collected here carries the date it was given and the person who gave it. Product facts in this market change quarterly. An answer more than two quarters old is a hypothesis.

## Sources

Question calibrations are drawn from the 14 research tracks, particularly research/R04-systems-of-record/ (permission parity, pause behaviour, hard limits), research/R10-security-and-identity/ (guardrail evasion, credential handling), research/R14-agent-data-engineering/ (ACLs, erasure, re-embedding), research/R12-observability-and-finops/ (metering, caps), research/R07-agent-platform/ (portability, deprecation), research/R06-intelligence-and-learning/ (eval ownership).
