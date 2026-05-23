type Size = 'sm' | 'md' | 'lg';

interface BrandTaglineProps {
  size?: Size;
  className?: string;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-[10px] gap-1',
  md: 'text-xs gap-1.5',
  lg: 'text-sm gap-2',
};

/**
 * "EMBODIED ARTIFICIAL INTELLIGENCE" tagline with brand color split.
 *
 * Matches the visitenkarten / company-flyer tagline recipe:
 *   - Geist Mono Bold, UPPERCASE, 0.14em tracking (one of the three brand type roles)
 *   - "Embodied" white, "Artificial Intelligence" orange
 */
export function BrandTagline({ size = 'md', className = '' }: BrandTaglineProps) {
  return (
    <div
      className={`inline-flex items-center whitespace-nowrap font-mono font-bold uppercase ${SIZE_CLASSES[size]} ${className}`}
      style={{ letterSpacing: '0.14em' }}
    >
      <span className="text-text-primary">Embodied</span>
      <span className="text-primary-500">Artificial Intelligence</span>
    </div>
  );
}
