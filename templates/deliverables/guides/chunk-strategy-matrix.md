# 문서 타입별 청크 전략 매트릭스

22개 문서가 같은 RAG에 들어가지만, 문서 타입별로 **청크 단위와 임베딩 prefix**가 달라야 검색 품질이 나온다.
이 가이드는 각 타입별 청크 규칙을 정의한다. `platform/tools/rag/build-rag.mjs` 가 이 매트릭스를 따라 동작한다.

---

## 1. 매트릭스 (한눈에)

| 타입 | 코드 | 주요 청크 단위 | 보조 청크 | 예외/제외 |
|---|---|---|---|---|
| 요구사항정의서 | REQ | H2 섹션 + 표 행(REQ-B/F/N) | 페르소나 카드, FAQ 카드 | 검증표, 체크리스트 (data-ai-skip) |
| 추적 매트릭스 | TRC | **청크 X** — 자동 생성(traceability.json)에서 파생 | — | 전체 문서 학습 제외 권장 |
| 프로세스흐름도 | FLW | 노드 1개 = 1청크, 엣지는 메타로 | 분기 조건, 예외 흐름 | BPMN 다이어그램 자체는 caption만 |
| 화면정의서 | SCR | 화면 카드 1개 = 1청크 | 화면 내 컴포넌트 표 | 와이어 이미지(alt만 사용) |
| 권한정의서 | ROLE | 역할(Role) 1개 = 1청크 | 권한 매트릭스 행 단위 | — |
| 기능정의서 | FUNC | 기능(API/Method) 1개 = 1청크 | 파라미터 표 행 단위 | 시퀀스 다이어그램 caption만 |
| 단위 테스트 | UTC | 테스트 케이스 1건 = 1청크 | — | 실행 결과 로그(있으면 제외) |
| 통합 테스트 | ITS | 시나리오 1건 = 1청크 | 단계(Step) 행 단위 | — |
| 아키텍처 | ARC | H2 섹션 단위 | 컴포넌트 다이어그램 caption | 인프라 토폴로지 그림 |
| 운영자 매뉴얼 | OPM | 절차(Procedure) 1개 = 1청크 | 트러블슈팅 표 행 단위 | 스크린샷 alt만 |
| 사용자 매뉴얼 | USM | 작업(Task) 1개 = 1청크 | FAQ 카드 | 스크린샷 alt만 |
| 설정 가이드 | CFG | 설정 항목 1개 = 1청크 | 환경변수 표 행 단위 | 시크릿/예시 키 마스킹 |

---

## 2. HTML 마크업 규칙

### 공통
- **모든 청크 후보**는 `data-chunk="<type>:<id>"` 속성을 가진다.
  - 예: `data-chunk="req:EM2026-REQ-F01"`, `data-chunk="screen:EM2026-SCR-001"`
- 학습 제외 영역은 `data-ai-skip="true"` 단일 마커로 표시. 주석 마커는 사용 금지(누락 위험).
- 섹션 루트는 `<section data-section-key="<slug>">` 로 구분. 변환기가 H2 prefix를 만들 때 사용.

### 타입별 권장 마크업

#### FLW (프로세스흐름도)
```html
<section data-section-key="flow-main" data-chunk="flow:EM2026-FLW-001">
  <h2>표준 결재 흐름</h2>
  <div class="node" data-chunk="node:start" data-node-type="start">기안문 작성</div>
  <div class="node" data-chunk="node:approve" data-node-type="task" data-trace="EM2026-REQ-F03">결재 처리</div>
  <div class="edge" data-from="start" data-to="approve" data-condition="제출 완료">…</div>
</section>
```

#### SCR (화면정의서)
```html
<section data-section-key="screen-list" data-chunk="screen-list">
  <article data-chunk="screen:EM2026-SCR-001" data-screen-id="EM2026-SCR-001"
           data-trace-up="EM2026-REQ-F01">
    <h3>SCR-001 기안문 작성</h3>
    <table data-table-key="components"> … </table>
    <img alt="기안문 작성 와이어프레임" data-ai-skip="true" src="…">
  </article>
</section>
```

#### FUNC (기능정의서)
```html
<article data-chunk="func:EM2026-FUNC-001" data-func-id="EM2026-FUNC-001"
         data-trace-up="EM2026-REQ-F01">
  <h3>FUNC-001 createDraft()</h3>
  <pre data-chunk="func:EM2026-FUNC-001:signature">POST /api/drafts</pre>
  <table data-table-key="params"> … </table>
</article>
```

#### UTC / ITS (테스트)
```html
<article data-chunk="testcase:EM2026-UTC-001" data-test-id="EM2026-UTC-001"
         data-trace-up="EM2026-REQ-F01">
  <h3>UTC-001 정상 임시저장</h3>
  <ol>
    <li data-chunk="testcase:EM2026-UTC-001:step1">기안문 양식 진입</li>
    …
  </ol>
</article>
```

#### ROLE (권한정의서)
```html
<article data-chunk="role:EM2026-ROLE-001" data-role-id="EM2026-ROLE-001">
  <h3>ROLE-001 기안자(Drafter)</h3>
  <table data-table-key="permissions">
    <tr data-chunk="perm:EM2026-ROLE-001:create-draft">…</tr>
  </table>
</article>
```

#### OPM / USM (매뉴얼)
- 절차/작업 단위가 청크. **순서가 중요**하므로 `data-chunk-order` 로 명시.
```html
<article data-chunk="procedure:EM2026-OPM-005" data-chunk-order="5">
  <h3>5. 결재 적체 해소 절차</h3>
  …
</article>
```

#### CFG (설정 가이드)
- 시크릿 값은 `data-pii="secret"` 또는 `data-redact="true"` 로 마스킹.
```html
<article data-chunk="config:OKTA_CLIENT_ID">
  <h3>OKTA_CLIENT_ID</h3>
  <code data-pii="secret">0oa1b2c3d4e5f6g7h8</code>
</article>
```

---

## 3. 청크 prefix 규칙 (변환기 자동)

`build-rag.mjs` 는 청크 텍스트 앞에 다음 형식의 prefix를 자동 부착해 임베딩 품질을 높인다:

```
[<doc-name-ko> > <H2 섹션명> > <H3 (있으면)>]
<청크 본문>
```

예:
```
[요구사항정의서 > 기능 요구사항(FR)]
EM2026-REQ-F01 기안문 작성: 사용자는 양식을 선택해 기안문을 작성·임시저장할 수 있다.
관련: SCR-001, FUNC-001 (상위: REQ-B01)
```

---

## 4. 청크 사이즈 가이드

| 단위 | 권장 토큰 | 너무 작으면 | 너무 크면 |
|---|---|---|---|
| 표 행 1개 | 80~200 tok | prefix 자동 부착으로 보강 | 행 → 셀로 쪼개기 금지 |
| 카드/노드 1개 | 150~400 tok | 카드 묶음 X — 개별 유지 | H3로 추가 분할 |
| H2 섹션 | 300~800 tok | 합치기 X | H3 단위 추가 분할 |

---

## 5. 학습 제외 (data-ai-skip) 적용 영역

다음은 모든 문서에서 **반드시 제외**:
- 네비게이션, 빵부스러기, footer
- 목차(TOC), 체크리스트
- 검증표(validation-checklist)
- field-hint (편집자용 안내문)
- 와이어프레임 이미지 본체 (alt만 사용)
- 시크릿/PII 표시된 영역

다음은 **문서별 결정**:
- TRC(추적 매트릭스): 전체 제외 권장 (traceability.json 자동 생성과 중복)
- 변경 이력: 제외 권장 (메타로 충분)
- 관련 페이지 링크: 제외 권장 (related_docs 메타로 충분)

---

## 6. 변환기 동작 (요약)

`platform/tools/rag/build-rag.mjs` 가 이 매트릭스를 적용해 다음을 생성한다:

1. `dist/md/<file>.md` — 사람용 검토 + LLM 컨텍스트
2. `dist/chunks.jsonl` — RAG 임베딩용. 각 라인:
   ```json
   {
     "id": "EM2026-REQ-F01",
     "doc_id": "EM2026-REQ-2026",
     "project_id": "EM2026",
     "type": "req",
     "section": "기능 요구사항(FR)",
     "text": "[요구사항정의서 > 기능 요구사항(FR)]\nEM2026-REQ-F01 …",
     "trace_up": ["EM2026-REQ-B01"],
     "trace_down": ["EM2026-SCR-001", "EM2026-FUNC-001"]
   }
   ```
3. `dist/traceability.json` — 양방향 그래프 (자동 역추적)

---

## 7. 새 문서 타입을 추가할 때

1. 이 표에 행 추가 (코드, 청크 단위, 예외)
2. 마크업 예시 추가
3. `build-rag.mjs` 의 `CHUNK_STRATEGIES` 에 핸들러 등록
4. 검증 규칙(`doc-validator.js`) 추가 — 최소 청크 수, 필수 trace 등
