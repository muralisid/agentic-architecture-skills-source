/**
 * The published skill catalogue, read at build time.
 *
 * `scripts/build-skills.mjs` writes `lib/skills-catalogue.json` alongside the
 * bundles it publishes, so the site and the discovery endpoint can never
 * disagree about what exists. The file is generated and git-ignored; an empty
 * catalogue means the build step has not run yet.
 */

import catalogue from './skills-catalogue.json';
import { siteUrl, skillsRepoSlug, skillsIndexPath } from './shared';

export interface PublishedSkill {
  name: string;
  kind: 'task' | 'reference';
  track: 'enterprise' | 'product' | 'both';
  description: string;
  version: string;
  digest: string;
  bytes: number;
  references: string[];
  hasScripts: boolean;
}

export function listSkills(): PublishedSkill[] {
  return (catalogue.skills ?? []) as PublishedSkill[];
}

export function skillsByKind(kind: PublishedSkill['kind']): PublishedSkill[] {
  return listSkills().filter((skill) => skill.kind === kind);
}

export const skillCount = () => listSkills().length;

export const bundleUrl = (name: string) => `/.well-known/agent-skills/${name}.zip`;
export const skillMarkdownUrl = (name: string) => `/.well-known/agent-skills/${name}/SKILL.md`;

/** The one-line install a reader can copy, per install path. */
export const installCommands = {
  everything: `npx skills add ${skillsRepoSlug}`,
  one: (name: string) => `npx skills add ${skillsRepoSlug} --skill ${name}`,
  fromSite: `npx skills add ${siteUrl}`,
  gh: (name: string) => `gh skill install ${skillsRepoSlug} ${name}`,
  plugin: `claude plugin marketplace add ${skillsRepoSlug}`,
} as const;

export { skillsIndexPath };
