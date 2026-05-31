# TODO_GLOBAL

| ID | 출처 | 제목 | 우선순위 | 상태 | 기한 | 완료일 |
|---|---|---|---|---|---|---|
| G-001 | project-hub | daily_briefing submodule 추가 (구조 변환 완료 후 진행) | 높음 | 완료 | - | 2026-05-06 |
| G-002 | project-hub | 전역 파일 이전 (PROJECTS_GLOBAL.md 등 → D:\03.project-hub\) | 높음 | 완료 | - | 2026-05-06 |
| G-003 | project-hub | Google Drive 백업 경로 업데이트 (google_drive_backup 스크립트) | 높음 | 완료 | - | 2026-04-30 |
| G-004 | project-hub | 구조 점검 (파일/설정 검증) | 보통 | 완료 | - | 2026-05-06 |
| G-005 | project-hub | D:\03.Lab 탐색기에서 삭제 | 낮음 | 완료 | - | 2026-05-08 |
| G-006 | project-hub | 05.Claude 삭제 (구조 완성 후) | 낮음 | 완료 | - | 2026-05-07 |
| G-007 | project-hub | 온보딩 가이드 작성 (트리거 기반) | 낮음 | 대기 | - | - |
| G-008 | project-hub | Teams Webhook 등록 (GitHub Secrets TEAMS_WEBHOOK_URL) | 보통 | 대기 | - | - |
| G-009 | project-hub | hub_config.yml email.enabled dead config 정리 | 낮음 | 완료 | - | 2026-05-08 |
| G-010 | project-hub | platform/templates/deliverables/ HTML 템플릿 파일 배치 (Jacey 제작 후) | 높음 | 대기 | - | - |
| G-011 | 개인 | 프로젝트 현황 메일 또는 팀즈 알림 기능 개발 (일배치) | 보통 | 진행중 | - | - |
| G-012 | 개인 | 프로젝트 오픈 전 코드 및 보안 점검 실행 | 높음 | 대기 | - | - |
| G-013 | 개인 | 현재 구축 중인 프로젝트 관리 플랫폼에서 스킬 기능 구현 가능성 검토 | 보통 | 대기 | - | - |
| G-014 | 개인 | 스킬로 묶어서 사용할 유용한 기능 목록 발굴 | 보통 | 대기 | - | - |
| G-015 | 개인 | scheduler_monitor 프로젝트 착수 (스케줄러 작업 모니터링 및 이상 감지 알림) | 보통 | 대기 | - | - |
| G-016 | 개인 | {assistant} CLAUDE.md 정리 — 팀 공용으로 이관된 내용 제거, {assistant} 전용 내용만 유지 | 보통 | 완료 | - | 2026-05-08 |
| G-017 | project-hub | 공용 앱 레이어 설계 및 적용 — plugins/(연결 도구) / projects/(개인 프로젝트) / apps/(팀 공용 앱) 3레이어 구조로 분리 | 높음 | 완료 | - | 2026-05-08 |
| G-018 | project-hub | 비서통합 잔여 정리 — personal.yml.bak 삭제 / personal.yml.example 단일 구조 갱신 / templates/SETUP.template.md·guides/SETUP.md 세라 잔존 정리 | 높음 | 완료 | - | 2026-05-07 |
| G-019 | project-hub | 프로젝트 생성 시 프로젝트 코드 동시 부여 — init_project.py 입력 항목 추가, CLAUDE.md·PROJECTS_GLOBAL.md에 코드 컬럼 반영 | 보통 | 완료 | - | 2026-05-08 |
| G-020 | project-hub | [구조 논의] guides/scripts/ vs scripts/ 역할 분리 기준 정의 — deploy_record.py·wiki_sync.py 목적·호출 주체 명확화 후 scripts/ 통합 또는 core/ 이동 결정 | 낮음 | 완료 | - | 2026-05-08 |
| G-021 | project-hub | [구조 논의] platform/services/mcp/ 역할 재정의 — G-017 apps/ 레이어와 연계, 공용 MCP vs 프로젝트별 MCP(A안) 구분 명확화 | 보통 | 대기 | - | - |
| G-022 | project-hub | [구조 논의] docs/ 용도 명확화 — 현재 날짜 붙은 HTML 산출물 보관소, archive/docs/ 이동 또는 docs/를 아카이브 역할로 명문화 | 낮음 | 완료 | - | 2026-05-08 |
| G-023 | project-hub | README.md 폴더 구조 박스 일괄 갱신 — plugins/·apps/·docs/·mcp_server/·webview/·history/ 누락분 반영 | 낮음 | 완료 | - | 2026-05-11 |
| G-024 | project-hub | 프로젝트 라이프사이클 통합 재설계 — 단계(기획/설계/개발/테스트/배포/운영) 도입 + 운영 사이클 + GitHub Flow 형상관리 + 권한 정책 통합. 단계 폴더 구조 적용(산출물+템플릿), 5개 프로젝트 단계 메타 반영, 아이다 트리거 4개 추가 | 높음 | 완료 | - | 2026-05-12 |
| G-025 | project-hub | 산출물 메타 `last_reviewed` 필드 도입 + 6개월 미검토 정기 점검 트리거 (라이프사이클 §4-2 후속) | 보통 | 대기 | - | - |
| G-026 | project-hub | [검토 보류] collab 기반 AI 3개(Claude·Codex·Antigravity) 완전 자동화 파이프라인 구현 — Claude Code hooks + 각 CLI headless(subprocess) 방식, 추가 API 비용 없음. 선행 확인: Codex CLI·Antigravity CLI headless 모드 지원 여부. mcp 관련 개발 마무리 후 재검토 | 보통 | 대기 | - | - |
| G-027 | project-hub | rule_loading_policy 구현 — 작업 유형별 필수 선독 파일 체인 강제화. ① platform/processes/rule_loading_policy.md 신규 생성 ② CLAUDE.md 강제 선행 조항 추가 ③ TRIGGERS.md 공통 0단계 추가 | 보통 | 대기 | - | - |
