import Image from 'next/image';

/**
 * Use-cases hero — robot arm with targeting HUD. SVG source:
 * /public/illustrations/usecases-arm.svg
 */
export function UseCasesIllustration() {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/usecases-arm.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
