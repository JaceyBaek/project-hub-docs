---
title: "Presentation HTML 작성 가이드"
type: guide
template: PRES_presentation_template.html
updated: "2026-08-21 (§12 MDS 적용 리포트 패턴 추가)"
---

# Presentation HTML 작성 가이드

> **이 가이드의 템플릿**: `platform/templates/html/PRES_presentation_template.html`
>
> 본 가이드는 **협의·기획 문서용 HTML** 작성 규칙을 정의한다.
> 산출물 HTML(REQ·FLW·ARC 등)은 `platform/templates/deliverables/guides/HTML-generation-guide.md` 참조.

---

## 0. 템플릿 구조 절대 준수 (최우선 원칙)

**이 템플릿으로 만드는 모든 문서는 구조·CSS 세부값·`<script>` 핵심 로직에서 원본 템플릿과 100% 동일해야 한다 — 예외 없음.** 대상: CSS 변수(`:root`) 전체, 사이드바(`.nav-ch`/`.nav-item`/`.sb-foot`/`#sidebar-toggle`) CSS, footer 레이아웃, `.rv` 애니메이션 메커니즘, `.proof`/`.badge`/`.checklist` 컴포넌트의 padding·font-size·max-width 등 세부 수치, `<script>`의 `travelHighlight`/`travelLock`/`travelTimer`·사이드바 토글·IntersectionObserver 로직.

**방법**: §3 2단계 "템플릿 복사"는 기억으로 재현하는 것이 아니라 `PRES_presentation_template.html` 원본을 실제로 Read해 그 내용을 그대로 복사하는 것을 의미한다. "이런 구조였지" 하는 인상만으로 새로 타이핑하지 않는다. 다른 산출물 HTML을 참고용으로 열어보는 것도 금지 — 그 산출물 자체가 이미 원본에서 벗어나 있을 수 있으므로, 항상 원본 템플릿 파일이 유일한 기준이다.

**허용되는 유일한 예외 — 문서가 명시한 확장 지점**:
- 커스텀 배지 클래스 추가 (`.badge-{name}{...}`, §7.2)
- `--content-w` 재정의 (표 컬럼이 많은 문서, §9)
- 이 두 가지 외의 값 변경·컴포넌트 재구현·CSS 속성 추가/삭제는 전부 금지.

**적용 범위**: 이 규칙 확정(2026-08-21) 이후 신규 작성 문서부터 적용. 이전에 작성된 기존 문서는 소급 재작업하지 않는다 — 작성 시점 템플릿 기준으로 유효했던 스냅샷으로 둔다.

**완료 전 검증**: `<style>`의 사이드바·footer·`.proof`·`.badge` 블록과 `<script>` 블록을 원본 템플릿과 대조해 값 차이가 없는지 확인한 뒤에만 작성 완료로 본다(2026-08-21 감사 — 기존 산출물 5개 전수 대조 결과 전부에서 구조 또는 값 이탈이 발견됨).

---

## 1. 이 템플릿을 사용하는 경우

| 상황 | 이 템플릿 | 산출물 HTML |
|------|-----------|-------------|
| 인프라 협의 문서 (INFRA_ARCH) | ✅ | — |
| 보안 검토 요청서 | ✅ | — |
| 기술 기획·제안서 | ✅ | — |
| 회의 결과 보고서 | ✅ | — |
| MDS 표준사전 적용 리포트 (§12) | ✅ | — |
| REQ·FLW·ARC·SCR 등 15종 산출물 | — | ✅ |

**기준**: collab 프로세스 밖에서 단독 작성하는 협의·보고용 HTML이면 이 템플릿을 사용한다.

> **"최소 기능으로" 지시와 템플릿 생략을 혼동하지 않는다.** 사용자가 "간단하게"·"최소한 기능으로만" 등으로 요청해도, 그것이 "이 템플릿을 쓰지 말고 별도 구조로 만들라"는 지시인지는 별개로 확인해야 한다. 템플릿 사용 여부 자체를 생략하려면 만들기 **전에** 먼저 확인받는다 — 임의로 가벼운 구조를 먼저 만들어 놓고 "이렇게 만들었는데 템플릿을 쓸까요?"로 사후에 묻지 않는다(2026-08-19 eacct_chatbot MDS check report 사례).

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

**버전 규칙**:
- **초안 단계**: `v0.1`부터 시작. 내용 변경마다 `v0.2`, `v0.3` … 마이너 증가.
- **최종 확인 완료 시**: `v1.0`으로 승격. "최종 확인"은 문서 대상자(협의 상대방·승인권자)의 명시적 컨펌을 의미 — 작성자 스스로 판단해 올리지 않음.
- **v1.0 이후 변경**: 내용 수정은 `v1.1`, `v1.2` … / 구조를 다시 갈아엎는 재작성은 `v2.0`.
- 버전 올릴 때 동시 갱신할 지점 4곳: ① 파일명 `_vN` ② `<title>` 태그 ③ 상단 `tag` 배지(🔖) ④ 푸터 메타 텍스트.
- **사이드바에는 버전을 표기하지 않는다(2026-08-21부터).** 과거에는 사이드바 제목 아래 `sb-ver` 배지에도 버전을 표기했으나 제거함 — `.sb-ver` CSS·`{{VERSION}}` 마크업이 템플릿에서 삭제되었으므로 신규 문서 사이드바에 버전 배지를 추가하지 않는다. 버전은 `<title>`·hero `tag` 배지·푸터 메타 3곳으로 충분히 노출된다.
- 날짜는 최초 작성일 고정 (갱신해도 변경 안 함).

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

> **뷰어 표시 문제로 MD 원본 데이터를 삭제하지 않는다.** 마크다운 프리뷰의 스크롤·고정 헤더 등 렌더링 제약은 MD 자체의 콘텐츠 삭제나 "자세한 내용은 HTML 참조" 식 포인터 문구로 해결하지 않는다. 표시 문제는 HTML(프레젠테이션 변환본) 쪽에서만 해결하고, MD는 항상 전체 데이터를 그대로 유지한다(2026-08-19 eacct_chatbot MDS check report 사례 — 스크롤이 안 된다는 이유로 MD의 36행 표를 통째로 지우고 HTML 링크만 남겨 SoT가 깨짐).

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

## 3.6 콘텐츠 자기완결성 (다른 문서 참조 금지)

이 템플릿으로 만드는 문서는 **단독으로 배포·공유**된다. 받는 사람은 MD 원본이나 프로젝트 내부의 다른 md 파일에 접근할 수 없다고 가정한다.

**금지**: "자세한 내용은 `{파일 경로}` §4 참조", "{다른 문서명} §2에 정리되어 있어 중복 기술하지 않음" 같은 문구로 다른 문서·파일을 가리키는 것. 읽는 사람은 어떤 문서의 어떤 내용인지 알 수도, 열어볼 수도 없다.

**대신**: 참조하려던 내용을 실제로 읽고 요약해 본문에 직접 인라인으로 써넣는다. 원본이 길면 핵심만 추려도 되지만, "가서 봐라"식 문장은 남기지 않는다.

**예외 — 허용되는 참조**:
- 같은 문서 안의 다른 섹션을 가리키는 self-reference (예: "§4.2 절차대로 확인"). 사이드바로 바로 이동 가능하므로 문제 없음.
- 15종 산출물(REQ·FUNC·ARC 등) 간의 trace 링크는 `HTML-generation-guide.md` §2.3 규칙에 따라 문서 ID + 실제 링크로 연결 — 이 템플릿(PRES)이 아니라 산출물 체계에만 적용되는 별도 규칙.

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
| `{{META_AUTHOR}}` | 작성자 — **고정값** `Jacey(AX전략팀)` (personal.yml 참조 안 함) | `Jacey(AX전략팀)` |
| `{{META_TARGETS}}` | 대상 프로젝트명 | `eacct_chatbot · eacct_mcp` |
| `{{META_CODES}}` | 프로젝트 코드 | `P2605121 · P2605081` |
| `{{SB_FOOT_DATE}}` | 사이드바 하단 작성일 | `2026-06-30` |
| `{{SB_FOOT_AUTHOR}}` | 사이드바 하단 작성자 — **고정값** `Jacey(AX전략팀)` | `Jacey(AX전략팀)` |
| `{{FOOTER_SUBTITLE}}` | 푸터 시스템/문서명 | `e-Acct AI 챗봇/MCP 시스템` |
| `{{FOOTER_META}}` | 푸터 우측 메타 — 작성자는 **고정값** `Jacey(AX전략팀)` | `작성일: 2026-06-30 · 작성자: Jacey(AX전략팀)<br>대상: ... · v3` |

> **작성자 표기 규칙**: 이 템플릿(PRES) 산출물의 작성자는 `personal.yml → author_display`를 참조하지 않고 항상 `Jacey(AX전략팀)`으로 고정한다.

---

## 5. 사이드바 구성

```html
<div class="nav-ch">I. 챕터 이름</div>           <!-- 그룹 라벨 -->
<a class="nav-item" data-target="s1-1" tabindex="0">
  <span class="ni-n">1.1</span>섹션 이름
</a>
```

- `nav-ch`: 섹션 그룹 구분선. 보통 챕터 단위로 1개씩.
- `nav-item`: 개별 링크. `data-target`의 값은 해당 `<section id="...">` 와 반드시 일치.
- `ni-n`: 번호 라벨 (예: `1.1`, `2.3`). 숫자 대신 아이콘도 가능.
- 섹션이 5개 이하면 `nav-ch` 없이 `nav-item` 나열 가능.
- **`nav-item`은 `href`를 쓰지 않는다** — `data-target="s1-1"` + `tabindex="0"`로 대체하고, 하단 스크립트가 `click`/`keydown`(Enter·Space)에서 `scrollIntoView()`로 직접 이동시킨다. **이유:** Teams 등 첨부파일 미리보기 뷰어는 파일을 자체 프레임/라우팅으로 감싸는데, `href="#id"` 네이티브 fragment 이동이 이 라우팅과 충돌해 빈 페이지로 튀는 사례가 있었다. `preventDefault()`로 막는 시도도 무력화됐던 걸로 봐서 뷰어가 `href` 자체를 가로채는 것으로 판단 — `href` 속성을 완전히 제거해 네이티브 이동 트리거 자체를 없앤 구조. `.nav-item`에는 `cursor:pointer`를 별도 지정(‑`href` 없는 `<a>`는 기본 커서가 포인터가 아님).
- **알려진 제약: Teams 첨부파일 미리보기에서는 사이드바 클릭 이동이 동작하지 않는다 (no-op)** — 해당 뷰어가 `<script>` 실행을 전면 차단하는 것으로 판단됨 (본문 표시·`.rv` 애니메이션 폴백은 §"애니메이션 (.rv)" 참조). `href` 제거 구조 덕분에 클릭 시 빈 페이지로 튀지는 않고 조용히 무반응 — 본문 내용 자체는 스크롤로 정상 열람 가능. 이는 버그가 아니라 Teams 뷰어의 JS 차단 정책에 의한 구조적 한계이므로 재작업 대상 아님. 사이드바 클릭 이동까지 필요하면 "브라우저에서 열기"로 안내.
- **`sb-foot`(사이드바 하단 작성일·작성자 2줄)은 중앙 정렬(`text-align:center`)이 템플릿 기본값**(2026-08-20) — 개별 문서에서 별도 지정 불필요.

### 5.1 사이드바 접기/펼치기 (`#sidebar-toggle`)

- 데스크톱 전용 컴포넌트. `#menu-btn`(모바일 햄버거) 바로 뒤에 위치.
- `onclick`으로 `<body>`에 `sb-collapsed` 클래스를 토글 → CSS 커스텀 속성 `--sidebar-w`가 `0px`로 재정의되며 사이드바·본문·`#progress`·`#chapter-chip` 등 관련 요소가 한 번에 반응.
- `body` 레벨에서 `--sidebar-w`를 재정의하는 이유: `#progress`·`#chapter-chip`·`#menu-btn`이 `.layout` 밖의 `<body>` 직속 자식(fixed 포지션)이라 `.layout`에 스코프하면 이 요소들에 전파되지 않음. CSS 커스텀 속성은 `position:fixed`와 무관하게 DOM 트리를 따라 상속되므로 `body` 레벨 재정의가 정답.
- **접힌 상태 `left` 값은 고정 오프셋으로 별도 지정 필수** — `left:calc(var(--sidebar-w) - 13px)`는 펼침(224px) 기준 `211px`이지만 접힘(0px) 시 `-13px`이 되어 버튼 절반이 화면 밖으로 잘려나감. `body.sb-collapsed #sidebar-toggle{left:10px}` 규칙으로 접힘 상태만 별도 고정값을 줘야 함.
- 상태는 저장하지 않음 — 새로고침 시 항상 펼쳐진 상태로 초기화 (의도적 단순화).
- 모바일(`max-width:768px`)에서는 `display:none` — 기존 `#menu-btn` 토글과 역할이 겹치지 않도록 분리.
- 신규 문서 작성 시 별도 조치 불필요 — 템플릿에 이미 포함되어 있음.
- **접힘 애니메이션 중 사이드바 텍스트가 줄바꿈되며 찌그러지는 것처럼 보이는 버그(2026-08-21 수정, 2026-08-21 재수정)**: `.sidebar`의 `width`가 `.25s` 동안 애니메이션되는데, 텍스트 요소에 `white-space:nowrap`이 없으면 브라우저가 매 프레임 줄바꿈을 다시 계산해 글자가 눌리는 것처럼 보인다.
  - `.sb-title`·`.sb-lbl`·`.sb-foot`(항상 짧고 고정된 텍스트)은 **상시** `white-space:nowrap` 적용 — 신규 문서 작성 시 별도 조치 불필요.
  - `.nav-ch`·`.nav-item`(섹션 라벨 — 문서마다 길이가 제각각, 긴 라벨이 흔함)은 상시 `nowrap`을 걸면 펼침 상태에서 224px 사이드바 폭을 넘는 라벨이 `.sidebar{overflow-x:hidden}`에 잘려나가는 회귀가 생길 수 있어, **`body.sb-collapsed .nav-ch, body.sb-collapsed .nav-item{white-space:nowrap}`로 접힘 상태(및 접힘 애니메이션 중)에만 스코프**해 적용한다. 펼침 상태에서는 여전히 정상적으로 줄바꿈된다. 신규 문서 작성 시 별도 조치 불필요 — 단, 사이드바 텍스트 관련 CSS를 개별 문서에서 덮어쓸 때 이 스코프 규칙을 제거하지 않도록 주의.
  - **1차 수정(같은 날) 당시 실수**: 리포트 원본 파일에는 `.sb-title`·`.sb-lbl`·`.sb-foot`에만 `nowrap`을 적용하고 `.nav-ch`·`.nav-item`(사이드바 본문 대부분을 차지)에는 적용을 빠뜨린 채 "수정 완료"로 기록한 사례가 있었다 — 편집 직후 대상 selector 전체를 grep으로 재확인하지 않고 완료로 표기한 것이 원인. 재발방지: CSS 속성 추가 후에는 반드시 grep으로 의도한 selector 전체에 적용됐는지 확인한 뒤에만 완료로 기록한다.

```html
<button id="sidebar-toggle" onclick="document.body.classList.toggle('sb-collapsed')" aria-label="사이드바 접기/펼치기">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
</button>
```

### 5.2 사이드바 제목 클릭 → 본문 최상단 이동 (`#sb-title-home`)

- `.sb-title`에 `id="sb-title-home"` + `tabindex="0"` + `cursor:pointer`가 템플릿에 기본 포함되어 있음 — 신규 문서 작성 시 별도 조치 불필요.
- 클릭 또는 Enter/Space 시 `scrollTo({top:0, behavior:'smooth'})`로 본문 최상단으로 이동하고 모바일 사이드바를 닫는다.
- 5.3의 순차 하이라이트 이동 중 사이드바 제목을 클릭하면 진행 중인 이동을 즉시 취소(`travelLock`을 풀어 스크롤 기반 하이라이트가 곧바로 제어권을 되찾음).

### 5.3 nav 클릭 시 파란 하이라이트 순차 이동

- 사이드바 항목 클릭 시, 기존 활성 항목에서 클릭한 항목까지 `.active` 클래스가 한 항목씩(약 45ms 간격) 순서대로 이동한 뒤 도착 지점에서 멈춘다 — 즉시 점프가 아니라 "지나가는" 느낌의 효과.
- 이동 중에는 스크롤 기반 active 갱신 로직이 `travelLock` 플래그로 잠시 비활성화되고, 도착 후 약 300ms 뒤 잠금이 풀려 스크롤 기반 로직이 다시 제어권을 가져간다.
- 템플릿 하단 `<script>`의 `travelHighlight()` 함수로 구현되어 있음 — 신규 문서 작성 시 별도 조치 불필요.

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
- **숨김 상태는 JS가 붙이는 `.pre` 클래스로만 발생** — `.rv` 자체는 `opacity:0`을 갖지 않는다. `IntersectionObserver` 초기화 스크립트가 `el.classList.add('pre')`로 숨긴 뒤 교차 시 `.in`으로 전환한다. **이유:** Teams·SharePoint 등 첨부파일 미리보기 뷰어는 `<script>` 실행을 차단하는 경우가 있는데, 과거처럼 `.rv{opacity:0}`을 CSS에 정적으로 걸어두면 JS가 아예 안 돌 때 표지(히어로) 이후 모든 섹션이 영원히 안 보이는 상태로 굳어버린다 (사이드바 앵커 이동은 되지만 도착 지점이 투명해서 "링크가 안 된다"처럼 보임). 지금 구조는 JS가 죽어도 기본 노출, JS가 살아있을 때만 애니메이션이 얹히는 폴백이다.

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
  <p>설명 텍스트. <b style="color:var(--sky-400)">강조 경로</b></p>
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
  --navy-800: #1D1D1F;   /* 본문 진한 텍스트 (h2·h4·h5·db-label 등) — 다크 배경 아님, 텍스트 전용 */
  --navy-700: #3A3A3C;   /* 본문 보조 텍스트 (comm-title 등) */
  --sky-400:  #0071E3;   /* 주 강조색 (파랑) */
  --cyan-300: #0058B0;   /* 보조 강조색 (진한 파랑) */
  --card:     #FFFFFF;   /* 카드 배경 */
  --line:     #E6E6EA;   /* 구분선 */
  --ink:      #1D1D1F;   /* 본문 텍스트 */
  --muted:    #6E6E73;   /* 보조 텍스트 */
  --sidebar-w: 224px;    /* 사이드바 너비 */
  --content-w: 1320px;   /* 본문 컨테이너(.wrap) 최대 너비 */
}
```

**2026-07-03 애플룩(Apple-style) 테마로 전면 교체.** 사이드바·Hero·divider·footer·proof·테이블 헤더 배경은 위 변수가 아닌 각 선택자에 밝은 회색(`#F5F5F7` 등)을 직접 하드코딩한다 — `--navy-800`/`--navy-700`이 텍스트색과 배경색에 동시에 쓰이던 기존 구조상, 변수만 교체하면 한쪽이 깨지기 때문. 색상 테마를 다시 바꿀 때도 `--sky-400` / `--cyan-300` 교체가 주 강조색을 일괄 변경하는 지점이라는 원칙은 동일하다.

**2026-08-20 본문 너비 확대 — `.wrap`을 고정 `920px`에서 `max-width:min(var(--content-w),94vw)`로 변경.** 920px 고정폭에서는 사이드바(224px)를 뺀 나머지 화면이 넓은 모니터일수록 본문 좌우에 큰 여백만 남고, 컬럼이 많은 비교표(MDS 명명 비교 리포트 등)가 좁은 폭에 눌려 가독성이 떨어지는 문제가 있었다(2026-08-20 `eacct_chatbot_auth_state_ddl_mds_check_report.html` 사례 — 본문이 화면 절반도 못 채움). 기본값을 `1320px`로 상향하고 `94vw` 상한을 같이 둬 좁은 창에서도 자동으로 줄어든다.
- 표·비교 컬럼이 특히 많은 문서는 문서 자체 `<style>` 블록에서 `:root{--content-w:1560px}`(또는 필요한 값)로 한 곳만 재정의하면 전체 `.wrap`이 함께 넓어진다. `.wrap` 선택자 자체를 개별 문서에서 오버라이드하지 않는다 — `padding`·`margin:0 auto` 등 다른 속성까지 흩어져 재정의될 위험이 있다.
- 기존에 `920px` 기준으로 만들어진 문서를 넓히려면 템플릿을 다시 복사하지 않고, 해당 문서 `:root`에 `--content-w` 변수만 추가하면 된다.

---

## 10. 작성 체크리스트

- [ ] **템플릿 구조·값 이탈 없음** (§0) — 사이드바·footer·`.proof`·`.badge`·`<script>` CSS/로직을 원본 템플릿과 대조 완료, 명시된 확장 지점 외 변경 없음
- [ ] **MD 원본 파일 먼저 작성 완료** (§3.5) — HTML보다 먼저, 같은 폴더에
- [ ] 다른 문서·파일을 "참조" 문구로 가리키는 곳 없음 — 필요한 내용은 전부 인라인 (§3.6)
- [ ] 다른 문서의 내부 트래킹 코드(T0xx 게이트 번호 등)를 그대로 노출한 곳 없음 — 코드 대신 그 내용을 직접 서술 (§3.6)
- [ ] `{{...}}` 플레이스홀더 전체 교체 완료
- [ ] 사이드바 `data-target="id"` 와 `<section id="...">` 일치 확인
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

## 12. MDS 적용 리포트 (표준사전 준수 검증)

DB 테이블·컬럼의 논리명/물리명을 MDS 표준사전(STD-001/STD-002)과 전수 대조해 불일치·미등록·모호 항목을 보고하는 문서. 15종 formal 산출물(REQ·FUNC 등)의 ID/frontmatter/trace 체계를 쓰지 않으므로 `HTML-generation-guide.md` 대상이 아니라 이 가이드(PRES)의 하위 패턴이다.

**리터럴 복사 예시** — 신규 MDS 적용 리포트를 만들 때는 아래 두 파일을 실제로 Read해 그대로 복사한 뒤 표 데이터만 교체한다. "이런 구조였지" 하는 기억으로 재현하지 않는다 (§0과 동일 원칙):
- `projects/eacct_chatbot/docs/db_schema/eacct_chatbot_auth_state_ddl_mds_check_report.md`
- `projects/eacct_chatbot/docs/db_schema/eacct_chatbot_auth_state_ddl_mds_check_report.html`

### 12.1 제목 규칙

`{시스템/DB명} — MDS Governance 적용 리포트` 형식으로 통일한다. MD H1, HTML `<title>`, 히어로 H1, 사이드바 홈 타이틀(`#sb-title-home`) 4곳에 동일하게 적용한다. 챕터 칩·사이드바 라벨·히어로 킥커·푸터 브랜드 문구(예: `MDS CHECK`, `MDS CHECK REPORT`, `MDS NAMING CHECK`)는 "제목"이 아니라 재사용 가능한 범용 배지이므로 이 규칙 대상이 아니다.

### 12.2 MD/HTML 역할 차이 — 다른 협의 문서와 다른 점

일반 협의 문서(§3.5)는 MD·HTML이 항상 동일 시점의 동일 콘텐츠 쌍이지만, MDS 적용 리포트는 구조가 다르다:

- **MD = living SoT** — DDL이 바뀔 때마다 §1에 날짜별 변경 이력 blockquote(`> 2026-08-19 ...`)를 계속 append하며 갱신된다.
- **HTML = 특정 시점 고정 스냅샷** — 배포·공유 시점의 비교표 데이터만 반영하고, MD의 날짜별 변경 이력 blockquote는 옮기지 않아도 된다. 단, HTML의 비교표 데이터 자체는 항상 MD와 최신 상태로 일치해야 한다(데이터 불일치는 결함, 이력 서술 생략은 의도된 구조).
- MD를 갱신한 뒤 HTML을 공유 배포하기 전에는 반드시 두 파일의 비교표 데이터(판정·추천 물리명 등)를 대조해 일치 여부를 확인한다.

### 12.3 물리 식별자 표기 — 항상 소문자

"컬럼(물리명)"·"추천 물리명"·"제안단어물리명" 등 실제 테이블/컬럼 식별자를 담는 칸은 대소문자 구분 없이 **항상 소문자**로 표기한다(DB가 실제로 대소문자를 구분하지 않더라도 리포트 표기를 소문자로 통일). 아래는 보존 대상(대문자 유지)이다:

| 보존 대상 | 사유 |
|---|---|
| `VARCHAR`/`DATETIME`/`DECIMAL` 등 SQL 타입 키워드 | §4.3 DDL 원문 블록의 SQL 문법 |
| `STD-001`/`STD-002` | 표준사전 태그 |
| `MDS` | 문서 전역 고유명사(브랜드) |
| 결정 로그 ID(예: `D050`) | `_manage/decisions.md` 참조 ID |
| 논리명(한글) 안에 자연어로 섞인 `AI`/`ID` 등 영문 낱말 | 물리 식별자가 아니라 한글 문장 속 영문 loanword |

**정규식 함정 주의**: 대소문자 변환을 정규식 일괄 치환으로 처리할 경우, `\b[A-Z][A-Z0-9_]*\b` 같은 단어 경계 패턴은 `?_EVENT_HIST`처럼 밑줄(`_`) 바로 뒤에 오는 대문자를 놓친다 — `_`와 `E`가 둘 다 "단어 문자"라 그 사이에 `\b`가 성립하지 않기 때문이다. `?_`·`bfr/reloc_?_` 접두사가 붙은 "추천 물리명" 칸이 있는 문서는 치환 후 반드시 해당 칼럼을 별도로 재검사한다(2026-08-21 eacct_chatbot 사례 — 이 함정으로 14개 셀이 미변환 상태로 남았다가 재검증에서 발견·수정됨).

### 12.4 표준 구조

```
§1 불일치·미등록·모호 항목       ← 변경 이력 blockquote + 비교표
§2 미등록 세그먼트 정리          ← 세그먼트별 제안 물리명·의미·근거
§3 요약                         ← 수치 요약 (일치/불일치/미등록/모호 건수)
§4(4.1~4.2) 전체 현황            ← 테이블명 전체 / 컬럼명 전체 (일치+미등록+모호 전수 + 판정 열)
§4.3(§5) 현행화된 DDL 원문       ← 실제 배포 DDL과 100% 동일한 fenced sql 블록
```

§1은 하이라이트용 예외 목록(변경이력 blockquote 포함), §4는 전체 항목 상세 참조표 — 두 섹션은 용도가 다르므로 일부 행이 중복 표기돼도 무방하다.

### 12.5 저장 위치·파일명

`projects/{프로젝트}/docs/db_schema/{대상}_mds_check_report.md`(+`.html`) — DDL 파일과 같은 폴더에 둔다.

---

## 참고

- 기반 문서: `projects/eacct_mcp/docs/infra/INFRA_ARCH_20260630_chatbot-mcp-ecs_v3.html`
- MDS 적용 리포트 기반 문서: `projects/eacct_chatbot/docs/db_schema/eacct_chatbot_auth_state_ddl_mds_check_report.html`(+`.md`)
- 산출물 HTML 가이드: `platform/templates/deliverables/guides/HTML-generation-guide.md`
