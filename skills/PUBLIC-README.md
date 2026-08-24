# Agentic Architecture Skills

Installable Agent Skills for people who design systems that use AI agents, and for people building software that agents will consume.

Each skill is a `SKILL.md` plus the pages it needs as `references/`. They carry the architecture, the decisions and the measured evidence published at [agenticarchitectureskills.com](https://www.agenticarchitectureskills.com), in the form an agent can read: no marketing, dated sources, vendor figures labelled as vendor figures, and the gaps stated as gaps.

<!-- SKILLS TABLE -->

## Install

Pick whichever suits the agent you use. All of them install the same bundles.

```bash
# any agent, from this repository
npx skills add muralisid/agentic-architecture-skills

# one skill only
npx skills add muralisid/agentic-architecture-skills --skill review-agent-architecture


# GitHub CLI (gh 2.90 or newer)
gh skill install muralisid/agentic-architecture-skills review-agent-architecture
```

For Claude Code, the whole catalogue is also a plugin:

```bash
claude plugin marketplace add muralisid/agentic-architecture-skills
claude plugin install agentic-architecture-skills@agentic-architecture-skills
```

For claude.ai, download a `.zip` from [the catalogue](https://www.agenticarchitectureskills.com/skills) and upload it under Settings. To install by hand anywhere else, copy a directory from `skills/` into your agent's skills directory (`~/.agents/skills/` is honoured by most, `~/.claude/skills/` by Claude Code).

Agents that support discovery can also read the index directly:

```
https://www.agenticarchitectureskills.com/.well-known/agent-skills/index.json
```

Every entry carries a `sha256` digest of the bundle it points at, so a download can be verified before it is trusted. Note that `npx skills add <domain>` does not currently reach that index: tested at CLI version 1.5.23 in August 2026, a bare domain is downloaded directly rather than probed. Install from this repository instead.

## This repository is generated

The skills are built from the site's pages on every release, so the two never drift apart. Editing a file here would be overwritten by the next build.

To propose a change, open an issue or a pull request against the content repository behind the site. Contributions are held to the same review bar as the guide: every claim carries a dated source, vendor-published numbers are labelled, product facts carry an as-of date, and no recommendation stands on adoption momentum alone.

Questions, corrections and requests for a skill that does not exist yet: open an issue or a discussion here.

## What is in a skill

A `SKILL.md` with the procedure, and `references/` with the pages it draws on, converted to plain Markdown with the figures described in words, the charts as tables, and every link pointing back at the source page. Some skills also carry `scripts/`, which run outside the model's context.

Skills are read-only reference material. None of them asks for network access or credentials, and none of them acts on your systems.

## Licence

Content is CC BY-SA 4.0: use it, adapt it, keep the attribution and share alike. Bundled scripts are MIT. Attribution: Agentic Architecture Skills, Murali Sid, https://www.agenticarchitectureskills.com
