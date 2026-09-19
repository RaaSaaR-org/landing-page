'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { createIntelligenceScene } from './intelligence-scene';
import styles from './IntelligenceField.module.css';

type IntelligenceScene = ReturnType<typeof createIntelligenceScene>;

export function IntelligenceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scene: IntelligenceScene | null = null;
    let frame = 0;
    let lastFrame = 0;
    let elapsed = 0;
    let visible = false;
    let reduced = motion.matches;
    let disposed = false;
    let loading = false;
    let failed = false;
    let contextLost = false;
    let compact = window.innerWidth < 768;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    }

    function fallback() {
      stop();
      failed = true;
      setReady(false);
      scene?.dispose();
      scene = null;
    }

    function draw() {
      if (!scene || contextLost || disposed) return false;
      try {
        scene.render(elapsed);
        return true;
      } catch {
        fallback();
        return false;
      }
    }

    function canAnimate() {
      return scene && visible && !document.hidden && !reduced && !contextLost && !disposed;
    }

    function schedule() {
      if (canAnimate()) {
        if (!frame) frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    }

    function tick(time: number) {
      frame = 0;
      if (!canAnimate()) { lastFrame = 0; return; }
      if (!lastFrame) lastFrame = time;
      const delta = time - lastFrame;
      // Mobile needs fewer frames; animation time never jumps after a hidden tab.
      if (delta >= (compact ? 32 : 15)) {
        elapsed += Math.min(delta, 64) / 1000;
        lastFrame = time;
        draw();
      }
      schedule();
    }

    function resize() {
      if (!scene || !host || contextLost) return;
      compact = window.innerWidth < 768;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.75);
      try {
        scene.resize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight), ratio);
        draw();
      } catch {
        fallback();
      }
    }

    async function initialize() {
      if (scene || loading || failed || disposed) return;
      loading = true;
      try {
        // Keep the text and static artwork immediate; load Three.js separately.
        const [module] = await Promise.all([import('./intelligence-scene'), document.fonts.ready]);
        if (disposed) return;
        scene = module.createIntelligenceScene(canvas!, {
          fontFamily: getComputedStyle(host!).fontFamily,
          compact,
        });
        resize();
        if (scene && !failed && !contextLost) setReady(true);
        schedule();
      } catch {
        if (!disposed) fallback();
      } finally {
        loading = false;
      }
    }

    function preferenceChanged() {
      reduced = motion.matches;
      schedule();
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      contextLost = true;
      stop();
      setReady(false);
    }

    function onContextRestored() {
      // Three restores its resources in the same event. Render after its listener.
      queueMicrotask(() => {
        if (disposed || failed) return;
        contextLost = false;
        resize();
        if (scene && !failed) setReady(true);
        schedule();
      });
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) void initialize();
      schedule();
    }, { rootMargin: '80px' });
    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    motion.addEventListener('change', preferenceChanged);
    document.addEventListener('visibilitychange', schedule);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener('change', preferenceChanged);
      document.removeEventListener('visibilitychange', schedule);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      scene?.dispose();
    };
  }, []);

  return (
    <div className={styles.field} ref={hostRef}>
      <Image
        src="/images/hero/intelligence-sculpture.webp"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 760px"
        className={`${styles.fallback} ${ready ? styles.hidden : ''}`}
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.ready : ''}`} aria-hidden="true" />
    </div>
  );
}
