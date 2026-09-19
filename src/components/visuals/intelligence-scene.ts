import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';

type Point = [number, number, number];
type Path = { points: Point[]; emphasis: number; seed: number };

export interface IntelligenceScene {
  resize(width: number, height: number, dpr: number): void;
  render(elapsedSeconds: number): void;
  dispose(): void;
}

const TAU = Math.PI * 2;
const ORANGE = new Color('#ff7b22');
const WARM = new Color('#ffd1a1');

/** A softly folded cortical surface with a distinct, open central cleft. */
function cortex(side: number, latitude: number, longitude: number): Point {
  const ring = Math.cos(latitude);
  const outer = Math.cos(longitude);
  const fold = .065 * Math.sin(longitude * 9 + Math.sin(latitude * 5) * 2.4)
    + .044 * Math.sin(latitude * 17 + Math.sin(longitude * 4) * 2.1);
  const rawX = .54 + .85 * outer * ring;
  const medial = .08 + .5 * (rawX + Math.sqrt(rawX * rawX + .003));
  return [
    side * Math.max(.085, medial + fold * outer * ring),
    1.08 * Math.sin(latitude) + .08 * Math.cos(longitude * 2) * ring + fold * Math.sin(latitude),
    (1.35 + .11 * Math.sin(longitude)) * Math.sin(longitude) * ring + fold * Math.sin(longitude),
  ];
}

function makePaths(compact: boolean): Path[] {
  const paths: Path[] = [];
  const latitudes = compact ? 37 : 49;
  const longitudes = compact ? 17 : 25;
  const steps = compact ? 128 : 176;
  const add = (points: Point[], emphasis: number) => {
    paths.push({ points, emphasis, seed: (paths.length * .61803398875) % 1 });
  };
  for (const side of [-1, 1]) {
    for (let band = 0; band < latitudes; band++) {
      const latitude = -1.38 + band / (latitudes - 1) * 2.88;
      add(Array.from({ length: steps + 1 }, (_, step) => {
        const longitude = step / steps * TAU;
        const ripple = (.065 * Math.sin(longitude * 7 + latitude * 5)
          + .037 * Math.sin(longitude * 13 - latitude * 7)) * Math.cos(latitude);
        return cortex(side, latitude + ripple, longitude);
      }), band % 7 === 2 ? 1 : .22);
    }
    for (let band = 0; band < longitudes; band++) {
      const longitude = band / longitudes * TAU;
      add(Array.from({ length: 97 }, (_, step) => {
        const latitude = -1.33 + step / 96 * 2.80;
        return cortex(side, latitude, longitude + Math.sin(latitude * 10 + band) * .025 * Math.cos(longitude));
      }), .08);
    }
  }
  for (let strand = 0; strand < 8; strand++) {
    const phase = strand / 7;
    add(Array.from({ length: 65 }, (_, step): Point => {
      const t = step / 64;
      return [(t - .5) * .8, -.52 + Math.sin(t * Math.PI) * (.10 + phase * .045), (phase - .5) * .30];
    }), .6);
  }
  for (let strand = 0; strand < 12; strand++) {
    const phi = strand / 12 * TAU;
    add(Array.from({ length: 49 }, (_, step): Point => {
      const t = step / 48;
      return [Math.cos(phi) * (.13 - t * .035), -.75 - t * .67, -.22 - t * .22 + Math.sin(phi) * .10];
    }), strand % 3 === 0 ? .5 : .12);
  }
  return paths;
}

const lineVertex = /* glsl */`
  attribute float progress;
  attribute float emphasis;
  attribute float seed;
  varying float vProgress;
  varying float vEmphasis;
  varying float vSeed;
  varying float vDepth;
  void main() {
    vec4 view = modelViewMatrix * vec4(position, 1.0);
    vProgress = progress;
    vEmphasis = emphasis;
    vSeed = seed;
    vDepth = -view.z;
    gl_Position = projectionMatrix * view;
  }
`;
const lineFragment = /* glsl */`
  uniform float time;
  uniform vec3 orange;
  uniform vec3 warm;
  varying float vProgress;
  varying float vEmphasis;
  varying float vSeed;
  varying float vDepth;
  void main() {
    float front = 1.0 - smoothstep(5.1, 8.1, vDepth);
    float phase = fract(vProgress - time * (0.022 + vSeed * 0.008) + vSeed);
    float pulse = pow(max(0.0, 1.0 - abs(phase - 0.5) * 48.0), 2.0);
    float tail = exp(-fract(0.5 - phase) * 76.0) * 0.24;
    float light = pulse + tail;
    vec3 ink = mix(orange, warm, min(0.84, light * 0.7));
    float alpha = (0.035 + front * 0.39) * (0.56 + vEmphasis * 0.44);
    alpha += light * (0.35 + vEmphasis * 0.30);
    gl_FragColor = vec4(ink, min(0.94, alpha));
    #include <colorspace_fragment>
  }
`;

function lineGeometry(paths: Path[]): BufferGeometry {
  const positions: number[] = [];
  const progress: number[] = [];
  const emphasis: number[] = [];
  const seed: number[] = [];
  for (const path of paths) {
    for (let step = 0; step < path.points.length - 1; step++) {
      for (const index of [step, step + 1]) {
        positions.push(...path.points[index]);
        progress.push(index / (path.points.length - 1));
        emphasis.push(path.emphasis);
        seed.push(path.seed);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('progress', new Float32BufferAttribute(progress, 1));
  geometry.setAttribute('emphasis', new Float32BufferAttribute(emphasis, 1));
  geometry.setAttribute('seed', new Float32BufferAttribute(seed, 1));
  return geometry;
}

function surfaceGeometry(): BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  const latitudes = 36;
  const longitudes = 72;
  for (const side of [-1, 1]) {
    const offset = positions.length / 3;
    for (let row = 0; row <= latitudes; row++) {
      for (let column = 0; column <= longitudes; column++) {
        positions.push(...cortex(side, -Math.PI / 2 + row / latitudes * Math.PI, column / longitudes * TAU));
      }
    }
    for (let row = 0; row < latitudes; row++) {
      for (let column = 0; column < longitudes; column++) {
        const a = offset + row * (longitudes + 1) + column;
        const b = a + longitudes + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

const pointVertex = /* glsl */`
  uniform float time;
  uniform float pixelRatio;
  uniform float pointSize;
  uniform float sceneScale;
  uniform float motion;
  attribute float strength;
  attribute float seed;
  varying float vStrength;
  varying float vSeed;
  void main() {
    vec3 p = position;
    p.y += sin(time * 0.22 + seed * 20.0) * motion;
    p.x += cos(time * 0.16 + seed * 13.0) * motion * 0.5;
    vec4 view = modelViewMatrix * vec4(p, 1.0);
    vStrength = strength;
    vSeed = seed;
    gl_PointSize = min(36.0, pointSize * pixelRatio * sceneScale * (6.6 / -view.z));
    gl_Position = projectionMatrix * view;
  }
`;
const pointFragment = /* glsl */`
  uniform vec3 orange;
  uniform vec3 warm;
  uniform float time;
  uniform float pointIntensity;
  varying float vStrength;
  varying float vSeed;
  void main() {
    float radius = length(gl_PointCoord - 0.5) * 2.0;
    if (radius > 1.0) discard;
    float core = exp(-radius * radius * 30.0);
    float bloom = exp(-radius * radius * 5.0) * 0.22;
    float shimmer = 0.82 + 0.18 * sin(time * 0.7 + vSeed * 15.0);
    vec3 ink = mix(orange, warm, core * 0.75);
    gl_FragColor = vec4(ink, (core + bloom) * vStrength * pointIntensity * shimmer);
    #include <colorspace_fragment>
  }
`;

function pointGeometry(points: Point[], strengths?: number[]): BufferGeometry {
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(points.flat(), 3));
  geometry.setAttribute('strength', new Float32BufferAttribute(points.map((_, i) => strengths?.[i] ?? 1), 1));
  geometry.setAttribute('seed', new Float32BufferAttribute(points.map((_, i) => (i * .61803398875) % 1), 1));
  return geometry;
}

/** The real site's font becomes points in the interior, never a pasted label. */
function wordmarkGeometry(fontFamily: string, compact: boolean): BufferGeometry {
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = 130;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const points: Point[] = [];
  if (context) {
    context.font = `600 104px ${fontFamily}`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#fff';
    context.fillText('EmAI', 180, 66);
    const pixels = context.getImageData(0, 0, 360, 130).data;
    const stride = compact ? 4 : 3;
    for (let y = stride; y < 128; y += stride) {
      for (let x = stride; x < 358; x += stride) {
        if (pixels[(y * 360 + x) * 4 + 3] < 150) continue;
        points.push([(x - 180) / 360 * 2.35, (65 - y) / 130 * .82 + .06, .34 + Math.sin(x * .022) * .012]);
      }
    }
  }
  return pointGeometry(points);
}

/**
 * Self-contained, eight-draw-call spatial installation. The caller owns timing,
 * fonts, visibility and reduced-motion policy; this module never installs a loop.
 */
export function createIntelligenceScene(
  canvas: HTMLCanvasElement,
  options: { fontFamily: string; compact: boolean },
): IntelligenceScene {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.debug.onShaderError = () => { throw new Error('Unable to compile the intelligence scene shaders.'); };
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.sortObjects = true;
  const scene = new Scene();
  const camera = new PerspectiveCamera(33, 1, .1, 40);
  camera.position.set(0, .3, 6.6);
  camera.lookAt(0, -.02, 0);
  const brain = new Group();
  brain.position.y = .18;
  scene.add(brain);
  const geometries: BufferGeometry[] = [];
  const materials: ShaderMaterial[] = [];
  const uniforms = { time: { value: 0 }, orange: { value: ORANGE }, warm: { value: WARM } };
  let disposed = false;
  const keepGeometry = <T extends BufferGeometry>(geometry: T): T => { geometries.push(geometry); return geometry; };
  const keepMaterial = (material: ShaderMaterial): ShaderMaterial => { materials.push(material); return material; };
  const paths = makePaths(options.compact);

  const tissueMaterial = keepMaterial(new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    forceSinglePass: true,
    blending: AdditiveBlending,
    vertexShader: /* glsl */`
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-view.xyz);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 orange;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.8);
        gl_FragColor = vec4(orange, 0.004 + rim * 0.050);
        #include <colorspace_fragment>
      }
    `,
  }));
  const tissue = new Mesh(keepGeometry(surfaceGeometry()), tissueMaterial);
  tissue.renderOrder = 0;
  brain.add(tissue);

  const fibers = new LineSegments(keepGeometry(lineGeometry(paths)), keepMaterial(new ShaderMaterial({
    uniforms,
    vertexShader: lineVertex,
    fragmentShader: lineFragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })));
  fibers.renderOrder = 3;
  brain.add(fibers);

  const pointMaterials: ShaderMaterial[] = [];
  function makePoints(geometry: BufferGeometry, pointSize: number, pointIntensity: number, motion = 0): Points {
    const material = keepMaterial(new ShaderMaterial({
      uniforms: { ...uniforms, pixelRatio: { value: 1 }, pointSize: { value: pointSize }, sceneScale: { value: 1 }, pointIntensity: { value: pointIntensity }, motion: { value: motion } },
      vertexShader: pointVertex,
      fragmentShader: pointFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    }));
    pointMaterials.push(material);
    return new Points(keepGeometry(geometry), material);
  }

  // Fine suspended points make the cortical volume tangible, while the lower
  // opacity of its far side keeps the embedded wordmark visible through it.
  const corticalPoints: Point[] = [];
  const corticalNormals: number[] = [];
  const corticalPointCount = options.compact ? 4000 : 10000;
  const normal = new Vector3();
  for (const side of [-1, 1]) {
    for (let index = 0; index < corticalPointCount; index++) {
      const latitude = Math.asin(-.98 + (index + .5) / corticalPointCount * 1.96);
      const longitude = index * 2.39996323;
      const point = cortex(side, latitude, longitude);
      corticalPoints.push(point);
      normal.set((point[0] - side * .6) / .85, point[1] / 1.08, point[2] / 1.35).normalize();
      corticalNormals.push(normal.x, normal.y, normal.z);
    }
  }
  const cloudGeometry = pointGeometry(corticalPoints);
  cloudGeometry.setAttribute('corticalNormal', new Float32BufferAttribute(corticalNormals, 3));
  const cloudMaterial = keepMaterial(new ShaderMaterial({
    uniforms: { ...uniforms, pixelRatio: { value: 1 }, sceneScale: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */`
      uniform float time;
      uniform float pixelRatio;
      uniform float sceneScale;
      attribute vec3 corticalNormal;
      varying float vLight;
      varying float vDepth;
      varying float vHeight;
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * corticalNormal);
        float facing = max(0.0, dot(n, normalize(-view.xyz)));
        vLight = 0.25 + facing * 0.75;
        vDepth = -view.z;
        vHeight = position.y;
        gl_PointSize = pixelRatio * sceneScale * 3.0 * (6.6 / -view.z);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */`
      uniform float time;
      uniform vec3 orange;
      uniform vec3 warm;
      varying float vLight;
      varying float vDepth;
      varying float vHeight;
      void main() {
        float radius = length(gl_PointCoord - 0.5) * 2.0;
        if (radius > 1.0) discard;
        float front = 1.0 - smoothstep(5.0, 8.2, vDepth);
        float band = pow(max(0.0, cos(vHeight * 2.3 - time * 0.26)), 14.0);
        float ink = exp(-radius * radius * 2.7);
        float alpha = ink * (0.07 + front * 0.40) * vLight * (0.78 + band * 0.55);
        gl_FragColor = vec4(mix(orange, warm, band * 0.18), alpha);
        #include <colorspace_fragment>
      }
    `,
  }));
  pointMaterials.push(cloudMaterial);
  const corticalCloud = new Points(keepGeometry(cloudGeometry), cloudMaterial);
  corticalCloud.renderOrder = 1;
  brain.add(corticalCloud);

  const wordmark = makePoints(wordmarkGeometry(options.fontFamily, options.compact), options.compact ? 6.8 : 6.2, 1.65);
  wordmark.renderOrder = 2;
  brain.add(wordmark);

  const nodes: Point[] = [];
  for (let index = 0; index < paths.length - 20; index += 3) {
    const path = paths[index];
    for (let step = 8 + index % 7; step < path.points.length - 8; step += 19) nodes.push(path.points[step]);
  }
  const synapses = makePoints(pointGeometry(nodes), 5.4, .25);
  synapses.renderOrder = 4;
  brain.add(synapses);

  const signalCount = options.compact ? 13 : 21;
  const trailLength = 7;
  const signalPoints: Point[] = Array.from({ length: signalCount * trailLength }, () => [0, 0, 0]);
  const signalStrengths = signalPoints.map((_, index) => Math.pow(1 - index % trailLength / trailLength, 1.7));
  const signalGeometry = pointGeometry(signalPoints, signalStrengths);
  const signals = makePoints(signalGeometry, 12, 1.1);
  // Moving particles travel beyond their initial zero-radius bounds.
  signals.frustumCulled = false;
  signals.renderOrder = 5;
  brain.add(signals);
  const signalAttribute = signalGeometry.getAttribute('position');
  const signalStrengthAttribute = signalGeometry.getAttribute('strength');

  const atmospherePoints: Point[] = [];
  const atmosphereStrengths: number[] = [];
  const particleCount = options.compact ? 38 : 65;
  for (let i = 0; i < particleCount; i++) {
    const angle = i * 2.39996323;
    const radius = 1.48 + ((i * .371) % 1) * .3;
    atmospherePoints.push([Math.cos(angle) * radius, -1.30 + ((i * .618) % 1) * 2.85, Math.sin(angle) * radius - .8]);
    atmosphereStrengths.push(.2 + (i % 5) * .075);
  }
  const atmosphere = makePoints(pointGeometry(atmospherePoints, atmosphereStrengths), 5, .45, .04);
  scene.add(atmosphere);

  const projectionMaterial = keepMaterial(new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    forceSinglePass: true,
    blending: AdditiveBlending,
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 orange;
      uniform float time;
      varying vec2 vUv;
      float circle(float r, float at, float width) { return 1.0 - smoothstep(width, width * 2.0, abs(r - at)); }
      void main() {
        vec2 p = (vUv - 0.5) * 3.5;
        float r = length(p);
        if (r > 1.64) discard;
        float angle = atan(p.y, p.x);
        float orbit = pow(max(0.0, cos(angle - time * 0.18)), 20.0);
        float ring = circle(r, 1.56, 0.004) * (0.22 + orbit * 0.45);
        ring += circle(r, 1.40, 0.003) * 0.065;
        ring += circle(r, 0.91, 0.003) * 0.06;
        float dots = pow(max(0.0, cos(angle * 56.0)), 14.0) * circle(r, 1.50, 0.013) * 0.10;
        float center = exp(-r * r * 14.0) * 0.035;
        gl_FragColor = vec4(orange, ring + dots + center);
        #include <colorspace_fragment>
      }
    `,
  }));
  const projection = new Mesh(keepGeometry(new PlaneGeometry(3.5, 3.5)), projectionMaterial);
  projection.rotation.x = -Math.PI / 2;
  projection.position.y = -1.46;
  scene.add(projection);

  const signalVector = new Vector3();
  function render(elapsedSeconds: number) {
    if (disposed) return;
    const time = Math.max(0, Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0);
    uniforms.time.value = time;
    brain.rotation.set(.26 + Math.sin(time * .11) * .045, -.24 + Math.sin(time * .13) * .15, -.045 + Math.sin(time * .075) * .022);
    brain.position.y = .18 + Math.sin(time * .3) * .018;
    const breath = 1 + Math.sin(time * .44) * .012;
    brain.scale.setScalar(breath);
    for (let index = 0; index < signalCount; index++) {
      const path = paths[(index * 11 + 3) % (paths.length - 20)];
      const progress = ((time * (.022 + path.seed * .008) - path.seed + .5) % 1 + 1) % 1;
      const fade = Math.min(1, progress * 24, (1 - progress) * 24);
      for (let trail = 0; trail < trailLength; trail++) {
        const along = ((progress - trail * .0028) % 1 + 1) % 1;
        const position = along * (path.points.length - 1);
        const step = Math.min(path.points.length - 2, Math.floor(position));
        const fraction = position - step;
        const a = path.points[step], b = path.points[step + 1];
        signalVector.set(a[0] + (b[0] - a[0]) * fraction, a[1] + (b[1] - a[1]) * fraction, a[2] + (b[2] - a[2]) * fraction);
        const pointIndex = index * trailLength + trail;
        signalAttribute.setXYZ(pointIndex, signalVector.x, signalVector.y, signalVector.z);
        signalStrengthAttribute.setX(pointIndex, signalStrengths[pointIndex] * fade);
      }
    }
    signalAttribute.needsUpdate = true;
    signalStrengthAttribute.needsUpdate = true;
    renderer.render(scene, camera);
  }

  return {
    resize(width, height, dpr) {
      if (disposed || width <= 0 || height <= 0) return;
      const ratio = Math.min(Math.max(1, dpr || 1), options.compact ? 1.6 : 2);
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      for (const material of pointMaterials) {
        material.uniforms.pixelRatio.value = ratio;
        material.uniforms.sceneScale.value = Math.max(.7, Math.min(1.6, height / 500));
      }
    },
    render,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
