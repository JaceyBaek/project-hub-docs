# Changelog

버전 규칙: [Semantic Versioning](https://semver.org/lang/ko/)
- **MAJOR** — 플랫폼 구조 변경 (폴더 체계, 핵심 규칙 변경)
- **MINOR** — 기능 추가 (트리거, 스크립트, 템플릿 등)
- **PATCH** — 버그 수정, UI 개선, 문서 수정

---

## [v1.0.0] — 2026-05-07

### BREAKING CHANGE
- 두 비서 구조(`hub_assistant` + `project_assistant`)를 단일 비서(`assistant`)로 통합
- 프로젝트 유형 `general`/`dev` 2종 → `dev` 단일

### Changed
- **비서 통합** — 단일 비서 "아이다 (Aida)"로 운영
  - 의미 변경: "돕는 자" → "이익을 주는 자, 보상하는 자" (아랍어 어원에 맞게 정정)
  - 역할 전환 규칙 섹션 제거, 작업 경로 기반 적용 규칙으로 대체
- **변수 통일** — `{hub_assistant}` / `{project_assistant}` → `{assistant}`
  - 대상: CLAUDE.md, TRIGGERS.md, ENHANCEMENTS.md, TODO_GLOBAL.md, README.md, guides/SETUP.md, templates/deliverables/DEPLOYMENT.md
  - 히스토리·changelog 변수 표기는 작성 시점 보존 원칙으로 유지
- **`config/personal.yml`** 단일 `assistant` 키 구조
- **`hub_init.py`** 입력 단계 4 → 3 (사용자 → 비서 → GitHub), 플레이스홀더 `{{ASSISTANT_*}}` 단일화
- **`init_project.py`**
  - `--type` 인자 제거
  - 폴더명 자동 부여(`YYYYMM_폴더명`) 로직 제거
  - 대화형 가드(`_interactive_collect`) 추가 — 인자 누락 시 1개씩 질문하는 방식으로 보완
  - `_sync_project_assistant_in_file` 제거 (변수 기반 CLAUDE.md에서는 불필요)
- **템플릿** `templates/CLAUDE_global.template.md`, `templates/SETUP.template.md` 단일 비서 구조로 재작성

### Removed
- 두 비서 역할 전환 선언 절차
- 프로젝트 일반(general) 유형 (Confluence가 더 자연스러운 위치)

### Migration
- 기존 fork 사용자: `python hub_init.py` 재실행으로 새 `personal.yml` 구조 생성 권장
- 기존 5개 프로젝트는 변경 영향 없음 (모두 dev 유형이었음)

---

## [v0.3.0] — 2026-04-29

### Added
- `ENHANCEMENTS.md` — 플랫폼 고도화 백로그 (E-001~E-026), 필수/상/중/하 분류
- Docsify 로컬 웹뷰어 구현 (`index.html`, `_sidebar.md`, `.nojekyll`)
- `TRIGGERS.md` 트리거 3개 추가
  - "웹뷰 열어줘" — 로컬 서버 + 브라우저 자동 오픈
  - "웹뷰 종료" — 포트 기반 프로세스 종료
  - "메모리 저장" — compact 가능 여부 체크 후 메모리 저장
- 시맨틱 버저닝 도입 + `CHANGELOG.md`

### Changed
- `index.html` UI 개선
  - 사이드바 타이틀: SVG 허브 로고 + 20px 타이틀 + 서브타이틀
  - 검색창: pill 형태, focus glow 효과
  - 본문: 노션 스타일 (폰트·줄간격·테이블·코드블록·인용구)
  - 복사 버튼: `.code-wrapper` 래퍼 분리 (hover 시 불필요한 스크롤 제거)
  - 본문 h1 옆 파일명 뱃지 자동 삽입 (JS hook)
  - 활성 메뉴 항목 배경 하이라이트

---

## [v0.2.0] — 2026-04-28

### Added
- `init_project.py` 전면 개선
  - UTF-8 인코딩 설정, ASSISTANT_PRESETS 5종
  - `ensure_personal_config()` — user_name·project_assistant 누락 시 안내 후 저장
  - argparse CLI 모드 추가 (`--name/--type/--summary/--yes`)
  - CLI/인터랙티브 공용 함수 분리
  - `_sync_project_assistant_in_file()`: CLAUDE.md 비서명 자동 동기화
- 단위 테스트 케이스 HTML 산출물 (`docs/project_hub_UTC_20260427.html`, 28개 TC)

### Changed
- `CLAUDE.md` 새 프로젝트 시작 규칙 전면 개정 (세라 대화 수집 → CLI 자동 실행 방식)
- `CLAUDE.md` 세라/아이다 역할 분리 및 자동 전환 규칙 추가
- `CLAUDE.md` 전면 압축 정리 (446줄 → 192줄, 57% 감소)
- `CLAUDE.md` 세션 시작 프로토콜 — TRIGGERS.md 자동 출력
- `docs/` `.gitignore` 추가 (로컬 전용)

---

## [v0.1.0] — 2026-04-27

### Added
- `D:\05.Claude\` → `D:\03.project-hub\` 물리적 이전 완료
- GitHub 연결 (`gsr-ax/project-hub`, Private)
- `guides/SETUP.md` 신규 작성
- `hub_init.py` 신규 생성 (개인화 초기화 스크립트)
- `templates/CLAUDE_global.template.md` 신규 생성
- `config/personal.yml.example` 신규 생성
- `.gitignore` `personal.yml` 추가

### Changed
- 전역 파일 정비 (`PROJECTS_GLOBAL.md`, `TODO_GLOBAL.md`, `ISSUES_GLOBAL.md`)
- `init_project.py` 버그 수정 2건
