'use client';

import { motion } from 'framer-motion';
import { trackCTAClick } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { ScrollIndicator } from '@/components/ui';

// Neural network SVG background
function NeuralNetwork() {
  const nodes = [
    { cx: 80, cy: 120, delay: 0 },
    { cx: 200, cy: 80, delay: 0.5 },
    { cx: 350, cy: 150, delay: 1.0 },
    { cx: 500, cy: 60, delay: 0.3 },
    { cx: 650, cy: 130, delay: 0.8 },
    { cx: 780, cy: 70, delay: 1.2 },
    { cx: 920, cy: 140, delay: 0.6 },
    { cx: 1050, cy: 90, delay: 1.5 },
    { cx: 1180, cy: 160, delay: 0.2 },
    { cx: 1300, cy: 100, delay: 0.9 },
    { cx: 150, cy: 280, delay: 1.1 },
    { cx: 300, cy: 320, delay: 0.4 },
    { cx: 480, cy: 260, delay: 1.3 },
    { cx: 620, cy: 340, delay: 0.7 },
    { cx: 800, cy: 290, delay: 1.0 },
    { cx: 950, cy: 350, delay: 0.2 },
    { cx: 1100, cy: 300, delay: 0.8 },
    { cx: 1250, cy: 260, delay: 1.4 },
    { cx: 100, cy: 450, delay: 0.6 },
    { cx: 400, cy: 420, delay: 1.2 },
    { cx: 700, cy: 460, delay: 0.3 },
    { cx: 1000, cy: 430, delay: 0.9 },
    { cx: 1300, cy: 400, delay: 1.5 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    [0, 10], [1, 11], [2, 12], [3, 12], [4, 13], [5, 14], [6, 15], [7, 16], [8, 17],
    [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
    [10, 18], [12, 19], [14, 20], [16, 21], [17, 22],
    [18, 19], [19, 20], [20, 21], [21, 22],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6700" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {connections.map(([from, to], i) => (
        <line
          key={`conn-${i}`}
          x1={nodes[from].cx}
          y1={nodes[from].cy}
          x2={nodes[to].cx}
          y2={nodes[to].cy}
          stroke="url(#neural-grad)"
          strokeWidth="1"
          className="animate-neural-pulse"
          style={{
            animationDelay: `${(nodes[from].delay + nodes[to].delay) / 2}s`,
            strokeDasharray: '8 4',
          }}
        />
      ))}
      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="#FF6700"
          className="animate-node-glow"
          style={{ animationDelay: `${node.delay}s` }}
        />
      ))}
    </svg>
  );
}

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <NeuralNetwork />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary-500/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary-400/5 via-transparent to-transparent" />
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M8 14s-4 2-4 6h16c0-4-4-6-4-6" />
                <circle cx="12" cy="6" r="1" fill="currentColor" />
              </svg>
              {t('badge')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight"
          >
            <span className="text-text-primary">{t('title')}</span>
            <br />
            <span className="gradient-text">{t('titleAccent')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
          >
            {(['openSource', 'european', 'learning'] as const).map((key, i) => (
              <div key={key} className="flex items-center gap-2.5">
                <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-secondary-400' : 'bg-primary-500'}`} />
                <span className="text-sm md:text-base font-medium text-text-secondary tracking-wide uppercase">
                  {t(`pillars.${key}`)}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#services"
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
