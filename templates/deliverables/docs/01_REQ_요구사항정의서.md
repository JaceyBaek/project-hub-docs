---
doc_id: REQ-APPROVAL-2026
doc_type: requirements-specification
doc_name_ko: 요구사항정의서
doc_name_en: Requirements Specification
version: v0.1
status: Review
last_updated: 2026-04-24
owner: 홍길동 (PM)
epic: PRJ-2026-EM
tags: [phase:analysis, module:core, domain:hr-approval, lang:ko]
related: [FLW, SCR, FUNC, ROLE, UTC, ITS, TRC]
chunk_strategy: heading-h2 + table-row
exclude_from_training: false
embedding_hints:
  - 사내 전자결재 시스템의 기능/비기능 요구사항
  - 종이 결재 → 전자결재 전환, 모바일 지원, 감사 로그 보존
primary_entities: [기안문, 결재선, 승인, 반려, 대결, 모바일 결재]
---

# REQ · 요구사항정의서

> **메타** · 담당자 홍길동(PM) · 버전 v0.1 · 상태 Review · 수정일 2026-04-24 · Epic PRJ-2026-EM · `/DOCS-TMPL/REQ`
> **태그** `#phase:analysis` `#module:core` `#domain:hr-approval`

---

## 1. 개요 {#overview}

본 문서는 **[시스템명]**의 비즈니스·기능·비기능 요구사항을 정의한다. 모든 요구사항 ID(`REQ-###`)는 이후 프로세스흐름도(FLW), 화면정의서(SCR), 기능정의서(FUNC), 테스트(UTC/ITS)로 하향 추적된다.

- **목적** — 종이 결재 프로세스를 전자결재로 전환하여 평균 처리시간을 기존 3일 → 1일 이하로 단축한다.
- **범위 (In)** — 기안·결재선·승인/반려·대결·모바일
- **범위 (Out)** — 급여계산, 회계 전표, 외부 감사 연계
- **성공 기준** — ① 평균 결재 처리시간 ≤ 24h ② 모바일 처리 비중 ≥ 40% ③ 반려율 ≤ 10%

### 1-1. 비즈니스 배경

2018년 사내 결재 프로세스 자동화 TF 운영 이후 재시도. 기존 레거시 그룹웨어는 모바일 미지원.

---

## 2. 용어 정의 (Glossary) {#glossary}

| 용어 | 정의 | 영문/약어 |
|---|---|---|
| 결재선 | 결재자가 순차적으로 승인하는 라인 구조 | Approval Line |
| 전결 | 상위 결재자가 하위 결재를 대신 처리하는 권한 | Delegation |
| 상신 | 작성된 문서를 결재자에게 전달하는 행위 | Submit |
| 합의 | 결재 이전 단계에서 관련 부서 의견을 구하는 절차 | Concurrence |
| 참조 | 결재와 무관하게 내용을 공유받는 사용자 | CC |

---

## 3. 이해관계자 / 페르소나 {#stakeholders}

### Persona A — 기안자
- **역할** 일반 직원 (사원~과장)
- **목표** 빠르게 결재 올리고 처리 현황 확인
- **Pain** 결재선 지정 실수, 반려 사유 불명확

### Persona B — 결재자
- **역할** 팀장/임원
- **목표** 외근 중에도 결재 지연 없이 처리
- **Pain** 첨부 확인 어려움, 모바일 가독성

### Persona C — 시스템 관리자
- **역할** IT 운영팀
- **목표** 장애 없이 운영, 감사 로그 확보
- **Pain** 권한 변경 요청 과다

---

## 4. 비즈니스 요구사항 (BR) {#br}

| ID | 요구사항명 | 설명 | 중요도 | Trace (→) |
|---|---|---|---|---|
| **REQ-B01** | 전자결재 페이퍼리스화 | 종이 결재 프로세스를 전자결재로 대체하여 처리 시간 50% 단축. | High | FLW-001 |
| **REQ-B02** | 모바일 결재 | 외근·출장 중에도 결재 처리 가능한 모바일 경험 제공. | High | FLW-002, SCR-010 |
| **REQ-B03** | 감사 로그 확보 | 결재 이력을 법정 보존기간(5년) 동안 위변조 방지 상태로 보관. | Medium | FUNC-030 |

---

## 5. 기능 요구사항 (FR) {#fr}

| ID | 요구사항명 | 설명 (Given/When/Then) | 중요도 | Trace (→) |
|---|---|---|---|---|
| **REQ-F01** | 기안문 작성 | 사용자는 양식을 선택해 기안문을 작성·임시저장할 수 있다. | High | SCR-001, FUNC-001 |
| **REQ-F02** | 결재선 지정 | 기안자는 결재자·합의자·참조자를 순서대로 지정할 수 있다. | High | SCR-002, FUNC-002 |
| **REQ-F03** | 결재 처리 | 결재자는 승인/반려/보류 중 하나를 선택해 의견과 함께 처리할 수 있다. | High | SCR-003, FUNC-003 |
| **REQ-F04** | 첨부 파일 관리 | 기안자는 20MB 이하 파일을 최대 10개까지 첨부할 수 있다. | Medium | SCR-001, FUNC-004 |
| **REQ-F05** | 대결 / 위임 | 부재 결재자는 대결자를 사전 지정할 수 있으며, 대결자는 위임 기간 동안 결재 처리할 수 있다. | Medium | FUNC-020, ROLE-003 |

---

## 6. 비기능 요구사항 (NFR) {#nfr}

| ID | 카테고리 | 기준 (측정 가능) | 측정방법 |
|---|---|---|---|
| **REQ-N01** | 성능 | 주요 화면 응답 2초 이내 (95th percentile) | APM (Datadog) |
| **REQ-N02** | 가용성 | 월간 가용성 99.5% 이상 | 모니터링 대시보드 |
| **REQ-N03** | 보안 | 개인정보 AES-256 암호화, 전송구간 TLS 1.2+ | 보안 점검 리포트 |
| **REQ-N04** | 호환성 | Chrome/Edge 최신 2버전, iOS/Android 최신 2버전 | QA 매트릭스 |
| **REQ-N05** | 접근성 | WCAG 2.1 AA 준수 | 자동 + 수동 감사 |

---

## 7. 제약 / 가정 사항 {#constraints}

> **Constraint** — 사내 SSO(Okta) 연동 필수. 외부 IdP·소셜 로그인 미지원.

> **Assumption** — 조직도·인사정보는 HR 시스템에서 일 1회 동기화된다. 동기화 실패 시 이전 스냅샷 사용.

> **Risk** — HR 시스템 고도화 일정이 지연될 경우 조직 변경 반영 지연. → 수동 재동기화 배치로 완화.

---

## 8. FAQ {#faq}

**Q. 반려된 문서를 재상신할 수 있나요?**
A. 반려 사유를 반영해 수정 후 재상신 가능. 이력은 원 문서에 누적. (→ REQ-F03)

**Q. 결재자가 부재중일 때는?**
A. 전결/대결 설정이 가능합니다. (→ REQ-F05, ROLE-003)

---

## 9. AI 학습 메타데이터 {#ai-meta}

```yaml
doc_id: REQ-APPROVAL-2026
version: v0.1
last_updated: 2026-04-24
tags: [phase:analysis, module:core, domain:hr-approval, lang:ko]
primary_entities: [기안문, 결재선, 승인, 반려, 대결, 모바일 결재]
embedding_hints:
  - 사내 전자결재 시스템의 기능/비기능 요구사항 정의
  - 종이 결재 → 전자결재 전환, 모바일 지원, 감사 로그 보존
related_docs: [FLW-001..003, SCR-001..030, FUNC-001..030, UTC-*, ITS-*]
exclude_from_training: false
chunk_strategy: heading-h2 + table-row
```
