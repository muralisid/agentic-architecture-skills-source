/**
 * Structured data for search engines and for models that cite sources.
 *
 * Two jobs. The first is attribution: one `Person` node, referenced by every
 * page through a stable `@id`, so a crawler resolves twenty-odd bylines to one
 * author rather than twenty strings that happen to match. The second is
 * citation: a model asked where a claim came from should find a headline, an
 * author, a date and a licence on the page itself, without inferring any of it.
 *
 * Emitted as JSON-LD. Nothing here is rendered, so it never drifts from what a
 * reader sees only if the values come from the same place the pages use, which
 * is why everything is derived from lib/shared rather than written out again.
 */

import { appName, appDescription, author, citation, siteUrl } from './shared';

/** Stable identifiers, so every page points at the same author and the same site. */
export const personId = `${siteUrl}/about#author`;
export const siteId = `${siteUrl}#website`;
export const publisherId = `${siteUrl}#publisher`;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: author.name,
    alternateName: author.legalName,
    jobTitle: author.jobTitle,
    url: `${siteUrl}${author.page}`,
    mainEntityOfPage: `${siteUrl}${author.page}`,
    sameAs: author.sameAs,
    knowsAbout: author.knowsAbout,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': siteId,
    url: siteUrl,
    name: appName,
    description: appDescription,
    inLanguage: 'en',
    author: { '@id': personId },
    creator: { '@id': personId },
    publisher: { '@id': publisherId },
    license: citation.licenseUrl,
  };
}

/** The publisher is the site, authored by one person; naming both keeps citations unambiguous. */
export function publisherSchema() {
  return {
    '@type': 'Organization',
    '@id': publisherId,
    name: appName,
    url: siteUrl,
    founder: { '@id': personId },
    sameAs: [author.github],
  };
}

/** The graph every page carries: who wrote this site, and what the site is. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(), publisherSchema(), websiteSchema()],
  };
}

export interface ArticleSchemaInput {
  title: string;
  description?: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
}

/**
 * One article node per page. `TechArticle` rather than `Article`: these are
 * reference pages for practitioners, and the type is a hint to anything
 * deciding whether a page answers a technical question.
 */
export function articleSchema({ title, description, path, datePublished, dateModified, section }: ArticleSchemaInput) {
  const url = `${siteUrl}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: title,
        name: title,
        ...(description ? { description, abstract: description } : {}),
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@id': personId },
        creator: { '@id': personId },
        publisher: { '@id': publisherId },
        isPartOf: { '@id': siteId },
        inLanguage: 'en',
        license: citation.licenseUrl,
        ...(section ? { articleSection: section } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        // The Markdown twin, so a machine reader can take the clean text.
        encoding: {
          '@type': 'MediaObject',
          contentUrl: `${url}.md`,
          encodingFormat: 'text/markdown',
        },
      },
      personSchema(),
    ],
  };
}

/** Serialises a schema for a script tag, with the characters that break inline JSON escaped. */
export function jsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
