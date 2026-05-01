import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header, Footer, Section, Container } from '@/components/layout';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'impressum' });
  return {
    title: t('title'),
    alternates: buildAlternates('/impressum', locale),
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'impressum' });

  // Optional sections are hidden until the corresponding i18n keys have content.
  const legalForm = t('company.legalForm');
  const phone = t('contact.phone');
  const registerCourt = t('register.court');
  const registerNumber = t('register.number');
  const hasRegister = Boolean(registerCourt || registerNumber);
  const vatNumber = t('vat.number');
  const hasVat = Boolean(vatNumber);

  return (
    <>
      <Header />
      <main>
        <Section id="impressum" background="base">
          <Container>
            <div className="py-16 lg:py-24">
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {t('title')}
              </h1>
              <p className="text-text-secondary mb-12">{t('subtitle')}</p>

              <div className="space-y-10 max-w-3xl">
                {/* Company Info */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('company.title')}
                  </h2>
                  <div className="text-text-secondary space-y-1">
                    <p>{t('company.name')}</p>
                    {legalForm && <p>{legalForm}</p>}
                    <p>{t('company.street')}</p>
                    <p>{t('company.city')}</p>
                    <p>{t('company.country')}</p>
                  </div>
                </section>

                {/* Contact */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('contact.title')}
                  </h2>
                  <div className="text-text-secondary space-y-1">
                    {phone && <p>{phone}</p>}
                    <p>{t('contact.email')}</p>
                  </div>
                </section>

                {/* Representation */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('representation.title')}
                  </h2>
                  <p className="text-text-secondary">{t('representation.text')}</p>
                </section>

                {/* Register */}
                {hasRegister && (
                  <section>
                    <h2 className="text-xl font-semibold text-text-primary mb-4">
                      {t('register.title')}
                    </h2>
                    <div className="text-text-secondary space-y-1">
                      {registerCourt && <p>{registerCourt}</p>}
                      {registerNumber && <p>{registerNumber}</p>}
                    </div>
                  </section>
                )}

                {/* VAT */}
                {hasVat && (
                  <section>
                    <h2 className="text-xl font-semibold text-text-primary mb-4">
                      {t('vat.title')}
                    </h2>
                    <div className="text-text-secondary space-y-1">
                      <p>{t('vat.text')}</p>
                      <p>{vatNumber}</p>
                    </div>
                  </section>
                )}

                {/* Responsible for Content */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('responsible.title')}
                  </h2>
                  <p className="text-sm text-text-muted mb-2">{t('responsible.subtitle')}</p>
                  <div className="text-text-secondary space-y-1">
                    <p>{t('responsible.name')}</p>
                    <p>{t('responsible.street')}</p>
                    <p>{t('responsible.city')}</p>
                  </div>
                </section>

                {/* Dispute Resolution */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('dispute.title')}
                  </h2>
                  <div className="text-text-secondary space-y-2">
                    <p>{t('dispute.text')}</p>
                    <p>
                      <a
                        href={t('dispute.link')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-400 transition-colors"
                      >
                        {t('dispute.link')}
                      </a>
                    </p>
                    <p>{t('dispute.note')}</p>
                  </div>
                </section>

                {/* Liability for Content */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('liability.title')}
                  </h2>
                  <p className="text-text-secondary">{t('liability.text')}</p>
                </section>

                {/* Liability for Links */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('links.title')}
                  </h2>
                  <p className="text-text-secondary">{t('links.text')}</p>
                </section>

                {/* Copyright */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('copyright.title')}
                  </h2>
                  <p className="text-text-secondary">{t('copyright.text')}</p>
                </section>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
