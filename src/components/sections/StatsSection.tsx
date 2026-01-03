'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { AnimatedCounter } from '@/components/ui';
import { motion } from 'framer-motion';

// Stat configuration for animated values
const statConfig = {
  businesses: { value: 150000, prefix: '€', suffix: '+', animated: true },
  jobs: { value: null, animated: false }, // "2-4" - complex format
  researchers: { value: null, animated: false }, // "1-1,000+" - complex format
  area: { value: 100, prefix: '', suffix: '%', animated: true },
};

export function StatsSection() {
  const t = useTranslations('stats');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section background="surface-elevated" className="border-y border-border-subtle">
      <Container>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {(['businesses', 'jobs', 'researchers', 'area'] as const).map((key) => {
            const config = statConfig[key];

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="text-center p-8 rounded-xl glass corner-brackets group hover:bg-surface/50 transition-all"
              >
                <div className="text-5xl md:text-6xl font-bold mb-3 gradient-text">
                  {config.animated && config.value ? (
                    <AnimatedCounter
                      value={config.value}
                      prefix={config.prefix}
                      suffix={config.suffix}
                      duration={2.5}
                    />
                  ) : (
                    <span>{t(`${key}.value`)}</span>
                  )}
                </div>
                <div className="text-text-secondary text-lg">
                  {t(`${key}.label`)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
