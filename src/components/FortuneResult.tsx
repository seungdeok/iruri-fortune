import { colors } from "@toss/tds-colors";
import { Badge, Button, ProgressBar, Top } from "@toss/tds-mobile";
import type { ReactNode } from "react";

import { formatBirthLabel } from "../fortune/date";
import type {
  CategoryFortune,
  DailyFortune,
  StoredUser,
} from "../fortune/types";
import { BottomBar } from "./BottomBar";

interface Props {
  user: StoredUser;
  fortune: DailyFortune;
  onReset: () => void;
}

function stars(count: number): string {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function scoreColor(score: number): string {
  if (score >= 80) {
    return colors.blue500;
  }
  if (score >= 60) {
    return colors.green500;
  }
  return colors.yellow500;
}

function CategoryRow({ category }: { category: CategoryFortune }) {
  const color = scoreColor(category.score);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px 0",
        borderTop: `1px solid ${colors.grey100}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontSize: "15px", fontWeight: 600, color: colors.grey800 }}
        >
          {category.emoji} {category.label}
        </span>
        <span style={{ fontSize: "15px", fontWeight: 700, color }}>
          {category.score}점
        </span>
      </div>
      <ProgressBar
        progress={category.score / 100}
        size="normal"
        color={color}
      />
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          lineHeight: 1.5,
          color: colors.grey600,
        }}
      >
        {category.comment}
      </p>
    </div>
  );
}

/** 행운 아이템 카드 (flexbox가 좌우 높이를 자동으로 맞춰요). */
function LuckyCard({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "20px 12px",
        borderRadius: "16px",
        background: colors.grey50,
      }}
    >
      {children}
    </div>
  );
}

export function FortuneResult({ user, fortune, onReset }: Props) {
  const { overall, categories, lucky, zodiac, dateLabel } = fortune;

  return (
    <div style={{ paddingBottom: "112px" }}>
      <Top
        title={
          <Top.TitleParagraph size={22}>
            {dateLabel} 오늘의 운세
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            {zodiac.emoji} {zodiac.name}띠 ·{" "}
            {formatBirthLabel(user.birthdate, user.calendarType)}
          </Top.SubtitleParagraph>
        }
      />

      <div style={{ padding: "0 24px" }}>
        {/* 총운 카드 */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "28px 20px",
            borderRadius: "20px",
            background: colors.grey50,
            textAlign: "center",
          }}
        >
          <Badge color={overall.badgeColor} size="medium" variant="fill">
            {overall.grade}
          </Badge>
          <div
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: colors.grey900,
              lineHeight: 1.1,
            }}
          >
            {overall.score}
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: colors.grey500,
              }}
            >
              점
            </span>
          </div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "2px",
              color: colors.yellow500,
            }}
          >
            {stars(overall.stars)}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.6,
              color: colors.grey700,
            }}
          >
            {overall.message}
          </p>
        </section>

        {/* 분야별 운세 */}
        <section style={{ marginTop: "28px" }}>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "17px",
              fontWeight: 700,
              color: colors.grey900,
            }}
          >
            분야별 운세
          </h2>
          {categories.map((category) => (
            <CategoryRow key={category.key} category={category} />
          ))}
        </section>

        {/* 행운의 아이템 */}
        <section style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
          <LuckyCard>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: lucky.color.hex,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            />
            <span style={{ fontSize: "13px", color: colors.grey500 }}>
              🎨 행운의 색
            </span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: colors.grey800,
              }}
            >
              {lucky.color.name}
            </span>
          </LuckyCard>
          <LuckyCard>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: colors.blue500,
                lineHeight: 1,
              }}
            >
              {lucky.number}
            </span>
            <span style={{ fontSize: "13px", color: colors.grey500 }}>
              🔢 행운의 숫자
            </span>
          </LuckyCard>
        </section>
      </div>

      <BottomBar>
        <Button
          display="full"
          size="xlarge"
          variant="weak"
          color="dark"
          onClick={onReset}
        >
          생일 다시 입력
        </Button>
      </BottomBar>
    </div>
  );
}
