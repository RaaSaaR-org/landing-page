import { SITE_URL } from './seo';

type JsonLd = Record<string, unknown>;

export function articleJsonLd(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  inLanguage: string;
  author?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    inLanguage: opts.inLanguage,
    author: { '@type': 'Organization', name: opts.author || 'EmAI' },
    publisher: {
      '@type': 'Organization',
      name: 'EmAI',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/**
 * Render JSON-LD as a script tag string. Use with dangerouslySetInnerHTML.
 */
export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data);
}

/**
 * Standard 3-level breadcrumb for service detail pages:
 * EmAI > Services overview (home #services) > {Service title}
 */
export function serviceBreadcrumb(opts: {
  locale: string;
  servicesLabel: string;
  serviceTitle: string;
  servicePath: string; // e.g. "/services/consulting"
}): JsonLd {
  return breadcrumbJsonLd([
    { name: 'EmAI', url: `${SITE_URL}/${opts.locale}` },
    { name: opts.servicesLabel, url: `${SITE_URL}/${opts.locale}/#services` },
    { name: opts.serviceTitle, url: `${SITE_URL}/${opts.locale}${opts.servicePath}` },
  ]);
}
