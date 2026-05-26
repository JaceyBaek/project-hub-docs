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

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- frontmatter → meta 태그 변환 -->
<meta name="doc-id" content="{PROJECT}-{TYPE}-01">
<meta name="doc-type" content="{TYPE}">
<meta name="project" content="{PROJECT}">
<meta name="version" content="X.X.X">
<meta name="status" content="draft|review|approved">
<meta name="owner" content="담당자">
<meta name="updated" content="YYYY-MM-DD">
<title>[{PROJECT}-{TYPE}-01] 문서제목</title>
<style>
  /* 공통 CSS 전체 인라인 임베드 (example/assets/style.css 내용) */
</style>
</head>
<body>

<nav class="sidebar">
  <!-- 사이드바 네비게이션 (모든 16개 문서 링크, 현재 페이지 active) -->
</nav>

<main class="main">

  <!-- 문서 헤더 -->
  <div class="doc-header">
    <div class="meta-row">
      <span class="doc-id">{PROJECT}-{TYPE}-01</span>
      <span class="badge st-{status}">status</span>
      <span class="badge ph-{phase}">phase</span>
      <span class="badge req-yes|req-cond">필수|조건부</span>
    </div>
    <div class="doc-title">문서 제목</div>
    <div class="doc-info">
      <span>👤 담당: XXX</span>
      <span>📌 버전: vX.X.X</span>
      <span>📅 수정: YYYY-MM-DD</span>
    </div>
    <!-- trace.up / trace.down 링크 -->
    <div class="trace-bar">
      <div class="trace-col">
        <div class="trace-label">↑ 상위 문서</div>
        <div class="trace-links"><!-- 링크 또는 trace-none --></div>
      </div>
      <div class="trace-col">
        <div class="trace-label">↓ 하위 문서</div>
        <div class="trace-links"><!-- 링크 --></div>
      </div>
    </div>
  </div>

  <!-- 본문 섹션 (card 컴포넌트 사용) -->
  <div class="card">
    <h2>§1 개요</h2>
    ...
  </div>

  <!-- 검증 체크리스트 -->
  <div class="checklist-card">
    <h2>✅ 검증 체크리스트</h2>
    <div class="cl-item">
      <input type="checkbox" checked> <span class="cl-done">doc_id 형식: {PROJECT}-{TYPE}-01</span>
    </div>
    <div class="cl-item">
      <input type="checkbox"> <span>미완료 항목...</span>
    </div>
  </div>

</main>
</body>
</html>
```

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
