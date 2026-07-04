'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { LearningLoop } from '@/components/sections/LearningLoop';

const pillarIcons = {
  openSource: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  sovereignty: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  learning: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
  humanFirst: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
};

const pillarKeys = ['openSource', 'sovereignty', 'learning', 'humanFirst'] as const;

export function WhyEmaiSection() {
  const t = useTranslations('whyEmai');

  return (
    <Section id="why-emai" background="surface">
      <Container>
        {/* Background decorative element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <svg
            className="w-[600px] h-[600px] opacity-[0.03]"
            viewBox="0 0 200 200"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="100,10 190,60 190,140 100,190 10,140 10,60"
              stroke="#FF6700"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              className="animate-shield-dash"
              fill="none"
            />
            <polygon
              points="100,30 170,70 170,130 100,170 30,130 30,70"
              stroke="#2DD4BF"
              strokeWidth="0.5"
              strokeDasharray="6 6"
              className="animate-shield-dash"
              style={{ animationDirection: 'reverse' }}
              fill="none"
            />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-text-secondary">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative">
          <LearningLoop />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillarKeys.map((key) => (
            <div
              key={key}
              className="group glass rounded-xl p-8 corner-brackets hover:shadow-[0_0_40px_rgba(255,103,0,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-500/20 transition-colors">
                <div className="text-primary-500">
                  {pillarIcons[key]}
                </div>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
