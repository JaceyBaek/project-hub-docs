<!--
sidebar_title: 산출물 배포
sidebar_order: 3
-->

# 산출물 템플릿 — 배포 절차

> 본 문서는 산출물 템플릿(`templates/deliverables/*.html`, `templates/deliverables/guides/*.md`, `templates/deliverables/assets/`, `templates/deliverables/index.html`)을 사내 환경에 배포하는 표준 절차를 정의한다.
>
> 모든 경로는 저장소 루트(`gsr-ax/project-hub`) 기준 상대 경로 `templates/deliverables/` 하위로 통일한다.

---

## 1. 배포 대상 자산

| 분류 | 경로 | 공개 여부 | 배포 대상 |
|---|---|:-:|---|
| 랜딩 | `templates/deliverables/index.html` | 공개 | Confluence |
| 스타일 | `templates/deliverables/assets/wireframe.css` | 공개 | Confluence 첨부 |
| 템플릿 (완성본) | `templates/deliverables/docs/*-final.html` | 공개 | Confluence + Git |
| 템플릿 (와이어) | `templates/deliverables/docs/*.html` (그 외) | 내부 검토용 | Git 만 |
| 추적 매트릭스 | `templates/deliverables/docs/00-trace-matrix.html` | 공개 | Confluence + Git |
| **AI 작성 가이드** | `templates/deliverables/guides/*.md` | **AI/내부 전용** | Git 만 (외부 노출 금지) |

---

## 2. 배포 환경 (2-Track)

### Track A — Git 저장소 (원본)
모든 자산의 단일 진실 공급원.

- 저장소: **`gsr-ax/project-hub`**
- 자산 위치: `templates/deliverables/` 하위
- 브랜치: **`main` 단일 브랜치 운영** (project-hub 기존 정책 준수)
- 보호 규칙: `main` 직접 push 가능하나 PR 권장
- 태그: 배포 시점마다 `templates-v{YYYY.MM.DD}` 태그 (다른 자산과 구분)

### Track B — Confluence (사람 열람용)
사용자가 실제로 보고 사용하는 게시 환경.

- 공간(Space): `DOCS-TMPL` 신규 생성
- 페이지 권한: 사내 전체 읽기, 편집은 PMO/문서 오너만
- 게시 대상: 완성본(`*-final.html`) + 인덱스 + 추적 매트릭스
- 가이드(`templates/deliverables/guides/`)는 **게시 금지**

> **사내용 운영이므로 외부 정적 호스팅(GitHub Pages, S3 등)은 사용하지 않는다.**

---

## 3. 표준 배포 절차

### 3.1 사전 준비 (최초 1회)

1. `gsr-ax/project-hub` 저장소에 `templates/deliverables/` 디렉토리로 전체 자산 commit
2. Confluence Space `DOCS-TMPL` 생성
3. Space 권한 설정 (전사 읽기 / PMO 편집)
4. Space 사이드바 헤더에 `templates/deliverables/assets/wireframe.css` attach

### 3.2 신규/변경 배포 단계

| # | 단계 | 담당 | 산출물 |
|---|---|---|---|
| 1 | 작업 브랜치(또는 main)에서 템플릿 수정 | 문서 오너 | commit |
| 2 | 로컬에서 `templates/deliverables/index.html` 열어 링크/렌더 확인 | 문서 오너 | 검증 스크린샷 |
| 3 | PR 생성 → **hub 관리자 단독 검토 및 승인** | 문서 오너 + hub 관리자 | PR merge |
| 4 | `main` merge 후 배포 태그 부여 | 릴리즈 매니저 | `templates-v2026.04.27` |
| 5 | Confluence 페이지 갱신 (§4) | 릴리즈 매니저 | 페이지 업데이트 |
| 6 | 변경사항 공지 (Teams 채널 / 이메일) | 릴리즈 매니저 | 공지 메시지 |

### 3.3 롤백

- Git: 이전 태그로 `git revert` 또는 해당 경로만 checkout
- Confluence: 페이지 히스토리에서 이전 버전 복원

---

## 4. Confluence 게시 절차

### 4.1 페이지 트리 구조

```
DOCS-TMPL (Space)
└── 📄 산출물 템플릿 (랜딩 - templates/deliverables/index.html)
    ├── 📁 요구사항/설계
    │   ├── 📄 요구사항정의서 (REQ)
    │   ├── 📄 프로세스흐름도 (FLW)
    │   ├── 📄 화면정의서 (SCR)
    │   └── 📄 권한정의서 (ROLE)
    ├── 📁 개발/테스트
    │   ├── 📄 기능정의서 (FUNC)
    │   ├── 📄 단위테스트케이스 (UTC)
    │   ├── 📄 통합테스트시나리오 (ITS)
    │   └── 📄 아키텍처 (ARC)
    ├── 📁 운영/사용
    │   ├── 📄 운영자매뉴얼 (OPM)
    │   ├── 📄 사용자매뉴얼 (USM)
    │   └── 📄 설정가이드 (CFG)
    └── 📄 요구사항 추적 매트릭스 (TRC)
```

### 4.2 HTML → Confluence 변환 방법 (택1)

**방법 A. HTML Macro 플러그인 (가장 충실)**
1. 페이지 편집 → `+` → `Other macros` → `HTML`
2. `templates/deliverables/docs/*.html` 의 `<body>` 내부를 그대로 붙여넣기
3. `<head>` 의 CSS는 Space 스타일에 미리 attach 해 둘 것
4. 저장 후 렌더링 확인

**방법 B. Native 페이지로 수동 이식**
- Confluence 표 매크로로 옮겨 적기
- 추적성/편집성은 더 좋지만 시간 소요 큼
- 완성본만 이 방법 권장

**방법 C. Source Editor 로 paste**
- 페이지 편집 → `…` → `Source Editor` (관리자 권한 필요)
- HTML body 영역을 그대로 붙여넣기

### 4.3 게시 전 체크리스트

- [ ] head HTML 주석(AI 가이드)이 노출되지 않는다
- [ ] `templates/deliverables/assets/wireframe.css` 경로가 Space 첨부 경로로 치환됐다
- [ ] 페이지 간 상대 링크 (`../index.html`)가 Confluence 페이지 링크로 치환됐다
- [ ] 변경 이력 표 마지막 행에 이번 배포 내역이 추가됐다
- [ ] 메타바의 `Confluence` 경로 필드가 실제 페이지 경로와 일치한다

---

## 5. AI 작성 가이드 배포 (`templates/deliverables/guides/`)

가이드 파일은 사람 사용자에 노출되면 안 되며, AI 에이전트만 접근한다.

| 배포처 | 방법 | 비고 |
|---|---|---|
| Git 저장소 (`project-hub`) | 기본 | 모든 AI 작업의 1차 소스 |
| 사내 위키 (비공개) | Markdown 페이지 | PMO 권한자만 열람 |
| AI 컨텍스트 패키지 | system prompt 동봉 | 새 산출물 작성 시 자동 로드 |
| Confluence | **금지** | — |
| 외부 공개 호스팅 | **금지** | — |

---

## 6. 새 산출물 작성 시 AI 워크플로

1. AI는 작업 시작 시 `templates/deliverables/guides/{문서타입}-authoring-guide.md` 를 먼저 로드
2. `templates/deliverables/docs/{NN}-{문서타입}-final.html` 을 복사 → 실 산출물 위치 (예: `projects/{프로젝트명}/docs/{문서타입}.html`)
3. 가이드의 §5 자가 점검 체크리스트 통과 후 PR/페이지 생성
4. 검증표 (§10) 모든 행 PASS 확인
5. Confluence 게시는 사람 검토 후 수동

---

## 7. 변경 관리

- 템플릿 변경 시 영향 받는 모든 활성 산출물에 공지 필요
- Breaking change (필드 추가, ID 규칙 변경 등) 는 **major version bump**
- 변경 이력은 `templates/deliverables/CHANGELOG.md` 에 누적 (별도 작성 권장)

---

## 8. 권장 도구

| 용도 | 도구 |
|---|---|
| Git 호스팅 | GitHub (`gsr-ax/project-hub`) |
| Confluence 자동화 | `scripts/wiki_sync.py` (Atlassian REST API 기반 사내 스크립트) |
| 링크 검증 | `lychee` / `htmltest` |
| HTML 검증 | `html-validate` |

---

## 9. 책임자

| 역할 | 담당 | 책임 |
|---|---|---|
| 검토/승인 | **hub 관리자** | PR 단독 검토·승인, 템플릿 콘텐츠 오너십 |
| Confluence 관리자 | (별도 지정) | Space 권한, 매크로 플러그인, 페이지 게시 |
| AI 운영 | **{assistant}** | 가이드 컨텍스트 패키징, `wiki_sync.py` 운영, 챗봇 메타데이터 동기화 |
