/**
 * Robot catalog for the "Discover Robots" page (/robots).
 *
 * Locale-independent data lives here — numbers, units, model paths, hotspot
 * positions, subsystem grouping. Translatable copy (taglines, descriptions,
 * spec labels, group labels, hotspot labels) lives in the `robots` i18n
 * namespace, keyed by the ids below. The data model is deliberately
 * compare-ready: every spec is keyed by a shared `id` and tagged with a
 * `group`, so a future /robots compare view can align rows by id and section.
 *
 * Spec values are curated from public manufacturer sources and datasheets
 * (Unitree, Livox, Intel RealSense, distributor spec sheets). Where a value
 * differs by configuration, the EDU / published headline figure is used.
 */

export type RobotCategory = 'humanoid' | 'quadruped';

/** Subsystems a spec can belong to; drives the grouped datasheet layout. */
export type SpecGroup = 'structure' | 'motion' | 'sensing' | 'power' | 'compute';

/** A single spec row. `id` maps to `robots.specLabels.<id>` for its label. */
export interface RobotSpec {
  id: string;
  /** Display value; numbers get `unit` appended, strings render as-is. */
  value: string | number;
  unit?: string;
  /** Subsystem this spec belongs to (detail page groups by this). */
  group?: SpecGroup;
  /**
   * When true, the value is prose that differs by language, so it is rendered
   * from `robots.specValues.<slug>.<id>` instead of `value` (which is the
   * locale-neutral fallback). Keeps descriptive text — e.g. "33 tactile
   * sensors" vs "33 Tastsensoren" — out of the shared, locale-independent data.
   */
  i18nValue?: boolean;
}

/** A 3D annotation marker. `id` maps to `robots.hotspots.<id>.{label,description}`. */
export interface Hotspot {
  id: string;
  /** Position in model space (metres). Calibrate against the real GLB. */
  position: [number, number, number];
}

export interface Robot {
  slug: string;
  name: string;
  maker: string;
  /** Short unit code shown in the designation stamp, e.g. `G1 · EDU`. */
  code: string;
  category: RobotCategory;
  /**
   * Path to a self-hosted GLB under /public/models. When omitted, the viewer
   * renders a branded procedural placeholder shaped by `category`. Swapping in
   * a real model is just setting this field — no other change.
   */
  modelUrl?: string;
  /** Optional poster shown as the loading fallback for a real GLB. */
  poster?: string;
  /**
   * Relative scale applied to the loaded GLB. Note the viewer wraps the model
   * in <Bounds fit>, which normalises apparent on-screen size — so this only
   * shifts the model's scale *relative to its unscaled hotspots*. Leave at 1
   * unless recalibrating hotspot alignment. Not a visual size knob.
   */
  modelScale?: number;
  featured?: boolean;
  /** Spec ids surfaced as the big readouts on the gallery card (subset of `specs`). */
  highlightSpecs: string[];
  /** Spec ids surfaced as the headline metric strip on the detail hero. */
  heroSpecs: string[];
  specs: RobotSpec[];
  hotspots?: Hotspot[];
}

/**
 * Per-class accent tokens. Morphology class is encoded in colour — humanoid
 * reads orange (brand primary), quadruped reads teal (brand secondary) — so the
 * colour itself carries information. All class strings are literal so Tailwind's
 * JIT keeps them; `hex` feeds the three.js rim light + hotspots.
 */
export const categoryAccent: Record<
  RobotCategory,
  {
    label: string;
    prefix: string;
    hex: string;
    text: string;
    textStrong: string;
    bg: string;
    border: string;
    ring: string;
    dot: string;
    gradient: string;
  }
> = {
  humanoid: {
    label: 'humanoid',
    prefix: 'HUM',
    hex: '#FF6700',
    text: 'text-primary-400',
    textStrong: 'text-primary-500',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/40',
    ring: 'ring-primary-500/30',
    dot: 'bg-primary-500',
    gradient: 'from-primary-500/20',
  },
  quadruped: {
    label: 'quadruped',
    prefix: 'QUAD',
    hex: '#2DD4BF',
    text: 'text-secondary-400',
    textStrong: 'text-secondary-400',
    bg: 'bg-secondary-500/10',
    border: 'border-secondary-400/40',
    ring: 'ring-secondary-400/30',
    dot: 'bg-secondary-400',
    gradient: 'from-secondary-400/20',
  },
};

/** Order subsystems render in on the datasheet. */
export const specGroupOrder: SpecGroup[] = [
  'structure',
  'motion',
  'sensing',
  'power',
  'compute',
];

export const robots: Robot[] = [
  {
    slug: 'g1-edu',
    name: 'Unitree G1 EDU',
    maker: 'Unitree',
    code: 'G1 · EDU',
    category: 'humanoid',
    modelUrl: '/models/g1-edu.glb',
    poster: '/models/posters/g1-edu.png',
    featured: true,
    highlightSpecs: ['height', 'weight', 'dof'],
    heroSpecs: ['height', 'weight', 'payload'],
    specs: [
      { id: 'height', value: 1.32, unit: 'm', group: 'structure' },
      { id: 'weight', value: 35, unit: 'kg', group: 'structure' },
      { id: 'dof', value: '23–43', group: 'structure' },
      { id: 'payload', value: 3, unit: 'kg', group: 'structure' },
      { id: 'reach', value: 0.45, unit: 'm', group: 'structure' },
      { id: 'walk_speed', value: 2, unit: 'm/s', group: 'motion' },
      { id: 'actuator_torque', value: 120, unit: 'N·m', group: 'motion' },
      { id: 'sensors', value: 'Livox Mid-360 LiDAR · RealSense D435i · IMU · 4-mic array', group: 'sensing', i18nValue: true },
      { id: 'hand', value: 'Dex3-1 · 7 DOF · 33 tactile sensors', group: 'sensing', i18nValue: true },
      { id: 'battery', value: '9000 mAh', group: 'power' },
      { id: 'runtime', value: '~2 h', group: 'power' },
      { id: 'compute', value: '8-Core CPU · Jetson Orin 100 TOPS', group: 'compute' },
    ],
    // Positions in the GLB's own frame (metres); the viewer <Center>s the model
    // and hotspots together, so these stay aligned. Calibrated visually against
    // /models/g1-edu.glb: crown ≈ +0.53 Y, feet ≈ -0.79 Y, front (face/hands) = +X.
    hotspots: [
      { id: 'head-lidar', position: [0.1, 0.53, -0.02] },
      { id: 'depth-cam', position: [0.22, 0.42, 0.02] },
      { id: 'dex-hand', position: [0.42, 0.14, 0.05] },
    ],
  },
  {
    slug: 'h1',
    name: 'Unitree H1',
    maker: 'Unitree',
    code: 'H1',
    category: 'humanoid',
    modelUrl: '/models/h1.glb',
    poster: '/models/posters/h1.png',
    highlightSpecs: ['height', 'weight', 'speed'],
    heroSpecs: ['height', 'weight', 'speed'],
    specs: [
      { id: 'height', value: 1.8, unit: 'm', group: 'structure' },
      { id: 'weight', value: 47, unit: 'kg', group: 'structure' },
      { id: 'dof', value: 18, group: 'structure' },
      { id: 'speed', value: 3.3, unit: 'm/s', group: 'motion' },
      { id: 'max_speed', value: 5, unit: 'm/s', group: 'motion' },
      { id: 'actuator_torque', value: 360, unit: 'N·m', group: 'motion' },
      { id: 'sensors', value: 'Livox Mid-360 3D LiDAR · RealSense D435i · IMU', group: 'sensing', i18nValue: true },
      { id: 'battery', value: '864 Wh', group: 'power' },
      { id: 'runtime', value: '~1.5–2 h', group: 'power' },
      { id: 'compute', value: 'Intel Core i5 · i7 optional', group: 'compute' },
    ],
  },
  {
    slug: 'go2',
    name: 'Unitree Go2',
    maker: 'Unitree',
    code: 'GO2',
    category: 'quadruped',
    modelUrl: '/models/go2.glb',
    poster: '/models/posters/go2.png',
    highlightSpecs: ['weight', 'payload', 'speed'],
    heroSpecs: ['weight', 'payload', 'speed'],
    specs: [
      { id: 'height', value: 0.4, unit: 'm', group: 'structure' },
      { id: 'weight', value: 15, unit: 'kg', group: 'structure' },
      { id: 'dof', value: 12, group: 'structure' },
      { id: 'payload', value: 8, unit: 'kg', group: 'structure' },
      { id: 'standing_payload', value: 12, unit: 'kg', group: 'structure' },
      { id: 'speed', value: 5, unit: 'm/s', group: 'motion' },
      { id: 'max_slope', value: 40, unit: '°', group: 'motion' },
      { id: 'climb_height', value: 16, unit: 'cm', group: 'motion' },
      { id: 'actuator_torque', value: 45, unit: 'N·m', group: 'motion' },
      { id: 'sensors', value: '4D LiDAR L1 · HD wide-angle camera 120° · IMU', group: 'sensing', i18nValue: true },
      { id: 'battery', value: '8000 mAh · 15000 mAh (EDU)', group: 'power' },
      { id: 'runtime', value: '1–2 h · ≤4 h (EDU)', group: 'power' },
      { id: 'compute', value: 'Jetson Orin · ≤100 TOPS', group: 'compute' },
    ],
  },
  {
    slug: 'b2',
    name: 'Unitree B2',
    maker: 'Unitree',
    code: 'B2',
    category: 'quadruped',
    modelUrl: '/models/b2.glb',
    poster: '/models/posters/b2.png',
    highlightSpecs: ['weight', 'standing_payload', 'speed'],
    heroSpecs: ['weight', 'standing_payload', 'speed'],
    specs: [
      { id: 'height', value: 0.645, unit: 'm', group: 'structure' },
      { id: 'weight', value: 60, unit: 'kg', group: 'structure' },
      { id: 'dof', value: 12, group: 'structure' },
      { id: 'standing_payload', value: 120, unit: 'kg', group: 'structure' },
      { id: 'payload', value: 40, unit: 'kg', group: 'structure' },
      { id: 'speed', value: 6, unit: 'm/s', group: 'motion' },
      { id: 'max_slope', value: 45, unit: '°', group: 'motion' },
      { id: 'climb_height', value: 40, unit: 'cm', group: 'motion' },
      { id: 'jump_distance', value: 1.6, unit: 'm', group: 'motion' },
      { id: 'actuator_torque', value: 360, unit: 'N·m', group: 'motion' },
      { id: 'sensors', value: '3D LiDAR · 2× depth camera · 2× camera', group: 'sensing', i18nValue: true },
      { id: 'ip_rating', value: 'IP67', group: 'structure' },
      { id: 'operating_temp', value: '−20 bis 55', unit: '°C', group: 'structure' },
      { id: 'battery', value: '2250 Wh', group: 'power' },
      { id: 'runtime', value: '4–5 h', group: 'power' },
      { id: 'compute', value: 'Intel Core i5/i7 · optional Orin NX', group: 'compute' },
    ],
  },
];

export const robotSlugs = robots.map((r) => r.slug);

export function getRobot(slug: string): Robot | undefined {
  return robots.find((r) => r.slug === slug);
}

/** Full class designation stamp, e.g. `HUM · G1 · EDU`. */
export function designation(robot: Robot): string {
  return `${categoryAccent[robot.category].prefix} · ${robot.code}`;
}

/** Format a spec value for display (`35 kg`, `Dex3-1`). */
export function formatSpec(spec: RobotSpec): string {
  return spec.unit ? `${spec.value} ${spec.unit}` : String(spec.value);
}

/** Look up specs by id, preserving the requested order (used by cards/hero). */
export function pickSpecs(robot: Robot, ids: string[]): RobotSpec[] {
  return ids
    .map((id) => robot.specs.find((s) => s.id === id))
    .filter((s): s is RobotSpec => Boolean(s));
}

/** Group a robot's specs by subsystem, in `specGroupOrder`, skipping empties. */
export function groupSpecs(robot: Robot): { group: SpecGroup; specs: RobotSpec[] }[] {
  return specGroupOrder
    .map((group) => ({ group, specs: robot.specs.filter((s) => s.group === group) }))
    .filter((g) => g.specs.length > 0);
}
