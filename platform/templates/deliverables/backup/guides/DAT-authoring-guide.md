# 데이터모델정의서 (DAT) — AI 작성 가이드

> **이 문서의 독자는 AI 에이전트입니다.** 화면 사용자에게 노출되지 않습니다.
> 템플릿(`docs/02_design/DAT_데이터모델정의서.html`)을 복사해 실제 데이터 모델을 채울 때 반드시 이 가이드를 먼저 로드하십시오.

---

## 0. 작성 절차

1. 템플릿 복사 → `projects/<프로젝트>/docs/02_design/DAT_<프로젝트명>_데이터모델정의서_<YYYYMMDD>.html`
2. `<meta>` 단일 소스 갱신 (project-id / doc-id / owner / tags / primary-entities)
3. `<title>` — `DAT · {시스템명} 데이터모델정의서`
4. **§1 개요** — 저장소 목록, 테이블 수, 명명 규칙
5. **§2 엔티티 목록** — 핵심 테이블 카탈로그 + Trace (REQ)
6. **§3 ERD** — 다이어그램 삽입 또는 alt-text 텍스트 ERD
7. **§4 테이블 상세** — 각 테이블 컬럼 정의
8. **§5 관계 정의** — FK 목록, 카디널리티
9. **§6 인덱스 / 파티션** — 성능 인덱스 목록
10. **§7 데이터 정책** — 보존·마이그레이션·백업
11. **AI 메타데이터(§8)** 갱신
12. **검증표(§9)** 자동 계산

---

## 1. 필드 마커

| 마커 | 의미 |
|---|---|
| `REQ` | 필수 |
| `OPT` | 선택 |
| `COND` | 조건부 |

---

## 2. ID 명명 규칙

- 엔티티: `{PROJECT}-DAT-E##` (핵심 테이블/엔티티)
- 관계: `{PROJECT}-DAT-R##` (FK 관계)
- 인덱스: `{PROJECT}-DAT-I##`
- 데이터 정책: `{PROJECT}-DAT-P##`
- 번호: 2자리 zero-pad. 한 번 부여한 ID는 재사용 금지.

---

## 3. 섹션별 작성 규칙

### §1 개요 (REQ)
- 주요 저장소 유형 목록 (RDBMS / NoSQL / 캐시 / 큐 / 파일 등).
- 전체 테이블 수 (예상치라도 명시).
- 명명 규칙: snake_case 여부, PK 전략, 공통 컬럼 (created_at/updated_at/deleted_at).

### §2 엔티티 목록 (REQ)
- ≥ 2건. 핵심 도메인 엔티티 우선.
- 각 엔티티: 테이블명 / 저장소 / 설명 / Trace (↑ REQ-F##).
- trace-up: 해당 엔티티를 필요로 하는 기능 요구사항 ID.

### §3 ERD (REQ)
- 이미지 삽입이 가능하면 `<img>` 태그 사용.
- 이미지 없으면 `<div class="diagram" data-alt="...">` 의 alt 텍스트에 텍스트 형태 ERD 기술 필수.
  ```
  # alt-text 형태 예시
  users(1) --- (*) drafts
  drafts(1) --- (*) approvals
  ```
- alt-text가 RAG 청크 본문으로 사용됨. 엔티티 관계를 최대한 명확하게 서술.

### §4 테이블 상세 (REQ)
- 각 주요 테이블별 h3 소제목 + 컬럼 정의 테이블.
- 컬럼 정의 필수 항목: 컬럼명 / 타입 / PK / FK / NN(NOT NULL) / 기본값 / 설명.
- 각 행: `data-chunk="col:{table}.{column}"`.
- 전체 테이블을 다 쓸 필요 없음 — 핵심 도메인 테이블 우선, 설정·코드 테이블은 OPT.

### §5 관계 정의 (REQ)
- FK 관계 ≥ 1건.
- 각 관계: ID / 부모 컬럼 / 자식 FK 컬럼 / 카디널리티 / ON DELETE 정책.
- N:M 관계는 중간 테이블(Junction Table)을 별도 엔티티로 표기.

### §6 인덱스 / 파티션 (REQ)
- ≥ 1건. 운영에서 실제 쓰는 쿼리 기준으로 작성.
- 인덱스 항목: ID / 테이블 / 컬럼(들) / 타입 / 목적.
- 범위 파티션·리스트 파티션이 있으면 파티션 전략도 표기.

### §7 데이터 정책 (REQ)
- 보존 정책: 각 엔티티 보존 기간, 만료 후 처리 (soft-delete / archive / purge).
- 백업 / 복구: 주기, 보존 기간, RPO/RTO 수치.
- 마이그레이션: 스키마 변경 도구 (Flyway / Liquibase 등), Breaking change 처리 원칙.
- 법적 보존 의무가 있으면 근거 법령 명시.

### §8 AI 메타데이터 (REQ)
- `primary_entities`에 핵심 테이블명·기술 키워드.
- `embedding_hints`는 "어떤 시스템의 어떤 데이터 구조" 1~2문장.

### §9 검증표 (REQ, 자동)

---

## 4. Trace 작성 원칙

- **상향 의무**: 엔티티 → `data-trace-up="REQ-F##"` (기능 요구사항).
- ARC에서 데이터 아키텍처를 이미 정의했다면 `data-trace-up`에 ARC ID도 추가.
- 하향(trace-down): 이 데이터를 FUNC(기능)이 참조하면 FUNC-ID로 표기.

---

## 5. 자가 점검 체크리스트

- [ ] `<meta>` 모두 채움
- [ ] 엔티티 목록 ≥ 2건, trace-up 있음
- [ ] ERD alt-text 또는 다이어그램 존재
- [ ] 주요 테이블 컬럼 정의 (PK/FK/NN/기본값)
- [ ] FK 관계 ≥ 1건, ON DELETE 명시
- [ ] 인덱스 ≥ 1건
- [ ] 데이터 보존·백업·마이그레이션 정책 모두 있음
- [ ] AI 메타데이터 모든 키 채움
- [ ] 검증표 전 행 PASS

---

## 6. 사용자에게 질문할 시그널

다음 정보가 없으면 추측 금지, 사용자에 질문:

- DB 엔진 (PostgreSQL / Oracle / MSSQL / MySQL)
- ORM 또는 쿼리 방식 (JPA / MyBatis / 직접 SQL)
- PK 전략 (BIGSERIAL / UUID / Sequence)
- 소프트 딜리트 여부 (deleted_at 사용 여부)
- 파티셔닝 필요 여부 (예상 데이터 볼륨)
- 보존 기간 (법적 요건 포함)
- RPO / RTO 목표

---

## 7. 흔한 실수

| 실수 | 올바른 처리 |
|---|---|
| ERD 없이 테이블 나열 | alt-text라도 관계 서술 필수 |
| NN(NOT NULL) 누락 | 컬럼마다 NN 여부 명시 |
| ON DELETE 미표기 | FK 관계마다 RESTRICT / CASCADE / SET NULL 중 선택 |
| 인덱스 없음 | 운영 쿼리 기준 최소 1개 |
| 보존 정책 "추후 결정" | 법정 의무 확인 후 기간 명시, 없으면 "정책 없음" |
| N:M 직접 표기 | 중간 테이블 엔티티로 분리 |
