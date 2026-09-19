'use client';

import { Component, Suspense, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Box3, Group, Mesh, PerspectiveCamera, Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsInstance } from 'three-stdlib';
import { useTranslations } from 'next-intl';
import { type Hotspot, type RobotCategory } from '@/lib/robots';
import { createBrandedRobot, updateRobotHologram } from '@/lib/robot-branding';
import { RobotSilhouette } from './RobotSilhouette';
import styles from './RobotViewer.module.css';

interface RobotViewerProps {
  category: RobotCategory;
  name?: string;
  designation?: string;
  modelUrl?: string;
  poster?: string;
  hotspots?: Hotspot[];
  modelScale?: number;
  autoRotate?: boolean;
  compact?: boolean;
  className?: string;
}
interface ViewerActions { reset: () => void; zoom: (factor: number) => void }
const BODY_COLOR = '#29343d';
const ACCENT_COLOR = '#FF6700';

/** Locally lit product stage. Camera fitting uses model geometry only. */
export function RobotViewer({ category, name, designation, modelUrl, poster, hotspots, modelScale = 1, autoRotate = true, compact = false, className = '' }: RobotViewerProps) {
  const t = useTranslations('robots');
  const labelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<ViewerActions | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [rotating, setRotating] = useState(autoRotate);
  const modelKey = modelUrl || category;
  const [readyModel, setReadyModel] = useState<string | null>(null);
  const [failedModel, setFailedModel] = useState<string | null>(null);
  const ready = readyModel === modelKey;
  const failed = failedModel === modelKey;
  const setFailed = (value: boolean) => setFailedModel(value ? modelKey : null);
  const [attempt, setAttempt] = useState(0);
  const [showHotspots, setShowHotspots] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const active = inView && !hidden;
  const spin = rotating && !reduceMotion && active && !selectedHotspot;

  useEffect(() => {
    setMounted(true);
    let unavailable = false;
    try {
      const probe = document.createElement('canvas');
      const context = probe.getContext('webgl2');
      if (!context) unavailable = true;
      context?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch { unavailable = true; }
    if (unavailable) setFailedModel(modelUrl || category);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduceMotion(media.matches);
    const visibility = () => setHidden(document.hidden);
    preference();
    visibility();
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '80px' });
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => { observer.disconnect(); media.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility); };
  }, [modelUrl, category]);

  function retry() {
    if (modelUrl) useGLTF.clear(modelUrl);
    setReadyModel(null);
    setFailed(false);
    setAttempt(value => value + 1);
  }
  function selectHotspot(id: string) {
    setRotating(false);
    setSelectedHotspot(current => current === id ? null : id);
  }
  const fallback = <Poster category={category} poster={poster} label={t(failed ? 'viewer.unavailable' : 'viewer.loading')} />;

  return (
    <div ref={wrapRef} className={`robot-viewer ${styles.viewer} ${compact ? styles.compact : ''} ${className}`} role="region" aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">{name ? `${name}. ` : ''}{t('viewer.a11y')}</p>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.topbar}>
        <span>{designation || name || 'EmAI Robotics'}</span>
        <span className={styles.status}><i aria-hidden="true" />{t(failed ? 'viewer.preview' : ready ? 'viewer.status' : 'viewer.loading')}</span>
      </div>
      <div className={styles.stage}>
        {mounted && !failed ? <ViewerErrorBoundary key={attempt} onError={() => setFailed(true)} fallback={fallback}>
          <Canvas frameloop={!active ? 'never' : spin ? 'always' : 'demand'} camera={{ position: [3, 1.5, 3], fov: 35, near: .01, far: 100 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }} fallback={fallback}>
            <hemisphereLight args={['#eef3ff', '#343039', 1.3]} />
            <directionalLight position={[3, 5, 4]} intensity={3.2} color="#fff3e6" />
            <directionalLight position={[-3, 2, 4]} intensity={1.8} color="#e3ebff" />
            <directionalLight position={[1, 4, -4]} intensity={3.4} color="#ffffff" />
            <Suspense fallback={null}>
              <RobotScene key={modelKey} category={category} modelUrl={modelUrl} modelScale={modelScale} hotspots={showHotspots ? hotspots : undefined} selectedHotspot={selectedHotspot} onSelectHotspot={selectHotspot} spin={spin} actionsRef={actionsRef} onReady={() => setReadyModel(modelKey)} onFailure={() => setFailed(true)} onInteract={() => setRotating(false)} />
            </Suspense>
          </Canvas>
        </ViewerErrorBoundary> : fallback}
        {!ready && !failed && mounted && <div className={styles.loading} aria-live="polite">{fallback}</div>}
      </div>
      {selectedHotspot && showHotspots && <div className={styles.infoPanel} role="status">
        <div><strong>{t(`hotspots.${selectedHotspot}.label`)}</strong><p>{t(`hotspots.${selectedHotspot}.description`)}</p></div>
        <button type="button" aria-label={t('viewer.closeInfo')} onClick={() => setSelectedHotspot(null)}>×</button>
      </div>}
      <div className={styles.bottomBar}>
        <p className={styles.hint}>{t(failed ? 'viewer.fallbackHint' : 'viewer.interactionHint')}</p>
        {failed ? <button className={styles.retry} type="button" onClick={retry}>{t('viewer.retry')}<span aria-hidden="true">↻</span></button> : <div className={styles.controls}>
          <button type="button" disabled={!ready} aria-label={t('viewer.zoomOut')} title={t('viewer.zoomOut')} onClick={() => actionsRef.current?.zoom(1.16)}><span aria-hidden="true">−</span></button>
          <button type="button" disabled={!ready} aria-label={t('viewer.zoomIn')} title={t('viewer.zoomIn')} onClick={() => actionsRef.current?.zoom(.86)}><span aria-hidden="true">+</span></button>
          <button type="button" disabled={!ready} aria-label={t('viewer.reset')} title={t('viewer.reset')} onClick={() => { setRotating(false); setSelectedHotspot(null); actionsRef.current?.reset(); }}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 7a6 6 0 1 1 0 6M4 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          {!reduceMotion && <button type="button" disabled={!ready} aria-label={t(rotating ? 'viewer.pause' : 'viewer.rotate')} title={t(rotating ? 'viewer.pause' : 'viewer.rotate')} aria-pressed={rotating} onClick={() => { setSelectedHotspot(null); setRotating(value => !value); }}><svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">{rotating ? <path d="M5 4h3v12H5zm7 0h3v12h-3z" /> : <path d="m6 3 10 7-10 7z" />}</svg></button>}
          {!!hotspots?.length && !compact && <button type="button" disabled={!ready} className={styles.infoToggle} aria-label={t('viewer.hotspots')} title={t('viewer.hotspots')} aria-pressed={showHotspots} onClick={() => { setShowHotspots(value => !value); setSelectedHotspot(null); }}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 9v5M10 6v1" stroke="currentColor" strokeWidth="1.7" /></svg></button>}
        </div>}
      </div>
    </div>
  );
}

class ViewerErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

interface SceneProps {
  category: RobotCategory; modelUrl?: string; modelScale: number; hotspots?: Hotspot[]; selectedHotspot: string | null;
  spin: boolean; actionsRef: RefObject<ViewerActions | null>; onReady: () => void; onFailure: () => void; onInteract: () => void; onSelectHotspot: (id: string) => void;
}
function RobotScene(props: SceneProps) {
  return props.modelUrl ? <LoadedRobotScene {...props} modelUrl={props.modelUrl} /> : <StudioScene {...props}><PlaceholderRobot category={props.category} /></StudioScene>;
}
function LoadedRobotScene(props: SceneProps & { modelUrl: string }) {
  const { scene } = useGLTF(props.modelUrl);
  const branded = useMemo(() => createBrandedRobot(scene, props.category), [scene, props.category]);
  useFrame((_, delta) => { if (props.spin) updateRobotHologram(branded, delta); });
  useEffect(() => () => { branded.traverse(object => { if (object instanceof Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach(material => material.dispose()); } }); }, [branded]);
  return <StudioScene {...props}><primitive object={branded} dispose={null} /></StudioScene>;
}
function StudioScene({ children, modelScale, hotspots, selectedHotspot, spin, actionsRef, onReady, onFailure, onInteract, onSelectHotspot }: SceneProps & { children: ReactNode }) {
  const t = useTranslations('robots');
  const modelRef = useRef<Group>(null);
  const placementRef = useRef<Group>(null);
  const controlsRef = useRef<OrbitControlsInstance>(null);
  const { camera, size, invalidate, gl } = useThree();
  const callbackRef = useRef({ onReady, onFailure, onInteract });
  callbackRef.current = { onReady, onFailure, onInteract };

  useLayoutEffect(() => {
    if (!modelRef.current || !placementRef.current || !controlsRef.current || !(camera instanceof PerspectiveCamera)) return;
    const bounds = new Box3().setFromObject(modelRef.current);
    const dimensions = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const placement = placementRef.current;
    // Reset before measuring so resize doesn't accumulate placement offsets.
    placement.position.set(0, 0, 0);
    modelRef.current.updateWorldMatrix(true, true);
    bounds.setFromObject(modelRef.current).getCenter(center);
    placement.position.set(-center.x, -bounds.min.y, -center.z);
    const target = new Vector3(0, dimensions.y * .5, 0);
    const direction = new Vector3(1, .23, .76).normalize();
    const aspect = size.width / size.height;
    const halfFov = camera.fov * Math.PI / 360;
    const projectedWidth = dimensions.x * .61 + dimensions.z * .80;
    const projectedHeight = dimensions.y + Math.max(dimensions.x, dimensions.z) * .2;
    const fitDistance = Math.max(projectedHeight / (2 * Math.tan(halfFov)), projectedWidth / (2 * Math.tan(halfFov) * aspect)) * 1.17;
    const controls = controlsRef.current;
    controls.minDistance = fitDistance * .62;
    controls.maxDistance = fitDistance * 1.9;
    camera.near = Math.max(.001, fitDistance / 100);
    camera.far = fitDistance * 30;
    camera.updateProjectionMatrix();
    const reset = () => {
      clearMomentum(controls);
      camera.position.copy(target).addScaledVector(direction, fitDistance);
      controls.target.copy(target);
      controls.update();
      controls.saveState();
      invalidate();
    };
    actionsRef.current = { reset, zoom: factor => { clearMomentum(controls); const offset = camera.position.clone().sub(controls.target); offset.setLength(Math.min(controls.maxDistance, Math.max(controls.minDistance, offset.length() * factor))); camera.position.copy(controls.target).add(offset); controls.update(); invalidate(); } };
    reset();
    callbackRef.current.onReady();
    return () => { actionsRef.current = null; };
  }, [camera, size.width, size.height, invalidate, actionsRef, modelScale]);

  useLayoutEffect(() => {
    if (!spin && controlsRef.current) { clearMomentum(controlsRef.current); invalidate(); }
  }, [spin, invalidate]);

  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); callbackRef.current.onFailure(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => gl.domElement.removeEventListener('webglcontextlost', lost);
  }, [gl]);

  return <>
    <group ref={placementRef}>
      <group ref={modelRef} scale={modelScale}>{children}</group>
      {hotspots?.map((hotspot, index) => <Html key={hotspot.id} position={hotspot.position} center zIndexRange={[8, 0]}><button className={styles.hotspot} type="button" aria-label={t(`hotspots.${hotspot.id}.label`)} aria-pressed={selectedHotspot === hotspot.id} onClick={() => onSelectHotspot(hotspot.id)} onKeyDown={event => { if (event.key === 'Escape' && selectedHotspot === hotspot.id) onSelectHotspot(hotspot.id); }}>{index + 1}</button></Html>)}
    </group>
    <OrbitControls ref={controlsRef} makeDefault autoRotate={spin} autoRotateSpeed={.55} enablePan={false} enableDamping dampingFactor={.08} minPolarAngle={Math.PI * .22} maxPolarAngle={Math.PI * .49} onStart={() => callbackRef.current.onInteract()} />
  </>;
}

/** Stop retained OrbitControls deltas without moving the inspected viewpoint. */
function clearMomentum(controls: OrbitControlsInstance) {
  const position = controls.object.position.clone();
  const target = controls.target.clone();
  const damping = controls.enableDamping;
  const rotate = controls.autoRotate;
  controls.autoRotate = false;
  controls.enableDamping = false;
  controls.update();
  controls.object.position.copy(position);
  controls.target.copy(target);
  controls.update();
  controls.enableDamping = damping;
  controls.autoRotate = rotate;
}

function Poster({ category, poster, label }: { category: RobotCategory; poster?: string; label: string }) {
  return <div className={styles.poster}>
    {poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" />
    ) : <RobotSilhouette category={category} className="w-24 h-24 text-text-muted" />}
    <span>{label}</span>
  </div>;
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
