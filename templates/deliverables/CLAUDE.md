# Claude 산출물 작성 지침

> 본 파일은 Claude Code 등 AI 에이전트가 산출물을 작성·편집할 때 자동으로 읽는 지침이다.
> 사용자가 명시적으로 "산출물 작성 시" 컨텍스트일 때 이 규칙을 따른다.

---

## 1. 작업 시작 전 — 반드시 확인

1. **PROJECT_CODE 확인**: `PROJECTS_GLOBAL.md`의 프로젝트 코드를 그대로 사용한다 (`P{YYMMDD}{N}` 형식).
   - 프로젝트 컨텍스트가 명확하면 별도 질문 불필요. 예: `P2605081` (eacct_mcp)
2. **산출물 종류 확인**: 11종 중 어느 것을 작성하는지 명확히.
3. **참고 자료**: 기존 인터뷰·요구사항·정책 문서가 있는지 확인.
4. **버전·상태**: Draft / Review / Approved 중 어느 단계인지.

## 2. 템플릿 사용

- 템플릿 위치: `platform/templates/deliverables/docs/<단계폴더>/<번호>_<코드>_<이름>.html` (`00_TRC`만 루트). 단계 폴더 매핑은 `platform/project/deliverables_guide.md` 참조
- **새 문서를 만들 때**: 템플릿을 **복사**하지 말고, 신규 프로젝트 폴더로 가져와 메타만 교체한다.
- 본문 작성 시 기존 예시(전자결재)는 **반드시 삭제**하고 실제 도메인 내용으로 교체.

## 3. ID 규칙 (필수)

```
<PROJECT>-<TYPE>-<번호 zero-pad>
예: P2605081-REQ-F01, P2605081-SCR-010, P2605081-FUNC-001
```

- TYPE: `REQ-B` / `REQ-F` / `REQ-N` / `FLW` / `SCR` / `ROLE` / `FUNC` / `UTC` / `ITS` / `ARC` / `OPM` / `USM` / `CFG`
- 번호: 두 자리 zero-pad (`01`, `02` …). 100개 초과 시 세 자리.
- 한 번 부여한 ID는 **삭제하지 않는다** — 폐기 시 `data-deprecated="true"` 추가.

## 4. trace (양방향) — 모든 항목 필수

- `data-trace-up`: 상위 항목 ID (콤마 구분)
- `data-trace-down`: 하위 항목 ID
- `data-trace`: legacy 단방향 (가능하면 down과 동일하게)
- 트레이스 없는 항목은 **금지**. 정말 없으면 `data-trace-up="ORPHAN"` 명시.

## 5. 청크 마킹 (RAG 학습용)

- 각 청크 후보 요소에 `data-chunk="<type>:<id>"`
  - 예: `data-chunk="req:EM2026-REQ-F01"`, `data-chunk="screen:EM2026-SCR-001"`
- 학습 제외 영역에 `data-ai-skip="true"` (주석 마커 사용 금지)
- 자세한 청크 전략: `platform/templates/deliverables/guides/chunk-strategy-matrix.md`

## 6. PII / 시크릿

- 개인정보(이름·이메일·전화)는 `<span data-pii="name">` 등으로 마킹
- 시크릿 값은 `<code data-pii="secret">` — 변환기가 자동 마스킹
- 작성 시 실제 시크릿 절대 입력 금지 (예시도 명백히 가짜로)

## 7. `<meta>` 단일 소스

본문에 사람 이름·버전·날짜·상태를 직접 쓰지 말고 항상 `<meta>` 에만 쓴다.
- `meta-injector.js` 가 메타바·AI메타·변경이력을 자동 주입
- 메타 항목: `project-id, doc-id, doc-type, doc-name-ko, doc-version, doc-status, doc-last-updated, doc-owner, doc-epic, doc-tags, doc-related, doc-chunk-strategy, doc-exclude-from-training, doc-embedding-hints, doc-primary-entities, doc-confluence-base, doc-confluence-path, doc-superseded-by, doc-synonyms, doc-changelog`

## 8. 검증

작성 완료 시점에 다음을 확인:
1. 브라우저로 문서 열기 → 검증표 모든 행 PASS
2. 모든 ID에 PROJECT prefix 있음
3. 모든 항목에 trace 있음
4. `data-ai-skip` 영역에 학습 가치 있는 정보 없음
5. PII 마스킹 적용됨

검증 실패 항목은 사용자에게 명시적으로 보고한다.

## 9. 산출물별 작성 가이드 위치

| 산출물 | 가이드 |
|---|---|
| REQ | `platform/templates/deliverables/guides/01_REQ-authoring-guide.md` |
| FLW/SCR/ROLE/FUNC | `platform/templates/deliverables/guides/chunk-strategy-matrix.md` 의 마크업 예시 |
| 공통 정책 | `platform/templates/deliverables/guides/rag-policy.md` |
| RAG 변환 | `platform/templates/deliverables/guides/RAG-conversion-guide.md` |
| ID 규칙 | `platform/templates/deliverables/guides/ID-namespace.md` |

## 10. 금지 사항

- 새 파일을 임의로 만들지 않는다 — 템플릿 외 형식 추가 금지
- HTML 주석 마커(`<!-- AI-SKIP-START -->`) 사용 금지 — `data-ai-skip` 만 사용
- JSON-LD `TechArticle` 추가 금지 — 검색 노이즈
- `#ai-train:true` 같은 의미 없는 태그 추가 금지
- 하드코딩된 Confluence URL 본문 노출 금지 — 메타로만

## 11. 작성 종료 시

사용자에게 다음을 보고:
- 작성한 문서 ID 목록
- trace 그래프 변경 내역
- 검증표 PASS/FAIL 요약
- 다음 단계 제안 (예: "FUNC를 작성하면 REQ-F01 ~ F05 의 trace가 완성됩니다")
