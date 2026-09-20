import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container, PageHero } from '@/components/layout';
import { PageCTA } from '@/components/sections/PageCTA';
import { Link, routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import styles from './projects.module.css';

type Locale = (typeof routing.locales)[number];
const projectKeys = ['neodem', 'hnna', 'world-model', 'agentic-researcher', 'agentic-company'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    ...buildPageMetadata({ title: t('title'), description: t('metaDescription'), locale, path: '/projects' }),
    keywords: ['Physical AI', 'NeoDEM', 'HNNA', 'Humans Need Not Apply', 'Modular World Model', 'Agentic Researcher', 'Agentic Company'],
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          visual={
            <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" className={styles.heroVisual}>
              <path d="M160 45 263 120 224 245H96L57 120Z" stroke="currentColor" strokeOpacity=".25" />
              {[[160, 45], [263, 120], [224, 245], [96, 245], [57, 120]].map(([x, y], index) => (
                <g key={projectKeys[index]}>
                  <path d={`M160 155 ${x} ${y}`} stroke="currentColor" strokeOpacity=".3" />
                  <rect x={x - 26} y={y - 26} width="52" height="52" rx="10" fill="#10161B" stroke={index % 2 === 1 ? '#2DD4BF' : 'currentColor'} />
                  <text x={x} y={y + 6} textAnchor="middle" fill={index % 2 === 1 ? '#2DD4BF' : 'currentColor'} stroke="none" fontSize="18" fontFamily="monospace">0{index + 1}</text>
                </g>
              ))}
              <circle cx="160" cy="155" r="9" fill="currentColor" fillOpacity=".15" stroke="currentColor" />
              <circle cx="160" cy="155" r="3" fill="currentColor" />
            </svg>
          }
        />

        <nav aria-label={t('navigationLabel')} className={styles.projectNav}>
          <Container>
            <div className={styles.projectLinks}>
              {projectKeys.map((key, index) => (
                <a key={key} href={`#${key}`} className={styles.projectLink}>
                  <span className={styles.index}>0{index + 1}</span>
                  {t(`items.${key}.name`)}
                  <span aria-hidden="true" className={styles.arrow}>↓</span>
                </a>
              ))}
            </div>
          </Container>
        </nav>

        {projectKeys.map((key, index) => (
          <Section key={key} id={key} background={index % 2 === 1 ? 'surface' : 'base'} className={styles.projectSection}>
            <Container>
              <article aria-labelledby={`${key}-title`} className={styles.project}>
                <div>
                  <p className={styles.category}><span className={styles.index}>0{index + 1}</span>{t(`items.${key}.category`)}</p>
                  <h2 id={`${key}-title`} className={styles.projectTitle}>{t(`items.${key}.name`)}</h2>
                  <ul className={styles.tags} aria-label={t('focusLabel')}>
                    {(t.raw(`items.${key}.tags`) as string[]).map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <div className={styles.copy}>
                  <h3>{t(`items.${key}.headline`)}</h3>
                  <p className={styles.description}>
                    {key === 'hnna' ? t.rich('items.hnna.description', {
                      eastsidefab: (chunks) => <a className={styles.partnerLink} href="https://eastsidefab.de/projekt/humansneednotapply/">{chunks}</a>,
                    }) : t(`items.${key}.description`)}
                  </p>
                  <dl className={styles.details}>
                    <div><dt>{t('focusLabel')}</dt><dd>{t(`items.${key}.focus`)}</dd></div>
                    <div>
                      <dt>{t('approachLabel')}</dt>
                      <dd>
                        {key === 'hnna' ? t.rich('items.hnna.approach', {
                          emai: (chunks) => <Link className={styles.partnerLink} href="/about" locale={locale as Locale}>{chunks}</Link>,
                          zema: (chunks) => <a className={styles.partnerLink} href="https://zema.de/">{chunks}</a>,
                          thyssenkrupp: (chunks) => <a className={styles.partnerLink} href="https://www.thyssenkrupp-automotive-technology.com/en/automotive-body-solutions">{chunks}</a>,
                          villeroy: (chunks) => <a className={styles.partnerLink} href="https://www.villeroyboch-group.com/en/">{chunks}</a>,
                        }) : t(`items.${key}.approach`)}
                      </dd>
                    </div>
                  </dl>
                  {key === 'hnna' && (
                    <Link href="/news/esf-innovation-community" locale={locale as Locale} className={styles.moreLink}>
                      {t('items.hnna.linkLabel')}<span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </div>
              </article>
            </Container>
          </Section>
        ))}

        <PageCTA locale={locale as Locale} title={t('cta.title')} body={t('cta.body')} primaryHref="/#contact" primaryLabel={t('cta.primary')} />
      </main>
      <Footer />
    </>
  );
}
