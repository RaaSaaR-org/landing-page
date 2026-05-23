import Image from 'next/image';

/**
 * Data hero — multi-stream telemetry dashboard. SVG source:
 * /public/illustrations/data-telemetry.svg
 */
export function DataIllustration() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/data-telemetry.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
