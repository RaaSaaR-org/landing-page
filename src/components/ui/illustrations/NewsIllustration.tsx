import Image from 'next/image';

/**
 * News hero — live article feed. SVG source:
 * /public/illustrations/news-feed.svg
 */
export function NewsIllustration() {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <Image
        src="/illustrations/news-feed.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="select-none"
      />
    </div>
  );
}
