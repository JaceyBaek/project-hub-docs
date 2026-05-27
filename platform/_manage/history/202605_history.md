<!--
sidebar_title: 2026년 5월
sidebar_order: 1
-->

# 2026년 05월 작업 히스토리

---

## 2026-05-27 — eacct_chatbot 위젯 UX 개선 (17:12)

- 헤더 드래그로 패널 이동 (postMessage relay), 반대쪽 상·하단 코너 리사이즈 핸들 추가

---

## 2026-05-27 — 웹뷰 사이드바 전면 갱신 + index.html 경로 수정 (16:53)

### 작업 내용

- `generate_sidebar.py` 버그 수정
  - `platform/processes/collab` 경로가 `platform/processes` 보다 먼저 매칭되도록 FOLDER_TO_SECTION 순서 재정렬 → 협업 프로세스 섹션 복원
  - `platform/setup/` → 가이드 섹션 매핑 추가
- `index.html` 구 경로 3종 수정
  - `loadSidebar`: `platform/services/webview/` → `platform/extensions/services/webview/`
  - 아이콘 네비 가이드 링크: `platform/guides/SETUP` → `platform/setup/SETUP`
  - 아이콘 네비 히스토리 링크: `platform/history/` → `platform/_manage/history/`
  - 홈 스플래시·nameLink 동일 수정
- `.github/workflows/notify_update.yml` 경로 갱신
  - `platform/config/**` → `platform/setup/config/**` (a60942c 재편 반영)
  - `platform/guides/**` 제거 (존재하지 않는 경로)
- 신규 프로젝트 3개(eacct_chatbot·eacct_source_analyzer·eacct) CLAUDE.md + `_manage/` sidebar 메타데이터 추가
- eacct_mcp 히스토리 파일 메타데이터 추가
- `_sidebar.md` 재생성 — 모든 경로 현행화 완료

---

## 2026-05-27 — eacct_mcp 보안 거버넌스 문서 전환 + 지침 등록 (16:07)

### 작업 내용

- `eacct_mcp/docs/SECURITY_GOVERNANCE.md` 거버넌스 문서 전환
  - `SEC_REVIEW_REQUEST_20260527_mcp-chatbot-security.md` → `SECURITY_GOVERNANCE.md` 이름 변경
  - `§0 불변 원칙` 섹션 추가: collab `20260514-1554` 합의 기준선 (5대 설계 원칙·SEC 요구사항·10단계 hook·응답 분리·audit fail-closed)
- `eacct_mcp/CLAUDE.md` 보안 거버넌스 섹션 추가: 작업 전 필수 확인·§0 위배 경고 트리거·신규 tool 체크리스트
- eacct_mcp 서브모듈 포인터 갱신

---

## 2026-05-27 — collab 폴더명 명확화 — 10_direction · 40_testcase (15:16)

### 작업 내용

- `10_dir/` → `10_direction/` (dir = directory 오해 방지, 파일명 TYPE-CODE DIR과 명확히 구분)
- `40_tc/` → `40_testcase/` (tc 약어 직관성 부족)
- 물리 폴더 rename: `archive/PLATFORM/20260514-1554_mcp-chatbot-security-ops/` 내 2개 폴더
- 문서 전수 갱신: README·USAGE·_template_design·_template_dev·_template_testcase·MAP·TRIGGERS (replace_all)
- archive DEV 파일 9개 내 상대 링크 `../40_tc/` → `../40_testcase/` 수정 (링크 깨짐 방지)

### 최종 폴더 구조

```
{ts}_{slug}/
├── 10_direction/   (방향성·계획)
├── 20_detail/      (상세설계)
├── 30_dev/         (개발확인서)
└── 40_testcase/    (테스트케이스)
```

---

## 2026-05-27 — collab 네이밍 마이그레이션 완료 — D01·ts 제거·10_dir·ORC 통일 (14:53)

### 작업 내용

**파일 시스템 마이그레이션 (archive/ 3개 번들)**
- 번들 폴더: `DIR_{ts}_{slug}/` → `{ts}_{slug}/` (DIR_ 접두사 제거)
- 내부 폴더: `10_brief/` → `10_dir/`
- orchestration: `20_O001_...` → `20_ORC_...` (번호 제거)
- detail: `D001` → `D01` (2자리로 통일)
- 모든 파일명에서 `_{ts}_` 제거 (slug만 유지)
- 1554 번들: REQ/DIR/ORC/D01~D06/DEV_D01·D02+D04·D06-1~7/TC 전체 rename
- 1846 번들: `DEV_DIR_20260514-1925_...` → `30_DEV_DIR_implementation-workorder.md`
- 0836 번들: `D001_20260515-1011_...` → `20_D01_...`, `DEV_D001_...` → `30_DEV_D01_...`

**문서 갱신 (5개 파일)**
- `MAP.md`: 전수 경로 갱신 + DEV 항목에 `dev_started` 날짜 추가
- `archive/INDEX.md`: 번들 경로 갱신 (DIR_ 제거, D001→D01, O001→ORC)
- `README.md`: §2 구조도·stage prefix·파일명 패턴·식별 테이블·§3·§5·§9·§10·§12·§16 갱신
- `USAGE.md`: §3 개념 표·§5 Quick Start·§6 시나리오 B/C·§8 구조도·FAQ Q7 갱신
- `_template_design.md`: frontmatter 코멘트·파일명 패턴 주석·방향성 계획표 예시 갱신
- `TRIGGERS.md`: 리뷰 요청·리뷰 종료 트리거 경로 패턴 갱신

### 규칙 확정 (이번 마이그레이션으로 최종 정립)

- 파일명 패턴: `{sub-prefix}_{TYPE-CODE}{id?}_{slug}.md` (개별 파일 ts 없음)
- 번들 폴더: `{YYYYMMDD-HHmm}_{slug}/` (ts는 번들 폴더만)
- TYPE-CODE: `REQ` / `DIR` / `ORC` / `D{nn}` / `DEV` / `TC`
- ID: 2자리 D01~D99, ORC 번호 없음
- 생성 시각: frontmatter `created` 보존, DEV 시작일 MAP.md `dev_started` 기록

---

## 2026-05-27 — eacct_mcp 보안 검토 요청서 작성 + CI 경로 수정 (14:48)

### 작업 내용

- mcp_platform 버전 정합: pyproject.toml 0.5.0 → 0.5.1, CLAUDE.md v0.4.0 → v0.5.1 (D002~D006 구현 완료 반영)
- eacct_mcp 보안 검토 요청서 신규 작성 (`SEC_REVIEW_REQUEST_20260527_mcp-chatbot-security.md/html`)
  - §1 시스템 개요: 시각 아키텍처 플로우 다이어그램, 미카 챗봇 위젯 CSS 목업 포함
  - §2 핵심 보안 원칙 / §3 적용된 보안 통제(인증·PII·감사·kill switch·hook체인) / §4 POC 미구현 / §5 구현 예정 / §6 검토 요청 / §7 참고 문서 / §8 용어집
  - ITGC: 필수 표현 → 적용 가능성 검토 대상으로 뉘앙스 조정
  - DB: Oracle → MySQL, 화살표 단방향 → 양방향, Miso 연결 위치 chatbot → MCP 레벨로 수정
- docs/01_plan·02_design HTML 산출물 및 index.md 삭제 (구버전 구조 정리)
- eacct_mcp .gitignore: docs/* 로컬 전용 제외 → 추적 대상으로 변경
- `sync-docs.yml` CI 경로 오류 수정: 리팩터링 후 변경된 경로 5곳 갱신
- CLAUDE.md 운영 정책 11번 추가: 경로 변경 시 `.github/workflows/` 영향도 검토 필수

### 산출물

- `projects/eacct_mcp/docs/SEC_REVIEW_REQUEST_20260527_mcp-chatbot-security.md` (신규)
- `projects/eacct_mcp/docs/SEC_REVIEW_REQUEST_20260527_mcp-chatbot-security.html` (신규, 보안팀 제출용)

---

## 2026-05-27 — eacct_chatbot 챗봇 임시전표 저장 API POC 완료 (09:34)

### 작업 내용

- eacct_chatbot (P2605121): 법인카드 임시전표 저장 API 챗봇 연동 E2E 검증 완료
  - `ChatBotController.java` (eAcct_QA) 신규 구현·디버깅 4건 수정 — SAP RFC 스킵·NPE 방지·null-safe 처리·CodeConstants 교체
  - `source/test_bill_save.py` 테스트 스크립트 작성, `BILL_NDX=2026052700003` 저장 성공 확인
  - T010 신규: 전표 저장 API 운영 배포 준비(catch 메시지·API key 교체·TAX 타입 검증)

---

## 2026-05-26 — DIR-20260514-1554 collab 전체 마무리 · archive 완료 (22:33)

### 작업 내용

- mcp_platform 보안·운영 설계(D001~D006) + eacct_mcp/chatbot 7단계 DEV·TC 전 범위 3-way 검증(Claude·Codex·Antigravity) + Jacey 승인 완료
  - mcp_platform v0.6.0: signed context · LLM-safe response · audit fail-closed · deploy manifest · config validation
  - DEV_D006-7 최종 승인 (2026-05-26 22:13) — deploy smoke 전 범위 PASS, 운영 배포 핸드오프 승인
- collab bundle `PLATFORM/DIR_20260514-1554_mcp-chatbot-security-ops/` → `archive/PLATFORM/DIR_20260514-1554_mcp-chatbot-security-ops/` 이동
- MAP.md: direction·O001·D001~D006·DEV(10개)·TC(10개) 전체 `[resolved · verified · archived]` + 경로 archive/ 접두사 갱신
- INDEX.md: bundle 항목 추가 (resolved_by: claude+jacey / verified_by: codex+antigravity)
- eacct_mcp T020, eacct_chatbot T009: 산출물 반영 항목 등록 (착수 가능 상태)

---

## 2026-05-26 — P2604221 wiki_faq_builder 운영 단계 산출물 전체 생성 (18:37)

### 작업 내용

- wiki_faq_builder(P2604221) 운영 단계 진입에 따라 12종 산출물 생성 (MD + HTML, 총 25파일)
  - TRC / REQ / FLW / FUNC / ARC / API / SEC / UTC / ITS / OPM / CFG / RUN
  - UTC: 실제 테스트 파일 4개 분석 → 54개 실제 TC 문서화
  - TRC 커버리지: REQ→설계 100%, FUNC→테스트 80%(미추적 2건 v1.1 예정), 설계→운영 100%, 전체 94%
- `docs/index.html` 신규 생성 (프로젝트 문서 진입점, 12종 카드 구성)
- 이후 수정: `index.html` 루트 → `docs/` 이동, 사이드바 nav item 약자→전체 명칭 통일

---

## 2026-05-26 — eacct_mcp 필드 등급 재분류 + EacctRedactor 구현 (18:34)

### 작업 내용

- `field_classification.yml` 필드 등급 전면 재분류: public 5종 / internal 1종(사원번호) / sensitive 2종(이름·이메일)
- `tools.yml` `sensitive_fields` → `restricted_fields` rename + llm_safe_fields 동기화
- `EacctRedactor` 신규 구현 — PlatformServer dispatch step 9(Redactor 슬롯) 실제 활성화
  - tools.yml 런타임 로드로 정책 변경 시 코드 무변경
- `response_builder.py` 하드코딩 제거, `slip/taxbill/commcode` tool 함수 raw 반환으로 정리
- mcp_platform 계층 구조 정리: platform/services/mcp(project-hub 관리 서버)와 eacct_mcp는 형제 관계 확인

---

## 2026-05-26 — 산출물 템플릿 example/ 웹뷰 + HTML 생성 가이드 완성 (15:39)

### 작업 내용

- `platform/templates/deliverables/example/` 폴더 신규 생성 (P2605991 근태관리 시스템 샘플)
  - `index.html` — 프로젝트 문서 인덱스 (16개 산출물 진입점)
  - `assets/style.css` — CSS 정규 소스 (각 HTML에 인라인 임베드 기준)
  - 16개 산출물 HTML 전체 작성 (TRC / REQ / FLW / SCR / ROLE / FUNC / ARC / DAT / API / SEC / UTC / ITS / OPM / USM / CFG / RUN)
- HTML 핵심 원칙: 완전 독립형(Self-Contained) — 외부 CSS/JS/CDN/웹폰트 의존 없음, `<style>` 인라인 임베드
- 문서 간 상대경로 링크 (Sidebar nav + Trace bar + 본문 cross-reference)
- `guides/HTML-generation-guide.md` 신규 작성 (§1 독립형 원칙, §2 링크 경로 표, §3 구조 템플릿, §4 Mermaid 처리, §5 PII 마킹, §6 CSS 관리, §7 파일명 규칙, §8 생성 체크리스트)
- `CLAUDE.md` §9 가이드 표 + `README.md` 폴더 구조 현행화

---

## 2026-05-26 — DEV_D006-7 C2 보완 완료 (Codex blocker 4건 해소)

### 작업 내용

- CODEX-001: `eacct_mcp/manifest.yml` env_required에 `PAYLOAD_STORE_BACKEND: redis` 추가
- CODEX-002: `eacct_chatbot/manifest.yml` env_required에 `REQUIRE_SIGNED_CONTEXT: "true"` 추가
- CODEX-003: `deploy.py` DEV_AUTH_ENABLED 차단 범위 `"true"` → `"1"/"true"/"yes"` 확장
- CODEX-004: `eacct_chatbot/tests/` 신규 (conftest keyring patch + TC-C07 chatbot `/health` TestClient smoke)
- 플랫폼 170/170 + eacct_mcp smoke 8/8 + chatbot smoke 1/1 전원 PASS
- MAP.md `[active · blocked]` → `[active]` 해제

---

## 2026-05-22 — DEV_D006-6 Jacey 승인 완료 + DEV_D006-7 진입

### 작업 내용

- DEV_D006-6 §5 최종 승인 (2026-05-22 18:41) — 전 DoD 충족, PASS
- DEV_D006-7 collab 문서(30_DEV_D006-7) + TC_D006-7 문서 생성 — deploy smoke / rollback dry-run / T-008 · T-009 config validation
- REQUIRE_SIGNED_CONTEXT=true 전환 허용 상태 진입 (D6-I-001 합의)

---

## 2026-05-22 — DEV_D006-6 C2 재수정: items_ref tool 바인딩 연동 버그 + Miso LLM 토큰 보존 + 주석 오류

### 작업 내용

- chat_handler.py: items_ref 토큰에 tool 포함 (`items_ref={ref}&tool={tool_name}`) — Claude/Miso 핸들러 공통
- chat_handler.py: Miso Pass 2 프롬프트에 토큰 보존 지시 추가 (LLM 우회 방지)
- widget.html + index.html: regex `&tool=` 선택적 캡처 + fetchItemsRef `?tool=` 파라미터 전달
- payload_store.py: `_check_binding` 주석 오류 수정 (D6-6-C1-CODEX-002)
- DEV_D006-6 §2-3·§4 이슈 resolved 갱신, TC-012·013 기대결과 갱신

---

## 2026-05-22 — DEV_D006-6 C1 개발: eacct_chatbot signed context E2E + items_ref UI 렌더링

### 작업 내용

- server.py per-request token refresh (DevSignedContextIssuer → McpTokenIssuer.issue() → mcp.set_auth() 자동 갱신)
- widget.html + index.html: items_ref 버튼 렌더링 + /payload/{ref} fetch + 테이블 표시 + X-Session-ID 헤더
- C1 TC-001~014 전원 PASS (14/14). Codex·Antigravity 검증 대기.
- MAP.md: DEV_D006-6·TC_D006-6 [active] 등록

---

## 2026-05-22 — DEV_D006-5 승인: eacct_mcp audit fail-closed 집행 + policy YAML 완성 최종 완료

### 작업 내용

- 3-way 검증(Claude 18/18 + Codex TC-C01~C06 포함 24/24 + Antigravity TC-C01~C06 포함 24/24) 전원 통과
- Jacey 승인 (16:52). DEV_D006-6 진입 가능.
- MAP.md: DEV_D006-5·TC_D006-5 [resolved · verified], DEV_D006-6 진입 게이트 해제

---

## 2026-05-22 — DEV_D006-5 C1 개발: eacct_mcp audit fail-closed 집행 + policy YAML 완성

### 작업 내용

- `projects/eacct_mcp/source/server.py`: `FileAuditLogger` 주입 — `audit_required=True` tool(slip/taxbill) fail-closed 실질 활성화 (`logs/audit.jsonl` JSONL+hash chain)
- `projects/eacct_mcp/source/tools/slip.py`, `taxbill.py`: too_many 조기 반환 → `ToolResponseBuilder` 경유 (`{llm_safe_summary, ui_payload}` 구조 통일, 3곳)
- `projects/eacct_mcp/source/policies/tools.yml`: policy_name·audit_required·max_rows·sensitive·required_roles 보완 (route_intent 신규 추가), 6개 tool 전체 선언
- `projects/eacct_mcp/source/policies/field_classification.yml`: 신규 (8개 kind: sensitive 5개 + internal 3개)
- collab 문서 신규: `30_DEV_D006-5`, `40_TC_D006-5`
- Claude 자체 검증 18/18 통과. Codex·Antigravity 검증 대기.

---

## 2026-05-22 — DEV_D006-4 승인: eacct_mcp LLM-safe response 전환 + tool 정책 메타데이터 최종 완료

### 작업 내용

- `projects/eacct_mcp/source/tools/commcode.py`: 3개 tool(`list_comcd_groups`·`get_comcd_group`·`search_comcd`) 성공 반환 → `ToolResponseBuilder.build_generic_response` 경유 전환, 비민감 공개 데이터
- `projects/eacct_mcp/source/tools/__init__.py`: `register_all` 6개 tool에 `policy_name`·`llm_exposure`·`audit_required` 메타데이터 선언 (commcode=allow, slip/taxbill=summary_only, route_intent=deny)
- collab 문서: `30_DEV_D006-4_20260522-1558_llm-safe-response.md`, `40_TC_D006-4_20260522-1558_llm-safe-response.md` 신규 생성
- 3-way 검증(Claude·Codex·Antigravity) 21/21 전원 통과 — Jacey 승인(2026-05-22 16:35)
- MAP.md: DEV_D006-4·TC_D006-4 [resolved · verified], DEV_D006-5 진입 게이트 해제

---

## 2026-05-22 — DEV_D006-3 승인: REQUIRE_SIGNED_CONTEXT 배포 게이트 최종 완료

### 작업 내용

- DEV_D006-3 Jacey 승인 (15:58): 결재 헤더·문서 변경이력 갱신, §5 체크리스트 전원 [x], 최종 결론 기재
- MAP.md: DEV_D006-3·TC_D006-3 [resolved · verified], DEV_D006-4 진입 게이트 해제 명시
- `_template_dev.md` 지침 강화: 문서 변경이력 수행자 의무 명시 (각 수행자가 직접 자신의 섹션 완료 후 즉시 추가)

---

## 2026-05-22 — DEV_D006-2 완료: eacct_mcp namespace/registry 전환 (from tools import * 제거)

### 작업 내용

- `projects/eacct_mcp/source/server.py`: `from tools import *` + global `_default_registry` copy 제거, `from tools import register_all; register_all(registry)` 추가
- `projects/eacct_mcp/source/tools/__init__.py`: `register_all(registry)` 함수 신규 추가 (명시 registry 등록 단일 진입점)
- `projects/eacct_mcp/source/tools/slip.py·taxbill.py·commcode.py·router.py`: `@tool` 데코레이터 전량 제거, `tool` import 제거
- collab 문서: `30_DEV_D006-2_20260522-1053_eacct-registry-transition.md`, `40_TC_D006-2_20260522-1053_eacct-registry-transition.md` 신규 생성 및 3-way 검증 완료
- 3-way 검증(Claude·Codex·Antigravity) 18/18 전원 통과 — Jacey 승인(2026-05-22 11:25)
- MAP.md: DEV_D006-2 `[resolved · verified]`, DEV_D006-3 진입 게이트 해제

### 결과

- DEV_D006-2 resolved. DEV_D006-3 (signed context 전환) 진입 가능.

### Pain point

- TC-004: `"default_registry" not in content` 단순 grep이 `allow_default_registry=False` 파라미터명에 걸려 false positive 발생 → test_bug으로 분류 후 C2 재검증으로 해소

---

## 2026-05-22 — collab 문서 변경 이력 표기 개선 + GitHub SSH 다중 계정 설정

### 작업 내용

**collab 문서 변경 이력 표기 개선**
- `문서 변경 이력` 표 일시 컬럼: 날짜(YYYY-MM-DD) → 날짜+시간(YYYY-MM-DD HH:MM) 형식으로 통일
- 수정자 컬럼 역할 표기 추가: `claude (개발)` / `codex (설계)` / `antigravity (테스터)` / `jacey (승인)`
- README.md §9 예시 표: Antigravity 행 추가 + 역할 표기 반영
- README.md §9 TC 섹션: TC §2 append 완료 시 MAP.md 갱신 의무 및 상태 전환 기준 명시
- MAP.md: TC_D004 `[active]` → `[resolved · verified]` 갱신 (Antigravity TC-A01~A03 기완료 반영)
- USAGE.md: 아이다 → Claude 명칭 정리 (3곳)
- DEV_D002·DEV_D004 문서 변경 이력 표: 역할 표기 소급 적용

**GitHub SSH 다중 계정 설정**
- SSH 키 2쌍 생성: `~/.ssh/id_github_personal` (JaceyBaek) / `~/.ssh/id_github_gsretail` (JaceyBaek-GSRetail)
- `~/.ssh/config`: 호스트 별칭 `github-personal` / `github-gsretail` 분리 설정 (`IdentitiesOnly yes`)
- remote URL 교체: project-hub → `git@github-gsretail:gsr-ax/...` / eacct_chatbot·eacct_mcp → `git@github-personal:JaceyBaek/...`
- 연결 테스트 통과 (양 계정 모두 `Hi {계정명}!` 응답 확인)
- 가이드 문서 작성: `platform/setup/github_ssh_multiaccounts.md`

### 결과

- push 시 GitHub 계정 선택 팝업 제거 — repo 위치에 따라 자동 계정 선택
- collab 문서 변경 이력 역할·시간 표기 기준 통일 완료

---

## 2026-05-22 — DEV_D001 문서 보정 + DEV_D002(+D003) Jacey 승인 완료 — DEV_D006-3~4 게이트 해제

### 작업 내용

- DEV_D001 문서 보정: `## 문서 변경이력` 섹션 신설(헤더 표·증적 타임스탬프·§5 텍스트 복원), frontmatter `resolved_by: jacey → claude` + `approved_by: jacey` + `approved_at: 2026-05-20` + `status: approved` 패턴 통일, MAP.md `approved_by: jacey (2026-05-20)` 추가
- DEV_D002(+D003) 승인: Codex C3(2026-05-22 09:40) + Antigravity A1(2026-05-22 10:00) 전원 통과 확인 후 Jacey 승인
  - Antigravity Gap 3건(고위험 소비 API 트리거 누락, JWKS Negative Caching 미구현, PolicyEngine 런타임 검증 부재) 차기 마일스톤 이관 — DoD 충족에 영향 없음
  - frontmatter `status: approved`, `verified_by: codex+antigravity`, `approved_by: jacey`, `approved_at: 2026-05-22`

### 결과

- DEV_D001 문서 패턴 DEV_D004 기준으로 소급 통일 완료
- O001 §G 게이트 해제: DEV_D006-3~4 (signed context + privacy 적용) 진입 가능

---

## 2026-05-22 — eacct_mcp 보안팀 사전 대응 문서 작성

### 작업 내용

- eacct_mcp (P2605081) mcp_platform 보안 계층 전체 코드 리뷰 (D001~D005)
- `projects/eacct_mcp/dist/md/03_SEC_eacct_mcp_보안설계대응서.md` 신규: 서버 프레임워크 중심 보안 통제 9개 항목 정리, 보안팀 예상 질의 사전 답변 포함
- 리스크 식별: HIGH 2건 / MEDIUM 3건 / LOW 3건

---

## 2026-05-21 — DEV_D004(+D005) Jacey 승인 완료 — DEV_D006-5 게이트 해제

### 작업 내용

- DEV_D004 C3 재수정: `projects/eacct_mcp/deploy/config_validate.py` em dash → ASCII 교체 + stdout reconfigure 적용
- Codex C3 재테스트 통과 (자동화 31/31, 전체 회귀 154/154, TC-C01~C03 PASS)
- Antigravity A1 제3자 검증 통과 (KillSwitch 방어·금지 플래그 대소문자 처리 확인)
- Jacey 승인 — DEV_D004 frontmatter `status: approved`, `verified_by: codex+antigravity`, `approved_by: jacey`
- O001 §G 게이트 해제: DEV_D006-5 (audit·policy fail-closed 통합) 진입 가능

### 결과

- mcp_platform v0.6.0 봉인: FileAuditLogger · FileKillSwitchProvider · RateLimitPolicyEngine · 2-phase audit dispatch · 금지 플래그 11종 CLI 전 범위 통과

---

## 2026-05-21 — mcp_platform D002 validate_auth_env 확장 + D005 CLI 버그픽스 (v0.5.1)

### 작업 내용

**D002 — validate_auth_env 검사 범위 확장 (`auth.py`)**
- `validate_auth_env()`: `DEV_AUTH_ENABLED` 단일 체크 → `_DEV_ONLY_VARS` 4종 전수 검사로 확장
  - 검사 대상: `DEV_AUTH_ENABLED`, `DEV_USER_REF`, `DEV_DEPT_REF`, `DEV_ROLES`
  - 에러 메시지에 실제 감지된 변수명 나열
- `test_auth_privacy.py`: TC 사전 격리 보강 + `test_dev_user_ref_raises` (TC-C02) 신규

**D005 — config_validate CLI 버그픽스 (`deploy/config_validate.py`)**
- `deploy/config_validate.py` 신규 생성 — DEV_D004 C1 TC-C02 FAIL 원인 수정
  - PASS/BLOCKED 메시지 em dash(`—` U+2014) → ` - ` (ASCII) 교체
  - `sys.stdout.reconfigure(errors="replace")` 추가 — 비UTF-8 콘솔 안전망
- `_manage/test_results/20260521-1806-d004-c1/summary.md` 판정 업데이트 → C1 통과
- `CHANGELOG.md` v0.5.0(D002~D005 소급) + v0.5.1 항목 추가

### 결과
- pytest 154 passed, 1 warning / DEV_D004 C1 TC-C01~C03 모두 PASS

---

## 2026-05-21 — collab README 개선 + eacct_mcp 산출물 반영 절차 등록

### 작업 내용
- **collab README (`platform/processes/collab/README.md`) 4건 수정**
  - 헤더 설명 변경: "설계부터 테스트까지 여러 AI가 함께 작업하는 협업 공간" 으로 명확화. 완료 후 프로젝트 산출물 반영 원칙(§4-1) 링크 추가
  - §4 파이프라인: `종료` 단계 뒤 `[해당 시] 프로젝트 산출물 반영 (§4-1)` 단계 추가
  - §4-1 신설: 반영 시점·대상 산출물(REQ·FLW·FUNC·TC·테스트결과서)·traceability·책임·To-Do 사전 등록 원칙 상세 기술
  - §4-1 첫 줄 "설계 협의 공간" → "설계부터 테스트까지 협업하는 공간" 으로 헤더와 일치시킴

### 배경
- DIR-20260514-1554 요구사항 저장 위치 확인 과정에서 REQ와 direction 간 traceability 없음 확인
- REQ는 POC 기능 중심(v0.1), direction은 보안·ITGC·운영 설계로 범위 확장 — 갭 10개 항목 정리
- collab 완료 후 프로젝트 산출물 역방향 반영 절차가 README에 없었음 → 신설

---

## 2026-05-21 — mcp_platform 버그픽스: REST 모드 로깅 + datetime 직렬화

### 작업 내용
- `mcp_platform/base_server.py`: `dispatch()` step 8에 `log_tool_call` 래퍼 적용 — REST 모드에서 CALL/OK/ERROR 로그 누락 버그 수정. `_func = log_tool_call(self._logger)(entry.func)` 후 비동기·동기 분기 모두 `_func` 호출
- `mcp_platform/rest_bridge.py`: 성공 응답 직렬화에 `jsonable_encoder` 추가 — pymysql `datetime.date` 객체 포함 결과에서 `TypeError: Object of type date is not JSON serializable` 수정

---

## 2026-05-20 — 플랫폼 정리 및 기능 옵션화 아이디어 등록

### 작업 내용
- `platform/tools/sanitizer/` 삭제 — 테스트용으로 만든 폴더, 불필요 확인 후 제거 (`__init__.py`, `payload_sanitizer.py`, `test_payload_sanitizer.py` 3개 파일)
- 플랫폼 기능 옵션화 아이디어 논의: 플러그인·프로세스·기능을 `personal.yml features:` 섹션으로 on/off 제어, 비활성화 시 아이다가 해당 경로 완전 무시하는 방식
- 할일 등록: 사용자 입력 방식 검토 및 구현 (pending)

---

## 2026-05-20 — DEV_D004(+D005) 개발 완료: mcp_platform v0.6.0 + audit·kill switch·infra controls

### 개요
DEV_D002(+D003) C1 검증 대기 중에 병행으로 `DEV_D004(+D005)` 개발 착수 및 자체 검증 완료 (O001 §G 게이트 조건: DEV_D001 통과, D004·D005 verified — DEV_D002 선행 조건 아님). mcp_platform v0.6.0으로 올리고 D004(audit fail-closed·kill switch) + D005(infra·deploy·금지 플래그) 전 범위를 구현했다.

### 주요 구현 (mcp_platform v0.6.0)
- `audit.py` 확장: `AuditWriteResult`, `AuditPhase`, `RecoveryQueueEntry` 신규. `AuditLogger` Protocol `write()+check_available()`. `FileAuditLogger`(JSONL+SHA-256 hash chain+threading.Lock+genesis 복원). `NullAuditLogger` 업데이트
- `kill_switch.py` 신규: `FileKillSwitchProvider` (YAML 5 scope: global·llm_egress·system·tool·user_session + atomic reload + last-known-good fallback + threading.Lock)
- `policy.py` 확장: `RateLimitPolicyEngine` (per-user per-minute sliding window, deque+threading.Lock)
- `deploy.py` 신규: `check_prod_forbidden_flags()` 금지 플래그 11종 검사, `FlagViolation` NamedTuple
- `base_server.py` 확장: `dispatch()` 2-phase audit (pre→kill_switch→policy→tool→post), `_audit_failure()` pre_event_id 파라미터, post-audit 실패 시 recovery queue + AUDIT_UNAVAILABLE
- `__init__.py`: v0.6.0, 신규 심볼 전부 export

### 주요 구현 (프로젝트 파일)
- `projects/eacct_mcp/config/kill_switch.yml` 신규: 기본 비활성 kill switch 설정
- `projects/eacct_mcp/deploy/manifest.yml` 신규: D005 배포 매니페스트
- `projects/eacct_mcp/deploy/config_validate.py` 신규: --strict CI 게이트용 금지 플래그 검증 CLI
- `projects/eacct_chatbot/deploy/manifest.yml` 신규: D005 배포 매니페스트

### pytest 결과
- 153/153 통과 (기존 122 회귀 + D004·D005 신규 31)
- 임시 파일 정리: `_test_import.py`, `_run_test.ps1` 제거 필요

### collab 문서
- DEV_D004 문서 `30_DEV_D004_20260520-1821_audit-infra-controls.md` 신규 작성
- TC_D004 문서 `40_TC_D004_20260520-1821_audit-infra-controls.md` 신규 작성 (TC-001~031)
- MAP.md: DEV_D004, TC_D004 항목 추가

---

## 2026-05-20 — DEV_D002(+D003) 개발 완료: mcp_platform v0.5.0 + auth·privacy 통합

### 개요
DEV_D001 승인 직후 `DEV_D002(+D003)` 개발 착수 및 자체 검증 완료. mcp_platform을 v0.5.0으로 올리고 D002(인증·JWT) + D003(privacy·LLM-safe) 전 범위를 구현했다.

### 주요 구현 (mcp_platform v0.5.0)
- `auth.py` 신규: `JwtAuthVerifierImpl`, `JwksCache`(TTL 10분, grace 5분), `McpTokenIssuer`(RS256, kid, TTL 5분, clock skew 30초), `DevAuthVerifier`, `validate_auth_env`, `METADATA_JWT_TOKEN`/`METADATA_SESSION_ID`
- `privacy.py` 확장: `PrivacyKind` 9종, `PrivacyHit`, `ToolResponse`, `PrivacyFilter`/`PayloadStore` Protocol
- `base_server.py`: `PlatformConfig.dev_auth_allowed` + startup validation hook
- `rest_bridge.py`: Authorization Bearer / X-Session-ID 추출 → `RequestContext.metadata`
- `pyproject.toml`: `pyjwt[crypto]` 의존성 추가

### 주요 구현 (eacct_chatbot)
- `auth.py` 신규: `DevSignedContextIssuer`(인메모리 RSA-2048), `JwtSignedContextIssuer`, `create_issuer()`
- `payload_store.py` 신규: `InMemoryPayloadStore` (bounded-read 5회 + TTL 5분 + session binding, fail-safe 3종)
- `chat_handler.py`: LLM boundary 완성 (`llm_safe_summary` 전환, `items_ref` 생성, `tool_calls_log` PII 제거), `payload_store`·`session_id` 연결
- `server.py`: `/payload/{items_ref}` endpoint, X-Session-ID 전달

### 주요 구현 (eacct_mcp)
- `response_builder.py` 신규: `ToolResponseBuilder` (`llm_safe_summary`+`ui_payload` 분리)
- `policies/tools.yml` 신규: field classification YAML
- `slip.py` / `taxbill.py`: D002 auth context 연동 + `ToolResponseBuilder` 적용
- `server.py`: explicit `ToolRegistry` + `DevAuthVerifier` 주입 + D006 compat layer

### 테스트 결과
pytest 122/122 통과, 1 warning (의도된 InsecureKeyLengthWarning). 신규 23건 모두 통과, 기존 99건 회귀 없음.

### 다음 단계
C1 3-way 검증 (Codex + Antigravity) → TC 문서 작성 → Jacey 승인 → DEV_D004(+D005) 진입

---

## 2026-05-20 — collab 테스트 프로세스 3-way 검증 체계 완성 + DEV_D001 Jacey 승인

### 개요
collab 프로세스의 테스트 역할을 3-way 검증 체계로 전환하고, DEV_D001 최종 승인까지 완료했다.

### 프로세스 변경
- **3-way 검증 체계 확립**: 개발(Claude) → 테스트-설계검증(Codex) + 테스트-제3자(Antigravity) → 승인(Jacey)
- **TC 파일 분리**: 테스트 케이스를 DEV 문서에서 `40_tc/40_TC_{source-id}_{ts}_{slug}.md`로 독립 분리
- **bundle 폴더 구조 정비**: `20_detail/` · `30_dev/` · `40_tc/` 역할별 분리, prefix `_` 통일
- **승인자 변경**: `claude` → `jacey` (최종 dev 종료 승인은 Jacey가 직접)
- **승인 일시 형식**: 날짜만 → `YYYY-MM-DD HH:mm` 포함 기록. 아이다가 "승인" 트리거 즉시 처리.

### 변경 파일
- `platform/processes/collab/README.md` — 기본 역할·파이프라인·§6·§9·§14·§16 갱신
- `platform/processes/collab/_template_dev.md` — 결재 헤더 4컬럼, `approver: jacey`, §3 재구성, §5 형식
- `platform/processes/collab/_template_testcase.md` — 신규 (TC 파일 템플릿)
- `PLATFORM/DIR_.../30_dev/30_DEV_D001_...md` — 3-way 검증 소급 적용, Jacey 승인 완료
- `PLATFORM/DIR_.../40_tc/40_TC_D001_...md` — §1 TC-001~027 Claude 작성 완료
- `platform/processes/collab/MAP.md` — TC 섹션 추가, DEV_D001 [resolved·verified] 반영

### DEV_D001 승인
- **2026-05-20 16:52 Jacey 승인** — C1 3-way 검증(Claude·Codex·Antigravity) 전원 통과
- O001 §G 게이트 해제 — 후속 `DEV_D002(+D003)` / `DEV_D004(+D005)` / `DEV_D006-*` 진입 가능

---

## 2026-05-19 — wiki_faq_builder·wiki_mbo_builder 플러그인 경로 복구

**문제**
- `platform/plugins/`로 구조 이동 후 두 프로젝트 venv의 `atlassian-client`, `miso-client`, `secrets-loader` editable 경로가 구 경로(`plugins/`)를 가리켜 실행 불가

**조치**
- 글로벌 Python 환경 + 두 프로젝트 `.venv` 총 3개 환경에서 세 패키지 재설치
- `run.bat` 생성 (각 프로젝트 루트, `_manage/logs/run.log` 누적)
- `--auto` 실행: FAQ 신규 2·갱신 1, MBO 신규 4

---

## 2026-05-18 (33) — DEV_D001 mcp-platform-common-contracts 개발·자체 테스트 완료 (v0.4.0)

### 개요
D001 detail design 합의 내용을 `mcp_platform` 패키지에 구현하고 자체 검증(Claude 기본 검증, 99 passed)을 완료했다. **DEV_D001 `status: dev_selfcheck`** — codex 공식 cycle은 §3·§4에서 진행 예정.

### 신규 모듈 (`platform/plugins/mcp_platform/mcp_platform/`)
- **`registry.py`** — `ToolEntry`(frozen, policy_name·audit_required·llm_exposure·input_schema 메타 슬롯) / `ToolRegistry`(server-scoped) / `default_registry()` (전역 `@tool` 호환 계층)
- **`context.py`** — `AuthContext` / `RequestContext` / `bind_context`·`current_context`·`new_request_id`·`reset_context` (contextvars 기반)
- **`errors.py`** — `ErrorCode`(9개 enum) / `PlatformError` / `success_envelope`·`error_envelope`·`http_status`
- **`policy.py`** — `PolicyEngine`(Protocol) / `PolicyDecision` / `AllowAllPolicyEngine`
- **`privacy.py`** — `Redactor`(Protocol) / `FieldClassification`(PUBLIC/INTERNAL/SENSITIVE/SECRET) / `NoopRedactor`
- **`audit.py`** — `AuditEvent` / `AuditLogger`(Protocol) / `NullAuditLogger`
- **`observability.py`** — `HealthProvider`(Protocol) / `HealthCheckResult` / `aggregate_state`

### 기존 파일 확장 (`platform/plugins/mcp_platform/`)
- **`base_server.py`** — `PlatformConfig` dataclass, `AuthVerifier`·`KillSwitch` Protocol + `Noop*` 기본 구현, `PlatformServer` 생성자 슬롯 9종 추가(`registry`·`auth_verifier`·`kill_switch`·`policy_engine`·`audit_logger`·`redactor`·`inbound_auth`·`input_validator`·`health_providers`). `dispatch()` 메서드로 8단계 hook 체인 표준화(D001 §4 합의 순서). `default registry` 사용 시 `DeprecationWarning`, `allow_default_registry=False` 시 차단. 기존 `PlatformServer(name, log_file=...)` 시그니처 완전 호환.
- **`base_tools.py`** — 전역 `tool`·`get_tools`를 `default_registry()`로 위임하는 호환 계층으로 재작성.
- **`rest_bridge.py`** — `create_rest_app(server=...)` 시그니처, `POST /tools/{name}` success/error envelope 표준화, `X-Request-ID` 헤더 수용·회신, `GET /health/live`·`/health/ready`·`/version`·`/metrics` endpoint 추가. `GET /tools` 기존 schema 유지(rollback 안전장치).
- **`__init__.py`** — 신규 계약 33종 export. `__version__` 0.3.0 → 0.4.0.
- **`pyproject.toml`** — version 0.4.0.
- **`CHANGELOG.md`** — v0.4.0 항목 (D001 합의 1:1 매핑 + Deferred D002~D006).
- **`CLAUDE.md`** — 모듈 표·REST 엔드포인트·8단계 hook 흐름·신규/호환 사용 예·후속 detail 책임 경계 반영.

### 테스트
- **`tests/test_platform_contracts.py`** — 19개 신규 (T-001 default registry 호환 / T-002 registry 격리 / T-003 REST envelope / T-004 RequestContext·request_id 전파 / T-005 health·version endpoint / auth_verifier·kill_switch·expose_error_detail·async tool 추가).
- **전체 99 passed** (신규 19 + 기존 router 31 + extractors 49), 1.03s.
- 증적: `platform/plugins/mcp_platform/_manage/test_results/20260518-1900-d001-selfcheck/`

### 콜랩 문서
- `DEV_D001` frontmatter `status: dev_selfcheck`, DoD 9개 `[x]`, §2 개발 완료 요약 작성.

### 알려진 deferred
- codex 공식 테스트 cycle (§3·§4) 미진행. dev 종료 승인(§5 `status: resolved`)은 cycle 완료 후 처리.
- stdio envelope 통일·`/metrics` Prometheus 포맷·auth_verifier 본 구현·fail-closed audit·kill switch 저장소는 D002~D006.

---

## 2026-05-15 (32) — 1554 collab 진행: O001 verified · D001 verified · D002/D004 R1 + 결재 헤더 표준 + 트래킹 정렬 정책

### 1554 direction 진행 상태 갱신
- **O001 1414** — R2 합의 + V2 동의 마감. `status: resolved` / `resolved_by: claude` / `verified_by: codex`. R2이관 5건(I-004 회귀 매트릭스 보강, I-005 narrative ID 폐기, I-007 정책 문구 정정, I-011 §F.3 O001 verified 명시, I-012 archive bundle 위치) 모두 합의. codex 본문 갱신 완료(§E 7개 행 추가, §F.1 narrative ID 폐기, §F.2 정책 문구 정정, §F.3 O001 verified 공통 게이트 명시, § 합의 archive 위치 bundle 단위).
- **D001 mcp_platform 공통 모듈** — R1 → R2 → V2 마감. `status: resolved` / `resolved_by: claude` / `verified_by: codex`. R1 합의 4건(D1-I-001/003/004/006), R2 합의 2건(D1-I-002 auth_verifier·kill_switch 별도 슬롯 / D1-I-005 1554 §11 hook 슬롯 매핑). 본문 갱신 5건(§4 호출순서 8단계, PlatformServer 시그니처 auth_verifier·kill_switch 추가, 제외 범위 hook deferral 매핑, stdio envelope deferral, DoD 보강) 모두 반영. **DEV_D001 진입 가능 게이트 통과.**
- **D002 인증/세션/signed context** — R1 claude 검토 완료. 합의 3건(D2-I-001 JWT claim·TTL·rotation / D2-I-003 세션·RequestContext 경계 / D2-I-004 role·purpose 교차검증). R2이관 3건(D2-I-002 JWKS grace + dual-key rotation / D2-I-005 dev_auth 운영 차단 책임 위치 / D2-I-006 claude 신규: chatbot↔MCP mTLS 책임 위치).
- **D004 audit/fail-closed/kill switch** — R1 claude 검토 완료. 합의 3건(D4-I-002 hash chain / D4-I-004 컴포넌트별 fail 정책 / D4-I-005 redacted+hash). R2이관 2건(D4-I-001 audit 2-phase 강제 — ITGC 증적 공백 차단 / D4-I-003 kill switch config 변경 경로 1차 구현 표준).
- **D003/D005** — D002/D004 의존 → P2 묶음 R1은 D002/D004 verified 후 진행 결정 (회귀 부담 회피).
- **D006** — D001~D005 verified 후 진입.

### 결재 헤더 표준 + 트래킹 테이블 정렬 정책
- **결재 헤더**: frontmatter 직후 3열×2행 단순 표. design은 `기안 (author) / 합의 (resolved_by) / 동의 (verified_by)`, dev는 `개발 (author) / 테스트 (tester) / 승인 (approver)`. blockquote/제목 라벨 없음. 최종 값만 반영, frontmatter와 일시 동기화.
- **트래킹 테이블 정렬**: ID 순 + ID 내 라운드 순 (R1 → R2 → … → V1 → V2 → …). 같은 ID 인접 배치. 행 내용 수정 금지, 정렬 순서만 유지.
- **규칙 위치**: README §8 트래킹 정렬 / README §11 결재 헤더·트래킹 정렬 정책 / _template_design.md + _template_dev.md frontmatter 직후 placeholder.

### 활성·archive 문서 일괄 적용 (12개)
- **활성 7개** (1554 direction, O001 1414, D001, D002~D006): 결재 헤더 추가. 합의/동의 완료 문서는 미상 일시를 2026-05-15로 채움 (이번 마이그레이션 한정 — 향후 신규는 실제 일시 입력).
- **archive 5개** (1846 direction + DEV_DIR_1925, 0836 direction + D001_1011 + DEV_D001_1233): 결재 헤더 추가. 본문 보존 + 결재만 신설.
- **D001 트래킹 테이블 14행 ID 순 재정렬** (O001은 codex가 이미 ID 순 정렬해 별도 작업 없음). archive 트래킹 정렬은 보류 (감사 보존 측면).

### MAP.md 갱신
- D001 [active] → [resolved · verified] (resolved_by: claude / verified_by: codex)
- D002 [active] → [active · R1 reviewing], D004 [active] → [active · R1 reviewing]
- O001 → resolved 완료 상태 갱신

---

## 2026-05-15 (31) — 콘솔 인코딩 원천 해결: PS 5.1·7 UTF-8 프로파일 + VSCode 기본 터미널 pwsh 전환

### 배경

- 문서 검토 중 한글 출력이 콘솔에서 깨져 보이는 사례 반복 발생. 원인은 Windows PowerShell 5.1 + CP949(Active Code Page 949) 환경과 UTF-8 파일의 불일치.
- 임시 회피(`chcp 65001`, 개별 파일 `-Encoding utf8`) 누적되어 일관성 부족.

### 작업

#### 1 — PowerShell 프로파일에 UTF-8 강제

- `C:\Users\Administrator\Documents\WindowsPowerShell\profile.ps1` (PS 5.1 전용) 신규 작성
- `C:\Users\Administrator\Documents\PowerShell\profile.ps1` (PS 7 전용) 신규 작성
- 공통 내용: `[Console]::OutputEncoding`·`[Console]::InputEncoding`·`$OutputEncoding` 모두 UTF-8, `$PSDefaultParameterValues['*:Encoding'] = 'utf8'` (Get-Content/Out-File 등 기본 인코딩 통일)

#### 2 — PowerShell 7 설치

- `winget install Microsoft.PowerShell` → 7.6.1.0 설치
- 실행 경로: `C:\Users\Administrator\AppData\Local\Microsoft\WindowsApps\pwsh.exe` (winget Store-style 별칭)
- PS 5.1과 병존 — 5.1은 일부 레거시 호환 용도로 유지

#### 3 — VSCode 기본 터미널을 pwsh 7로 전환

- `%APPDATA%\Code\User\settings.json` 갱신:
  - `terminal.integrated.defaultProfile.windows` = `"PowerShell 7"`
  - `terminal.integrated.profiles.windows`에 `PowerShell 7` (pwsh.exe) / `PowerShell 5.1` (기존) / `Command Prompt` 3개 프로필 정의

### 결정

- **시스템 로캘 변경(Beta UTF-8)은 보류** — 일부 한글 윈도우 전용 프로그램에서 깨질 위험. 셸 레벨 UTF-8(프로파일) + pwsh 7로 충분.
- **PS 5.1 잔존 유지** — 일부 레거시 모듈 호환을 위해 제거하지 않음.

### 검증

- pwsh 7에서 `[Console]::OutputEncoding.WebName` → `utf-8`, 한글 출력 정상 확인.
- 새 셸 세션부터 자동 적용. 현재 열린 콘솔은 재시작 필요.

### 영향 범위

- 머신 로컬 설정 — Jacey 개인 Windows 환경에 한정. 다른 사용자·머신에는 미적용.
- 플랫폼 정책 아님(hub 문서에 명문화 대상 아님). 메모리(`feedback_console_encoding.md`)에 기록.

---

## 2026-05-15 (30) — collab v2 후속: 0903 폐기 → O001 1414 재작성·R1 리뷰 + archive bundle 통합 재구성

### 결정 배경

- §29 직후 0903 O001 orchestration이 D001(1011) 합의 + DEV_D001 마이그레이션 **전에** 작성된 점이 드러남. R2까지 codex 응답이 진행됐으나 새 규칙(파일명·합의 단위 vs 검증 단위 분리·dev 묶음 파일 단위) 미인지 상태라 verified 진행 시 누락 위험.
- archive 정리: 직전 §29에서 0836 bundle은 archive 통째 이동했으나, 구 평면(1846 direction + 1925 dev)이 여전히 `archive/design/`·`archive/dev/` 평면 분류로 남아 있어 bundle 표준과 불일치.

### 작업

#### 1 — 0903 폐기 + O001 재작성 의뢰

- 기존 0903(`O001_20260515-0903_security-ops.md`) fs rm 폐기 (collab .gitignore로 git 미추적, 본 채팅 이력만 historical)
- MAP의 1554 노드 Orchestration 섹션을 "재작성 대기"로 갱신
- codex 작성 명세 정리·전달 (1554 direction + D001~D006 본문 base + 새 규칙 인지 + dev 묶음 narrative·파일 단위·sub-DEV 명시 필수)

#### 2 — archive bundle 통합 재구성 (1846 + 1925)

- `archive/PLATFORM/DIR_20260514-1846_collab-process/` 신설
- 1846 direction → `00_DIRECTION.md` (frontmatter에 `project: PLATFORM` + 신 필드 보강, 본문 보존)
- 1925 dev workorder → `dev/DEV_DIR_20260514-1925_implementation-workorder.md` (frontmatter 신설 — 원본은 markdown header만, `type: dev` / `design_ref: DIR_20260514-1846` / source-id=DIR로 표기)
- 빈 `archive/design/`·`archive/dev/` 폴더 rmdir
- `archive/INDEX.md` Bundle 섹션 통합 (1846 + 0836 bundle 2건, 구 평면 섹션 폐기)
- MAP의 1846 노드를 bundle 경로로 갱신 + Workorder 섹션 → Dev 섹션

#### 3 — 새 O001 1414 작성 (codex) + R1 리뷰 (claude)

- 신 파일: `PLATFORM/DIR_20260514-1554_mcp-chatbot-security-ops/O001_20260515-1414_security-ops-execution-plan.md`
- §1 codex 본문: 의존성 그래프(D001 → {D002,D004} → {D003,D005} → D006), 임계 경로 Path A/B, 병행 묶음 P0~P3, 회귀 영향 매트릭스(9개 cross-detail 계약 행), dev 묶음 narrative·파일 단위 정책·D006 sub-DEV 7단계, 진입 게이트
- claude R1 리뷰 결과:
  - **합의 7건**: I-001 의존성 / I-002 임계 경로 / I-003 병행 묶음 / I-006 단일 source-id 정책 / I-008 D006 sub-DEV / I-009 진입 판정 / I-010 O001 verified gate
  - **R2 이관 5건**:
    - I-004 — §E 회귀 매트릭스에 1554 §11 추가 통제 7개(prompt injection/tool abuse/DB read-only/mTLS/데이터 보존/변경관리/보안 산출물) 흡수만 되어 별도 행 미표기
    - I-005 — narrative ID(DEV-NNN) ↔ source-id 번호 불일치(DEV-003=DEV_D004, DEV-004=DEV_D006) → narrative ID 폐기 권장
    - I-007 — §F.2 정책 문구 "후행 또는 더 좁은" 모순(실제 적용은 둘 다 선행) → "선행 또는 더 좁은"으로 정정
    - I-011 (claude 신규) — §F.3 dev 생성 순서 표에 O001 verified 미명시
    - I-012 (claude 신규) — § 합의 결론 "아카이브 위치" 옛 평면 분류 표기 → bundle 단위로 갱신

#### 4 — D001~D006 §0 블록 갱신 (codex 자율)

- 본 세션 진행 중 codex가 D001~D006의 §0 "다음 단계" 항목에 "O001 orchestration verified 후 R1 검토" 명시 추가 — R1 진입 흐름 명확화

### 영향

- 1554 dev 진입 게이트의 SoT 정합 향상 (0903 폐기 + 1414 재작성 + R1 진행)
- archive 전체 bundle 표준 통일 (구 평면 분류 폐기, 1846/0836 두 bundle 통합)
- E-003 (§0 일괄 추가) 완료 후 신규 §0 표준의 추가 검증 사이트로 1414 신규 작성·검토 동시 진행

### 후속 (미완료)

- **1414 O001 R2** — codex 응답 차례 (5건 R2이관). 응답 후 claude 합의 검증 → verified_by 마감
- **1554 D001~D006 R1** — O001 verified 후 진입 (D001~D006 모두 본문 §1 작성 완료, R1 검토 시작 전)
- **DEV 진입** — D001 verified 후 DEV_D001 → 이후 묶음 순차/병행
- **ENHANCEMENTS E-001 옵트인 자동화 / E-002 MAP 분산** — 대기

---

## 2026-05-15 (29) — collab v2 보강: bundle 구조 + 플랫폼/프로젝트 분리 마이그레이션 (DEV_D001)

### 결정 배경

- §27 collab v2 합의 직후 1554 direction에서 6 detail이 파생되며 평면 파일명·평면 디렉토리 운영의 한계 노출
  - 파일명에 `project`·부모 direction ID·detail ID·timestamp·slug를 모두 인코딩하면 60~75자로 비대화
  - `dir-HHmm` 같은 짧은 부모 식별자는 다른 날짜 부모 참조 시 모호
  - mcp_chatbot/mcp_platform/eacct 영역이 한 direction에 혼재 — 단일 귀속 원칙 부재
- collab .gitignore가 active collab 파일을 git 추적에서 제외하는 정책이라 fs 단위 마이그레이션으로 처리 가능

### 작업

#### 1 — D001 detail 합의 (`D001_20260515-1011_naming-rules-and-platform-project-separation`)

- 부모 direction: `DIR_20260515-0836` (collab v2 보강 메타) 사후 후속 detail
- R1 13 이슈 (codex 10 + claude 신규 3) — 모두 합의·V1 동의 마감 (resolved_by: codex / verified_by: claude)
- 핵심 결정:
  - **bundle 구조**: `collab/{project}/DIR_{ts}_{slug}/` — 부모-자식 관계는 path가 표현, basename은 종류·정렬·식별만
  - **파일명 패턴**: direction `00_DIRECTION.md` (고정), detail `D{nnn}_{ts}_{slug}.md`, orchestration `O{nnn}_{ts}_{slug}.md`, dev `dev/DEV_{source-id}[-{sub-id}]_{ts}_{slug}.md` (sub-id 옵셔널)
  - **구분자**: 구조 토큰 `_`, timestamp 내부·slug 내부 `-`
  - **ID 통일**: `D001`/`O001` 하이픈 제거, frontmatter `parent_design`은 짧은 ID(`DIR_20260515-0836`)
  - **플랫폼/프로젝트 분리 5원칙**: 단일 귀속, 영역별 direction 분리, `depends_on` 선후 관계 명시, 공통 결정값은 orchestration 매트릭스 cross 표시, MAP 글로벌 SoT + path namespace
  - **시한부 동결 규칙(§16)**: DEV_D001 마감까지 collab 신규 작성 금지 — 마감 시점에 해제

#### 2 — DEV_D001 마이그레이션 실행 (`DEV_D001_20260515-1233_collab-bundle-naming-migration`)

- 본 건 한정 예외: tester=claude / approver=claude (mechanical 마이그레이션, 일반 원칙 README §6 그대로 유효)
- Phase 1·2·3 — 9개 active 파일 fs mv (collab .gitignore로 git 미추적, history 영향 없음) + frontmatter 갱신 + 본문 cross-reference sed 일괄 치환 (`D-XXX→DXXX`, `O-001→O001`, 평면 파일명→신 파일명)
- Phase 4 — README / `_template_design.md` / `_template_dev.md` / `platform/TRIGGERS.md` / `MAP.md` / `ENHANCEMENTS.md` 일괄 개정
- Phase 5 — T-001 (path 패턴) / T-002 (project ↔ namespace) / T-003 (parent_design ↔ bundle) / T-004 (MAP ↔ 실파일) / T-005 (평면 잔존) — **5/5 통과** (단일 C1, 미통과 없음)
- 평면 초안 `20260515-1011-PLATFORM-0836-D001-...` fs rm 폐기
- 시한부 동결 효력 종료

#### 3 — ENHANCEMENTS 백로그 신규

- **E-001**: collab 옵트인 자동화 (라이프사이클 통합) — 보통, 대기
- **E-002**: MAP/INDEX 프로젝트별 분산 이전 — 낮음, 대기 (트리거: 동시 진행 10+ 또는 MAP 노드 30+)
- **E-003**: 기존 9개 active 문서 §0 일괄 추가 — **완료** (DEV_D001 마감 직후 batch)

#### 4 — §0 문서 목적 블록 표준 도입

- 신규 표준: 모든 collab 문서는 frontmatter·주석 다음 §1 앞에 `## 0. 문서 목적` 4행 표 (문서 종류 / 역할 / 안 하는 일 / 다음 단계) 보유
- 템플릿 2개 + DEV_D001 + 1011 D001에 적용
- E-003으로 기존 9개(1554/0836 direction + D001~D006 detail + O001 orchestration)에 일괄 추가 완료
- README §11에 "신규 문서부터, 기존 소급 추가 금지 — 일괄은 별도 batch" 정책 명시

### 영향

- collab 모듈 운영 방식 전면 변경 — 신규 작성 트리거 `리뷰 요청 {프로젝트} {주제}` 인자 추가, bundle path 자동 조립
- 자식 파일명 평균 60~75자 → 30~40자
- archive 정책: 평면 분류(`archive/design/`·`archive/dev/`) → bundle 단위 통째 이동(`archive/{project}/{DIR_...}/`)
- frontmatter 표기 통일 (project 필수·하이픈 제거 ID·짧은 ID parent_design)

### 후속

- ENHANCEMENTS E-001 (옵트인 자동화), E-002 (MAP 분산) — 트리거 충족 시 진행
- 0903 O001 orchestration R2 claude verified_by 진행 — collab 일반 흐름 복귀
- 1554 D001~D006 detail R1 진행 — 0903 verified 후 dev 진입 게이트 충족
- DEV-001 ~ DEV-004 (D006은 7단계 sub-DEV) 순차/병행 진입

---

## 2026-05-14 (28) — 운영 튜닝: miso_client chat timeout 상향 + google_drive_backup 제외 목록 보강

### 작업

- `platform/plugins/miso_client/miso_client/client.py` — `chat()` 기본 `timeout` 120 → 300s. 장문 응답 케이스에서 타임아웃 빈도 감소가 목적
- `apps/google_drive_backup` (서브모듈, 3d1d3b9) — 백업 제외 경로에 `node_modules`, `venv` 추가. 백업 산출물 부피·시간 감소

### 영향

- miso_client 호출부 일괄 수혜 — 기본값만 변경, 인자 명시 호출(`timeout=120` 등)은 그대로 유지
- 신규 백업 실행 시점부터 두 디렉토리는 업로드 대상에서 제외

---

## 2026-05-14 (27) — collab 프로세스 v2 합의·구현 + `platform/processes/` 카테고리 신설

### 결정 배경

- §26 1차 개편 직후 ITGC·보안 design 작성을 시도하다 단일 design 문서에 10개 이슈를 몰아 넣어 dev 분리·합의 트래킹이 흐려지는 문제 발생
- 옵셔널 협업 프로세스인 collab을 코드 플러그인(`platform/plugins/`)과 같은 칸에 두는 범주 충돌
- R1 합의 후 V 행이 자동으로 누적되지 않아 마지막에 별도 `합의 검증` 트리거를 호출해야 하는 누락 위험

### 작업

#### 1 — collab 프로세스 v2 합의 (`20260514-1846-collab-process-design`)

- direction 11개 이슈 — R1 합의 5 / R2 합의 6 후 codex `verified_by`까지 완료 (resolved_by: claude / verified_by: codex)
- 핵심 결정: `design_level: direction | detail` 분리, 파생 상세설계 계획 표, 4-eyes 흐름(개발 Claude ↔ 테스트 Codex), `dev 종료 승인 = Claude 봉인`, 모든 design `verified_by` 개발 진입 게이트
- Cycle 임계 정책: C1~C3 자유 / C4 원인 분류 필수(`implementation_bug`·`test_bug`·`design_gap`·`scope_change`) / C5+ 설계 회귀 + Jacey 승인
- 테스트 증적 표준 경로: CI artifact → `projects/{p}/_manage/test_results/{YYYYMMDD-HHmm}-{...}/` → 요약 표
- **이전 라운드 합의 V 행 자동 누적 룰** 도입 — 본인 차례 진입 시 R 합의 중 V 없는 항목 우선 검증·V 행 추가

#### 2 — README·템플릿·TRIGGERS 개정 (작업지시서 `20260514-1925`)

- `platform/processes/collab/README.md` 14절 전면 재작성 — 합의된 결정값 반영
- `_template_design.md` direction/detail 공통 템플릿으로 재작성. detail 전용 frontmatter(`parent_design`·`detail_id`·`task_ids`·`depends_on`·`blocks`) + §1 구현 범위·인터페이스 계약·DoD·테스트 항목
- `_template_dev.md` 개발완료·테스트완료 확인서로 축소 — 5섹션(개발 범위·완료 요약·테스트 요약·Cycle 표·dev 종료 승인) + frontmatter(`design_ref`·`detail_design_ref`·`tester`·`approver`)
- `platform/TRIGGERS.md` collab 4개 트리거 갱신 — direction/detail/dev 구분, V 행 자동 누적 룰 명시, 모든 design `verified_by` 필수, INDEX 새 형식
- 1차 검증: README·템플릿 통과 / TRIGGERS 부분 통과 → 2차 보완에서 codex 권장 문구 반영 → 최종 통과

#### 3 — `platform/processes/` 카테고리 신설 + 폴더 이동

- `platform/collab/` → `platform/processes/collab/` 일괄 이동 (active 3건·archive/·표준 파일·.gitignore 모두 동반)
- 카테고리 의미 분리: `platform/plugins/` = 코드 플러그인(pip install·import) / `platform/processes/` = 프로세스 모듈(옵트인 워크플로우). 향후 RFC·postmortem·incident response 등 동일 카테고리로 확장 가능
- 루트 `README.md` line 11, `platform/TRIGGERS.md` lines 39-40, collab `README.md` 헤더+§2 파일 구조도 새 경로로 갱신
- `.gitignore` 새 위치에서 archive 제외 + 표준 파일 추적 동작 확인 (`git check-ignore` 검증)

#### 4 — active 문서 아카이브

- `20260514-1846-collab-process-design.md` → `archive/design/` (이동 트리거 design 예외 — 새 위치에서 직접 archive)
- `20260514-1925-collab-process-implementation-workorder.md` → `archive/dev/` (Codex 통과 판정 후 마감)
- `archive/INDEX.md` 새 형식(`파일명 | 유형 | design_level | 결론 한 줄 | 후속`)으로 재작성 + 2건 등록

### 미결

- `20260514-1554-mcp-chatbot-security-ops-design.md` (보안 design, R2 합의 완료) — `verified_by` 별도 `합의 검증` 트랙으로 진행 예정

---

## 2026-05-14 (26) — platform/collab 협업 프로토콜 개편

### 결정 배경

- Codex와의 교차 검증 운영 중, 삭제 기반 워크플로우로는 설계 히스토리가 사라지는 문제 발생
- 이슈 단위 트래킹 부재로 "어떤 포인트가 합의됐고 재검토 중인지" 파악 불가
- 설계 검토 문서와 개발 검증 문서 구분 없이 단일 템플릿 사용 — 흐름 불명확

### 작업

- **아카이브 구조 도입**: 합의 완료 파일 삭제 → `archive/design/` / `archive/dev/` 이동으로 변경. 평소 참조 절대 금지 원칙 명시
- **`archive/INDEX.md` 생성**: 아카이브 목록 + 결론 한 줄 요약 — 파일 열지 않아도 히스토리 파악 가능
- **이슈 트래킹 B안 적용**: 검토 포인트마다 `I-001`, `I-002` ID 부여 → 트래킹 테이블(라운드·상태·합의자) + ASCII 흐름 도식 병행
- **문서 유형 분리**: `_template_design.md` / `_template_dev.md` 분리 생성. `design_ref` 필드로 설계↔개발 연결. 구 `_template.md` 삭제
- **합의 주체 명시**: frontmatter `resolved_by` + 이슈 테이블 `합의자` 컬럼. 개발은 아이다 수행, 합의는 상호 검토
- **재검토 루프 추적**: frontmatter `round` 필드 + 섹션 반복 주석 블록으로 R2, R3 추적 구조화
- **`.gitignore` 수정**: active 파일 제외 유지. archive는 로컬 보관용 — git 추적 제외 (설계 히스토리는 로컬에만 보존)

---

## 2026-05-14 (25) — eacct_chatbot 실행 환경 정비 + 라우터 앱 분리 적용

### 결정 배경

- mcp_platform v0.3.0 적용 후 재시작 시 `No module named 'mcp_platform'` / `No module named 'uvicorn'` 오류 — 각 프로젝트 venv가 없거나 시스템 Python으로 기동하고 있었음
- eacct_chatbot에 `.venv` 자체가 없어 신규 생성 필요
- `MISO_ROUTER_API_KEY` 등록 후에도 라우팅 프롬프트가 답변 앱으로 전달 — 옛날 프로세스(시스템 Python, uvicorn 워커)가 포트 7000을 점유해 새 venv 서버가 기동 불가였음

### 작업

- **eacct_chatbot `.venv` 신규 생성**: `mcp_platform`, `miso_client`, `secrets_loader` editable 설치 + requirements.txt 패키지 설치
- **`MISO_ROUTER_API_KEY` 키링 등록**: `keyring.set_password('eacct_chatbot', 'miso_router_api_key', ...)` → `server.py`의 `get_secret` 흐름으로 자동 주입
- **좀비 프로세스 정리**: PID 18976(시스템 Python uvicorn 워커), PID 26344 등 kill → 새 venv python으로 재기동
- **start.bat 신규**: `projects/eacct_mcp/start.bat`, `projects/eacct_chatbot/start.bat`, `platform/scripts/start_eacct.bat` (통합 기동)
- **search_slips Q1 2024 0건 확인**: DB 직접 분기별 조회 → Q1 0건이 버그 아님 (해당 사번/부서 Q1 실데이터 없음 확인)

---

## 2026-05-14 (24) — 웹뷰 복구: CDN 벤더링 + GitHub Pages basePath 수정 + 변수 치환

### 결정 배경

- 사내 네트워크에서 `cdn.jsdelivr.net` 완전 차단 → Docsify 로드 불가 → 로컬·GitHub 양쪽 웹뷰 blank
- GitHub Pages 구조 추가 문제: `basePath:'/'`가 `github.io` 루트를 바라봐 모든 md 요청 404
- `{assistant}` 플레이스홀더가 웹뷰에 리터럴로 노출 (personal.yml 변수가 브라우저까지 전달 안 됨)

### 작업

#### 1 — CDN 의존성 로컬 벤더링
- `platform/services/webview/vendor/` 신규 — `npm install` 후 dist만 복사
  - `docsify@4` (docsify.min.js + search.min.js + vue.css)
  - `docsify-copy-code@2`, `mermaid@10`, `docsify-mermaid@latest`
- `index.html` CDN URL 6개 → `./vendor/` 상대경로로 교체

#### 2 — GitHub Pages basePath + 경로 구조 수정 (`sync-docs.yml`)
- **구조 변경**: `project-hub-docs/webview/` → `project-hub-docs/platform/services/webview/`  
  로컬 경로와 동일하게 미러링해 사이드바 링크 경로가 GitHub Pages에서도 일치
- **basePath 패치**: 워크플로우 내 `sed`로 `'/'` → `'/project-hub-docs/'` 자동 치환
- **루트 리다이렉트**: `project-hub-docs/index.html` 생성 → 웹뷰로 자동 이동
- **구 디렉토리 정리**: 기존 `webview/`, `guides/`, `history/`, `templates/` 자동 삭제

#### 3 — {assistant}/{user_name} 변수 치환 플러그인
- Docsify `beforeEach` 훅 — `personal.yml` fetch → 정규식 파싱 → 플레이스홀더 치환
- fallback 체인: `/platform/config/personal.yml` (로컬) → `/platform/config/vars_public.json` (GitHub Pages)
- `platform/config/vars_public.json` 신규 (hub_init.py 기반 생성, 커밋 가능) — sync 워크플로우로 Pages에 배포

#### 4 — sync-docs 상시 기동
- `sync-docs.yml` 트리거에서 `paths:` 필터 제거 → main push마다 무조건 GitHub Pages 동기화
- 구 필터: `platform/services/webview/**`, `*.md` 등 특정 경로만 트리거 → 워크플로우 파일 변경 시 수동 실행 필요했던 문제 해결

### 기타
- `.gitignore`에 `.claude/` 추가 — 머신별 절대경로 포함 설정 공유 방지
- GitHub Pages URL: `https://jaceybaek.github.io/project-hub-docs/platform/services/webview/`  
  (루트 `https://jaceybaek.github.io/project-hub-docs/` 접속 시 자동 리다이렉트)
- 로컬 Ctrl+Shift+R 브라우저 강제 새로고침 필요 (CDN URL 캐시 제거)

---

## 2026-05-14 (23) — mcp_platform v0.3.0 신뢰도 시스템 + 자연어 커버리지 확장

### 결정 배경

- 사용자 질문 "24년도 전표 리스트" → 룰 라우터가 2자리 연도 미인식 + `RE_TIME_HINT`도 4자리만 매칭해 LLM fallback도 트리거 못 함 → 빈 params로 `search_slips` 호출 → 기본값 최근 30일 데이터 조회. 미소 페르소나가 의도-결과 불일치를 검출해 답변 첫 문단에 명시한 결과만 사용자에게 보임 ("왜 멋대로 왜곡?")
- 대안 검토: A 룰만 보강 / B Miso 라우터 단일화 / C 하이브리드 슬림화 → 사용자가 "현재 룰 유지하되 신뢰도 타이트하게 잡고 부족하면 미소 라우터에 위임" 방향 선택
- step-by-step 진행: step 1 confidence 시스템 → step 2a 2자리 연도 → step 2b 범위 표현 → step 2c 상대 시기 → step 2d 비교 의도 → step 4 챗봇에 룰 결과 주입

### 작업

#### step 1 — confidence 시스템 (mcp_platform/router/engine.py)

- **`Router.route()` 반환 스키마 확장** — `confidence`(0.0~1.0)·`confidence_reasons`(감점 사유 목록) 부가. binary `needs_llm_fallback`을 연속값 기반으로 재계산.
- **`_calc_confidence(q, domain, scores, params)`** — 6가지 감점 신호 합산: 도메인 점수차 좁음(-0.20)·도메인 score 낮음(-0.15)·시간 표현 vs 날짜 미추출(-0.40)·날짜 부분 추출(-0.20)·2자리 연도(-0.10, 추출은 가능하나 50 경계 모호성)·비교 의도(-0.40)·필수 인자 누락(-0.40)
- **`Router(confidence_threshold=0.85)`** 신규 인자. `Router.from_yaml(confidence_threshold=...)` 동일 인자 전파
- **YAML 도메인 spec 확장** — `required_params: [...]`·`min_top_score: N`. `validate()`에 타입 검증 추가
- **`default_time_fallback` 자동 등록 제거** — confidence 시스템이 동일 신호(`DEDUCT_TIME_NO_DATE`) 흡수. 함수 자체는 BC를 위해 export 유지

#### step 2 — extractors_common 자연어 커버리지 확장

- **2a 2자리 연도** — `_RE_YEAR_*` 모두 `\d{2,4}` 허용. `_norm_year` 헬퍼 (`00~49 → 20XX`, `50~99 → 19XX` — 회계 도메인 안전 기본값). "24년"·"24년도"·"24년 5월"·"99년 1분기"·"24년 상반기" 정상 처리
- **2b 범위 표현** — `_RE_MONTH_RANGE`(부터·에서·~·–·—·-)·`_RE_DATE_FROM_ONLY`·`_RE_DATE_TO_ONLY`. "5월부터 7월까지"·"24년 3월부터 25년 7월까지"·"2024-05-15 이후"·"20240515 까지". `_norm_date()` 보강해 `2024.5.15` zero-pad 누락도 정규화
- **2c 상대 시기** — 어제/오늘/내일·이번/지난/지지난/다음 분기·반기·주. `_quarter_of`·`_quarter_range`·`_shift_quarter`·`_half_of`·`_half_range`·`_shift_half`·`_week_range` 헬퍼. 연도 경계 정확히 처리(예: 2026-05 기준 "지지난 분기" → 2025-Q4). "지난 N {일,달,개월,년}" = "최근 N" 동의어
- **2d 비교 의도** — `RE_COMPARISON_INTENT` export ("전월 대비"·"전년 동기"·MoM/QoQ/YoY/YTD·"증감률"). 룰로 두 기간을 풀려 시도하지 않고 confidence -0.40 감점으로 LLM 위임 유도
- **`RE_TIME_HINT` 보강** — 2자리 연도·"다음 분기/반기/주"·"지난 N"까지 시간 신호로 인식

#### step 4 — eacct_chatbot/source/chat_handler.py 룰 결과 주입

- **`_route_via_rules()`** — 반환을 `(intent, rule_hint)` 튜플로 변경. 확정·부분추정·완전실패 3가지 케이스 명시
- **`_detect_intent(rule_hint=...)`** — 룰의 부분추정(도메인·도구 후보·일부 인자·미신뢰 사유)을 미소 라우터 프롬프트에 동봉. LLM이 처음부터 재파싱하지 않고 보완만 함 → 정확도·일관성·비용 개선
- **`MisoChatHandler.chat()`** — 튜플 unpack + hint 전달

#### 검증

- **테스트:** 신규 80개 통과(`test_router.py` 31 + `test_extractors_common.py` 49)
- **실서버:** "24년도 전표 리스트" → `book_dt_from=2024-01-01`·`book_dt_to=2024-12-31`·confidence 0.90(2자리 연도 잔여 모호성 -0.10)·`needs_llm_fallback=False` — 룰 단독 해결
- **부분추정 케이스:** "YoY 매출 전표" → confidence 0.60·tool_hint=`search_slips`·domain=`slip`·params={}·사유=비교 의도 → LLM에 hint 동봉 위임
- **도메인 분류 실패:** "지난 분기 매출" → confidence 0.0·candidates 3개 → LLM에 후보 동봉 위임

### 버전·문서

- **mcp_platform v0.2.1 → v0.3.0** — `pyproject.toml`·`__version__`·`CHANGELOG.md` 동기화
- **CHANGELOG.md** v0.3.0 섹션 신설 — Added(confidence·extractors)·Changed(상수 튜닝·기본값)·Tests
- 임계치·감점값은 운영하며 튜닝 가능 (`DEDUCT_*` 상수·`DEFAULT_CONFIDENCE_THRESHOLD`·`DEFAULT_MIN_TOP_SCORE`)

### 남은 작업 (옵션)

- step 3: `eacct_mcp/source/tools/router_domains.yml`에 도메인별 `required_params`·`min_top_score` 명시 — 도메인 운영 정책 결정 시 적용. 현재 기본값으로 충분
- step 5: chat_handler에서 `confidence` 필드 직접 활용은 이미 `needs_llm_fallback`이 confidence 기반이라 추가 작업 불필요

---

## 2026-05-14 (22) — mcp_platform v0.2.0 정합 + v0.2.1 후속 패치 (collab 합의 마감)

### 결정 배경

- (21) 보류 항목인 "mcp_platform v0.2.0/v0.2.1 흡수 산출물" 일괄 마감 세션
- codex 1차 리뷰(`platform/collab/20260513-1724-mcp-platform-router-integration-review.md`) 6건 → claude 응답에서 v0.2.0 정합(1·2·6번) + v0.2.1 후속(3·4·5번)으로 분리 합의
- "이건 나중에 하고 collab 내용 검토 해줘" → "수정하고 문서도 업데이트" → "남은 건 후속 패치로 합의" → "1(지금 이어서 적용)" → "미완료건 추가 작업" → 마무리 push 순서로 진행

### 작업

#### v0.2.0 정합성 픽스
- **`mcp_platform/__init__.py`** — `__version__` `0.1.0` → `0.2.0`. 선언 순서를 `from .base_server import PlatformServer` 앞으로 이동 (순환 import 방지)
- **`mcp_platform/base_server.py`** — `from mcp.server.fastmcp import FastMCP` top-level 제거 → `_build_mcp()` 내부 lazy import + `TYPE_CHECKING` 가드. `PlatformServer(version=None)` 기본값을 `__version__` 참조로 단일화(SoT)
- **검증:** `mcp` 차단 환경에서 `from mcp_platform.router import Router` 정상 import 확인
- **빌드 산출물:** `.gitignore`에 `*.egg-info/`·`__pycache__/` 이미 등록·git 미트래킹 확인 → 추가 작업 없음

#### v0.2.1 후속 패치 (Router API 확장)
- **`RouterValidationError`** (ValueError 서브클래스) 신설 + `mcp_platform.router.engine` export
- **`Router.from_yaml`** — 스키마 수준 검증(`domains` 키·필드 타입). 친절한 메시지로 파일 경로·필드 위치 명시
- **`Router.validate()`** — 모든 `register_*` 완료 후 호출. extractor·selector 참조 일관성·default_tool/selector 보유 여부를 모아서 한 번에 raise. 서버 부팅 시점에 깨지므로 YAML typo 무성한 실패 사전 차단
- **`Router(domains, ambiguity_margin=1.0)`** — top1-top2 점수차 < margin 시 `tool=None`·`candidate_domains`·`candidates`·`needs_llm_fallback=True` 반환. dict 삽입 순서 의존을 LLM fallback 분기로 명시 위임. `_pre_hooks` 확정 케이스는 영향 없음
- **`route()` unknown 분기 일관화** — `needs_llm_fallback=True`·`fallback_reason` 부여
- **`rest_bridge._build_input_schema`** — `typing.get_type_hints(func, include_extras=True)` 적용. 실패 시 기존 `inspect.signature` annotation 안전 폴백. `from __future__ import annotations` 호환·`Annotated[str, "..."]` 활용 여지 확보

#### 테스트·문서·버전 동기화
- **`tests/test_router.py`** 신설 — 12 케이스(스키마 3 / validate 5 / ambiguity 3 / unknown 1), `pytest -q` 0.17s 통과
- **버전 bump:** `pyproject.toml`·`__version__`·`CLAUDE.md` 모두 `0.2.1` 동기화
- **`CHANGELOG.md`** — v0.2.1 섹션 신설(Added 5 / Changed 2), v0.2.0의 `Planned (v0.2.1)` 섹션 제거. v0.2.0에는 정합성 픽스 3건 명시
- **`CLAUDE.md`** — Router API 표에 `validate()` 추가, 생성자에 `ambiguity_margin` 명시, 사용 예에 `router.validate()` 호출 1줄 추가

#### eacct_mcp 사용처 갱신
- **`projects/eacct_mcp/source/tools/router.py`** — `_router.validate()` 호출 추가(import 시점 검증). venv에서 정상 import 확인(domains: taxbill·slip·comcd)
- eacct_mcp 서브모듈 내부 별도 commit + project-hub 측 pointer 갱신

#### collab 인프라
- 합의 종료 후 `platform/collab/20260513-1724-mcp-platform-router-integration-review.md` 본 세션에서 삭제 (.gitignore 처리되어 git 영향 없음)

### 메모

- v0.2.1 ambiguity 정책의 `margin` 기본값 1.0은 현재 점수가 정수 단위(키워드 1매칭당 1점)임을 가정한 값. 향후 가중치 기반으로 점수가 소수화되면 조정 필요
- `Router.validate()`는 register API에 강제되지 않음(opt-in) — eacct_mcp는 부팅 시점 호출로 안전, 다른 사용처는 자율 선택

---

## 2026-05-13 (21) — 누적 변경 정합성 정리 (working tree 일괄 commit)

### 결정 배경

- (20) 세션 후반에 working tree에 다른 시기 작업들이 정리 안 된 채로 누적되어 있던 것을 발견 — 흡수 세션·secrets 통일·플러그인 문서 표준화 등 의미 단위가 섞임
- "오늘 작업 기록 다 했으면 커밋 한번 하자, 나눠서 해야 한다고 판단되면 그렇게 해" — 의미 단위 분류 후 commit 분리 진행
- 분류 기준: ① 이번 세션 직접 작업 / ② 다른 세션·외부 영역(흡수·신규 프로젝트) / ③ 의미 명확한 누적 변경 (정합성 정리 대상)

### 작업

- **(가) `PROJECTS_GLOBAL.md`** (`86327e5`) — eacct_chatbot 등록 + eacct_mcp 단계(설계→개발)
- **(나) `platform/TRIGGERS.md`** (`26fa1f7`) — eacct 실행 트리거 + collab 리뷰 트리거 3종(요청·검토·종료)
- **(다) webview 사이드바 docs/ 자동 노출** (`604be63`) — `sync_sidebar.py` 헬퍼 추가, 표시명 우선순위: `sidebar_title` 메타 → 첫 h1 → 파일 stem
- **(라) keyring 통일 + `secrets_loader` 플러그인 도입** (`cf8b718`) — 시크릿은 `.env` 평문·시스템 환경변수 금지, keyring 단일화. `secrets_loader.inject_secrets` 진입점 어댑터 신규 + 가이드 3건(`secrets_guide`·`connection_setup`·`SETUP`) 동시 갱신
- **(마) 플러그인 표준 문서 도입** (`e89e86c`) — `atlassian_client`·`miso_client` 각 `CLAUDE.md`·`CHANGELOG.md` (어제 작성된 untracked 표준 문서 commit)
- **(바) collab 임시 파일 .gitignore** (`7ed77e5`) — 합의 후 삭제되는 임시 협업 파일을 git 추적 제외 (표준 문서 README·_template만 추적)
- **(사) 서브모듈 secrets_loader 적용** (`dac0068` wiki_faq_builder / `73f5b6a` wiki_mbo_builder) — (라)의 platform 변경에 맞춰 각 프로젝트 진입점에서 `inject_secrets` 호출, `.env.example`에서 시크릿 분리 + keyring 등록 안내. project-hub에서 submodule pointer 갱신 (`6361919`)
- **세션 기록 정리** (`0f90a06`) — (20) 항목 기록 / (`381d7f5`) — collab 인프라(README + _template) 도입

### 보류

- mcp_platform v0.2.0/v0.2.1 흡수 산출물(base_server·CHANGELOG·__init__·rest_bridge import·CLAUDE.md 잔여 변경) — 흡수 세션이 일괄 마감 예정
- `projects/eacct_chatbot/` (untracked) — 별도 submodule 등록 절차 필요 (보류된 `connect_github.py` 분리 작업이 이 흐름을 다룰 예정)

---

## 2026-05-13 (20) — platform 안전·품질 패치 (P0 + P1 부분)

### 결정 배경

- codex가 정리한 platform 권고 11건을 collab 워크플로우로 검토 (개인 작업 외 협업 검토는 첫 시도)
- 그 과정에서 `_update_global_todo_status`가 TODO_GLOBAL.md "기한" 컬럼을 망가뜨려 온 정규식 버그 발견 — 다행히 누적 손상 없음 확인
- collab 워크플로우는 흐름이 뒤죽박죽돼 향후 정리 후 재사용 예정 (이번엔 검토 결과만 반영, 절차 자체는 미정착)

### 작업 (P0)

- **`_update_global_todo_status` 정규식 버그 fix** (`ccffeb4`) — 표 컬럼 파싱 방식으로 교체, `mcp` 의존성 없이 단위 테스트 가능하도록 `todo_updater.py`로 순수 함수 분리, 회귀 테스트 8건 추가 (`tests/test_todo_updater.py`)
- **`init_project.py` 안전 패치** (`5de5b6e`) — `validate_project_name` (`^[a-zA-Z0-9_-]+$`) + `resolve_project_path` (`is_relative_to` 검증). CLI·interactive·`--delete` 3개 진입점에 적용. `unregister_from_projects_global`의 부분 매칭 버그(`test` 삭제 시 `test_legacy` 행도 함께 지워짐) 같이 fix
- **CI 워크플로우 품질 게이트** (`6e40f35`) — `continue-on-error: true` 제거, 빈 테스트 디렉토리 가드 추가

### 작업 (P1)

- **catalog.yml에 mcp_router 등록** (`892609c`) — 작업 도중 (19)의 흡수 작업이 진행되면서 정합성은 (19)·다른 세션이 일괄 정리 예정
- **eacct_mcp setup.py · CLAUDE.md** (`1d281e3`, `d68ff39`) — 위와 동일, 일부 (19)에서 revert/재구성됨
- **`middleware.log_tool_call` 시크릿 마스킹** (`da4b2ac`) — 키 이름에 `secret/token/password/credential/api_key/apikey/auth` 포함 시 값을 `***`로 치환. 보수적 정책(false positive 허용)
- **`rest_bridge._build_input_schema` 타입 확장** (`efde754`) — `Optional[X]`·`list[X]`·`dict[K,V]` 정확 변환, Optional/default 있는 인자는 required에서 제외

### 보류

- `setup_dev_github` 기본 동작 변경(옵션β: `connect_github.py` 분리) — 흡수 세션과의 영향 분리를 위해 이번 세션 범위 밖으로 이관
- 작업6 (P2 묶음): `install_app.py` OS별 경로 / `set_credential.py` 예외 / `.editorconfig` 인코딩 안내

---

## 2026-05-13 (19) — mcp_router → mcp_platform.router 서브패키지로 통합 (v0.2.0)

### 결정 배경

- 같은 날 (18)에서 mcp_router를 별도 플러그인으로 분리했으나, 재검토 결과 **라우터 사용 = mcp_platform 동행이 99%** 라는 점에서 분리 이점 미미
- pyyaml은 가벼움(~600KB)이라 코어 의존으로 포함해도 부담 없음
- 향후 무거운 의존성(임베딩 등)은 `optional-dependencies` (extras)로 분리하면 됨
- 신규 MCP 서버 만들 때 인지 부담·설치 명령 1줄 줄어듦

### 작업

- **`mcp_platform` v0.1.x → v0.2.0** — `router/` 서브패키지 흡수
  - `mcp_platform/router/engine.py` (Router 클래스)
  - `mcp_platform/router/extractors_common.py` (공용 추출기 7종)
  - `mcp_platform/router/__init__.py` (export)
  - `pyproject.toml`에 pyyaml 의존성 추가, description 갱신
  - `CLAUDE.md` 갱신 (router 섹션 신규), `CHANGELOG.md` v0.2.0 기록
- **`mcp_router` 별도 플러그인 폐기** — `platform/plugins/mcp_router/` 폴더 제거
- **eacct_mcp import 경로 갱신**: `from mcp_router import Router` → `from mcp_platform.router import Router` (2줄)
- **eacct_mcp setup.py 갱신**: 자동 설치 항목에서 mcp_router 제거, mcp_platform 단일 설치로 단순화
- **eacct_mcp venv**: `pip uninstall mcp-router` + `pip install -e mcp_platform` 재설치
- **`platform/guides/new_mcp_server_setup.md` 갱신**: import 경로·설치 명령·플러그인 표·트러블슈팅 모두 mcp_platform.router 기준으로
- **eacct_mcp `CLAUDE.md`·`requirements.txt` 갱신** (Jacey 수정본 위에 정리)
- 메모리 `project_mcp_router.md`·`reference_routing_policy.md`·`MEMORY.md` 갱신 — 통합 사실 반영

### 회귀 검증

- 13개 핵심 케이스 통과 (분리·통합 모두 동일 결과)
- MCP 서버 정상 가동 (`mcp_tools=7`)
- 챗봇 정상 가동

### 효과

- 신규 MCP 서버 생성 시 `pip install` 명령 1줄 감소 (mcp_router 별도 설치 불필요)
- 의존성 관리·버전 호환성 단순화
- 라우터 API 위치가 한 곳(`mcp_platform.router`)으로 명확

---

## 2026-05-13 (18) — mcp_router 플러그인 신규 + 라우터 분리·하이브리드 라우팅 도입 + 가이드 2종 작성

### 플랫폼 (platform)

- **`platform/plugins/mcp_router/` 신규 플러그인 (v0.1.0)** — MCP 도구 라우팅 공용 엔진
  - `engine.py` `Router` 클래스 — YAML 도메인 로드·점수 계산·extractor/selector/hook registry·fallback 판단
  - `extractors_common.py` — 공용 추출기 7개 (date_range·top_n·vendor_name·vendor_no·approval_no·quoted_keyword·code_group_id) + `RE_TIME_HINT`·`RE_CODE_GROUP_ID`
  - 도메인 무관 엔진 + 도메인 특화 로직(yml·extractor·selector·hook)을 분리해 어떤 MCP 서버에서도 재사용
- **`platform/guides/new_mcp_server_setup.md` 신규** — 신규 MCP 서버 0→1 생성 가이드 (10단계 + 부록, 가상 hr_mcp 예시 포함)
- **`platform/guides/onprem_llm_setup.md` 신규** — 사내 LLM 구축 가이드 (vLLM/Ollama·GPU 요구사항·모델 추천·챗봇 연동)
- **`platform/services/webview/_sidebar.md`** — 가이드 영역에 "신규 MCP 서버 만들기" 등록
- **`platform/plugins/mcp_router/CLAUDE.md`** — 플러그인 사용 API·YAML 구조·등록 패턴 명세
- **미해결 결정**: mcp_router를 mcp_platform 서브패키지로 통합할지 검토 — 현재 별도 플러그인 유지, 추후 결정

### eacct_mcp

- **`search_purchase_invoice` 시그니처 확장** — `vendor_name`·`date_from`·`date_to`·`top_n` 신규
  - Tier 3 목록 조회 모드 추가 (거래처/날짜범위 기반, 거래일자 DESC, top_n 제한, 50건 초과 시 too_many)
  - 기존 Tier 1(승인번호) / Tier 2(3종 정밀매칭) 보존
- **도구 5개 docstring에 `[Examples]` / `[Not for]` 보강** — LLM 라우팅 정합도 향상
- **`router.py` 재작성 → `mcp_router` 엔진으로 분리** (register 패턴)
  - 회계 특화 extractor: `extractors_eacct.py` (slip_status·gw_status·code_keyword)
  - 도메인 selector: `router_selectors.py` (comcd_selector·taxbill_selector)
  - 도메인 정의: `router_domains.yml` (taxbill·slip·comcd)
  - 비즈니스 강분기 hook: 14자리 → search_purchase_invoice 즉시 확정 / 대문자 코드그룹 ID → comcd +3 부스트
- **시간 표현 확장**: 분기(2024 Q1, 1분기)·반기(상반기/하반기)·연도(2024년)·월(2024년 3월)·작년·재작년·지지난주 등 인식
- **`needs_llm_fallback` 플래그** — 룰이 도구는 확정했어도 시간 표현 추출 실패 시 LLM 라우터로 재시도 권고
- **`requirements.txt`** — pyyaml 제거 (mcp_router가 흡수), mcp_router/mcp_platform editable 설치 안내

### eacct_chatbot

- **3-pass 하이브리드 라우팅 도입** — Pass 0(MCP `route_intent` 룰) → Pass 1(Miso 라우터 앱 LLM fallback) → Pass 2(Miso 답변 앱)
- **라우터/답변 MisoClient 분리** — `MISO_ROUTER_API_KEY` 환경변수(선택), keyring에 별도 등록
- **`_route_via_rules` 추가** + `needs_llm_fallback=true` 시 LLM fallback으로 위임
- **정확도 자동 부착 폐지** — `_estimate_confidence`·`_ensure_confidence_suffix` 제거. LLM 판단 그대로 따름
- **새 정확도 정책**: 단순 조회·잡담·오류 안내엔 표기 생략. 데이터 해석·분석·제안 응답에만 LLM이 자율 표기
- **`SYSTEM_PERSONA`에 의도-결과 검증 룰 추가** — 사용자 요청 기간/조건과 도구 결과 불일치 시 답변 첫 문단에 명시
- **`widget.html` 컨텍스트 임계값 운영값 원복** — `CTX_SHOW_THRESHOLD=75`, `CTX_AUTO_COMPACT_THRESHOLD=95`
- **`CLAUDE.md` 갱신** — 미소 라우터 앱 생성 절차, 환경변수 표, 3-pass 흐름 명세

### Miso 콘솔 작업 (Jacey 수동 영역)

- **라우터 전용 앱(`e-Acct AI 라우터`) 생성** — JSON 분류기 시스템 프롬프트 + temperature=0.0, max_tokens=512
- **답변 앱(`e-Acct AI 어시스턴트`) 시스템 프롬프트 갱신** — 의도-결과 검증 룰 + 새 정확도 정책 반영

### 메모리

- `project_mcp_router.md` 신규 — 플러그인 포인터·register 패턴 요약
- `MEMORY.md` 인덱스 갱신

---

## 2026-05-13 (17) — eacct_mcp route_intent 도메인 분류 아키텍처 + Miso 안내 메시지 논의

### eacct_mcp

- **router.py 전면 재작성** — 도메인 점수 기반 분류 아키텍처로 업그레이드
  - `_DOMAINS` 테이블(pos/neg/weight) + 도메인별 핸들러 분리 (`_handle_taxbill` / `_handle_slip` / `_handle_comcd`)
  - 파라미터 자동 추출: 승인번호·사업자번호·거래처명(따옴표/(주))·날짜 범위(이번달·지난달·최근 N일/개월·올해)·top_n
  - 대문자 코드그룹 ID(BILL_STATUS 등) 감지 시 comcd 부스트
  - 응답에 `domain`·`scores` 포함 — 디버깅 활용

### eacct_chatbot 연계 논의

- Miso 에이전트 안내 메시지는 **두 레이어** 존재 확인:
  - Pass 1: `chat_handler.py` `_detect_intent` 프롬프트 (실질 영향)
  - Pass 2: Miso 앱 UI 시스템 프롬프트 (최종 답변에만 영향)
- route_intent 연계 옵션 2가지 정리 (단순 가이드 보강 / chat_handler.py 수정으로 Pass 1을 route_intent로 대체) — 결정 보류

---

## 2026-05-13 (16) — eacct_mcp route_intent 라우터 tool 구현

### eacct_mcp

- **`route_intent` tool 신규 구현** (`source/tools/router.py`)
  - 3-Tier 규칙 기반: 14자리 이상 숫자 → 승인번호 확정 / 키워드 매칭 / 불명확 힌트 반환
  - Miso가 먼저 route_intent 호출 → 결과로 실제 tool 호출하는 2-step 패턴
  - tool 수 증가 시 Miso description 부담 없이 확장 가능 (10+tool 대비)
- **문서 현행화:** miso_api_spec.md v0.4(§3-0 추가), changelog, history

---

## 2026-05-13 (15) — eacct_mcp search_purchase_invoice 구현 + Miso tool 선택 오류 수정

### eacct_mcp

- **`search_purchase_invoice` tool 신규 구현** (`source/tools/taxbill.py`, eacc_taxheader 실DB)
  - Tier 1: 승인번호(ZISSID) 단건 조회 (날짜 제한 없음·전사 전체)
  - Tier 2: 공급자 사업자번호 + 합계금액 + 거래일자 3종 조합, 신뢰도 95/80/65%
  - 응답 섹션: basic / slip_info / source_info / exclusion / transfer
  - member 테이블 JOIN — 처리자명·이관자명·이관대상자명 반환
- **`invoice.py` 삭제** (Mock POC → 실DB tool 대체 완료)
  - `__init__.py` import 제거, CLAUDE.md·miso_api_spec.md(v0.3)·changelog 현행화
- **Miso tool 선택 오류 수정** (24자리 승인번호를 search_slips bill_ndx로 잘못 전달)
  - `search_purchase_invoice` docstring: `[규칙] 14자리 이상 → 반드시 이 도구, search_slips 사용 금지`
  - `search_slips` docstring: `전표번호 최대 13자리, 14자리 이상은 search_purchase_invoice`
  - `search_slips` 코드: 14자리 이상 bill_ndx 입력 시 자동으로 search_purchase_invoice 위임
- **후속:** `route_intent` 라우터 tool → (16)에서 구현 완료

---

## 2026-05-13 (14) — eacct_chatbot 슬래시 커맨드·컨텍스트 바 + eacct_mcp 전표조회 개선

### eacct_chatbot

- **운영 배포 가이드 작성:** `projects/eacct_chatbot/docs/production_deployment.md` (서버 구성·임베드·사용자 인증·배포 체크리스트)
- **슬래시 커맨드 구현:** `/clear` · `/compact` · `/help` — 입력창에서 `/` 입력 시 자동완성 팝업, ↑↓ 키보드 내비게이션
- **컨텍스트 바 구현:** 누적 대화 문자수 기반 % 표시, 임계값 초과 시 표시 (현재 테스트값 5%), `/compact` 버튼 노출
- **자동 compact:** 컨텍스트 임계값 도달 시 자동 실행 (테스트: 10%, 운영 확정값: CTX_SHOW=75 / CTX_AUTO_COMPACT=95)
- **`/compact` 엔드포인트:** `POST /compact` — AI 요약 후 마지막 2턴 보존한 압축 history 반환
- **`GET /config` 엔드포인트:** 백엔드 종류·max_context_chars 반환
- **Pass 1 history 전달 버그 수정:** `_detect_intent`에 history 미전달로 후속 질문("1, 2월만 보여줘") 맥락 상실 → 최근 2턴 포함 전달로 수정
- **Pass 2 표 출력 규칙 추가:** 컬럼명·순서 임의 변경 금지 지시 삽입

### eacct_mcp — search_slips 개선

- **날짜 범위 제한 제거:** `_MAX_DATE_RANGE_DAYS=62` 삭제, `_validate_dates`에서 범위 검증 제거
- **건수 기반 제한:** `_TOO_MANY_THRESHOLD=50` — 50건 이상 시 Miso 호출 전 직접 안내 반환 (`too_many: true` 플래그)
- **응답 컬럼 한국어 변환:** `_COLUMN_MAP` 정의, 전표(업무)유형·전표번호·적요·금액·회계일자·전표상태·작성자·작성부서 순 고정 반환

---

## 2026-05-13 (13) — eacct_chatbot Miso 토큰 최적화 + eacct_mcp 오류 확인

- **[eacct_chatbot] Miso Pass 2 토큰 최적화:** `SYSTEM_PERSONA`(~400 토큰)를 Miso 앱 시스템 프롬프트로 이전, `chat_handler.py` Pass 2 prompt 경량화
- **[eacct_chatbot] CLAUDE.md:** 미소 앱 시스템 프롬프트 샘플 현행화 (페르소나·응답 규칙·정확도 표기 통합본)
- **[eacct_mcp] T018 등록:** MCP 서버 오류 모니터링 + 관리자 알림 (방식 미결정)
- **[eacct_mcp] search_slips 500 오류:** DBSafer 미연결로 인한 DB 타임아웃 — 재연결 후 해결

## 2026-05-12 (12)

### eacct_mcp — commcode 개선 + search_slips 고도화

- **commcode.py:** `_add_status_nm` 추가(DEL_YN→'사용중'/'삭제됨'), `get_comcd_group` JOIN으로 그룹명 포함
- **search_slips tool 고도화:**
  - 작성자·작성부서 env var 자동 로드, 사용자 파라미터 미노출
  - 회계반영일 기본값(오늘-30일~오늘) 자동 적용
  - 50건 초과 시 웹 조회 안내 후 데이터 미반환 종료
  - CSV export 지원(`export_format="csv"`)
- `.env` / `.env.example`: `EACCT_USER_SABUN`, `EACCT_USER_DEPT` 추가

---

## 2026-05-12 (11)

### eacct_mcp · eacct_chatbot — Phase 1 완료 / Phase 2 진입

- **Phase 1 완료 판정:** eacct_chatbot REST 연동 + Miso 2-pass로 DB 실시간 조회 검증 완료. stdio(Claude Desktop) 별도 검증 불필요.
- 두 프로젝트 CLAUDE.md·PROJECTS_GLOBAL.md 단계 업데이트:
  - eacct_mcp: `설계` → `개발`, Phase 1 완료·Phase 2(Miso 개발팀 연동 요청) 진행중
  - eacct_chatbot: `기획` → `개발`, Phase 2(E2E 테스트·안정화) 진행중

### eacct_mcp — miso_api_spec.md v0.2 전면 갱신

- tool 목록 현행화 (2종 → 6종): commcode 3종(실DB)·slip 1종(실DB) 추가, invoice 2종(Mock) 유지
- 미구현 예정 항목(get_vendor_history·get_account_list) 제거
- 각 tool 파라미터 테이블·요청/응답 예시 신규 작성

### eacct_chatbot — tool 오류·0건 단락 처리

- `MisoChatHandler.chat()` 수정: tool 호출 후 오류·0건이면 Pass 2(Miso) 생략하고 직접 반환
  - 연결 오류(WinError 10061 등): "eacct_mcp 서버 연결 불가" 메시지 직접 반환
  - 기타 tool 오류: 오류 내용 직접 반환
  - 0건 결과: "조회 결과 없음" 직접 반환
  - 데이터 있음·일반 질문: 기존 Pass 2 유지

---

## 2026-05-12 (10)

### eacct_mcp — 로깅 인프라 개선 (mcp_platform 공통 적용)

**`platform/plugins/mcp_platform` 수정**

- `middleware.py`
  - StreamHandler UTF-8 인코딩 고정 (Windows 콘솔 한글 깨짐 방지)
  - tool OK 로그에 처리시간(ms) + 결과 건수(`count`) 추가
  - tool ERROR 로그에 전체 스택트레이스(`exc_info=True`) 추가
  - `FileHandler` → `TimedRotatingFileHandler` 전환 (일별 로테이션, 30일 보관)
- `rest_bridge.py` — HTTP 접속 로그 미들웨어(`_AccessLogMiddleware`) 추가: 메서드·경로·응답코드·소요시간·클라이언트 IP 기록
- `base_server.py` — `create_rest_app`에 logger 전달하도록 수정

**로그 파일:** `projects/eacct_mcp/logs/eacct_mcp.log`

### eacct_chatbot — MCP 연결 상태 표시 제거

- `widget.html` 헤더: `e-Accounting AI · MCP 연결됨(N)` → `e-Accounting AI 어시스턴트`
- `index.html` 헤더: MCP 상태 dot + 텍스트 제거

---

## 2026-05-12 (9)

### eacct_mcp — 산출물 파일명 순번 제거 + 웹뷰 사이드바 개선

**eacct_mcp 산출물 파일명 정규화**
- `01_REQ_eacct_mcp_요구사항정의서.html` → `REQ_eacct_mcp_요구사항정의서.html`
- `02_FLW_eacct_mcp_프로세스흐름도.html` → `FLW_eacct_mcp_프로세스흐름도.html`
- `05_FUNC_eacct_mcp_기능정의서.html` → `FUNC_eacct_mcp_기능정의서.html`
- `docs/index.md` 링크 3개 동일하게 수정

**웹뷰 404 수정 — `index.html` basePath 경로 오류**
- `basePath: '../'` → `'/'` (서버 루트 = 프로젝트 루트로 고정)
- `loadSidebar`, `nameLink`, 아이콘 네비 hash 참조, `fetch()` URL, 홈 감지 조건 전체 경로 수정
- 근본 원인: basePath `'../'`가 `platform/services/`를 기준으로 잡혀 콘텐츠 파일(프로젝트 루트) 404

**sync_sidebar.py 개선 — docs/*.md 자동 스캔**
- `_get_sidebar_title()` 추가: 다중 줄 HTML 주석의 `sidebar_title` 메타 파싱, H1 폴백
- `_get_docs_items()` 추가: `docs/*.md` 최상위 파일 자동 수집, `index.md` 항상 마지막
- `STANDARD_ITEMS`에서 `docs/index.md` 제거 → `_get_docs_items()` 위임
- 효과: Miso API 스펙·산출물 복구, 이후 docs/*.md 파일 추가 시 자동 반영

---

## 2026-05-12 (8)

### 플랫폼 — 플러그인 문서 체계 수립 + 메모리 포인터 전환

**배경:** 플러그인 관련 정보가 개인 메모리에 분산 저장되어 다음 세션에서 재활용이 어려웠음. CLAUDE.md(현행 상태, 항상 로딩) + CHANGELOG.md(이력, 필요 시 로딩) 이중 체계로 정비.

**플러그인 문서 신규 생성 (6개)**

| 플러그인 | CLAUDE.md | CHANGELOG.md |
|---|---|---|
| `mcp_platform` | 모듈 구성·GET /tools 스키마·의존성 | v0.1.1 input_schema 추가, v0.1.0 초기 생성 |
| `miso_client` | MisoClient 사용법·chat() 동작·앱 매개변수 권장값 | v0.1.0 atlassian_pipeline 분리 배경 |
| `atlassian_client` | 모듈 구성·ConfluenceAnalyzerBase 예시·환경변수 | v0.2.0 명칭 변경 이력, v0.1.0 초기 생성 |

**메모리 포인터 전환**
- `project_atlassian_client.md` → 포인터 전용 (상세는 CLAUDE.md 참조)
- `project_miso_client.md` → 포인터 전용 (상세는 CLAUDE.md 참조, 경로 오류도 수정: `platform/miso_client/` → `platform/plugins/miso_client/`)

---

## 2026-05-12 (7)

### eacct_chatbot (P2605121) — 프로젝트 생성 및 초기 구현

- **신규 프로젝트 생성:** `eacct_chatbot` (P2605121) — e-Acct AI 챗봇, apps 등록 예정
- **아키텍처:** 브라우저 → FastAPI(7000) → AI 백엔드 → eacct_mcp REST(8000) → e-Acct DB
- **AI 백엔드:** Claude API(tool_use) / Miso API 전환 지원 (`AI_BACKEND` 환경변수)
- **Miso 2-pass 오케스트레이션:** Pass1 의도파악(JSON) → tool 호출 → Pass2 최종 답변
- **구현 파일:** `server.py`(FastAPI) · `chat_handler.py`(ClaudeChatHandler·MisoChatHandler·factory) · `mcp_client.py` · `templates/index.html`(채팅 UI)
- **mcp_platform rest_bridge.py 확장:** `GET /tools`에 `input_schema` 추가 — 함수 시그니처 타입힌트 → JSON Schema 자동 생성 (Claude tool_use·Miso 호환)
- **버그 수정:** starlette 1.0.0 + Jinja2 3.1.6 호환성 오류 → `fastapi==0.115.12` 고정 + `Jinja2Templates` 대신 Jinja2 직접 호출로 교체
- **TRIGGERS.md:** eacct_mcp 서버 실행 / eacct_chatbot 실행 트리거 2건 추가
- **서버 구동 확인:** eacct_mcp(8000) ✓ · eacct_chatbot(7000) ✓
- **다음:** E2E 테스트 (T004) — 공통코드 조회 질문 → Miso 응답 확인

---

## 2026-05-12 (5)

### 플랫폼 — 산출물 템플릿 순번 제거 + 신규 4종 추가

**목적:** 단계 폴더 구조 도입으로 파일명 순번(`NN_`)이 중복 역할이 됨에 따라 제거. SDLC 관점 누락 산출물 4종(DAT·API·SEC·RUN) 추가 및 필수/옵션 구분 체계화.

**1단계 — 순번 제거**
- 템플릿 HTML 12종 파일명 변경: `01_REQ_...` → `REQ_...` 등 (`01_plan/`·`02_design/`·`03_dev/`·`04_test/`·`05_deploy/` + TRC 루트)
- 가이드 MD 10종 파일명 변경: `01_REQ-authoring-guide.md` → `REQ-authoring-guide.md` 등
- `platform/project/project_creation.md`: `01_REQ` 참조 → `REQ`

**2단계 — 필수/옵션 구분 + 사용조건 컬럼 추가**
- `platform/project/deliverables_guide.md`: 산출물 표에 `필수/옵션` · `사용조건` 컬럼 신설 (15종 + TRC 기준)
  - 필수 8종: REQ·FLW·FUNC·ARC·UTC·ITS·OPM·CFG
  - 옵션 7종: SCR(UI 있을 때)·ROLE(권한 체계 있을 때)·DAT(DB 있을 때)·API(외부 노출 시)·SEC(인증/PII 처리 시)·RUN(운영 단계 진입 시)·USM(외부 사용자 있을 때)
- `platform/project/project_lifecycle.md`: 단계별 산출물 목록 구 파일명 전부 갱신

**3단계 — 신규 산출물 4종 작성**

| 종류 | 파일 | 특징 |
|---|---|---|
| DAT 데이터모델정의서 | `docs/02_design/DAT_데이터모델정의서.html` | ERD·테이블 상세·FK 관계·인덱스·데이터 정책, chunk=table-row |
| API 인터페이스명세서 | `docs/02_design/API_인터페이스명세서.html` | 엔드포인트 목록·상세·오류코드, chunk=endpoint-row |
| SEC 보안설계서 | `docs/02_design/SEC_보안설계서.html` | STRIDE 위협모델·인증/인가·암호화·OWASP·감사로깅, chunk=section+threat-row |
| RUN 운영Runbook | `docs/05_deploy/RUN_운영Runbook.html` | 모니터링 임계치·일상점검·장애 플레이북·복구 DR·에스컬레이션, chunk=procedure-step |

- 각 산출물별 `authoring-guide.md` 4종 작성 (`guides/DAT-·API-·SEC-·RUN-`)
- 기존 가이드 10종: §0 파일 경로 참조 구 파일명 → 신규 파일명 일괄 수정

**4단계 — 인덱스 및 CLAUDE.md 갱신**
- `platform/templates/deliverables/index.html`: "11종" → "15종", 기존 11개 카드 링크 신규 경로로 수정, 신규 4종 카드(NEW 배지) 추가
- `platform/templates/deliverables/CLAUDE.md`: §2 "15종", §9 가이드 테이블 신규 4종 4행 개별 추가

**주요 결정**
- 순번은 폴더 구조가 SDLC 순서를 담당하므로 파일명에 불필요 → 제거
- SCR·ROLE은 옵션이지만 UI/권한 있는 프로젝트에서 사실상 필수에 준함
- RUN은 운영 단계 진입 시 필수로 분류 (모든 운영 프로젝트)
- ID 네임스페이스: DAT-E/R/I/P, API-###(3자리), SEC-T/C, RUN-A/D/R

**커밋**
- `ef73f8d` feat(templates): 산출물 템플릿 순번 제거 + 신규 4종 추가 (35 files, 1871+/101−)

---

## 2026-05-12 (4)

### 플랫폼 — 프로젝트 라이프사이클 통합 재설계

**목적:** 상태(진행중·보류·활성·서비스종료) 외에 단계(기획·설계·개발·테스트·배포·운영) 개념 도입 + 운영 사이클 + 형상관리 + 권한 정책을 단일 라이프사이클 문서로 통합.

**1단계 — 문서 설계**
- `platform/project/project_lifecycle.md` 전면 재설계: 상태/단계 분리, 5단계 정의, 운영 사이클, 변경 규모 판단(핫픽스/마이너/큰변경), GitHub Flow 단순화, main 직접 커밋 매트릭스, PR 정책(자기 머지 CI만), EOL 체크리스트, 플랫폼 권한 정책
- `platform/project/deliverables_guide.md`: 단계 명칭 표준화 + 단계별 권장 산출물 매핑 + 단계 폴더 구조
- `platform/guides/SETUP.md` §10: Git Flow → GitHub Flow 단순화(develop 제거), §7-1 단계 폴더 컬럼 추가
- `platform/project/project_creation.md`: 단계 진입 안내·tag·상태 전환 흐름 명시

**2단계 — 구조 전환 + 빌드 검증**
- eacct_mcp 산출물 단계 폴더 이동: `01_REQ` → `01_plan/`, `02_FLW` → `02_design/`
- `platform/tools/rag/build-rag.mjs`: SKIP_DIRS 통합(`_archive`·`archive`·`_meta`), 단계 폴더 재귀 탐색 검증 완료 (61 chunks, 20 trace nodes)
- Node.js v24.15.0 LTS + jsdom 설치 (`platform/tools/rag/`에 devDependency)
- `.gitignore` 보강(node_modules·dist)

**3단계 — 메타 적용**
- `PROJECTS_GLOBAL.md`에 `단계` 컬럼 추가
- 5개 프로젝트 CLAUDE.md 헤더에 `단계` 필드 반영: eacct_mcp(설계)·gmail_cleaner·wiki_mbo_builder(테스트)·wiki_faq_builder·google_drive_backup(운영)

**4단계 — 아이다 트리거 추가**
- `platform/TRIGGERS.md` 4개 트리거 추가: 단계 전환 뉘앙스·활성 변경 규모 판단(사용자 확인 필수)·main 직접 코드 변경 가드·배포 완료(git tag + 상태 전환)

**5단계 — 템플릿 영역 일관성 정비**
- 산출물 템플릿 11개를 단계 폴더로 이동 (`01_plan`·`02_design`·`03_dev`·`04_test`·`05_deploy`, `00_TRC`만 루트)
- 옛 단계 명칭(분석·구현·시험·이행) 잔재 일괄 제거: CLAUDE_global.template.md 단계 표, 02_FLW breadcrumb
- `platform/templates/deliverables/README.md` 폴더 구조 그림, authoring-guide 10종 경로, RAG-conversion-guide, tools/rag/README 모두 단계 폴더 반영

**6단계 — 메모리/지침 구분 규칙 정비**
- 라이프사이클 통합 작업 중 잘못 저장된 개인 메모리 2개(`project_lifecycle_v1.md`·`feedback_design_scope.md`) 식별: 플랫폼 정책·디자인 원칙이 개인 머신·계정에만 저장되어 다른 사용자·세션 공유 불가
- 두 메모리 삭제 + 내용은 hub 내 문서(CLAUDE.md)로 이전
- `MEMORY.md` 인덱스 정리

**부수 — 정책 명문화 (CLAUDE.md 응답 규칙 보강)**
- `§9`: 작업 단위 commit은 비서 자동 진행, push는 명시 요청 시. 마무리·clear·compact 자동 기록 흐름은 commit 제외(사용자 직접 다듬을 수 있게 보존)
- `§13`: 구조·라이프사이클·정책 결정은 확장성·일관성 우선 — 현재 N개 아닌 성숙기(20~30개) 기준 판단. 트레이드오프 발생 시 장기 관점 우선
- `§14`: 메모리(개인 협업 컨텍스트) vs hub 내 문서(플랫폼 정책) 구분 명문화. 판단 기준: "다른 사용자에게 같은 효력?" YES면 hub. 플랫폼 운영 규칙·디자인 원칙은 메모리 저장 절대 금지

**주요 결정**
- GitHub Flow 채택 (Git Flow는 동시 다중 버전 운영 시 예외 옵션)
- 활성 프로젝트 코드/설정 변경 시 PR 강제, 자기 머지는 CI 통과만 확인 (self-approve 생략)
- 활성 프로젝트 main 직접 커밋 정책: 문서·산출물·메타만 허용, 코드는 브랜치 분기 후 PR
- project-hub 본 레포는 Jacey 단독 admin, collaborator 추가 금지
- 플랫폼/프로젝트 운영 규칙·디자인 원칙은 반드시 hub 내 문서에 명문화 (개인 메모리 저장 금지)

**커밋 흐름 (push 완료, eacct_mcp 서브모듈은 별도 작업 중이라 보류)**
- `e8aa0e8` feat(lifecycle): 단계 도입 + 형상관리 통합 + 권한 정책
- `282e400` docs(claude): §9 commit/push 정책 명문화
- `dbd8f7f` chore(templates): 산출물 템플릿 단계 폴더 구조 통일
- `49e2517` chore(templates): 단계 폴더 구조 일관성 정비
- `eb7476c` docs(history): 라이프사이클 통합 재설계 기록
- `b99bc50` docs(claude): §13·§14 신설 — 확장성 우선 + 메모리/지침 구분
- 서브모듈 4개 push: gmail_cleaner `692132e` · wiki_mbo_builder `34c224c` · wiki_faq_builder `b4ddf76` · google_drive_backup `6b84eba`

---

## 2026-05-12 (3)

### 플랫폼 — 폴더 구조 대개편 전수 검사 (보완)

**목적:** `core/ → platform/` 구조 변경 후 누락된 경로 참조 전수 검사 — 파일 단위 1차 grep + 2차 파일별 정밀 검토

**기능 영향 있는 수정 (critical)**

| 파일 | 내용 |
|---|---|
| `platform/scripts/install_app.py:94` | `HUB_ROOT / "plugins"` → `HUB_ROOT / "platform" / "plugins"` (실제 코드 — 앱 설치 시 plugin 경로 해결 실패 버그) |
| `platform/scripts/sync_design.ps1` | `$PathMappings`의 `To = "core/tools/rag/"`, `"templates/deliverables/"` → `platform/` prefix (실제 코드) |
| `projects/wiki_faq_builder/.github/workflows/ci.yml` | sparse-checkout · pip install 경로 `plugins/atlassian_client`·`plugins/miso_client` → `platform/plugins/...` (CI silent fail 방지) |
| `projects/wiki_mbo_builder/.github/workflows/ci.yml` | 동일 |
| `platform/templates/deliverables/CLAUDE.md` | guides 참조를 워크스페이스 루트 기준으로 명시 (`guides/chunk-strategy-matrix.md` → `platform/templates/deliverables/guides/...`) — Claude Code 경로 해결 실패 방지 |
| `platform/templates/CLAUDE_global.template.md` | `templates/deliverables/` → `platform/templates/deliverables/` (hub_init.py 재실행 시 생성될 전역 CLAUDE.md에 반영) |

**문서·docstring·주석 수정**

| 파일 | 내용 |
|---|---|
| `.github/workflows/notify_update.yml` | trigger paths `platform/` prefix 반영 |
| `platform/ENHANCEMENTS.md` | `guides/SETUP.md`, `guides/scripts/wiki_sync.py` 경로 갱신 |
| `platform/templates/SETUP.template.md` · `platform/guides/SETUP.md` | history·templates/deliverables 경로 갱신 |
| `platform/project/project_lifecycle.md` | `guides/mcp_registration.md` → `platform/setup/mcp_registration.md` |
| `platform/project/deliverables_guide.md` | `templates/deliverables/` 6건 일괄 갱신 |
| `platform/tools/rag/build-rag.mjs` | docstring · synonyms 경로 갱신 |
| `platform/scripts/manage/wiki_sync.py` · `deploy_record.py` | docstring 사용 경로 갱신 |
| `platform/scripts/webview/generate_sidebar.py` · `sync_sidebar.py` | docstring · 매핑 경로 갱신 |
| `platform/scripts/webview/serve.py` | docstring URL `http://localhost:3000/webview/` → `/platform/services/webview/` |
| `platform/scripts/credentials/set_credential.ps1` · `.sh` | 사용법 주석 · `.venv` 위치 안내 갱신 |
| `platform/plugins/catalog.yml` · `apps/catalog.yml` | 주석 헤더 갱신 |
| `platform/templates/deliverables/DEPLOYMENT.md` · `README.md` | `templates/deliverables/` → `platform/templates/deliverables/` 일괄 |
| `platform/templates/deliverables/guides/ID-namespace.md` · `chunk-strategy-matrix.md` | `tools/build-rag.mjs` → `platform/tools/rag/build-rag.mjs` |
| `platform/hub_init.py` · `init_project.py` | 실행 명령 docstring 갱신 |
| `TODO_GLOBAL.md` (G-010) | `templates/deliverables/` 경로 갱신 |

**프로젝트 레이어**

| 파일 | 내용 |
|---|---|
| `projects/eacct_mcp/source/db.py` | 오류 메시지 `core/scripts/credentials/` → `platform/scripts/credentials/` (서브모듈) |
| `projects/eacct_mcp/.env.example` | 자격증명 등록 안내 주석 경로 갱신 (서브모듈) |
| `projects/eacct_mcp/docs/02_FLW_eacct_mcp_프로세스흐름도.html:215` | `core/.venv`, `core/scripts/credentials/` → `platform/` prefix (서브모듈) |

**검증 결과**
- `platform/plugins/` 내 모든 Python 소스 (atlassian_client·mcp_platform·miso_client) — 경로 참조 없음
- `platform/templates/manage/*.md` 7종 · `deliverables/guides/` 15종 — clean
- 글로벌 파일(`PROJECTS_GLOBAL.md`·`ISSUES_GLOBAL.md`·`hub_config.yml`·`PULL_REQUEST_TEMPLATE.md`·`sync-docs.yml`) — clean
- 프로젝트별 `_manage/*.md` · `CLAUDE.md` — clean

**특이사항**
- `history/202505_history.md` 의도적 삭제 (사용자 확인)
- `eacct_mcp` 서브모듈 변경 → 별도 커밋 처리
- `eacct_mcp/.venv/.../mcp_platform-0.1.0.dist-info/direct_url.json` 의 구 경로 → `pip install -e ../../platform/plugins/mcp_platform` 재실행으로 갱신
- TODO_GLOBAL.md G-017·G-020·G-023, CHANGELOG.md, `_manage/history/*` 등 완료·이력 기록은 당시 맥락 보존을 위해 그대로 유지

---

## 2026-05-12 (2)

### 플랫폼 — 폴더 구조 대개편 (core/ → platform/ 통합)

**목적:** 루트 레벨 폴더 수 최소화 + 플랫폼 성격을 이름에 반영

**구조 변경 요약**

| 이전 | 이후 | 비고 |
|---|---|---|
| `core/` | `platform/` | 명칭 변경 + 플랫폼 전체 통합 |
| `guides/` | `platform/guides/` | |
| `history/` | `platform/history/` | |
| `mcp_server/` | `platform/services/mcp/` | |
| `plugins/` | `platform/plugins/` | |
| `scripts/` | `platform/scripts/` (일부) | `webview/`, `manage/`, `credentials/`, `install_app.py` |
| `templates/` | `platform/templates/` | |
| `tools/` | `platform/tools/` | |
| `webview/` | `platform/services/webview/` | |

**변경 파일 (경로·참조 업데이트)**

| 파일 | 내용 |
|---|---|
| `platform/hub_init.py` | 경로 상수 전체 `platform/` 반영 |
| `platform/init_project.py` | 경로 상수 전체 `platform/` 반영 |
| `platform/services/mcp/server.py` | `HUB_ROOT` depth 4단계 수정 |
| `platform/scripts/webview/generate_sidebar.py` | `HUB_ROOT`, `SIDEBAR_FILE`, `FOLDER_TO_SECTION` prefix 기반 변경, `FIXED_SECTIONS`, `INIT_META_MAP` 전체 갱신 |
| `platform/scripts/webview/sync_sidebar.py` | `HUB_ROOT` 버그 수정 (2→4단계), `SIDEBAR_PATH` 갱신 |
| `platform/scripts/webview/serve.py` | URL 출력 경로 갱신 |
| `platform/scripts/install_app.py` | docstring 경로 갱신 |
| `platform/scripts/credentials/set_credential.py` | docstring 경로 갱신 |
| `platform/setup/secrets_guide.md` | 스크립트 경로 전체 갱신 |
| `platform/TRIGGERS.md` | 스크립트·파일 경로 전체 갱신 |
| `platform/project/project_creation.md` | `init_project.py`, `personal.yml` 경로 갱신 |
| `platform/project/app_registration.md` | `plugins/` → `platform/plugins/` |
| `platform/templates/deliverables/guides/ID-namespace.md` | `init_project.py` 경로 갱신 |
| `platform/services/webview/_sidebar.md` | 전체 경로 `platform/` prefix 반영 |
| `CLAUDE.md` | `core/` → `platform/` 전체 반영 |
| `README.md` | 폴더 구조도 + 스크립트 경로 전면 갱신 |
| `apps/README.md` | `install_app.py`, `app_registration.md` 경로 갱신 |
| `projects/eacct_mcp/setup.py` | `MCP_PLATFORM_DIR` `platform/plugins/` 반영 |
| `projects/eacct_mcp/CLAUDE.md` | `pip install` 경로 갱신 |
| `projects/eacct_mcp/docs/miso_api_spec.md` | `miso_integration_guide.md` 경로 갱신 |

**특이사항**
- `core/.venv` 잔존: gitignored, 하드코딩 경로로 이동 불가 → 필요 시 수동 재생성
- `eacct_mcp` 서브모듈 수정 → 별도 서브모듈 커밋 필요
- `git mv` 시 staged-deleted 파일(`202505_history.md`, `01_REQ_요구사항정의서.md`) 충돌 → `git rm --cached` 로 해결

---

## 2026-05-12

### 플랫폼 — 프로젝트 코드 형식 변경 + 산출물 ID prefix 통합

**결정 사항**
- **프로젝트 코드 형식 변경**: `P{YYYYMMDD}{NN}` (11자) → `P{YYMMDD}{N}` (8자)
  - 연도 앞 20 제거(6자리), 시퀀스 1자리 단축 → 8자 고정, `ID-namespace.md` 제한 내 맞춤
  - 예: `P2026050801` → `P2605081`
- **산출물 ID prefix = 프로젝트 코드 직접 사용** — 별도 prefix 테이블·매핑 관리 불필요
  - `P2605081-REQ-F01`, `P2605081-FLW-001` 형태로 일원화

**변경 파일 (일괄)**

| 파일 | 내용 |
|---|---|
| `core/init_project.py` | `_get_next_project_code` 함수 형식 변경 (YYYYMMDD+NN → YYMMDD+N) |
| `PROJECTS_GLOBAL.md` | 4개 프로젝트 코드 갱신 |
| `projects/*/CLAUDE.md` | 각 프로젝트 코드 2곳씩 갱신 (4개 파일) |
| `templates/deliverables/guides/ID-namespace.md` | 형식 정의·예시 전면 교체 |
| `templates/deliverables/CLAUDE.md` | PROJECT_CODE 확인 절차·예시 업데이트 |

**갱신된 프로젝트 코드**

| 프로젝트 | 구 코드 | 신 코드 |
|---|---|---|
| eacct_mcp | P2026050801 | P2605081 |
| gmail_cleaner | P2026050601 | P2605061 |
| wiki_mbo_builder | P2026042801 | P2604281 |
| wiki_faq_builder | P2026042201 | P2604221 |

---

### eacct_mcp — 산출물 작성 (REQ + FLW) + 웹뷰 적용

**산출물 작성**

| 문서 | doc-id | 주요 내용 |
|---|---|---|
| 요구사항정의서 | P2605081-REQ-2026 | BR 3건, FR 6건, NFR 4건, 제약 2건, 가정 2건 |
| 프로세스흐름도 | P2605081-FLW-2026 | FLW-001(AI 조회 흐름), FLW-002(자격증명 등록 흐름), 예외 3건 |

**웹뷰 적용**
- `projects/eacct_mcp/docs/index.md` 생성 → 사이드바 **산출물** 메뉴 신설
- `core/scripts/webview/serve.py` ROOT 버그 수정 (`.parent.parent` → `.parent.parent.parent.parent`)
- `generate_sidebar.py` 재실행 → `webview/_sidebar.md` 재생성
- 웹뷰 서버 http://localhost:3000/webview/ 정상 작동 확인

---

## 2026-05-11

### eacct_mcp — 플랫폼 자격증명 관리 체계 구축 + Aurora DB 연결 검증

**배경**
- T004-B(Aurora MySQL 연동)를 위해 DB 비밀번호 저장 방식 검토
- `.env` 평문 저장은 보안 리스크 → OS 키체인 기반 자격증명 관리 체계 도입

**결정 사항**
- **자격증명 저장:** OS 키체인(`keyring` 라이브러리) — Windows(Credential Manager) / macOS(Keychain) / Linux(Secret Service) 크로스플랫폼 지원
- **단방향 암호화 불가:** DB 접속 자격증명은 드라이버에 실제 값 전달 필요 → 양방향(DPAPI/AES) OS 키체인이 적합
- **플랫폼 venv 분리:** `core/.venv/` — 플랫폼 공용 도구 전용, 프로젝트 venv와 독립
- **자격증명 CLI:** `core/scripts/credentials/set_credential.ps1` (Windows) / `.sh` (Mac/Linux) — 위치 무관 실행은 향후 PATH 등록으로 해결

**구축 내역**

| 파일 | 내용 |
|---|---|
| `core/.venv/` | 플랫폼 venv 생성, `keyring` 설치 |
| `core/scripts/credentials/set_credential.py` | 자격증명 등록·조회·삭제 CLI (keyring 기반) |
| `core/scripts/credentials/set_credential.ps1` | Windows 래퍼 |
| `core/scripts/credentials/set_credential.sh` | Mac/Linux 래퍼 |
| `core/setup/secrets_guide.md` | 자격증명 관리 표준 가이드 (신규) |

**자격증명 등록 절차 (최초 1회)**
1. PowerShell 실행 정책 설정 (최초 1회):
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
2. 자격증명 등록:
   ```powershell
   # 프로젝트 루트에서
   core\scripts\credentials\set_credential.ps1 set [프로젝트명] [키명]
   # 예: core\scripts\credentials\set_credential.ps1 set eacct_mcp db_password

   # 하위 폴더에서 (상대 경로 조정)
   ..\..\core\scripts\credentials\set_credential.ps1 set [프로젝트명] [키명]
   ```
3. 프롬프트(`eacct_mcp > db_password 값:`)에 비밀번호 입력 후 Enter

**프로젝트 코드에서 자격증명 사용 패턴**
```python
import keyring

password = keyring.get_password("프로젝트명", "키명")
if password is None:
    raise RuntimeError(
        "자격증명 미등록.\n"
        "  core\\scripts\\credentials\\set_credential.ps1 set [프로젝트명] [키명]   (Windows)\n"
        "  core/scripts/credentials/set_credential.sh  set [프로젝트명] [키명]   (Mac/Linux)"
    )
```

**eacct_mcp DB 연결 검증 결과**
- `source/db.py` keyring 연동 완료 (`_KEYRING_SERVICE="eacct_mcp"`, `_KEYRING_KEY="db_password"`)
- DBSafer Agent 실행 상태에서 Aurora MySQL(QA) 연결 성공
- 연결 엔드포인트: `qgseacc.eacct.gsretail.com:3306 / qgseacc`
- 인증: DBSafer 투명 프록시 + `i_jaceybaek` 개인 계정

**주요 트러블슈팅**

| 증상 | 원인 | 해결 |
|---|---|---|
| `server.py` `.env` 로드 실패 | `load_dotenv` 경로 `.parent.parent.parent` (1단계 초과) | `.parent.parent`로 수정 |
| keyring 조회 실패 | `db.py`가 DB 계정명으로 조회, `set_credential.py`는 키명으로 저장 — 불일치 | `db.py`에 `_KEYRING_KEY="db_password"` 고정 |
| PS1 실행 차단 | PowerShell 실행 정책 기본값 Restricted | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| 하위 폴더에서 PS1 경로 오류 | 상대 경로가 현재 위치 기준 | 위치에 따라 `..\..\` 조정 필요 (향후 PATH 등록으로 해결 예정) |

---

## 2026-05-01

### platform → plugins 구조 전환 및 atlassian_pipeline → atlassian_client 명칭 변경

**배경**
- `platform/`이라는 폴더명은 "기반 시스템" 의미를 내포하나, 실제 성격은 외부 서비스 연동 클라이언트 패키지
- `atlassian_pipeline`은 "데이터 처리 흐름" 의미의 naming이나 실제로는 Atlassian 서비스 연동 클라이언트
- 향후 프로젝트 수 대폭 증가 예정 + 각 프로젝트가 독립 repo 구조 → plugin 성격이 명확

**결정 사항**
- 폴더: `platform/` → `plugins/` (플러그인 성격 명확화)
- 패키지명: `atlassian_pipeline` → `atlassian_client` (클라이언트 명칭 통일)
- 환경변수: `PLATFORM_PATH` → `PLUGINS_PATH`
- `miso_client`는 이름 유지, `plugins/`로 경로만 이동

**변경 파일 목록**
- `plugins/atlassian_client/` (구: `platform/atlassian_pipeline/`) — git mv, 히스토리 보존
- `plugins/atlassian_client/atlassian_client/` (구: `atlassian_pipeline/`) — 내부 패키지 폴더
- `plugins/atlassian_client/pyproject.toml` — name·description·include 수정
- `plugins/miso_client/pyproject.toml` — description 수정 ("플랫폼" → "플러그인")
- `plugins/atlassian_client/atlassian_client/*.py` — 9개 파일 docstring·import 수정
- `plugins/atlassian_client/tests/*.py` — 6개 테스트 파일 import 수정
- `plugins/atlassian_client/atlassian_client_guide.md` — 전체 참조 치환
- `projects/test/source/` — 2개 파일 수정
- `projects/wiki_faq_builder/source/` — 5개 파일 수정
- `projects/wiki_faq_builder/CLAUDE.md` — 설치 안내 수정
- `projects/wiki_faq_builder/.github/workflows/ci.yml` — sparse-checkout·설치 경로 수정
- `projects/wiki_mbo_builder/source/` — 5개 파일 수정
- `projects/wiki_mbo_builder/CLAUDE.md` — 설치 안내 수정
- `projects/wiki_mbo_builder/refs/mbo_evaluation_guide.md` — 참조 수정
- `CLAUDE.md` (project-hub 루트) — platform → plugins, PLATFORM_PATH → PLUGINS_PATH

**venv 재설치**
- `wiki_faq_builder/.venv`, `wiki_mbo_builder/.venv` 각각:
  - `atlassian-pipeline` uninstall → `atlassian-client` editable 설치
  - PyPI `miso-client` 충돌 감지 → 로컬 `miso_client` editable로 덮어쓰기
  - 최종 검증: `from atlassian_client import ConfluenceAnalyzerBase` / `from miso_client import MisoClient` 정상 확인

**아키텍처 논의 결론**
- 현재 구조는 기술적으로 library 의존성이나, "붙여 쓰는 확장 모듈" 의도로 `plugins/` 명칭 사용
- 각 프로젝트가 독립 repo이므로 향후 `entry_points` 방식 전환이 사실상 필요
- 단계적 계획: ① plugins/ 완료(오늘) → ② core/ 인터페이스 정의(3~4번째 프로젝트 시점) → ③ entry_points 전환(5개 이상 시점)

**메모리 업데이트**
- `project_atlassian_pipeline.md` → `project_atlassian_client.md` 신규 작성
- `MEMORY.md` 인덱스 갱신

---

## 2026-05-06

### 3개 프로젝트 표준 구조 리팩토링 + CI 구성 완료

**작업 범위:** google_drive_backup, wiki_faq_builder, wiki_mbo_builder

**1. 표준 폴더 구조 적용**
- `src/` → `source/src/`, `tests/` → `source/tests/` 이동
- pyproject.toml: `where = ["source/src"]`, `testpaths = ["source/tests"]` 업데이트
- `_manage/`, `docs/`, `refs/`, `archive/` 표준 디렉토리 구성

**2. MD 파일 내용 보완 (D:\05.Claude 참고)**
- 3개 프로젝트 CLAUDE.md: Python 3.12, atlassian_client/miso_client(PLUGINS_PATH), Git Flow, 커밋 컨벤션, 실행 방법, 환경변수 표 추가
- _manage/changelog.md: 이관 이력 추가
- wiki_mbo_builder: `refs/mbo_evaluation_guide.md` 이관 (Jira CSR 분석 기준·완료율 산식 포함)

**3. GitHub Actions CI 구성**
- google_drive_backup: flake8, black, pytest (플러그인 없음)
- wiki_faq_builder, wiki_mbo_builder: + gsr-ax/project-hub sparse checkout → atlassian_client/miso_client 설치
  - `PROJECT_HUB_TOKEN` Secret: JaceyBaek-GSRetail PAT(repo scope) → JaceyBaek 계정 두 repo에 등록
  - flake8 `--extend-ignore=E203,W503` (black 포맷 충돌 해결)
  - **3개 CI 모두 통과 확인**

**4. 인증 이슈 해결**
- gh auth `workflow` scope 추가: `JaceyBaek` 계정으로 브라우저 인증 (JaceyBaek-GSRetail 혼용 주의)
- GitHub 계정 구분: project-hub = `JaceyBaek-GSRetail` / 개별 프로젝트 repo = `JaceyBaek`

**5. 서브모듈 포인터 최신화**
- project-hub: 3개 서브모듈 포인터 모두 최신 커밋으로 업데이트 후 push

**트리거 추가**
- `TRIGGERS.md`: "compact" / "컴팩트" 트리거 등록 → 메모리·히스토리 완료 후 `/compact` 안내

---

### 연결 정보 중앙화 + 05.Claude 참조 제거 (2차 세션)

**1. 연결 정보 중앙화**
- 공통 연결 정보 4개를 시스템 환경변수(Machine)로 1회 등록:
  - `CONFLUENCE_URL`, `CONFLUENCE_API_TOKEN`, `MISO_API_URL`, `MISO_API_KEY`
  - 기존 값: `D:\05.Claude\projects\source\wiki_faq_builder\.env`에서 이관
- `wiki_faq_builder`, `wiki_mbo_builder` `.env.example` 재구성
  - 공통 항목 → 주석 처리 + 시스템 환경변수 관리 안내
  - 프로젝트 고유 설정만 `.env`에 저장하는 구조로 전환
- `CLAUDE.md` 연결 설정 흐름 섹션 업데이트
  - 구조 원칙 표 추가 (공통/고유 분리 기준 명시)
  - 최초 설정 안내 및 `setx /M` 등록 방식 문서화

**2. 05.Claude 참조 제거 (진행 중)**
- `google_drive_backup/source/src/wiki_publisher.py` 2곳 수정
  - 예제 로그 텍스트: `D:\05.Claude` → `D:\03.project-hub`
  - 환경변수 설명: 기본 경로 `D:\05.Claude` → `D:\03.project-hub`
- 05.Claude 전체 현황 스캔 및 이관 대상 분류 완료
  - **남은 이관 대상:** `daily_briefing` 프로젝트, `projects/source/shared`
  - **삭제 검토 대상:** `templates/`(Office 파일), `scripts/`(fill_*.py 등) — 다음 세션에서 결정

**3. 검토 항목 (결정 보류)**
- commit 보호: Credential Manager 제거(매번 PAT 입력) vs SSH key + passphrase — Jacey 결정 대기

---

## 2026-05-07

### 05.Claude 완전 분리 및 daily_briefing 이관 완료

**1. 05.Claude 잔여 파일 정리**
- `D:\05.Claude\templates\` 삭제 — HTML 방식으로 전환 예정, 재작성 예정
- `D:\05.Claude\scripts\` 삭제 — xlsx/docx 생성 스크립트 (구 방식, templates 삭제로 사용처 없음)
- `D:\05.Claude\projects\source\shared\` 삭제 — `atlassian_client`, `miso_client`로 완전 대체 확인

**2. daily_briefing 이관 완료 (G-001)**
- 표준 폴더 구조 적용 (`source/src/`, `source/tests/`, `_manage/`, `docs/`, `refs/`, `archive/`)
- GitHub 독립 repo 생성: `JaceyBaek/daily_briefing` (Private)
- 브랜치: `main`, `develop`
- `pyproject.toml` 신규 생성 (requirements.txt 대체)
- `.gitmodules` submodule 등록 → `gsr-ax/project-hub` push 완료
- G-001 완료 처리 (2026-05-07)

**3. 글로벌 히스토리 보완**
- `history/202604_history.md`: `hello_aida 테스트 프로젝트` 항목 추가 (누락분 보완)

**4. 05.Claude 최종 삭제 (G-006)**
- `google_drive_backup/secrets/` (credentials.json, token.json) → `03.project-hub`로 이관 후 삭제
- `D:\05.Claude` 전체 삭제 완료
- G-006 완료 처리 (2026-05-07)

---

## 2026-05-07 (3차 세션)

### MCP 등록 절차 추가 및 비서 통합 논의

**1. CLAUDE.md — MCP 등록 절차 섹션 신규 추가**
- `진행중 → 운영중` 전환 시 MCP 등록 여부 확인 단계 추가
- `## MCP 등록 절차` 섹션: 정보 수집(서버명·전송방식·실행 명령·환경변수·노출 tool) → `claude mcp add` 실행 → 프로젝트 CLAUDE.md 기록

**2. TRIGGERS.md — MCP 관련 트리거 3개 추가**
- `"MCP 등록"` — 등록 절차 전체 실행
- `"MCP 목록"` — `claude mcp list` 실행
- `"MCP 삭제"` — 등록 제거

**3. 프로젝트별 관리 문서 일괄 업데이트 (아이다)**
- google_drive_backup, wiki_faq_builder, wiki_mbo_builder: `_manage/history/202605_history.md` 신규 생성
- 3개 프로젝트 `_manage/changelog.md`: 2026-05 변경 이력 추가
- google_drive_backup `_manage/todo.md`: T-001 token.json 재인증 항목 추가

**4. 비서 통합 논의 (결정: 진행 후 착수)**
- 현행 두 비서(세라/아이다) 구조 장단점 분석
- **결정:** 단일 비서로 통합 (제안 1+2: CLAUDE.md 절대 규칙 유지 + init_project.py 대화형 가드 추가)
- 착수 조건: 전체 작업 정리 완료 후 진행

---

### 비서명 변수화 전체 완료 + 변수 사용 원칙 추가 (2차 세션)

**배경**
- project-hub 플랫폼은 fork 사용자도 동일하게 사용 가능해야 함
- 관리 파일에 `세라`, `아이다` 등 특정 이름이 하드코딩되어 있으면 다른 비서명 사용 시 충돌 발생

**변경 파일 (세라 담당 — 전역 레이어)**
- `README.md`: 2번째 발생 `세라(Sera) AI 비서 설정` → `{hub_assistant} AI 비서 설정`
- `TRIGGERS.md`: "메모리 저장" 트리거 `세라 실행 불가` → `{hub_assistant} 실행 불가`
- `TODO_GLOBAL.md`: G-016 `아이다 CLAUDE.md 정리` → `{project_assistant} CLAUDE.md 정리`
- `ENHANCEMENTS.md`: 6곳 (관리자 표기, 비고 헤더×4, E-001·E-006·E-010·E-011 본문)
- `guides/SETUP.md`: 16곳 (협업 방식, 역할 표, 디렉토리 구조 주석, CLAUDE.md 역할 표, 세션 프로토콜, 히스토리·To-Do·이슈 관리 표 등)
- `templates/deliverables/DEPLOYMENT.md`: AI 운영 담당란 `아이다 (프로젝트 AI)` → `{project_assistant}`
- `CLAUDE.md`: 최상단 변수 선언 블록에 **변수 사용 원칙** 추가

**변경 파일 (아이다 담당 — 프로젝트 레이어)**
- `projects/wiki_mbo_builder/refs/mbo_evaluation_guide.md`: 3곳 (`아이다에게 작업 지시` 섹션 제목 및 본문)
- `projects/google_drive_backup/source/src/wiki_publisher.py`: 2곳 (HTML 문서 내 아이다 언급)

**유지 항목 (의도적 예외)**
- `hub_init.py`, `init_project.py`: 코드 fallback 기본값 (`"세라"`, `"아이다"`)
- `guides/SETUP.md` 226-227행: 코드블록 예시 (hub_init.py 입력 화면)
- `templates/SETUP.template.md`: 기본값 예시 행
- `history/` 파일들: 과거 기록 (수정 불가)

**변수 사용 원칙 (CLAUDE.md 추가)**
- 관리 파일 작성·수정 시 비서명은 반드시 `{hub_assistant}` / `{project_assistant}` / `{user_name}` 변수로 표기
- 히스토리 파일(`history/`, `_manage/history/`)과 코드 기본값은 변수화 제외

---

### gmail_cleaner Python 전환 + Claude Desktop MCP 통합 (3차 세션)

**세션 범위**
- 아이다 담당: gmail_cleaner 프로젝트 내부 (Python 전환·MCP 서버 구현)
- 세라 담당: Claude Desktop 설정·중앙 MCP 서버 갱신·플랫폼 표준 정렬

**세라 (플랫폼 레이어) 변경**

1. **mcp_server/server.py** 주석 갱신
   - 기존 "gmail_cleaner: Apps Script 기반 직접 실행 불가 (제외)" 문구 제거
   - 변경: "자체 MCP 서버를 가진 프로젝트는 별도 MCP 서버로 등록되므로 여기서 제외"
   - PROJECT_RUN_CONFIG에는 추가하지 않음 — gmail_cleaner는 자체 server.py로 11개 tool 노출

2. **Claude Desktop 설정 갱신**
   - 위치: `C:\Users\Administrator\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
   - 기존 `project-hub` 항목 유지 + `gmail-cleaner` 별도 등록
   - 패턴 확정: A안 (프로젝트별 독립 MCP 서버) — 의존성 격리 + 프로젝트 독립성 우선
   - 잘못 생성한 `~/.claude/mcp.json` 삭제 (Claude Code 기준 위치, Desktop과 무관)

3. **A안 패턴 결정 사항** (앞으로 표준)
   - 단순 1회 실행만 필요한 프로젝트 → 중앙 `mcp_server/server.py`의 PROJECT_RUN_CONFIG에 등록 (기존 wiki/drive)
   - 프로젝트 고유 tool이 필요한 프로젝트 → 자체 `source/src/server.py` 작성 후 Claude Desktop에 별도 등록 (gmail_cleaner)

**아이다 (프로젝트 레이어) 변경 — gmail_cleaner**
- GAS → Python 전면 리팩토링 완료, 자세한 내용은 `projects/gmail_cleaner/_manage/history/202605_history.md` 참조
- MCP 서버 11개 tool: 브라우징·삭제 6개 + 설정 수정 5개
- 71 passed (test_cleaner 22 + test_config 26 + test_server 23)
- 별도 GCP 프로젝트 + OAuth 인증 완료

**Jacey 직접 진행**
- Google Cloud Project 생성·Gmail API 활성화·OAuth 동의화면 + 테스트 사용자 등록
- credentials.json 다운로드 후 `secrets/credentials.json` 배치
- 최초 브라우저 인증으로 token.json 생성

**남은 작업 (3차 세션 당시)**
- ~~gmail_cleaner GitHub repo 생성 (JaceyBaek/gmail_cleaner) → submodule 등록~~ → 완료
- mcp_server/setup.py 자동 탐색 개선 (프로젝트별 server.py 자동 등록)
- guides/mcp_server_setup.md A안 패턴 문서화
- wiki_faq_builder, wiki_mbo_builder 자체 MCP 서버 추가 검토 (현재는 run_project로만 가능)

---

## 2026-05-07 (4차 세션)

### 4-1. 세션 종료 처리 — 플랫폼 기록 및 푸시

**세라 (플랫폼 레이어)**

1. **gmail_cleaner submodule 포인터 최신화**
   - 3차 세션에서 등록된 submodule 포인터를 최신 커밋으로 업데이트
   - `.gitmodules`에 이미 등록 완료: `https://github.com/JaceyBaek/gmail_cleaner.git`

2. **project-hub 커밋·푸시** (`gsr-ax/project-hub` — JaceyBaek-GSRetail 계정)

3. **Google Drive 백업 실행**

4. **사이드바 누락 항목 보완** — `generate_sidebar.py` 재실행으로 google_drive_backup Todo, 5월 히스토리 3건 반영

---

### 4-2. 비서 통합 — 세라·아이다 → 아이다 단일 비서

**배경**
- 두 비서(세라 플랫폼 / 아이다 프로젝트) 분리 운영의 효용성 재검토
- 실제 작업 시간의 80%가 프로젝트 내부 작업, 플랫폼 작업은 가끔 발생
- 역할 전환 선언 절차가 흐름을 끊는 부작용
- fork 사용자도 동일 구조 유지가 부담일 수 있다는 판단

**결정 사항**
- 단일 통합 비서: **아이다 (Aida)**
- 의미 변경: "돕는 자" → **"이익을 주는 자, 보상하는 자" (아랍어 어원)**
  - 기존 "돕는 자"는 어원적으로 직접 일치하지 않음을 확인 후 어원에 맞게 정정
- 통합 방식: **제안 1+2** (CLAUDE.md 절대 규칙 유지 + `init_project.py` 대화형 가드 추가)

**부수 결정: 프로젝트 유형 단일화**
- 기존 `general`(일반/문서) + `dev`(개발) 2종 → **`dev` 단일**로 통일
- 사유: 현재 5개 프로젝트 모두 `dev` 유형. 일반(문서) 작업은 Confluence가 자연스러운 위치
- 영향: `init_project.py --type` 인자 제거, 폴더명 자동 부여(`YYYYMM_폴더명`) 로직 제거

**플랫폼 레이어 변경**

1. **`config/personal.yml` 구조 단순화**
   - `hub_assistant` + `project_assistant` → `assistant` 단일 키
   - 의미: "이익을 주는 자, 보상하는 자 (아랍어)"

2. **루트 `CLAUDE.md` 재작성**
   - "역할 전환 규칙" 섹션 전체 제거
   - "AI 비서" 섹션을 단일 비서로 단순화
   - "작업 영역" 섹션 추가 — 경로 기반 적용 규칙 (전환 선언 불필요)
   - "새 프로젝트 시작 규칙": 유형 질문 제거, 이름·설명 2단계로 단순화

3. **변수 일괄 치환** — 6개 플랫폼 파일
   - `{hub_assistant}` / `{project_assistant}` → `{assistant}`
   - 대상: `TRIGGERS.md`, `ENHANCEMENTS.md`, `TODO_GLOBAL.md`, `README.md`, `templates/deliverables/DEPLOYMENT.md`, `guides/SETUP.md`
   - 두 비서 표/문장은 단일 비서 형태로 정리

4. **템플릿 정리**
   - `templates/CLAUDE_global.template.md`: 단일 비서 구조로 재작성, 플레이스홀더 `{{ASSISTANT_KR}}` 단일화
   - `templates/SETUP.template.md`: SETUP.md와 동일한 단일 비서 구조 반영

5. **코드 수정**
   - `hub_init.py`: 입력 단계 4개→3개(사용자 → 비서 → GitHub), `{{HUB_ASSISTANT_*}}`/`{{PROJ_ASSISTANT_*}}` → `{{ASSISTANT_*}}`
   - `init_project.py`: `--type` 인자 제거, `_compute_project_folder` 함수 제거, `_sync_project_assistant_in_file` 함수 제거, 인터랙티브 가드(`_interactive_collect`) 추가, 단일 `assistant` 키 처리

**서브모듈 변경**

| 서브모듈 | 변경 내용 |
|---|---|
| `google_drive_backup` | `source/src/wiki_publisher.py` 정적 HTML 매뉴얼 내 `{project_assistant}` 2곳 → `아이다`. 커밋·푸시(JaceyBaek 계정) |
| `wiki_mbo_builder` | `refs/mbo_evaluation_guide.md` 정적 가이드 텍스트 내 `{project_assistant}` 4곳 → `아이다`. 커밋·푸시(JaceyBaek 계정) |
| `daily_briefing`, `gmail_cleaner`, `wiki_faq_builder` | 변수 사용 없음 — 변경 없음 |

**히스토리/changelog 보존**
- `history/`, `_manage/history/`, `_manage/changelog.md` 내 `{project_assistant}` 변수 표기는 **그대로 유지**
- 사유: 과거 기록은 작성 시점의 표기를 보존하는 원칙 (CLAUDE.md 변수 사용 원칙)

**버전 영향**
- MAJOR 버전 변경 (플랫폼 핵심 규칙 변경) → `v1.0.0` 태그
- 통합 비서로 첫 안정화 시점 = `v1.0.0` 적용

**남은 작업 (4-2 완료 후)**
- project-hub 전체 커밋·푸시 (`gsr-ax/project-hub`)
- 서브모듈 포인터 최신화 (google_drive_backup, wiki_mbo_builder)
- `git tag v1.0.0` 후 push
- Google Drive 백업
- TODO_GLOBAL.md G-016 항목 재검토 (통합으로 자연스럽게 해결)

---

## 2026-05-07 (5차 세션)

### 5-1. 비서통합 잔여 정리 (G-018)

**배경**
- v1.0.0 비서통합 후 일부 파일에 옛 구조·표기 잔존 발견
- 정식 검증 후 최우선 작업으로 등록 (다른 작업 일체 보류)

**잔재 검출 결과**
- 변수(`hub_assistant`/`project_assistant`/`HUB_ASSISTANT`/`PROJ_ASSISTANT`): `config/personal.yml.bak`, `config/personal.yml.example`
- 표기(`세라`/`Sera`): `templates/SETUP.template.md`, `guides/SETUP.md`
- 보존 대상(작성 시점 보존 원칙으로 변경 안 함): `CHANGELOG.md`, `history/`, `_manage/history/`, `_manage/changelog.md`

**처리 내역**
1. `config/personal.yml.bak` 삭제 (v0.x 옛 구조 백업본)
2. `config/personal.yml.example` 단일 `assistant:` 구조로 갱신 + `github:` 블록 추가
3. `templates/SETUP.template.md` hub_init 입력 표 — 6행(플랫폼·프로젝트 비서 각 3행) → 4행(통합 비서 3행 + GitHub 1행)으로 축약, 기본값 "이익을 주는 자, 보상하는 자 (아랍어)"로 정정
4. `guides/SETUP.md` 동일 표 + 5-2 전역 CLAUDE.md 역할 예시 단일 비서로 정리

**검증**
- 변수 잔재: 보존 대상(history/changelog) 외 0건
- 표기 잔재: 보존 대상 외 0건 (TODO_GLOBAL.md G-018 항목 설명 텍스트는 작업명 자체이므로 정상)

---

## 2026-05-08

### 비서 통합 사후 검증

**검증 대상:** personal.yml, ~/.claude/CLAUDE.md, d:/03.project-hub/CLAUDE.md, TRIGGERS.md, init_project.py, hub_init.py, PROJECTS_GLOBAL.md, guides/SETUP.md, templates/SETUP.template.md, 프로젝트별 CLAUDE.md 전체

**결과:** 보존 대상(history/, CHANGELOG.md) 외 세라(Sera) 잔존 0건 — 전항목 이상 없음

---

### G-016: ~/.claude/CLAUDE.md 정리 완료

**배경**
- 비서 통합(v1.0.0) 이후 전역 CLAUDE.md에 구버전 세라/아이다 역할 분리 표기 및 중복 내용 잔존 확인

**처리 내역**
1. `## 역할` 수정 — 세라(Sera) 언급 제거, 아이다 통합 비서 단일로 재작성, 이름 의미 정정 ("돕는 자" → "이익을 주는 자, 보상하는 자")
2. `## 사용자 프로필` 제거 — 플랫폼 전역 설정에 개인 프로필 불필요 (Jacey 판단)
3. `## Claude 역할` 제거 — project-hub CLAUDE.md 중복
4. `## 개발 환경` 제거 — project-hub CLAUDE.md 중복
5. `## 프로젝트 내부 규칙` 제거 — project-hub CLAUDE.md에 더 상세한 버전 존재 (이행 단계 표 내 세라 하드코딩 포함)
6. `## 응답 규칙` 제거 — project-hub CLAUDE.md 12개 항목 버전 중복

**결과:** 145줄 → 9줄 (역할·호칭 2개 섹션만 유지)
**변경 파일:** `~/.claude/CLAUDE.md`, `TODO_GLOBAL.md` (G-016 완료 처리)

---

### TRIGGERS.md 수정 — compact/clear 트리거 기록 최우선 정비

**변경 내용**
- `compact` 트리거: 히스토리·memory 기록을 ①번 최우선으로 재정렬, GitHub·Google Drive 백업 미실행(수동) 명시
- `clear` 트리거: 신규 등록 — compact와 동일한 기록 우선 절차, `/clear` 입력 안내 추가

---

### 프로젝트 생성 흐름 테스트 + `init_project.py` --delete 옵션 추가

**테스트 목적**
- 비서 통합 완료 후 프로젝트 생성 전체 흐름 검증
- personal.yml 없는 조건, github 정보 없는 조건 각각 시나리오 테스트

**테스트 결과**
1. **personal.yml 없는 조건** — "안녕하세요!" 폴백 정상, 사전 설정(사용자명·비서명) 수집 → personal.yml 저장 확인
2. **github 정보 없는 조건** — 프로젝트 생성 후 GitHub 자동화 스킵 + 경고 출력 확인. 이후 github 정보 수집 → personal.yml 저장 → git init·커밋·푸시 순차 진행 확인

**`init_project.py` --delete 옵션 추가**
- 배경: 프로젝트 삭제 시 `webview/_sidebar.md` 잔존 항목을 수동으로 제거해야 하는 번거로움 발견
- 추가 함수: `unregister_from_sidebar()`, `unregister_from_projects_global()`
- 추가 옵션: `--delete` / `-d` — sidebar + PROJECTS_GLOBAL.md + 로컬 폴더 일괄 삭제
- Windows `.git` 읽기 전용 파일 삭제 시 PermissionError → `onerror` 핸들러(`stat.S_IWRITE` + chmod) 추가
- GitHub 저장소는 `gh repo delete`로 별도 처리 (안내 메시지 포함)

**사용법**
```bash
python init_project.py --delete {프로젝트명} --yes
```

---

### settings.json 정리 + 컨텍스트 상태 표시줄 설정

**1. 컨텍스트 사용량 상태 표시줄 설정**
- `C:\Users\Administrator\.claude\statusline.py` 신규 생성
  - 모델명 + 진행 바(▓░) + 컨텍스트 % 출력
  - JSON stdin 파싱 (Python 기본 라이브러리만 사용)
- `settings.json`에 `statusLine` 항목 추가
  - `type: command`, `python C:\...\statusline.py` 실행
  - 어시스턴트 응답마다 터미널 하단 자동 갱신

**2. settings.json allow 목록 대규모 정리 (350개 → 58개)**

| 제거 유형 | 내용 |
|---|---|
| 구 경로 | `D:\05.Claude` 참조 항목 전체 (이전 완료) |
| PowerShell 중복 | 개별 `PowerShell(...)` 항목 전체 — 상단 `"PowerShell"` 와일드카드로 커버 |
| Read 중복 | `Read(//d/05.Claude/**)` 등 — `Read(//d/**)` 커버 |
| 일회성 완료 | 디렉토리 삭제, 마이그레이션, 특정 PR/Run ID, 환경변수 setx, PID 지정 등 |
| 보안 위험 | gh auth login 토큰 하드코딩 항목 |
| Bash+PS 혼용 | `Bash(Get-ChildItem ...)` 등 Bash 컨텍스트에서 동작 불가 항목 |

**3. additionalDirectories 정리 (11개 → 6개)**
- 제거: `D:\05.Claude` 관련 4개, `D:\03.Lab` (임시 마이그레이션 목적지)
- 유지: `C:\Users\Administrator\.claude`, `AppData\Local\Temp`, `D:\`, `AppData\Roaming`, `.vscode`, Claude Desktop 설정 경로

---

## 2026-05-08 (2차 세션)

### 폴더 구조 전체 검토 및 core/ 재편 (G-020)

**배경**
- project-hub 구조 전면 검토 — 관리성·확장성·일관성 기준 분석
- 즉시 정리 3건, 구조 재편 1건, 논의 항목 3건 도출

**즉시 정리**
1. 루트 `__pycache__/` 삭제 — core/ 스크립트 루트 실행 흔적
2. `plugins/atlassian_client/atlassian_pipeline.egg-info` 삭제 — 패키지명 변경 잔존물
3. `wiki_mbo_builder/scripts/` → `source/src/` 통합 — 표준 구조 위반, CLAUDE.md 실행 경로 업데이트, git commit
4. `wiki_faq_builder/.gitignore` `secrets/` 누락 추가, git commit

**core/ 구조 재편 (G-020 완료)**

| 이전 위치 | 이후 위치 | 비고 |
|---|---|---|
| `core/project_creation.md` 등 4개 | `core/project/` | 프로젝트 관리 지침 |
| `core/connection_setup.md` 등 2개 | `core/setup/` | 플랫폼 설정·연결 |
| `scripts/generate_sidebar.py` 등 3개 | `core/scripts/webview/` | 루트 `scripts/` 폴더 제거 |
| `guides/scripts/deploy_record.py` 등 2개 | `core/scripts/manage/` | `guides/scripts/` 폴더 제거 |

- `core/hub_init.py`, `core/init_project.py`, `core/TRIGGERS.md`, `core/ENHANCEMENTS.md` → 루트 유지
- `CLAUDE.md` 경로 참조 6건 업데이트 (`core/` → `core/project/`, `core/setup/`)
- `TRIGGERS.md` webview 스크립트 경로 수정 (`scripts/` → `core/scripts/webview/`)

**TRIGGERS.md — clear/compact 트리거 강화**
- "미기록 시 즉시" → **무조건 기록** (확인 단계 제거)
- 기록 범위 명시: 구조변경·파일이동·설정변경·기능추가 전부 포함
- 가이드·문서 경로 변경 시 현행화 단계 추가
- TODO 상태 최신화 단계 추가
- git 커밋·Google Drive 백업은 수동으로 명시

**TODO 변경**
- G-020 완료 (2026-05-08)
- G-021 신규 등록: mcp_server/ 위치·역할 재정의 (G-017 연계)
- G-022 신규 등록: docs/ 용도 명확화

---

## 2026-05-08 (3차 세션)

### PLUGINS_PATH 절대경로 하드코딩 제거

**배경**
- `PLUGINS_PATH=D:\03.project-hub\plugins` 형태로 절대경로가 여러 파일에 하드코딩되어 있어 clone 위치 변경 시 일괄 수동 수정 필요
- `config/personal.yml`(gitignored)에 경로를 한 곳에서 관리하는 구조로 개선

**변경 내용**

1. `core/hub_init.py` — 초기화 시 `paths.hub_root`, `paths.plugins` 자동 기록 로직 추가 (HUB_ROOT 기준 자동 감지)
2. `config/personal.yml.example` — `paths.hub_root`, `paths.plugins` 필드 추가
3. `config/personal.yml` — 현재 clone 위치 기반 `paths` 섹션 추가

**하드코딩 제거 파일 (8개)**
- `CLAUDE.md` — `PLUGINS_PATH=D:\...` → `config/personal.yml → paths.plugins` 참조
- `guides/architecture.md` — `.env` 예시 경로 제거
- `plugins/atlassian_client/atlassian_client_guide.md` — 위치 헤더·패키지구조 다이어그램·환경변수 표·`.env.example` 4곳 수정
- `projects/wiki_faq_builder/CLAUDE.md` — 설치 주석 수정
- `projects/wiki_mbo_builder/CLAUDE.md` — 설치 주석 수정

---

## 2026-05-08 (4차 세션)

### e-Acct MCP 서버 구축 — mcp_platform + eacct_mcp POC 완료

**배경**
- e-Acct 사내 시스템에 AI(Miso) 연동을 위한 MCP 서버 구축 필요성 검토
- Miso 도구 구조 파악 결과: 내부 코드 기반 HTTP API 호출 방식으로 동작
- Claude Desktop(MCP) → POC 검증 후 Miso(REST API) 확장 전략 확정

**생성 항목**
- `plugins/mcp_platform/` — Claude·Miso 이중 인터페이스 공통 MCP 서버 플랫폼 패키지 (신규)
- `projects/eacct_mcp/` — e-Acct 시스템 연동 MCP 서버 구현체 프로젝트 (P2605081, 신규)

**주요 작업**
- T001: mcp_platform 뼈대 구현 (base_server, base_tools, rest_bridge, middleware)
- T002: eacct_mcp 개발 환경 구성 (setup.py 1회 실행으로 venv·Claude Desktop 등록 자동화)
- T004: Mock tool 2개 구현 (get_invoice, recommend_account — 키워드 룰 기반)
- T005: Claude Desktop POC 성공 — INV-2026-002 조회·계정과목 추천 정상 동작 확인
- T006: Miso 개발팀 전달용 REST API 스펙 문서 작성
- 문서 분리: 공통(mcp_platform) / eacct 전용(eacct_mcp/docs) 구조로 체계화
- 웹뷰 반영: eacct_mcp 프로젝트 + Miso API 스펙 + MCP-Miso 연동 가이드 사이드바 등록

**버그 수정**
- `generate_sidebar.py` HUB_ROOT 경로 오류 수정 (scripts/ → core/scripts/webview/ 이동 후 parent 레벨 미반영)

**보류 항목**
- T003: e-Acct DB 서비스 계정 발급 + 방화벽 오픈 (내부 프로세스 진행 중)
- T004-B: Mock → DB 실데이터 전환 (T003 완료 후)
- T007: 사내 서버 배포 구성 (추후)

---

## 2026-05-08 (5차 세션)

### 5-1. daily_briefing 제거

**배경**
- 초기 MS Graph API 연동 중 중단된 프로젝트로, 잔존이 구조 혼선 유발
- daily_briefing을 앱 레이어 설계 트리거로 삼았던 G-017 조건도 해소 필요

**처리 내역**
- git submodule deinit + git rm + `.git/modules` 삭제
- `PROJECTS_GLOBAL.md`, `webview/_sidebar.md`, `TODO_GLOBAL.md`, `guides/mcp_server_setup.md`, `core/ENHANCEMENTS.md` 관련 언급 제거
- 메모리 파일 (`project_apps_layer.md`) daily_briefing 참조 정리
- GitHub 레포(`JaceyBaek/daily_briefing`)는 보존 — 재착수 시 submodule add로 복원 가능

---

### 5-2. 프로젝트 폴더 구조 점검 및 정리

**점검 결과 — 이슈 3건**

| 이슈 | 처리 내역 |
|---|---|
| `projects/logs/` 위치 오류 | `eacct_mcp/source/server.py` 로그 경로 수정 (`parent×3` → `parent×2`), `.gitignore`에 `projects/logs/`, `projects/*/logs/` 추가. 로그 파일 잠금으로 디렉토리 삭제는 서버 재시작 후 수동 처리 |
| `eacct_mcp` submodule 미등록 | GitHub 레포(`JaceyBaek/eacct_mcp`) 신규 생성, 초기 커밋, main 브랜치로 통일, submodule 등록 완료 |
| `mcp_platform` 미추적 | 이전 세션(ebc6aa5) 커밋에 포함된 것 확인 — 이슈 아님 |

**개별 프로젝트 내부 구조 점검 (4개)**
- gmail_cleaner, google_drive_backup, wiki_faq_builder, wiki_mbo_builder
- 구조 일관성 확인 — 리팩토링 필요 사항 없음

---

### 5-3. apps/ 레이어 도입 + google_drive_backup 첫 번째 앱 등록 (G-017)

**배경**
- 운영 안정화된 `google_drive_backup`을 팀 공용 앱으로 전환하는 것이 적합하다고 판단
- 동시에 절차 문서·자동화 스크립트를 함께 작성해 향후 등록을 재현 가능하게 구성

**레이어 구조 확정**

| 레이어 | 위치 | 성격 |
|---|---|---|
| 연결 도구 | `plugins/` | 외부 서비스 클라이언트 라이브러리 |
| 개인 프로젝트 | `projects/` | 개인 업무 자동화·분석·실험 |
| 팀 공용 앱 | `apps/` | 운영 안정화 후 공용 배포 단위 |

**처리 내역**
1. `apps/catalog.yml` 신설 — 앱 레지스트리 (name, repo, type, requires, run, setup_notes)
2. `google_drive_backup` submodule `projects/` → `apps/` 이동, venv 재생성 (`google-auth` 등 재설치)
3. `mcp_server/server.py` PROJECT_RUN_CONFIG 경로 `projects/` → `apps/` 수정
4. `generate_sidebar.py` — "앱" 섹션 추가 (`render_apps_section`), INIT_META_MAP 경로 수정, 사이드바 재빌드
5. `PROJECTS_GLOBAL.md` — google_drive_backup 행 제거 (catalog.yml로 이관)
6. `core/project/app_registration.md` — projects/ → apps/ 등록 절차 전체 문서화
7. `core/scripts/install_app.py` — 앱 설치·등록 자동화 CLI
   - `--list`: 설치 상태 포함 앱 목록
   - `{name}`: 신규 팀원용 설치 (submodule + venv + .env + Claude Desktop 등록)
   - `--register`: 기존 projects/ → apps/ 이동 자동화
8. G-017 완료 처리 (2026-05-08)

---

### 5-4. 규칙·트리거 보완

| 항목 | 내용 |
|---|---|
| `CLAUDE.md` 8-1 추가 | 절대경로 사용 금지 (`D:\`, `C:\Users\` 등) — 코드·문서·설정 어디에도 금지, 위반 시 즉시 수정 |
| `TRIGGERS.md` 추가 | "apps로 이동" / "앱으로 등록" 뉘앙스 → app_registration.md 절차대로 자동 진행 |

---

## 2026-05-11

### G-022·G-023 — docs/ 구조 명확화 및 README 갱신

**배경**
- 루트 `docs/`에 날짜 붙은 HTML 산출물 2개(`project_hub_UTC_20260427.html`, `project_hub_architecture_20260501.html`)가 쌓여 있었으나, 이후 구조 변경(G-017·G-019·G-020)으로 outdated 상태
- "웹뷰 문서"와 "플랫폼 산출물"이 같은 폴더에 섞이는 문제 인식 → 분리 기준 정의 필요
- README.md 폴더 구조 박스가 G-017 이후 변경된 항목 다수 미반영

**결정 (G-022 — A안 채택)**
- `docs/deliverables/` : 작업 중·유효한 플랫폼 산출물
- `docs/archive/` : 폐기·과거 스냅샷
- 웹뷰(`webview/`)와 산출물(`docs/`)은 별개 — 웹뷰는 외부 공개, 산출물은 로컬 전용

**처리 내역**

*G-022*
1. `docs/project_hub_UTC_20260427.html` 폐기 — G-019·G-020 이후 outdated
2. `docs/project_hub_architecture_20260501.html` 폐기 — G-017(apps 레이어) 미반영
3. `docs/deliverables/`·`docs/archive/` 신설 (`.gitkeep`)
4. `.gitignore` — `docs/` 전체 제외 → `docs/deliverables/*`·`docs/archive/*` 제외로 변경, `.gitkeep` 예외 추가
5. `core/project/deliverables_guide.md` — 산출물 위치 `docs/` → `docs/deliverables/`, 플랫폼 vs 프로젝트 위치 표 추가, archive 정책 명문화

*G-023*
6. `README.md` 폴더 구조 박스 — `plugins/`·`apps/`·`docs/`·`history/`·`mcp_server/`·`webview/` 추가, `core/` 하위 구조 반영, `guides/scripts/` 오기 제거
7. `README.md` 유틸리티 스크립트 섹션 — 경로 `guides/scripts/` → `core/scripts/manage/`, `install_app.py` 행 추가

---

## 2026-05-11 (2차 세션)

### MCP 로그 정리·모니터링 wiring·apps 정책 정립·"활성" 용어 통일

**처리 내역**

*로그 정리*
1. `projects/logs/eacct_mcp.log` 삭제 — 이전 세션 버그(log path 3단계 상위)가 남긴 잔존 파일
2. eacct_mcp 서버 프로세스(PID 32708·29056) 종료 후 재삭제 성공
3. `.gitignore` — `projects/logs/` 제거, `projects/*/logs/`·`apps/*/logs/` 추가 (프로젝트별 독립 관리 원칙 반영)

*MCP 모니터링 wiring*
4. `plugins/mcp_platform/mcp_platform/base_server.py` — `_wrapped_tools()` 메서드 추가
   - `log_tool_call(self._logger)` 데코레이터를 레지스트리 전체 tool에 적용한 사본 반환
   - `_build_mcp()` (stdio) 및 REST 모드 양쪽에서 wrapped tools 사용
   - 효과: mcp_platform 기반 모든 서버에서 도구 호출 시 `CALL/OK/ERROR` 자동 로깅

*apps/ 운영 정책 논의 결론*
5. **apps/ = 코드 공유, 운영 환경 공유 아님** — fork-clone으로 공유 실현, 각자 로컬에서 독립 실행
6. "운영"의 두 가지 의미 명확히 분리: 로컬 정기 자동화(개인 몫) vs 진짜 운영(사내 서버·별도 인프라)
7. 로컬 dev/prod 분리 불필요 결론 — 실패 감지는 G-015·G-008(모니터링+알림)으로 대응
8. `core/project/app_registration.md` — "apps/ 의 의미" 정책 섹션 신규 추가
9. `PROJECTS_GLOBAL.md` — "활성" 섹션 정의 주석 추가
10. `apps/README.md` — 신규 생성 (apps/ 목적·설치 명령·정책 요약)

*"운영중" → "활성" 용어 통일*
11. 13개 파일 일괄 교체: `PROJECTS_GLOBAL.md`, `CLAUDE.md`, `core/TRIGGERS.md`, `core/project/project_lifecycle.md`, `core/project/versioning.md`, `core/setup/mcp_registration.md`, `core/init_project.py`, `core/scripts/webview/sync_sidebar.py`, `mcp_server/server.py`, `guides/SETUP.md`, `templates/SETUP.template.md`, `apps/google_drive_backup/CLAUDE.md`, `projects/wiki_faq_builder/CLAUDE.md`
12. `history/` 파일은 과거 기록 보존 목적으로 유지

---

## 2026-05-11 (3차 세션)

### 플랫폼 카탈로그 정비 — 프로젝트/앱/플러그인 현황 체계화

**처리 내역**

*PROJECTS_GLOBAL.md 개선*
1. 각 섹션 테이블에 `상태` 컬럼(첫 번째 열) 추가 — 현황 표시 시 상태 명시 원칙 확립

*apps/catalog.yml 개선*
2. `version` 필드 추가 (`google_drive_backup: 0.1.0`)
3. 필드 설명에 버전 관리 방식 명시 — 스크립트 형태 앱은 catalog.yml에서 직접 관리

*plugins/catalog.yml 신규 생성*
4. `plugins/catalog.yml` 생성 — 3개 플러그인 등록
   - `atlassian_client 0.2.0` — Atlassian 제품군 연동 클라이언트
   - `mcp_platform 0.1.0` — MCP 서버 공통 뼈대 (Claude·Miso 이중 인터페이스)
   - `miso_client 0.1.0` — 사내 AI 미소 API 클라이언트
5. 플러그인 버전은 setup.cfg 와 catalog.yml 동기화 방식으로 관리
6. `dependents` 필드 — 각 플러그인을 사용하는 프로젝트 목록 추적

*피드백 메모리 업데이트*
7. 플랫폼 카탈로그 현행화 필수 규칙 기록 (플러그인·앱 변경 시 카탈로그 동시 업데이트)
8. 프로젝트 현황 표시 시 상태 컬럼 필수 규칙 기록

---

## 2026-05-11 (4차 세션)

### Claude Design → Claude Code 연동 + 산출물 템플릿 번들 동기화

**배경**
- Claude.ai에 추가된 Claude Design(Research Preview) 기능 확인
- "Handoff to Claude Code..." 공식 연동 기능 발견 — 핸드오프 URL 기반 gzip 번들 전달 방식

**산출물 템플릿 번들 동기화 (templates/deliverables/)**

| 항목 | 내용 |
|---|---|
| `index.html` | 번들 최신본으로 업데이트 |
| `docs/_archive/` | 신규 추가 — 와이어프레임·variation 아카이브 20개 파일 |
| `guides/01_REQ ~ 10_USM-authoring-guide.md` | 번호화 authoring guide 10종 신규 추가 |
| `README.md` | 신규 추가 (사용법·폴더 구조·산출물 종류 설명) |
| `CLAUDE.md` | 신규 추가 — AI 산출물 작성 세부 지침 (로컬 CLAUDE.md, 자동 로드) |

**가이드 파일 정리**
- `guides/REQ-authoring-guide.md` 삭제 (구버전)
- 참조 6곳 일괄 수정 → `guides/01_REQ-authoring-guide.md`
  - `templates/deliverables/CLAUDE.md`, `README.md`(2곳), `index.html`, `docs/01_REQ_요구사항정의서.html`, `core/project/deliverables_guide.md`

**deliverables_guide.md 사용 절차 일반화**
- REQ 고정값 → `{NN}_{ID}_{한글명}` 패턴으로 변경
- 모든 산출물 요청에 동일 절차 적용 가능하도록 일반화

**sync_design.ps1 스크립트 신규 작성 (core/scripts/)**
- Claude Design 핸드오프 URL → 자동 다운로드·압축해제·diff·복사
- 경로 매핑: `untitled/project/tools/` → `core/tools/rag/`, `untitled/project/` → `templates/deliverables/`
- 제외 목록: scraps/, uploads/, .gitignore, chats/, untitled/README.md
- 옵션: `-DryRun` (미적용 미리보기), `-Auto` (확인 없이 적용)
- 새 Design 프로젝트 추가 시 `$PathMappings` / `$Excludes` 섹션만 수정

---

## 2026-05-11 (5차 세션)

### 4개 서브모듈 미커밋 변경사항 커밋·push 완료

**처리 내역**

1. **서브모듈 git user 로컬 설정** — 서브모듈마다 user.name/email 설정이 없어 커밋 실패, 루트 repo 값(JaceyBaek-GSRetail / jacey.baek@gsretail.com) 기준으로 4개 서브모듈에 로컬 설정 추가

2. **커밋 내용 (4개)**

   | 서브모듈 | 커밋 메시지 |
   |---|---|
   | `apps/google_drive_backup` | 상태 표기 통일 — 운영중 → 활성 |
   | `projects/gmail_cleaner` | 프로젝트 코드(P2605061) 상태 헤더에 추가 |
   | `projects/wiki_faq_builder` | 상태 활성으로 통일·코드 추가·절대경로 제거 |
   | `projects/eacct_mcp` | T004-B Aurora MySQL 연동 준비 — pymysql·db.py 추가, .env.example 엔드포인트 명시 |

3. **push 트러블슈팅 — gmail_cleaner PAT workflow 스코프 부재**
   - `.github/workflows/ci.yml`이 포함된 커밋이 있어 PAT에 `workflow` 스코프 필요
   - GitHub Personal Access Token에 `workflow` 스코프 추가 후 재시도
   - Windows 자격 증명 캐시(이전 토큰)가 남아 있어 `git credential reject` 로 캐시 초기화 → push 성공

**push 결과:** 4개 서브모듈 모두 완료

---

## 2026-05-11 (6차 세션)

### 산출물 템플릿 정밀 검토 및 정비

**배경**
- 산출물 템플릿이 실제 작성 가능한 수준인지, 가이드 누락 여부 전수 확인

**검토 결과 — 발견 이슈 9건**

| 분류 | 항목 | 처리 |
|---|---|---|
| A-3 | synonyms-global.json 미구현 | rag-policy.md 명시 후 구현 완료 |
| B-4 | tools/ 경로 불일치 (README vs 실제) | README.md 수정 |
| B-5 | 01_REQ-authoring-guide.md 구형 파일명 규칙 | 현행 규칙으로 수정 |
| B-6 | deliverables_guide.md 단계별 폴더 오기 | flat 구조로 수정 |
| C-7 | RAG-conversion-guide.md 주석 마커 규칙 충돌 | data-ai-skip 단일 방식으로 수정 |
| C-8 | .md 출력 경로 docs/ → dist/md/ | build-rag.mjs 수정, 기존 .md 파일 삭제 |
| C-9 | 검증 규칙 가이드 미비 | validation-rules.md 신규 작성 (35개 규칙) |
| 2 | DEPLOYMENT.md 파일명 형식 구형 | §1·§6 현행 규칙으로 수정 |
| 7 | README.md §2 원본 수정 오해 소지 | 복사본 기준 치환임을 명확히 |

**신규 파일**
- `templates/deliverables/guides/validation-rules.md` — doc-validator.js 35개 규칙 문서화
- `templates/deliverables/guides/synonyms-global.json` — 도메인 공통 동의어 사전 (19개 용어)
- `templates/deliverables/TODO.md` — 산출물 템플릿 잔여 작업 목록

**build-rag.mjs 기능 추가**
- `--docs <path>` 옵션 — 실행 위치 독립적으로 docs 폴더 지정
- `--synonyms <path>` 옵션 — 전역 synonyms 파일 지정
- synonyms 로드·병합 로직 — 전역 사전 + 문서별 `doc-synonyms` meta 병합 → 각 청크 `synonyms` 필드 삽입
- .md 출력 경로 변경 — HTML 옆 → `dist/md/`

**TODO 잔여 (templates/deliverables/TODO.md)**
- 11_CFG-authoring-guide.md 작성 (CFG 첫 작성 시)
- 00_TRC 가이드 필요 여부 결정
