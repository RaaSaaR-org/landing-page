'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function UseCasesSection() {
  const t = useTranslations('useCases');

  return (
    <Section id="use-cases" className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Industrial */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('industrial.title')}</h3>
            <p className="text-gray-600 mb-8">{t('industrial.description')}</p>
            <div className="space-y-6">
              {['manufacturing', 'logistics', 'inspection'].map((key) => (
                <div key={key} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {t(`industrial.cases.${key}.title`)}
                  </h4>
                  <p className="text-gray-600">
                    {t(`industrial.cases.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Municipal */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('municipal.title')}</h3>
            <p className="text-gray-600 mb-8">{t('municipal.description')}</p>
            <div className="space-y-6">
              {['cleaning', 'waste', 'infrastructure'].map((key) => (
                <div key={key} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {t(`municipal.cases.${key}.title`)}
                  </h4>
                  <p className="text-gray-600">
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
