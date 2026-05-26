---
doc_id: "{PROJECT}-API-01"
doc_type: API
project: "{PROJECT}"
title: "인터페이스명세서"
version: "0.1.0"
status: draft
phase: design
required: false
condition: "REST API / MCP tool / 외부 시스템 통합이 있는 프로젝트만 작성"
owner: ""
updated: ""
tags:
  - "#design"
  - "#api"
  - "#integration"
confluence_path: ""
trace:
  up:
    - "{PROJECT}-FUNC-01"   # API는 기능의 외부 노출 인터페이스
    - "{PROJECT}-ARC-01"    # ARC 인터페이스 레이어 구체화
  down:
    - "{PROJECT}-UTC-01"    # API 엔드포인트 단위 테스트
    - "{PROJECT}-ITS-01"    # 외부 연동 통합 테스트 (조건부)
    - "{PROJECT}-TRC-01"
ai_hints:
  - "엔드포인트 ID: {PROJECT}-API-## (예: API-01)"
  - "요청·응답 스키마는 JSON Schema 또는 TypeScript 인터페이스 형식으로 기술"
  - "인증 헤더, 에러 응답 형식은 §2 공통 규격에서 한 번만 정의"
ai_exclude: []
changelog:
  - version: "0.1.0"
    date: ""
    author: ""
    note: "최초 작성"
---

> **문서 ID** `{PROJECT}-API-01` · **단계** design · **필수** 조건부 (API·연동 시)
> **작성 가이드**: [`API-authoring-guide.md`](../../guides/API-authoring-guide.md)

---

## §1 개요

### 목적
<!-- 이 인터페이스명세서가 다루는 API 범위 및 연동 대상 기술 -->

### 엔드포인트 목록

| 엔드포인트 ID | 메서드 | 경로 | 설명 | FUNC 참조 | 인증 필요 |
|------------|------|------|------|---------|---------|
| `{PROJECT}-API-01` | GET | `/api/v1/<!-- 리소스 -->` | <!-- 설명 --> | `{PROJECT}-FUNC-01` | Y |
| `{PROJECT}-API-02` | POST | `/api/v1/<!-- 리소스 -->` | <!-- 설명 --> | `{PROJECT}-FUNC-02` | Y |

---

## §2 공통 규격

### 2.1 기본 URL

| 환경 | Base URL |
|------|---------|
| 개발 | `http://localhost:8000` |
| 스테이징 | `https://api-stage.<!-- 도메인 -->` |
| 운영 | `https://api.<!-- 도메인 -->` |

### 2.2 인증

| 방식 | 헤더 | 설명 |
|------|------|------|
| Bearer Token | `Authorization: Bearer {token}` | <!-- 토큰 발급 방법 --> |

### 2.3 공통 요청 헤더

| 헤더 | 필수 | 설명 |
|------|------|------|
| `Content-Type` | Y (POST/PUT) | `application/json` |
| `Accept` | N | `application/json` |
| `X-Request-ID` | N | 요청 추적용 UUID |

### 2.4 공통 응답 형식

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "request_id": "uuid",
    "timestamp": "ISO-8601"
  }
}
```

### 2.5 공통 에러 응답

| HTTP 상태 | 에러 코드 | 설명 |
|---------|---------|------|
| 400 | `VALIDATION_ERROR` | 요청 데이터 유효성 실패 |
| 401 | `UNAUTHORIZED` | 인증 토큰 없음 또는 만료 |
| 403 | `FORBIDDEN` | 권한 없음 |
| 404 | `NOT_FOUND` | 리소스 없음 |
| 500 | `INTERNAL_ERROR` | 서버 내부 오류 |

---

## §3 엔드포인트 상세

### `{PROJECT}-API-01` — GET `/api/v1/<!-- 리소스 -->`

**기본 정보**

| 항목 | 내용 |
|------|------|
| 설명 | <!-- 이 엔드포인트의 목적 --> |
| FUNC 참조 | `{PROJECT}-FUNC-01` |
| 인증 | 필수 / 불필요 |
| 권한 | `{PROJECT}-ROLE-01` 이상 |

**요청**

```
Query Parameters:
  - page: integer (optional, default: 1)    — 페이지 번호
  - size: integer (optional, default: 20)   — 페이지 크기
  - <!-- param -->: <!-- type -->           — <!-- 설명 -->
```

**응답 (200 OK)**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "<!-- field -->": "<!-- 타입·설명 -->"
      }
    ],
    "total": 100,
    "page": 1,
    "size": 20
  }
}
```

**에러 케이스**

| 상태 | 에러 코드 | 발생 조건 |
|------|---------|---------|
| 400 | `VALIDATION_ERROR` | <!-- 조건 --> |
| 401 | `UNAUTHORIZED` | 토큰 없음 또는 만료 |

---

### `{PROJECT}-API-02` — POST `/api/v1/<!-- 리소스 -->`

<!-- §3 패턴 반복 -->

---

## §4 Rate Limiting · 페이지네이션

| 정책 | 값 | 설명 |
|------|-----|------|
| Rate Limit | <!-- 예: 100 req/min --> | 초과 시 429 응답 |
| 페이지 크기 최대 | <!-- 예: 100 --> | 초과 시 400 응답 |

---

## §5 외부 연동 (해당 시)

| 연동 대상 | 방식 | 엔드포인트 | 인증 | 타임아웃 | 재시도 정책 |
|---------|------|---------|------|--------|---------|
| <!-- 외부 서비스명 --> | REST / MCP / 기타 | <!-- URL 패턴 --> | <!-- 방식 --> | <!-- ms --> | <!-- 재시도 횟수·조건 --> |

---

## 추적성 (Traceability)

| 방향 | 연결 문서 | 관계 설명 |
|------|---------|---------|
| ↑ 상위 | FUNC — 기능의 외부 노출 인터페이스 | N:1 |
| ↑ 상위 | ARC — 인터페이스 레이어 구체화 | 1:1 |
| ↓ 하위 | UTC — 엔드포인트 단위 테스트 | 1:N |
| ↓ 하위 | ITS — 외부 연동 통합 시나리오 | 조건부 |
| ↓ 하위 | TRC — 추적 매트릭스로 집계 | 자동 |

---

## 검증 체크리스트

- [ ] doc_id 형식: `{PROJECT}-API-01` (PREFIX 포함)
- [ ] trace.up에 FUNC·ARC 문서 ID 등록
- [ ] §2 공통 규격: Base URL·인증·공통 응답 형식 기재
- [ ] §3 각 엔드포인트: 요청·응답·에러 케이스 기재
- [ ] §4 Rate Limit·페이지 크기 정책 기재
- [ ] 외부 연동 있을 시 §5 기재
- [ ] 인증 필요 엔드포인트에 권한(ROLE) 명시
- [ ] 모든 ID에 `{PROJECT}-` prefix 적용
