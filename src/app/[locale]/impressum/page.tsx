'use client';

import { useTranslations } from 'next-intl';
import { Header, Footer, Section, Container } from '@/components/layout';

export default function ImpressumPage() {
  const t = useTranslations('impressum');

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
                    <p>{t('company.legalForm')}</p>
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
                    <p>{t('contact.phone')}</p>
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
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('register.title')}
                  </h2>
                  <div className="text-text-secondary space-y-1">
                    <p>{t('register.court')}</p>
                    <p>{t('register.number')}</p>
                  </div>
                </section>

                {/* VAT */}
                <section>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    {t('vat.title')}
                  </h2>
                  <div className="text-text-secondary space-y-1">
                    <p>{t('vat.text')}</p>
                    <p>{t('vat.number')}</p>
                  </div>
                </section>

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
