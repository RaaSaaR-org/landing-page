import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { PageCTA } from '@/components/sections/PageCTA';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const valueKeys = ['openSource', 'sovereignty', 'learning', 'humanFirst'] as const;

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
        <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        {/* Mission */}
        <Section background="base">
          <Container>
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {t('mission.body')}
              </p>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section background="surface">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center">
                {t('values.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {valueKeys.map((key) => (
                  <GlowCard key={key} className="!p-8">
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
            <div className="max-w-4xl">
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
