'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function SolutionSection() {
  const t = useTranslations('solution');

  return (
    <Section id="features" className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['accessible', 'flexible', 'expertise', 'supported'].map((key) => (
            <div key={key} className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(`benefits.${key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`benefits.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
