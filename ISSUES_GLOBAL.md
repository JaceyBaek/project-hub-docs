# 전체 이슈 관리

| ID | 프로젝트 | 유형 | 제목 | 내용 | 상태 | 등록일 | 완료일 |
|---|---|---|---|---|---|---|---|
| I-GLOBAL-001 | PLATFORM | 외부문의 | Kiro CLI `gpt-5.6-terra` 모델 서브프로세스 호출 시 반복 과부하/검증 오류 | `kiro-cli.exe chat --no-interactive --agent-engine v1 --model gpt-5.6-terra --trust-all-tools`로 서브프로세스 호출 시 `InternalServerError (high load)`와 `ValidationException`이 간헐적으로 반복 발생. `claude-sonnet-5`에서는 미관측. 재현 정보·문의 사항 5가지: `platform/_manage/brainstorm/20260901_kiro-cli-gpt-terra-overload-vendor-inquiry.md` | open | 2026-09-01 | ~ |
