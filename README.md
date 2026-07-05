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

## Compound Engineering 하네스 (선택)

이 프로젝트는 `brainstorm → plan → work → simplify → review → compound` 루프를 [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) 플러그인으로 돌려요 (자세한 규칙은 `CLAUDE.md` 참고). Claude Code에서 이 하네스를 쓰려면 플러그인을 직접 켜야 해요.

> 플러그인·마켓플레이스 설정은 보안상 **커밋되는** `.claude/settings.json`에는 넣을 수 없어요 (레포가 팀원에게 임의 플러그인 설치를 강제하는 걸 막기 위해서예요). 그래서 **개인 로컬 설정**에만 넣어요.

프로젝트 루트에 `.claude/settings.local.json`을 만들고 아래 내용을 넣으세요 (이 파일은 `.gitignore` 처리돼 커밋되지 않아요):

```json
{
  "enabledPlugins": {
    "compound-engineering@compound-engineering-plugin": true
  },
  "extraKnownMarketplaces": {
    "compound-engineering-plugin": {
      "source": {
        "source": "github",
        "repo": "EveryInc/compound-engineering-plugin"
      }
    }
  }
}
```

Claude Code를 재시작하면 `/ce-brainstorm`, `/ce-plan`, `/ce-code-review`, `/ce-compound` 같은 스킬을 쓸 수 있어요. 전역(모든 프로젝트)에 켜고 싶으면 같은 내용을 `~/.claude/settings.json`에 넣으면 돼요.

## 유용한 링크

- [앱인토스 콘솔](https://apps-in-toss.toss.im/)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/)
- [앱인토스 개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)

AI를 사용하시는 경우 [여기](https://developers-apps-in-toss.toss.im/development/llms.html)를 확인해보세요.
