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
