import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllSlugs } from '@/lib/news';

export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://emai.de';

const staticRoutes = [
  '',
  '/services/consulting',
  '/services/testing',
  '/services/workshops',
  '/services/data',
  '/about',
  '/use-cases',
  '/news',
  '/impressum',
  '/datenschutz',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const newsSlugs = getAllSlugs();

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
      });
    }
    for (const slug of newsSlugs) {
      entries.push({
        url: `${BASE}/${locale}/news/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
