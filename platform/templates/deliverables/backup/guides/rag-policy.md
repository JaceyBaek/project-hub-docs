# RAG 운영 정책 (9~16번 통합)

`<meta>` 태그를 단일 소스로 두고, `build-rag.mjs` + `meta-injector.js` + `doc-validator.js` 가
이 정책을 자동 적용한다.

---

## 9. 버전 관리 (`superseded_by` + auto exclude)

### 마크업
```html
<meta name="doc-version" content="v2.0">
<meta name="doc-superseded-by" content="">          <!-- 최신본은 빈 값 -->
```

옛 버전은:
```html
<meta name="doc-version" content="v1.0">
<meta name="doc-superseded-by" content="EM2026-REQ-2026-v2">
<meta name="doc-exclude-from-training" content="true">
```

### 변환기 동작
- `doc-superseded-by` 가 비어있지 않으면 자동으로 `exclude_from_training=true` 처리
- `dist/chunks.jsonl` 에서 누락 → RAG 인덱스에서 자동 제외
- `dist/md/` 에는 frontmatter 만 남기고 본문 제외

### 보존 위치
- `docs/_archive/` 로 이동 (이미 적용됨, README 참고)

---

## 10. synonyms 사전

### 마크업
```html
<meta name="doc-synonyms"
      content='{"결재":"approval,승인","기안":"draft,상신","반려":"reject,거절"}'>
```

### 변환기 동작
- chunks.jsonl 의 각 청크에 `synonyms` 필드로 첨부
- 임베딩 시 본문 + synonyms 병합 후 인코딩 → 구어체/영문 쿼리 매칭률↑

### 공통 사전 (모든 문서 상속)
`platform/templates/deliverables/guides/synonyms-global.json` 에 도메인 공통 사전을 두고, `--synonyms` 옵션으로 전달하면 변환기가 자동 머지한다.

```bash
node platform/tools/rag/build-rag.mjs --synonyms platform/templates/deliverables/guides/synonyms-global.json
```

- 전역 사전 + 문서별 `<meta name="doc-synonyms">` 가 병합되어 각 청크의 `synonyms` 필드로 삽입됨
- 사전 파일 위치: `platform/templates/deliverables/guides/synonyms-global.json`

```json
{
  "결재": "approval, 승인",
  "기안": "draft, 상신, 작성",
  "반려": "reject, 거절",
  "대결": "delegation, 위임",
  "참조": "cc, carbon copy"
}
```

---

## 11. PII 마킹 (`data-pii` + redact)

### 마크업
```html
<span data-pii="name">홍길동</span>
<code data-pii="secret">0oa1b2c3d4e5</code>
<span data-pii="email">user@example.com</span>
```

### 변환기 동작
- `doc-redact-pii` (기본 true) 이면:
  - `data-pii="name"` → `[담당자]`
  - `data-pii="secret"` → `[REDACTED]`
  - `data-pii="email"` → `[email]`
  - `data-pii="phone"` → `[phone]`
- chunks.jsonl 본문에 마스킹 적용 → 인사이동/외부 공개 시 안전

### 예외
- `data-pii-keep="true"` 가 같은 요소에 있으면 마스킹 안 함 (예: 시스템계정)

---

## 12. Confluence 경로

### 처리 규칙
- `<meta name="doc-confluence-base">` 에 base URL이 있으면 → 메타바 경로를 자동 anchor 링크화
- base URL이 없으면 → 경로 자체를 메타바에서 제거 (변환기 + meta-injector 둘 다)
- 의미 없는 텍스트로 노이즈 만들지 않음

```html
<meta name="doc-confluence-base" content="https://wiki.example.com">
<meta name="doc-confluence-path" content="/DOCS-TMPL/REQ">
```
→ 렌더 결과: `<a href="https://wiki.example.com/DOCS-TMPL/REQ">/DOCS-TMPL/REQ</a>`

---

## 13. `#ai-train:true` 태그 — 제거

전체 문서가 학습 대상인 게 기본. `doc-exclude-from-training` 메타로 충분.
- 모든 템플릿에서 `<span class="tag">#ai-train:true</span>` 삭제 (메타바 영역)
- 대신 학습 제외 문서는 메타바에 빨간 칩으로 명시: `<span class="tag warn">학습 제외</span>` (meta-injector 자동)

---

## 14. JSON-LD `TechArticle` — 제거

사내 RAG 검색에는 효과 없음. 변환기가 무시함. 템플릿에서 일괄 삭제.
- 외부 검색엔진 노출이 필요할 때만 별도 빌드로 추가

---

## 15. 변경 이력 자동화 (Git log)

### 방향
- 손으로 표 작성 → Git log 기반 자동 생성
- `doc-changelog` meta 가 비어있으면 `meta-injector.js` 가 footer 표를 빈 채로 둠
- 빌드 파이프라인에서 `git log --pretty='{"version":"...","date":"%aI","author":"%an","note":"%s"}'` 결과를 meta 에 주입

### CI 훅 (참고)
```bash
# scripts/inject-changelog.sh
HISTORY=$(git log --follow --pretty='{...}' "$FILE" | jq -s .)
sed -i "s|<meta name=\"doc-changelog\" content=\"\[\]\">|<meta name=\"doc-changelog\" content='$HISTORY'>|" "$FILE"
```

---

## 16. print CSS

`assets/wireframe.css` 끝에 다음 추가:

```css
@media print {
  .nav-bar,
  .cf-breadcrumb,
  .cf-toc,
  .cf-footer,
  .guide-pointer,
  .sum-checklist,
  .field-hint,
  [data-ai-skip="true"] { display: none !important; }

  .cf-shell { box-shadow: none; padding: 0; max-width: none; }
  .cf-body { display: block; }
  .cf-content { padding: 0; }
  body { background: white; }

  /* 표 줄바꿈 방지 */
  tr, .frame, .callout { page-break-inside: avoid; }
  h2, h3 { page-break-after: avoid; }

  /* 링크는 URL 인쇄 */
  a[href]::after { content: " (" attr(href) ")"; font-size: 10px; color: #666; }
  a[href^="#"]::after { content: ""; }

  @page { margin: 18mm 16mm; }
}
```

---

## 적용 우선순위

| 항목 | 즉시 | 변환기 | 가이드만 |
|---|---|---|---|
| 9 superseded_by | meta 추가 | exclude 자동 | ✓ |
| 10 synonyms | meta 추가 | chunks 머지 | ✓ |
| 11 PII | data-pii 마킹 | 변환 시 마스킹 | ✓ |
| 12 Confluence | meta 분리 | meta-injector 처리 | ✓ |
| 13 ai-train 태그 | 일괄 삭제 | — | — |
| 14 JSON-LD | 일괄 삭제 | 변환기 무시 | — |
| 15 changelog | meta 비움 | CI 자동 주입 | ✓ |
| 16 print CSS | wireframe.css | — | — |
