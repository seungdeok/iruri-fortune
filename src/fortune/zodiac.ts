import type { Zodiac } from "./types";

const ZODIACS: Zodiac[] = [
  { name: "쥐", emoji: "🐭" },
  { name: "소", emoji: "🐮" },
  { name: "호랑이", emoji: "🐯" },
  { name: "토끼", emoji: "🐰" },
  { name: "용", emoji: "🐲" },
  { name: "뱀", emoji: "🐍" },
  { name: "말", emoji: "🐴" },
  { name: "양", emoji: "🐑" },
  { name: "원숭이", emoji: "🐵" },
  { name: "닭", emoji: "🐔" },
  { name: "개", emoji: "🐶" },
  { name: "돼지", emoji: "🐷" },
];

/** 출생 연도로부터 12지(띠)를 산출해요. */
export function getZodiac(year: number): Zodiac {
  const idx = (((year - 4) % 12) + 12) % 12;
  return ZODIACS[idx];
}
