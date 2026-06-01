<!--
sidebar_title: 2026년 6월
sidebar_order: 1
-->

# 2026년 06월 작업 히스토리

---

## 2026-06-01 — collab 문서 규칙 정비 및 D02·DIR·ORC 승인 (10:16)

**작업 내용**
- D02 트래킹 테이블 교정: V-행을 별도 이슈로 잘못 분리한 것 수정, 상태값 비표준 제거
- D02·DIR·ORC Jacey 승인 완료 (approved_by: jacey)
- `jacey_approved_by` → `approved_by` 전체 통일 (README·USAGE·template·detail 6개 파일)
- `## 설계 종료 승인` 섹션 신규 도입: README 스펙 추가 + template + 승인 완료 4개 문서 적용
- collab 결재 헤더 컬럼 통일
  - design: `승인 (approved_by)` (필드명 패턴으로 통일)
  - dev: `개발 (author) / 설계검증 (verified_by) / 제3자 테스트 (tested_by) / 승인 (approved_by)`
- dev template frontmatter: `tester/approver` → `verified_by/tested_by/approved_by`
- collab 훅 예외 처리 개선: `_template` 파일과 `status: open/reviewing/responding` 미결 문서 제외

**변경 파일 (git 추적)**
- `platform/processes/collab/README.md`
- `platform/processes/collab/USAGE.md`
- `platform/processes/collab/_template_design.md`
- `platform/processes/collab/_template_dev.md`
- `platform/processes/collab/MAP.md`
- `.claude/settings.json`

---

## 2026-06-01 — 전체 전수검토: projects/extensions/apps 이슈 발굴 + brainstorm 기록 (02:48)

**작업 내용**
- projects/ 7개, platform/extensions/ 4개 영역, apps/ 1개 전수검토 실시
- 총 18개 이슈 발굴, brainstorm 파일 8개 신규 작성
- 플랫폼 이슈 중 프로젝트 귀속 4건 각 프로젝트 브레인스톰으로 이관

**주요 발견 이슈**
- `plugins/catalog.yml`: mcp_platform 버전 불일치(0.1.0→0.5.1), mcp_router 유령 등록, secrets_loader 미등록
- `google_drive_backup/source/src/main.py` · `wiki_publisher.py`: 절대경로 하드코딩
- `eacct_mcp`: 루트 테스트 파일 방치, logs/ gitignore 미확인(audit.jsonl 포함)
- `eacct_chatbot`: .venv 두 개 중복(0.3.0 vs 0.5.0), start.bat venv 불일치

**생성 파일**
- `platform/_manage/brainstorm/20260601_전수검토_플랫폼이슈.md` (이슈 4개)
- `projects/eacct_mcp/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 6개)
- `projects/eacct_chatbot/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 3개)
- `projects/eacct_source_analyzer/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 2개)
- `projects/gmail_cleaner/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 1개)
- `projects/wiki_faq_builder/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 3개)
- `projects/wiki_mbo_builder/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 4개)
- `apps/google_drive_backup/_manage/brainstorm/20260601_전수검토_이슈.md` (이슈 4개)

---

## 2026-06-01 — 메모리 정리 + CLAUDE.md 규칙 보완 + 플랫폼 문서 갱신 (01:33)

**배경**
- eacct_chatbot collab 문서(D02/D03/D04) 렌더링 이슈 조사 중 Codex가 `<!-- collab-frontmatter -->` 래퍼를 잘못 추가한 것 발견 및 원복
- 근본 원인 확인: Docsify frontmatter plugin 미설정 + collab design docs가 sidebar 미등록 상태 → webview에서 `---` YAML이 본문으로 렌더링됨. 단, 해당 파일들은 VS Code 환경에서만 보는 용도로 현재는 문제 없음
- 파일 전수 확인 미실시로 인한 오진단 발생 → CLAUDE.md 규칙 추가 및 메모리 정리

**CLAUDE.md 규칙 추가**
- 응답규칙 8-4: 파일 전수 확인 후 결론 — grep 0건은 "못 찾았다"일 수 있음, 문제 맥락에서는 파일 직접 교차 확인 필수

**메모리 정리 (지침 성격 → 플랫폼 이전)**
- 개인 메모리 전수 감사 실시: 지침·정책·규칙 성격 23건 삭제
- 삭제 기준: CLAUDE.md 14번 — "이 내용이 다른 사용자에게도 같은 효력?" YES면 hub, NO면 메모리
- 유지: user_jacey.md(개인 프로필), feedback_console_encoding.md(머신별), reference_structure.md(파일 위치 참조 맵)

**플랫폼 문서 갱신 (5곳)**
- `platform/setup/connection_setup.md`: 미소 API 스펙 참조 섹션 추가 (URL·Method·body 필드)
- `platform/extensions/tools/README.md`: 신규 작성 (폴더 구조·규칙·도구 목록·추가 절차)
- `platform/setup/new_mcp_server_setup.md`: MCP 2-layer 구조 결정(A안) 섹션 추가
- `projects/eacct_chatbot/CLAUDE.md`: needs_llm_fallback 상세 + 백엔드 패키지 구조 추가
- `projects/eacct/CLAUDE.md`: Java 개발환경 섹션 추가 (Java 1.8·Tomcat·Eclipse·작업 규칙)

---
