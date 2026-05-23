import Image from 'next/image';

/**
 * Use-cases hero — robot arm with targeting HUD. SVG source:
 * /public/illustrations/usecases-arm.svg
 */
export function UseCasesIllustration() {
  return (
    <div className="relative w-64 h-64 lg:w-80 lg:h-80">
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
