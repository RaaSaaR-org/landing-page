'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  categoryAccent,
  pickSpecs,
  type Robot,
} from '@/lib/robots';
import { RobotStat } from './RobotStat';
import { RobotSilhouette } from './RobotSilhouette';
import { Designation } from './Designation';

interface RobotCardProps {
  robot: Robot;
}

/**
 * Registry tile for one robot: a quiet version of the diagnostic viewport
 * (mini corner ticks + measurement ruler + designation stamp) over a class-
 * coded accent, with the key specs as instrument readouts. Links to the unit's
 * datasheet page. The whole card activates in the class colour on hover — and,
 * for keyboard users, on focus (branded focus ring + mirrored affordances).
 */
export function RobotCard({ robot }: RobotCardProps) {
  const t = useTranslations('robots');
  const accent = categoryAccent[robot.category];
  const highlights = pickSpecs(robot, robot.highlightSpecs);

  return (
    <Link
      href={`/robots/${robot.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:ring-[color:var(--rh)]"
      style={{ ['--rh' as string]: accent.hex }}
    >
      <article className="relative h-full flex flex-col overflow-hidden rounded-xl bg-surface border border-border-subtle transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-hover:shadow-xl group-focus-visible:shadow-xl">
        {/* Accent hairline — brightens on hover/focus */}
        <div
          aria-hidden="true"
          className="h-px w-full opacity-50 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ background: `linear-gradient(to right, ${accent.hex}, transparent 85%)` }}
        />

        {/* Accent border ring on hover/focus */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl border opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ borderColor: `${accent.hex}55` }}
        />

        {/* Visual — quiet diagnostic frame */}
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-surface-elevated to-base flex items-center justify-center">
          <div aria-hidden="true" className="absolute inset-0 grid-dots opacity-[0.15]" />

          {/* Measurement ruler */}
          <div
            aria-hidden="true"
            className="absolute left-2 top-6 bottom-6 w-1.5 opacity-40 transition-opacity duration-300 group-hover:opacity-80 group-focus-visible:opacity-80"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, ${accent.hex} 0, ${accent.hex} 1px, transparent 1px, transparent 10px)`,
              maskImage: 'linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)',
            }}
          />

          {/* Corner ticks */}
          <span aria-hidden="true" className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l opacity-40 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" style={{ borderColor: accent.hex }} />
          <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r opacity-40 transition-opacity duration-300 group-hover:opacity-90 group-focus-visible:opacity-90" style={{ borderColor: accent.hex }} />

          {robot.poster ? (
            <Image
              src={robot.poster}
              alt={robot.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-6 pt-9 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
            />
          ) : (
            <RobotSilhouette
              category={robot.category}
              className="relative w-24 h-24 text-text-muted/70 transition-all duration-500 group-hover:scale-110 group-hover:[color:var(--rh)]"
              style={{ ['--rh' as string]: accent.hex }}
            />
          )}

          {/* Designation stamp */}
          <Designation robot={robot} className="absolute top-3 left-1/2 -translate-x-1/2" />

          {/* Category pill */}
          <span
            className={`absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.16em] px-2 py-1 rounded ${accent.bg} ${accent.text} backdrop-blur-sm`}
          >
            {t(`categories.${robot.category}`)}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            {robot.maker}
          </span>
          <h3
            className="text-xl font-bold text-text-primary mt-0.5 mb-4 tracking-tight transition-colors group-hover:[color:var(--rh)] group-focus-visible:[color:var(--rh)]"
            style={{ ['--rh' as string]: accent.hex }}
          >
            {robot.name}
          </h3>

          {/* Instrument readouts */}
          <div className="grid grid-cols-3 divide-x divide-border-subtle border-t border-border-subtle -mx-1">
            {highlights.map((spec) => (
              <div key={spec.id} className="px-3 py-3">
                <RobotStat
                  size="sm"
                  label={t(`specLabels.${spec.id}`)}
                  value={spec.value}
                  unit={spec.unit}
                />
              </div>
            ))}
          </div>

          {/* CTA — uniform across classes; picks up the class colour on hover/focus */}
          <span
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition-all group-hover:gap-2.5 group-focus-visible:gap-2.5 group-hover:[color:var(--rh)] group-focus-visible:[color:var(--rh)]"
            style={{ ['--rh' as string]: accent.hex }}
          >
            {t('card.cta')}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
