<!--
sidebar_title: 2026년 9월
sidebar_order: 1
-->

# 2026년 09월 작업 히스토리

---

## 2026-09-14 — platform `_manage/brainstorm/` 전수 점검·완료 처리·유형 통합 (12:24)

**작업 내용**

- `platform/_manage/brainstorm/` 12개 파일 전수 점검 — 각 파일의 관련 collab bundle(활성·아카이브), 프로젝트 생성 여부, decisions.md·history 기록을 대조해 실제 완료 여부 판정
- **완료 확인 → archive 이동 (2건)**
  - `20260608_claude-settings-hooks-migration.md` — 후보 A~F 전건이 `_archive/PLATFORM/20260608-1855_...`·`20260609-1316_collab-process-read-gate-hooks` 두 bundle로 구현·검증·승인 완료됨을 확인. 미결 사항 전건 `[x]` 처리 후 `brainstorm/archive/`로 이동
  - `20260827_model-harness-role-separation.md` — `_archive/PLATFORM/20260828-0908_model-harness-role-separation/` bundle(DIR·ORC·D01~D05, DEV_D01~D05 전건 `jacey_approved · archived`, 2026-08-30 20:46 최종 승인)로 완결 확인. 상태를 `closed`로 갱신 후 `brainstorm/archive/`로 이동
- **부분 완료 갱신 (2건, open 유지)**
  - `20260601_platform-multiuser-audit.md` — A-02(모델명 하드코딩)·구조적 질문 2(협업 AI 역할 추상화)·A-04 TC-ID 접두어 결정을 위 model-harness-role-separation 후속 collab 결과로 완료 표시. A-01·A-05·구조적 질문 1·3·4는 여전히 미결로 유지
  - `20260830_model-harness-role-separation-followups.md` — §2(G-9 Kiro 자동 오케스트레이션)·§5(모델 다양성 확보)가 별도 bundle `20260831-0942_collab-role-auto-dispatch`(D01~D05 3-way 검증 완료, MiniMax·GLM 온보딩)로 부분·실질 달성됐음을 인라인 갱신. §1(F-01·F-02 발효 전제)·§3(D-09 훅 트랙)·§4(harness 재관측)·§6(developer 대체 모델)은 착수 흔적 없어 미결 유지
  - `20260702_collab-ai-pipeline-automation.md` — 재검토 기록 추가. Kiro 전환 후에도 Gemini 세션 내 자동 전환은 여전히 불가(#6637)로 확인되어 보류 결정이 유효함을 명시. G-9 실질 목표는 별도 방식(서브프로세스 raw ID 호출)으로 달성됐음을 병기
- **유형 통합 (품의서 자동 매핑, 2건 → 1건)**
  - `20260811_품의서_자동_매핑_대안검토.md`(QA DB 실측 기반 비교 대안안)를 원안 `20260727_품의서_자동_매핑.md`의 "## 대안검토" 섹션으로 흡수 통합 후 대안검토 파일 삭제. 두 문서가 동일 과제의 원안/대안 비교 관계였고 `project_management.md`의 "기존 파일에 논의 추가(누적) 방식" 원칙에 맞춰 단일 파일로 정리
- **변경 없음 (완료 근거 없어 open 유지, 4건)**: `20260610_event-driven-auto-remediation.md`(프로젝트·collab 모두 미착수), `20260616_project-hub-workspace-catalog-boundary.md`(핵심 미결 사항 그대로), `20260708_collab-process-efficiency-redesign.md`(PLATFORM 승격 안 됨), `20260716_disk-cleanup-automation-project.md`(프로젝트 생성 자체 없음), `20260901_kiro-cli-gpt-terra-overload-vendor-inquiry.md`(내부 대응만 완료, 외부 벤더 문의는 `ISSUES_GLOBAL.md` `I-GLOBAL-001` open 상태 그대로)
- `platform/docs/catalog.yml`·`platform/extensions/services/webview/_sidebar.md`를 `scan_docs.py`·`generate_sidebar.py` 재실행으로 최신화 (이동·삭제된 브레인스톰 경로 반영)

**변경 파일**

- `platform/_manage/brainstorm/20260601_platform-multiuser-audit.md`
- `platform/_manage/brainstorm/20260702_collab-ai-pipeline-automation.md`
- `platform/_manage/brainstorm/20260727_품의서_자동_매핑.md` (대안검토 통합)
- `platform/_manage/brainstorm/20260830_model-harness-role-separation-followups.md`
- `platform/_manage/brainstorm/archive/20260608_claude-settings-hooks-migration.md` (이동)
- `platform/_manage/brainstorm/archive/20260827_model-harness-role-separation.md` (이동)
- 삭제: `platform/_manage/brainstorm/20260811_품의서_자동_매핑_대안검토.md`
- `platform/docs/catalog.yml`, `platform/docs/DOCS_STATUS.md`, `platform/extensions/services/webview/_sidebar.md` (자동 재생성)

---

## 2026-09-14 — `eacct_approval_doc_mapping` 프로젝트 생성 + submodule 오등록 롤백 + `init_project.py` 버그 2건 수정

**작업 내용**

- 브레인스톰 `20260727_품의서_자동_매핑.md`를 PoC 프로젝트로 착수 결정. 파일명을 영문(`20260727_eacct-approval-doc-mapping.md`)으로 변경(관련 `lessons_learned.md` 링크도 동기화)
- `platform/init_project.py`로 `eacct_approval_doc_mapping`(P2609141) 프로젝트 생성 — GitHub repo(`JaceyBaek/eacct_approval_doc_mapping`, private) 생성·main/develop push까지는 정상 완료
- **오등록 발견 및 롤백**: 생성 로그의 "project-hub submodule 등록 완료"를 사용자가 지적 — 2026-08-05·08-06에 서브모듈을 전면 폐지(`google_drive_backup` 1건 예외)하고 일반 clone + 루트 `.gitignore` 제외 방식으로 전환한 결정(`202608_history.md` 08-05·08-06 항목)이 있었는데, `init_project.py`가 그 결정 이후 갱신되지 않아 8단계에서 여전히 `git submodule add` + commit + push를 실행해 신규 프로젝트만 서브모듈로 등록되고 origin에 push된 상태였음
  - `git submodule deinit -f` → `git rm -f`(＋`.gitmodules` 자동 정리) → `.git/modules/projects/eacct_approval_doc_mapping` 잔여 메타 제거 → GitHub repo에서 일반 `git clone`으로 워킹트리 재생성(기존 7개 프로젝트와 동일 패턴)
  - 루트 `.gitignore`에 `projects/eacct_approval_doc_mapping/` 추가
  - 기존 7개 프로젝트(`gmail_cleaner` 등)는 이미 일반 clone 상태였으므로 영향 없음 — 이번에 새로 생성된 프로젝트 1건만 해당
- **`init_project.py` 버그 2건 수정**
  1. `setup_dev_github()`의 8단계(project-hub submodule 등록 + commit + push) 전체 제거. 대신 `register_to_root_gitignore()` 신규 함수를 추가해 프로젝트 생성 시 루트 `.gitignore`에 자동 등록(2026-08-06 결정 반영)
  2. `register_to_projects_global()`이 `PROJECTS_GLOBAL.md`의 구 스키마(6컬럼: 코드·프로젝트명·폴더·담당·시작일·요약) 마커로 삽입 위치를 찾고 있었는데, 실제 파일은 2026-08 확장된 8컬럼 스키마(상태·코드·프로젝트명·폴더·담당·시작일·단계·요약)라 마커 불일치로 항상 자동 등록에 실패하고 있었음(이번 프로젝트 생성 시 "PROJECTS_GLOBAL.md 자동 등록 실패" 경고로 발견, 수동 등록으로 임시 처리했던 것을 스크립트 레벨에서 근본 수정) → 정규식으로 "## 진행중" 섹션의 실제 테이블 구분선을 찾아 그 다음 행에 삽입하도록 변경, 컬럼 수 변경에도 견고하도록 함
  - 임시 테스트 스크립트로 두 함수 모두 dry-run 검증(실 파일 미변경) 후 정상 동작 확인, 검증용 임시 파일은 삭제

**변경 파일**

- `platform/init_project.py` (submodule 등록 로직 제거, `register_to_root_gitignore()` 신규, `register_to_projects_global()` 마커 로직 수정)
- `.gitmodules` (`projects/eacct_approval_doc_mapping` 항목 제거)
- `.gitignore` (`projects/eacct_approval_doc_mapping/` 추가)
- `PROJECTS_GLOBAL.md` (P2609141 수동 등록 — 향후 스크립트 정상 동작 확인됨)
- `projects/eacct_approval_doc_mapping/` (서브모듈 → 일반 clone으로 재생성)
- `platform/_manage/brainstorm/20260727_eacct-approval-doc-mapping.md` (구 `20260727_품의서_자동_매핑.md`에서 영문 파일명으로 변경)
- `platform/processes/rules/lessons_learned.md` (위 파일명 변경에 따른 참조 경로 갱신)

---

## 2026-09-14 — 브레인스톰 프로젝트 이동 + §A-6 사전 점검 실측 완료

**작업 내용**

- `platform/_manage/brainstorm/20260727_eacct-approval-doc-mapping.md`를 `projects/eacct_approval_doc_mapping/_manage/brainstorm/`로 이동(플랫폼 공용 영역 → 프로젝트 전용 영역). `lessons_learned.md`의 참조 링크 동기화, 프로젝트 `CLAUDE.md`에 배경·현재 차단 항목 요약 추가
- 브레인스톰 §A-6(가능성을 좌우하는 단일 확인 항목) 사전 점검을 QA DB(`qgseacc`, 읽기 전용) 실측으로 진행 — `source/check_doc_url.py` 작성, `eacct_mcp`와 동일 접속 정보(keyring `eacct_mcp/gseaccaisel`) 재사용
- **실측 결과**: `eacc_bill_header.DOC_URL` 컬럼 존재 확인, 값 패턴은 `/Upload_Approval/10000/Doc/{YYYY}/{끝3자리}/{20자리}.mht`(96.9%) 등 3종 혼재. 단 **`GW_DOC`(연결) 없이 `DOC_URL`만 있는 케이스가 0건** — `DOC_URL`은 "연결" 처리를 거친 건에만 채워짐이 확인됨
- **핵심 재판정**: §A-6이 기대했던 "내용 지문 대조로 제목 인덱스의 천장(과거 연결 이력 필요)을 벗어난다"는 전제가 **성립하지 않음** — `DOC_URL` 인덱스도 `DOC_TITLE` 인덱스와 동일하게 연결 이력에 종속되어, 사후 매칭이 필요한 대상(파일첨부만 되고 연결 안 된 전표)의 품의서 원본 위치는 이 컬럼으로 얻을 수 없음
- 미확인 잔여 항목(그룹웨어 서버 실제 접근 권한 등)은 DB 조회로 판단 불가한 영역이라 Jacey 확인 필요 항목으로 브레인스톰·todo.md에 별도 기록
- PoC 방향 제안: 경로 A(파일명 선별)+B(제목 인덱스)만으로 담당자 모니터링 화면을 먼저 구현하고, 경로 C(그룹웨어 직접 연동)는 접근 권한 확인 후 2차 확장

**변경 파일**

- `projects/eacct_approval_doc_mapping/_manage/brainstorm/20260727_eacct-approval-doc-mapping.md` (플랫폼에서 이동 + §A-6 사전 점검 결과 섹션 추가)
- `projects/eacct_approval_doc_mapping/_manage/todo.md` (T001~T004 등록)
- `projects/eacct_approval_doc_mapping/CLAUDE.md` (배경·현재 차단 항목 섹션 추가)
- `projects/eacct_approval_doc_mapping/source/check_doc_url.py` (신규 — DB 실측 스크립트)
- `projects/eacct_approval_doc_mapping/source/.env.example` (DB 접속 비시크릿 값 추가)
- `platform/processes/rules/lessons_learned.md` (브레인스톰 이동에 따른 참조 경로 갱신)
- `platform/docs/catalog.yml`, `platform/docs/DOCS_STATUS.md`, `platform/extensions/services/webview/_sidebar.md` (자동 재생성)

## 2026-09-29 — `.claude/settings.json` ↔ `.kiro/hooks/` 훅 하네스 공통화 (15:03)

**작업 내용**

- Jacey 문의로 시작 — `.claude/settings.json`에 정의된 H-001/H-006/H-RG/H-GIT-REMOTE/H-DOC-QUALITY/CI감시 훅이 Claude Code 전용 스키마(`matcher: Edit|Write|Bash`)라 Kiro에서는 전혀 실행되지 않고 있음을 확인. `.kiro/hooks/`에는 `h-shell-compound-guard.json` 1건만 등록돼 있었음
- Kiro의 실제 PreToolUse stdin payload 스키마를 임시 프로브 훅으로 실측(검증 후 즉시 삭제) — `tool_name`/`tool_input`/`cwd` 키 이름은 Claude Code와 동일하나 도구명·필드명이 다름을 확인
  - 파일 쓰기: Claude `Write/Edit`(`file_path`,`old_string`,`new_string`) vs Kiro `fs_write/str_replace/fs_append`(`path`,`oldStr`,`newStr`)
  - 셸 실행: Claude `Bash`(`command`) vs Kiro `execute_pwsh/control_pwsh_process`(`command`, 키는 동일)
  - transcript 조회: Claude Code는 `transcript_path`(세션 JSONL) 제공, Kiro는 미제공 — 이전 브레인스톰(`20260830_model-harness-role-separation-followups.md` V-04/V-05)에 미검증으로 남아있던 항목을 실측으로 확정
- `platform/extensions/scripts/hooks/_adapter_common.py` 신규 — 하네스별 raw payload를 공통 스키마(`kind: file_write|shell`, `file_path`, `old_content`, `new_content`, `command`, `cwd`)로 정규화하는 `normalize_payload()`, transcript 지원 여부를 확인하는 `has_transcript_support()` 제공
- 기존 5개 훅 스크립트를 공통 스키마 기반으로 수정(하네스 분기를 스크립트에서 제거, `_adapter_common` 호출로 대체): `h001_secret_detect.py`, `h006_sensitive_file.py`, `git_remote_guard.py`, `doc_quality_check.py`, `read_gate.py`
  - `read_gate.py`(H-RG-001~003)는 Kiro에 `transcript_path`가 없어 기존 fail-safe 경로(`events is None` → warn)를 그대로 타도록 처리 — Kiro에서는 이 규칙들이 block(exit 2) 없이 warn-only로만 동작함(설계된 강등이며 버그 아님)
  - `ci_watch_hook.ps1`(Claude Code `asyncRewake` 의존)은 Kiro v2 hook에 대응 기능이 없어 포팅 대상에서 제외
- `.kiro/hooks/`에 대응 트리거 6건 신규 등록: `h001-secret-detect-pre/post`, `h006-sensitive-file-pre/post`, `h-git-remote-guard`, `h-doc-quality-check`, `h-rg-read-gate`
- Kiro payload 샘플 파일로 5개 스크립트 전건 동작 검증(H-001 시크릿 감지, H-GIT-REMOTE `--force` 감지, H-RG-003 warn 강등 등 정상 확인) 후 임시 테스트 파일·러너 스크립트 삭제
- 실제 세션에서 `execute_pwsh` 호출 시 `.kiro/hooks/h-git-remote-guard.json` → `git_remote_guard.py`가 실제로 트리거되는지 임시 로그로 실측 확인 후 검증 코드 원복
- `platform/processes/security/hooks_policy_d02.md`에 어댑터 구조·한계(H-RG-003 Kiro warn 강등, CI 감시 미포팅)를 정책 SoT 갱신 규칙에 따라 인라인 기록

**변경 파일**

- `platform/extensions/scripts/hooks/_adapter_common.py` (신규)
- `platform/extensions/scripts/hooks/h001_secret_detect.py`
- `platform/extensions/scripts/hooks/h006_sensitive_file.py`
- `platform/extensions/scripts/hooks/git_remote_guard.py`
- `platform/extensions/scripts/hooks/doc_quality_check.py`
- `platform/extensions/scripts/hooks/read_gate.py`
- `platform/processes/security/hooks_policy_d02.md` (어댑터 구조·한계 기록)
- `.kiro/hooks/h001-secret-detect-pre.json` (신규)
- `.kiro/hooks/h001-secret-detect-post.json` (신규)
- `.kiro/hooks/h006-sensitive-file-pre.json` (신규)
- `.kiro/hooks/h006-sensitive-file-post.json` (신규)
- `.kiro/hooks/h-git-remote-guard.json` (신규)
- `.kiro/hooks/h-doc-quality-check.json` (신규)
- `.kiro/hooks/h-rg-read-gate.json` (신규)
