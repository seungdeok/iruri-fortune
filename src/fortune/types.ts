export type CalendarType = "solar" | "lunar";

export interface StoredUser {
  /** YYYYMMDD 8자리 */
  birthdate: string;
  calendarType: CalendarType;
}

export interface Zodiac {
  name: string;
  emoji: string;
}

export type BadgeColor =
  "blue" | "teal" | "green" | "red" | "yellow" | "elephant";

export interface OverallFortune {
  score: number;
  grade: string;
  badgeColor: BadgeColor;
  stars: number;
  message: string;
}

export interface CategoryFortune {
  key: string;
  label: string;
  emoji: string;
  score: number;
  comment: string;
}

export interface LuckyItem {
  color: { name: string; hex: string };
  number: number;
}

export interface DailyFortune {
  dateLabel: string;
  zodiac: Zodiac;
  overall: OverallFortune;
  categories: CategoryFortune[];
  lucky: LuckyItem;
}
