/**
 * Validates the published skill bundles on disk.
 *
 * The build applies the same rules before it writes anything; this runs against
 * what was actually written, so it also catches a stale or hand-edited artifact
 * and a digest that no longer matches its bundle. It is what CI runs before the
 * public repository is updated.
 */

import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

import { validateSkill } from './lib/skill-rules.mjs';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const wellKnownDir = path.join(siteDir, 'public', '.well-known', 'agent-skills');
const exportDir = path.join(siteDir, 'skills-export', 'skills');

const problems = [];

async function readSkillTree(root, name) {
  const files = [];
  async function walk(directory, prefix) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(directory, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(full, rel);
      else files.push({ path: rel, contents: await readFile(full, /\.(md|txt|json|py|csv)$/.test(rel) ? 'utf8' : undefined) });
    }
  }
  await walk(path.join(root, name), '');
  return files;
}

async function main() {
  if (!existsSync(wellKnownDir)) {
    console.error('validate-skills: nothing to validate. Run `npm run skills:build` first.');
    process.exit(1);
  }

  const index = JSON.parse(await readFile(path.join(wellKnownDir, 'index.json'), 'utf8'));
  if (index.$schema !== 'https://schemas.agentskills.io/discovery/0.2.0/schema.json') {
    problems.push(`index.json declares an unexpected $schema: ${index.$schema}`);
  }
  if (!Array.isArray(index.skills) || index.skills.length === 0) {
    problems.push('index.json lists no skills');
  }

  for (const entry of index.skills ?? []) {
    for (const field of ['name', 'type', 'description', 'url', 'digest']) {
      if (!entry[field]) problems.push(`index.json entry ${entry.name ?? '?'} has no ${field}`);
    }
    if (entry.type !== 'archive' && entry.type !== 'skill-md') {
      problems.push(`${entry.name}: type must be "archive" or "skill-md"`);
    }
    if (!/^sha256:[0-9a-f]{64}$/.test(entry.digest ?? '')) {
      problems.push(`${entry.name}: digest is not a lowercase sha256 hex string`);
    }
    if (!/^https:\/\//.test(entry.url ?? '')) {
      problems.push(`${entry.name}: url must be absolute so cross-origin clients can resolve it`);
    }

    const zipPath = path.join(wellKnownDir, `${entry.name}.zip`);
    if (!existsSync(zipPath)) {
      problems.push(`${entry.name}: index.json points at a bundle that is not on disk`);
      continue;
    }
    const digest = `sha256:${createHash('sha256').update(await readFile(zipPath)).digest('hex')}`;
    if (digest !== entry.digest) {
      problems.push(`${entry.name}: the bundle's digest does not match index.json. Rebuild before publishing.`);
    }

    const unpacked = path.join(wellKnownDir, entry.name, 'SKILL.md');
    if (!existsSync(unpacked)) {
      problems.push(`${entry.name}: the browsable SKILL.md is missing beside the bundle`);
      continue;
    }
    const source = await readFile(unpacked, 'utf8');
    const end = source.indexOf('\n---\n', 4);
    const frontmatter = parseYaml(source.slice(4, end)) ?? {};
    const body = source.slice(end + 5);

    const files = existsSync(path.join(exportDir, entry.name))
      ? await readSkillTree(exportDir, entry.name)
      : [{ path: 'SKILL.md', contents: source }];
    problems.push(...validateSkill({ name: entry.name, frontmatter, body, files }));
  }

  if (problems.length) {
    console.error(`validate-skills: ${problems.length} problem(s):`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }
  console.log(`validate-skills: ${index.skills.length} bundles valid, digests match, frontmatter within the specification.`);
}

await main();
