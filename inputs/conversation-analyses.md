# Founding-session analyses

Working analyses produced in the program's founding sessions (August 2026). These frame several cross-cutting lenses; each claim still requires primary-source verification before entering findings. Product facts below are as of mid-2026 and belong on the re-verification list.

## 1. The agent identity taxonomy (access vs presence)

Three distinct levels of "agent identity" exist in the market, and conflating them is the most common confusion in the space:

- **Level 1, credential-only**: shared API keys, service accounts. Invisible to governance; the anti-pattern.
- **Level 2, first-class IAM principal**: the agent is an authenticated principal with task-scoped permissions, audit, and conditional access. An *access identity*. Example as of early 2026: OpenAI Frontier's agent identity inside enterprise IAM (vendor-published); Microsoft Entra Agent ID in its base form.
- **Level 3, organizational presence**: the agent is a licensed directory citizen with mailbox, calendar, files, chat presence, and an assigned manager; provisioned into HR systems. A *presence identity*. Example as of early 2026: Microsoft Agent 365 "AI teammates" (vendor-published), with constraints: no passwords or passkeys on the agent account, a required business Sponsor, lifecycle workflows.

Trade-off: presence identity maximizes collaboration ergonomics but maximizes attack and compliance surface (a mailbox is phishable and discoverable). Access identity is safer by default but keeps agents outside the organization's social fabric. Expectation: enterprises run Level 2 for most agents and reserve Level 3 for a few high-touch teammates with a named Sponsor.

## 2. Memory planes

Agent memory splits into three planes with different governance:

- **Working memory**: the context window; managed by compaction, tool-result clearing, structured note-taking. An engineering discipline.
- **The agent's persistent store**: where platforms diverge. Transparent, inspectable file-like stores at one end; managed, opaque platform memory at the other (retention, scoping, erasure, and export semantics often unspecified publicly). Microsoft's structural move: the Agent 365 teammate's mailbox, OneDrive, and Teams history effectively are its memory, so twenty years of M365 compliance machinery (retention labels, eDiscovery, DLP, audit) applies to agent artifacts.
- **Organizational memory**: semantic layers and graphs shared across agents; permission-aware ACL sync is the control that matters.

Strategic observation: **memory is becoming the deepest lock-in surface.** Tools are portable via MCP, identity standards are emerging, but there is no memory export standard. A year of accumulated institutional memory inside a platform is a switching cost no gateway abstraction undoes.

## 3. Pricing regimes and the loop multiplier

Three regimes, differing in who absorbs the token multiplier of agentic loops (vendor-published figures: roughly 4x chat for single agents, 15x for multi-agent):

| Regime | Examples (as of mid-2026) | Who absorbs the multiplier |
|---|---|---|
| Human seat | ChatGPT Enterprise, Claude Enterprise, Copilot | The vendor, until fair-use caps |
| Agent seat | Agent 365 per-agent licensing | The vendor per agent; the customer pays for idle agents |
| Metered API | Claude/OpenAI APIs, Bedrock, Vertex | The customer, per token |

Consequences: marginal cost of one more task is near zero under a seat and equals tokens under API, so enterprises arbitrage and vendors respond with fair-use terms and metered platform billing. Pricing shapes architecture: agent-seat licensing favors few durable teammates, metering favors ephemeral fleets. Seat pricing assumes human utilization patterns while agents can run continuously, so heavy workloads migrate toward consumption pricing over time.

## 4. The two-estate problem

Per-run budgets, circuit breakers, routing, and caching exist only where the enterprise owns the loop: the API estate behind its own gateway. Licensed platforms (Copilot, Agentforce, Frontier) run outside that gateway; cost governance there collapses to license count plus vendor throttles, and the enterprise's gateway never sees those tokens. Enterprise architecture, audit, and cost control must deliberately span both estates; observability must pull licensed-platform telemetry into the same view as gateway telemetry.

## 5. Memory-economics coupling

Accumulated memory reduces tokens per task (less re-derivation, less context onboarding), so memory is capex that lowers inference opex. Under API pricing the enterprise captures that efficiency; under seats the vendor does, while lock-in deepens. Tension to govern explicitly: economically optimal memory retains everything; governance-optimal memory minimizes and expires.
