import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();
const siteRoot = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  turbopack: {
    root: siteRoot,
  },
  async redirects() {
    return [
      // The first-day site lived under /docs; the corpus mirror now lives under /library.
      { source: '/docs/:path*', destination: '/library/:path*', permanent: false },
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
      { source: '/vendors/the-30-vendor-questions', destination: '/library/frameworks/vendor-question-bank', permanent: false },
      { source: '/vendors', destination: '/library/vendors', permanent: false },
    ];
  },
};

export default withMDX(config);
