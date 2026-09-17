/** Reader-facing regression checks after npm run sync. Optional origin exercises HTTP routes. */
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read=(p)=>readFile(path.join(root,p),'utf8');
const sections=JSON.parse(await read('content-map.json'));
assert.deepEqual(sections.map(s=>s.id),['use-cases','architecture','ladder','memory','research','skills']);
const layers=JSON.parse(await read('lib/architecture-map.json'));
assert.equal(layers.length,14);assert.equal(new Set(layers.map(l=>l.url)).size,14);
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else if(/\.mdx?$/.test(p))out.push(p);}return out;}
const docs=await walk(path.join(root,'content/docs'));
const routes=new Set(docs.map(p=>'/'+path.relative(path.join(root,'content/docs'),p).replace(/\.mdx?$/,'').replace(/(^|\/)index$/,'')));
for(const s of sections)assert(routes.has(s.url),`Missing section ${s.url}`);
for(const l of layers)assert(routes.has(l.url),`Missing layer ${l.url}`);
const oldRoutes=JSON.parse(await read('reader-compatibility.json'));
for(const url of oldRoutes)assert(routes.has(url),`Lost original page ${url}`);
let diagrams=0;
for(const p of docs){const text=await readFile(p,'utf8');
 assert(!/\bDeck [AB]\b|\brungs?\b/i.test(text),`Old reader terminology in ${p}`);
 assert(!/github\.com\/muralisid\/(agentic-architecture-skills-source|multicard-bench|agent-memory-research)/.test(text),`Internal evidence link in ${p}`);
 if(p.includes('/memory/'))assert(!/<Slide(?:\s|Journey)/.test(text),`Slide run in ${p}`);
 for(const m of text.matchAll(/(?:src|mobileSrc)="(\/figures\/[^"?]+)"/g)){await access(path.join(root,'public',m[1]));diagrams++;}
}
const decisions=await read('content/docs/decisions/index.mdx');
for(let n=1;n<=25;n++)assert(new RegExp('CD-'+String(n)+'\\b').test(decisions),`Lost decision ${n}`);
const origin=process.env.READER_TEST_ORIGIN;
if(origin){
 for(const route of [...sections.map(s=>s.url),'/memory/time-series','/architecture/system-view','/research/industrial-examples','/.well-known/agent-skills/index.json']){
  const response=await fetch(origin+route,{redirect:'manual'});assert.equal(response.status,200,`${route} status`);
 }
 for(const [from,to] of [['/research/aspect-dilution','/patterns/aspect-dilution'],['/research/reading-list','/patterns/reading-list']]){
  const response=await fetch(origin+from,{redirect:'manual'});assert([307,308].includes(response.status));assert.equal(new URL(response.headers.get('location'),origin).pathname,to);
 }
}
console.log(`Reader checks passed: ${routes.size} pages, ${oldRoutes.length} retained product routes, 14 layers, 25 decisions, ${diagrams} diagram references, and 6 entrances${origin ? ', with HTTP checks' : ''}.`);
