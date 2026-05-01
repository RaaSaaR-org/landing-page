import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://emai.de';

/**
 * Build per-page hreflang alternates for next-intl static export.
 * Pass an unprefixed path like "/about" or "/news/hello-world" — we attach
 * each locale prefix and emit the full canonical + languages map.
 */
export function buildAlternates(pathWithoutLocale: string, currentLocale: string): NonNullable<Metadata['alternates']> {
  const path = normalize(pathWithoutLocale);
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  // x-default points to the default locale (de)
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${path}`;
  return {
    canonical: `${SITE_URL}/${currentLocale}${path}`,
    languages,
  };
}

function normalize(p: string): string {
  if (!p || p === '/') return '';
  return p.startsWith('/') ? p : `/${p}`;
}
