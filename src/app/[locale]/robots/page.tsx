import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { HazardTape } from '@/components/ui';
import { PageCTA } from '@/components/sections/PageCTA';
import { RobotRegistry, RobotViewer, RobotStat, Designation } from '@/components/robots';
import { robots, designation, pickSpecs } from '@/lib/robots';
import { buildAlternates } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

const featured = robots.find((r) => r.featured) ?? robots[0];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'robots' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: buildAlternates('/robots', locale),
  };
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
        {/* ---- Hero: diagnostic viewport + featured readout ---- */}
        <Section background="surface" className="relative overflow-hidden">
          <HazardTape position="absolute-top" height={14} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 grid-dots opacity-20" />
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,103,0,0.10),transparent_60%)]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.05),transparent_60%)]" />
          </div>

          <Container>
            <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-4">
              {/* Left: headline + featured readout */}
              <div className="max-w-xl">
                <span className="font-mono font-bold text-xs uppercase text-primary-400 mb-4 inline-block tracking-[0.16em]">
                  {t('hero.eyebrow')}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-[1.05] tracking-tight">
                  {t('hero.title')}
                </h1>
                <div className="w-24 h-1 bg-primary-500 rounded-full mb-8" />
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                  {t('hero.subtitle')}
                </p>

                {/* Featured unit readout — wraps onto two rows on narrow screens */}
                <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4 rounded-xl border border-border-subtle bg-base/40 backdrop-blur-sm px-5 py-4 w-full sm:w-auto">
                  <div className="flex flex-col justify-center pr-6 sm:border-r border-border-subtle">
                    <Designation robot={featured} />
                    <span className="text-sm font-bold text-text-primary mt-1">{featured.name}</span>
                  </div>
                  {heroStats.map((spec) => (
                    <RobotStat
                      key={spec.id}
                      size="md"
                      label={t(`specLabels.${spec.id}`)}
                      value={spec.value}
                      unit={spec.unit}
                    />
                  ))}
                </div>
              </div>

              {/* Right: featured diagnostic viewport */}
              <div className="w-full">
                <RobotViewer
                  category={featured.category}
                  name={featured.name}
                  designation={designation(featured)}
                  modelUrl={featured.modelUrl}
                  poster={featured.poster}
                  hotspots={featured.hotspots}
                  modelScale={featured.modelScale}
                  compact
                  className="aspect-[4/5] sm:aspect-square w-full max-w-lg mx-auto lg:ml-auto"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* ---- Registry ---- */}
        <Section background="base">
          <Container>
            <div className="max-w-3xl mb-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-primary-400 mb-3 block">
                {t('registry.eyebrow')}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">{t('intro')}</p>
            </div>
            <RobotRegistry robots={robots} />
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
