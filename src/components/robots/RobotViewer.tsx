'use client';

import {
  Component,
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { Group } from 'three';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { useTranslations } from 'next-intl';
import { categoryAccent, type Hotspot, type RobotCategory } from '@/lib/robots';
import { RobotSilhouette } from './RobotSilhouette';

interface RobotViewerProps {
  category: RobotCategory;
  /** Robot name — used to build the viewer's accessible description. */
  name?: string;
  /** Class designation stamped into the frame, e.g. `HUM · G1 · EDU`. */
  designation?: string;
  /** Self-hosted GLB under /public/models. Omit to show a procedural placeholder. */
  modelUrl?: string;
  poster?: string;
  hotspots?: Hotspot[];
  modelScale?: number;
  autoRotate?: boolean;
  /** Compact chrome: drops the ruler, designation stamp and hint bar for small/hero embeds. */
  compact?: boolean;
  className?: string;
}

const BODY_COLOR = '#2b2b2b';
const ACCENT_COLOR = '#FF6700';

/**
 * Interactive 3D robot viewer framed as a diagnostic viewport — the page's
 * signature element. The 3D scene is wrapped in an instrument HUD: a
 * measurement-tick ruler, corner brackets, a class designation stamp, a status
 * readout, and a one-shot calibration sweep on first reveal. Accent colour is
 * class-coded (humanoid → orange, quadruped → teal), including the rim light.
 *
 * CSP-safe by construction: no remote assets — lighting is manual (no drei
 * <Environment> preset, which fetches an HDR from a CDN that `connect-src
 * 'self'` would block), and GLBs are served same-origin from /public/models.
 *
 * Performance/accessibility, mirroring src/components/ui/LottiePlayer.tsx:
 *   - IntersectionObserver pauses the render loop off-screen (frameloop 'never')
 *   - prefers-reduced-motion disables auto-rotate (frameloop 'demand') + sweep
 *   - the WebGL canvas mounts only in the browser (no SSR of the renderer)
 *   - a visually-hidden description names the model; decorative chrome is hidden
 *     from assistive tech; a failed GLB load degrades to the procedural placeholder
 */
export function RobotViewer({
  category,
  name,
  designation,
  modelUrl,
  poster,
  hotspots,
  modelScale = 1,
  autoRotate = true,
  compact = false,
  className = '',
}: RobotViewerProps) {
  const t = useTranslations('robots');
  const accent = categoryAccent[category];
  const wrapRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<Group>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [booted, setBooted] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const hasHotspots = !!hotspots?.length;

  useEffect(() => {
    setMounted(true);
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setBooted(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  const spin = autoRotate && inView && !reduceMotion;
  const frameloop = !inView ? 'never' : reduceMotion ? 'demand' : 'always';
  const sweep = booted && !reduceMotion;

  const a11yLabel = name
    ? `${name} — ${t(`categories.${category}`)}. ${t('viewer.a11y')}`
    : t('viewer.a11y');

  return (
    <div
      ref={wrapRef}
      className={`group/viewer relative rounded-xl overflow-hidden bg-gradient-to-br from-surface-elevated to-base border border-border-subtle ${className}`}
      style={{ boxShadow: `inset 0 0 60px -30px ${accent.hex}` }}
    >
      {/* Accessible description of the 3D content (canvas itself is unlabelled). */}
      <p className="sr-only">{a11yLabel}</p>

      <div aria-hidden="true" className="absolute inset-0 grid-dots opacity-[0.18] pointer-events-none" />
      {/* Radial backdrop glow — lifts the model off the dark background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(58% 52% at 50% 44%, ${accent.hex}18, transparent 72%)`,
        }}
      />

      {/* Calibration sweep — one-shot scan on first reveal */}
      {sweep && (
        <div
          key="sweep"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-16 z-20 robot-sweep"
          style={{
            background: `linear-gradient(to bottom, transparent, ${accent.hex}22 55%, ${accent.hex}66 82%, transparent)`,
          }}
        />
      )}

      {mounted ? (
        <Canvas
          frameloop={frameloop}
          camera={{ position: [2.4, 1.15, 2.35], fov: 38 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          className="!absolute inset-0"
        >
          <hemisphereLight args={['#ffffff', '#1a120b', 0.75]} />
          <ambientLight intensity={0.5} />
          {/* key */}
          <directionalLight position={[4, 6, 4]} intensity={2} />
          {/* front fill from the camera side */}
          <directionalLight position={[2, 3, 5]} intensity={0.7} />
          {/* cool side fill */}
          <directionalLight position={[-5, 3, -2]} intensity={0.5} color="#2DD4BF" />
          {/* white back rim — separates the dark silhouette from the dark bg */}
          <directionalLight position={[-2, 5, -5]} intensity={1.3} />
          {/* accent rim */}
          <pointLight position={[0, 2.2, -4]} intensity={1.3} color={accent.hex} />

          <Suspense fallback={<Loader label={t('viewer.loading')} accentHex={accent.hex} />}>
            <Bounds fit clip observe margin={1.5}>
              {/* `bottom` seats the model on y=0 so ContactShadows grounds the feet */}
              <Center bottom>
                <group ref={modelRef}>
                  {modelUrl ? (
                    <ModelErrorBoundary fallback={<PlaceholderRobot category={category} />}>
                      <GltfModel url={modelUrl} scale={modelScale} />
                    </ModelErrorBoundary>
                  ) : (
                    <PlaceholderRobot category={category} />
                  )}
                </group>
                {showHotspots &&
                  hotspots?.map((h) => (
                    <HotspotMarker key={h.id} hotspot={h} accentHex={accent.hex} occludeRef={modelRef} />
                  ))}
              </Center>
            </Bounds>
          </Suspense>

          {/* Single cached shadow render — the model & lights are static, only the camera orbits */}
          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={6} blur={2.4} far={4} frames={1} />
          <OrbitControls
            makeDefault
            autoRotate={spin}
            autoRotateSpeed={0.8}
            enablePan={false}
            minDistance={1.2}
            maxDistance={6}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 1.9}
          />
        </Canvas>
      ) : (
        <Loader2D category={category} poster={poster} label={t('viewer.loading')} />
      )}

      {/* ---- Diagnostic HUD overlay (pointer-events-none so orbit still works) ---- */}
      {/* Measurement-tick ruler down the left edge — the "instrument" signature */}
      {!compact && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-10 bottom-10 w-2 z-10 opacity-70"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, ${accent.hex}66 0, ${accent.hex}66 1px, transparent 1px, transparent 11px)`,
            maskImage: 'linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)',
          }}
        />
      )}

      {/* Corner brackets — fade/scale in on boot */}
      <FrameBrackets accentHex={accent.hex} booted={booted} reduceMotion={reduceMotion} />

      {/* Top bar: designation stamp + status readout */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 z-10">
        {designation && !compact ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary bg-base/40 backdrop-blur-sm rounded px-2 py-1">
            {designation}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary bg-base/40 backdrop-blur-sm rounded px-2 py-1">
          <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
              style={{ backgroundColor: accent.hex }}
            />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ backgroundColor: accent.hex }} />
          </span>
          {t('viewer.status')}
        </span>
      </div>

      {/* Bottom bar: interaction hint + info-points toggle / placeholder note */}
      {!compact && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 text-[11px] font-mono uppercase tracking-wider z-10">
          <span className="text-text-secondary">
            {reduceMotion ? t('viewer.reducedMotion') : t('viewer.interactionHint')}
          </span>
          {hasHotspots ? (
            <button
              type="button"
              onClick={() => setShowHotspots((v) => !v)}
              aria-pressed={showHotspots}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] border backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={
                showHotspots
                  ? { color: accent.hex, borderColor: `${accent.hex}66`, backgroundColor: `${accent.hex}14` }
                  : { color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-subtle)', backgroundColor: 'rgba(20,20,20,0.45)' }
              }
            >
              <EyeIcon off={!showHotspots} />
              {t('viewer.hotspots')}
            </button>
          ) : (
            !modelUrl && (
              <span className="text-primary-400 bg-primary-500/10 rounded px-2 py-0.5 backdrop-blur-sm">
                {t('viewer.placeholderNote')}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}

/** Renders `fallback` (the procedural placeholder) if a GLB fails to load/parse. */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Four HUD corner brackets in the class accent; animate in once on boot. */
function FrameBrackets({
  accentHex,
  booted,
  reduceMotion,
}: {
  accentHex: string;
  booted: boolean;
  reduceMotion: boolean;
}) {
  const shown = booted || reduceMotion;
  const base =
    'pointer-events-none absolute w-5 h-5 z-10 transition-all duration-700 ease-out';
  const style = { borderColor: accentHex };
  return (
    <div aria-hidden="true">
      <span
        className={`${base} top-2.5 left-2.5 border-t-2 border-l-2 ${shown ? 'opacity-80 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-1 -translate-y-1'}`}
        style={style}
      />
      <span
        className={`${base} top-2.5 right-2.5 border-t-2 border-r-2 ${shown ? 'opacity-80 translate-x-0 translate-y-0' : 'opacity-0 translate-x-1 -translate-y-1'}`}
        style={style}
      />
      <span
        className={`${base} bottom-2.5 left-2.5 border-b-2 border-l-2 ${shown ? 'opacity-80 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-1 translate-y-1'}`}
        style={style}
      />
      <span
        className={`${base} bottom-2.5 right-2.5 border-b-2 border-r-2 ${shown ? 'opacity-80 translate-x-0 translate-y-0' : 'opacity-0 translate-x-1 translate-y-1'}`}
        style={style}
      />
    </div>
  );
}

/** Eye / eye-off glyph for the info-points toggle. */
function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.6" />
      {off && <path strokeLinecap="round" d="M4 4l16 16" />}
    </svg>
  );
}

function GltfModel({ url, scale }: { url: string; scale: number }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

/** In-canvas HTML loading label shown while a GLB streams in. */
function Loader({ label, accentHex }: { label: string; accentHex: string }) {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary whitespace-nowrap">
        <span
          className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: accentHex, borderTopColor: 'transparent' }}
        />
        {label}
      </div>
    </Html>
  );
}

/** Pre-mount / SSR fallback (no WebGL). */
function Loader2D({
  category,
  poster,
  label,
}: {
  category: RobotCategory;
  poster?: string;
  label: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="max-h-[70%] object-contain opacity-80" />
      ) : (
        <RobotSilhouette category={category} className="w-24 h-24 text-text-muted/60" />
      )}
      <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">{label}</span>
    </div>
  );
}

function HotspotMarker({
  hotspot,
  accentHex,
  occludeRef,
}: {
  hotspot: Hotspot;
  accentHex: string;
  occludeRef?: RefObject<Group | null>;
}) {
  const t = useTranslations('robots');
  const [open, setOpen] = useState(false);
  const descId = useId();

  return (
    <Html
      position={hotspot.position}
      center
      zIndexRange={[50, 0]}
      occlude={occludeRef ? [occludeRef as RefObject<Group>] : undefined}
    >
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          type="button"
          aria-label={t(`hotspots.${hotspot.id}.label`)}
          aria-describedby={descId}
          onClick={() => setOpen((v) => !v)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          className="block w-3 h-3 rounded-full border-2 border-white/85 transition-transform hover:scale-125 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          style={{ backgroundColor: accentHex, boxShadow: `0 0 7px 1px ${accentHex}` }}
        >
          <span
            className="absolute -inset-1 rounded-full animate-ping opacity-40"
            style={{ backgroundColor: accentHex }}
          />
        </button>
        {/* Always in the DOM so aria-describedby resolves for screen readers */}
        <span id={descId} className="sr-only">
          {t(`hotspots.${hotspot.id}.description`)}
        </span>
        {open && (
          <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-52 rounded-lg bg-surface border border-border-subtle shadow-xl p-3 text-left z-50">
            <p className="text-xs font-semibold text-text-primary mb-1">
              {t(`hotspots.${hotspot.id}.label`)}
            </p>
            <p className="text-[11px] text-text-secondary leading-snug" aria-hidden="true">
              {t(`hotspots.${hotspot.id}.description`)}
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}

function PlaceholderRobot({ category }: { category: RobotCategory }) {
  return category === 'humanoid' ? <HumanoidPlaceholder /> : <QuadrupedPlaceholder />;
}

function bodyMaterial() {
  return <meshStandardMaterial color={BODY_COLOR} metalness={0.35} roughness={0.55} />;
}
function accentMaterial() {
  return <meshStandardMaterial color={ACCENT_COLOR} metalness={0.4} roughness={0.35} emissive={ACCENT_COLOR} emissiveIntensity={0.25} />;
}

/** ~1.32 m tall stand-in; hotspot coords in robots.ts match these proportions. */
function HumanoidPlaceholder() {
  return (
    <group>
      {/* head */}
      <mesh position={[0, 1.24, 0]}>
        <boxGeometry args={[0.17, 0.18, 0.17]} />
        {bodyMaterial()}
      </mesh>
      {/* eye / sensor accent */}
      <mesh position={[0, 1.25, 0.09]}>
        <boxGeometry args={[0.11, 0.03, 0.02]} />
        {accentMaterial()}
      </mesh>
      {/* torso */}
      <mesh position={[0, 0.98, 0]}>
        <boxGeometry args={[0.3, 0.42, 0.19]} />
        {bodyMaterial()}
      </mesh>
      {/* chest accent */}
      <mesh position={[0, 1.05, 0.1]}>
        <boxGeometry args={[0.12, 0.12, 0.02]} />
        {accentMaterial()}
      </mesh>
      {/* hips */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.26, 0.14, 0.18]} />
        {bodyMaterial()}
      </mesh>
      {/* arms */}
      {[-0.21, 0.21].map((x) => (
        <mesh key={x} position={[x, 0.9, 0]}>
          <boxGeometry args={[0.08, 0.5, 0.09]} />
          {bodyMaterial()}
        </mesh>
      ))}
      {/* hands */}
      {[-0.21, 0.21].map((x) => (
        <mesh key={x} position={[x, 0.62, 0.04]}>
          <boxGeometry args={[0.09, 0.1, 0.11]} />
          {accentMaterial()}
        </mesh>
      ))}
      {/* legs */}
      {[-0.08, 0.08].map((x) => (
        <mesh key={x} position={[x, 0.34, 0]}>
          <boxGeometry args={[0.11, 0.68, 0.13]} />
          {bodyMaterial()}
        </mesh>
      ))}
      {/* feet */}
      {[-0.08, 0.08].map((x) => (
        <mesh key={x} position={[x, 0.02, 0.03]}>
          <boxGeometry args={[0.12, 0.04, 0.2]} />
          {bodyMaterial()}
        </mesh>
      ))}
    </group>
  );
}

/** ~0.6 m tall quadruped stand-in. */
function QuadrupedPlaceholder() {
  const legs: [number, number][] = [
    [0.28, 0.13],
    [0.28, -0.13],
    [-0.28, 0.13],
    [-0.28, -0.13],
  ];
  return (
    <group>
      {/* body */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.7, 0.22, 0.3]} />
        {bodyMaterial()}
      </mesh>
      {/* head */}
      <mesh position={[0.44, 0.5, 0]}>
        <boxGeometry args={[0.2, 0.16, 0.22]} />
        {bodyMaterial()}
      </mesh>
      {/* head sensor accent */}
      <mesh position={[0.55, 0.52, 0]}>
        <boxGeometry args={[0.03, 0.08, 0.14]} />
        {accentMaterial()}
      </mesh>
      {/* legs */}
      {legs.map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.2, z]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          {bodyMaterial()}
        </mesh>
      ))}
    </group>
  );
}
