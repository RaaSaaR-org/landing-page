'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function ProblemSection() {
  const t = useTranslations('problem');

  return (
    <Section id="problem" background="surface">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-text-secondary">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['labor', 'transition', 'costs', 'complexity'].map((key) => (
            <div
              key={key}
              className="bg-surface-elevated p-8 rounded-xl border border-border-subtle shadow-lg hover:shadow-xl hover:border-primary-500 transition-all"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {t(`challenges.${key}.title`)}
              </h3>
              <p className="text-text-secondary">
                {t(`challenges.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
