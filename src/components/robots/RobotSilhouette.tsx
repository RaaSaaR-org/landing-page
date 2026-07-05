import type { CSSProperties } from 'react';
import type { RobotCategory } from '@/lib/robots';

interface RobotSilhouetteProps {
  category: RobotCategory;
  className?: string;
  style?: CSSProperties;
}

/**
 * Lightweight branded silhouette used as a static poster stand-in on gallery
 * cards (and anywhere a full 3D canvas would be overkill). Draws with
 * `currentColor`, so the caller controls its colour (incl. the class accent on
 * hover). Purely decorative.
 */
export function RobotSilhouette({ category, className = '', style }: RobotSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {category === 'humanoid' ? (
        <g>
          {/* head */}
          <rect x="49" y="16" width="22" height="18" rx="6" />
          <circle cx="60" cy="25" r="2.5" fill="currentColor" stroke="none" />
          {/* torso */}
          <rect x="44" y="38" width="32" height="34" rx="7" />
          {/* arms */}
          <path d="M44 44 L32 58 L34 74" />
          <path d="M76 44 L88 58 L86 74" />
          {/* legs */}
          <path d="M52 72 L50 104" />
          <path d="M68 72 L70 104" />
        </g>
      ) : (
        <g>
          {/* body */}
          <rect x="34" y="46" width="52" height="26" rx="8" />
          {/* head */}
          <path d="M86 52 L102 44 L102 60 L86 66" />
          <circle cx="96" cy="52" r="2.5" fill="currentColor" stroke="none" />
          {/* legs */}
          <path d="M42 72 L38 96 L46 96" />
          <path d="M56 72 L54 100 L62 100" />
          <path d="M72 72 L76 100 L84 100" />
          <path d="M82 72 L88 96 L96 96" />
        </g>
      )}
    </svg>
  );
}
