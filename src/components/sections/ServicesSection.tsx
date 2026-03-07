'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';

const serviceIcons = {
  testing: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 5.607A1.125 1.125 0 0120.099 22H3.901a1.125 1.125 0 01-1.103-1.093L4.2 15.3" />
    </svg>
  ),
  data: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  workshops: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  consulting: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
};

const serviceKeys = ['testing', 'data', 'workshops', 'consulting'] as const;

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <Section id="services" background="base">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceKeys.map((key, index) => (
            <div
              key={key}
              className="group relative glow-card p-8 md:p-10 hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Large decorative number */}
              <div className="absolute top-4 right-6 text-7xl md:text-8xl font-bold text-primary-500/[0.06] select-none pointer-events-none leading-none">
                0{index + 1}
              </div>

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                  <div className="text-primary-500">
                    {serviceIcons[key]}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {t(`items.${key}.description`)}
                </p>

                {/* Link to contact */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <span>{key === 'workshops' ? 'Workshop anfragen' : 'Mehr erfahren'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
