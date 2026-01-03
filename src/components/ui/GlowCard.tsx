'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className={`
        relative p-8 rounded-xl overflow-hidden
        bg-surface border border-border-subtle
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1' : ''}
        ${cornerBrackets ? 'corner-brackets' : ''}
        ${className}
      `}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient border overlay */}
      {glowOnHover && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
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
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
