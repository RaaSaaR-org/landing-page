'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { GlowCard } from '@/components/ui/GlowCard';
import { HazardTape } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { trackCTAClick } from '@/lib/analytics';
import { ConsultingIllustration } from '@/components/ui/illustrations/ConsultingIllustration';
import { TestingIllustration } from '@/components/ui/illustrations/TestingIllustration';
import { DataIllustration } from '@/components/ui/illustrations/DataIllustration';
import { WorkshopsIllustration } from '@/components/ui/illustrations/WorkshopsIllustration';

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

  const steps = t.raw('howItWorks.steps') as Step[];
  const outcomes = t.raw('outcomes.items') as string[];
  const faqQuestions = t.raw('faq.questions') as Record<string, FaqQuestion>;
  const faqKeys = Object.keys(faqQuestions);

  return (
    <>
      {/* Hero — matches PageHero pattern (tape + ambient + 2-col with illustration) */}
      <Section background="surface" className="relative overflow-hidden">
        <HazardTape position="absolute-top" height={14} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-dots opacity-25" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,103,0,0.10),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.05),transparent_60%)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-6 sm:inset-x-12 top-10 bottom-6">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-primary-500/30" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-secondary-400/30" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-primary-500/30" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-secondary-400/30" />
        </div>
        <Container>
          <div className="relative grid md:grid-cols-3 gap-12 items-center pt-4">
            <div className="md:col-span-2 max-w-4xl">
              <span
                className="font-mono font-bold text-xs uppercase text-primary-400 mb-4 inline-block"
                style={{ letterSpacing: '0.14em' }}
              >
                {t('eyebrow')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-[1.05] tracking-tight">
                {t('title')}
              </h1>
              <div className="w-24 h-1 bg-primary-500 rounded-full mb-8" />
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                {t('subtitle')}
              </p>
              {/* CTA — desktop only; on mobile it lives below the illustration instead */}
              <Link
                href="/#contact"
                onClick={() => trackCTAClick(t('cta.primary'), `service_detail_hero_${serviceKey}`)}
                className="group hidden md:inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold text-base shadow-[0_0_24px_rgba(255,103,0,0.25)] hover:bg-primary-400 hover:shadow-[0_0_40px_rgba(255,103,0,0.45)] transition-all"
              >
                {t('cta.primary')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center gap-5 mt-4 md:mt-0">
              {serviceIllustrations[serviceKey]}
              <Link
                href="/#contact"
                onClick={() => trackCTAClick(t('cta.primary'), `service_detail_hero_${serviceKey}`)}
                className="group md:hidden inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold text-sm shadow-[0_0_24px_rgba(255,103,0,0.25)] hover:bg-primary-400 hover:shadow-[0_0_40px_rgba(255,103,0,0.45)] transition-all"
              >
                {t('cta.primary')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
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
