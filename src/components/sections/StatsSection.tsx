'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

export function StatsSection() {
  const t = useTranslations('stats');

  return (
    <Section className="bg-primary-600 text-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['businesses', 'jobs', 'researchers', 'area'].map((key) => (
            <div key={key} className="text-center">
              <div className="text-5xl font-bold mb-2">
                {t(`${key}.value`)}
              </div>
              <div className="text-blue-100">
                {t(`${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
