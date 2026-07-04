'use client';

import { DotLottieReact, type DotLottie, setWasmUrl } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef, useState } from 'react';

// Self-host the renderer WASM. dotLottie otherwise fetches it from a CDN
// (jsdelivr/unpkg), which the site's CSP (`connect-src 'self'`) blocks — so the
// animation never renders. A same-origin URL is covered by 'self'.
if (typeof window !== 'undefined') {
  setWasmUrl('/lottie/dotlottie-player.wasm');
}

interface LottiePlayerProps {
  /** Path under /public, e.g. "/lottie/hero-accent.lottie" */
  src: string;
  /** Loop the animation (default false — one-shot). */
  loop?: boolean;
  /** Aria label; if decorative, leave undefined and it's marked aria-hidden. */
  label?: string;
  className?: string;
}

export function LottiePlayer({ src, loop = false, label, className = '' }: LottiePlayerProps) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Play only when in view (and not when reduced motion is requested).
  useEffect(() => {
    if (!dotLottie || !wrapRef.current) return;
    if (reduceMotion) {
      dotLottie.setFrame(0);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? dotLottie.play() : dotLottie.pause()),
      { threshold: 0.25 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [dotLottie, reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={false}
        dotLottieRefCallback={setDotLottie}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
