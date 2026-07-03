import {
  CATEGORIES,
  CATEGORY_COMMENTS,
  GRADES,
  LUCKY_COLORS,
  OVERALL_MESSAGES,
  type GradeDef,
} from "./data";
import { formatDateLabel } from "./date";
import { intBetween, makeRng, pick } from "./prng";
import type { DailyFortune, OverallFortune, StoredUser } from "./types";
import { getZodiac } from "./zodiac";

function gradeFor(score: number): GradeDef {
  return GRADES.find((g) => score >= g.min) ?? GRADES[GRADES.length - 1];
}

function starsFor(score: number): number {
  return Math.max(1, Math.min(5, Math.round(score / 20)));
}

/**
 * 사용자의 생년월일·양음력과 날짜를 조합해 "오늘의 운세"를 결정적으로 계산해요.
 * 백엔드 없이 순수 함수로 동작하며, 같은 입력에는 항상 같은 결과를 돌려줘요.
 */
export function getDailyFortune(
  user: StoredUser,
  dateStr: string,
): DailyFortune {
  const base = `${user.birthdate}|${user.calendarType}|${dateStr}`;
  const year = Number(user.birthdate.slice(0, 4));
  const zodiac = getZodiac(year);

  const overallScore = intBetween(makeRng(base, "overall-score"), 45, 99);
  const overallGrade = gradeFor(overallScore);
  const overall: OverallFortune = {
    score: overallScore,
    grade: overallGrade.label,
    badgeColor: overallGrade.badgeColor,
    stars: starsFor(overallScore),
    message: pick(
      makeRng(base, "overall-msg"),
      OVERALL_MESSAGES[overallGrade.label],
    ),
  };

  const categories = CATEGORIES.map((c) => {
    const score = intBetween(makeRng(base, "cat-score", c.key), 40, 99);
    return {
      key: c.key,
      label: c.label,
      emoji: c.emoji,
      score,
      comment: pick(makeRng(base, "cat-msg", c.key), CATEGORY_COMMENTS[c.key]),
    };
  });

  const lucky = {
    color: pick(makeRng(base, "lucky-color"), LUCKY_COLORS),
    number: intBetween(makeRng(base, "lucky-number"), 1, 45),
  };

  return {
    dateLabel: formatDateLabel(dateStr),
    zodiac,
    overall,
    categories,
    lucky,
  };
}
