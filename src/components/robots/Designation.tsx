import { designation, type Robot } from '@/lib/robots';

interface DesignationProps {
  robot: Robot;
  /** Adds a translucent chip backing — use only when it sits over the 3D canvas. */
  chip?: boolean;
  className?: string;
}

/**
 * The class designation stamp (e.g. `HUM · G1 · EDU`) — the page's recurring
 * signature token. Centralised so every appearance shares one spec (mono,
 * 10px, 0.18em tracking, text-secondary); pass `chip` for the over-canvas
 * variant. No hooks, so it renders in server components too.
 */
export function Designation({ robot, chip = false, className = '' }: DesignationProps) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary ${
        chip ? 'bg-base/40 backdrop-blur-sm rounded px-2 py-1' : ''
      } ${className}`}
    >
      {designation(robot)}
    </span>
  );
}
