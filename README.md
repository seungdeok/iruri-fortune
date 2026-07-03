# iruri-fortune (오늘의 운세)

<p align="center">
  <img src="./public/iruri_thumbnail.png" alt="iruri-fortune 썸네일" width="480" />
</p>

생년월일과 양·음력만 입력하면 **오늘의 운세**를 알려주는 [앱인토스](https://apps-in-toss.toss.im/) 미니앱이에요.
백엔드 없이 순수 함수로 동작하며, 같은 입력에는 항상 같은 결과를 돌려줘요.

## 주요 기능

- 생년월일·양음력 입력 (한 번 입력하면 기기에 저장돼요)
- 띠 기반 오늘의 총운 (점수·등급·별점·메시지)
- 카테고리별 운세 (재물·애정·건강 등)
- 행운의 색·행운의 숫자 추천

## 기술 스택

- React 18 + TypeScript + Vite
- [@apps-in-toss/web-framework](https://developers-apps-in-toss.toss.im/)
- [TDS Mobile](https://developers-apps-in-toss.toss.im/design/components.md) (`@toss/tds-mobile`)

## 시작하기

```bash
nvm use          # .nvmrc 기준 Node 버전 사용
corepack enable  # package.json에 고정된 pnpm 버전 활성화
pnpm install
pnpm dev
```

## 배포하기

- 앱인토스 배포 API 키는 [앱인토스 콘솔](https://apps-in-toss.toss.im/) > 워크스페이스 > API 키 > 콘솔 API 키 에서 발급받을 수 있어요.

```bash
pnpm build
pnpm deploy
```

## 프로젝트 구조

```
src/
├── App.tsx              # 컴포지션 루트 (계층 조립)
├── components/          # 화면 (BirthInput · FortuneResult · LoadingView · BottomBar)
├── hooks/useFortune.ts  # 애플리케이션 상태·로직
├── fortune/             # 운세 계산 도메인 (engine · zodiac · prng · data)
└── storage/             # 사용자 정보 로컬 저장
```

## 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [앱인토스 개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)

AI를 사용하시는 경우 [여기](https://developers-apps-in-toss.toss.im/development/llms.html)를 확인해보세요.
