// Runs inside the Vercel build, before content sync, so the protection travels
// with the deployment rather than living only in CI.
//
// The publication hold is enforced unconditionally by sync-content.mjs.
// This adds the blocklist scan, which needs the private list: set the
// BOUNDARY_BLOCKLIST environment variable in the Vercel project to enable it.

import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const blocklist = process.env.BOUNDARY_BLOCKLIST?.trim();
const isEnabled = (value) => value === '1' || value?.toLowerCase() === 'true';
const hostedBuild = isEnabled(process.env.CI) || isEnabled(process.env.VERCEL);

const holdRegister = await readFile(path.join(repoDir, 'PUBLICATION-HOLD.md'), 'utf8');
const heldSection = holdRegister.split('## Deliberately not held')[0];
const heldPaths = [...heldSection.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((match) => match[1].trim());
if (process.env.SOURCE_REPOSITORY_PUBLIC === 'true' && heldPaths.length) {
  console.error('prebuild-guard: SOURCE_REPOSITORY_PUBLIC cannot be true while publication-held files remain tracked.');
  process.exit(1);
}

if (!blocklist) {
  if (hostedBuild) {
    console.error('prebuild-guard: BOUNDARY_BLOCKLIST is required for CI and hosted builds. Refusing to publish without the private leak scan.');
    process.exit(1);
  }
  console.warn(
    'prebuild-guard: BOUNDARY_BLOCKLIST is not set, so the blocklist scan did not run.\n' +
      '                The publication hold still applies. Set BOUNDARY_BLOCKLIST in the\n' +
      '                Vercel project environment variables to enforce the full boundary.',
  );
  process.exit(0);
}

const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'agentic-enterprise-boundary-'));
const tmp = path.join(tmpDir, 'blocklist.txt');
let res;
try {
  await writeFile(tmp, blocklist, { mode: 0o600 });
  res = spawnSync(process.execPath, [path.join(repoDir, 'scripts', 'boundary-scan.mjs')], {
    stdio: 'inherit',
    env: { ...process.env, BLOCKLIST: tmp },
  });
} finally {
  await rm(tmpDir, { recursive: true, force: true });
}

if (res.status !== 0) {
  console.error('prebuild-guard: boundary scan failed. Refusing to build.');
  process.exit(1);
}
