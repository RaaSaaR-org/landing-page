'use client';

import { useTranslations } from 'next-intl';
import { LottiePlayer } from '@/components/ui/LottiePlayer';

// Label anchors sit next to the three stations the orbiting pulse lights up
// (positions mirror the node coordinates baked into learning-loop.json).
const labels = [
  { key: 'deploy', style: { top: '5%', left: '50%' } },
  { key: 'data', style: { top: '73%', left: '90%' } },
  { key: 'knowledge', style: { top: '73%', left: '10%' } },
] as const;

export function LearningLoop() {
  const t = useTranslations('whyEmai.loop');

  return (
    <div className="relative mb-16 flex flex-col items-center">
      <div className="relative w-full max-w-[300px] aspect-square mx-auto">
        <LottiePlayer
          src="/lottie/learning-loop.json"
          loop
          label={t('aria')}
          className="absolute inset-0"
        />
        {labels.map(({ key, style }) => (
          <span
            key={key}
            style={style}
            className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-text-secondary pointer-events-none select-none"
          >
            {t(key)}
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm font-mono tracking-wide text-text-tertiary text-center">
        {t('caption')}
      </p>
    </div>
  );
}
