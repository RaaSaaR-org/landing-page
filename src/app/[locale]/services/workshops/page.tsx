import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { routing } from '@/i18n/routing';
import { buildAlternates } from '@/lib/seo';
import { jsonLdScript, serviceBreadcrumb } from '@/lib/jsonld';
import {
  AboutPositioning,
  AudienceSegments,
  EngagementPath,
  PairGrid,
  PublicSectorGrid,
  SectionHeader,
  WorkshopTierCard,
  type AudienceSegment,
  type EngagementStep,
  type ItemPair,
  type PublicSectorItem,
  type WorkshopTier,
} from '@/components/sections/workshops';

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'workshops' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates('/services/workshops', locale),
  };
}

export default async function WorkshopsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'workshops' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const loc = locale as Locale;

  const tiers = t.raw('tiers.items') as WorkshopTier[];
  const steps = t.raw('engagementPath.steps') as EngagementStep[];
  const methodology = t.raw('methodology.items') as ItemPair[];
  const audiences = t.raw('audiences.segments') as AudienceSegment[];
  const publicSectorItems = t.raw('publicSector.items') as PublicSectorItem[];
  const eastSideFabItems = t.raw('eastSideFab.items') as ItemPair[];
  const aboutItems = t.raw('about.items') as ItemPair[];

  const audienceLabel = locale === 'de' ? 'Zielgruppe' : 'Audience';

  const ld = serviceBreadcrumb({
    locale,
    servicesLabel: tNav('services'),
    serviceTitle: t('hero.title'),
    servicePath: '/services/workshops',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
        />
        <Section background="surface" className="!pt-0 !pb-12">
          <Container>
            <div className="max-w-4xl">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 font-mono text-xs uppercase tracking-wider">
                {t('hero.tagline')}
              </span>
            </div>
          </Container>
        </Section>

        {/* Tiers */}
        <Section background="base">
          <Container>
            <SectionHeader title={t('tiers.title')} subtitle={t('tiers.subtitle')} />
            <div className="space-y-10 max-w-6xl mx-auto">
              {tiers.map((tier) => (
                <WorkshopTierCard key={tier.number} tier={tier} audienceLabel={audienceLabel} />
              ))}
            </div>
          </Container>
        </Section>

        {/* Engagement path */}
        <Section background="surface">
          <Container>
            <SectionHeader title={t('engagementPath.title')} subtitle={t('engagementPath.intro')} />
            <EngagementPath
              steps={steps}
              outcomeLabel={t('engagementPath.outcomeLabel')}
              outcome={t('engagementPath.outcome')}
            />
          </Container>
        </Section>

        {/* Methodology */}
        <Section background="base">
          <Container>
            <SectionHeader title={t('methodology.title')} subtitle={t('methodology.intro')} />
            <PairGrid items={methodology} cols="3" />
          </Container>
        </Section>

        {/* Audiences */}
        <Section background="surface">
          <Container>
            <SectionHeader title={t('audiences.title')} subtitle={t('audiences.subtitle')} />
            <AudienceSegments segments={audiences} />
          </Container>
        </Section>

        {/* Public Sector */}
        <Section background="base">
          <Container>
            <SectionHeader
              title={t('publicSector.title')}
              subtitle={t('publicSector.intro')}
              align="left"
            />
            <PublicSectorGrid items={publicSectorItems} />
          </Container>
        </Section>

        {/* East Side Fab */}
        <Section background="surface">
          <Container>
            <SectionHeader
              title={t('eastSideFab.title')}
              subtitle={t('eastSideFab.intro')}
              align="left"
            />
            <PairGrid items={eastSideFabItems} cols="2" />
          </Container>
        </Section>

        {/* About / positioning */}
        <Section background="base">
          <Container>
            <SectionHeader title={t('about.title')} subtitle={t('about.intro')} align="left" />
            <AboutPositioning
              items={aboutItems}
              differentiatorLabel={t('about.differentiatorLabel')}
              differentiator={t('about.differentiator')}
              antiLabel={t('about.antiLabel')}
              anti={t('about.anti')}
            />
          </Container>
        </Section>

        <PageCTA
          locale={loc}
          eyebrow={t('cta.eyebrow')}
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
