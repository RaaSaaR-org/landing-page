'use client';

import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-200 mb-8 max-w-4xl mx-auto font-light">
              {t('subtitle')}
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#features"
              onClick={() => trackCTAClick(t('cta'), 'hero')}
              className="px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {t('cta')}
            </a>
            <a
              href="#contact"
              onClick={() => trackCTAClick(t('ctaSecondary'), 'hero')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <a
              href="#problem"
              className="inline-block text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6 animate-bounce mx-auto"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
