'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { GridBackground, ScrollIndicator } from '@/components/ui';

// Animated counter for hero stats
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return <span>{display.toLocaleString('de-DE')}{suffix}</span>;
}

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      {/* Animated Particle Network */}
      <GridBackground
        className="z-0"
        particleCount={100}
        connectionDistance={180}
      />

      {/* Central Glowing Orb - The "WOW" element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative"
        >
          {/* Outer ring - pulsing */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-32 md:-inset-48 rounded-full border-2 border-primary-500/30"
          />

          {/* Middle ring */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-20 md:-inset-32 rounded-full border border-primary-500/40"
          />

          {/* Inner glowing orb */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 60px 30px rgba(255, 103, 0, 0.3)',
                '0 0 100px 50px rgba(255, 103, 0, 0.5)',
                '0 0 60px 30px rgba(255, 103, 0, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary-500/80 via-primary-600/60 to-primary-700/40 blur-xl"
          />

          {/* Core */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-8 md:inset-12 rounded-full border border-primary-400/50"
            style={{
              background: 'conic-gradient(from 0deg, rgba(255, 103, 0, 0.5), transparent, rgba(45, 212, 191, 0.3), transparent, rgba(255, 103, 0, 0.5))',
            }}
          />
        </motion.div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagon 1 */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-[10%] w-32 h-32 border border-primary-500/30 rotate-12"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />

        {/* Hexagon 2 */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute bottom-1/4 right-[15%] w-24 h-24 border border-secondary-400/30 -rotate-12"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        />

        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-400/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider uppercase bg-gradient-to-r from-primary-500/20 to-secondary-400/20 text-primary-400 border border-primary-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Robots as a Service
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight text-text-primary"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-text-secondary mb-6 max-w-3xl mx-auto font-light"
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg text-text-muted mb-10 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">
                <AnimatedNumber value={150000} suffix="€+" />
              </div>
              <div className="text-sm text-text-muted">Savings per Robot</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary-400">
                2-4 Weeks
              </div>
              <div className="text-sm text-text-muted">Deployment Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500">
                <AnimatedNumber value={100} suffix="%" />
              </div>
              <div className="text-sm text-text-muted">Service Included</div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#features"
              onClick={() => trackCTAClick(t('cta'), 'hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg overflow-hidden shadow-[0_0_30px_rgba(255,103,0,0.3)] hover:shadow-[0_0_50px_rgba(255,103,0,0.5)] transition-shadow"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative flex items-center gap-2">
                {t('cta')}
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.a>
            <a
              href="#contact"
              onClick={() => trackCTAClick(t('ctaSecondary'), 'hero')}
              className="px-8 py-4 text-text-secondary hover:text-primary-400 font-medium text-lg transition-colors border border-border-subtle hover:border-primary-500/50 rounded-xl"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ScrollIndicator />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
