'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function UseCasesSection() {
  const t = useTranslations('useCases');

  return (
    <Section id="use-cases" background="base">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-text-secondary">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Manufacturing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-text-primary">{t('industrial.title')}</h3>
            </div>
            <p className="text-text-secondary mb-8">{t('industrial.description')}</p>
            <div className="space-y-6">
              {['manufacturing', 'logistics', 'inspection'].map((key) => (
                <div
                  key={key}
                  className="bg-surface p-6 rounded-xl border border-border-subtle shadow-lg hover:shadow-xl hover:border-primary-500 transition-all"
                >
                  <h4 className="text-xl font-bold text-text-primary mb-2">
                    {t(`industrial.cases.${key}.title`)}
                  </h4>
                  <p className="text-text-secondary">
                    {t(`industrial.cases.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Warehouse */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-text-primary">{t('municipal.title')}</h3>
            </div>
            <p className="text-text-secondary mb-8">{t('municipal.description')}</p>
            <div className="space-y-6">
              {['cleaning', 'waste', 'infrastructure'].map((key) => (
                <div
                  key={key}
                  className="bg-surface p-6 rounded-xl border border-border-subtle shadow-lg hover:shadow-xl hover:border-primary-500 transition-all"
                >
                  <h4 className="text-xl font-bold text-text-primary mb-2">
                    {t(`municipal.cases.${key}.title`)}
                  </h4>
                  <p className="text-text-secondary">
                    {t(`municipal.cases.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
