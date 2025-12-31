'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section } from '@/components/layout';
import { useTranslations } from 'next-intl';

const faqKeys = ['what', 'why', 'cost', 'timeline', 'jobs', 'target', 'technology', 'support'];

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" background="base">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
            {t('title')}
          </h2>

          <div className="space-y-4">
            {faqKeys.map((key, index) => (
              <div
                key={key}
                className={`border rounded-xl overflow-hidden bg-surface shadow-lg transition-all ${
                  openIndex === index
                    ? 'border-primary-500 shadow-xl'
                    : 'border-border-subtle hover:border-primary-500/50'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="group w-full px-6 py-5 flex justify-between items-center hover:bg-surface-elevated transition-all text-left"
                >
                  <span className="font-semibold text-text-primary pr-4">
                    {t(`questions.${key}.q`)}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-all ${
                      openIndex === index
                        ? 'rotate-180 text-primary-500'
                        : 'text-text-muted group-hover:text-primary-500'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-text-secondary">
                        {t(`questions.${key}.a`)}
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
  );
}
