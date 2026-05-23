import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { PageCTA } from '@/components/sections/PageCTA';
import { UseCasesIllustration } from '@/components/ui/illustrations/UseCasesIllustration';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const caseKeys = ['manufacturing-assembly', 'logistics-picking', 'mittelstand-evaluation'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'useCases' });
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: buildAlternates('/use-cases', locale),
  };
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'useCases' });

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          visual={<UseCasesIllustration />}
          cta={{ label: t('cta.primary'), href: '/#contact' }}
        />

        {/* Intro */}
        <Section background="base">
          <Container>
            <div className="max-w-4xl">
              <p className="text-lg text-text-secondary leading-relaxed">
                {t('intro')}
              </p>
            </div>
          </Container>
        </Section>

        {/* Cases */}
        <Section background="surface">
          <Container>
            <div className="max-w-5xl mx-auto space-y-8">
              {caseKeys.map((key) => (
                <GlowCard key={key} className="!p-8 md:!p-10" hoverEffect={false}>
                  <span className="font-mono text-xs uppercase tracking-wider text-primary-400">
                    {t(`cases.${key}.industry`)}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-2 mb-6">
                    {t(`cases.${key}.title`)}
                  </h2>
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <dt className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                        Problem
                      </dt>
                      <dd className="text-text-secondary leading-relaxed">
                        {t(`cases.${key}.problem`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                        {locale === 'de' ? 'Lösung' : 'Solution'}
                      </dt>
                      <dd className="text-text-secondary leading-relaxed">
                        {t(`cases.${key}.solution`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-2">
                        {locale === 'de' ? 'Ergebnis' : 'Outcome'}
                      </dt>
                      <dd className="text-text-secondary leading-relaxed">
                        {t(`cases.${key}.outcome`)}
                      </dd>
                    </div>
                  </dl>
                </GlowCard>
              ))}
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
