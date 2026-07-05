import type { ReactNode } from 'react';

interface RobotStatProps {
  /** Pre-resolved label (mono, uppercase). */
  label: ReactNode;
  value: string | number;
  unit?: string;
  /** Readout size. `sm` for cards, `md` default, `lg` for the detail hero strip. */
  size?: 'sm' | 'md' | 'lg';
  /** Tailwind text-color class for the numeral (e.g. a category accent). */
  valueClassName?: string;
  className?: string;
}

const valueSize = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-2xl md:text-4xl',
};

const labelSize = {
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-[11px]',
};

/**
 * A single instrument-style readout: a mono label above a large tabular-mono
 * numeral with a small trailing unit. This is the datasheet's atomic unit —
 * reused on cards, the detail hero metric strip, and the grouped spec list, so
 * every number on the page reads the same way.
 */
export function RobotStat({
  label,
  value,
  unit,
  size = 'md',
  valueClassName = 'text-text-primary',
  className = '',
}: RobotStatProps) {
  return (
    <div className={className}>
      <div
        className={`font-mono uppercase tracking-[0.14em] text-text-secondary ${labelSize[size]} mb-1`}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-mono font-medium tabular-nums leading-none tracking-tight ${valueSize[size]} ${valueClassName}`}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-text-secondary text-xs leading-none">{unit}</span>
        )}
      </div>
    </div>
  );
}
