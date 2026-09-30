'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container, Section } from '@/components/layout';
import { useTranslations } from 'next-intl';
import styles from './HomeSections.module.css';

const faqKeys = ['embodiedAi', 'cognitiveRobots', 'workshops', 'dataCollection', 'openSource', 'sovereignty', 'security', 'humanAssist', 'consulting', 'getStarted'];

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="faq" background="base">
      <Container>
        <div className={styles.faqLayout}>
          <h2 className={styles.faqTitle}>{t('title')}</h2>
          <div className={styles.faqList}>
            {faqKeys.map((key, index) => (
              <div key={key} className={styles.faqItem} data-open={openIndex === index}>
                <h3>
                  <button
                    id={`faq-question-${key}`}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${key}`}
                    className={styles.faqButton}
                  >
                    <span className={styles.faqIndex} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>{t(`questions.${key}.q`)}</span>
                    <span className={styles.faqToggle} aria-hidden="true">{openIndex === index ? '−' : '+'}</span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${key}`}
                      role="region"
                      aria-labelledby={`faq-question-${key}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.25 }}
                      className={styles.faqAnswer}
                    >
                      <p>{t(`questions.${key}.a`)}</p>
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
