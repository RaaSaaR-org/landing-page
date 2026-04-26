import type { EngagementStep } from './types';

interface EngagementPathProps {
  steps: EngagementStep[];
  outcomeLabel: string;
  outcome: string;
}

export function EngagementPath({ steps, outcomeLabel, outcome }: EngagementPathProps) {
  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {steps.map((step, i) => (
          <div key={i} className="relative glow-card p-8">
            <div className="font-mono text-5xl font-bold text-primary-500/60 mb-3">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">{step.label}</h3>
            <p className="text-sm text-primary-400 italic mb-4">{step.workshop}</p>
            <p className="text-text-secondary leading-relaxed">{step.description}</p>
            {i < steps.length - 1 && (
              <svg
                className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="border-l-4 border-primary-500 pl-6 py-2">
          <h4 className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-2">
            {outcomeLabel}
          </h4>
          <p className="text-lg text-text-primary leading-relaxed">{outcome}</p>
        </div>
      </div>
    </>
  );
}
