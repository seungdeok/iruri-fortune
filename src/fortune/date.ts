import type { CalendarType } from "./types";

/** 오늘 날짜를 로컬 기준 YYYY-MM-DD 문자열로 반환해요. */
export function todayString(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "2026-07-04" → "7월 4일" */
export function formatDateLabel(dateStr: string): string {
  const [, m, d] = dateStr.split("-");
  return `${Number(m)}월 ${Number(d)}일`;
}

/** 생년월일 8자리(YYYYMMDD) 유효성 검사 */
export function isValidBirthdate(digits: string): boolean {
  if (!/^\d{8}$/.test(digits)) {
    return false;
  }
  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6));
  const d = Number(digits.slice(6, 8));
  const currentYear = new Date().getFullYear();
  if (y < 1900 || y > currentYear) {
    return false;
  }
  if (m < 1 || m > 12) {
    return false;
  }
  const lastDay = new Date(y, m, 0).getDate();
  if (d < 1 || d > lastDay) {
    return false;
  }
  return true;
}

/** "19930215", "solar" → "1993년 2월 15일 (양력)" */
export function formatBirthLabel(
  digits: string,
  calendarType: CalendarType,
): string {
  const y = Number(digits.slice(0, 4));
  const m = Number(digits.slice(4, 6));
  const d = Number(digits.slice(6, 8));
  const cal = calendarType === "solar" ? "양력" : "음력";
  return `${y}년 ${m}월 ${d}일 (${cal})`;
}
