import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { Link, routing } from '@/i18n/routing';
import { getAllSlugs, getAllPosts, getPost, type NewsLocale } from '@/lib/news';
import { buildAlternates, SITE_URL } from '@/lib/seo';
import { articleJsonLd, breadcrumbJsonLd, jsonLdScript } from '@/lib/jsonld';
import { NewsStoryVisual } from '@/components/visuals/NewsStoryVisual';
import styles from '@/components/layout/NewsArticle.module.css';

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
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: `${SITE_URL}/${locale}/news/${slug}`,
      siteName: 'EmAI',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      publishedTime: post.date,
      ...(post.updatedDate ? { modifiedTime: post.updatedDate } : {}),
      images: [{ url: `${SITE_URL}${post.image?.src || '/og-image.png'}`, alt: post.image?.alt || 'EmAI - Embodied AI' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [{ url: `${SITE_URL}${post.image?.src || '/og-image.png'}`, alt: post.image?.alt || 'EmAI - Embodied AI' }],
    },
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
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const dateFormatted = dateFormatter.format(date);
  const relatedPosts = getAllPosts(locale as NewsLocale).filter((entry) => entry.slug !== slug).slice(0, 2);

  const url = `${SITE_URL}/${locale}/news/${slug}`;
  const newsIndexUrl = `${SITE_URL}/${locale}/news`;
  const homeUrl = `${SITE_URL}/${locale}`;
  const jsonLd = [
    articleJsonLd({
      url,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      datePublished: post.date,
      dateModified: post.updatedDate,
      image: post.image ? `${SITE_URL}${post.image.src}` : undefined,
      inLanguage: locale,
      author: post.author,
    }),
    breadcrumbJsonLd([
      { name: 'EmAI', url: homeUrl },
      { name: tNews('title'), url: newsIndexUrl },
      { name: post.title, url },
    ]),
  ];

  const contentsLinks = (
    <ol>
      {post.headings.map((heading, index) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{heading.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <Header />
      <main>
        <article>
          <Section background="surface" className={styles.hero}>
            <Container>
              <Link href="/news" locale={locale as NewsLocale} className={styles.back}>
                <span aria-hidden="true">←</span>{tNews('backToList')}
              </Link>
              <div className={styles.kicker}>
                <span className={styles.kickerLabel}>{tNews('articleLabel')}</span>
                <time dateTime={post.date}>{dateFormatted}</time>
                <span>{tNews('readingTime', { minutes: post.readingMinutes })}</span>
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.intro}>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.meta}>
                  {post.author && <span>{tNews('by')} {post.author}</span>}
                  {post.updatedDate && (
                    <span>{tNews('updated')} <time dateTime={post.updatedDate}>{dateFormatter.format(new Date(post.updatedDate))}</time></span>
                  )}
                  {post.tags && <div className={styles.tags}>{post.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}</div>}
                </div>
              </div>
              {post.image ? (
                <figure className={styles.feature}>
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={819}
                    height={1024}
                    sizes="(max-width: 767px) 100vw, 1200px"
                    priority
                    className={styles.heroImage}
                  />
                  <figcaption className={styles.photoCaption}>
                    <span>{post.image.alt}</span>
                    <a href={post.image.creditUrl}>{tNews('photoCredit')}: {post.image.credit}<span aria-hidden="true"> ↗</span></a>
                  </figcaption>
                </figure>
              ) : (
                <div className={styles.feature}><NewsStoryVisual variant="launch" /></div>
              )}
            </Container>
          </Section>

          <Section background="base" className={styles.bodySection}>
            <Container>
              <div className={styles.readingLayout}>
                <aside className={`${styles.contents} ${styles.desktopContents}`}>
                  {post.headings.length > 0 && (
                    <nav aria-label={tNews('contents')}>
                      <h2 className={styles.contentsTitle}>{tNews('contents')}</h2>
                      {contentsLinks}
                    </nav>
                  )}
                </aside>
                <div>
                  {post.headings.length > 0 && (
                    <details className={`${styles.contents} ${styles.mobileContents}`}>
                      <summary>{tNews('contents')}</summary>
                      <nav aria-label={tNews('contents')}>{contentsLinks}</nav>
                    </details>
                  )}
                  <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
              </div>
            </Container>
          </Section>
        </article>

        {relatedPosts.length > 0 && (
          <Section background="surface">
            <Container>
              <div className={styles.relatedHeader}>
                <h2>{tNews('related')}</h2>
                <Link href="/news" locale={locale as NewsLocale}>{tNews('backToList')} <span aria-hidden="true">↗</span></Link>
              </div>
              <div className={styles.relatedList}>
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/news/${related.slug}`} locale={locale as NewsLocale} className={styles.related}>
                    <time dateTime={related.date}>{dateFormatter.format(new Date(related.date))}</time>
                    <div><h3>{related.title}</h3><p>{related.excerpt}</p></div>
                    <span className={styles.relatedArrow} aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
