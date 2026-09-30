import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { KnowledgeNav } from '@/components/knowledge/KnowledgeNav';
import { KnowledgeHero } from '@/components/knowledge/KnowledgeHero';
import { KnowledgeGraph, AreaDiagram } from '@/components/knowledge/KnowledgeVisuals';
import styles from '@/components/knowledge/Knowledge.module.css';
import { chapterNumber, chapters, startQuestions } from '@/lib/knowledge';
import { twoDigit } from '@/lib/format';
import { robots } from '@/lib/robots';
import { buildPageMetadata } from '@/lib/seo';
import { Link, routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const areaKeys = ['fundamentals', 'robots', 'glossary'] as const;
const principleKeys = ['tested', 'neutral', 'open'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'knowledge.hub' });
  return buildPageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale,
    path: '/knowledge',
  });
}

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledge' });

  const counts = {
    fundamentals: chapters.length,
    robots: robots.length,
    glossary: Object.keys(t.raw('glossary.terms') as Record<string, unknown>).length,
  };

  return (
    <>
      <Header />
      <main>
        <KnowledgeNav />
        <KnowledgeHero
          eyebrow={t('hub.eyebrow')}
          title={t('hub.title')}
          titleAccent={t('hub.titleAccent')}
          subtitle={t('hub.subtitle')}
          actions={<>
            <Link href="/knowledge/fundamentals" className="button-primary">{t('hub.cta')}<span aria-hidden="true">↗</span></Link>
            <Link href="/knowledge/glossary" className="button-secondary">{t('hub.ctaSecondary')}<span aria-hidden="true">→</span></Link>
          </>}
          art={<KnowledgeGraph
            aria={t('hub.art.aria')}
            labels={{ fundamentals: t('nav.fundamentals'), robots: t('nav.robots'), glossary: t('nav.glossary') }}
          />}
        />

        <Section background="base">
          <Container>
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow"><span className="eyebrow-line" />{t('hub.areasEyebrow')}</p>
                <h2>{t('hub.areasTitle')}</h2>
              </div>
            </div>
            <div className={styles.areas}>
              {areaKeys.map((key, index) => (
                <Link key={key} href={`/knowledge/${key}`} className={`${styles.area} ${key === 'robots' ? styles.areaTeal : ''}`}>
                  <div className={styles.areaTop}>
                    <span>{twoDigit(index + 1)} /</span>
                    <span className={styles.areaStat}>{t(`hub.areas.${key}.stat`, { count: counts[key] })}</span>
                  </div>
                  <AreaDiagram variant={key} />
                  <h3>{t(`hub.areas.${key}.title`)}</h3>
                  <p>{t(`hub.areas.${key}.description`)}</p>
                  <span className={styles.areaLink}>{t(`hub.areas.${key}.cta`)}<span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        <Section background="surface">
          <Container>
            <div className={styles.questions}>
              <div className={styles.questionsIntro}>
                <p className="eyebrow"><span className="eyebrow-line" />{t('hub.questions.eyebrow')}</p>
                <h2>{t('hub.questions.title')}</h2>
                <p>{t('hub.questions.subtitle')}</p>
              </div>
              <ul className={styles.questionList}>
                {startQuestions.map((key) => (
                  <li key={key}>
                    <Link href={`/knowledge/fundamentals#${key}`} className={styles.questionLink}>
                      <span>{t(`hub.questions.items.${key}`)}</span>
                      <span className={styles.questionChapter}>{t('hub.questions.chapterLabel', { number: chapterNumber(key) })}</span>
                      <span className={styles.questionArrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.principles}>
              <h2>{t('hub.principles.title')}</h2>
              {principleKeys.map((key) => (
                <div key={key} className={styles.principle}>
                  <h3>{t(`hub.principles.items.${key}.title`)}</h3>
                  <p>{t(`hub.principles.items.${key}.text`)}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <PageCTA
          locale={locale as Locale}
          title={t('hub.cta2.title')}
          body={t('hub.cta2.body')}
          primaryHref="/#contact"
          primaryLabel={t('hub.cta2.primary')}
          secondaryHref="/services/workshops"
          secondaryLabel={t('hub.cta2.secondary')}
        />
      </main>
      <Footer />
    </>
  );
}
