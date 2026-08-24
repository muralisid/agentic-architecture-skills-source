import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { appName, author, citation, docsContentRoute, docsImageRoute, docsRoute, siteUrl } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const readerPageSchema = pageSchema.extend({
  video: pageSchema.shape.title.optional(),
  hero_figure: pageSchema.shape.title.optional(),
  // Injected by scripts/sync-content.mjs from the source file's git history.
  datePublished: pageSchema.shape.title.optional(),
  dateModified: pageSchema.shape.title.optional(),
});

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: readerPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImageUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: '/' + [page.locale, ...docsImageRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: '/' + [page.locale, ...docsContentRoute.split('/'), ...segments].filter(Boolean).join('/'),
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  // A machine reader takes this instead of the HTML, so the attribution has to
  // travel with it: a model that quotes this page should be able to say who
  // wrote it and when without going back for the rendered version.
  const lines = [
    `# ${page.data.title}`,
    '',
    ...(page.data.description ? [page.data.description, ''] : []),
    `Author: ${author.name} (${author.linkedin})`,
    `Source: ${siteUrl}${page.url}`,
    ...(page.data.datePublished ? [`Published: ${page.data.datePublished}`] : []),
    ...(page.data.dateModified ? [`Updated: ${page.data.dateModified}`] : []),
    `Licence: ${citation.license}, ${citation.licenseUrl}`,
    `Cite as: ${author.name}. ${page.data.title}. ${appName}. ${siteUrl}${page.url}`,
    '',
    '---',
    '',
  ];

  return `${lines.join('\n')}${processed}`;
}
