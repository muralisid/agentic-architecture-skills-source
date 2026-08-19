# R01: Infrastructure & compute

Status: not started. Scope below is the v0 inventory; it is finalized at track kickoff with maintainer POV questions before research begins (see CLAUDE.md working protocol).

## Scope inventory (v0)

- **Current estate**: cloud landing zones, multi-cloud and region strategy, Kubernetes, serverless, IaC and GitOps provisioning automation, environment strategy (dev/test/prod parity for agents)
- **Agent execution**: sandboxes and isolation (microVMs, containers), browser and computer-use infrastructure, VDI where agents act on desktops, ephemeral cattle environments with lazy provisioning, cold-start and time-to-first-token economics
- **Model serving**: GPU and accelerator capacity planning, inference serving for self-hosted and open-weight models, edge inference for OT and remote sites
- **Networking for agents**: egress control and allowlists, forward proxies, private connectivity to SaaS and model providers, service mesh
- **Identity and resilience**: workload identity for agent compute, infra-level secrets and short-lived credentials, checkpoint and session persistence, crash recovery, DR, quotas and noisy-neighbor controls
- **Cost**: resource tagging and showback, autoscaling policy, spot and reserved capacity strategy

## Challenged-default candidates

Self-hosted GPU estates vs metered APIs; dedicated agent-sandbox products vs hardened containers. Each track proposes its final list at kickoff.

## Files

`brief.md`, `findings.md`, `vendors.md`, `sources.md` are created from `../_TEMPLATE/` at kickoff.
