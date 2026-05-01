import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { PageCTA } from '@/components/sections/PageCTA';
import { Link } from '@/i18n/routing';
import { getAllPosts, type NewsLocale } from '@/lib/news';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: buildAlternates('/news', locale),
  };
}

export default async function NewsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as NewsLocale)) {
    return null;
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const posts = getAllPosts(locale as NewsLocale);

  const dateLocale = locale === 'de' ? 'de-DE' : 'en-US';
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <Section background="base">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">
              {posts.length === 0 && (
                <p className="text-center text-text-muted text-lg py-12">{t('empty')}</p>
              )}
              {posts.map((post) => {
                const date = new Date(post.date);
                return (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    locale={locale as NewsLocale}
                    className="block group"
                  >
                    <GlowCard className="!p-8" hoverEffect={false}>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-3 font-mono uppercase tracking-wider">
                        <time dateTime={date.toISOString()}>{dateFormatter.format(date)}</time>
                        {post.author && (
                          <>
                            <span className="text-primary-500">·</span>
                            <span>
                              {t('by')} {post.author}
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
                      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 group-hover:text-primary-300 transition-colors">
                        {t('readMore')}
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </GlowCard>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>

        <PageCTA
          locale={locale as NewsLocale}
          title={t('cta.title')}
          body={t('cta.body')}
          primaryHref="/#contact"
          primaryLabel={t('cta.primary')}
          secondaryHref="/#services"
          secondaryLabel={t('cta.secondary')}
        />
      </main>
      <Footer />
    </>
  );
}
