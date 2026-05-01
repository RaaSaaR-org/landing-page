import { GlowCard } from '@/components/ui/GlowCard';
import type { WorkshopTier } from './types';

interface WorkshopTierCardProps {
  tier: WorkshopTier;
  audienceLabel: string;
}

export function WorkshopTierCard({ tier, audienceLabel }: WorkshopTierCardProps) {
  return (
    <GlowCard className="!p-8 md:!p-12" hoverEffect={false}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-5xl font-bold text-primary-500/60">
              {tier.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-primary-400 px-2 py-1 rounded bg-primary-500/10">
              {tier.category}
            </span>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{tier.title}</h3>
            <p className="text-lg text-primary-400 italic">{tier.subline}</p>
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-mono uppercase tracking-wider text-text-muted text-xs mb-1">
                Format
              </dt>
              <dd className="text-text-secondary">{tier.format}</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-wider text-text-muted text-xs mb-1">
                {audienceLabel}
              </dt>
              <dd className="text-text-secondary">{tier.audience}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <p className="text-lg text-text-secondary leading-relaxed">{tier.promise}</p>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-4">
              {tier.phasesTitle}
            </h4>
            <ol className="space-y-3">
              {tier.phases.map((phase, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-sm text-primary-500/70 flex-shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-semibold text-text-primary">{phase.title}</span>
                    <span className="text-text-secondary"> — {phase.description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-2">
              {tier.assetsLabel}
            </h4>
            <p className="text-text-secondary leading-relaxed">{tier.assets}</p>
          </div>

          <div className="border-l-4 border-primary-500 pl-5 py-1">
            <h4 className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-1">
              {tier.outcomeLabel}
            </h4>
            <p className="text-text-primary font-semibold leading-relaxed">{tier.outcome}</p>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
