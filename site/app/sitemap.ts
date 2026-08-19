import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://agentic-enterprise.vercel.app';

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    ...source.getPages().map((page) => ({
      url: `${siteUrl}${page.url}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
