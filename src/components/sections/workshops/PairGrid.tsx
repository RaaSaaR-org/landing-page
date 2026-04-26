import { GlowCard } from '@/components/ui/GlowCard';
import type { ItemPair } from './types';

interface PairGridProps {
  items: ItemPair[];
  /** Tailwind grid template, defaults to 3-up at lg / 2-up at md / 1-up at base */
  cols?: '2' | '3';
}

export function PairGrid({ items, cols = '3' }: PairGridProps) {
  const colsClass =
    cols === '3'
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2';
  return (
    <div className={`max-w-5xl mx-auto grid ${colsClass} gap-6`}>
      {items.map((item, i) => (
        <GlowCard key={i} className="!p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
        </GlowCard>
      ))}
    </div>
  );
}
