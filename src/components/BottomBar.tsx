import { colors } from "@toss/tds-colors";
import type { ReactNode } from "react";

/** 화면 하단에 CTA를 고정하는 공용 컨테이너 (safe-area 여백 포함). */
export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 고정된 CTA 높이만큼 스크롤 공간을 확보해요 (top 16 + 버튼 56 + bottom 20 + safe-area). */}
      <div
        aria-hidden
        style={{
          height: "calc(env(safe-area-inset-bottom, 0px) + 92px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "16px 24px calc(env(safe-area-inset-bottom, 0px) + 20px)",
          background: colors.white,
        }}
      >
        {children}
      </div>
    </>
  );
}
