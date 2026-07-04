# docs/harness — 실행-검토에서 배운 것을 되먹이는 곳

Compound Engineering의 마지막 단계(compound)가 남기는 교훈 저장소예요.
목표는 하나: **한 번 겪은 실수를 다음 사이클에서 다시 겪지 않는 것.**

## 루프에서의 위치
`brainstorm → plan → work → simplify → review → compound`

리뷰가 끝난 뒤(코드 변경이 있는 작업 한정) compound 단계에서 이 폴더에 기록해요.
자세한 규칙은 루트 `CLAUDE.md`의 "5. Compound" 섹션을 참고하세요.

## 구성
- `GUARDRAILS.md` — 재발 방지 규칙을 한 줄씩 모은 파일. 다음 작업의 `plan`/`brainstorm`이 먼저 읽는 grounding이에요. (루트 `CLAUDE.md`에서 `@docs/harness/GUARDRAILS.md`로 항상 로드돼요.)
- `<slug>.md` — 개별 해결 노트. 아래 형식을 따라요.

## 해결 노트 형식 (`docs/harness/<slug>.md`)
```markdown
# <문제 한 줄 요약>

- 날짜: YYYY-MM-DD
- 작업/PR: (링크 또는 브랜치)

## 문제
무슨 일이 있었나. 증상.

## 원인
왜 발생했나. 근본 원인.

## 해결
어떻게 고쳤나.

## 재발 방지
다음에 같은 실수를 막으려면 무엇을 해야 하나.
→ 규칙으로 일반화되면 GUARDRAILS.md에 한 줄로 승격.
```

## 사용법
- 기록: 리뷰 후 `/ce-compound` 실행 → 이 폴더에 노트 저장 (기본 경로 `docs/solutions/`가 아닌 `docs/harness/`로 지정).
- 승격: 재발 방지 규칙은 `GUARDRAILS.md`에 한 줄로 추가.
- 배운 게 없으면 노트를 만들지 않고 넘어가도 돼요.
