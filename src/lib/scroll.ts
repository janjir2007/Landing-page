export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Sub-range of a 0→1 progress for item `index` of `count`, so items animate in
 * sequence. Each window is `1 + overlap` steps wide, so neighbours overlap and
 * the motion reads as a wave rather than one-at-a-time.
 */
export function staggerRange(index: number, count: number, overlap: number): [number, number] {
  const step = 1 / (count + overlap);
  const start = index * step;
  return [start, Math.min(1, start + step * (1 + overlap))];
}
