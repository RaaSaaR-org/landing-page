'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToContent}
      className={`flex flex-col items-center gap-2 text-text-muted hover:text-primary-500 transition-colors ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      aria-label="Scroll down"
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
}
