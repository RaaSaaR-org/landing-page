import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { Link, routing } from '@/i18n/routing';
import { getAllSlugs, getPost, type NewsLocale } from '@/lib/news';
import { buildAlternates, SITE_URL } from '@/lib/seo';
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld';

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as NewsLocale)) return {};
  if (!getAllSlugs().includes(slug)) return {};
  const post = getPost(slug, locale as NewsLocale);
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    alternates: buildAlternates(`/news/${slug}`, locale),
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as NewsLocale)) notFound();
  if (!getAllSlugs().includes(slug)) notFound();

  setRequestLocale(locale);
  const tNews = await getTranslations({ locale, namespace: 'news' });
  const post = getPost(slug, locale as NewsLocale);

  const dateLocale = locale === 'de' ? 'de-DE' : 'en-US';
  const date = new Date(post.date);
  const dateFormatted = new Intl.DateTimeFormat(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const url = `${SITE_URL}/${locale}/news/${slug}`;
  const newsIndexUrl = `${SITE_URL}/${locale}/news`;
  const homeUrl = `${SITE_URL}/${locale}`;
  const jsonLd = [
    articleJsonLd({
      url,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      datePublished: post.date,
      inLanguage: locale,
      author: post.author,
    }),
    breadcrumbJsonLd([
      { name: 'EmAI', url: homeUrl },
      { name: tNews('title'), url: newsIndexUrl },
      { name: post.title, url },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Header />
      <main>
        <article>
          {/* Header */}
          <Section background="surface">
            <Container>
              <div className="max-w-3xl mx-auto">
                <Link
                  href="/news"
                  locale={locale as NewsLocale}
                  className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-400 transition-colors mb-6"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {tNews('backToList')}
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4 font-mono uppercase tracking-wider">
                  <time dateTime={date.toISOString()}>{dateFormatted}</time>
                  {post.author && (
                    <>
                      <span className="text-primary-500">·</span>
                      <span>
                        {tNews('by')} {post.author}
                      </span>
                    </>
                  )}
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
                  {post.title}
                </h1>
                <div className="w-24 h-1 bg-primary-500 rounded-full mb-6" />
                <p className="text-xl text-text-secondary leading-relaxed">{post.excerpt}</p>
              </div>
            </Container>
          </Section>

          {/* Body */}
          <Section background="base">
            <Container>
              <div
                className="prose-news max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </Container>
          </Section>

          {/* Footer link */}
          <Section background="surface-elevated">
            <Container>
              <div className="max-w-3xl mx-auto text-center">
                <Link
                  href="/news"
                  locale={locale as NewsLocale}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {tNews('backToList')}
                </Link>
              </div>
            </Container>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}
