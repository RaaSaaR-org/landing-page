'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { Link } from '@/i18n/routing';
import { trackCTAClick } from '@/lib/analytics';

type ServiceKey = 'consulting' | 'testing' | 'workshops' | 'data';

type Step = { title: string; description: string };
type FaqQuestion = { q: string; a: string };

interface ServiceDetailLayoutProps {
  serviceKey: ServiceKey;
}

const serviceIcons: Record<ServiceKey, ReactNode> = {
  consulting: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  testing: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 5.607A1.125 1.125 0 0120.099 22H3.901a1.125 1.125 0 01-1.103-1.093L4.2 15.3" />
    </svg>
  ),
  workshops: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  data: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
};

export function ServiceDetailLayout({ serviceKey }: ServiceDetailLayoutProps) {
  const t = useTranslations(`services.detail.${serviceKey}`);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps = t.raw('howItWorks.steps') as Step[];
  const outcomes = t.raw('outcomes.items') as string[];
  const faqQuestions = t.raw('faq.questions') as Record<string, FaqQuestion>;
  const faqKeys = Object.keys(faqQuestions);

  return (
    <>
      {/* Hero */}
      <Section background="surface">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500">
                {serviceIcons[serviceKey]}
              </div>
              <span className="font-mono text-sm uppercase tracking-wider text-primary-400">
                {t('eyebrow')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              {t('title')}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full mb-8" />
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* What it is */}
      <Section background="base">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              {t('whatItIs.title')}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('whatItIs.body')}
            </p>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section background="surface">
        <Container>
          <div className="max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
              {t('howItWorks.title')}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className="relative glow-card p-8 flex flex-col"
                >
                  <span className="font-mono text-sm text-primary-400 mb-3">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Outcomes */}
      <Section background="base">
        <Container>
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-10">
              {t('outcomes.title')}
            </h2>
            <GlowCard className="!p-8" hoverEffect={false}>
              <ul className="space-y-4">
                {outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-lg text-text-secondary">
                    <svg
                      className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="surface">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-10 text-center">
              {t('faq.title')}
            </h2>
            <div className="space-y-4">
              {faqKeys.map((key, index) => (
                <div
                  key={key}
                  className={`rounded-xl overflow-hidden glass transition-shadow ${
                    openIndex === index ? 'shadow-[0_0_30px_rgba(255,103,0,0.15)]' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="group w-full px-6 py-5 flex items-center gap-4 hover:bg-surface-elevated/50 transition-all text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className={`font-mono text-sm transition-colors ${
                        openIndex === index ? 'text-primary-500' : 'text-text-muted'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`h-px flex-grow max-w-8 transition-all ${
                        openIndex === index ? 'bg-primary-500' : 'bg-border-subtle group-hover:bg-primary-500/50'
                      }`}
                    />
                    <span className="font-semibold text-text-primary flex-grow pr-4">
                      {faqQuestions[key].q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index
                          ? 'bg-primary-500 rotate-180'
                          : 'bg-surface-elevated group-hover:bg-primary-500/20'
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          openIndex === index ? 'text-white' : 'text-text-muted'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-16 text-text-secondary border-l-2 border-primary-500/30 ml-3">
                            {faqQuestions[key].a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="surface-elevated">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              {t('cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                onClick={() => trackCTAClick(t('cta.primary'), `service_detail_${serviceKey}`)}
                className="px-8 py-4 bg-primary-500 hover:bg-primary-400 text-white rounded-xl font-semibold shadow-[0_0_30px_rgba(255,103,0,0.25)] transition-all"
              >
                {t('cta.primary')}
              </Link>
              <Link
                href="/#services"
                onClick={() => trackCTAClick(t('cta.secondary'), `service_detail_${serviceKey}`)}
                className="px-8 py-4 border border-border-subtle hover:border-primary-500/50 text-text-primary rounded-xl font-semibold transition-all"
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
