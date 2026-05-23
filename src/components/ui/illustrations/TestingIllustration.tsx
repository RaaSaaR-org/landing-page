import Image from 'next/image';

/**
 * Testing hero — multi-gauge dashboard. SVG source:
 * /public/illustrations/testing-gauge.svg
 */
export function TestingIllustration() {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/testing-gauge.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
