import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://emai.dev').replace(/\/+$/, '');

type ShareImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function getShareImage(locale: string): ShareImage {
  const language = locale === 'en' ? 'en' : 'de';
  return {
    url: `${SITE_URL}/og/emai-share-${language}-v3.png`,
    width: 1200,
    height: 630,
    alt: language === 'de'
      ? 'EmAI – Intelligenz. Unter Ihrer Kontrolle.'
      : 'EmAI – Intelligence. Under your control.',
  };
}

/** Complete social metadata per route: Next replaces nested metadata rather than merging it. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image,
  article,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: ShareImage;
  article?: { publishedTime: string; modifiedTime?: string };
}): Metadata {
  const shareImage = image
    ? { ...image, url: new URL(image.url, `${SITE_URL}/`).href }
    : getShareImage(locale);
  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      ...(article ? { type: 'article' as const, ...article } : { type: 'website' as const }),
      title,
      description,
      url: `${SITE_URL}/${locale}${normalize(path)}`,
      siteName: 'EmAI',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? 'en_US' : 'de_DE',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage],
      creator: '@emai_robotics',
    },
  };
}

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
