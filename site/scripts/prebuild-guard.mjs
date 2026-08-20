// Runs inside the Vercel build, before content sync, so the protection travels
// with the deployment rather than living only in CI.
//
// The publication hold is enforced unconditionally by sync-content.mjs.
// This adds the blocklist scan, which needs the private list: set the
// BOUNDARY_BLOCKLIST environment variable in the Vercel project to enable it.

import { writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const blocklist = process.env.BOUNDARY_BLOCKLIST;

if (!blocklist) {
  console.warn(
    'prebuild-guard: BOUNDARY_BLOCKLIST is not set, so the blocklist scan did not run.\n' +
      '                The publication hold still applies. Set BOUNDARY_BLOCKLIST in the\n' +
      '                Vercel project environment variables to enforce the full boundary.',
  );
  process.exit(0);
}

const tmp = path.join(os.tmpdir(), 'boundary-blocklist.txt');
await writeFile(tmp, blocklist);
const res = spawnSync(process.execPath, [path.join(repoDir, 'scripts', 'boundary-scan.mjs')], {
  stdio: 'inherit',
  env: { ...process.env, BLOCKLIST: tmp },
});
await rm(tmp, { force: true });

if (res.status !== 0) {
  console.error('prebuild-guard: boundary scan failed. Refusing to build.');
  process.exit(1);
}
