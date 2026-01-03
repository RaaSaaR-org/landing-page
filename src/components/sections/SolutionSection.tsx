'use client';

import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { motion } from 'framer-motion';

const icons = {
  accessible: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  flexible: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  expertise: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  supported: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export function SolutionSection() {
  const t = useTranslations('solution');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section id="features" background="base">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 mx-auto rounded-full mb-6" />
          <p className="text-xl text-text-secondary">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {(['accessible', 'flexible', 'expertise', 'supported'] as const).map((key, index) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group text-center p-8 glass rounded-xl corner-brackets hover:shadow-[0_0_40px_rgba(255,103,0,0.15)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Icon with animated background */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary-500/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-primary-500/10 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform" />
                <div className="relative w-full h-full bg-surface-elevated rounded-2xl flex items-center justify-center border border-border-subtle group-hover:border-primary-500/50 transition-colors">
                  <div className="text-primary-500 group-hover:scale-110 transition-transform">
                    {icons[key]}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3">
                {t(`benefits.${key}.title`)}
              </h3>
              <p className="text-text-secondary text-sm">
                {t(`benefits.${key}.description`)}
              </p>

              {/* Number indicator */}
              <div className="mt-4 text-xs font-mono text-text-muted">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
