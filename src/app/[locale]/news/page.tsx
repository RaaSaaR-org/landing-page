import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Container } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { NewsStoryVisual } from '@/components/visuals/NewsStoryVisual';
import { Link, routing } from '@/i18n/routing';
import { getAllPosts, type NewsLocale } from '@/lib/news';
import { buildPageMetadata } from '@/lib/seo';
import styles from './NewsIndex.module.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  return buildPageMetadata({ locale, path: '/news', title: t('title'), description: t('metaDescription') });
}

export default async function NewsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as NewsLocale)) return null;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'news' });
  const [featured, ...otherPosts] = getAllPosts(locale as NewsLocale);
  const dateFormatter = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

  return (
    <>
      <Header />
      <main>
        <section className={styles.masthead}>
          <Container>
            <div className={styles.topline}><span>EmAI / {t('eyebrow')}</span><span>{t('index.masthead')}</span></div>
            <div className={styles.intro}>
              <h1 className={styles.title}>{t('index.title')}{' '}<br /><span>{t('index.titleAccent')}</span></h1>
              <div className={styles.introCopy}>
                <p>{t('index.description')}</p>
                <a href="#latest" className={styles.jump}>{t('index.explore')}<span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.stories} id="latest" aria-label={t('index.latest')}>
          <Container>
            {featured ? (
              <>
                <p className={styles.sectionLabel}>{t('index.latest')}<span aria-hidden="true" /></p>
                <article>
                  <Link href={`/news/${featured.slug}`} locale={locale as NewsLocale} className={styles.featured}>
                    <div className={styles.featuredCopy}>
                      <div className={styles.meta}>
                        <time dateTime={featured.date}>{dateFormatter.format(new Date(featured.date))}</time>
                        <span>{t('readingTime', { minutes: featured.readingMinutes })}</span>
                      </div>
                      <div className={styles.tags}>{featured.tags?.map(tag => <span className={styles.tag} key={tag}>{tag}</span>)}</div>
                      <h2>{featured.title}</h2>
                      <p>{featured.excerpt}</p>
                      <span className={styles.readLink}>{t('readMore')}<span aria-hidden="true">↗</span></span>
                    </div>
                    <div className={styles.featuredVisual}>
                      {featured.image ? (
                        <Image src={featured.image.src} alt={featured.image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority className={styles.featuredImage} />
                      ) : <NewsStoryVisual variant="launch" />}
                    </div>
                  </Link>
                  {featured.image && <p className={styles.photoCredit}>{t('photoCredit')}: <a href={featured.image.creditUrl} target="_blank" rel="noopener noreferrer">{featured.image.credit}<span aria-hidden="true"> ↗</span></a></p>}
                </article>

                {otherPosts.length > 0 && <div className={styles.archive}>
                  <p className={styles.sectionLabel}>{t('index.more')}</p>
                  {otherPosts.map(post => (
                    <article key={post.slug}>
                      <Link href={`/news/${post.slug}`} locale={locale as NewsLocale} className={styles.story}>
                        <div className={styles.storyVisual}>
                          {post.image ? <Image src={post.image.src} alt={post.image.alt} width={480} height={440} className={styles.storyImage} /> : <NewsStoryVisual variant="launch" />}
                        </div>
                        <div className={styles.storyCopy}>
                          <div className={styles.meta}><time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time><span>{t('readingTime', { minutes: post.readingMinutes })}</span></div>
                          <h2>{post.title}</h2>
                          <p>{post.excerpt}</p>
                          <span>{t('readMore')}</span>
                        </div>
                        <span className={styles.readLink} aria-hidden="true"><span>↗</span></span>
                      </Link>
                      {post.image && <p className={styles.photoCredit}>{t('photoCredit')}: <a href={post.image.creditUrl} target="_blank" rel="noopener noreferrer">{post.image.credit}<span aria-hidden="true"> ↗</span></a></p>}
                    </article>
                  ))}
                </div>}
              </>
            ) : <p className={styles.empty}>{t('empty')}</p>}
          </Container>
        </section>

        <PageCTA locale={locale as NewsLocale} title={t('cta.title')} body={t('cta.body')} primaryHref="/#contact" primaryLabel={t('cta.primary')} secondaryHref="/#services" secondaryLabel={t('cta.secondary')} />
      </main>
      <Footer />
    </>
  );
}
