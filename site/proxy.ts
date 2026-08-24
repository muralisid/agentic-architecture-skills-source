import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

/**
 * Serves the Markdown twin of any page, so a model can take clean text.
 *
 * Two ways in: append `.md` to a URL, or send `Accept: text/markdown`. Both
 * rewrite to the generated Markdown route, which carries the author, the dates
 * and the licence alongside the content.
 *
 * `docsRoute` is `/` here, because the docs are mounted at the site root. The
 * path pattern already begins each segment with a slash, so prefixing it with
 * `docsRoute` would ask for two, and the rewrite would silently match nothing:
 * the base is therefore empty at the root and the route itself anywhere else.
 */
const base = docsRoute === '/' ? '' : docsRoute;

const { rewrite: rewriteDocs } = rewritePath(`${base}{/*path}`, `${docsContentRoute}{/*path}/content.md`);
const { rewrite: rewriteSuffix } = rewritePath(`${base}{/*path}.md`, `${docsContentRoute}{/*path}/content.md`);

/** Paths served as files or by their own route handler, which must pass through untouched. */
function isReserved(pathname: string) {
  return (
    pathname.startsWith('/.well-known/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/llms.mdx/') ||
    pathname.startsWith('/figures/') ||
    pathname.startsWith('/diagrams/') ||
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isReserved(pathname)) return NextResponse.next();

  const suffixed = rewriteSuffix(pathname);
  if (suffixed) {
    return NextResponse.rewrite(new URL(suffixed, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const negotiated = rewriteDocs(pathname);

    if (negotiated) {
      return NextResponse.rewrite(new URL(negotiated, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}
