# ID 네임스페이스 규칙

## 핵심 원칙

**모든 항목 ID는 `{PROJECT_CODE}-{TYPE}-{NN}` 형식을 따른다.**

```
P2605081-REQ-F01
└──────┘ └─┘ └─┘
   │      │   └─ 일련번호 (2자리 zero-pad)
   │      └───── 항목 타입 (REQ-F, REQ-B, REQ-N, FLW, SCR, ...)
   └──────────── 프로젝트 코드 = PROJECTS_GLOBAL.md 코드와 동일
```

## 프로젝트 코드 (PROJECT_CODE)

- **형식**: `P{YYMMDD}{N}` (8자 고정, 대문자+숫자)
  - `P` 고정 접두사 + 연월일 6자리(YY·MM·DD) + 시퀀스 1자리
  - 예: `P2605081` = 2026년 05월 08일 첫 번째 프로젝트
- **유일성**: `PROJECTS_GLOBAL.md` 코드와 1:1 매핑 — 별도 관리 불필요
- **자동 생성**: `platform/init_project.py` 실행 시 날짜+시퀀스로 자동 부여
- **금지**: 하이픈, 언더스코어, 공백, 한글

### 예시

| 프로젝트 | 코드 | 비고 |
|---|---|---|
| eacct_mcp (2026-05-08 첫 번째) | `P2605081` | |
| gmail_cleaner (2026-05-06 첫 번째) | `P2605061` | |
| wiki_faq_builder (2026-04-22 첫 번째) | `P2604221` | |

## 타입 코드 (TYPE)

| 약어 | 뜻 | 예 |
|---|---|---|
| `REQ-B` | 비즈니스 요구사항 | `P2605081-REQ-B01` |
| `REQ-F` | 기능 요구사항 | `P2605081-REQ-F01` |
| `REQ-N` | 비기능 요구사항 | `P2605081-REQ-N01` |
| `FLW` | 프로세스 흐름 | `P2605081-FLW-001` |
| `SCR` | 화면 | `P2605081-SCR-001` |
| `ROLE` | 역할 | `P2605081-ROLE-001` |
| `FUNC` | 기능 | `P2605081-FUNC-001` |
| `UTC` | 단위 테스트 | `P2605081-UTC-001` |
| `ITS` | 통합 테스트 | `P2605081-ITS-001` |

## 메타데이터 매핑

각 문서 `<head>`에 다음 메타 추가:

```html
<meta name="project-id" content="P2605081">
<meta name="doc-id" content="P2605081-REQ-2026">
```

frontmatter 출력:

```yaml
project_id: P2605081
doc_id: P2605081-REQ-2026
```

## RAG 검색 이점

```python
# 프로젝트 단위 필터링
filter: { project_id: "P2605081" }

# ID 충돌 방지
"REQ-F01"이 두 프로젝트에 동시 존재해도
P2605081-REQ-F01 vs P2605061-REQ-F01 로 구분됨
```

## 마이그레이션 (기존 → 신규)

| 기존 | 신규 |
|---|---|
| `REQ-F01` | `{PROJECT_CODE}-REQ-F01` |
| `FLW-001` | `{PROJECT_CODE}-FLW-001` |

표 행의 `id`, `data-req-id`, `data-trace`, 본문 텍스트 모두 일괄 prefix 부착.

## 검증

`platform/tools/rag/build-rag.mjs` 실행 시 다음 위반 감지:

1. `project_id` 메타 누락 → WARN
2. `data-req-id`가 prefix 없이 시작 → WARN
3. `data-trace` 항목이 prefix 없이 시작 → WARN
4. 같은 `doc_id`가 두 파일에 존재 → ERROR
