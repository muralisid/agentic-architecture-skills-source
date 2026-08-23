---
reader_summary: "Locate where each cross-cutting concern is created, enforced, observed, and still unsolved across the fourteen enterprise layers."
audience: ["Enterprise architect", "Security architect", "Platform lead"]
decision_or_output: "Assign a primary enforcement owner and evidence source for every concern relevant to the target workload."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "9 minutes"
evidence_status: "Cross-track synthesis with unresolved concerns published as unresolved."
next: "/docs/architecture/memory-pipeline-architecture"
---

# The Concerns-by-Layers Matrix

As of August 2026. Phase 4 synthesis, rolled up from the mandatory cross-cutting concerns section in all 14 research tracks.

---

## What this page is for

Every track answered the same ten concerns for its own layer. Read down a column and you get one layer's control set. Read across a row and you get something the per-track chapters cannot show: where a concern is actually **owned**, where it is **enforced**, and where it is merely **inherited**. Most architecture failures at this level come from confusing those three.

The distinction used throughout:

- **Owned** means the layer defines the requirement and holds the accountability. Usually one or two layers per concern.
- **Enforced** means the layer is where a violation is actually stopped. Frequently a different layer from the owner.
- **Inherited** means the layer must carry the property through without weakening it. This is where most defects live, because inheritance is silent when it fails.

## Row view: who owns, who enforces

| # | Concern | Owned at | Enforced at | The failure that follows from getting it wrong |
|---|---|---|---|---|
| C1 | Identity and access | R10 security and identity | R03 gateway (tool calls), R04 record systems (entitlement), R01 (workload identity) | Identity is asserted but never checked at the point of action, so audit shows an agent name against actions no policy ever authorised |
| C2 | Observability | R12 observability and FinOps | Emitted by every layer, aggregated at R12 | Coverage looks complete because the platform emits, while the licensed estate (R08) and the record systems (R04) emit into their own consoles |
| C3 | Traceability and audit | R11 governance | R12 (collection), R14 (provenance at parse time) | Evidence is reconstructed after an incident rather than produced as a byproduct, which is the difference between an audit answer and an argument |
| C4 | Grounding in reality | R02 data platform and R14 data engineering | R09 (hardest external bar), R05 (digital-twin validation before display) | The model answers over weak evidence instead of refusing, and the failure is invisible until it is external |
| C5 | Impersonation and authenticity | R10 | R03 (server identity), R08 and R09 (disclosure in shared and public surfaces) | Agent-to-human trust exploitation, which the threat taxonomies now list explicitly and which no technical control at the model layer addresses |
| C6 | Sovereignty and residency | R11 | R01 (serving location), R02 and R14 (index and derived-artifact locality), R03 (classification routing) | Residency is satisfied for the source system and quietly broken by an embedding, a trace, or a session artifact |
| C7 | Data privacy | R11 | R14 (erasure cascade), R02 (index scope), R12 (redaction in traces) | Deletion succeeds in the system of record and fails in the vectors, memories, logs, and telemetry derived from it |
| C8 | Safety and human oversight | R13 operating model | R03 (gateway kill switch), R07 (harness caps and stop conditions), R01 (runtime), R05 (operator decision authority) | Oversight exists on the org chart and not in the workload, so the human is accountable for a decision they had no practical capacity to make |
| C9 | Cost accountability | R12 | R07 (per-run budgets in the harness), R03 (rate limits as budget controls) | Spend is attributed to a platform rather than a sponsor, and the supervision labour never appears in the business case at all |
| C10 | Resilience and continuity | R01 infrastructure | Every layer's degraded mode; R12 (budget-exhaustion behaviour) | Failure modes compose: the fallback path is designed per layer and never tested end to end |

## Seven invariants that hold at every layer

These emerged from the roll-up rather than being imposed on it. Each appears independently in three or more tracks, which is why they are stated as invariants rather than recommendations.

**1. Derived artifacts inherit the strictest classification of their sources.** Chunks, embeddings, topic models, session artifacts, traces, and fine-tuned weights are all derived artifacts. R02, R14, R12, R07, and R06 each reached this independently. The corollary is operationally hard: a derivation that mixes sources inherits the strictest of them, and no complete published solution exists for permissions on many-to-one derivations (see the open gaps).

**2. Erasure cascades or it does not count.** A deletion request must reach vectors, memories, traces, telemetry, eval datasets, and any fine-tuned artifact. Because embeddings are recoverable to their source text, they are personal data where their sources are. Named at R02, R14, R06, and R12.

**3. Every layer degrades to a human queue.** R01, R02, R03, R04, R05, R09, and R12 all specify this as the terminal fallback. The R09 form carries the sharpest edge: never manufacture containment through queue unavailability.

**4. Telemetry is collected outside the agent's control.** An agent cannot be trusted to report on itself, and self-assessment is treated as unreliable by default. R12 states it for traces, R07 for verification separated from generation, R13 for blind checks against self-report.

**5. The kill switch is multi-point, and observability failure must not blind it.** Cutting an agent off is available at the runtime (R01), the gateway (R03), the harness (R07), and the identity plane (R10) because each covers what the others cannot. R12 adds the constraint that an observability outage must not disable it.

**6. Enforcement is deterministic and sits outside the model.** The four irreversible zones are the strict form, but the general form recurs everywhere: approval rules may be held in the harness, they are enforced at the gateway; entitlement may be described in a prompt, it is decided in the record system.

**7. Provenance travels inside the artifact, not alongside it.** Provenance attached at parse time and carried through chunk, embedding, retrieval, and claim is the only form that survives. Provenance stored in a parallel system is provenance that will be out of sync at the moment it matters.

## Column view: the ten concerns, by layer

The per-layer detail lives in each track's findings. This index is the navigation aid.

| Layer | The concern this layer most distinctively carries |
|---|---|
| R01 Infrastructure and compute | C10 resilience: durable resumable sessions, snapshot and restore, and the runtime kill switch |
| R02 Data platform | C1 identity: ACLs crawled into index metadata with pre-filtered retrieval and fail-close on sync errors |
| R03 Integration fabric | C1 and C8 together: the gateway is where identity assertion and destructive-action gating both land |
| R04 Systems of record | C1 identity: agents act as the requesting user, entitlement never leaves the record system |
| R05 Line of business and OT | C8 safety: agent output is never an independent protection layer, and revert-to-manual is tested |
| R06 Intelligence and learning | C3 traceability: every promoted rule carries the counterexamples it survived and its eval deltas |
| R07 Agent platform | C9 cost: per-run budgets enforced in the harness, with the orchestration multiplier chosen deliberately |
| R08 Productivity and collaboration | C5 authenticity: agent output labelled in shared surfaces, no agent presenting as a colleague |
| R09 Experience and channels | C3 traceability: conversation records are legal evidence, because statements here bind externally |
| R10 Security and identity | C1 identity: registered first-class identities, JIT least privilege, deterministic decision on every consequential action |
| R11 Governance, risk and sovereignty | C3 and C6: retained evidence and the classification-routed deployment map |
| R12 Observability and FinOps | C9 cost: envelopes, caps, anomaly detection, and cost per outcome |
| R13 Operating model | C8 oversight: designed for prevention and legibility, with supervision cost in the business case |
| R14 Agent data engineering | C7 privacy: erasure cascades and the recoverability of embeddings |

## Open gaps: concerns with no complete answer anywhere

Published honestly, because a matrix with no holes in it would be the least credible artifact in this guide.

| Gap | Layer | Status as of August 2026 |
|---|---|---|
| Permissions on many-to-one derived artifacts | R14, C1 and C6 | No complete published solution. Intersection-stamping is the emerging practice. Track for standardisation |
| Behavioural baselining for agents in the SOC | R10, C2 | Unsolved. Agent behaviour is legitimately variable, so the human and workload baselining methods both misfire. Re-check after RSAC 2027 |
| Multi-agent incident reporting | R11, C3 | No frame exists. When several agents contribute to one incident, no regulation or standard says who reports what |
| Error budgets for agent quality | R12, C2 | No published enterprise analog. Presented as an open pattern rather than a practice |
| Human-to-agent supervision ratio | R13, C8 | No credible published figure from any source. Anyone quoting one is extrapolating |
| Embedded versus external agent comparison | R04 | No published head-to-head measurement on identical tasks, so platform choice arguments rest on architecture rather than outcome data |

## How this matrix is used

The autonomy contract keys its gates to these rows: a workload may not promote past A3 with an unaddressed concern in the enforcement column. The blueprints instantiate the columns per department and vertical. The decision catalog asks vendors to answer the rows, which is a more revealing question than asking what a product does.
