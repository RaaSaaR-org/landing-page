import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import styles from '@/components/robots/RobotShowroom.module.css';
import { PageCTA } from '@/components/sections/PageCTA';
import { KnowledgeNav } from '@/components/knowledge/KnowledgeNav';
import { RobotRegistry, RobotStat, Designation } from '@/components/robots';
import { robots, pickSpecs } from '@/lib/robots';
import { buildPageMetadata } from '@/lib/seo';
import { Link, routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const featured = robots.find((r) => r.featured) ?? robots[0];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'robots' });
  return buildPageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    locale,
    path: '/knowledge/robots',
  });
}

export default async function RobotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'robots' });
  const heroStats = pickSpecs(featured, featured.heroSpecs);

  return (
    <>
      <Header />
      <main>
        <KnowledgeNav />
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <Container>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className="eyebrow"><span className="status-dot" />{t('hero.eyebrow')}</span>
                <h1 className={styles.title}>
                  {t('hero.title')}<br /><span>{t('hero.titleAccent')}</span>
                </h1>
                <p className={styles.subtitle}>{t('hero.subtitle')}</p>
                <div className={styles.actions}>
                  <a href="#registry" className="button-primary">
                    {t('hero.explore')}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <Link href={`/knowledge/robots/${featured.slug}`} locale={locale as Locale} className={styles.secondaryLink}>
                    {t('hero.featuredCta')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className={styles.heroFeatures}>
                  <span>{t('hero.feature1')}</span><span>{t('hero.feature2')}</span>
                </div>
              </div>
              <div className={styles.showcase}>
                <span className={styles.ghostType} aria-hidden="true">G1</span>
                <div className={styles.backlight} aria-hidden="true" />
                <div className={styles.platform} aria-hidden="true" />
                <div className={styles.ruler} aria-hidden="true" />
                <Image
                  src={featured.poster!}
                  alt={t('visuals.posterAlt', { name: featured.name })}
                  width={840}
                  height={1120}
                  priority
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 65vw, 42vw"
                  className={styles.robotImage}
                />
                <div className={styles.unitLabel}>
                  <span>{t('hero.featured')}</span>
                  <strong>{featured.name}</strong>
                  <Designation robot={featured} />
                </div>
                <span className={styles.scaleLabel} aria-hidden="true">1.32 M</span>
                <Link href={`/knowledge/robots/${featured.slug}`} locale={locale as Locale} className={styles.modelLink}>
                  <span className={styles.modelIcon} aria-hidden="true">↻</span>
                  <span>{t('hero.view3d')}<small>{t('hero.rotate')}</small></span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            <div className={styles.heroBottom}>
              <div className={styles.featuredName}><span>{t('hero.featuredSpecs')}</span><strong>{featured.name}</strong></div>
              {heroStats.map((spec) => (
                <RobotStat key={spec.id} size="md" label={t(`specLabels.${spec.id}`)} value={spec.value} unit={spec.unit} />
              ))}
              <a href="#registry" className={styles.scrollLink}>{t('hero.scroll')} <span aria-hidden="true">↓</span></a>
            </div>
          </Container>
        </section>

        <Section background="base" id="registry">
          <Container>
            <div className={styles.registryIntro}>
              <div>
                <span className="eyebrow">{t('registry.eyebrow')}</span>
                <h2>{t('registry.title')}</h2>
              </div>
              <p>{t('intro')}</p>
            </div>
            <RobotRegistry robots={robots} />
            <div className={styles.discoveryNote}>
              <span aria-hidden="true">↗</span>
              <p>{t('registry.note')}</p>
              <Link href="/services/testing" locale={locale as Locale}>{t('registry.testing')} <span aria-hidden="true">→</span></Link>
            </div>
          </Container>
        </Section>

        <PageCTA
          locale={locale as Locale}
          title={t('cta.title')}
          body={t('cta.body')}
          primaryHref="/#contact"
          primaryLabel={t('cta.primary')}
          secondaryHref="/services/consulting"
          secondaryLabel={t('cta.secondary')}
        />
      </main>
      <Footer />
    </>
  );
}
