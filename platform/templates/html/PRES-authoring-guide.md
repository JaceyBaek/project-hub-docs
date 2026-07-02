---
title: "Presentation HTML 작성 가이드"
type: guide
template: PRES_presentation_template.html
updated: "2026-07-02"
---

# Presentation HTML 작성 가이드

> **이 가이드의 템플릿**: `platform/templates/html/PRES_presentation_template.html`
>
> 본 가이드는 **협의·기획 문서용 HTML** 작성 규칙을 정의한다.
> 산출물 HTML(REQ·FLW·ARC 등)은 `platform/templates/deliverables/guides/HTML-generation-guide.md` 참조.

---

## 1. 이 템플릿을 사용하는 경우

| 상황 | 이 템플릿 | 산출물 HTML |
|------|-----------|-------------|
| 인프라 협의 문서 (INFRA_ARCH) | ✅ | — |
| 보안 검토 요청서 | ✅ | — |
| 기술 기획·제안서 | ✅ | — |
| 회의 결과 보고서 | ✅ | — |
| REQ·FLW·ARC·SCR 등 15종 산출물 | — | ✅ |

**기준**: collab 프로세스 밖에서 단독 작성하는 협의·보고용 HTML이면 이 템플릿을 사용한다.

---

## 2. 파일명 규칙

```
{TYPE}_{YYYYMMDD}_{kebab-case-description}_v{N}.html
```

| 예시 | 설명 |
|------|------|
| `INFRA_ARCH_20260630_chatbot-mcp-ecs_v3.html` | 인프라 아키텍처 v3 |
| `SEC_REVIEW_20260630_mcp-chatbot-security_v1.html` | 보안 검토 요청서 |
| `PRES_20260702_ecs-migration-proposal_v1.html` | 일반 기획 발표자료 |

**버전 규칙**: 내용 변경 시 vN을 올린다. 날짜는 최초 작성일 고정 (갱신해도 변경 안 함).

---

## 3. 시작하는 법

> **MD 먼저, HTML 나중** — HTML 생성 전에 반드시 MD 원본을 먼저 작성한다 (§3.5 참조).

1. **MD 원본 먼저 작성** — 같은 이름·같은 위치에 `.md` 파일로 내용을 작성 (§3.5)
2. `platform/templates/html/PRES_presentation_template.html` 을 목적지 경로에 복사
3. `{{...}}` 플레이스홀더 전체 교체 (아래 §4 참조)
4. 사이드바 nav 항목 및 섹션 구성 조정
5. MD 원본을 기반으로 HTML 콘텐츠 작성

---

## 3.5 MD 원본 파일 규칙

HTML 생성 전에 **반드시 MD 파일을 먼저 작성**한다. MD가 콘텐츠의 단일 진실 소스(SoT)이며, HTML은 그 프레젠테이션 변환본이다.

### 파일명 규칙

HTML과 **동일한 이름**, 확장자만 `.md`로.

```
e-Accounting AI(미카) 신규 도입 배경 및 MCP 적용 보고서_20260702.md   ← 먼저 작성
e-Accounting AI(미카) 신규 도입 배경 및 MCP 적용 보고서_20260702.html  ← 이후 생성
```

### MD 파일이 포함해야 할 내용

- 문서 제목 / 작성일 / 작성자 / 프로젝트 코드
- 배경 및 목적 (1~2문단)
- 챕터별 본문 내용 (표·목록 포함)
- 요약 또는 결론

### 저장 위치

HTML과 **같은 폴더**에 함께 보관한다.

| 문서 유형 | 저장 위치 | 비고 |
|---|---|---|
| 인프라 아키텍처 | `projects/{프로젝트}/docs/infra/` | MD + HTML 쌍 |
| 보안 검토 요청서 | `projects/{프로젝트}/docs/security-review/` | MD + HTML 쌍 |
| 보고서·제안서 | `projects/{프로젝트}/_manage/reports/` | MD + HTML 쌍 |
| 기타 협의 문서 | `projects/{프로젝트}/docs/{적절한 폴더}/` | MD + HTML 쌍 |

---

## 4. 필수 교체 항목 (`{{...}}`)

| 플레이스홀더 | 설명 | 예시 |
|---|---|---|
| `{{CATEGORY}}` | 문서 카테고리 (영문 대문자) | `INFRA ARCHITECTURE` |
| `{{DOC_TITLE_SHORT}}` | `<title>` 태그 텍스트 | `인프라 아키텍처 — e-Acct v3` |
| `{{CHIP_LABEL}}` | 우상단 고정 칩 기본값 | `INFRA ARCH` |
| `{{SB_TITLE}}` | 사이드바 제목 (HTML 허용) | `e-Acct AI 챗봇/MCP<br>인프라 아키텍처` |
| `{{VERSION}}` | 버전 표기 | `v3` |
| `{{HERO_BRAND}}` | Hero 상단 브랜드 라인 | `INFRA ARCHITECTURE` |
| `{{HERO_H1_L1}}` | Hero h1 첫 줄 | `e-Acct AI 챗봇/MCP` |
| `{{HERO_H1_L2}}` | Hero h1 둘째 줄 (그라디언트) | `인프라 아키텍처` |
| `{{HERO_SUB}}` | Hero 소제목 설명 | `ECS Fargate 배포 … 협의 문서` |
| `{{META_DATE}}` | 작성일 | `2026-06-30` |
| `{{META_AUTHOR}}` | 작성자 — `personal.yml → author_display` 값 사용 | `Jacey(AX전략팀)` |
| `{{META_TARGETS}}` | 대상 프로젝트명 | `eacct_chatbot · eacct_mcp` |
| `{{META_CODES}}` | 프로젝트 코드 | `P2605121 · P2605081` |
| `{{SB_FOOT_DATE}}` | 사이드바 하단 작성일 | `2026-06-30` |
| `{{SB_FOOT_AUTHOR}}` | 사이드바 하단 작성자 — `personal.yml → author_display` 값 사용 | `Jacey(AX전략팀)` |
| `{{FOOTER_SUBTITLE}}` | 푸터 시스템/문서명 | `e-Acct AI 챗봇/MCP 시스템` |
| `{{FOOTER_META}}` | 푸터 우측 메타 — 작성자는 `personal.yml → author_display` | `작성일: 2026-06-30 · 작성자: Jacey(AX전략팀)<br>대상: ... · v3` |

---

## 5. 사이드바 구성

```html
<div class="nav-ch">I. 챕터 이름</div>           <!-- 그룹 라벨 -->
<a href="#s1-1" class="nav-item">
  <span class="ni-n">1.1</span>섹션 이름
</a>
```

- `nav-ch`: 섹션 그룹 구분선. 보통 챕터 단위로 1개씩.
- `nav-item`: 개별 링크. `href`의 `#id`는 해당 `<section id="...">` 와 반드시 일치.
- `ni-n`: 번호 라벨 (예: `1.1`, `2.3`). 숫자 대신 아이콘도 가능.
- 섹션이 5개 이하면 `nav-ch` 없이 `nav-item` 나열 가능.

---

## 6. 섹션 구성 패턴

### 챕터 divider + 섹션 쌍

```html
<!-- divider: data-chapter 값이 스크롤 시 칩에 표시됨 -->
<section class="divider" data-chapter="I. 챕터명">
  <div class="wrap">
    <div class="roman rv" style="--d:.05s">I</div>
    <h2 class="rv" style="--d:.15s">챕터 제목</h2>
    <p class="rv" style="--d:.25s">챕터 설명</p>
  </div>
  <!-- rings-sm SVG는 그대로 복사 -->
</section>

<section id="s1-1">
  <div class="wrap">
    <div class="kicker rv">1.1 — English Label</div>
    <h2 class="rv" style="--d:.1s">제목 <span class="hl">강조</span></h2>
    <p class="lede rv" style="--d:.2s">소개 텍스트 (선택)</p>
    <!-- 콘텐츠 -->
  </div>
</section>
```

### 애니메이션 (.rv)

- `.rv` 클래스를 붙이면 스크롤 진입 시 fade-up 애니메이션이 적용된다.
- `style="--d:.Xs"` 로 지연 시간을 지정한다 (0s → .05s → .1s → .2s → .3s 순으로 쌓기).
- 복잡한 내부 요소에 과도하게 적용하지 말 것 — 최상위 컨테이너에만 적용 권장.

---

## 7. 콘텐츠 컴포넌트

### 7.1 테이블

```html
<div class="tbl-wrap rv" style="--d:.3s">
  <table>
    <thead><tr><th>컬럼1</th><th>컬럼2</th><th>비고</th></tr></thead>
    <tbody>
      <tr>
        <td><b>항목</b></td>
        <td>내용</td>
        <td><span class="badge badge-new">신규</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 7.2 배지

| 클래스 | 색상 | 용도 |
|--------|------|------|
| `badge-new` | 파랑 | 신규 항목 |
| `badge-keep` | 초록 | 기존 유지 |
| `badge-req` | 노랑 | 확인/협의 필요 |
| `badge-warn` | 빨강 | 주의/위험 |
| `badge-ecs` | 보라 | ECS·컨테이너 관련 |
| `badge-aurora` | 민트 | DB·Aurora 관련 |

**커스텀 배지 추가**: CSS에 `.badge-{name}{background:...;color:...}` 추가.

### 7.3 체크리스트

```html
<div class="checklist">
  <div class="check-item">
    <div class="check-box"></div>
    <div class="ci-text"><b>항목명</b>: 설명 텍스트</div>
  </div>
</div>
```

### 7.4 Callout 박스 (proof)

중요 참조, 공지, 요약 강조에 사용.

```html
<div class="proof">
  <h3>제목 <span class="hl">— 부제</span></h3>
  <p>설명 텍스트. <b style="color:#E8F5FF">강조 경로</b></p>
</div>
```

### 7.5 통신 목록 (comm-section)

```html
<div class="comm-section">
  <div class="comm-title">기존 통신 (Existing)</div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>#</th><th>출발</th><th>도착</th><th>방향</th><th>용도</th></tr></thead>
      <tbody>
        <tr><td><b>E-1</b></td><td>시스템 A</td><td>시스템 B</td><td>양방향</td><td>설명</td></tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 8. 폰트 처리

- **기본**: Google Fonts CDN (Noto Sans KR) — 인터넷 연결 환경.
- **오프라인·폐쇄망**: `<link rel="preconnect">` + `<link href="https://fonts.googleapis.com/...">` 3줄 제거 시 시스템 폰트(`Malgun Gothic`, `-apple-system`)로 자동 fallback. 레이아웃 깨짐 없음.

> 산출물 HTML(`HTML-generation-guide.md`)과 달리, 이 템플릿은 **협의·보고 목적**이므로 CDN 사용을 허용한다.
> 단, 완전 폐쇄망 배포가 필요한 경우 CDN 제거 후 사용.

---

## 9. CSS 변수 (테마 커스터마이징)

```css
:root{
  --navy-950: #06112A;   /* 사이드바 배경 */
  --navy-900: #0A1D3E;   /* Hero, 테이블 헤더 */
  --navy-800: #0E2A57;   /* divider 배경 */
  --navy-700: #1A3D73;   /* divider 배경 보조 */
  --sky-400:  #38BDF8;   /* 주 강조색 (파랑) */
  --cyan-300: #67E8F9;   /* 보조 강조색 (민트) */
  --card:     #FFFFFF;   /* 카드 배경 */
  --line:     #E4EBF5;   /* 구분선 */
  --ink:      #1A2942;   /* 본문 텍스트 */
  --muted:    #6B7FA0;   /* 보조 텍스트 */
  --sidebar-w: 224px;    /* 사이드바 너비 */
}
```

색상 테마 변경 시 `--sky-400` / `--cyan-300` 만 교체하면 주요 강조색이 일괄 변경된다.

---

## 10. 작성 체크리스트

- [ ] **MD 원본 파일 먼저 작성 완료** (§3.5) — HTML보다 먼저, 같은 폴더에
- [ ] `{{...}}` 플레이스홀더 전체 교체 완료
- [ ] 사이드바 `href="#id"` 와 `<section id="...">` 일치 확인
- [ ] `data-chapter` 값이 칩에 표시되는 텍스트와 일치
- [ ] 각 `<section id>` 에 `<div class="kicker">` + `<h2>` 포함
- [ ] 모바일 브라우저(768px 이하) 레이아웃 확인
- [ ] 파일명 규칙 준수 (§2)
- [ ] 버전 번호 (`{{VERSION}}`) 와 파일명 vN 일치
- [ ] MD·HTML 파일명 일치 확인 (확장자만 다를 것)

---

## 11. 위치 규칙

> §3.5에 상세 위치 규칙 포함. MD·HTML은 항상 같은 폴더에 쌍으로 보관.

| 문서 유형 | 저장 위치 |
|-----------|-----------|
| 인프라 아키텍처 | `projects/{프로젝트}/docs/infra/` |
| 보안 검토 요청서 | `projects/{프로젝트}/docs/security-review/` |
| 보고서·제안서 | `projects/{프로젝트}/_manage/reports/` |
| 기타 협의 문서 | `projects/{프로젝트}/docs/{적절한 폴더}/` |

---

## 참고

- 기반 문서: `projects/eacct_mcp/docs/infra/INFRA_ARCH_20260630_chatbot-mcp-ecs_v3.html`
- 산출물 HTML 가이드: `platform/templates/deliverables/guides/HTML-generation-guide.md`
