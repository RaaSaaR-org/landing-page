import type { Metadata } from 'next';
import Image from 'next/image';
import styles from '@/components/robots/RobotShowroom.module.css';
import detailStyles from '@/components/robots/RobotDetail.module.css';
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
        <Section background="surface" className={detailStyles.hero}>
          <Container>
            <Link href="/robots" locale={locale as Locale} className={detailStyles.back}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              {t('detail.backToAll')}
            </Link>

            <div className={detailStyles.heading}>
              <div>
                <div className={detailStyles.meta}>
                  <Designation robot={robot} />
                  <span className={detailStyles.category}>{t(`categories.${robot.category}`)}</span>
                </div>
                <h1 className={detailStyles.title}>{robot.name}</h1>
              </div>
              <p className={detailStyles.tagline}>{t(`items.${slug}.tagline`)}</p>
            </div>

            <div className={detailStyles.experience}>
              <RobotViewer
                category={robot.category}
                name={robot.name}
                designation={designation(robot)}
                modelUrl={robot.modelUrl}
                poster={robot.poster}
                hotspots={robot.hotspots}
                modelScale={robot.modelScale}
                className={detailStyles.viewer}
              />
              <div className={detailStyles.dossier}>
                <h2 className={detailStyles.sectionLabel}>{t('detail.overview')}</h2>
                <p className={detailStyles.description}>{t(`items.${slug}.description`)}</p>
                <div className={detailStyles.metrics}>
                  {heroStats.map((spec) => (
                    <div key={spec.id} className={detailStyles.metric}>
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
                <a href="#specifications" className={detailStyles.specLink}>
                  <span>{t('specsHeading')}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---- Datasheet ---- */}
        <Section background="base" id="specifications" className={detailStyles.specSection}>
          <Container>
            <div className={detailStyles.specHeader}>
              <h2>
                {t('specsHeading')}
              </h2>
              <Designation robot={robot} className="whitespace-nowrap" />
            </div>
            <RobotSpecList robot={robot} className={detailStyles.specList} />
          </Container>
        </Section>

        {/* ---- Other units ---- */}
        <Section background="surface">
          <Container>
            <h2 className={detailStyles.relatedHeading}>
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
                    className={`${styles.relatedCard} group relative flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-base/40 px-4 py-4 transition-all hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-[color:var(--rh)]`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg border opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{ borderColor: `${ac.hex}55` }}
                    />
                    {r.poster && <Image
                      src={r.poster}
                      alt=""
                      width={130}
                      height={150}
                      className={styles.relatedImage}
                    />}
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
