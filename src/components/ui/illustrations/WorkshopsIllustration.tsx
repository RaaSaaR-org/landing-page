import Image from 'next/image';

/**
 * Workshops hero — active session diagram. SVG source:
 * /public/illustrations/workshops-session.svg
 */
export function WorkshopsIllustration() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
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
