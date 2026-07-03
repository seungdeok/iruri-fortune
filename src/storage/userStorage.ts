import { Storage } from "@apps-in-toss/web-framework";

import type { StoredUser } from "../fortune/types";

/**
 * 인프라 계층: 사용자 입력(생년월일·양음력)의 영속화만 담당해요.
 * 앱인토스 네이티브 Storage를 우선 쓰고, 없으면 localStorage로 폴백해요.
 * 도메인 로직(fortune/)과 분리되어 플랫폼 SDK 의존성을 이 파일에 격리해요.
 */

const KEY = "iruri-fortune:user";

function isStoredUser(value: unknown): value is StoredUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.birthdate === "string" &&
    (v.calendarType === "solar" || v.calendarType === "lunar")
  );
}

function parse(raw: string | null): StoredUser | null {
  if (raw == null) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return isStoredUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** 저장된 사용자 입력을 불러와요. (네이티브 Storage → localStorage 순) */
export async function loadUser(): Promise<StoredUser | null> {
  try {
    const fromNative = parse(await Storage.getItem(KEY));
    if (fromNative != null) {
      return fromNative;
    }
  } catch {
    // 네이티브 브릿지가 없는 환경(브라우저 dev) → localStorage 폴백
  }
  try {
    return parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

/** 사용자 입력을 저장해요. 운세 결과는 매번 재계산하므로 입력값만 보관해요. */
export async function saveUser(user: StoredUser): Promise<void> {
  const raw = JSON.stringify(user);
  try {
    await Storage.setItem(KEY, raw);
  } catch {
    // 무시하고 localStorage로 이어서 저장
  }
  try {
    localStorage.setItem(KEY, raw);
  } catch {
    // 저장 불가 환경 무시
  }
}

/** 저장된 생년월일을 삭제해요 ("생일 다시 입력"). */
export async function clearUser(): Promise<void> {
  try {
    await Storage.removeItem(KEY);
  } catch {
    // 무시
  }
  try {
    localStorage.removeItem(KEY);
  } catch {
    // 무시
  }
}
