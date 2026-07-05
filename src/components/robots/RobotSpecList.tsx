'use client';

import { useTranslations } from 'next-intl';
import { categoryAccent, groupSpecs, type Robot, type RobotSpec } from '@/lib/robots';

interface RobotSpecListProps {
  robot: Robot;
  className?: string;
}

/** A value is shown as an instrument readout (mono) when it's a number, has a
 *  unit, or is a short code; longer descriptive strings (sensor lists) render
 *  as flowing text. */
function isReadout(spec: RobotSpec): boolean {
  if (spec.i18nValue) return false; // translated prose is always flowing text
  if (spec.unit) return true;
  if (typeof spec.value === 'number') return true;
  return String(spec.value).length <= 8;
}

/**
 * Grouped datasheet for the detail page — a stack of subsystem panels
 * (structure / motion / sensing / power / compute), each a bordered card with a
 * class-coded accent hairline and an `NN/NN` section index. Panels flow into two
 * packed columns so uneven groups don't leave gaps. Numeric specs render as mono
 * instrument readouts (value right-aligned against the label); descriptive specs
 * (sensor lists) stack the value under the label so long strings breathe.
 * Every row is keyed by spec id — what the planned compare view aligns on.
 */
export function RobotSpecList({ robot, className = '' }: RobotSpecListProps) {
  const t = useTranslations('robots');
  const accent = categoryAccent[robot.category];
  const groups = groupSpecs(robot);
  const total = String(groups.length).padStart(2, '0');

  return (
    <div className={`columns-1 md:columns-2 gap-6 ${className}`}>
      {groups.map(({ group, specs }, i) => (
        <section
          key={group}
          className="mb-6 break-inside-avoid rounded-xl border border-border-subtle bg-surface/40 overflow-hidden"
        >
          {/* class-coded accent hairline */}
          <div
            aria-hidden="true"
            className="h-px w-full"
            style={{ background: `linear-gradient(to right, ${accent.hex}, transparent 78%)` }}
          />
          <header className="flex items-center justify-between gap-4 px-5 pt-4 pb-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
              {t(`specGroups.${group}`)}
            </h3>
            <span className="font-mono text-[10px] tracking-widest tabular-nums" style={{ color: accent.hex }}>
              {String(i + 1).padStart(2, '0')}
              <span className="text-text-muted">/{total}</span>
            </span>
          </header>
          <dl className="px-5 pb-3 divide-y divide-border-subtle/60">
            {specs.map((spec) => {
              const value = spec.i18nValue
                ? t(`specValues.${robot.slug}.${spec.id}`)
                : spec.value;
              const readout = isReadout(spec);
              return (
                <div
                  key={spec.id}
                  className={readout ? 'flex items-baseline justify-between gap-4 py-2.5' : 'py-2.5'}
                >
                  <dt
                    className={`font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary ${
                      readout ? 'shrink-0' : 'mb-1.5'
                    }`}
                  >
                    {t(`specLabels.${spec.id}`)}
                  </dt>
                  <dd className={readout ? 'text-right' : ''}>
                    {readout ? (
                      <span className="inline-flex items-baseline gap-1.5">
                        <span className="font-mono text-text-primary text-base tabular-nums tracking-tight">
                          {value}
                        </span>
                        {spec.unit && (
                          <span className="font-mono text-text-secondary text-xs">{spec.unit}</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-text-secondary text-[13px] leading-relaxed">{value}</span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
