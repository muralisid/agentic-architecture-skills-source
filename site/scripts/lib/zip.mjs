/**
 * A deterministic ZIP writer, in the standard library only.
 *
 * The skill bundles are addressed by a sha256 digest published in the
 * discovery index, so the same inputs must always produce the same bytes.
 * Every general-purpose zip tool defeats that: they stamp the current time,
 * the creating platform, and sometimes the file order. Here the entries are
 * sorted by path, the timestamp is fixed, the external attributes are fixed,
 * and the compression level is pinned, so a digest changes only when the
 * content changes.
 *
 * Only the parts of the format the bundles need are implemented: deflate or
 * store per entry, no zip64, no encryption, no directory entries (a zip needs
 * none: the path separators carry the structure).
 */

import { crc32, deflateRawSync } from 'node:zlib';

/** 2026-01-01T00:00:00Z as an MS-DOS date and time pair. Fixed, never "now". */
const DOS_TIME = 0;
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

/** Regular file, rw-r--r--, in the high 16 bits where Unix permissions live. */
const EXTERNAL_ATTRIBUTES = (0o100644 << 16) >>> 0;

const LOCAL_HEADER = 0x04034b50;
const CENTRAL_HEADER = 0x02014b50;
const END_OF_CENTRAL_DIRECTORY = 0x06054b50;

/** Store when deflate does not pay, which keeps tiny files byte-predictable. */
function compress(contents) {
  const deflated = deflateRawSync(contents, { level: 9 });
  if (deflated.length < contents.length) return { method: 8, body: deflated };
  return { method: 0, body: contents };
}

/**
 * @param {Array<{ path: string, contents: Buffer | string }>} entries
 * @returns {Buffer} the complete archive
 */
export function createZip(entries) {
  const prepared = entries
    .map((entry) => ({
      path: entry.path,
      contents: Buffer.isBuffer(entry.contents) ? entry.contents : Buffer.from(entry.contents, 'utf8'),
    }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  const seen = new Set();
  for (const entry of prepared) {
    if (seen.has(entry.path)) throw new Error(`Duplicate path in archive: ${entry.path}`);
    seen.add(entry.path);
    if (entry.path.startsWith('/') || entry.path.includes('..')) {
      throw new Error(`Unsafe path in archive: ${entry.path}`);
    }
  }

  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const entry of prepared) {
    const name = Buffer.from(entry.path, 'utf8');
    const { method, body } = compress(entry.contents);
    const checksum = crc32(entry.contents);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(LOCAL_HEADER, 0);
    local.writeUInt16LE(20, 4); // version needed: 2.0, deflate
    local.writeUInt16LE(0, 6); // flags: none, so no data descriptor
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(entry.contents.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28); // no extra field: that is where timestamps hide
    locals.push(local, name, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(CENTRAL_HEADER, 0);
    central.writeUInt16LE(0x031e, 4); // made by: Unix, spec 3.0
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(entry.contents.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30); // extra length
    central.writeUInt16LE(0, 32); // comment length
    central.writeUInt16LE(0, 34); // disk number
    central.writeUInt16LE(0, 36); // internal attributes
    central.writeUInt32LE(EXTERNAL_ATTRIBUTES, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += local.length + name.length + body.length;
  }

  const centralDirectory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(END_OF_CENTRAL_DIRECTORY, 0);
  end.writeUInt16LE(0, 4); // this disk
  end.writeUInt16LE(0, 6); // disk with the central directory
  end.writeUInt16LE(prepared.length, 8);
  end.writeUInt16LE(prepared.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20); // no archive comment

  return Buffer.concat([...locals, centralDirectory, end]);
}
