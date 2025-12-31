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
            <h3 className="text-3xl font-bold text-text-primary mb-4">{t('industrial.title')}</h3>
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
            <h3 className="text-3xl font-bold text-text-primary mb-4">{t('municipal.title')}</h3>
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
