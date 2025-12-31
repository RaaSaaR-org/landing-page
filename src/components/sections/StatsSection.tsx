'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function StatsSection() {
  const t = useTranslations('stats');

  return (
    <Section background="surface-elevated" className="border-y border-border-subtle">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['businesses', 'jobs', 'researchers', 'area'].map((key) => (
            <div
              key={key}
              className="text-center p-6 rounded-xl hover:bg-surface transition-all"
            >
              <div className="text-5xl font-bold mb-2 text-primary-500">
                {t(`${key}.value`)}
              </div>
              <div className="text-text-secondary">
                {t(`${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
