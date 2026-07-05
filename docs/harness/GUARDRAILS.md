# GUARDRAILS — 재발 방지 규칙

실행-검토에서 나온 교훈 중 "다음부터 이렇게 하면 그 실수를 안 한다" 수준으로 일반화된 규칙만 한 줄씩 모아요.
compound 단계에서 새 규칙이 생기면 여기에 추가하고, 다음 작업의 `plan`/`brainstorm`이 이 목록을 먼저 읽어요.
개별 사례의 자세한 맥락은 `docs/harness/<slug>.md` 해결 노트에 있어요.

## 규칙

<!-- 형식: - [YYYY-MM-DD] 규칙 한 줄. (근거: <slug>.md) -->

- [2026-07-05] Claude Code 플러그인 설정(`enabledPlugins`·`extraKnownMarketplaces`)은 커밋되는 `.claude/settings.json`에 넣지 말고 `.claude/settings.local.json`(로컬) 또는 `~/.claude/settings.json`(전역)에만 둔다. 팀 공유가 필요하면 커밋 대신 README에 설정법을 문서화한다. (근거: claude-plugin-config-scope.md)
