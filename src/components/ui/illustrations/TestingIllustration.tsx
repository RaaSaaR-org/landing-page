import Image from 'next/image';

/**
 * Testing hero — multi-gauge dashboard. SVG source:
 * /public/illustrations/testing-gauge.svg
 */
export function TestingIllustration() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
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
