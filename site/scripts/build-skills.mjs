/**
 * Builds the published Agent Skills from the site's own pages.
 *
 * A skill is a hand-written SKILL.md (the description is the whole triggering
 * surface, so it is authored, never generated) plus the pages it bundles as
 * references. This script resolves those pages from the synced content tree,
 * converts them to plain Markdown, and emits two things:
 *
 *   site/public/.well-known/agent-skills/   the discovery index and the bundles
 *   site/skills-export/                     the tree published to the public repo
 *
 * Bundles are byte-reproducible, because the discovery index addresses each one
 * by a sha256 digest: the same inputs must always produce the same digest, or
 * every build would look like a new release to anyone who cached one.
 *
 * Run after `sync`. `--export` also writes the public-repo tree; `--check`
 * builds into memory and validates without writing.
 */

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

import { siteUrl, skillsRepo } from '../lib/site.config.mjs';
import { loadFigureManifestModule, loadGlossaryModule } from './figure-manifest-loader.mjs';
import { convertPage } from './lib/mdx-to-markdown.mjs';
import { createZip } from './lib/zip.mjs';
import { validateSkill } from './lib/skill-rules.mjs';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const skillsDir = path.join(repoDir, 'skills');
const contentDir = path.join(siteDir, 'content', 'docs');
const wellKnownDir = path.join(siteDir, 'public', '.well-known', 'agent-skills');
const exportDir = path.join(siteDir, 'skills-export');

const args = new Set(process.argv.slice(2));
const withExport = args.has('--export');
const checkOnly = args.has('--check');

const DISCOVERY_SCHEMA = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

/** The date of the newest input to a skill, so a bundle's version means something. */
function versionFor(inputs) {
  let newest = '';
  for (const input of inputs) {
    try {
      const stamp = execFileSync('git', ['log', '-1', '--format=%cs', '--', input], {
        cwd: repoDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (stamp > newest) newest = stamp;
    } catch {
      // A shallow clone or an uncommitted file: fall through to the fallback.
    }
  }
  if (!newest) {
    try {
      newest = execFileSync('git', ['log', '-1', '--format=%cs'], { cwd: repoDir, encoding: 'utf8' }).trim();
    } catch {
      newest = new Date().toISOString().slice(0, 10);
    }
  }
  return newest.replaceAll('-', '.');
}

function splitFrontmatter(source, where) {
  if (!source.startsWith('---\n')) throw new Error(`${where}: SKILL.md must open with YAML frontmatter`);
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) throw new Error(`${where}: unterminated frontmatter`);
  return { frontmatter: parseYaml(source.slice(4, end)) ?? {}, body: source.slice(end + 5).replace(/^\n/, '') };
}

/** The synced page for a route, product pages and library mirror alike. */
function pageFileFor(route) {
  const slug = route.replace(/^\//, '') || 'index';
  const candidates = [
    path.join(contentDir, `${slug}.mdx`),
    path.join(contentDir, `${slug}.md`),
    path.join(contentDir, slug, 'index.mdx'),
    path.join(contentDir, slug, 'index.md'),
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

function referenceFilename(reference) {
  if (reference.as) return reference.as;
  const slug = reference.route.replace(/^\//, '').replaceAll('/', '-') || 'index';
  return `${slug}.md`;
}

async function collectExtras(skillDir, subdirectory) {
  const directory = path.join(skillDir, subdirectory);
  if (!existsSync(directory)) return [];
  const names = (await readdir(directory)).filter((name) => !name.startsWith('.')).sort();
  return Promise.all(
    names.map(async (name) => ({
      path: `${subdirectory}/${name}`,
      contents: await readFile(path.join(directory, name)),
    })),
  );
}

async function build() {
  const catalog = JSON.parse(await readFile(path.join(skillsDir, 'catalog.json'), 'utf8'));
  const { figureManifest } = await loadFigureManifestModule();
  const { GLOSSARY } = await loadGlossaryModule();
  const context = {
    siteUrl,
    figures: new Map(figureManifest.map((figure) => [figure.id, figure])),
    glossary: GLOSSARY,
  };

  const built = [];
  const problems = [];

  for (const entry of [...catalog.skills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    const skillDir = path.join(skillsDir, entry.name);
    const skillPath = path.join(skillDir, 'SKILL.md');
    if (!existsSync(skillPath)) {
      problems.push(`${entry.name}: skills/${entry.name}/SKILL.md is missing`);
      continue;
    }

    const source = await readFile(skillPath, 'utf8');
    const { frontmatter, body } = splitFrontmatter(source, entry.name);

    const inputs = [path.relative(repoDir, skillPath)];
    const files = [];

    for (const reference of entry.references ?? []) {
      const file = pageFileFor(reference.route);
      if (!file) {
        problems.push(`${entry.name}: route ${reference.route} does not resolve to a published page`);
        continue;
      }
      inputs.push(path.relative(repoDir, file));
      const converted = convertPage(await readFile(file, 'utf8'), { ...context, route: reference.route });
      files.push({ path: `references/${referenceFilename(reference)}`, contents: converted.body });
    }

    for (const extra of [...(await collectExtras(skillDir, 'scripts')), ...(await collectExtras(skillDir, 'assets'))]) {
      files.push(extra);
      inputs.push(path.relative(repoDir, path.join(skillDir, extra.path)));
    }

    for (const asset of entry.assets ?? []) {
      const file = path.join(siteDir, 'public', asset);
      if (!existsSync(file)) {
        problems.push(`${entry.name}: asset ${asset} is missing from site/public`);
        continue;
      }
      files.push({ path: `assets/${path.basename(asset)}`, contents: await readFile(file) });
    }

    // Stamp provenance into metadata, the only frontmatter the build may touch.
    const version = versionFor(inputs);
    const stamped = {
      ...frontmatter,
      metadata: {
        ...(frontmatter.metadata ?? {}),
        version,
        source: `${siteUrl}/skills`,
        bundled: String(files.filter((file) => file.path.startsWith('references/')).length),
      },
    };
    const skillMd = `---\n${stringifyYaml(stamped).trimEnd()}\n---\n\n${body.trim()}\n`;

    const bundle = [{ path: 'SKILL.md', contents: skillMd }, ...files];
    problems.push(...validateSkill({ name: entry.name, frontmatter: stamped, body, files: bundle }));

    const zip = createZip(bundle.map((file) => ({ path: `${entry.name}/${file.path}`, contents: file.contents })));
    built.push({
      entry,
      frontmatter: stamped,
      skillMd,
      bundle,
      zip,
      digest: `sha256:${createHash('sha256').update(zip).digest('hex')}`,
      version,
    });
  }

  if (problems.length) {
    console.error(`build-skills: ${problems.length} problem(s):`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }

  const index = {
    $schema: DISCOVERY_SCHEMA,
    skills: built.map((skill) => ({
      name: skill.entry.name,
      type: 'archive',
      description: String(skill.frontmatter.description).replace(/\s+/g, ' ').trim(),
      url: `${siteUrl}/.well-known/agent-skills/${skill.entry.name}.zip`,
      digest: skill.digest,
    })),
  };

  // A catalogue the site renders, alongside the spec-shaped index agents read.
  const catalogue = {
    generated: built.length,
    skills: built.map((skill) => ({
      name: skill.entry.name,
      kind: skill.entry.kind,
      track: skill.entry.track,
      description: String(skill.frontmatter.description).replace(/\s+/g, ' ').trim(),
      version: skill.version,
      digest: skill.digest,
      bytes: skill.zip.length,
      references: (skill.entry.references ?? []).map((reference) => reference.route),
      hasScripts: skill.bundle.some((file) => file.path.startsWith('scripts/')),
    })),
  };

  if (checkOnly) {
    console.log(`build-skills: ${built.length} skills validate (nothing written)`);
    return;
  }

  await rm(wellKnownDir, { recursive: true, force: true });
  await mkdir(wellKnownDir, { recursive: true });
  for (const skill of built) {
    await writeFile(path.join(wellKnownDir, `${skill.entry.name}.zip`), skill.zip);
    await mkdir(path.join(wellKnownDir, skill.entry.name), { recursive: true });
    await writeFile(path.join(wellKnownDir, skill.entry.name, 'SKILL.md'), skill.skillMd);
  }
  await writeFile(path.join(wellKnownDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  await writeFile(path.join(siteDir, 'lib', 'skills-catalogue.json'), `${JSON.stringify(catalogue, null, 2)}\n`);

  if (withExport) {
    await rm(exportDir, { recursive: true, force: true });
    for (const skill of built) {
      for (const file of skill.bundle) {
        const target = path.join(exportDir, 'skills', skill.entry.name, file.path);
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, file.contents);
      }
    }
    await writeExportMetadata(built);
  }

  const total = built.reduce((sum, skill) => sum + skill.zip.length, 0);
  console.log(
    `build-skills: ${built.length} skills (${(total / 1024).toFixed(0)} KB) to public/.well-known/agent-skills` +
      (withExport ? ' and skills-export' : ''),
  );
}

async function writeExportMetadata(built) {
  const version = built.map((skill) => skill.version).sort().at(-1) ?? '0.0.0';
  const semver = version.replace(/^(\d+)\.0?(\d+)\.0?(\d+)$/, '$1.$2.$3');
  const readme = await readFile(path.join(skillsDir, 'PUBLIC-README.md'), 'utf8');
  const listing = built
    .map((skill) => `| \`${skill.entry.name}\` | ${skill.entry.kind} | ${skill.entry.track} | ${skill.version} |`)
    .join('\n');

  await writeFile(
    path.join(exportDir, 'README.md'),
    readme.replace('<!-- SKILLS TABLE -->', `| Skill | Kind | Track | Updated |\n|---|---|---|---|\n${listing}`),
  );
  await mkdir(path.join(exportDir, '.claude-plugin'), { recursive: true });
  await writeFile(
    path.join(exportDir, '.claude-plugin', 'plugin.json'),
    `${JSON.stringify(
      {
        name: skillsRepo.repo,
        version: semver,
        description:
          'Architecture skills for the agentic enterprise and for software that agents consume first, generated from agenticarchitectureskills.com.',
        author: { name: 'Murali Sid', url: siteUrl },
        homepage: `${siteUrl}/skills`,
        repository: `https://github.com/${skillsRepo.user}/${skillsRepo.repo}`,
        license: 'CC-BY-SA-4.0',
        keywords: ['architecture', 'agents', 'enterprise', 'mcp', 'governance'],
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(exportDir, '.claude-plugin', 'marketplace.json'),
    `${JSON.stringify(
      {
        name: skillsRepo.repo,
        owner: { name: 'Murali Sid', url: siteUrl },
        metadata: { description: 'Agentic Architecture Skills', version: semver },
        plugins: [
          {
            name: skillsRepo.repo,
            source: { source: 'github', repo: `${skillsRepo.user}/${skillsRepo.repo}` },
            description: 'The published architecture skills, one install for the whole catalogue.',
            version: semver,
            category: 'architecture',
          },
        ],
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(exportDir, 'LICENSE'),
    'The skills in this repository are content, licensed CC BY-SA 4.0.\n\n' +
      `Attribution: Agentic Architecture Skills, Murali Sid, ${siteUrl}\n` +
      'Full text: https://creativecommons.org/licenses/by-sa/4.0/legalcode\n\n' +
      'Scripts bundled inside a skill are licensed MIT.\n',
  );
}

await build();
