import { GlowCard } from '@/components/ui/GlowCard';
import type { AudienceSegment } from './types';

interface AudienceSegmentsProps {
  segments: AudienceSegment[];
}

export function AudienceSegments({ segments }: AudienceSegmentsProps) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {segments.map((seg) => (
        <GlowCard key={seg.title} className="!p-8">
          <h3 className="text-2xl font-bold text-text-primary mb-2">{seg.title}</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-primary-400 mb-4">
            {seg.format}
          </p>
          <p className="text-text-secondary leading-relaxed">{seg.description}</p>
        </GlowCard>
      ))}
    </div>
  );
}
