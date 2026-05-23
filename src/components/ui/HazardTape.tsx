interface HazardTapeProps {
  /** Tape band height. Default 22px (visually similar to the print 22mm at typical reading distance). */
  height?: number;
  /** Position the tape absolutely against the parent. Defaults to relative inline block. */
  position?: 'relative' | 'absolute-top' | 'absolute-bottom';
  className?: string;
}

const POSITION_STYLES: Record<NonNullable<HazardTapeProps['position']>, React.CSSProperties> = {
  relative: { position: 'relative', width: '100%' },
  'absolute-top':    { position: 'absolute', top: 0,    left: 0, right: 0, width: '100%' },
  'absolute-bottom': { position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%' },
};

/**
 * Hazard-tape "Absperrband" eye-catcher — shared brand asset (orange + black diagonal stripes,
 * with subtle wear texture). Use for section dividers, hero accents, "we mean business" framing.
 * Source: assets/brand/media/hazard-tape.svg (mirrored to /hazard-tape.svg).
 */
export function HazardTape({ height = 22, position = 'relative', className = '' }: HazardTapeProps) {
  return (
    <img
      src="/hazard-tape.svg"
      alt=""
      aria-hidden="true"
      className={`block pointer-events-none select-none ${className}`}
      style={{
        ...POSITION_STYLES[position],
        height: `${height}px`,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  );
}
