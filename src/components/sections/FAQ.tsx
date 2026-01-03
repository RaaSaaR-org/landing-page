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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-4">
            {faqKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl overflow-hidden glass transition-all ${
                  openIndex === index
                    ? 'shadow-[0_0_30px_rgba(255,103,0,0.15)]'
                    : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="group w-full px-6 py-5 flex items-center gap-4 hover:bg-surface-elevated/50 transition-all text-left"
                >
                  {/* Number */}
                  <span className={`font-mono text-sm transition-colors ${
                    openIndex === index ? 'text-primary-500' : 'text-text-muted'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Separator line */}
                  <span className={`h-px flex-grow max-w-8 transition-all ${
                    openIndex === index
                      ? 'bg-primary-500'
                      : 'bg-border-subtle group-hover:bg-primary-500/50'
                  }`} />

                  {/* Question */}
                  <span className="font-semibold text-text-primary flex-grow pr-4">
                    {t(`questions.${key}.q`)}
                  </span>

                  {/* Toggle icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    openIndex === index
                      ? 'bg-primary-500 rotate-180'
                      : 'bg-surface-elevated group-hover:bg-primary-500/20'
                  }`}>
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
                          {t(`questions.${key}.a`)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
