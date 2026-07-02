<!--
sidebar_title: 2026년 7월
sidebar_order: 1
-->

# 2026년 07월 작업 히스토리

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
