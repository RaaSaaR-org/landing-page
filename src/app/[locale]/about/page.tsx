import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { PageCTA } from '@/components/sections/PageCTA';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import styles from '@/components/layout/EditorialPages.module.css';

type Locale = (typeof routing.locales)[number];

const valueKeys = ['openSource', 'sovereignty', 'learning', 'humanFirst'] as const;
const valueIcons = [
  'M8 5L2 12l6 7M16 5l6 7-6 7M14 3l-4 18',
  'M12 2l9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4ZM8 12l3 3 5-6',
  'M3 12a9 9 0 1 0 3-6M3 3v6h6M12 7v5l4 2',
  'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M15 3a4 4 0 0 1 0 8M22 21v-3a4 4 0 0 0-3-4M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: buildAlternates('/about', locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          cta={{ label: t('cta.primary'), href: '/#contact' }}
        />

        {/* Mission */}
        <Section background="base">
          <Container>
            <div className="section-intro">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('mission.title')}
              </h2>
              <p className={`text-lg text-text-secondary leading-relaxed ${styles.mission}`}>
                {t('mission.body')}
              </p>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section background="surface">
          <Container>
            <div className="w-full">
              <h2 className={styles.valuesTitle}>
                {t('values.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valueKeys.map((key, index) => (
                  <GlowCard key={key} className="!p-8 md:!p-10">
                    <div className={styles.valueHeader}>
                      <span className="value-index">0{index + 1} / EmAI</span>
                      <svg className={styles.valueIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={valueIcons[index]} /></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {t(`values.items.${key}.title`)}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {t(`values.items.${key}.description`)}
                    </p>
                  </GlowCard>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Team */}
        <Section background="base">
          <Container>
            <div className="section-intro">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('team.title')}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {t('team.body')}
              </p>
            </div>
          </Container>
        </Section>

        <PageCTA
          locale={locale as Locale}
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
