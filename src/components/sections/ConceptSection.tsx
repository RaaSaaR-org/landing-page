'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function ConceptSection() {
  const t = useTranslations('concept');

  return (
    <Section id="concept" background="surface">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            {t('title')}
          </h2>
          <p className="text-xl text-primary-400 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-text-secondary">
            {t('description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-text-primary">{t('why.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['research', 'compact', 'need', 'ecosystem'].map((key) => (
              <div
                key={key}
                className="bg-surface-elevated p-6 rounded-xl border border-border-subtle shadow-lg hover:shadow-xl hover:border-primary-500 transition-all"
              >
                <h4 className="text-xl font-bold mb-3 text-text-primary">
                  {t(`why.reasons.${key}.title`)}
                </h4>
                <p className="text-text-secondary">
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
