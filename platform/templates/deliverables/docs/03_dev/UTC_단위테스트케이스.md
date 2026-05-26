---
doc_id: "{PROJECT}-UTC-01"
doc_type: UTC
project: "{PROJECT}"
title: "단위테스트케이스"
version: "0.1.0"
status: draft
phase: dev
required: true
condition: ""
owner: ""
updated: ""
tags:
  - "#dev"
  - "#test"
  - "#quality"
confluence_path: ""
trace:
  up:
    - "{PROJECT}-FUNC-01"   # 기능 단위로 테스트 케이스 도출
    - "{PROJECT}-SCR-01"    # UI 동작 단위 테스트 (조건부)
    - "{PROJECT}-DAT-01"    # DB 레이어 단위 테스트 (조건부)
    - "{PROJECT}-API-01"    # API 엔드포인트 단위 테스트 (조건부)
  down:
    - "{PROJECT}-ITS-01"    # 단위 테스트 통과 후 통합 테스트로 진행
    - "{PROJECT}-TRC-01"
ai_hints:
  - "테스트 케이스 ID: {PROJECT}-UTC-## (예: UTC-01)"
  - "Given-When-Then 구조 준수"
  - "경계값·예외 케이스·보안 케이스를 Happy Path와 함께 포함"
ai_exclude: []
changelog:
  - version: "0.1.0"
    date: ""
    author: ""
    note: "최초 작성"
---

> **문서 ID** `{PROJECT}-UTC-01` · **단계** dev · **필수** 필수
> **작성 가이드**: [`UTC-authoring-guide.md`](../../guides/UTC-authoring-guide.md)

---

## §1 개요

### 목적
<!-- 이 단위 테스트가 검증하는 기능·컴포넌트 범위 기술 -->

### 테스트 환경

| 항목 | 내용 |
|------|------|
| 테스트 프레임워크 | <!-- 예: pytest, Jest, JUnit --> |
| 목·스텁 방식 | <!-- 예: pytest-mock, jest.mock --> |
| DB | <!-- 예: 인메모리 SQLite, 테스트 DB 픽스처 --> |
| 실행 명령 | `<!-- 예: pytest tests/unit/ -v -->` |

### 커버리지 목표

| 유형 | 목표 |
|------|------|
| 라인 커버리지 | <!-- 예: 80% 이상 --> |
| 브랜치 커버리지 | <!-- 예: 70% 이상 --> |
| 핵심 기능 | <!-- 예: 100% (FUNC-01 ~ FUNC-05) --> |

---

## §2 테스트 케이스 목록

| 케이스 ID | 테스트명 | 대상 (FUNC/SCR/API) | 유형 | 우선순위 |
|---------|--------|------------------|------|---------|
| `{PROJECT}-UTC-01` | <!-- 테스트명 --> | `{PROJECT}-FUNC-01` | Happy Path | P1 |
| `{PROJECT}-UTC-02` | <!-- 테스트명 --> | `{PROJECT}-FUNC-01` | 예외 처리 | P1 |
| `{PROJECT}-UTC-03` | <!-- 테스트명 --> | `{PROJECT}-FUNC-01` | 경계값 | P2 |

> 유형: Happy Path / 예외 처리 / 경계값 / 보안 / 성능 / 동시성

---

## §3 케이스 상세

### `{PROJECT}-UTC-01` — <!-- 테스트명 -->

| 항목 | 내용 |
|------|------|
| 대상 | `{PROJECT}-FUNC-01` |
| 유형 | Happy Path |
| 우선순위 | P1 |

**Given** (전제 조건)
```
- <!-- 시스템 초기 상태 -->
- <!-- 입력 데이터 준비 -->
- <!-- 모킹 설정 -->
```

**When** (실행)
```
- <!-- 호출하는 함수/메서드/엔드포인트 -->
- <!-- 전달하는 입력값 -->
```

**Then** (기대 결과)
```
- <!-- 반환값 또는 상태 변화 -->
- <!-- 호출된 외부 서비스/DB 검증 -->
- <!-- 에러가 발생하지 않음 -->
```

**구현 스켈레톤**

```python
def test_<!-- 케이스명 -->():
    # Given
    <!-- 픽스처·목 설정 -->

    # When
    result = <!-- 호출 -->

    # Then
    assert result.<!-- field --> == <!-- 기대값 -->
```

---

### `{PROJECT}-UTC-02` — <!-- 예외 케이스명 -->

<!-- §3 패턴 반복 -->

---

## §4 공통 픽스처 & 헬퍼

```python
# conftest.py 또는 test_helpers.py

@pytest.fixture
def <!-- 픽스처명 -->():
    """<!-- 픽스처 설명 -->"""
    <!-- 설정 -->
    yield <!-- 픽스처 객체 -->
    <!-- 정리(teardown) -->
```

---

## §5 커버리지 현황 (작성 완료 후 갱신)

| 모듈 | 총 라인 | 커버 라인 | 라인 커버리지 | 브랜치 커버리지 |
|------|--------|---------|-----------|------------|
| <!-- 모듈명 --> | — | — | 0% | 0% |

---

## 추적성 (Traceability)

| 방향 | 연결 문서 | 관계 설명 |
|------|---------|---------|
| ↑ 상위 | FUNC — 기능 단위로 케이스 도출 | 1:N |
| ↑ 상위 | SCR — UI 동작 케이스 (조건부) | 1:N |
| ↑ 상위 | API — 엔드포인트 케이스 (조건부) | 1:N |
| ↓ 하위 | ITS — 단위 통과 후 통합 시나리오로 진행 | N:1 |
| ↓ 하위 | TRC — 추적 매트릭스로 집계 | 자동 |

---

## 검증 체크리스트

- [ ] doc_id 형식: `{PROJECT}-UTC-01` (PREFIX 포함)
- [ ] trace.up에 FUNC 문서 ID 등록 (최소)
- [ ] §2 케이스 목록: 최소 3개 이상
- [ ] §3 각 케이스: Given-When-Then 구조 준수
- [ ] Happy Path + 예외 처리 케이스 모두 포함
- [ ] §4 픽스처: 재사용 가능한 공통 설정 분리
- [ ] 커버리지 목표 기재
- [ ] 모든 ID에 `{PROJECT}-` prefix 적용
