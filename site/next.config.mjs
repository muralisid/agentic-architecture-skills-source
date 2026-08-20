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
    ];
  },
};

export default withMDX(config);
