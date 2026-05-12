# HTML → Markdown (RAG) 변환 가이드

본 가이드는 `docs/` 하위 산출물 HTML을 RAG 학습용 Markdown으로 변환할 때 적용하는 규칙을 정의한다.

---

## 1. 파일명 규칙

`{번호}_{ID}_{한글명}.html` / `.md`

- 번호 — 2자리 zero-pad (`00`~`11`)
- ID — 대문자 약어 (REQ, FLW, SCR, ROLE, FUNC, UTC, ITS, ARC, OPM, USM, CFG, TRC)
- 한글명 — 공식 문서 명칭
- variation — 접미사 `_v2`, `_v3`, `_wireframe`

**예시**
```
01_REQ_요구사항정의서.html
02_FLW_프로세스흐름도_v2.html
```

---

## 2. 청크 분할 전략

| 원본 요소 | 청크 단위 | data 속성 |
|---|---|---|
| `<h2>` 섹션 | 섹션 1개 | `data-section-key`, `data-chunk` |
| 요구사항 표 행 | 행 1개 (1 REQ ID = 1 청크) | `data-chunk="req:REQ-F01"`, `data-req-id` |
| 페르소나 / FAQ 카드 | 카드 1개 | `data-chunk="persona:기안자"` 등 |
| 용어 정의 행 | 행 1개 | `data-chunk="term:결재선"` |

**기본 전략**: `heading-h2 + table-row`
- 본문은 H2 섹션 단위로 청크
- 표는 행 단위로 추가 청크 (요구사항 ID 기반 정밀 검색용)

---

## 3. AI-SKIP 영역 (학습 제외)

### 마커 방식

```html
<div class="nav-bar" data-ai-skip="true">...</div>
```

- 학습 제외 요소에 `data-ai-skip="true"` 속성만 사용
- HTML 주석 마커(`<!-- AI-SKIP-START -->`) 사용 금지 — `build-rag.mjs`가 인식하지 않음

### 제외 대상

| 영역 | 사유 |
|---|---|
| `.nav-bar`, `.cf-breadcrumb` | UI 네비게이션 — 본문 의미 없음 |
| `.cf-toc` (목차) | 본문 헤딩과 중복 |
| `.guide-pointer`, `.sum-checklist` | 편집자용 작성 가이드 |
| `.field-hint` | 필드 작성 안내 (메타 지시문) |
| `.val-table` (검증표) | 작성 게이트, 본문 아님 |
| `.cf-footer` (변경이력·관련페이지) | 운영 메타 |

### 변환 스크립트 동작 (`build-rag.mjs`)

```js
function stripAiSkip(document) {
  document.querySelectorAll('[data-ai-skip="true"]').forEach((el) => el.remove());
}
```

---

## 4. Frontmatter 매핑

HTML `<meta>` → YAML frontmatter 자동 매핑.

| HTML | Frontmatter |
|---|---|
| `<meta name="doc-id">` | `doc_id` |
| `<meta name="doc-version">` | `version` |
| `<meta name="doc-tags" content="a, b">` | `tags: [a, b]` (콤마 split) |
| `<meta name="doc-embedding-hints">` | `embedding_hints` (배열) |
| `<meta name="doc-exclude-from-training">` | `exclude_from_training` (bool) |

---

## 5. 요구사항 ID 보존 규칙

- 표 행은 Markdown 표로 유지하되, **ID 컬럼은 굵게** (`**REQ-F01**`)
- HTML 단계에서 각 행에 `id="REQ-F01"` + `data-req-id="REQ-F01"` 부여
- 변환기는 추가로 행별 청크 메타데이터를 추출 가능:
  ```json
  {
    "chunk_id": "req:REQ-F01",
    "req_id": "REQ-F01",
    "priority": "High",
    "trace": ["SCR-001", "FUNC-001"],
    "doc_id": "REQ-APPROVAL-2026"
  }
  ```

---

## 6. 변환 검증 체크리스트

- [ ] frontmatter의 `doc_id` 가 본문 9번 섹션 `doc_id` 와 일치
- [ ] 모든 REQ-### ID가 본문에 그대로 보존됨 (정규식 검증)
- [ ] AI-SKIP 영역이 결과 md 에 없음
- [ ] 표가 Markdown table 로 변환됨 (HTML `<table>` 잔존 0건)
- [ ] H2 = 10개 이내 (REQ 기준 9개 + 검증표 제외)

---

## 7. 산출물

- 입력: `docs/{번호}_{ID}_{한글명}.html`
- 출력: `dist/md/{번호}_{ID}_{한글명}.md`
- 메타: `dist/chunks.jsonl` (요구사항 행 단위 청크 + frontmatter, 벡터 DB 인덱싱용)
- 추적: `dist/traceability.json` (양방향 trace 그래프)
