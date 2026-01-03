'use client';

import { useTranslations } from 'next-intl';
import { Header, Footer, Section, Container } from '@/components/layout';

export default function DatenschutzPage() {
  const t = useTranslations('datenschutz');

  return (
    <>
      <Header />
      <main>
        <Section id="datenschutz" background="base">
          <Container>
            <div className="py-16 lg:py-24">
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {t('title')}
              </h1>
              <p className="text-text-muted mb-12">{t('lastUpdated')}</p>

              <div className="space-y-12 max-w-3xl">
                {/* Section 1: Privacy at a Glance */}
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">
                    {t('intro.title')}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('intro.general.title')}
                      </h3>
                      <p className="text-text-secondary">{t('intro.general.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-4">
                        {t('intro.collection.title')}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-text-primary">
                            {t('intro.collection.responsible.q')}
                          </p>
                          <p className="text-text-secondary mt-1">
                            {t('intro.collection.responsible.a')}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {t('intro.collection.how.q')}
                          </p>
                          <p className="text-text-secondary mt-1">
                            {t('intro.collection.how.a')}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {t('intro.collection.purpose.q')}
                          </p>
                          <p className="text-text-secondary mt-1">
                            {t('intro.collection.purpose.a')}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">
                            {t('intro.collection.rights.q')}
                          </p>
                          <p className="text-text-secondary mt-1">
                            {t('intro.collection.rights.a')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2: Hosting */}
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">
                    {t('hosting.title')}
                  </h2>
                  <p className="text-text-secondary mb-4">{t('hosting.text')}</p>

                  <div className="bg-surface-elevated p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-text-primary mb-3">
                      {t('hosting.vercel.title')}
                    </h3>
                    <div className="text-text-secondary space-y-3">
                      <p>{t('hosting.vercel.text')}</p>
                      <p>
                        <a
                          href={t('hosting.vercel.link')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-400 transition-colors"
                        >
                          {t('hosting.vercel.link')}
                        </a>
                      </p>
                      <p>{t('hosting.vercel.basis')}</p>
                      <p>{t('hosting.vercel.transfer')}</p>
                      <p>
                        <a
                          href={t('hosting.vercel.transferLink')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-400 transition-colors"
                        >
                          {t('hosting.vercel.transferLink')}
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: General Information */}
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">
                    {t('general.title')}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.privacy.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.privacy.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.controller.title')}
                      </h3>
                      <p className="text-text-secondary mb-3">{t('general.controller.text')}</p>
                      <div className="bg-surface-elevated p-4 rounded-lg text-text-secondary space-y-1">
                        <p>{t('general.controller.company')}</p>
                        <p>{t('general.controller.street')}</p>
                        <p>{t('general.controller.city')}</p>
                        <p>{t('general.controller.phone')}</p>
                        <p>{t('general.controller.email')}</p>
                      </div>
                      <p className="text-text-muted text-sm mt-3">{t('general.controller.note')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.retention.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.retention.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.legal.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.legal.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.recipient.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.recipient.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.revocation.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.revocation.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.objection.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.objection.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.complaint.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.complaint.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.portability.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.portability.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.access.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.access.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.restriction.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.restriction.text')}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('general.ssl.title')}
                      </h3>
                      <p className="text-text-secondary">{t('general.ssl.text')}</p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Data Collection */}
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">
                    {t('collection.title')}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('collection.contact.title')}
                      </h3>
                      <div className="text-text-secondary space-y-3">
                        <p>{t('collection.contact.text')}</p>
                        <p>{t('collection.contact.basis')}</p>
                        <p>{t('collection.contact.retention')}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {t('collection.email.title')}
                      </h3>
                      <div className="text-text-secondary space-y-3">
                        <p>{t('collection.email.text')}</p>
                        <p>{t('collection.email.basis')}</p>
                        <p>{t('collection.email.retention')}</p>
                      </div>
                    </div>
                  </div>
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
