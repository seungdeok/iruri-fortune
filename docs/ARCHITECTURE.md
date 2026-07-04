# 아키텍처

## 디렉토리 구조
```
src/
├── App.tsx              # 컴포지션 루트 (계층 조립만 담당)
├── main.tsx             # 엔트리 (TDSMobileAITProvider)
├── components/          # 프레젠테이션 계층 (TDS Web 컴포넌트)
│   ├── BirthInput.tsx     # 생년월일·양음력 입력
│   ├── FortuneResult.tsx  # 오늘의 운세 결과
│   ├── LoadingView.tsx    # 저장소 로딩 화면
│   └── BottomBar.tsx      # 하단 CTA 컨테이너
├── hooks/
│   └── useFortune.ts    # 애플리케이션 계층 (상태·오케스트레이션)
├── fortune/             # 도메인 계층 (순수 함수, 플랫폼 의존성 없음)
│   ├── engine.ts          # getDailyFortune(user, dateStr) → DailyFortune
│   ├── zodiac.ts          # 생년 → 12지(띠)
│   ├── prng.ts            # 결정적 해시 + PRNG (mulberry32)
│   ├── date.ts            # 날짜 문자열/유효성/라벨
│   ├── data.ts            # 큐레이션 문구·등급·행운 색 상수
│   └── types.ts           # 도메인 타입
└── storage/
    └── userStorage.ts   # 인프라 계층 (Storage → localStorage 폴백)
```

## 패턴
- **4계층 단방향 의존**: 프레젠테이션(`components/`) → 애플리케이션(`hooks/`) → 도메인(`fortune/`) / 인프라(`storage/`). 하위 계층은 상위를 모른다.
- **순수 함수 도메인**: `fortune/`은 React·플랫폼 SDK를 import하지 않는다. 같은 입력엔 항상 같은 출력.
- **의존성 격리**: 앱인토스 `Storage` 같은 플랫폼 SDK 의존성은 `storage/userStorage.ts` 한 곳에만 둔다.
- **결정적 계산**: 시드 = `hash(birthdate|calendarType|YYYY-MM-DD)` → PRNG → 점수/문구 선택.

## 데이터 흐름
```
앱 시작
  → useFortune 가 loadUser() 로 저장된 입력 조회 (ready=true)
  → 입력 있음: getDailyFortune(user, todayString()) 로 오늘 운세 계산 → FortuneResult 렌더
  → 입력 없음: BirthInput 렌더
        → onSubmit(user) → saveUser(user) + useMemo 재계산 → FortuneResult 로 전환
  → '생일 다시 입력': reset() → clearUser() → BirthInput 로 복귀
```

## 상태 관리
- 전역 스토어 없음.
- 클라이언트 상태: `useState`로 `user`(입력) · `ready`(로딩 완료)만 관리.
- 파생 상태: `fortune`은 `useMemo`로 오늘 날짜 기준 재계산 → 날짜가 바뀌면 자동 갱신, 하루 동안은 동일 유지.
- 영속: 입력값만 앱인토스 `Storage`(없으면 `localStorage`)에 저장. 운세 결과는 저장하지 않음.
