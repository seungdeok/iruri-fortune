import { useCallback, useEffect, useMemo, useState } from "react";

import { todayString } from "../fortune/date";
import { getDailyFortune } from "../fortune/engine";
import type { DailyFortune, StoredUser } from "../fortune/types";
import { clearUser, loadUser, saveUser } from "../storage/userStorage";

export interface UseFortuneResult {
  /** 저장소 로딩이 끝났는지 여부 */
  ready: boolean;
  user: StoredUser | null;
  fortune: DailyFortune | null;
  submit: (user: StoredUser) => void;
  reset: () => void;
}

/**
 * 애플리케이션 계층: 저장소(인프라)와 운세 엔진(도메인)을 연결하는 오케스트레이션 훅.
 * UI 컴포넌트는 이 훅이 노출하는 상태와 액션만 사용하고, 하위 계층은 알 필요가 없어요.
 */
export function useFortune(): UseFortuneResult {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    loadUser().then((loaded) => {
      if (!alive) {
        return;
      }
      setUser(loaded);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  // 오늘 날짜 기준으로 결정적으로 재계산 → 하루 유지 + 다음날 자동 갱신
  const fortune = useMemo(
    () => (user != null ? getDailyFortune(user, todayString()) : null),
    [user],
  );

  const submit = useCallback((next: StoredUser) => {
    setUser(next);
    void saveUser(next);
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    void clearUser();
  }, []);

  return { ready, user, fortune, submit, reset };
}
