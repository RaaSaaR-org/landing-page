'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { categoryAccent, type Robot, type RobotCategory } from '@/lib/robots';
import { RobotCard } from './RobotCard';

type Filter = 'all' | RobotCategory;

const PRIMARY = '#FF6700';

/**
 * Filterable robot registry: a mono segmented control (All / Humanoid /
 * Quadruped, with live counts) over the class-coded card grid. Client-side so
 * filtering is instant; also the seam where the planned compare view will hang.
 */
export function RobotRegistry({ robots }: { robots: Robot[] }) {
  const t = useTranslations('robots');
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(
    () => ({
      all: robots.length,
      humanoid: robots.filter((r) => r.category === 'humanoid').length,
      quadruped: robots.filter((r) => r.category === 'quadruped').length,
    }),
    [robots]
  );

  const shown = filter === 'all' ? robots : robots.filter((r) => r.category === filter);

  const options: { key: Filter; label: string; count: number; hex: string }[] = [
    { key: 'all', label: t('filter.all'), count: counts.all, hex: PRIMARY },
    {
      key: 'humanoid',
      label: t('categories.humanoid'),
      count: counts.humanoid,
      hex: categoryAccent.humanoid.hex,
    },
    {
      key: 'quadruped',
      label: t('categories.quadruped'),
      count: counts.quadruped,
      hex: categoryAccent.quadruped.hex,
    },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-border-subtle">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('registry.eyebrow')}>
          {options.map((o) => {
            const active = filter === o.key;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => setFilter(o.key)}
                aria-pressed={active}
                className={`font-mono text-[11px] uppercase tracking-[0.14em] px-3.5 py-2 rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                  active
                    ? ''
                    : 'border-border-subtle text-text-secondary hover:text-text-primary hover:border-border'
                }`}
                style={
                  active
                    ? { borderColor: `${o.hex}80`, color: o.hex, backgroundColor: `${o.hex}14` }
                    : undefined
                }
              >
                {o.label}
                <span className="ml-2 tabular-nums opacity-70">
                  {String(o.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary tabular-nums">
          {t('registry.count', { shown: shown.length, total: counts.all })}
        </span>
      </div>

      {/* Grid */}
      <div
        key={filter}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-count-up"
      >
        {shown.map((robot) => (
          <RobotCard key={robot.slug} robot={robot} />
        ))}
      </div>
    </div>
  );
}
