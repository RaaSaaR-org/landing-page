import Image from 'next/image';

/**
 * Workshops hero — active session diagram. SVG source:
 * /public/illustrations/workshops-session.svg
 */
export function WorkshopsIllustration() {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/workshops-session.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
