import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { KnowledgeNav } from '@/components/knowledge/KnowledgeNav';
import { KnowledgeHero } from '@/components/knowledge/KnowledgeHero';
import { ChapterToc } from '@/components/knowledge/ChapterToc';
import styles from '@/components/knowledge/Knowledge.module.css';
import { chapters, readingMinutes, relatedLinks } from '@/lib/knowledge';
import { buildPageMetadata } from '@/lib/seo';
import { Link, routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];
type Point = { title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'knowledge.fundamentals' });
  return buildPageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale,
    path: '/knowledge/fundamentals',
  });
}

export default async function FundamentalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledge' });

  const content = chapters.map((chapter, index) => ({
    ...chapter,
    number: String(index + 1).padStart(2, '0'),
    title: t(`fundamentals.chapters.${chapter.key}.title`),
    lead: t(`fundamentals.chapters.${chapter.key}.lead`),
    body: t.raw(`fundamentals.chapters.${chapter.key}.body`) as string[],
    points: t.raw(`fundamentals.chapters.${chapter.key}.points`) as Point[],
    takeaway: t(`fundamentals.chapters.${chapter.key}.takeaway`),
  }));
  const minutes = readingMinutes(content.flatMap((c) => [c.lead, ...c.body, ...c.points.map((p) => p.text), c.takeaway]));

  return (
    <>
      <Header />
      <main>
        <KnowledgeNav />
        <KnowledgeHero
          eyebrow={t('fundamentals.eyebrow')}
          title={t('fundamentals.title')}
          subtitle={t('fundamentals.subtitle')}
          meta={[t('fundamentals.chapterCount', { count: chapters.length }), t('fundamentals.readingTime', { minutes })]}
        />

        <Section background="base">
          <Container>
            <div className={styles.reader}>
              <ChapterToc
                articleId="chapters"
                items={content.map(({ key, number, title }) => ({ key, number, title }))}
                label={t('fundamentals.tocLabel')}
                progressLabel={t('fundamentals.progressLabel')}
              />
              <article id="chapters" className={styles.chapters}>
                {content.map((chapter) => (
                  <section key={chapter.key} id={chapter.key} className={styles.chapter} aria-labelledby={`${chapter.key}-title`}>
                    <div className={styles.chapterHead}>
                      <span className={styles.chapterNumber} aria-hidden="true">{chapter.number}</span>
                      <h2 id={`${chapter.key}-title`}>{chapter.title}</h2>
                    </div>
                    <p className={styles.chapterLead}>{chapter.lead}</p>
                    <div className={styles.chapterBody}>
                      {chapter.body.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
                    </div>
                    {chapter.points.length > 0 && (
                      <ul className={styles.points} data-count={chapter.points.length}>
                        {chapter.points.map((point) => (
                          <li key={point.title}>
                            <h3>{point.title}</h3>
                            <p>{point.text}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <aside className={styles.takeaway}>
                      <span>{t('fundamentals.takeaway')}</span>
                      <p>{chapter.takeaway}</p>
                    </aside>
                    <div className={styles.chapterFoot}>
                      <div>
                        <span className={styles.footLabel}>{t('fundamentals.termsLabel')}</span>
                        <ul className={styles.chips}>
                          {chapter.terms.map((id) => (
                            <li key={id}>
                              <Link href={`/knowledge/glossary#${id}`} className={styles.chip}>{t(`glossary.terms.${id}.term`)}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className={styles.footLabel}>{t('fundamentals.relatedLabel')}</span>
                        <ul className={styles.relatedList}>
                          {chapter.related.map((key) => (
                            <li key={key}>
                              <Link href={relatedLinks[key]}>{t(`fundamentals.related.${key}`)}<span aria-hidden="true">→</span></Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </Container>
        </Section>

        <PageCTA
          locale={locale as Locale}
          title={t('fundamentals.cta.title')}
          body={t('fundamentals.cta.body')}
          primaryHref="/#contact"
          primaryLabel={t('fundamentals.cta.primary')}
          secondaryHref="/services/workshops"
          secondaryLabel={t('fundamentals.cta.secondary')}
        />
      </main>
      <Footer />
    </>
  );
}
