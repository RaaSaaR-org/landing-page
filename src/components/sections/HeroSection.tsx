'use client';

import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Animated Gradient Orbs - Repositioned for better balance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary orb - orange (top right) */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/45 to-primary-600/15 rounded-full blur-3xl animate-float-slow" />
        {/* Secondary orb - teal (bottom left) */}
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-400/35 to-secondary-500/10 rounded-full blur-3xl animate-float-medium" />
        {/* Tertiary orb - orange (center right) */}
        <div className="absolute top-1/3 right-1/5 w-80 h-80 bg-gradient-to-bl from-primary-400/30 to-transparent rounded-full blur-2xl animate-float-fast" />
        {/* Accent orb - mixed (center left) */}
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-secondary-300/20 to-primary-300/10 rounded-full blur-2xl animate-float-reverse" />
        {/* Small accent orb */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-primary-500/20 rounded-full blur-xl animate-float-medium" />
      </div>

      {/* Content - Tighter spacing */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-4 md:mb-6 leading-tight tracking-tight"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-4 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="text-base sm:text-lg text-text-muted mb-8 max-w-xl mx-auto"
          >
            {t('description')}
          </motion.p>

          {/* CTAs - Primary button + Secondary text link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <a
              href="#features"
              onClick={() => trackCTAClick(t('cta'), 'hero')}
              className="group px-8 py-3.5 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-400 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-orange"
            >
              {t('cta')}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              onClick={() => trackCTAClick(t('ctaSecondary'), 'hero')}
              className="px-6 py-3.5 text-primary-400 hover:text-primary-300 font-medium text-lg underline underline-offset-4 decoration-primary-500/50 hover:decoration-primary-400 transition-all"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
