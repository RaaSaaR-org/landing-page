import { PairGrid } from './PairGrid';
import type { ItemPair } from './types';

interface AboutPositioningProps {
  items: ItemPair[];
  differentiatorLabel: string;
  differentiator: string;
  antiLabel: string;
  anti: string;
}

export function AboutPositioning({
  items,
  differentiatorLabel,
  differentiator,
  antiLabel,
  anti,
}: AboutPositioningProps) {
  return (
    <>
      <div className="mb-10">
        <PairGrid items={items} cols="2" />
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-l-4 border-primary-500 pl-6 py-2">
          <h4 className="font-mono text-sm uppercase tracking-wider text-primary-400 mb-2">
            {differentiatorLabel}
          </h4>
          <p className="text-lg text-text-primary leading-relaxed">{differentiator}</p>
        </div>
        <div className="border-l-4 border-secondary-400 pl-6 py-2">
          <h4 className="font-mono text-sm uppercase tracking-wider text-secondary-400 mb-2">
            {antiLabel}
          </h4>
          <p className="text-lg text-text-secondary leading-relaxed">{anti}</p>
        </div>
      </div>
    </>
  );
}
