import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { RobotViewer, RobotSpecList, RobotStat, Designation } from '@/components/robots';
import { Link, routing } from '@/i18n/routing';
import {
  categoryAccent,
  designation,
  getRobot,
  pickSpecs,
  robots,
  robotSlugs,
} from '@/lib/robots';
import { buildAlternates } from '@/lib/seo';

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    robotSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const robot = getRobot(slug);
  if (!robot) return {};
  const t = await getTranslations({ locale, namespace: 'robots' });
  return {
    title: `${robot.name} – ${t('hero.eyebrow')}`,
    description: t(`items.${slug}.tagline`),
    alternates: buildAlternates(`/robots/${slug}`, locale),
  };
}

export default async function RobotDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const robot = getRobot(slug);
  if (!robot) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'robots' });
  const accent = categoryAccent[robot.category];
  const heroStats = pickSpecs(robot, robot.heroSpecs);
  const others = robots.filter((r) => r.slug !== slug);

  return (
    <>
      <Header />
      <main>
        {/* ---- Hero: viewport + dossier ---- */}
        <Section background="surface" className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-2/3 h-full"
              style={{
                background: `radial-gradient(ellipse at top right, ${accent.hex}14, transparent 60%)`,
              }}
            />
          </div>
          <Container>
            <Link
              href="/robots"
              locale={locale as Locale}
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-400 transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('detail.backToAll')}
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Viewer */}
              <RobotViewer
                category={robot.category}
                name={robot.name}
                designation={designation(robot)}
                modelUrl={robot.modelUrl}
                poster={robot.poster}
                hotspots={robot.hotspots}
                modelScale={robot.modelScale}
                className="aspect-square lg:aspect-[5/4] w-full lg:sticky lg:top-28"
              />

              {/* Dossier */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Designation robot={robot} />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded ${accent.bg} ${accent.text}`}
                  >
                    {t(`categories.${robot.category}`)}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
                  {robot.name}
                </h1>
                <div
                  className="w-20 h-1 rounded-full mb-6"
                  style={{ backgroundColor: accent.hex }}
                />
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  {t(`items.${slug}.tagline`)}
                </p>

                {/* Headline metric strip */}
                <div className="grid grid-cols-3 divide-x divide-border-subtle rounded-xl border border-border-subtle bg-base/40 backdrop-blur-sm mb-10">
                  {heroStats.map((spec) => (
                    <div key={spec.id} className="px-3 sm:px-5 py-4 min-w-0">
                      <RobotStat
                        size="lg"
                        label={t(`specLabels.${spec.id}`)}
                        value={spec.value}
                        unit={spec.unit}
                        valueClassName={accent.textStrong}
                      />
                    </div>
                  ))}
                </div>

                {/* Overview */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary mb-3">
                    {t('detail.overview')}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {t(`items.${slug}.description`)}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---- Datasheet ---- */}
        <Section background="base">
          <Container>
            <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-border-subtle">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {t('specsHeading')}
              </h2>
              <Designation robot={robot} className="whitespace-nowrap" />
            </div>
            <RobotSpecList robot={robot} />
          </Container>
        </Section>

        {/* ---- Other units ---- */}
        <Section background="surface">
          <Container>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary mb-6">
              {t('detail.otherUnits')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((r) => {
                const ac = categoryAccent[r.category];
                return (
                  <Link
                    key={r.slug}
                    href={`/robots/${r.slug}`}
                    locale={locale as Locale}
                    style={{ ['--rh' as string]: ac.hex }}
                    className="group relative flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-base/40 px-4 py-4 transition-all hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-[color:var(--rh)]"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg border opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{ borderColor: `${ac.hex}55` }}
                    />
                    <div>
                      <Designation robot={r} className="block mb-1" />
                      <span className="text-sm font-semibold text-text-primary">{r.name}</span>
                    </div>
                    <svg
                      className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: ac.hex }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                );
              })}
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
