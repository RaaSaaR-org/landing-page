'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

const icons = {
  evaluation: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
    </svg>
  ),
  access: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  trust: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
};

export function ProblemSection() {
  const t = useTranslations('problem');

  return (
    <Section id="problem" background="surface">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(['evaluation', 'access', 'trust'] as const).map((key) => (
            <div
              key={key}
              className="relative bg-surface-elevated p-8 rounded-xl border-l-2 border-primary-500/60 shadow-lg hover:shadow-xl hover:border-l-primary-500 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-primary-500/15">
                {icons[key]}
              </div>
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mb-5">
                <div className="text-primary-500">
                  {icons[key]}
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t(`challenges.${key}.title`)}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t(`challenges.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
