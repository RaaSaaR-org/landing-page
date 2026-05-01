import type { PublicSectorItem } from './types';

interface PublicSectorGridProps {
  items: PublicSectorItem[];
}

export function PublicSectorGrid({ items }: PublicSectorGridProps) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, i) => (
        <div key={i} className="p-6 rounded-xl bg-surface border border-border-subtle">
          <h3 className="text-lg font-semibold text-text-primary leading-tight">{item.title}</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-primary-400 mt-1 mb-3">
            {item.subtitle}
          </p>
          <p className="text-text-secondary leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
