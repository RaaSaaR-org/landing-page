import Image from 'next/image';

/**
 * Consulting hero — strategic compass. SVG source lives in
 * /public/illustrations/consulting-compass.svg so the artwork can be edited
 * with any vector tool without touching JSX.
 */
export function ConsultingIllustration() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/consulting-compass.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
