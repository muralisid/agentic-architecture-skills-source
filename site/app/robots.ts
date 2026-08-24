import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';

/**
 * Everything is open to everyone, including AI crawlers.
 *
 * The blanket rule already permits them; naming them is a statement of intent
 * rather than a mechanism, and it means a change of mind later is a visible
 * edit rather than a silent one. `/.well-known/` is never disallowed: that is
 * where agents discover the published skills.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'Meta-ExternalAgent',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
