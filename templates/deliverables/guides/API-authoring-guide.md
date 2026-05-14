# 인터페이스명세서 (API) — AI 작성 가이드

> **이 문서의 독자는 AI 에이전트입니다.** 화면 사용자에게 노출되지 않습니다.
> 템플릿(`docs/02_design/API_인터페이스명세서.html`)을 복사해 실제 API 명세를 채울 때 반드시 이 가이드를 먼저 로드하십시오.

---

## 0. 작성 절차

1. 템플릿 복사 → `projects/<프로젝트>/docs/02_design/API_<프로젝트명>_인터페이스명세서_<YYYYMMDD>.html`
2. `<meta>` 단일 소스 갱신 (project-id / doc-id / owner / tags / primary-entities)
3. `<title>` — `API · {시스템명} 인터페이스명세서`
4. **§1 개요** — Base URL / 프로토콜 / 버전 정책
5. **§2 인증·인가** — 인증 방식, 토큰 수명, 권한 범위
6. **§3 공통 규약** — 날짜 형식, 페이지네이션, 응답 래퍼
7. **§4 엔드포인트 목록** — 전체 API 목록 + Trace
8. **§5 엔드포인트 상세** — 핵심 API 요청/응답 스키마
9. **§6 오류 코드** — 오류 코드 정의
10. **AI 메타데이터(§7)** 갱신
11. **검증표(§8)** 자동 계산

---

## 1. 필드 마커

| 마커 | 의미 |
|---|---|
| `REQ` | 필수 |
| `OPT` | 선택 |
| `COND` | 조건부 |

---

## 2. ID 명명 규칙

- 엔드포인트: `{PROJECT}-API-###` (3자리 zero-pad)
- 오류 코드: 도메인 코드 문자열 (`INVALID_REQUEST`, `NOT_FOUND` 등) — 별도 순번 불필요
- 번호: 한 번 부여한 ID는 재사용 금지. 삭제 시 행 유지 + "Deprecated" 표기.

---

## 3. 섹션별 작성 규칙

### §1 개요 (REQ)
- Base URL: 운영 / 내부 서비스 URL 모두 명시.
- 프로토콜 / 형식: REST / gRPC / GraphQL / MCP tool 중 선택. JSON 여부.
- 버전 정책: URL 경로 버전 (`/v1/`) / 헤더 버전 중 어느 방식인지. Deprecation 정책.

### §2 인증 / 인가 (REQ)
- 인증 방식 (Bearer JWT / API Key / OAuth2 Client Credentials 등).
- 토큰 수명 (Access / Refresh).
- 권한 범위 (Scope 정의).
- 미인증 시 처리 (401 / 403 구분 기준).

### §3 공통 규약 (REQ)
- 날짜 형식: ISO 8601 권장.
- 페이지네이션: cursor / offset+limit 중 선택. 기본값 / 최대값.
- 응답 래퍼: 성공/오류 구조 예시.
- 멱등성: POST 멱등성 키 정책.

### §4 엔드포인트 목록 (REQ)
- ≥ 3건. REQ-F##와 FUNC-###에 Trace 필수.
- 각 행: ID / 메서드 / 경로 / 설명 / trace-up.
- MCP tool인 경우 메서드 대신 "tool" / 경로는 함수명.

### §5 엔드포인트 상세 (COND — 핵심 API 필수)
- 핵심 엔드포인트 최소 1건은 상세 작성 필수.
- 각 상세: Path Param / Query Param / Request Body 스키마 / 성공 응답 / 오류 케이스.
- 스키마는 JSON 구조로 기술. OpenAPI 3.0 `schema` 블록 그대로 넣어도 됨.

### §6 오류 코드 (REQ)
- ≥ 3건. HTTP 상태 코드 + 도메인 오류 코드 + 원인.
- 모든 가능한 오류를 열거하지 말고, 클라이언트가 핸들링해야 할 오류만.

### §7 AI 메타데이터 (REQ)
- `primary_entities`에 핵심 엔드포인트·기술·인증 방식.
- `embedding_hints`: 이 API가 어떤 시스템의 어떤 기능을 노출하는지 1~2문장.

### §8 검증표 (REQ, 자동)

---

## 4. Trace 작성 원칙

- **상향 의무**: 엔드포인트 → `data-trace-up="REQ-F##,FUNC-###"`.
- 하나의 엔드포인트가 여러 기능 요구사항을 처리하면 콤마 구분.
- MCP tool이라면 해당 tool이 구현하는 기능 정의서 ID로 trace.

---

## 5. 자가 점검 체크리스트

- [ ] `<meta>` 모두 채움
- [ ] Base URL / 프로토콜 명시
- [ ] 인증 방식·토큰 수명·Scope 명시
- [ ] 공통 규약 (날짜·페이지네이션·응답 래퍼)
- [ ] 엔드포인트 ≥ 3건, trace-up 있음
- [ ] 핵심 엔드포인트 상세 ≥ 1건
- [ ] 오류 코드 ≥ 3건
- [ ] AI 메타데이터 모든 키 채움
- [ ] 검증표 전 행 PASS

---

## 6. 사용자에게 질문할 시그널

다음 정보가 없으면 추측 금지, 사용자에 질문:

- 인터페이스 유형 (REST / gRPC / GraphQL / MCP tool)
- 인증 방식 (JWT / API Key / OAuth2 등)
- Base URL (운영 / 스테이징)
- 버전 관리 정책
- 페이지네이션 방식 (cursor / offset)
- 멱등성 요구 여부
- Rate-limit 설정 유무

---

## 7. 흔한 실수

| 실수 | 올바른 처리 |
|---|---|
| 모든 엔드포인트 상세 작성 | 핵심 위주, 단순 CRUD는 목록 + 간략 메모로 충분 |
| 401과 403 구분 없음 | 401 = 인증 실패 / 403 = 인가 실패 (명확 구분) |
| 오류 응답에 스택 트레이스 표기 | 도메인 코드만. 상세는 서버 로그에만 |
| Trace 없음 | 모든 엔드포인트에 REQ-F## 또는 FUNC-### trace |
| MCP tool인데 REST 형식으로 작성 | tool name / parameters / return value 형식으로 조정 |
