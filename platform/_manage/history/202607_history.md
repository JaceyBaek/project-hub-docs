<!--
sidebar_title: 2026년 7월
sidebar_order: 1
-->

# 2026년 07월 작업 히스토리

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
