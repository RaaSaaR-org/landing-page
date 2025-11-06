'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function RegionalSection() {
  const t = useTranslations('regional');

  return (
    <Section id="about" className="bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['dfki', 'zema', 'university', 'edih'].map((key) => (
            <div key={key} className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t(`partners.${key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`partners.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
