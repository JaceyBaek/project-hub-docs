---
title: "HTML 산출물 생성 가이드"
type: guide
updated: "2026-05-26"
---

# HTML 산출물 생성 가이드

산출물 MD 파일을 HTML 웹뷰로 변환할 때 반드시 지켜야 할 규칙을 정의한다.

---

## 1. 핵심 원칙: 완전 독립형(Self-Contained)

**각 HTML 파일은 단독으로 어디서든 열렸을 때 깨짐 없이 동작해야 한다.**

| 항목 | 규칙 |
|------|------|
| CSS | 외부 파일 참조 금지. `<style>` 태그에 인라인 임베드 |
| JS | 외부 CDN 금지. 필요 시 `<script>` 태그에 인라인 임베드 |
| 웹 폰트 | Google Fonts 등 외부 CDN 금지. `system-ui`, `-apple-system` 등 시스템 폰트만 사용 |
| 이미지 | 외부 URL 금지. Base64 인라인 또는 생략 후 플레이스홀더 텍스트 사용 |
| Mermaid | CDN 스크립트 금지. 다이어그램 코드를 스타일된 코드블록으로 표시 |

**이유**: HTML 파일을 USB에 복사하거나, 오프라인 환경, 방화벽 내부 인트라넷에서 열어도 레이아웃이 깨지지 않아야 한다. 외부 의존은 단 하나도 허용하지 않는다.

---

## 2. 문서 간 링크 (Inter-Document Links)

HTML 파일들은 상대 경로(relative path)로 서로 연결된다. 절대 경로, 서버 경로 금지.

### 2.1 폴더 구조 및 경로 기준

```
{프로젝트}/docs/
├── TRC_요구사항추적매트릭스.html        ← Level: docs/
├── 01_plan/
│   └── REQ_요구사항정의서.html          ← Level: docs/01_plan/
├── 02_design/
│   ├── FLW_프로세스흐름도.html
│   ├── SCR_화면정의서.html
│   ├── ROLE_권한정의서.html
│   ├── FUNC_기능정의서.html
│   ├── ARC_아키텍처.html
│   ├── DAT_데이터모델정의서.html
│   ├── API_인터페이스명세서.html
│   └── SEC_보안설계서.html              ← Level: docs/02_design/
├── 03_dev/
│   └── UTC_단위테스트케이스.html         ← Level: docs/03_dev/
├── 04_test/
│   └── ITS_통합테스트시나리오.html       ← Level: docs/04_test/
└── 05_deploy/
    ├── OPM_운영자매뉴얼.html
    ├── USM_사용자매뉴얼.html
    ├── CFG_설정가이드.html
    └── RUN_운영Runbook.html              ← Level: docs/05_deploy/
```

### 2.2 폴더 레벨별 상대 경로 변환표

아래 표를 보고 각 파일에서 다른 파일을 참조할 때 올바른 상대 경로를 사용한다.

| 목적지 파일 | docs/ 레벨<br>(TRC) | docs/01_plan/ 레벨<br>(REQ) | docs/02_design/ 레벨<br>(설계 산출물) | docs/03_dev/ 레벨<br>(UTC) | docs/04_test/ 레벨<br>(ITS) | docs/05_deploy/ 레벨<br>(운영 산출물) |
|---|---|---|---|---|---|---|
| `index.html` | `../index.html` | `../../index.html` | `../../index.html` | `../../index.html` | `../../index.html` | `../../index.html` |
| `TRC_…` | (self) | `../TRC_….html` | `../TRC_….html` | `../TRC_….html` | `../TRC_….html` | `../TRC_….html` |
| `REQ_…` | `./01_plan/REQ_….html` | (self) | `../01_plan/REQ_….html` | `../01_plan/REQ_….html` | `../01_plan/REQ_….html` | `../01_plan/REQ_….html` |
| `FLW_…` | `./02_design/FLW_….html` | `../02_design/FLW_….html` | `./FLW_….html` | `../02_design/FLW_….html` | `../02_design/FLW_….html` | `../02_design/FLW_….html` |
| SCR/ROLE/FUNC/ARC/<br>DAT/API/SEC | `./02_design/파일명.html` | `../02_design/파일명.html` | `./파일명.html` | `../02_design/파일명.html` | `../02_design/파일명.html` | `../02_design/파일명.html` |
| `UTC_…` | `./03_dev/UTC_….html` | `../03_dev/UTC_….html` | `../03_dev/UTC_….html` | (self) | `../03_dev/UTC_….html` | `../03_dev/UTC_….html` |
| `ITS_…` | `./04_test/ITS_….html` | `../04_test/ITS_….html` | `../04_test/ITS_….html` | `../04_test/ITS_….html` | (self) | `../04_test/ITS_….html` |
| OPM/USM/CFG/RUN | `./05_deploy/파일명.html` | `../05_deploy/파일명.html` | `../05_deploy/파일명.html` | `../05_deploy/파일명.html` | `../05_deploy/파일명.html` | `./파일명.html` |

### 2.3 링크를 사용하는 위치

HTML 파일 안에서 다른 문서를 참조하는 곳은 두 가지다.

**① 사이드바 네비게이션** — 항상 모든 16개 문서 링크 포함. 현재 페이지에만 `class="nav-item active"` 추가.

**② Trace Bar (상위/하위 추적)** — MD frontmatter의 `trace.up` / `trace.down` ID를 링크로 변환.

```html
<!-- trace.up 예시 -->
<div class="trace-col">
  <div class="trace-label">↑ 상위 문서</div>
  <div class="trace-links">
    <a href="../01_plan/REQ_요구사항정의서.html" class="trace-link">P2605991-REQ-01</a>
  </div>
</div>

<!-- trace.up이 없는 경우 (REQ 등 최상위) -->
<div class="trace-col">
  <div class="trace-label">↑ 상위 문서</div>
  <div class="trace-links">
    <span class="trace-none">없음 (최상위)</span>
  </div>
</div>
```

**③ 본문 내 cross-reference** — 표 안이나 본문에서 다른 문서 ID를 언급할 때도 클릭 가능한 링크로 작성.

```html
<!-- 표 안에서 참조 -->
<td><a href="../02_design/FUNC_기능정의서.html">P2605991-FUNC-001</a></td>

<!-- 본문에서 참조 -->
<p>자세한 내용은 <a href="../02_design/ARC_아키텍처.html">P2605991-ARC-01</a>을 참조하십시오.</p>
```

---

## 3. HTML 파일 구조 (표준 템플릿)

**HTML 템플릿은 `platform/templates/html/PRES_presentation_template.html` 파일을 따른다.**

이 템플릿에는 다음 요소가 포함되어 있다:

- `<head>`: frontmatter 데이터를 meta 태그로 변환 (doc-id, doc-type, project, version, status, owner, updated)
- `<title>`: `[{PROJECT}-{TYPE}-01] 문서제목` 형식
- `<style>`: 공통 CSS 전체 인라인 임베드 (외부 파일 참조 금지)
- `<nav class="sidebar">`: 모든 16개 문서 링크 포함, 현재 페이지에만 `active` 클래스 추가
- `<div class="doc-header">`: meta-row (doc-id, 상태 배지, 단계 배지, 필수 여부), 문서 제목, 문서 정보, trace-bar
- `<div class="trace-bar">`: 상위 문서(trace.up)와 하위 문서(trace.down) 링크
- `<div class="card">`: 본문 섹션 (card 컴포넌트 사용)
- `<div class="checklist-card">`: 검증 체크리스트

---

## 4. Mermaid 다이어그램 처리

외부 Mermaid.js CDN을 사용하지 않으므로, 다이어그램 코드를 스타일된 블록으로 표시한다.

```html
<div class="diagram">
  <div class="d-icon">📊</div>
  <div class="d-title">출퇴근 기록 흐름도 (Mermaid flowchart)</div>
  <div class="d-code">flowchart TD
    START([직원 앱 접속]) --> D1{출근 기록 있음?}
    D1 -- No --> P1[출근 기록 생성\nclock_in API 호출]
    D1 -- Yes --> ERR[중복 오류 표시]
    P1 --> P2[Redis 캐시 무효화]
    P2 --> END([완료 토스트 표시])</div>
</div>
```

렌더링이 필요한 환경(Confluence, VSCode 미리보기 등)에서는 해당 도구의 Mermaid 플러그인을 사용한다.

---

## 5. PII 마킹

개인정보가 포함된 필드나 항목 옆에 PII 배지를 추가한다.

```html
<!-- 표 안에서 -->
<td>직원 이름 <span class="pii">PII</span></td>

<!-- 본문에서 -->
<p>출퇴근 시각<span class="pii">PII</span>은 5년간 보존합니다.</p>
```

---

## 6. 공통 CSS 관리

- **정규 소스**: `platform/templates/deliverables/example/assets/style.css`
- **각 HTML 파일**: `<style>` 태그에 위 파일 내용을 그대로 복붙
- CSS를 수정할 때는 `style.css`를 먼저 수정한 뒤, 모든 HTML 파일의 `<style>` 블록을 일괄 갱신

> **자동화 파이프라인이 구축되면**: MD → HTML 변환 시 CSS를 자동 임베드. 그 전까지는 수동 관리.

---

## 7. 파일명 규칙

| 문서 | 파일명 |
|------|--------|
| TRC | `TRC_요구사항추적매트릭스.html` |
| REQ | `REQ_요구사항정의서.html` |
| FLW | `FLW_프로세스흐름도.html` |
| SCR | `SCR_화면정의서.html` |
| ROLE | `ROLE_권한정의서.html` |
| FUNC | `FUNC_기능정의서.html` |
| ARC | `ARC_아키텍처.html` |
| DAT | `DAT_데이터모델정의서.html` |
| API | `API_인터페이스명세서.html` |
| SEC | `SEC_보안설계서.html` |
| UTC | `UTC_단위테스트케이스.html` |
| ITS | `ITS_통합테스트시나리오.html` |
| OPM | `OPM_운영자매뉴얼.html` |
| USM | `USM_사용자매뉴얼.html` |
| CFG | `CFG_설정가이드.html` |
| RUN | `RUN_운영Runbook.html` |

---

## 8. 생성 체크리스트

HTML 파일 생성 또는 갱신 시 확인:

- [ ] `<style>` 태그에 공통 CSS 전체 임베드됨
- [ ] 외부 CDN, 외부 폰트, 외부 JS 참조 없음
- [ ] 사이드바 nav: 모든 16개 문서 링크 포함, 현재 페이지 `active` 클래스
- [ ] doc-header: meta-row(doc-id, status, phase, 필수여부), doc-title, doc-info, trace-bar
- [ ] trace-bar: trace.up / trace.down 상대 경로 링크
- [ ] 본문 내 cross-reference: 다른 문서 ID 언급 시 링크로 연결
- [ ] PII 포함 항목: `.pii` 배지 표시
- [ ] 시크릿 값 본문 미노출 (keyring 명령만 기재)
- [ ] 검증 체크리스트 포함 (현실적인 checked/unchecked 상태)
- [ ] `<meta name="doc-id">` 등 frontmatter 메타 태그 포함
- [ ] 브라우저에서 열었을 때 레이아웃 깨짐 없음 확인

---

## 9. Haiku 서브에이전트 위임 기준

MD → HTML 생성 작업 중 **판단이 필요 없는 순수 반복 하위작업만** `Agent(model:"haiku")`로 위임할 수 있다. 메인(Sonnet)이 매 하위작업마다 아래 표로 스스로 판단하며, 애매하면 위임하지 않고 직접 처리한다.

### 9.1 위임 가능 (무판정 기계작업)

| 하위작업 | 근거 |
|---|---|
| `<style>` 블록에 `style.css` 전체 복붙/갱신 | §6 — 규칙이 "그대로 복붙"으로 고정 |
| 사이드바 16개 링크 삽입/갱신 (신규 파일명 1개 추가 시 기존 파일들에 동일 링크 일괄 반영) | §2.3① — 목록·형식 고정, `active` 클래스 위치는 메인이 지정한 파일명 기준으로 기계적 결정 |
| §2.2 상대경로 표에 따른 경로 문자열 치환 | 표에 입출력이 완전히 정의됨 |
| `<meta>` 태그에 frontmatter 값 그대로 매핑 | §3 — 값 복사, 해석 불필요 |
| 여러 기존 HTML 파일에 동일 패턴 일괄 치환 (예: CSS 갱신 후 N개 파일 `<style>` 블록 동시 교체) | 반복 작업, 판단 대상 없음 |

### 9.2 위임 금지 (판단 필요 — 메인 직접 처리)

| 하위작업 | 이유 |
|---|---|
| MD 본문 → 카드/섹션 구조 재구성·요약 | 콘텐츠 해석 필요 |
| PII 필드 판별 및 `.pii` 배지 위치 결정 | 오탐·누락 시 개인정보 노출 리스크 |
| 본문 cross-reference 탐지 및 링크 대상 결정 | 문서 간 의미적 연관 판단 필요 |
| trace.up/down 정확성 확인 (frontmatter ↔ 실제 문서 매칭) | 추적 무결성 판단 필요 |
| §8 생성 체크리스트의 최종 PASS/FAIL 판정 | **판정은 항상 메인이 직접** — `rule_loading_policy.md` §5 Hard Block(타인/서브 판정 대리 금지)과 동일 원칙 |
| 최초 신규 문서 생성(콘텐츠 최초 작성) | 판단 작업이 대부분을 차지 — 위임 대상 아님 |

### 9.3 위임 절차

1. 메인이 MD를 읽고 1차 HTML을 생성한다 — 9.2의 판단 작업을 전부 직접 처리.
2. 남은 하위작업 중 9.1 표에 정확히 해당하는 것만 골라 위임 대상으로 확정한다.
3. `Agent(model:"haiku")`로 위임한다. 프롬프트에 대상 파일 경로, 적용할 규칙(9.1 근거 열 원문), 완료 기준을 명시한다 — Haiku는 규칙 해석이 아니라 규칙 적용만 하도록 프롬프트를 구체적으로 작성한다.
4. Haiku 결과를 §8 체크리스트 전체로 메인이 재검증한다. 실패 항목은 메인이 직접 수정한다(재위임 금지 — 소환 비용 대비 이득 없음).
5. 검증 통과분만 최종 반영한다. 위임 여부·대상은 별도 보고 불필요하나, 체크리스트 검증 결과는 기존 규칙대로 보고한다.
