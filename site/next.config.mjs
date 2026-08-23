import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { legacyHosts, siteUrl } from './lib/site.config.mjs';

const withMDX = createMDX();
const siteRoot = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: siteRoot,
  },
  async headers() {
    return [
      {
        // Agents fetch the discovery index cross-origin, so it has to be readable
        // from any origin, and cached briefly rather than pinned.
        source: '/.well-known/agent-skills/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD, OPTIONS' },
          { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/.well-known/skills/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD, OPTIONS' },
          { key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Installers written against the 0.1.0 draft probe /.well-known/skills.
      // Serve the same files there rather than redirecting, because some clients
      // do not follow a redirect on a discovery probe.
      { source: '/.well-known/skills/:path*', destination: '/.well-known/agent-skills/:path*' },
    ];
  },
  async redirects() {
    return [
      // The site moved to its own domain. Everything on the old deployment host
      // keeps working and lands on the same path at the new one.
      ...legacyHosts.map((host) => ({
        source: '/:path*',
        has: [{ type: 'host', value: host }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      })),
      // The first-day site lived under /docs; the corpus mirror now lives under /library.
      { source: '/docs/:path*', destination: '/library/:path*', permanent: false },
      // A person who opens the discovery directory wants the catalogue.
      { source: '/.well-known/agent-skills', destination: '/skills', permanent: false },
      { source: '/.well-known/skills', destination: '/skills', permanent: false },
      // The interactive worksheets were removed by design decision.
      { source: '/tools/:path*', destination: '/', permanent: false },
      // The playbook-era product surface was replaced by the technical
      // architecture surface; the underlying studies live in the library.
      { source: '/answers/the-target-architecture', destination: '/architecture', permanent: false },
      { source: '/answers/what-an-agent-must-never-decide', destination: '/architecture/deterministic-zones', permanent: false },
      { source: '/answers/the-maturity-ladder', destination: '/architecture/autonomy-contract', permanent: false },
      { source: '/answers/how-many-agents-can-one-person-supervise', destination: '/layers/r13-operating-model', permanent: false },
      { source: '/answers/who-pays-for-the-loop', destination: '/layers/r12-observability-and-finops', permanent: false },
      { source: '/answers/which-use-cases-first', destination: '/library/frameworks/use-case-portfolio', permanent: false },
      { source: '/answers', destination: '/architecture', permanent: false },
      { source: '/industries/:slug', destination: '/library/blueprints/verticals/:slug', permanent: false },
      { source: '/industries', destination: '/library/blueprints', permanent: false },
      { source: '/departments/:slug', destination: '/library/blueprints/departments/:slug', permanent: false },
      { source: '/departments', destination: '/library/blueprints', permanent: false },
      // Vendor research and the methodology instruments were archived (D038).
      // The wall chart on the architecture page carries product orientation now,
      // and the decision catalog carries the evaluation questions that mattered.
      { source: '/vendors/the-30-vendor-questions', destination: '/decisions', permanent: false },
      { source: '/vendors/:path*', destination: '/architecture', permanent: false },
      { source: '/vendors', destination: '/architecture', permanent: false },
      { source: '/library/vendors/:path*', destination: '/architecture', permanent: false },
      { source: '/library/vendors', destination: '/architecture', permanent: false },
      { source: '/library/frameworks/roadmap-checklist', destination: '/architecture/autonomy-contract', permanent: false },
      { source: '/library/frameworks/vendor-question-bank', destination: '/decisions', permanent: false },
      { source: '/library/frameworks/vendor-scorecard', destination: '/decisions', permanent: false },
      { source: '/library/layers/:track/brief', destination: '/library/layers/:track', permanent: false },
      { source: '/library/layers/:track/vendors', destination: '/layers/:track', permanent: false },
    ];
  },
};

export default withMDX(config);
