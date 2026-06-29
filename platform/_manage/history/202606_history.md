<!--
sidebar_title: 2026년 6월
sidebar_order: 1
-->

# 2026년 06월 작업 히스토리

---

## 2026-06-29 — eacct_chatbot 미카 체험 개선 6종 + 버그 수정 4건 (11:05)

- 폰트 5단계 확장(13-18px) + greeting·제안 문구 폰트 연동 / 답변 복사 버튼 / 로딩 문구 priority map 전면 재작성 / greeting 랜덤 다양화(32개) / /설정 UX 개선(설명·사용법·레이블)
- 버그 4건: 빠른 클릭 멈춤·greeting 폰트 미적용·리사이즈 후 스크롤 먹통·게임 버튼 레이블 원복
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md`

---

## 2026-06-29 — eacct-client-side-adapter-g1 D04 승인 + DEV 착수 준비 (11:02)

- `eacct_chatbot` collab `20260626-1710_eacct-client-side-adapter-g1` D04 `g1-client-verification-and-rollout` Jacey 최종 승인 완료 (10:03)
  - D01~D04 전건 합의·동의·승인 완료 → DEV_D01/DEV_D02 착수 가능, DEV_D03은 DEV_D02 종료 승인 후, DEV_D04는 D01~D03 증적 소비 조건 포함
- origin profile 관리 방식 결정: `properties/chatbot_{dev|stage|prod}.properties` — 기존 `sap_` 패턴과 동일
  - `chatbot_dev.properties` / `chatbot_stage.properties` / `chatbot_prod.properties` 생성 완료 (D:/eAcct_QA 기준)
  - `frame_policy_status=not-checked` — CSP/sandbox 점검 후 `pass` 갱신 필요 (DEV_D01 DoD 조건)
- feature flag(auto apply) 관리: G1 단계는 config 파일 방식 유지, DB 구축 후 전환 예정
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md`

---

## 2026-06-26 — eacct_chatbot 3환경 분리 + 프로파일 자동 설정 구조 도입 (19:25)

- `eacct_chatbot`: DEV/QA/PROD 3환경 분리 + `EACCT_CHATBOT_RUNTIME_PROFILE` 하나로 전체 자동 전환 구조 확립
- `_PROFILE_DEFAULTS` 테이블: 프로파일별 MISO_API_URL·MISO_AGENTS·MISO_AGENT_DEFAULT·DEV_AUTH_ENABLED 자동 적용
- DEV: 미소 DEV 서버(`atapi.ax.gsretail.com`) + `dev` 에이전트 + `miso_agent_dev_key` 자동 연결
- QA·PROD: 미소 운영 서버(`api.ax.gsretail.com`) + `all,cvs,super,hbu` 에이전트 자동 연결
- session-init DEV bypass: `DEV_AUTH_ENABLED=1` + `signed_jwt` 미제공 시 합성 세션 반환
- `.env` 최소화: `EACCT_CHATBOT_RUNTIME_PROFILE=dev` + 로컬 전용값만 유지
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md`

---

## 2026-06-26 — eacct_chatbot Feature Flag + 개발자 모드 시스템 구현 (16:38)

- `eacct_chatbot` 프로젝트: Feature Flag 3-state(`public`/`dev`/`hidden`) + 개발자 모드(httpOnly cookie) 설계·구현
- 슬래시 커맨드 그룹 재편(대화/게임/테스트/개발/개발자), PLANNED_FEATURES 클라이언트 Set 도입
- 개발자 모드 인터랙티브 토큰 입력, 부분 검색(includes) 적용
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md`

---

## 2026-06-26 — Antigravity → Gemini 전면 교체 + AI 이름 대문자 통일 + TC-ID 정정 (15:02)

- **Antigravity → Gemini 전면 교체**: collab 프로세스 제3자 테스터를 AI IDE 툴(Antigravity)에서 AI 모델(Gemini)로 정정
  - `personal.yml` `tested_by: "gemini"` 변경, `ai_agents/antigravity.md` → `gemini.md` 파일명 변경
  - 약 130개 파일 내용 변경, `test_results/` 하위 13개 디렉토리명 변경
- **AI 에이전트·사용자 이름 대문자 통일**: `claude`→`Claude`, `codex`→`Codex`, `jacey`→`Jacey`
  - 약 235개 파일 변경 (경로·파일명·CLI 명령어·이메일 제외)
  - `CLAUDE.md` 응답 규칙 21번 추가 (대문자 표기 원칙 명문화)
- **TC-ID 정정**: `TC-A\d+` → `TC-G\d+` (Antigravity 약자 'A' → Gemini 약자 'G')
  - 113개 파일 변경 (DEV·TC 문서, MAP.md, summary.md, 히스토리, 소스 코드 주석 포함)

---

## 2026-06-25 — eacct_chatbot 슬래시 커맨드 UX 개선 (08:33)

- 슬래시 커맨드 키보드·마우스 선택 스타일 통합, 다크 hover 버그 수정, 높이 제한·스크롤 추가
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md` 참조

---

## 2026-06-24 — eacct_chatbot widget.html 멀티 테마 구현 (19:06)

- CSS 변수 기반 3종 테마(오션·다크·애플) 구현, `/theme` 슬래시 커맨드, localStorage 영속성 적용
- 세부 내용: `projects/eacct_chatbot/_manage/history/202606_history.md` 참조

---

## 2026-06-23 — 20260619-1718 PLATFORM bundle 전 범위 완결 + 아카이브 이동 (10:20)

- **DEV_D01 Jacey 최종 승인** (08:35): AI 지침 SoT 분리·bootstrap 구조 구현 완료 — TC 25건 전건 통과. `ai_agents/` 6개 파일 신규 생성, AGENTS.md·CLAUDE.md·rule_loading_policy.md 개정 완료.
- **DEV_D02 C1~C5 구현 완료** (Claude 08:57): 신규 AI 온보딩·역할 전환·TC-ID 호환성 구현
  - README.md §6: 신규 AI 온보딩 절차(A-01~A-09), 파일럿 범위 레벨 4개, 파일럿 상태값 5종, role switch 절차(S-01~S-08), bootstrap 확인 명세(K-01~K-05)
  - README.md §9: TC-ID 호환성 브릿지 정책 (TC-C/TC-A 불변, archive 소급 변환 금지)
  - README.md §14: 신규 AI 파일럿 override 조건 (D02 승인 + bootstrap-verified 이상)
  - USAGE.md §6: 시나리오 F (신규 AI 파일럿 착수) 추가, FAQ Q6 보강, §12 ai_agents/ 링크
  - `_templates/testcase.md`: TC-ID 호환성 브릿지 주석 추가
- **DEV_D02 Codex 설계검증 통과** (10:06): TC-001~026 + TC-C01~C04 전건 통과
- **DEV_D02 Gemini 제3자 테스트 통과** (10:17): 기본 TC 26건 + TC-C 4건 + TC-A 2건 전건 통과 (TC-G01: 파일럿 상태 전이 우회 차단, TC-G02: 4-eyes 무력화 차단)
- **DEV_D02 Jacey 최종 승인** (10:20): TC 32건 전건 통과
- **bundle 아카이브**: `collab/PLATFORM/20260619-1718_ai-agent-instruction-profiles/` → `collab/_archive/PLATFORM/` 이동 완료 — INDEX.md 등록, MAP 전체 `[archived]` 갱신, 빈 폴더 삭제
- **결과**: 멀티 AI 등록·파일럿·역할 전환 절차 collab 프로세스에 완전 반영. D01(57건 TC 전건 통과) + D02(32건 TC 전건 통과) 합산 TC 89건.

---

## 2026-06-22 — G1-deployment-readiness 번들 완결 + 프로세스 갭 보완 (15:34)

- **DEV_D05 최종 승인**: `30_DEV_D05_deployment-pipeline-and-data-ops` §5 전건 PASS + Jacey 최종 승인 완료 (15:00)
- **번들 아카이브**: `collab/eacct_chatbot/20260617-1936_g1-deployment-readiness/` → `collab/_archive/eacct_chatbot/20260617-1936_g1-deployment-readiness/` 이동 완료 (15:08)
  - namespace MAP·root MAP 상태 플래그 `[archived]` 갱신 + 경로 전수 업데이트
- **collab DEV 병행 착수 프로세스 갭 보완 (Rule 8-5 3단계 완수)**:
  - `platform/processes/collab/README.md` §4 — DEV 병행 착수 금지 하드 게이트 신규 등록
  - `CLAUDE.md` 12-2 — collab DEV 병행 착수 전 산출물 종속성 사전 점검 규칙 추가
  - `platform/processes/lessons_learned.md` — DEV 병행 착수 레슨런 등록
- **archive 내 교차 참조 정리**: DEV_D01~D05·TC_D01~D05 내 `g1_*.md` 참조 → 새 파일명으로 전수 갱신

---

## 2026-06-22 — PLATFORM D02 설계 검증 + 승인 완료 (14:12)

- **D02 설계 검증**: `20_D02_ai-agent-onboarding-role-switch-tc-id` — D2-I-001~013 전건 Claude R1 리뷰 완료, blocking 이슈 없음, 즉시 합의 선언 (resolved_by: Claude 13:23)
- **Codex V1 동의 완료** (verified_by: Codex 13:35) — DoD 15건 전수 [x] 확인
- **Jacey 최종 승인** (approved_by: Jacey 13:43) — 설계 종료 승인 섹션 추가, MAP `[active · resolved · verified · jacey_approved]` 갱신
- **다음 단계**: 현재 진행 중인 collab DEV 마무리 후 DEV_D01(COMMON.md 분리·ai_agents/ 구조·entrypoint sync) + DEV_D02(README/USAGE/템플릿 개정·kimi.md 초안) 순차 착수
- **논의**: 루트 collab MAP 상태 불일치 반복 문제 — A안(루트 MAP 역할 단순화) 다음 기회에 collab direction으로 처리 예정

---

## 2026-06-19 — CI 자동 감시 훅 구축 + eacct_chatbot·video_clipper CI 실패 수정 (15:28)

- **CI 실패 원인 분석**: eacct_chatbot 5회(6/15~6/18)·video_clipper 2회(6/12·6/18) 실패 — flake8 E741/E501/F541/F401 등 수동 수정 필요 오류 방치
- **코드 수정**: `chat_handler.py`·`context_builder.py`·`privacy_acceptance_index.py`·`server.py`·`test_d04_server_endpoints.py`·`test_d05_privacy_gate.py` flake8 오류 전수 수정 + `video_clipper` 전 소스 flake8 통과
- **병합 충돌 해소**: `test_d05_privacy_gate.py` upstream vs stash 충돌 수동 해결
- **CI 자동 감시 훅 구축**: `git push` 감지 시 자동으로 GitHub Actions CI 감시 → 실패 시 Claude 즉시 재기동 (`asyncRewake: true`)
  - `.claude/settings.json` PostToolUse Bash 훅 추가
  - `platform/extensions/scripts/hooks/ci_watch_hook.ps1` 신규 생성
- **8-5 실수 시인 3단계 완수**: 원인분석 + 재발방지 + `platform/processes/lessons_learned.md` 레슨런 등록

---

## 2026-06-19 — eacct_chatbot 20260616-1736 persistent-audit-context-store 번들 아카이브 (14:41)

- `20260616-1736_persistent-audit-context-store` 번들 전 항목 완료 (DEV_D01~D05 Jacey 승인 완료)
- 18개 파일(direction + ORC + D01~D05 + DEV_D01~D05 + TC_D01~D05) `_archive/eacct_chatbot/20260616-1736_persistent-audit-context-store/` 이동
- collab MAP 상태 플래그 `[archived]` 갱신

---

## 2026-06-18 — AGENTS.md 승인 팝업 최소화 규칙 추가 (17:03)

- 승인 팝업 최소화: 단일 명령(`rg`, `Get-Content`, `git diff` 등) 우선, 복합 파이프라인·스크립트 블록·`pwsh.exe -Command` 래핑 최소화
- 파일 일부 확인 방식: `rg -n` → `Get-Content -TotalCount/-Tail` 단계 확인, 복합 명령 불가피 시 사전 설명 의무

---

## 2026-06-18 — eacct_chatbot g1-deployment-readiness D02·D03 리뷰 완료 (16:46)

- **D02 integration-security-boundary**: Claude R1 리뷰 완료(16:13) — D02-I-001~010 전 합의. Codex 동의 대기
- **D03 runtime-reliability-and-degraded-ops**: Claude R1 리뷰 완료(16:46) — D03-I-001~012 전 합의(D03-I-001 eacct_mcp/Miso 실행 구조 명시 권고 포함, non-blocking). Codex 동의 대기

---

## 2026-06-18 — eacct_chatbot DEV_D04 session-lifecycle C2 보완 완료 (16:26)

- Codex C1 설계검증 미통과(14:53) 3항목 대응 완료
  - `server.py` TC-C04: `is_context_blocked` 체크 + `reset_marker` 해제 구현버그 수정
  - `server.py` TC-C05: `storage_degraded` 처리 로그 추가
  - `test_d04_server_endpoints.py` 5개 신규 + `conftest.py` plugin 경로 수정
- 전체 93 passed — Codex C2 설계검증 대기

---

## 2026-06-18 — eacct_chatbot DEV_D05 privacy-and-acceptance-matrix 개발 완료 (16:06)

- D05 설계 승인(Jacey 15:20) 직후 DEV_D05 착수 완료
- privacy_gate.py 신규(PrivacyGateResult 7종·RAW_PII_FIELDS 18종·check_evidence_redaction) + 9 테스트 전 통과 + .env.example D05 섹션 + accepted_risk.md D05 리스크 6종

---

## 2026-06-18 — eAcct feature/chatbot_1st ← release/GSR_QA 머지 (16:52)

- `release/GSR_QA` 최신 643개 커밋 로컬 반영, `main.jsp` 충돌 해소
- QA 대비 변경 파일: `main.jsp` 1건 — PR 준비 완료

---

## 2026-06-18 — eAcct RSA 오류·챗봇 Mixed Content 수정 (14:51)

- **eAcct QA `config.properties`**: `production_mode = local` → `dev` + `git skip-worktree` 적용 — RSA 공개키 로드 오류(`InvalidKeyException`) 해소
- **eAcct `main.jsp`**: 챗봇 위젯 모드 `local` → `dev` 로 명칭 변경 (dev→localhost, stage→dev-chatbot, prod→운영)
- **eacct_chatbot `server.py`**: `ProxyHeadersMiddleware` 추가 — K8s/nginx 리버스 프록시 뒤에서 `request.base_url` HTTPS scheme 미인식으로 인한 Mixed Content 오류 해소

---

## 2026-06-17 — eAcct 챗봇 위젯 삽입 + 브랜치 신설 (18:51)

- **`feature/chatbot_1st` 브랜치 신설**: `release/GSR_PROD` 기준으로 생성 — 챗봇 1단계 배포 개발 전용 브랜치
- **`main.jsp` 챗봇 위젯 삽입**: 기존 Miso 위젯 유지 + eAcct 챗봇 위젯 추가 (3환경 분기)
  - `local` → `http://localhost:7000/widget.js`
  - `stage` → `https://dev-chatbot-eacct.gsretail.com/widget.js`
  - `prod` (otherwise) → `https://chatbot-eacct.gsretail.com/widget.js`
- **로컬 환경 설정**: `config.properties` `production_mode = local` 변경 + `git update-index --assume-unchanged` 적용 (커밋 제외)

---

## 2026-06-17 — eacct_chatbot·eacct_mcp 배포 경로 정비 (14:24)

- **eacct_chatbot**: `deploy/build_wheels.ps1` PLUGINS_PATH env fallback 추가, Miso `user` 파라미터 `"chatbot"` → `"chatbotTester"`
- **eacct_mcp**: `platform/plugins/` 경로 오류 3곳 (`setup.py`, `config_validate.py`, `CLAUDE.md`) → `platform/extensions/plugins/` 수정 + build_wheels.ps1 env fallback

---

## 2026-06-17 — eacct_chatbot first-open DEV_D05 최종 승인 완료 (13:11)

- DEV_D05 acceptance-test-matrix C1~C3 수정 완료 (AC 총량 29개 정정·G1 증적 케이스 추가·g1_smoke 폴더 설명 보완)
- Codex C3 재검증 통과 (12:57) + Gemini 제3자 검증 통과 (13:05, TC-G01~G02 추가)
- Jacey 최종 승인 완료 (13:11)
- first-open-dev-goals-review DEV/TC D01~D05 전 완료 — 다음 단계: Codex ORC+D01~D05 (persistent-audit-context-store direction)

---

## 2026-06-17 — wiki_builder 스케줄러 오류 수정 (12:55)

- `wiki_builder_auto.bat` LF→CRLF 변환 + `pushd` 따옴표 오류 수정 — 6/8 최초 등록 이후 한 번도 실행되지 않은 근본 원인
- `atlassian_client/base.py` stdout 설정 방식 수정 — `TextIOWrapper` 교체 → `reconfigure()` 방식으로 변경 (FAQ→MBO 연속 실행 시 buffer 이중 닫힘으로 `ValueError` 발생 방지)
- 수정 후 정상 실행 확인: FAQ 3건 처리 (신규 1 / 갱신 2), MBO 정상 진입

---

## 2026-06-16 — collab 아카이브 번들 11_REQ 문서 7건 일괄 생성 (17:24)

- collab 아카이브(eacct_chatbot 3건 + PLATFORM 3건) 및 active 번들(eacct_chatbot 1건) 대상
- DIR/ORC 역설계로 요구사항정의서(11_REQ_*.md) 신규 생성
- 생성 목록: brainstorm-triage, pii-tokenization-boundary, quick-win-batch, rule-loading-chain, claude-settings-hooks-migration, collab-process-read-gate-hooks, first-open-dev-goals-review

---

## 2026-06-16 — eacct_chatbot 1단계 단독 배포 준비 완료 (14:05)

- MCP optional 처리, 4개 Miso 에이전트 keyring 등록, UI 텍스트 1단계 배포용 변경
- 상세: [202606_history.md](../../projects/eacct_chatbot/_manage/history/202606_history.md)

---

## 2026-06-16 — eacct_mcp Containerfile 생성 (09:25)

- `projects/eacct_mcp/Containerfile` 신규 생성 — Phase 3 운영 서버 배포 대비
- 상세: [202606_history.md](../../projects/eacct_mcp/_manage/history/202606_history.md)

---

## 2026-06-15 — Lessons Learned 분석 보고서 + 8-5 완료 게이트 강화 (21:04)

- 전체 레슨런 파일 6개 분석 → 유형별 건수·재발 패턴·인사이트 도출
- `platform/docs/reports/` 폴더 신설 — 보고서 전용 위치 분리
  - `20260615_lessons-analysis.md / .html` 생성
  - 기존 `_manage/` 내 `20260601_team-intro-pt.*` 함께 이동
- `CLAUDE.md` 8-5 완료 게이트 강화 — 각 단계에 산출물 기준 명시 + [완료 게이트] 추가
- `platform/processes/lessons_learned.md` 신규 항목 등록 (8-5 미완료 재발 패턴)

---

## 2026-06-15 — eacct_chatbot 브레인스톰 완료 항목 분리 + 1차 배포 체크리스트 보완 (14:02)

- 브레인스톰 5개 파일 구조 재편: 완료 항목 전체 내용을 하단으로 분리 (미완료 항목만 본문에 잔류)
- deployment_roadmap·production_deployment 1차 배포 코드 준비 체크리스트에 보안 필수 항목 5개 추가
- .gitignore docs/guides/ 예외 추가 (배포 가이드 추적 복구)
- 상세: [202606_history.md](../../projects/eacct_chatbot/_manage/history/202606_history.md)

---

## 2026-06-15 — eacct_chatbot 브레인스톰 카테고리1 직접 처리 5건 완료 (09:32)

- B1-3·SEC-8·SEC-22·SEC-23·INF-13 직접 처리 + SEC-15 checkout 이슈 재적용
- 브레인스톰 5개 파일 현행화 (2026-06-15 현행화 테이블 + 완료 항목 섹션)
- 상세: [202606_history.md](../../projects/eacct_chatbot/_manage/history/202606_history.md)

---

## 2026-06-12 — gmail_cleaner 서비스종료 + GAS 스크립트 대폭 개선 (13:04)

- **gmail_cleaner 프로젝트 서비스종료 처리 완료**
  - CLAUDE.md 상태 → `서비스종료`, PROJECTS_GLOBAL.md 이동
  - 종료 사유: Python/MCP 방식 → 기존 GAS 스크립트로 운영 유지 결정
- **훅 경로 버그 수정** (`.claude/settings.json`)
  - 서브모듈 내 CWD 불일치로 훅 스크립트 못 찾던 문제 → PowerShell + `git rev-parse --show-superproject-working-tree` 패턴으로 동적 허브 루트 탐지
  - lessons_learned.md 등록
- **GAS 스크립트 전면 개선** (gmail_cleaner/archive/Code.js 기준)
  - `in:promotions` 주석 해제, `[광고]` 패턴 추가, 금융/증권/SNS 쿼리 추가
  - 웹앱 기반 검토 페이지 구현: `doGet()` → 체크박스 목록 + 삭제 버튼 (`google.script.run` 연동)
  - `reviewAndSendApproval()`: 삭제 후보를 Gmail로 발송 → 링크 클릭 → 확인 후 삭제
  - `autoDeleteQueries` / `reviewQueries` 분리: 즉시 삭제 vs 검토 후 삭제
  - `runDailyCleanup()`: 자동삭제 → 검토 메일 발송 순서로 통합 실행 (트리거 대상)
  - 검토 완료 후 알림 메일 자동 삭제

---

## 2026-06-12 — eacct_chatbot quick-win-batch D01~D03 collab bundle 완료 (10:22)

- **collab bundle 완료:** `20260610-1826_quick-win-batch` (D01·D02·D03) 3-way 검증 통과·승인 완료
  - **DEV_D01** (help 커맨드 discoverability) — `showHelp()` 3단계 구분 표시
  - **DEV_D02** (표 가독성) — `_isDateKey()` + `_fmtCell(val, isDateCol)` 헤더 기반 날짜 컬럼 감지
    - C1: 유효 범위 검사(연도 1900~2099, 월 01~12, 일 01~31) 추가
    - C2: `_isDateKey()` 헤더 키워드 기반 YYYYMMDD 변환 제한 (회계 식별자 오변환 차단)
  - **DEV_D03** (피드백 최소 루프) — `feedback_store.py` 신규 + `POST /feedback` 엔드포인트
    - C1: `source/.gitignore` 신규(`*.db` 포함), msgRef fallback hex 32자 수정, `.env.*.example` 문서화
  - collab 3-way: Claude(개발) / Codex(설계검증) / Gemini(제3자 테스트) / Jacey(최종 승인)
- **bundle 아카이브 이동:** `collab/eacct_chatbot/20260610-1826_quick-win-batch/` → `collab/_archive/eacct_chatbot/`
  - 빈 `collab/eacct_chatbot/` 폴더 삭제
  - MAP.md 헤더 `[active]` → `[archived]`, TC 섹션(TC_D01~D04) 추가

---

## 2026-06-11 — MCP 가이드 보완 및 서비스 로드맵 확정 (19:27)

- **MCP 가이드 내용 보정** (`projects/eacct_mcp/docs/guides/`)
  - D003 응답 분리 예시: 매입세금계산서 → 전표조회, 기안자명 마스킹(`홍*동`) 예시로 교체
  - 헤더 작성자 Jacey 추가, 풋터 경로 갱신 (`platform/docs/guides/` → `projects/eacct_mcp/docs/guides/`)
- **eacct_mcp/chatbot 서비스 배포 로드맵 확정**
  - 1차 (2026-07 말): chatbot 단독 배포 — MCP 불필요, Miso 기반 Q&A
  - 2차 (2026-08 말): chatbot + eacct_mcp — 전표·매입세금계산서 실시간 DB 조회
  - 3차 (2026-10 말): e-Acct API 연동 추가 — 전표 자동화 등, MCP DB read-only 유지
  - 주요 결정: 공통코드는 테스트 기능으로 로드맵 제외 / 3차 쓰기는 e-Acct API 경유
- **로드맵 문서화** (4개 파일 동시 반영)
  - `mcp_guide.md/.html` §11 서비스 배포 로드맵 섹션 추가 (단계별 아키텍처 다이어그램 포함)
  - `eacct_mcp/CLAUDE.md`, `eacct_chatbot/CLAUDE.md` 서비스 배포 로드맵 표 추가
- **S5 다이어그램 오류 수정**: Mermaid subgraph+direction 구문 오류 → CSS 플로우 블록으로 교체

## 2026-06-11 — eAcct 챗봇 AI 비용 산정 및 임원 보고서 작성 (19:22)

- **실제 Miso 사용량 데이터 분석** (경영지원본부 64명, 2026-03~06-10)
  - 누계: 91,876 API 호출 / 340M 입력 토큰 / 10.5M 출력 토큰 / $333.13
  - 대시보드 토큰(7M, 에이전트만) ≠ 실제 청구 토큰(340M, 전체) 확인
  - 입출력 비율 실측: 전체 97:3 / 최근(Sonnet) 기간 99:1
  - 모델 전환 이력: Gemini → Claude Sonnet 4.6 (최근 전환)
- **비용 산정 방법론 확립**
  - 기준 기간: 3~4월 (5~6월은 테스트 집중 기간으로 제외)
  - Sonnet 단가 재산정: 3월 $36.27 / 4월 $179.61 / 평균 **$107.94/월 (64명 기준)**
  - 전사 확대(4,300명) — 기본: **$7,256/월** / 최대(4월 기준): **$12,069/월**
- **임원 보고서 작성 및 최종 저장**
  - MD + HTML 2종 (`projects/eacct_chatbot/_manage/reports/20260611_cost-estimate-exec.*`)
  - HTML: SVG 차트 내장(외부 의존성 없음), 이메일 첨부 단독 공유 가능
  - brainstorm → `_manage/reports/` 신규 폴더 생성 후 이동

## 2026-06-11 — MCP 완전 가이드 작성 및 eacct_mcp 이관 (15:34)

- **MCP 개념 Q&A**: eacct_mcp 아키텍처 기준으로 MCP 정의·구조·통신방식 설명
  - "DB 직접 연결 vs API 경유" 논쟁 정리 — 둘 다 유효한 MCP, 프로토콜은 내부 구현 미규정
  - "웹서버 하나 더 두는 것과 같다" 주장 반박 — AI 자기기술 인터페이스(tools/list) 차이 명확화
  - Anthropic 공식 PostgreSQL·SQLite MCP가 DB 직접 연결 사례임을 근거로 제시
- **MCP 완전 가이드 문서 작성**
  - MD + HTML 2종 생성 (총 2057줄): 10개 섹션, Mermaid 다이어그램, FAQ 6개
  - 초기 위치 `platform/docs/guides/` → `projects/eacct_mcp/docs/guides/`로 이관
- **가이드 내용 보정**:
  - D003 응답 분리 예시: 매입세금계산서 → 전표조회, 기안자명 마스킹(`홍*동`) 예시로 교체
  - 헤더에 작성자 Jacey 추가, 풋터 경로 갱신

## 2026-06-11 — DEV_D02 최종 승인 완료, bundle 아카이브 (09:44)

- **PLATFORM collab DEV_D02 종료 승인**: H-GIT-REMOTE + H-DOC-QUALITY 훅 warn 모드 운영 투입 확정
  - C1→C2→C3→C4 재개발 끝에 Gemini C4 재검증 26개 TC 전원 통과 (09:01)
  - Jacey 종료 승인 (2026-06-11 09:02) — status: closed
  - TC-013 관찰 게이트: 1주 운영 후 오탐 0건 확인 시 block DEV 착수 가능 → `platform/_manage/todo.md` T-001 등록 (기한 2026-06-18)
- **bundle `20260609-1316_collab-process-read-gate-hooks` 아카이브 이동 완료**
  - direction + D01·D02 + DEV_D01·D02 + TC_D01·D02 전체 `_archive/PLATFORM/`으로 이동
  - MAP.md 전 항목 `[archived]` 갱신, INDEX.md 항목 추가, 원본 PLATFORM 빈 폴더 삭제
  - `platform/_manage/todo.md` 신규 생성 (T-001 첫 항목)

---

## 2026-06-10 — CI 전체 점검 + 이벤트 기반 자동 복구 에이전트 브레인스톰 등록 (16:34)

- **wiki_builder CI 복구**: flake8 에러 4건(E501·F401×2·F541) 수정·푸시 → CI success 확인
- **전체 CI 상태 점검**: wiki_builder·gmail_cleaner·eacct_chatbot·eacct_source_analyzer 모두 green
  - 6월 1~2일 실패 이력은 당일 자체 수정 완료 상태로 확인
- **이벤트 기반 자동 복구 에이전트 브레인스톰 등록**
  - 파일: `platform/_manage/brainstorm/20260610_event-driven-auto-remediation.md`
  - 컨셉: Gmail CI 실패 알림 → 원인 분석(Claude API) → 자동 수정·커밋·푸시 에이전트
  - 방향: 독립 프로젝트로 먼저 구현 후 플랫폼 승격 심사
  - 결정 사항: Gmail 1차 / 폴링 하루 2회 Task Scheduler / Windows Toast + 로그 알림
  - 미결 사항(collab 설계에서 결정): 다중 레포 관리 방식·API 비용 상한·detail 분리 기준·수정기 로컬 운영 방식
  - 다음 단계: collab direction 초안 작성(Codex 담당) → 합의 후 프로젝트 생성

---

## 2026-06-10 — DEV_D01 read-gate 훅 운영 투입 승인 및 bundle 아카이브 (13:41)

- **PLATFORM collab DEV_D01 종료 승인**: H-RG-001~003 운영 투입 확정
  - C1 미통과 → C2 수정(정규식 오탐·경로 정규화) → Codex/Gemini C2 21개 전원 통과
  - Jacey 종료 승인(2026-06-10 13:41) — H-RG-001~003 즉시 운영
  - bundle `20260609-1316_collab-process-read-gate-hooks` → `_archive/PLATFORM/` 이동 완료
  - MAP.md(collab 루트·PLATFORM) 상태 `archived` 갱신 완료

---

## 2026-06-10 — DEV_D01 read-gate 훅 구현 착수 완료 (11:01)

- **PLATFORM collab DEV_D01**: H-RG-001~003 read-gate 훅 구현 완료
  - G-01 PASS: hook input 필드 목록 확인 (`_obs_results/20260609_*_pre_Write/Edit.json` 증적)
  - G-03 PASS: 기존 H-001 PreToolUse 동작으로 출력 채널 검증됨
  - `platform/extensions/scripts/hooks/read_gate.py` 신규 구현 (H-RG-001~003)
  - `.claude/settings.json` PreToolUse `Edit|Write` 매처에 H-RG 훅 등록
  - `30_DEV_D01_20260610-1058_read-gate-hooks.md` §2 개발 완료 요약 작성
  - `40_TC_D01_20260610-1058_read-gate-hooks.md` §1 TC-001~012 작성
  - 다음 단계: Codex §3-1 설계검증 → Gemini §3-2 → Jacey dev 종료 승인

---

## 2026-06-10 — D01 read-gate 설계 최종 승인 (10:27)

- **PLATFORM collab D01 `20_D01_read-gate-hooks.md`**: 전 사이클 완료
  - Claude R1 리뷰 → Codex R1 응답 → Claude R2 재검토 → Codex V1 동의 → Jacey 승인
  - H-RG-001/002 block 대상: 신규 Write 한정 / H-RG-003: hook payload 확인 후 block 여부 확정
  - G-01~G-04 선행 게이트 도입 합의
  - §5 이슈 트래킹 ID별 묶음·R1→R2→V1 순서 정렬 완료

---

## 2026-06-09 — transit_finder 개발 완성·API 키 설정 시도 (11:22)

- **P2606081 transit_finder**: 백엔드·프론트엔드 코드 완성, API 키 발급·등록까지 진행
  - 카카오 JS SDK·TMAP·서울시 버스 API 키 발급 및 keyring 등록 완료
  - 서울시 버스 API 인증 실패(에러코드 30), TMAP SSL 오류(회사 프록시) — 테스트 보류
  - 재개 시 우선 `data.seoul.go.kr` 직접 키 발급 시도 필요
  - 상세 이슈·TODO → `projects/transit_finder/_manage/`

---

## 2026-06-09 — DEV_D02 최종 승인 완료 및 bundle 아카이브 (16:13)

- **H-006 C4 수정 (git 명령 최적화)**:
  - `git ls-files --others` + `git diff --name-only --cached` 2회 호출 → `git status --porcelain --ignore-submodules=all` 단일 호출로 교체
  - timeout 5 → 30 / perf_test.py cwd를 repo root로 수정
  - 결과: avg=0.419s, p95=0.728s (기준 ≤1s/≤2s) PASS
- **DEV_D02 최종 승인 (Jacey, 2026-06-09 14:59)**:
  - Codex §3-1 C3 통과(13:35) → Gemini §3-2 C4 통과(14:26) → Jacey 승인(14:59)
  - H-001·H-006 pilot warn-only 운영 개시
- **재발방지 등록 (결재 헤더 날짜 권한 침범)**:
  - `platform/processes/collab/README.md` §11, `_templates/dev.md` 각 섹션 게이트, `lessons_learned.md`에 규칙 등록
- **bundle `20260608-1855_claude-settings-hooks-migration` 아카이브**:
  - `collab/PLATFORM/` → `collab/_archive/PLATFORM/` 이동
  - D03/D04/ORC → `20260609-1316_collab-process-read-gate-hooks` 이관 명시
  - MAP.md 전체 경로·상태 플래그 갱신

---

## 2026-06-09 — DEV_D02 시크릿·민감파일 보호 훅 구현 완료 (10:42)

- **PLATFORM collab DEV_D02 §2 완료**: H-001/H-006 훅 어댑터 구현 및 26/26 테스트 통과
- **신규 파일**:
  - `platform/processes/security/hooks_policy_d02.md` — 정책 SoT
  - `platform/extensions/scripts/hooks/h001_secret_detect.py` — Edit|Write `.env` 시크릿 감지 (pilot warn)
  - `platform/extensions/scripts/hooks/h006_sensitive_file.py` — Bash git add/commit/push 민감파일 감지 (pilot warn)
  - `.claude/settings.json` — H-001·H-006 PreToolUse·PostToolUse 훅 등록
  - `test_samples/run_tests.py` + 샘플 파일 17종
  - `test_results/20260609-0939-T001-T006-obs/summary.md` — obs 증적 정식 기록
  - `30_dev/30_DEV_D02_...md`, `40_testcase/40_TC_D02_...md` — collab 문서
- **주요 결과**: T-002~T-009 전원 통과. T-008 성능 avg=0.746s(≤1s). H-006 `git ls-files`로 전환(untracked 폴더 내 파일 개별 감지). cwd 대소문자 `.lower()` 처리 적용.
- **다음**: Codex §3-1(설계검증) + Gemini §3-2(제3자 테스트) 대기

---

## 2026-06-08 — 전체 폴더 구조 정리 (17:31)

- **빌드 아티팩트 삭제**: 루트 `.pytest_cache/`, `platform/__pycache__`, `projects/eacct_mcp/__pycache__`, `platform/extensions/tools/rag/node_modules/`
- **중복 파일 삭제**: `platform/ENHANCEMENTS.md` (루트 통합)
- **venv 정리**: `projects/wiki_builder/.venv` (루트 잔재) 삭제 / `projects/video_clipper/source/venv` → `.venv` 재생성 (명칭 일관성)
- **video_clipper 미커밋 정리**: STT 스크립트 5종·requirements.txt·gitignore 커밋
- **TODO_GLOBAL.md 구조 개선**: 미해결(12개) 상단 / 완료(14개) 하단 분리, G-010 현행화
- **rag 도구 백업**: `platform/extensions/tools/rag/` → `platform/archive/rag/` 이동 (구 HTML 산출물 기반, MD 전환 후 재설계 예정)

---

## 2026-06-08 — wiki_builder 활성 전환 + 서비스종료 서브모듈 archived/ 이동 (16:03)

- **wiki_builder(P2606041) 상태 전환**: 진행중 → 활성 (단계: 운영) — Task Scheduler 자동 실행 중
- **서브모듈 구조 정리**: `projects/wiki_faq_builder`, `projects/wiki_mbo_builder` → `archived/` 이동
  - GitHub 레포 보존, `projects/`는 진행중·활성 프로젝트만 유지

---

## 2026-06-08 — wiki_builder FAQ 처리 완료 + 아카이브 이동 + 스케줄러 등록 (14:01)

- **wiki_builder 통합 완료**: wiki_faq_builder + wiki_mbo_builder → wiki_builder(P2606041) 소스 파일 구현 완료
- **FAQ 전체 처리**: 2025-11 ~ 2026-05 (25건) 월별 순차 처리 및 검증
- **소스 페이지 아카이브 이동**: 25건 Confluence 아카이브 폴더 이동
- **Task Scheduler 등록**: `wiki_builder_auto` (월~금 12:00) — `wiki_faq_builder_auto` 삭제·대체

---

## 2026-06-05 — mcp_platform extractors_common 날짜 파싱 버그 수정 (16:32)

- **`_RE_YEAR_QUARTER` / `_RE_YEAR_HALF` 수정**: `년?` → `년도?` — "25년도 1분기" 입력 시 연도를 분기 prefix로 묶지 못하고 연도 없이 분기만 매칭 → 현재 연도 기본값(2026)으로 오판하던 문제 해소
- **대상 파일**: `platform/extensions/plugins/mcp_platform/mcp_platform/router/extractors_common.py`

---

## 2026-06-05 — ITGC 점검 체크리스트 작성 및 보안 문서 일원화 (16:30)

- **ITGC 체크리스트 작성** (eacct_mcp·eacct_chatbot): ITGC 관점 15개 항목 — 현재 적용여부·보완 대책 포함
- **보안 문서 일원화**: `eacct_chatbot/_manage/security_review_checklist.md` → `eacct_mcp/docs/security-review/`로 이동. 보안/ITGC 관련 문서 eacct_mcp 한 곳으로 집중
- **SEC_REVIEW_REQUEST v0.3 현행화 (MD + HTML)**: §7 ITGC 챕터 추가, 기존 §7·§8 → §8·§9로 번호 조정

---

## 2026-06-05 — SEC-25 브레인스톰 등록 + pii-tokenization-boundary direction 합의·승인 + eacct_mcp docs 구조 재편 (13:23)

- **SEC-25 브레인스톰 등록**: `eacct_chatbot/_manage/brainstorm/20260528_보안_인증_컴플라이언스.md`에 SEC-25 항목 추가 — MCP 결과 내 개인식별 필드 토큰화 후 미소 전달, 역매핑 후 UI 표시 방향 확정
- **collab direction 합의·승인**: `20260604-1550_pii-tokenization-boundary` — SEC-21·24·25 단일 direction, D01(TokenStore/contract) + D02(chatbot boundary) 2-detail + ORC 필수 구조. Claude R1 리뷰 → Codex 응답 → 합의·동의·Jacey 승인 완료
- **eacct_mcp docs 구조 재편 커밋·푸시**: `SECURITY_GOVERNANCE.md` 프로젝트 루트 이동, `docs/security-review/`·`docs/specs/` 신설. hub 서브모듈 포인터·schedules.md 갱신 커밋·푸시
- **레슨런·재발방지**: 아카이브 이동 후 빈 폴더 삭제 누락 → `platform/TRIGGERS.md` 44·45번 행에 빈 폴더 삭제 단계 추가 + `platform/processes/lessons_learned.md` 등록

---

## 2026-06-05 — eacct_chatbot D02 PII 토큰화 경계 완료 (09:00)

- `eacct_chatbot` `chat_handler.py` D02 chatbot 레이어 토큰화 경계 구현 완료
  - pii_masker LLM 경로 제거, tokenize_object·역토큰화 분리, 보호 문구 적용
  - collab `20260604-1550_pii-tokenization-boundary` bundle archive 이동 완료
  - Codex + Gemini 전수 검증 통과, Jacey 최종 승인

---

## 2026-06-04 — wiki_builder 통합 + atlassian_client 리팩터링 (20:55)

**배경**
- wiki_faq_builder·wiki_mbo_builder가 동일 `source_roots` 공유 → 두 도구 모두 `move_page()` 호출 → 선실행 도구가 페이지를 아카이브로 이동하면 후실행 도구가 해당 페이지를 검출하지 못하는 충돌 구조 확인
- 스케줄러 경로 오류 (`D:\05.Claude\...` → Last Result: -2147024894 파일 없음)로 5/19 이후 모든 자동 실행 실패. 4·5월 FAQ·MBO 데이터 누락 발생

**데이터 복구**
- 스케줄러 경로 수정 및 재등록 (`D:\03.project-hub\...`)
- `wiki_faq_builder --auto` 수동 실행 → 19·20주차 아카이브 이동 완료, 23주차 FAQ 신규 생성
- `wiki_faq_builder --force` 수동 실행 → 27페이지 전체 재처리 (22주차 포함 신규 1·갱신 23)
- `wiki_mbo_builder --force` 수동 실행 → 4·5월 MBO 전체 재처리

**atlassian_client v0.2.0 → v0.3.0**
- `ConfluenceAnalyzerBase` → `WikiSourceBase` 이름 변경 (하위 호환 별칭 유지)
- 비즈니스 로직 제거: `should_archive()` / `is_korean_holiday()` utils에서 삭제
- 대체 훅 추가: `should_skip_today() → bool` / `should_move_to_archive(source) → bool` (기본값 False, 프로젝트에서 오버라이드)
- 테스트 89 passed ✓

**프로젝트 통합**
- wiki_builder (P2606041) 신규 생성 — FAQ·MBO 통합 빌더 (일별 FAQ, 매월 1~3일 MBO)
- wiki_faq_builder (P2604221) 서비스종료 — 종료일 2026-06-04
- wiki_mbo_builder (P2604281) 서비스종료 — 종료일 2026-06-04

**스케줄러**
- `wiki_mbo_builder` 삭제
- `wiki_faq_builder_auto` → `wiki_builder_auto`로 전환 예정 (wiki_builder 구현 완료 후)

---

## 2026-06-04 — collab direction 파일 번호 체계 변경 (17:30)

**플랫폼**
- collab `10_direction/` 폴더 내 파일 번호 체계 개선 — 폴더 단계 번호(10/20/30/40)와 파일 순서 번호 충돌 문제 해결
- 새 규칙: `11_REQ_` / `12_DIR_` / `13_ORC_` (폴더 10의 하위임을 번호로 표현)
- 파일 rename 8개 완료 (active bundle 2 + archive eacct_chatbot 2 + archive PLATFORM 4)
- 내부 링크 참조 수정 14개 파일 (MAP.md 2, DEV 4, ORC/DIR, README/USAGE/템플릿 포함)
- 커밋은 현재 작업 완료 후 별도 예정

---

## 2026-06-04 — 자동화 스케줄 관리 체계 구축 + 즉시 착수 가능 작업 완료 (11:44)

**플랫폼**
- `platform/_manage/schedules.md` 신규 생성 — 등록 목록·상태 확인·PC 변경 시 재등록·일정 수정·즉시 실행·삭제 명령 통합 관리
- `generate_sidebar.py` 수정 + 사이드바 재생성 — "플랫폼 현황 > 자동화 스케줄" 메뉴 추가

**wiki_mbo_builder (P2604281)**
- `run.bat` 실행 조건 변경: 월말 → 매월 1~3일 12:00
- Windows Task Scheduler 등록 완료 (`wiki_mbo_builder`, 매일 12:00, 1~3일만 실행)
- 수동 실행 완료 — 신규 2건·갱신 2건·스킵 2건, 2026-06 MBO 페이지 신규 생성, 2Q 분기면담 갱신

**eacct_mcp (P2605081)** — 이미 서브모듈 커밋 반영
- F003 `get_slip_detail` tool 구현 (slip.py·tools.yml·__init__.py·redactor.py·response_builder.py)
- DOM-4 `nominee_email` 확인 — EacctRedactor llm_safe_summary에서 이미 제외, 수정 불필요

**eacct_chatbot (P2605121)** — 이미 서브모듈 커밋 반영
- UX-24 `widget.html` 표 수평 스크롤 수정 (`_buildTable` overflow-x:auto 래퍼)
- CX-4 `mcp_client.py` httpx.Timeout 명시 (connect 5s / read 30s, `MCP_TIMEOUT_SECONDS` env 지원)

---

## 2026-06-04 — collab 구조 리팩터링: _templates/·_archive/·namespace MAP 분리 (11:31)

**작업 내용**

### 1. 템플릿 파일 `_templates/` 폴더로 이동
- `_template_design.md` / `_template_dev.md` / `_template_testcase.md` → `_templates/design.md` / `dev.md` / `testcase.md`
- 경로 참조 업데이트: `CLAUDE.md`, `README.md`, `USAGE.md`, `rule_loading_policy.md`, `lessons_learned.md`, `eacct_chatbot/_manage/lessons.md`

### 2. collab MAP.md namespace별 분리
- 루트 `MAP.md` → namespace별 인덱스로 전환
- `collab/eacct_chatbot/MAP.md`, `collab/PLATFORM/MAP.md` 신규 생성

### 3. `archive/` → `_archive/` 이름 변경 + namespace MAP.md 이동
- `collab/archive/` → `collab/_archive/`
- namespace MAP.md → `_archive/{namespace}/MAP.md` 이동 (INDEX.md와 동일 방식으로 `_archive/` 내 계속 갱신)
- 루트 namespace 폴더(`eacct_chatbot/`, `PLATFORM/`) 삭제 — active bundle 없을 때 루트 폴더 불필요
- `.gitignore` 업데이트: `!_archive/*/`, `!_archive/*/MAP.md` 화이트리스트 추가

### 경로 참조 전수 업데이트
- **규칙 파일**: `CLAUDE.md`, `TRIGGERS.md`
- **collab 내**: `README.md` (§2·§3·§12·§15·SoT 표), `USAGE.md`, `_templates/design.md`, `_templates/dev.md`, namespace `MAP.md` 2개
- **외부**: `ENHANCEMENTS.md`, `projects/eacct_mcp/docs/SECURITY_GOVERNANCE.md`
- **검증**: `archive/` 잔여 참조 0건 (md·yml·py 전수 확인)

**변경 파일**
- `platform/processes/collab/.gitignore`
- `platform/processes/collab/MAP.md`
- `platform/processes/collab/_archive/eacct_chatbot/MAP.md` (신규)
- `platform/processes/collab/_archive/PLATFORM/MAP.md` (신규)
- `platform/processes/collab/_templates/design.md` / `dev.md` / `testcase.md`
- `platform/processes/collab/README.md`
- `platform/processes/collab/USAGE.md`
- `platform/TRIGGERS.md`
- `CLAUDE.md`
- `ENHANCEMENTS.md`
- `projects/eacct_mcp/docs/SECURITY_GOVERNANCE.md`

---

## 2026-06-04 — DEV 문서 변경이력 순서 정책 확정 및 전체 반영 (11:17)

**작업 내용**

### DEV 문서 변경이력 삽입 방향 결정
- 문제 발견: `20260514-1554` 번들 DEV 파일(오름차순)과 `20260529-2010` 번들 DEV 파일(내림차순) 방향 불일치
- 원인: `_templates/dev.md`에 삽입 방향 명시 없어 AI마다 다르게 기입
- 결정: **오름차순(과거→최신, append)** — 감사 추적 목적·결재 흐름과 일치, append라 AI 실수 여지 없음

### 템플릿·가이드 수정
- `platform/processes/collab/_templates/dev.md` — 삽입 방향 명시: `표 최하단 append — 시간 흐름 순서(과거→최신)로 유지`
- `platform/processes/collab/README.md` — 문서 변경이력 예시 표 오름차순 정렬 + 강제 규칙에 삽입 방향 항목 추가

### 아카이브 DEV 파일 소급 수정
- `archive/eacct_chatbot/20260529-2010_brainstorm-triage/30_dev/` D01~D04 — 내림차순 → 오름차순 수정
- `archive/PLATFORM/20260514-1554_mcp-chatbot-security-ops/30_dev/` 전체 — 이미 오름차순 ✓ (변경 없음)

---

## 2026-06-04 — DEV_D04 C2 재개발·승인 + bundle 20260529-2010 아카이브 이동 (10:39)

**작업 내용**

### DEV_D04 검토 및 C2 재개발
- Codex C1 검증 결과(TC-C01 FAIL) 검토 — `ALLOWED_PARENT_ORIGINS` 미설정 시 운영 postMessage wildcard 진입 가능 문제 확인
- C2 재개발 2개 파일 수정:
  - `projects/eacct_chatbot/deploy/manifest.yml` — `env_required`에 `APP_ENV`, `ALLOWED_PARENT_ORIGINS` 추가
  - `projects/eacct_chatbot/source/src/server.py` — `APP_ENV=production` 시 `ALLOWED_PARENT_ORIGINS` 미설정이면 RuntimeError 기동 차단 게이트 추가

### DEV_D04 승인
- Codex C2 재검증 전항목 PASS (TC-C01·TC-C08 포함)
- Gemini 제3자 테스트 27/27 PASS (TC-G01~G03 추가 도출)
- DEV_D04 §5 체크리스트 확인 후 Jacey 승인 완료 (10:39)

### bundle 20260529-2010 최종 완료 및 아카이브 이동
- DEV_D01~D04 전항목 3-way 검증·승인 완료 확인
- DEV_D03 `resolved_by: ~` 누락 수정 (Jacey)
- MAP.md DEV_D04·TC_D04 항목 갱신, bundle 헤더 `archived` 플래그 추가
- archive/INDEX.md — bundle 전체 완료 반영으로 항목 갱신

**변경 파일**
- `platform/processes/collab/MAP.md`
- `projects/eacct_chatbot/deploy/manifest.yml`
- `projects/eacct_chatbot/source/src/server.py`

---

## 2026-06-04 — DEV 템플릿 변경이력 양식 통일 (08:34)

**작업 내용**

### DEV_D04 변경이력 blockquote 양식 이슈 확인
- `30_DEV_D04_ui-eacct-integration.md`에 D01~D03에 없던 blockquote 안내문 존재 발견
- 원인: 이전 세션에서 `_template_dev.md`를 수정(HTML 주석 → blockquote 전환)했으나 미커밋 상태로 방치 → D04 작성 시 변경된 템플릿 반영되어 양식 불일치 발생

### 템플릿 커밋 (63fa760)
- `## 문서 변경이력` 수행자 의무 안내: `<!-- -->` → blockquote 전환 (AI 협업자가 문서 열람 시 실제로 보이도록)
- §2/§3-1/§3-2 각 섹션 완료 게이트 blockquote 추가
- §5 체크리스트에 변경이력 승인 행 추가 항목 반영
- D01~D03(resolved)은 소급 수정 없음 — 작성 시점 템플릿 기준으로 인정

**변경 파일**
- `platform/processes/collab/_template_dev.md`

---

## 2026-06-02 — 서브모듈 flake8 lint 수정 + CI auto-fix 스텝 추가 (09:56)

**작업 내용**

### 기존 미커밋 수정 내역 푸시
- 전수검토 이슈 플랫폼 처리 완료 (scripts/ → setup/ 이동, collab 역할 변수화 등) 커밋·푸시

### 3개 서브모듈 flake8 lint 오류 수정 (5월 27일~6월 1일부터 누적)
- **eacct_source_analyzer**: F401 (os, rich.text.Text), F841 (pattern 미사용 변수) 수정
- **eacct_chatbot**: F401 (field), E306 (중첩 함수 전 빈 줄), E501 (줄 길이 7곳), E221·E251 (공백 정렬), F541 (f-string placeholder 없음) 수정
- **gmail_cleaner**: F401 (GmailCleanerConfig, pytest, MailItem), `.flake8` 설정 파일 추가 (flake8이 pyproject.toml 미지원)

### CI auto-fix 스텝 추가 (3개 레포 공통)
- lint 실패 시 `autoflake --remove-all-unused-imports` + `autopep8` 자동 수정·커밋 (`[skip ci]`) 후 재검사
- 수동 수정 불가 오류만 CI 빨간불 표시

**변경 파일**
- `projects/eacct_source_analyzer/source/analyze.py`, `source/src/finder.py`, `.github/workflows/ci.yml`
- `projects/eacct_chatbot/source/src/payload_store.py`, `pii_masker.py`, `chat_handler.py`, `server.py`, `tests/test_bill_save.py`, `.github/workflows/ci.yml`
- `projects/gmail_cleaner/source/tests/test_cleaner.py`, `source/tests/test_config.py`, `.flake8`, `.github/workflows/ci.yml`

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
- MAP.md: 설계 문서 플래그 `[resolved · verified · approved · archived]`, DEV_D01 경로 + 플래그 `[active · verified(Codex) · archived]`로 갱신
- `archive/INDEX.md`: brainstorm-triage bundle 항목 추가
- **설계 완료 즉시 아카이브 절차 신규 등록**:
  - `platform/processes/collab/README.md` §12: "설계 완료 즉시 아카이브 이동 — DEV 진행 중이어도 예외 없음" 규칙 추가
  - `platform/TRIGGERS.md`: "마지막 design 문서 `approved_by: Jacey` 기재 감지 → 설계 완료 아카이브 자동 트리거" 행 추가

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
- **[A-04] `Codex`/`Gemini` 하드코딩 제거**: README §4·§5·§7·§8·§9·§15·footer + `_template_testcase.md` 주석 → `{collab_verified_by}`/`{collab_tested_by}` 치환
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
- Codex §3 응답 확인 후 전 항목 합의 → resolved_by: Claude (11:33)
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
- D02·DIR·ORC Jacey 승인 완료 (approved_by: Jacey)
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
