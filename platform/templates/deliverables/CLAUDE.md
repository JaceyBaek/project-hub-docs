# Claude 산출물 작성 지침

> 본 파일은 Claude Code 등 AI 에이전트가 산출물을 작성·편집할 때 자동으로 읽는 지침이다.
> 사용자가 명시적으로 "산출물 작성 시" 컨텍스트일 때 이 규칙을 따른다.

---

## 0. MD-first 원칙

**MD 파일이 1차 소스다.** HTML은 웹뷰 렌더링 전용 뷰 레이어다.

| 파일 | 역할 | 작성 시점 |
|------|------|---------|
| `{TYPE}_{이름}.md` | **원본** — 내용 작성·수정은 여기서만 | 항상 |
| `{TYPE}_{이름}.html` | **뷰** — 웹뷰로 렌더링 (향후 자동 생성) | 배포 시 |

> 산출물 내용 변경 시 반드시 `.md` 파일을 수정한다. HTML 직접 편집 금지.

---

## 1. 작업 시작 전 — 반드시 확인

1. **PROJECT_CODE 확인**: `PROJECTS_GLOBAL.md`의 프로젝트 코드를 그대로 사용한다 (`P{YYMMDD}{N}` 형식).
   - 프로젝트 컨텍스트가 명확하면 별도 질문 불필요. 예: `P2605081` (eacct_mcp)
2. **산출물 종류 확인**: 15종 중 어느 것을 작성하는지 명확히. 옵션 산출물은 사용 조건 충족 여부 확인 (`platform/project/deliverables_guide.md` §산출물 종류 참조).
3. **참고 자료**: 기존 인터뷰·요구사항·정책 문서가 있는지 확인.
4. **버전·상태**: draft / review / approved 중 어느 단계인지.

## 2. 템플릿 사용

- **MD 템플릿 위치**: `platform/templates/deliverables/docs/<단계폴더>/<TYPE>_<이름>.md` (`TRC`만 루트)
- **새 문서를 만들 때**: MD 템플릿을 `projects/{프로젝트}/docs/<단계폴더>/`로 복사 후 frontmatter와 본문 작성.
- 복사 후 `{PROJECT}` placeholder를 실제 프로젝트 코드로 일괄 치환.
- 기존 예시·주석(`<!-- -->`)은 **반드시 삭제**하고 실제 도메인 내용으로 교체.

## 3. ID 규칙 (필수)

```
<PROJECT>-<TYPE>-<번호 zero-pad>
예: P2605081-REQ-F01, P2605081-SCR-010, P2605081-FUNC-001
```

- TYPE: `REQ-B` / `REQ-F` / `REQ-N` / `FLW` / `SCR` / `ROLE` / `FUNC` / `DAT` / `API` / `SEC` / `UTC` / `ITS` / `ARC` / `OPM` / `USM` / `CFG` / `RUN`
- 번호: 두 자리 zero-pad (`01`, `02` …). 100개 초과 시 세 자리.
- 한 번 부여한 ID는 **삭제하지 않는다** — 폐기 시 `data-deprecated="true"` 추가.

## 4. trace (양방향) — 모든 항목 필수

**MD frontmatter에서 trace를 관리한다.**

```yaml
trace:
  up:
    - "{PROJECT}-REQ-F01"   # 이 항목이 참조하는 상위 문서 ID
  down:
    - "{PROJECT}-FUNC-01"   # 이 항목을 참조하는 하위 문서 ID
```

- `trace.up`: 빈 배열 허용은 TRC·REQ만. 나머지 산출물은 반드시 1개 이상.
- `trace.down`: 작성 시점에 확정된 하위 ID만 등록. 빈 배열 허용.
- Orphan(추적 불가) 항목은 `trace.up: ["ORPHAN"]` 명시 + 이유 주석.

## 5. 청크 마킹 (RAG 학습용)

MD에서 청크 단위는 **헤딩 구조**로 자동 분할된다.

- 헤딩 레벨: H2(`##`) = 섹션 청크, H3(`###`) = 서브 청크
- 학습 제외 영역: 헤딩 뒤 `<!-- ai-skip -->` 주석 (줄 시작) 삽입
- 테이블 행은 행 단위로 추가 분할 (RAG 변환기 자동 처리)
- 자세한 청크 전략: `platform/templates/deliverables/guides/chunk-strategy-matrix.md`

## 6. PII / 시크릿

- 개인정보 포함 필드: 해당 행·항목에 `> **[PII]**` 경고 마킹
- 시크릿 값은 절대 기재 금지 — keyring 등록 명령어만 기술 (CFG §3 패턴 참조)
- 마스킹 패턴 예: `홍**` / `hj****@gsretail.com` / `010-****-1234`

## 7. frontmatter 단일 소스

MD 본문에 담당자·버전·날짜·상태를 직접 쓰지 말고 항상 **frontmatter**에만 쓴다.

```yaml
doc_id: "{PROJECT}-{TYPE}-01"
doc_type: {TYPE}
project: "{PROJECT}"
version: "0.1.0"
status: draft           # draft | review | approved
owner: ""
updated: ""             # YYYY-MM-DD
tags: []
trace:
  up: []
  down: []
ai_hints: []
ai_exclude: []
changelog:
  - version: "0.1.0"
    date: ""
    author: ""
    note: "최초 작성"
```

- HTML 뷰 렌더 시 frontmatter → meta 태그로 자동 변환 (향후 파이프라인 처리)

## 8. 검증

작성 완료 시점에 다음을 확인:
1. MD 파일 하단 **검증 체크리스트** 모든 항목 체크
2. 모든 ID에 `{PROJECT}-` prefix 있음
3. `trace.up`에 상위 문서 ID 등록 (REQ 제외)
4. `ai_exclude` 항목에 학습 제외 섹션 등록
5. PII 포함 항목에 `> **[PII]**` 마킹

검증 미완료 항목은 사용자에게 명시적으로 보고한다.

## 9. 산출물별 작성 가이드 위치

각 산출물 가이드: `platform/templates/deliverables/guides/{ID}-authoring-guide.md`

| 산출물 | 가이드 |
|---|---|
| REQ | `guides/REQ-authoring-guide.md` |
| FLW | `guides/FLW-authoring-guide.md` |
| SCR | `guides/SCR-authoring-guide.md` |
| ROLE | `guides/ROLE-authoring-guide.md` |
| FUNC | `guides/FUNC-authoring-guide.md` |
| UTC | `guides/UTC-authoring-guide.md` |
| ITS | `guides/ITS-authoring-guide.md` |
| ARC | `guides/ARC-authoring-guide.md` |
| OPM | `guides/OPM-authoring-guide.md` |
| USM | `guides/USM-authoring-guide.md` |
| DAT | `guides/DAT-authoring-guide.md` |
| API | `guides/API-authoring-guide.md` |
| SEC | `guides/SEC-authoring-guide.md` |
| RUN | `guides/RUN-authoring-guide.md` |
| 공통 정책 | `guides/rag-policy.md` |
| 청크 전략 | `guides/chunk-strategy-matrix.md` |
| RAG 변환 | `guides/RAG-conversion-guide.md` |
| ID 규칙 | `guides/ID-namespace.md` |
| **HTML 생성** | `guides/HTML-generation-guide.md` |

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
