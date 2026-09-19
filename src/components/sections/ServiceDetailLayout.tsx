'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container, Section, PageHero } from '@/components/layout';
import { Link } from '@/i18n/routing';
import { trackCTAClick } from '@/lib/analytics';
import { ConsultingIllustration } from '@/components/ui/illustrations/ConsultingIllustration';
import { TestingIllustration } from '@/components/ui/illustrations/TestingIllustration';
import { DataIllustration } from '@/components/ui/illustrations/DataIllustration';
import { WorkshopsIllustration } from '@/components/ui/illustrations/WorkshopsIllustration';
import styles from './ServiceDetailLayout.module.css';

type ServiceKey = 'consulting' | 'testing' | 'workshops' | 'data';

type Step = { title: string; description: string };
type FaqQuestion = { q: string; a: string };

interface ServiceDetailLayoutProps {
  serviceKey: ServiceKey;
}

const serviceIllustrations: Record<ServiceKey, ReactNode> = {
  consulting: <ConsultingIllustration />,
  testing:    <TestingIllustration />,
  workshops:  <WorkshopsIllustration />,
  data:       <DataIllustration />,
};

export function ServiceDetailLayout({ serviceKey }: ServiceDetailLayoutProps) {
  const t = useTranslations(`services.detail.${serviceKey}`);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const steps = t.raw('howItWorks.steps') as Step[];
  const outcomes = t.raw('outcomes.items') as string[];
  const faqQuestions = t.raw('faq.questions') as Record<string, FaqQuestion>;
  const faqKeys = Object.keys(faqQuestions);

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        visual={serviceIllustrations[serviceKey]}
        tone={serviceKey === 'data' ? 'teal' : 'orange'}
        cta={{ label: t('cta.primary'), href: '/#contact' }}
        onCtaClick={() => trackCTAClick(t('cta.primary'), `service_detail_hero_${serviceKey}`)}
      />

      {/* What it is */}
      <Section background="base">
        <Container>
          <div className="section-intro">
            <h2 className="text-3xl md:text-4xl font-medium text-text-primary mb-6">
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
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
              {t('howItWorks.title')}
            </h2>
            <ol className={styles.steps}>
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className={styles.step}
                >
                  <span className={styles.stepNumber}>
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
          <div className={styles.outcomes}>
            <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
              {t('outcomes.title')}
            </h2>
            <div className={styles.outcomeList}>
              <ul className="space-y-5">
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
            </div>
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
                    aria-controls={`service-faq-${serviceKey}-${key}`}
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
                      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${
                        openIndex === index
                          ? 'bg-primary-500 rotate-180'
                          : 'bg-surface-elevated group-hover:bg-primary-500/20'
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          openIndex === index ? 'text-base' : 'text-text-muted'
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
                        id={`service-faq-${serviceKey}-${key}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-5 sm:pl-16 text-text-secondary border-l-2 border-primary-500/30 ml-3">
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
          <div className="cta-panel text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
              {t('cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                onClick={() => trackCTAClick(t('cta.primary'), `service_detail_${serviceKey}`)}
                className="button-primary"
              >
                {t('cta.primary')}
              </Link>
              <Link
                href="/#services"
                onClick={() => trackCTAClick(t('cta.secondary'), `service_detail_${serviceKey}`)}
                className="button-secondary"
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
