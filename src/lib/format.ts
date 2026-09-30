/** Zero-padded running number for editorial indexes: 1 → "01". */
export const twoDigit = (n: number) => String(n).padStart(2, '0');

/** Point on a circle around (cx, cy); 0° points right, angles grow clockwise as in SVG. */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)] as const;
}
