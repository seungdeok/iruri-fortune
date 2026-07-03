import { colors } from "@toss/tds-colors";
import { Button, SegmentedControl, TextField, Top } from "@toss/tds-mobile";
import { useState, type ChangeEvent } from "react";

import { formatBirthLabel, isValidBirthdate } from "../fortune/date";
import type { CalendarType, StoredUser } from "../fortune/types";
import { BottomBar } from "./BottomBar";

interface Props {
  initial?: StoredUser | null;
  onSubmit: (user: StoredUser) => void;
}

function helpText(
  digits: string,
  valid: boolean,
  calendarType: CalendarType,
): string {
  if (digits.length === 0) {
    return "숫자 8자리로 입력해 주세요.";
  }
  if (!valid) {
    return "생년월일 8자리(YYYYMMDD)를 정확히 입력해 주세요.";
  }
  return formatBirthLabel(digits, calendarType);
}

export function BirthInput({ initial, onSubmit }: Props) {
  const [digits, setDigits] = useState<string>(initial?.birthdate ?? "");
  const [calendarType, setCalendarType] = useState<CalendarType>(
    initial?.calendarType ?? "solar",
  );

  const valid = isValidBirthdate(digits);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDigits(event.target.value.replace(/\D/g, "").slice(0, 8));
  };

  const handleSubmit = () => {
    if (!valid) {
      return;
    }
    onSubmit({ birthdate: digits, calendarType });
  };

  return (
    <>
      <Top
        title={<Top.TitleParagraph size={22}>오늘의 운세</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph size={15}>
            생년월일을 입력하면 오늘 하루의 운세를 알려드려요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "8px 24px 24px",
        }}
      >
        <TextField
          variant="box"
          label="생년월일"
          labelOption="sustain"
          placeholder="예: 19930215 (YYYYMMDD)"
          value={digits}
          onChange={handleChange}
          hasError={digits.length > 0 && !valid}
          help={helpText(digits, valid, calendarType)}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: colors.grey500 }}>
            양력 / 음력
          </span>
          <SegmentedControl
            value={calendarType}
            onChange={(value) => setCalendarType(value as CalendarType)}
          >
            <SegmentedControl.Item value="solar">양력</SegmentedControl.Item>
            <SegmentedControl.Item value="lunar">음력</SegmentedControl.Item>
          </SegmentedControl>
        </div>
      </div>

      <BottomBar>
        <Button
          display="full"
          size="xlarge"
          disabled={!valid}
          onClick={handleSubmit}
        >
          오늘의 운세 보기
        </Button>
      </BottomBar>
    </>
  );
}
