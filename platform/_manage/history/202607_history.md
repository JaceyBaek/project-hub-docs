<!--
sidebar_title: 2026년 7월
sidebar_order: 1
-->

# 2026년 07월 작업 히스토리

---

## 2026-07-22 — collab 프로세스 문서 구조 개선 + 플랫폼 잡무 정리 (챗봇/MCP 무관 건, 20:01)

**대상**: 플랫폼 레이어 (`platform/`) — eacct_chatbot·eacct_mcp 소스·서브모듈은 이번 커밋에서 제외 (별도 진행 중)

**변경 내용**:
- `platform/processes/collab/README.md`·`USAGE.md`: 신규 AI 온보딩 절차(A-01~A-09, K-01~K-05, S-01~S-08) 상세 표를 `platform/processes/collab/ai_onboarding.md`로 이관, 본문은 요약 참조로 축약 (토큰 절감)
- `platform/processes/collab/MAP.md`: §15 재정의 — 활성 MAP(`{namespace}/MAP.md`)과 아카이브 MAP(`_archive/{namespace}/MAP.md`) 쓰기 책임 분리, 루트 MAP.md에 eacct_chatbot 활성 인덱스 상태(D01~D04 승인 이력) 갱신 반영
- `platform/processes/collab/.gitignore`: 활성 namespace MAP.md(`!*/`, `!*/MAP.md`) 화이트리스트 추가
- `platform/processes/lessons_learned.md`: 협업/프로세스 섹션 중복 교훈 정리, 상세 이력을 `platform/processes/collab/lessons.md`로 위임
- `platform/TRIGGERS.md`: "리뷰 요청" 트리거 설명 축약(상세는 README 참조로 분리)
- `platform/setup/bitbucket_repo_guide.md`·`.html`: 가이드 내용 보강
- `platform/setup/config/collab_hooks.json` 신규: collab 타임스탬프 검증 훅 설정 분리 (README §17 참조용)
- `platform/_manage/brainstorm/20260716_disk-cleanup-automation-project.md` 신규: Windows 디스크 정리 자동화 프로젝트 구상 기록
- `projects/eacct/_manage/scripts/build_ifmap_temp_voucher.py` 신규: eacct IF-MAP 임시 전표 빌드 스크립트
- **제외 항목**: `platform/extensions/plugins/miso_client/miso_client/client.py`(`user` 파라미터 추가 — eacct_chatbot 라우팅 작업 연관 의심으로 제외), `projects/eacct_chatbot`·`projects/wiki_builder` 서브모듈(각 프로젝트 자체 진행 중 작업, 미커밋 상태 유지)

---

## 2026-07-21 — eacct_chatbot K8s 배포 코드·문서 전체 제거 / ECS Fargate 전환 확정 (16:36)

**대상 프로젝트**: `eacct_chatbot`

**변경 내용**:
- `k8s/` 폴더 전체 삭제 (11개 파일)
- `internal_k8s` 런타임 프로필 alias 제거 → `dev | qa | prod` 직접 허용값만 사용
- `server.py`, `chatbot_store.py`, `eacct_resolve_client.py`, `eacct_session.py`, `privacy_gate.py` 수정
- 테스트 코드 (`test_chatbot_store.py`, `test_d04_profile_gate.py`, `test_d05_privacy_gate.py`) 수정
- `production_deployment.md` ECS Fargate 기반으로 전면 재작성, `deployment_roadmap.md` K8s → ECS 전환
- `CLAUDE.md` 환경변수 허용값·로드맵 설명 수정

**ECS 전환 결과**: `EACCT_CHATBOT_RUNTIME_PROFILE=qa` (또는 `prod`) 직접 설정으로 운영 환경 구분

---

## 2026-07-15 — eacct_chatbot collab 20260701-1838 bundle 모든 DEV 승인 완료 (16:17)

**대상 bundle**: `eacct_chatbot/20260701-1838_ecs-fargate-aurora-deployment`

**완료 단계**:
- **DEV_D01~D07**: 모두 Jacey 최종 승인 완료
  - DEV_D01 (11:27), DEV_D02 (13:16), DEV_D03 (14:02), DEV_D04 (15:11), DEV_D05 (15:34), DEV_D06 (16:36), DEV_D07 (16:17)
- **DIR/ORC**: 모두 `approved` 상태
- **Detail D01~D07**: 모두 `resolved` 또는 `approved` 상태
- **테스트 결과**: 
  - DEV_D01~D06: Opus 설계검증 + Gemini 제3자 테스트 (또는 해당 provider) 전건 PASS
  - DEV_D07: Opus 설계검증(TC-001~009 + TC-C01) + GPT-5.6 Terra 제3자 테스트(사용자 명시 단일 문서 예외, 13/13 PASS)

**아카이브 조건 충족**:
1. ✅ Details: 미착수·`[planned]` 항목 0건
2. ✅ DEV: 모두 `[resolved · jacey_approved]` 상태
3. ✅ TC: 모두 테스트 완료(각 DEV 문서에 기록)

**다음 단계**: 
- 아카이브 이동 준비 — 외부 blocker(T-D01~T-D07)는 별도 라운드로 진행
- 프로젝트 산출물 반영 예정 (projects/eacct_chatbot REQ/FLW/FUNC/TC)

**참고 파일**:
- DEV 파일: `30_dev/30_DEV_D01~D07_*.md` (7개 전건 `approved_by: Jacey` 기입)
- MAP.md: active 섹션에 전체 workflow 기록 — DEV_D01~D07 완료 사항 표시

---

## 2026-07-06 — CLAUDE.md collab 게이트 동적 로드 전환 완료 (16:25)

**목표**: collab 사용 세션에서만 규칙 로드, 일반 작업 세션에서 토큰 절감

- **이전 구조**: collab 하드게이트 14줄(1,311자) 상시 로드 → 매 요청마다 18.8% 오버헤드
- **변경 사항**: 
  - collab 하드게이트 14줄 → 3줄로 축약 (1,156자 절감, ~771 토큰/요청)
  - 감지 조건: "collab 시작/진행" 선언, "리뷰 요청" 트리거, collab 경로 파일 작업 요청
  - 감지 시 즉시 `platform/processes/collab/README.md` Read 강제 + 해당 세션 내내 전체 규칙 적용
  - "기억·이전 패턴 의존 금지" 명시 → 트리거 미사용 경로(DEV 승인·합의)에서도 Read 강제화

**시뮬레이션 검증**:
- ✓ 트리거 방식 규칙 발동 확인
- ✓ 비트리거 승인 작업 규칙 발동 확인
- ✓ 일반 작업 토큰 절감 확인

**제약**: 세션 압축 시간에 상대 AI(Codex 등) 수정 가능하므로 완벽 보장은 불가, 기존 방식과 동일 조건

**파일**: `d:/03.project-hub/CLAUDE.md`

---

## 2026-07-06 — eacct_chatbot widget.html UI 3개 이슈 최종 수정 + To-Do T027 등록

**위치**: `projects/eacct_chatbot/source/src/templates/widget.html`

- **Send/Stop 버튼 수직 정렬** (Tailwind CDN preflight 영향 대응)
  - 원인: Tailwind CDN이 런타임에 `*` 셀렉터로 `transform:translateY(0)` 주입 → 모든 flex/absolute 정렬 무효화
  - 수정: `display:grid;grid-template-columns:1fr auto;align-items:center;gap:6px` (CSS grid는 cross-origin preflight 영향 덜함)
  - 상태: 코드 적용 완료, Jacey 테스트 대기

- **피드백 제출 버튼 테마 미적용** (CSS 변수 미반환 대응)
  - 원인: `getComputedStyle` CSS 변수 반환값 공백 (Tailwind CDN 환경)
  - 수정: `openFbModal`에서 `html.dataset.theme` 직접 읽음 → 테마별 hex 맵 조회 → JS `setProperty('background-color', '#...', '!important')` 적용
  - 상태: 코드 적용 완료, Jacey 테스트 대기

- **Progress 메시지 위치 및 중복** ✅ 완료
  - `__loading-status` 말풍선 위로 이동, agent name 레이블 제거
  - 말풍선 안 랜덤 메시지와 중복 제거

**To-Do 신규**: T027 — FB_TAG_MAP → cb_comcd 이관 (T025 완료 후, 낮음 우선순위)

---

## 2026-07-06 — eacct_chatbot 역할 기반 접근제어 브레인스톰 + 개발자 모드 보안 정책 정리 (13:59)

- 개발자 토큰(`.env` `DEV_TOKEN`) 노출 정책 정리: 로컬 dev-only 토큰은 허용, 운영 credential(MISO_API_KEY 등)은 위치 안내만 제공
- 개발자 모드 진입 절차 확인: `/개발자모드` 슬래시 커맨드 → 토큰 입력 → `POST /api/dev-login` → `dev_token` 쿠키 30일 발급 → 페이지 리로드 → `__isDev = true` (`widget.html` fetchConfig 응답 기준)
- 현재 구조 한계 확인: 단일 `DEV_TOKEN` 공유 — 값 아는 사람 누구나 전체 설정 접근, 사용자별 구분 없음
- **역할 기반 접근제어 브레인스톰 작성** — `projects/eacct_chatbot/_manage/brainstorm/20260706_역할기반_접근제어_설정UI.md`
  - 역할 정의: `sys`(시스템 담당자, 전체 설정) / `biz`(현업 담당자, 감성편의·게임 public만, 개발 영역 숨김)
  - 비밀번호 외 진입 방안 4가지: A(사번 화이트리스트) · B(역할별 별도 토큰) · C(관리자 초대 코드 1회용) · D(IP/세션 기반)
  - 권장 로드맵: 단기(Phase 2) 방안 B or C → 중기(Phase 3 SEC-5 완료 후) 방안 A
  - 프론트엔드: `__userRole` 변수 도입, `roles: ['sys']` 배열로 `devOnly` 플래그 대체
  - 서버: fetchConfig 응답에 `user_role: 'sys'|'biz'|null` 추가
  - 아이다 제안 5건 포함 (biz 범위 사전 확정, B+A 혼합 전략, 쿠키 수명 재검토, 비로그인 `/설정` 범위 명시, SEC-5 JWT `roles` 클레임 선포함)
- 구현 미착수 — Jacey 검토 후 진행 예정

---

## 2026-07-03 — PRES 템플릿 Apple 디자인 적용 + 사이드바 접기·Teams 호환성 수정 + 버전 규칙 정비 (14:24)

- Apple 스타일(색상·타이포) 적용 — `PRES_presentation_template.html` · `PRES-authoring-guide.md` · 실문서 동기화. 디자인 시안(AWS 콘솔 네이티브 등)은 `platform/templates/html/design-drafts/`로 격리
- 사이드바 접기/펼치기(`#sidebar-toggle`) 신규 추가 — `body.sb-collapsed` 클래스로 `--sidebar-w` 재정의. 접힘 시 버튼이 화면 밖으로 잘리는 `calc()` 음수 오프셋 버그 수정(`left:10px` 고정값 별도 지정)
- 미사용 `.scroll-hint` 장식 요소 제거 (사이드바 내비로 대체 가능 판단, Jacey 확인)
- **Teams 첨부파일 미리보기 호환성 수정**: `.rv` 스크롤 reveal 애니메이션이 정적 `opacity:0`에 의존하던 구조 → JS가 `.pre` 클래스를 붙이는 방식으로 전환(JS 차단 환경에서 기본 노출 폴백) / 사이드바 `nav-item`의 `href="#id"` 네이티브 fragment 이동이 Teams 자체 라우팅과 충돌해 빈 페이지로 튀는 버그 → `href` 완전 제거, `data-target` + JS `scrollIntoView()`로 전환해 근본 해결. 단 Teams가 스크립트를 전면 차단하는 경우 사이드바 클릭 이동은 no-op — 버그가 아닌 구조적 제약으로 가이드에 명시
- 버전 규칙 신설: `v0.1`(초안) → `v1.0`(대상자 최종 확인 시 승격) → `v1.1`… 마이너 증가, 재작성 시 `v2.0`. 작성자 표기는 `personal.yml` 참조 제거, `Jacey(AX전략팀)` 고정값으로 변경
- 세부 내용: `projects/eacct_mcp/_manage/history/202607_history.md`

---

## 2026-07-03 — bitbucket_repo_guide.html PRES 템플릿 전면 재적용 (14:22)

- 문제: 사이드바 `.md` 링크 제거만 진행되고 실제 `PRES_presentation_template.html` 비주얼 템플릿은 미적용 상태였던 것을 Jacey 피드백으로 확인
- `platform/setup/bitbucket_repo_guide.html` 전체 재작성 — Apple 스타일 디자인(사이드바·Hero·divider·챕터칩·스크롤 reveal) 구조로 전환, 원본 §1~§8 콘텐츠·표·명령어·체크리스트 100% 보존
- 단일 파일 유지 제약 반영 — 인페이지 앵커(`#s1`~`#s8`, `#checklist`)만 사용, 폴더 이동 시 끊길 수 있는 파일 간 링크 배제
- 사이드바 상단 타이틀 "⚙️ Platform Setup" → 실제 문서 제목("Bitbucket 리포지토리 생성 & GitHub 듀얼 remote")으로 수정
- 작성자 표기 3곳(사이드바 하단·Hero 메타 태그·푸터) "Jacey" → "Jacey(AX전략팀)"으로 변경 (`JaceyBaek` GitHub 계정명 예시는 대상 아니므로 유지)
- 커밋·푸시 미진행 (요청 시 진행)

---

## 2026-07-02 — eacct_chatbot Aurora DDL 전면 개편 완료 (17:16)

- `eacct_chatbot.sql` → `eacct_ai.sql` 단일 스키마(cb_/mcp_ prefix)로 재편
- mcp_audit_event 신규: ECS Fargate 감사 증적 Aurora 영속화
- cb_comcd_grp / cb_comcd 공통코드 테이블 신규 (T025 DDL 단계 완료)
- 상세: `projects/eacct_chatbot/_manage/history/202607_history.md`

---

## 2026-07-02 — eacct_chatbot Aurora MySQL 마이그레이션 준비 완료 (15:20)

- MDS 체크포인트 1~5 확정, Aurora MySQL DDL 초안(`source/db_schema/eacct_chatbot.sql`) 작성
- feedback_store.py session_id_hash 제거 + RETENTION_DAYS env var화 / server.py 연동 수정
- 상세: `projects/eacct_chatbot/_manage/history/202607_history.md`

---

## 2026-07-02 — PRES 템플릿 CSS 버그 수정 + personal.yml author_display 추가 (10:56)

- `platform/templates/html/PRES_presentation_template.html` — `.divider h2{color:#fff}` 추가 (전역 `h2{color:var(--navy-800)}`에 덮어씌워지던 divider 제목 불가시 버그 수정)
- `platform/setup/config/personal.yml` — `author_display: "Jacey(AX전략팀)"` 필드 추가 (`{{META_AUTHOR}}`, `{{SB_FOOT_AUTHOR}}` 기본값)
- `platform/templates/html/PRES-authoring-guide.md` — `{{META_AUTHOR}}`, `{{SB_FOOT_AUTHOR}}`, `{{FOOTER_META}}` 플레이스홀더 설명에 `personal.yml → author_display` 출처 명시

---

## 2026-07-02 — Presentation HTML 템플릿 및 작성 가이드 생성 (08:44)

- `platform/templates/html/PRES_presentation_template.html` 신규 생성 — v3 INFRA_ARCH HTML 기반 협의·기획 문서용 범용 템플릿
- `platform/templates/html/PRES-authoring-guide.md` 신규 생성 — 플레이스홀더 교체 규칙·컴포넌트 사용법·파일명 규칙·작성 체크리스트 포함
- 기준: `INFRA_ARCH_20260630_chatbot-mcp-ecs_v3.html` — 사이드바·Hero·divider·배지·체크리스트·Callout·IntersectionObserver 애니메이션 포함 구조

---

## 2026-07-01 — CLAUDE.md 경량화 완료 — 27KB → 9.7KB (18:35)

- **목적**: Claude Code 세션당 시스템 프롬프트 토큰 절감 (~7,000 → ~2,500 토큰, 64% 감소)
- **Round 1**: 중복 제거 (collab 규칙 압축, README 중복 sub-bullet 제거) — 27KB → 20KB
- **Round 2**: 운영정책 sub-bullet 중복 제거, CI 감시 단락 병합, 12-1 동의검토 fast-path 추가 (COMMON.md 누락 싱크) — 20KB → 19.5KB
- **Round 3**: 운영정책·프로젝트 관리 상세·응답 규칙 10-16 별도 파일 분리 → lazy load 구조
  - `platform/processes/operating_policies.md` (신규, @-import 없음)
  - `platform/processes/project_management.md` (신규, @-import 없음)
  - `platform/processes/response_rules.md` (신규, @-import 없음)
  - CLAUDE.md: 세 섹션 제거 후 포인터 한 줄로 대체

---

## 2026-07-01 — eacct_mcp 인프라 아키텍처 문서 v3 작성 완료 (18:55)

- `projects/eacct_mcp/docs/infra/INFRA_ARCH_20260630_chatbot-mcp-ecs_v3.html` 신규 작성
- v2(EC2) → v3(ECS Fargate + Aurora MySQL) 전환. 좌측 사이드바 내비 추가. 작성자 `Jacey(AX전략팀)`.
- 세부 내용: `projects/eacct_mcp/_manage/history/202607_history.md`

---

## 2026-07-01 — eacct_chatbot 브레인스톰 2개 정비 완료 (17:31)

- 양방향 데이터 연동·ECS Fargate 배포 브레인스톰 히스토리 제거 후 재작성
- 두 collab 병렬 진행 가능 확정. 단일 선행 조건(ECS-3 Aurora schema → 양방향 세션 저장 코드) 명시
- 세부 내용: `projects/eacct_chatbot/_manage/history/202607_history.md`

---

## 2026-07-01 — collab 3개 bundle 전체 기각·Fail 이동·소스 원복 완료 (17:16)

- **결정**: Jacey가 `20260626-1710_eacct-client-side-adapter-g1`, `20260630-1519_ec2-k8s-dual-track-deployment`, `20260630-1519_ec2-k8s-dual-track-service` 3개 collab bundle 전체 기각. 기존 문서 보존 방식(retained baseline·historical approval 누적)이 설계 혼동의 근원으로 판단, 브레인스톰 재검토 후 처음부터 재시작하기로 결정.
- **처리 내용**:
  - 각 bundle DIR/ORC frontmatter에 `status: failed`, `rejected_by: Jacey (2026-07-01 16:50)` 기록
  - `_archive/eacct_chatbot/Fail/`, `_archive/eacct_mcp/Fail/` 폴더 생성 후 이동
  - 빈 namespace 폴더(`collab/eacct_chatbot/`, `collab/eacct_mcp/`) 삭제
  - MAP 3개(`_archive/eacct_chatbot/MAP.md`, `_archive/eacct_mcp/MAP.md`, `collab/MAP.md`) 기각 이력 반영
- **소스 원복**:
  - `taxBillItemWriteLayout.jsp` OnAfterLoad 줄 제거 (git checkout)
  - `js/eacc/chatbot/eacct_chatbot_bootstrap.js` 삭제
  - `freeze_20260701_D02_c5.patch` 삭제
  - `chatbot_dev/prod/stage.properties` 재사용 목적으로 보존
- **기록**: `projects/eacct_chatbot/_manage/decisions.md` D016 / `projects/eacct_mcp/_manage/decisions.md` D016 / lessons_learned 3건 등록
- 세부 내용: `projects/eacct_chatbot/_manage/history/202607_history.md`

---
