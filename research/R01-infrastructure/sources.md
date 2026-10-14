---
reader_summary: "Verify the dated evidence behind the infrastructure and compute findings and identify claims that need re-verification."
audience: ["Enterprise architect","Infrastructure and platform lead","Research and assurance lead"]
decision_or_output: "Confirm which infrastructure and compute claims are current and strong enough to support the decision."
prerequisites: ["/docs/layers/r01-infrastructure/findings"]
reading_time: "2 minutes"
evidence_status: "Dated source register with vendor-published material identified where applicable."
next: "/docs/layers/r02-data-platform"
---

# R01 Infrastructure & Compute: sources

All accessed 2026-08-19. [vendor] marks vendor-published claims about the publisher's own market.

Epoch AI open-vs-closed gap (May 29 2026); Menlo Ventures State of GenAI (Dec 2025) [VC]; OpenRouter token telemetry (Jun 2026); cost-crossover practitioner set (Cloudzy Jul 2026, Digital Applied 2026, LeanLM, SitePoint: consistent, none peer-reviewed); GDC air-gapped Gemini GA (Aug 28 2025) [vendor]; AWS European Sovereign Cloud GA (Jan 15 2026) [vendor]; Anthropic sandbox post + repo (Oct 2025) [vendor]; Bedrock AgentCore GA + pricing (Oct 2025) [vendor]; Azure dynamic sessions [vendor]; SANDBOXESCAPEBENCH (arXiv 2603.02277); NIST/UK AISI hijacking evals (Jan 2025); OWASP Agentic Top 10 (Dec 2025); EchoLeak CVE-2025-32711 (Jun 2025); Replit incident (Jul 2025); lethal trifecta (Willison Jun 2025); Agents Rule of Two (Meta Oct 2025); Spectro Cloud State of K8s 2025 [vendor]; K8s v1.34 DRA GA (Sep 2025); llm-d to CNCF (Mar 2026); CNCF AI Conformance (Nov 2025); Temporal Series D (Feb 2026) [vendor]; Modal/Cerebrium snapshot benchmarks [vendor]; Cloud Run GPUs GA (Jun 2025) [vendor]; SemiAnalysis H100 index (2026); IETF WIMSE drafts; CSA agent-identity survey (2025).
Re-verify by Q4 2026: Agent Sandbox readiness; GPU pricing; XAA/EMA ISV count; open-vs-closed gap.

Added 2026-10-14 (accessed 12 to 14 October 2026): Anthropic, How we contain Claude (25 May 2026) https://www.anthropic.com/engineering/how-we-contain-claude [vendor]; Unit 42, bypass of AWS AgentCore sandbox network-isolation mode (7 Apr 2026) https://unit42.paloaltonetworks.com/bypass-of-aws-sandbox-network-isolation-mode/; SandboxEscapeBench (Oxford and UK AISI), arXiv 2603.02277 https://arxiv.org/html/2603.02277; Firecracker CVE-2026-5747 https://nvd.nist.gov/vuln/detail/cve-2026-5747; gVisor CVE-2026-96812, seen on one aggregator page only and unconfirmed https://app.opencve.io/cve/CVE-2026-96812; AWS security bulletin AWS-2025-015 on the Amazon Q extension https://aws.amazon.com/security/security-bulletins/AWS-2025-015/ [vendor]; Pluto Security on credentials inside Claude Managed Agents (27 Apr 2026) https://pluto.security/blog/inside-claude-managed-agents [secondary]; MCP authorization specification (2025-11-25) https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization; Cloud Security Alliance, agentic AI trust boundary note (3 Aug 2026; AI-assisted and unreviewed) https://labs.cloudsecurityalliance.org/research/agentic-ai-trust-boundary-crisis-v1-0-csa-styled/ [secondary].
