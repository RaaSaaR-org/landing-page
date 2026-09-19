import { Box3, Color, Float32BufferAttribute, Group, Mesh, ShaderMaterial, Vector3 } from 'three';
import type { RobotCategory } from './robots';

/** EmAI holographic presentation colors, independent of manufacturer finishes. */
export const robotBrandPalette = { signal: '#ff6700', highlight: '#ffba78' } as const;

const vertexShader = `
  attribute vec3 hologramPosition;
  varying vec3 vHologramPosition;
  varying vec3 vViewNormal;
  varying vec3 vViewDirection;
  void main() {
    vHologramPosition = hologramPosition;
    vViewNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = -viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uSignal;
  uniform vec3 uHighlight;
  uniform float uTime;
  uniform float uDensity;
  varying vec3 vHologramPosition;
  varying vec3 vViewNormal;
  varying vec3 vViewDirection;

  float hash(vec3 point) {
    point = fract(point * .1031);
    point += dot(point, point.yzx + 33.33);
    return fract((point.x + point.y) * point.z);
  }

  void main() {
    vec3 normal = normalize(vViewNormal);
    vec3 view = normalize(vViewDirection);
    float rim = pow(1.0 - abs(dot(normal, view)), 2.3);
    float facing = .6 + .4 * max(dot(normal, normalize(vec3(.4, .75, 1.0))), 0.0);

    // Fine horizontal data slices follow the original surface, never displace it.
    float scanCoordinate = vHologramPosition.y * 145.0 - uTime * .7;
    float scanDistance = abs(fract(scanCoordinate) - .5);
    float scanWidth = max(fwidth(scanCoordinate), .045);
    float scan = 1.0 - smoothstep(.12, .12 + scanWidth, scanDistance);

    // A quiet cubic sampling lattice reveals the volume, with sparse pixel cells.
    vec3 sampling = vHologramPosition * uDensity;
    vec3 cell = abs(fract(sampling) - .5);
    vec3 cellWidth = max(fwidth(sampling), vec3(.04));
    vec3 cellLines = 1.0 - smoothstep(vec3(.025), vec3(.025) + cellWidth * .6, cell);
    float lattice = max(cellLines.x, max(cellLines.y, cellLines.z));
    float pixel = step(.79, hash(floor(sampling))) * (1.0 - lattice);

    float sweepHeight = sin(uTime * .20) * .52;
    float sweep = exp(-pow((vHologramPosition.y - sweepHeight) * 65.0, 2.0));
    float brightness = .68 + rim * .40 + scan * .20 + pixel * .12 + sweep * .32;
    vec3 color = mix(uSignal, uHighlight, clamp(rim * .55 + sweep * .32, 0.0, .75));
    color *= brightness * facing;
    float alpha = .045 + rim * .66 + scan * .16 + lattice * .07 + pixel * .10 + sweep * .15;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, .88));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * Clone the exact source model into a translucent orange digital representation.
 * The shared model-space attribute anchors the lattice while orbiting. Each
 * clone owns its geometry/materials; source GLTF cache remains untouched.
 */
export function createBrandedRobot(source: Group, category: RobotCategory): Group {
  const branded = source.clone(true);
  branded.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(branded);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const longestSide = Math.max(size.x, size.y, size.z, .001);
  const point = new Vector3();

  branded.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.geometry = object.geometry.clone();
    const positions = object.geometry.getAttribute('position');
    // Source exports contain duplicate coplanar triangles. Remove repeated and
    // degenerate faces to prevent flickering patches under studio lighting.
    const index = object.geometry.getIndex();
    if (index) {
      const vertices = new Map<string, number>();
      const canonical = new Uint32Array(positions.count);
      for (let i = 0; i < positions.count; i++) {
        const key = `${positions.getX(i)},${positions.getY(i)},${positions.getZ(i)}`;
        if (!vertices.has(key)) vertices.set(key, vertices.size);
        canonical[i] = vertices.get(key)!;
      }
      const faces = new Set<string>();
      const retained: number[] = [];
      for (let i = 0; i < index.count; i += 3) {
        const a = index.getX(i), b = index.getX(i + 1), c = index.getX(i + 2);
        const ids = [canonical[a], canonical[b], canonical[c]].sort((x, y) => x - y);
        if (ids[0] === ids[1] || ids[1] === ids[2]) continue;
        const key = ids.join(',');
        if (faces.has(key)) continue;
        faces.add(key);
        retained.push(a, b, c);
      }
      object.geometry.setIndex(retained);
    }
    if (!object.geometry.hasAttribute('normal')) object.geometry.computeVertexNormals();
    const normalized = new Float32Array(positions.count * 3);
    for (let i = 0; i < positions.count; i++) {
      point.fromBufferAttribute(positions, i).applyMatrix4(object.matrixWorld);
      point.sub(center).divideScalar(longestSide).toArray(normalized, i * 3);
    }
    object.geometry.setAttribute('hologramPosition', new Float32BufferAttribute(normalized, 3));
    object.material = new ShaderMaterial({
      uniforms: {
        uSignal: { value: new Color(robotBrandPalette.signal) },
        uHighlight: { value: new Color(robotBrandPalette.highlight) },
        uTime: { value: 0 },
        uDensity: { value: category === 'humanoid' ? 65 : 75 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
    // A luminous projection should not cast an opaque physical shadow.
    object.castShadow = false;
    object.receiveShadow = false;
  });
  return branded;
}

/** Called only by an already-running, visible viewer frame; posters stay static. */
export function updateRobotHologram(robot: Group, delta: number): void {
  robot.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uTime) {
        material.uniforms.uTime.value += Math.min(delta, .05);
      }
    }
  });
}
