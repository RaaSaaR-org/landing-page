'use client';

import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      {/* Animated Gradient Orbs - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary orb - orange (top right) */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/50 to-primary-600/20 rounded-full blur-3xl animate-float-slow" />

        {/* Secondary orb - teal (bottom left) */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-400/40 to-secondary-500/10 rounded-full blur-3xl animate-float-medium" />

        {/* Tertiary orb - orange (center right) */}
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-gradient-to-bl from-primary-400/35 to-transparent rounded-full blur-2xl animate-float-fast" />

        {/* Accent orb - mixed (center left) */}
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-secondary-300/25 to-primary-300/15 rounded-full blur-2xl animate-float-reverse" />

        {/* Small accent orb */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-primary-500/25 rounded-full blur-xl animate-float-medium" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-[1.1] tracking-tight"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="text-xl sm:text-2xl md:text-3xl text-primary-400 mb-10 max-w-3xl mx-auto font-light"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#features"
              onClick={() => trackCTAClick(t('cta'), 'hero')}
              className="px-10 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-400 transition-all font-semibold text-lg shadow-xl hover:shadow-orange"
            >
              {t('cta')}
            </a>
            <a
              href="#contact"
              onClick={() => trackCTAClick(t('ctaSecondary'), 'hero')}
              className="px-10 py-4 bg-surface/80 backdrop-blur-sm text-text-primary border border-border rounded-xl hover:bg-surface-elevated hover:border-primary-500/50 transition-all font-semibold text-lg"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16"
          >
            <a
              href="#problem"
              className="inline-flex flex-col items-center text-text-muted hover:text-primary-500 transition-colors"
            >
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
