/**
 * 결정적(deterministic) 난수 유틸.
 * 같은 입력(seed)에는 항상 같은 결과를 돌려줘요.
 * 이 덕분에 "같은 사람 · 같은 날"에는 운세가 언제나 동일하게 계산돼요.
 */

/** FNV-1a 32bit 문자열 해시 */
export function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 PRNG: seed로부터 0~1 사이 값을 반복 생성 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 여러 파트를 조합해 독립적인 난수 스트림을 만들어요 */
export function makeRng(...parts: Array<string | number>): () => number {
  return mulberry32(hashString(parts.join("|")));
}

export function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function intBetween(
  rng: () => number,
  min: number,
  max: number,
): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}
