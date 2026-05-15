# Platform Enhancements (Backlog)

> 플랫폼 차원 백로그 — 기능 개선·신규 기능·운영 개선 항목. 프로젝트별 `_manage/todo.md`와 분리.
> 우선순위: 높음 · 보통 · 낮음 / 상태: 대기 · 진행중 · 완료 · 보류

---

## E-001 — collab 옵트인 제안 자동화 (라이프사이클 통합)

- 등록일: 2026-05-15
- 우선순위: 보통
- 상태: 대기
- 관련: `platform/processes/collab/`, `platform/project/project_lifecycle.md`

### 배경
collab은 옵트인 프로세스 모듈이지만 현재는 트리거를 직접 입력해야 시작된다. 프로젝트 라이프사이클상 **설계 단계 진입 시점**에 비서가 자동으로 사용 여부를 묻고, 협업 AI(외부 도구 또는 추가 페르소나)를 지정받아 collab 시작을 가속화한다.

### 범위 (안)
1. `project_lifecycle.md`에 "설계 단계 진입" 정의·트리거 추가
2. 설계 단계 진입 시 비서가 옵트인 제안 (yes/no)
3. yes 선택 시 협업 AI 지정 (Codex / Claude Code 2번째 세션 / Gemini / 추가 페르소나 등)
4. 선택값을 `projects/{p}/_manage/collab/config.yml` (또는 동등 위치)에 저장 → 이후 collab 트리거 frontmatter 기본값에 반영
5. 페르소나 카드는 `platform/processes/collab/personas/{name}.md`로 정의

### 검토 필요 사항
- Claude Code 두 세션 동시 운영 시 메모리 공유·git 충돌·토큰 비용
- 4-eyes 검증 효과: 동일 모델 2개 vs 이종 모델(Codex 등)의 관점 차이
- 페르소나 카드 표준 구조 (이름·말투·검토 관점·금지 사항)

---

## E-003 — collab 기존 9개 문서에 `## 0. 문서 목적` 블록 일괄 추가

- 등록일: 2026-05-15
- 완료일: 2026-05-15
- 우선순위: 낮음
- 상태: **완료**
- 관련: `platform/processes/collab/PLATFORM/DIR_20260514-1554_*/`, `platform/processes/collab/PLATFORM/DIR_20260515-0836_*/`

### 배경
DEV_D001 마이그레이션 후 신규 collab 문서·템플릿에 `## 0. 문서 목적` 블록을 표준화함. 기존 9개 active 문서(1554/0836 direction, D001~D006 detail, O001 orchestration)는 historical record 보존 관점에서 본 마이그레이션 범위에서 제외됨.

### 범위
- 9개 active 문서에 §0 블록 일괄 삽입 (§1 앞) — 완료
- §0 내용은 문서별 주제·역할·범위·다음 단계 수동 작성 — 완료
- archive 2건은 제외 (불변 원칙)

### 결과
- 1554 direction + D001~D006 + O001 (1554 bundle 8건) + 0836 direction (1건) = 9건 §0 추가 완료
- DEV_D001 마감 직후 진행 (시한부 동결 §16 효력 종료 후)

---

## E-002 — collab MAP / INDEX 프로젝트별 분산 이전

- 등록일: 2026-05-15
- 우선순위: 낮음
- 상태: 대기
- 관련: `platform/processes/collab/MAP.md`, `platform/processes/collab/archive/INDEX.md`

### 배경
현재 collab은 단일 글로벌 MAP/INDEX로 운영한다 (모든 프로젝트 collab 문서를 `platform/processes/collab/` 한 곳에서 관리). 성숙기(프로젝트 20~30개·산출물 다수)에는 글로벌 MAP이 비대해져 가독성·관리성이 떨어진다.

### 범위 (안)
1. 글로벌 MAP/INDEX는 플랫폼 자체 design(`project: PLATFORM`) 전용으로 축소
2. 프로젝트별 MAP/INDEX 신설: `projects/{p}/_manage/collab/MAP.md`, `archive/INDEX.md`
3. collab 문서 위치도 함께 분산: `projects/{p}/_manage/collab/{...}.md`
4. 글로벌 ↔ 프로젝트 cross-link 규칙
5. 마이그레이션 절차 (현 단계의 수동 이전 방식과 연계)

### 트리거 조건 (검토용)
- 동시 진행 프로젝트가 10개 이상 또는 글로벌 MAP 노드가 30개 이상이면 본 항목 우선순위 상향

---
