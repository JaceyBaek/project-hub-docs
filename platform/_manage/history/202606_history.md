<!--
sidebar_title: 2026년 6월
sidebar_order: 1
-->

# 2026년 06월 작업 히스토리

---

## 2026-06-01 — 플랫폼 전수검토 이슈 처리 (19:33)

**작업 내용**

### google_drive_backup 전수검토 이슈 4건 완료
- `main.py`: `BACKUP_SOURCE_PATH` 기본값 절대경로 제거 → 미설정 시 `ValueError`
- `wiki_publisher.py`: `DOCS_DIR`·`GUIDE_FILE_PATH` → `Path(__file__)` 기반 상대 경로 + `MANUAL_HTML` → `_build_manual_html()` 동적 함수 전환 (env var 반영)
- `apps/catalog.yml` repo 필드: `JaceyBaek/google_drive_backup` → `JaceyBaek-GSRetail/project-hub`
- 정책 결정 `P-DEC-002`: `apps/`는 `PROJECTS_GLOBAL.md` 제외, `apps/catalog.yml`이 source of truth (분사 가능성 고려)
- `PROJECTS_GLOBAL.md` 활성 섹션에 apps 범위 제외 주석 추가

### 플랫폼 전수검토 이슈 4건 완료 → 아카이브
- `plugins/catalog.yml` mcp_platform 버전 `0.1.0` → `0.5.1`
- `plugins/catalog.yml` mcp_router 항목 제거 (mcp_platform router/ 서브패키지로 통합)
- `plugins/catalog.yml` secrets_loader v0.1.0 추가 (dependents: wiki_faq_builder·wiki_mbo_builder·eacct_chatbot)
- `scripts/` 폴더 구조 정리: `credentials/`·`install_app.py` → `platform/setup/`으로 이동. 경로 참조 12개 파일 전수 갱신

### platform-multiuser-audit 5건 처리 (3건 설계 결정 필요로 보류)
- `hub_init.py` B-01: `paths.hub_root`·`paths.plugins` 경로 구분자 백슬래시 → 슬래시 수정
- `collab/README.md` §16: 해제 표기 추가 (DEV_D01 종료 봉인으로 2026-05-15 자동 해제)
- `platform/setup/config/hub_config.yml` B-05: 개인 정보 없음 확인
- `collab/USAGE.md`: `Codex` 6곳 → `{collab_author}`·`{collab_verified_by}`·`{collab_tested_by}` 역할 변수 치환
- 보류: 구조적 핵심 질문 1~4 / A-01 CLAUDE_global.template.md 개인 정보 / A-04 TC-ID 접두어

**변경 파일**
- `apps/google_drive_backup/source/src/main.py`
- `apps/google_drive_backup/source/src/wiki_publisher.py`
- `apps/google_drive_backup/source/.env.example`
- `apps/google_drive_backup/CLAUDE.md`
- `apps/catalog.yml`
- `PROJECTS_GLOBAL.md`
- `platform/extensions/plugins/catalog.yml`
- `platform/hub_init.py`
- `platform/processes/collab/README.md`
- `platform/processes/collab/USAGE.md`
- `platform/setup/install_app.py` (이동: `extensions/scripts/` → `setup/`)
- `platform/setup/credentials/` (이동: `extensions/scripts/` → `setup/`)
- `platform/setup/secrets_guide.md`, `platform/processes/project/project_creation.md`, `platform/setup/new_mcp_server_setup.md`, `apps/README.md`, `README.md`, `platform/init_project.py`, `platform/extensions/plugins/secrets_loader/secrets_loader/loader.py`, `platform/extensions/plugins/secrets_loader/CLAUDE.md`, `projects/eacct_mcp/source/src/db.py`, `projects/eacct_mcp/dist/md/02_FLW_eacct_mcp_프로세스흐름도.md` (경로 참조 갱신)
- `platform/_manage/decisions.md` (P-DEC-002 추가)
- 브레인스톰 아카이브: `apps/google_drive_backup/_manage/brainstorm/archive/20260601_전수검토_이슈.md`, `platform/_manage/brainstorm/archive/20260601_전수검토_플랫폼이슈.md`

---

## 2026-06-01 — CLAUDE.md brainstorm 자동 아카이브 규칙 추가 (19:00)

**작업 내용**
- `CLAUDE.md` 브레인스톰 아카이브 규칙에 타이밍 트리거 명문화: 마지막 `[ ]` 체크 즉시 → Jacey 알림 + 상태 `closed` + `brainstorm/archive/` 자동 이동 (별도 지시 없어도 자동 선행)

**변경 파일**
- `CLAUDE.md` (brainstorm 아카이브 규칙 섹션)

---

## 2026-06-01 — collab 설계 완료 아카이브 절차 등록 + brainstorm-triage bundle 이동 (14:20)

**작업 내용**
- `20260529-2010_brainstorm-triage` bundle: 모든 design 문서(DIR·ORC·D01~D04) approved 완료, 설계 마무리 → `archive/eacct_chatbot/20260529-2010_brainstorm-triage/`로 이동 (DEV_D01 파일 포함 bundle 전체)
- MAP.md: 설계 문서 플래그 `[resolved · verified · approved · archived]`, DEV_D01 경로 + 플래그 `[active · verified(codex) · archived]`로 갱신
- `archive/INDEX.md`: brainstorm-triage bundle 항목 추가
- **설계 완료 즉시 아카이브 절차 신규 등록**:
  - `platform/processes/collab/README.md` §12: "설계 완료 즉시 아카이브 이동 — DEV 진행 중이어도 예외 없음" 규칙 추가
  - `platform/TRIGGERS.md`: "마지막 design 문서 `approved_by: jacey` 기재 감지 → 설계 완료 아카이브 자동 트리거" 행 추가

**변경 파일**
- `platform/processes/collab/archive/eacct_chatbot/20260529-2010_brainstorm-triage/` (bundle 이동)
- `platform/processes/collab/MAP.md`
- `platform/processes/collab/archive/INDEX.md`
- `platform/processes/collab/README.md` (§12)
- `platform/TRIGGERS.md`

---

## 2026-06-01 — collab AI 명칭 전면 변수화 완료 (14:11)

**작업 내용**
- collab 다중 사용자 적합성 감사 브레인스톰 (`platform/_manage/brainstorm/20260601_platform-multiuser-audit.md`) 기반 A-03·A-04 잔존 이슈 전면 처리
- **[A-03] `Jacey` 하드코딩 제거**: README 서두·§4·§4-1·§5·§7·§8·§9·§15·footer + 템플릿 주석 4곳 → `{user_name}` 치환
- **[A-04] `Codex`/`Antigravity` 하드코딩 제거**: README §4·§5·§7·§8·§9·§15·footer + `_template_testcase.md` 주석 → `{collab_verified_by}`/`{collab_tested_by}` 치환
- 브레인스톰 파일 A-03·A-04 완료 처리 및 파생 이슈 2건 등록 (USAGE.md Codex 잔존, TC-ID TC-C/TC-A 접두어 명칭 결정)
- 감사 추적 원칙 적용: README §16 날짜 기반 이력·MAP.md 이력 기록 내 AI명은 소급 변경 없이 보존

**변경 파일**
- `platform/processes/collab/README.md` (16건)
- `platform/processes/collab/_template_design.md`
- `platform/processes/collab/_template_dev.md`
- `platform/processes/collab/_template_testcase.md`
- `platform/_manage/brainstorm/20260601_platform-multiuser-audit.md`

---

## 2026-06-01 — collab DEV·TC 파일명 규칙 수정 + 레슨런 등록 (13:50)

**작업 내용**
- collab DEV·TC 파일명 source-id 오류 수정: ORC 번들 레이블(DEV-A) → detail ID(D01)
  - `30_DEV_A_security-auth-ops.md` → `30_DEV_D01_security-auth-ops.md`
  - `40_TC_DEV-A_security-auth-ops.md` → `40_TC_D01_security-auth-ops.md`
- 파일 내부 상호 참조 및 MAP.md 경로 갱신
- 레슨런 등록: DEV·TC 파일명 source-id = detail ID (ORC 번들 레이블과 혼용 금지)

**변경 파일**
- `platform/processes/collab/eacct_chatbot/20260529-2010_brainstorm-triage/30_dev/30_DEV_D01_security-auth-ops.md` (파일명 변경)
- `platform/processes/collab/eacct_chatbot/20260529-2010_brainstorm-triage/40_testcase/40_TC_D01_security-auth-ops.md` (파일명 변경)
- `platform/processes/collab/MAP.md`
- `platform/processes/lessons_learned.md`
- `projects/eacct_chatbot/_manage/lessons.md`

---

## 2026-06-01 — collab AI 역할 변수화 + TC 파일 프로세스 정비 + 레슨런 등록 (13:27)

**작업 내용**
- collab 협업 AI 역할 변수화: `personal.yml` `collab` 섹션 신규 등록 (`author`/`verified_by`/`tested_by` 3개 역할)
- 템플릿 3개(`_template_dev.md`·`_template_design.md`·`_template_testcase.md`) AI명 하드코딩 → `{collab_author}`·`{collab_verified_by}`·`{collab_tested_by}` 플레이스홀더로 전면 교체
- collab README §6 역할표·TC 섹션·§14 도구별 차이 동일 변수화, 협업 AI 등록/변경 프로세스 서브섹션 신규 추가
- CLAUDE.md 운영 정책 13번 추가: collab 작업 시작 전 AI 역할 확인 + 변경 프로세스
- TC 파일 프로세스 레슨런 2건 등록 + CLAUDE.md 운영 정책 12번 추가 (DEV §2 완료 즉시 TC 작성, 템플릿 준수 필수)
- `platform/processes/lessons_learned.md` 협업/프로세스 섹션 상단에 2건 승격

**변경 파일**
- `platform/setup/config/personal.yml`
- `platform/processes/collab/_template_dev.md`
- `platform/processes/collab/_template_design.md`
- `platform/processes/collab/_template_testcase.md`
- `platform/processes/collab/README.md`
- `platform/processes/collab/MAP.md`
- `platform/processes/lessons_learned.md`
- `CLAUDE.md`

---

## 2026-06-01 — D04 ui-eacct-integration 리뷰·합의·승인 완료 + CLAUDE.md 규칙 정비 (11:45)

**작업 내용**
- D04 ui-eacct-integration Claude R1 리뷰(§2) 작성: 동의 5건, 우려 5건(UI-B 진입기준 불일치·fill-form schema 소유권·에러 보정 기준·export 형태·structured output 참조), 역질문 3건
- Codex §3 응답 확인 후 전 항목 합의 → resolved_by: claude (11:33)
- Codex verified_by (11:37) / Jacey approved_by (11:42) 완료
- D01~D04 전체 `jacey_approved` 완료, DEV-D 진입 게이트 해제
- MAP.md D04 상태 `[active · resolved · verified · jacey_approved]` 갱신
- CLAUDE.md 규칙 19 신규 추가: 작업 흐름 유지 (범위 명확 시 끝까지 완수 후 다음 스텝 안내)
- CLAUDE.md 규칙 14 보강: 메모리 도구 호출 직전 판단 게이트 명시
- lessons_learned 메모리/플랫폼 분리 항목 재발(2026-06-01) 사실 및 강화 대책 추가

**변경 파일 (git 추적)**
- `platform/processes/collab/eacct_chatbot/20260529-2010_brainstorm-triage/20_detail/20_D04_ui-eacct-integration.md`
- `platform/processes/collab/MAP.md`
- `CLAUDE.md`
- `platform/processes/lessons_learned.md`

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
