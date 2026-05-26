# 권한정의서 (ROLE) — AI 작성 가이드

> **이 문서의 독자는 AI 에이전트입니다.** 화면 사용자에게 노출되지 않습니다.
> 템플릿(`docs/02_design/ROLE_권한정의서.html`)을 복사해 실제 권한을 채울 때 반드시 이 가이드를 먼저 로드하십시오.

---

## 0. 작성 절차

1. 템플릿 복사 → `projects/<프로젝트>/docs/02_design/ROLE_<프로젝트명>_권한정의서_<YYYYMMDD>.html`
2. `<meta>` 단일 소스 갱신 (project-id / doc-id / owner / tags / primary-entities)
3. `<title>` — `ROLE · {시스템명} 권한정의서`
4. **역할 정의(§2)** — 시스템 내 모든 Role 카탈로그
5. **권한 매트릭스(§3)** — Role × Resource × Action(CRUD) 표
6. **위임/대결(§4)** — 권한 위임 규칙 (선택)
7. **AI 메타데이터(§5)** 갱신
8. **검증표(§6)** 자동 계산, 모든 행 PASS

---

## 1. 필드 마커

| 마커 | 의미 |
|---|---|
| `REQ` | 필수 |
| `OPT` | 선택 |
| `COND` | 조건부 (예: 위임 시 종료일 필수) |

---

## 2. ID 명명 규칙

- 역할: `{PROJECT}-ROLE-##` (예: `EM2026-ROLE-01` = 일반사용자)
- 권한 그룹: `{PROJECT}-PERM-##` (역할에 묶을 권한 묶음)
- 리소스: `{PROJECT}-RES-##` (선택 — 화면/엔드포인트/데이터 단위)
- 시스템 Role은 reserved (예: ROLE-00 = System, ROLE-99 = Admin)

---

## 3. 섹션별 작성 규칙

### §1 개요 (REQ)
- 권한 모델 명시: RBAC / ABAC / Hybrid 중 무엇인지.
- 인증·인가 분리 정책 1문장.

### §2 역할 정의 (REQ)
- 칼럼: ID / 역할명 / 설명 / 부여 기준 / 상위 역할(상속).
- 역할 카드 속성: `data-chunk="role:{ID}"`, `data-trace-down="PERM-##,..."`
- 모든 역할은 **부여 기준**(예: 직책, 부서, 신청·승인) 필수.

### §3 권한 매트릭스 (REQ) — **가장 중요**
- 형식: Role × Resource × Action(C/R/U/D/X) 표.
- 각 셀: `Y` / `N` / `COND:조건` 중 하나. 빈 셀 금지.
- 표가 너무 크면 Resource 그룹별로 분할하고 청크도 분할 (`data-chunk="matrix:GROUP_NAME"`).
- 화면 SCR-### 단위 권한도 매트릭스에 포함하거나, §3.2 별표로 분리.

### §4 위임/대결 (OPT)
- 위임 규칙: 위임 가능 권한 / 위임 기간 / 위임 한도(N단계).
- 대결(代決) 규칙: 부재 시 자동 대결자 지정 로직.

### §5 AI 메타데이터 (REQ)
- `primary_entities`에 핵심 Role/Resource 키워드.

### §6 검증표 (REQ, 자동)
- Role ≥ 1건 / 매트릭스 빈셀 0 / 매트릭스에 정의 안 된 Role·Resource 없음 / Trace 전건.

---

## 4. Trace 작성 원칙

- **양방향 필수**:
  - `data-trace-up` — 상위 REQ-F##, REQ-N## (보안 NFR)
  - `data-trace-down` — 하향 SCR-### (해당 권한이 적용되는 화면), FUNC-### (백엔드 인가 체크)
- SCR/FUNC 측에서 ROLE-## 를 trace-up에 적기보다, ROLE 측에서 trace-down으로 매핑하는 것이 일반적.
- 모든 ID에 프로젝트 prefix.

---

## 5. 자가 점검 체크리스트

- [ ] `<meta>` 모두 채움
- [ ] 모든 역할에 부여 기준 명시
- [ ] 권한 매트릭스 빈 셀 0건
- [ ] COND 셀은 조건 1줄 이상 (예: `COND:본인 작성건만`)
- [ ] 매트릭스에 정의 안 된 Role·Resource 없음 (§2와 1:1)
- [ ] System / Admin / Guest 등 시스템 Role 정의
- [ ] 위임 가능 권한 목록 (위임 모델 사용 시)
- [ ] 모든 항목 trace-up/down
- [ ] 검증표 전 행 PASS

---

## 6. 사용자에게 질문할 시그널

- 권한 모델 (RBAC / ABAC / Hybrid)
- 역할 수 대략 (~5개 / ~20개 / 50+)
- 권한 부여 절차 (자동 / 신청·승인 / 관리자 직접)
- 위임/대결 필요 여부
- 권한 만료/회수 규칙
- 외부 IdP 연동 (LDAP/AD/OIDC)
- 권한 변경 이력 추적 필요 여부 (감사 로그)
- 데이터 행 단위 권한(Row-Level Security) 필요 여부

---

## 7. 흔한 실수

| 실수 | 올바른 처리 |
|---|---|
| 매트릭스에 빈 셀 방치 | 모든 셀을 Y/N/COND로 채움 |
| COND를 "조건부" 1단어로만 표기 | 구체 조건 명시 (예: `COND:본인 부서만`) |
| 시스템 Role 누락 (Guest/Admin) | reserved Role 항상 정의 |
| 역할 부여 기준 누락 | 직책/부서/신청 등 명시 |
| 권한 상속 관계 누락 | "상위 역할" 칼럼으로 표기 |
| SCR/FUNC 측에 권한 정보 분산 | ROLE 문서를 단일 진실 소스로 유지 |
| 위임 한도 미정의 | 위임 단계(N) / 종료일 / 회수 조건 명시 |
