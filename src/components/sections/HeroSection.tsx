'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { ScrollIndicator } from '@/components/ui';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      {/* ============ ATMOSPHERIC BACKDROP ============ */}
      {/* Subtle dotted grid — recedes into depth */}
      <div className="absolute inset-0 grid-dots opacity-[0.07] pointer-events-none" />

      {/* Soft warm spotlight ellipse behind the wordmark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] aspect-[2/1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,103,0,0.18) 0%, rgba(255,103,0,0.05) 35%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Vertical light shaft — descends from above through the wordmark center */}
      <div
        className="absolute left-1/2 top-0 w-[1px] h-[55%] pointer-events-none light-shaft"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,103,0,0.45) 0%, rgba(255,103,0,0.12) 60%, transparent 100%)',
        }}
      />

      {/* Faint warm horizon glow at the bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom, rgba(255,103,0,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Deep radial vignette — pulls focus to center */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_75%)]" />

      {/* Sparse depth particles — slow drift, no connecting lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[14%] w-1 h-1 rounded-full bg-primary-500/60 animate-float-slow" />
        <div className="absolute top-[32%] right-[18%] w-[3px] h-[3px] rounded-full bg-secondary-400/45 animate-float-medium" />
        <div className="absolute top-[68%] left-[24%] w-[2px] h-[2px] rounded-full bg-primary-500/55 animate-float-fast" />
        <div className="absolute top-[78%] right-[16%] w-[2px] h-[2px] rounded-full bg-primary-500/70 animate-float-reverse" />
        <div className="absolute top-[48%] left-[8%] w-[2px] h-[2px] rounded-full bg-secondary-400/40 animate-float-slow" />
        <div className="absolute top-[26%] right-[40%] w-[2px] h-[2px] rounded-full bg-primary-500/45 animate-float-medium" />
        <div className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-primary-500/50 animate-float-fast" />
      </div>

      {/* Scan line — ultra subtle vertical sweep */}
      <div
        className="absolute inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-primary-500/[0.04] to-transparent"
        style={{ animation: 'scanSweep 12s linear infinite' }}
      />

      {/* System-online status row (top) — hidden on mobile to avoid wrapping */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="hidden sm:flex absolute top-24 left-1/2 -translate-x-1/2 z-10 items-center gap-3 font-mono text-[10px] text-text-muted uppercase tracking-[0.25em] whitespace-nowrap"
      >
        <span className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary-400" />
        </span>
        <span>System · Online</span>
        <span className="text-text-tertiary">·</span>
        <span>v2026</span>
      </motion.div>

      {/* HUD corner brackets framing the content */}
      <div className="absolute inset-x-6 sm:inset-x-12 md:inset-x-20 top-40 bottom-24 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-primary-500/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-secondary-400/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-primary-500/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-secondary-400/40" />
      </div>

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-gradient-to-r from-primary-500/10 to-secondary-400/10 text-primary-400 border border-primary-500/25 backdrop-blur-sm">
              <span className="w-1 h-1 rounded-full bg-primary-500" />
              {t('badge')}
              <span className="w-1 h-1 rounded-full bg-secondary-400" />
            </span>
          </motion.div>

          {/* Brand mark — Em fades in, AI sweeps in left-to-right with a scan edge; continuous breathing glow afterwards */}
          <h1 className="wordmark-breath text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-6 inline-flex items-baseline">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-text-primary"
            >
              Em
            </motion.span>
            <span className="relative inline-block overflow-hidden">
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.0, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                className="text-primary-500 inline-block"
              >
                AI
              </motion.span>
              {/* Scan edge — bright luminous bar that wipes along the AI reveal */}
              <motion.span
                aria-hidden="true"
                initial={{ left: 0, opacity: 0 }}
                animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.0, delay: 0.7, ease: [0.65, 0, 0.35, 1], times: [0, 0.05, 0.95, 1] }}
                className="absolute top-0 bottom-0 w-[2px] bg-primary-300"
                style={{ boxShadow: '0 0 18px 4px rgba(255,140,40,0.9), 0 0 36px 8px rgba(255,103,0,0.5)' }}
              />
            </span>
          </h1>

          {/* Brand tagline — hairlines extend on entrance. Hairlines hidden on mobile (<sm) to keep the row from overflowing on small screens. */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.15, ease: 'easeOut' }}
              style={{ transformOrigin: 'right center' }}
              className="hidden sm:inline-block h-px w-16 sm:w-24 bg-primary-500/40"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-mono font-bold text-[11px] sm:text-[16px] uppercase"
              style={{ letterSpacing: '0.14em' }}
            >
              <span className="text-text-primary">Embodied</span>
              <span className="ml-2 text-primary-500">Artificial Intelligence</span>
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.15, ease: 'easeOut' }}
              style={{ transformOrigin: 'left center' }}
              className="hidden sm:inline-block h-px w-16 sm:w-24 bg-primary-500/40"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="text-base sm:text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* Pillars — vertical hairline separators between items */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.55 }}
            className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-3 mb-12"
          >
            {(['openSource', 'european', 'learning'] as const).map((key, i) => (
              <Fragment key={key}>
                {i > 0 && <span className="hidden sm:inline-block w-px h-3.5 bg-border-subtle" aria-hidden="true" />}
                <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-text-secondary">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-secondary-400' : 'bg-primary-500'}`} />
                  <span>{t(`pillars.${key}`)}</span>
                </div>
              </Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
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
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>
            <a
              href="#services"
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
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ScrollIndicator />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  );
}
