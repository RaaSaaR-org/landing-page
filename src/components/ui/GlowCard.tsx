'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  cornerBrackets?: boolean;
  glowOnHover?: boolean;
}

export function GlowCard({
  children,
  className = '',
  hoverEffect = true,
  cornerBrackets = false,
  glowOnHover = true,
}: GlowCardProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`
        studio-card group/card relative p-8 rounded-xl overflow-hidden
        bg-surface border border-border-subtle
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-xl' : ''}
        ${cornerBrackets ? 'corner-brackets' : ''}
        ${className}
      `}
      whileHover={hoverEffect && !reduceMotion ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient border overlay */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 103, 0, 0.3), rgba(45, 212, 191, 0.2))',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />
      )}

      {/* Inner glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 103, 0, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
