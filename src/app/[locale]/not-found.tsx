import { getTranslations } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

export default async function LocaleNotFound() {
  // Static export pre-renders not-found per locale; default to DE for the root case
  const locale: Locale = 'de';
  const t = await getTranslations({ locale, namespace: 'notFound' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <Header />
      <main>
        <Section background="surface">
          <Container>
            <div className="max-w-3xl mx-auto text-center py-16">
              <p className="font-mono text-7xl md:text-8xl font-bold text-primary-500/40 mb-4">
                {t('code')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                {t('title')}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full mx-auto mb-6" />
              <p className="text-lg text-text-secondary mb-10">{t('body')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  locale={locale}
                  className="px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-semibold shadow-[0_0_30px_rgba(255,103,0,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  {t('homeLabel')}
                </Link>
                <Link
                  href="/#services"
                  locale={locale}
                  className="px-8 py-4 border border-border-subtle hover:border-primary-500/50 text-text-primary rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  {tNav('services')}
                </Link>
                <Link
                  href="/news"
                  locale={locale}
                  className="px-8 py-4 border border-border-subtle hover:border-primary-500/50 text-text-primary rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
                >
                  {t('newsLabel')}
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
