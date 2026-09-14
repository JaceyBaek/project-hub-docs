---
title: "Mobile Presentation HTML 작성 가이드"
type: guide
template: MOBILE_presentation_template.html
updated: "2026-09-11 (최초 작성)"
---

# Mobile Presentation HTML 작성 가이드

> **이 가이드의 템플릿**: `platform/templates/html/MOBILE_presentation_template.html`
>
> 데스크톱 `PRES_presentation_template.html`과 동일한 컬러·타이포 언어(애플룩)를 쓰지만,
> 사이드바 대신 **상단바 + 풀스크린 오버레이 메뉴 + 하단 탭바**로 구성된 모바일 앱 셸 구조다.
> `PRES-authoring-guide.md`의 데스크톱 규칙(§0 구조 준수, §3.5 MD 선행 작성, §3.6 자기완결성 등)은
> 이 템플릿에도 원칙적으로 동일 적용되며, 이 문서는 모바일 전용 차이점만 다룬다.

---

## 0. 언제 이 템플릿을 쓰는가

- 데스크톱 PRES 문서를 모바일에서도 보기 좋게 별도 제공해야 할 때 (`{파일명}.html` + `{파일명}_mobile.html` 쌍)
- 카카오톡·문자 등으로 공유해 스마트폰에서 바로 열어볼 문서
- 표 대신 카드형 컴포넌트(타임라인·비교카드·스펙그리드)가 더 적합한 콘텐츠

데스크톱 문서 없이 모바일 문서만 단독으로 만드는 것도 가능하다 — 원본 자료(PDF 등)를 모바일 전용으로 재구성하는 경우.

---

## 1. 데스크톱 템플릿과의 구조적 차이

| 요소 | 데스크톱 (PRES) | 모바일 (이 템플릿) |
|---|---|---|
| 네비게이션 | 좌측 고정 사이드바 | 상단바 햄버거 → 풀스크린 오버레이 메뉴 |
| 빠른 이동 | 사이드바 상시 노출 | 하단 탭바(3~5개, 주요 챕터만) |
| 표 | `<table>` | `.spec-grid`(키/값 2열) 또는 `.compare`(A/B 비교) |
| 일정/흐름 | `.tbl-wrap` 표 | `.timeline`(세로 타임라인 + 카드) |
| 항목 나열 | `.grid3`/표 | `.dc-list`(상세 카드 리스트) |
| 프레임 | 전체 화면 사용 | `.app`이 최대 480px 폭 컨테이너 — 넓은 화면에선 앱처럼 보이는 프레임, 실제 폰에선 풀스크린 |
| 챕터 표시 | 우상단 고정 칩(`#chapter-chip`) | 상단바 중앙 라벨(`#tb-title`)이 같은 역할 |

**공용 컴포넌트(거의 동일)**: `.hero`, `.divider`, `.checklist`, `.badge-*`, `.proof`, `.rv` reveal 애니메이션, footer. 색상 변수(`--sky-400`, `--cyan-300` 등)도 데스크톱과 동일해 같은 브랜드로 인식된다.

---

## 2. 파일명 규칙

데스크톱 문서가 있는 경우, **동일 파일명 + `_mobile` 접미사**를 붙인다.

```
7_Guys_Winter_Night_Story_Edition_KR.html          ← 데스크톱
7_Guys_Winter_Night_Story_Edition_KR_mobile.html   ← 모바일 (이 템플릿)
```

단독 모바일 문서는 데스크톱 파일명 규칙(`{TYPE}_{YYYYMMDD}_{설명}_v{N}.html`)을 그대로 따르되 `_mobile`을 붙이지 않아도 된다 — 파일명 자체에서 유일하게 식별되면 충분하다.

---

## 3. 필수 교체 항목 (`{{...}}`)

| 플레이스홀더 | 설명 |
|---|---|
| `{{DOC_TITLE_SHORT}}` | `<title>` 태그 텍스트 |
| `{{TOPBAR_LABEL}}` | 상단바 중앙 기본 라벨 (스크롤 시 챕터명으로 자동 교체됨) |
| `{{MENU_LABEL}}` | 풀스크린 메뉴 상단 카테고리 라벨 |
| `{{MENU_TITLE}}` | 풀스크린 메뉴 상단 제목 (Hero h1과 동일 내용) |
| `{{HERO_BRAND}}` / `{{HERO_H1_L1}}` / `{{HERO_H1_L2}}` / `{{HERO_SUB}}` | Hero 영역 |
| `{{META_DATE}}` / `{{META_AUTHOR}}` / `{{META_TARGET}}` / `{{VERSION}}` | Hero 태그 + 푸터 공용 |
| `{{MENU_FOOT_DATE}}` / `{{MENU_FOOT_AUTHOR}}` | 메뉴 하단 |
| `{{FOOTER_TITLE}}` / `{{FOOTER_SUB}}` | 푸터 |

작성자 표기는 데스크톱 PRES 규칙과 동일하게 `personal.yml`을 참조하지 않고 고정값 `Jacey(AX전략팀)`을 쓴다.

---

## 4. 컴포넌트 사용 가이드

### 4.1 비교 카드 (`.compare`)
두 대안(A/B)을 항목별로 나란히 비교할 때. 표 대신 세로로 쌓이는 카드형이라 좁은 화면에서 읽기 쉽다.

```html
<div class="compare">
  <div class="cmp-row">
    <div class="cmp-label">비교 축 이름</div>
    <div class="cmp-cols">
      <div class="cmp-col a"><span class="cc-tag">기존 A</span>내용</div>
      <div class="cmp-col b"><span class="cc-tag">신규 B</span>내용</div>
    </div>
  </div>
</div>
```

### 4.2 타임라인 (`.timeline`)
시간순 일정·프로세스 흐름에 사용. `.tl-fun`은 부가 메모/재미 요소용 보조 박스.

```html
<div class="timeline">
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-time">18:00</div>
    <div class="tl-card">
      <div class="tl-stage">단계 이름</div>
      <div class="tl-place">장소/담당</div>
      <div class="tl-desc">설명</div>
      <div class="tl-fun"><b>메모 —</b>&nbsp;부가 설명</div>
    </div>
  </div>
</div>
```

### 4.3 스펙 그리드 (`.spec-grid`)
키/값 2열 표를 대체. 컬럼이 3개 이상인 표는 스펙 그리드로 억지로 옮기지 말고 `.dc-list`나 `.compare`로 재구성한다.

### 4.4 상세 카드 리스트 (`.dc-list`)
항목 나열·요약. `.dc-num`은 라벨/순서, `.dc-title`은 제목(선택), `.dc-body`는 본문.

---

## 5. 네비게이션 데이터 연결 규칙

- 풀스크린 메뉴의 `.menu-item`, 하단 탭바의 `.tab-item` 모두 `data-target="{section id}"`로 해당 `<section id="...">`를 가리킨다.
- `<a href>`를 쓰지 않는다 — 전부 `<button>` + JS `scrollIntoView` 방식(데스크톱 PRES와 동일한 이유: 첨부파일 미리보기 뷰어의 fragment 이동 오작동 방지).
- 하단 탭바는 **3~5개만** — 전체 섹션이 아니라 챕터 대표 섹션(보통 각 챕터의 첫 섹션)만 연결한다. 전체 섹션을 다 넣으면 탭바가 좁은 화면에서 깨진다.
- 풀스크린 메뉴는 전체 섹션을 `.menu-ch`(챕터 그룹)로 묶어 나열한다 — 데스크톱 사이드바 nav와 동일 구조.

---

## 6. `.app` 프레임 구조 이해

`.app`은 `position:fixed` + `width:min(480px,100%)` + `left:50%; transform:translateX(-50%)`로 화면 중앙에 고정된 컨테이너다. 이 안에서 `.topbar`·`.tabbar`·`.menu-overlay`가 모두 `.app` 기준으로 붙어있는 것처럼 보이도록 좁은 프레임을 만든다.

- **데스크톱/태블릿(481px 이상)에서 미리보기**: 화면 중앙에 480px 폭의 "폰처럼 보이는" 카드가 뜨고, 바깥은 회색 배경 + "모바일 미리보기" 안내 문구가 나온다.
- **실제 모바일 기기(480px 이하)**: 프레임이 화면 전체를 채워 순수 풀스크린 앱처럼 보인다. 안내 문구도 자동으로 숨겨진다(media query).
- 이 구조를 바꾸거나 프레임 폭(`--frame-w`)을 임의로 늘리지 않는다 — 481px 이상에서 프레임이 커지면 모바일 미리보기 목적이 사라진다. 표 컬럼이 많아 넓혀야 하는 데스크톱 `--content-w`와는 성격이 다른 변수다.

---

## 7. 작성 체크리스트

- [ ] `{{...}}` 플레이스홀더 전체 교체 완료
- [ ] `.menu-item`/`.tab-item`의 `data-target`과 `<section id>` 일치 확인
- [ ] 하단 탭바 3~5개, 챕터 대표 섹션만 연결
- [ ] `data-chapter` 값이 상단바에 표시될 텍스트와 일치
- [ ] 표가 필요한 콘텐츠는 `.spec-grid`/`.compare`/`.dc-list` 중 적합한 컴포넌트로 재구성 (원본 `<table>` 그대로 넣지 않음)
- [ ] 데스크톱 문서가 있다면 파일명 `_mobile` 접미사, 같은 폴더에 위치
- [ ] 실제 스마트폰 폭(약 375~430px)과 데스크톱 미리보기 폭 양쪽에서 레이아웃 확인
- [ ] 스크롤 진행바·상단바 라벨 전환·풀스크린 메뉴 열기/닫기·FAB 동작 확인

---

## 참고

- 기반 문서: `7_Guys_Winter_Night_Story_Edition_KR_mobile.html` (2026-09-11, 카카오톡 받은 파일 폴더)
- 데스크톱 짝 템플릿: `platform/templates/html/PRES_presentation_template.html` + `PRES-authoring-guide.md`
