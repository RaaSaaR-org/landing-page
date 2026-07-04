'use client';

interface MembershipBadgeProps {
  /** Rendered width/height in px. */
  size?: number;
  /** Accessible label / link title. */
  label?: string;
  className?: string;
}

/**
 * EastSideFab Innovation Community membership plaque.
 * White by default, fades to the official yellow variant on hover.
 * Links out to eastsidefab.de.
 */
export function MembershipBadge({
  size = 64,
  label = 'Mitglied der EastSideFab Innovation Community',
  className = '',
}: MembershipBadgeProps) {
  return (
    <a
      href="https://eastsidefab.de"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group relative inline-block transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/badges/esf-mitglied-weiss.svg"
        alt=""
        width={size}
        height={size}
        className="block w-full h-full transition-opacity duration-300 group-hover:opacity-0"
      />
      <img
        src="/badges/esf-mitglied-gelb.svg"
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        className="absolute inset-0 block w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </a>
  );
}
