'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function ConceptSection() {
  const t = useTranslations('concept');

  return (
    <Section id="concept" className="bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-blue-200 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-gray-300">
            {t('description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">{t('why.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['research', 'compact', 'need', 'ecosystem'].map((key) => (
              <div key={key} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h4 className="text-xl font-bold mb-3">
                  {t(`why.reasons.${key}.title`)}
                </h4>
                <p className="text-gray-300">
                  {t(`why.reasons.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
