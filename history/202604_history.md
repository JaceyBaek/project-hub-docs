# 글로벌 히스토리 — 2026년 04월

---

## 2026-04-15

### 전역 환경 구축 (Claude Code 세팅 첫 날)

- 전역 지시사항(CLAUDE.md) 전면 재작성
  - 사용자 프로필, Claude 역할, 응답 규칙 수립
  - 할루시네이션 방지 및 사실 기반 답변 규칙 추가
  - 아이다(Aida) / Jacey 호칭 확정
- 새 프로젝트 시작 트리거 규칙 수립
  - 폴더명 규칙: YYYYMM_프로젝트명 (언더바 구분)
  - 정식 프로젝트: projects\ / 실험·샘플: experiments\ 자동 분기
- 프로젝트 폴더 구조 설계 및 확정
  - docs\, refs\, archive\, _manage\ 구조 확정
  - _manage\ 하위: history\, meetings\, issues.md, todo.md, decisions.md, changelog.md
- 산출물 명명규칙 수립
  - 기본: 파일명_YYYYMMDD / 동일 날짜 복수 버전: _v1, _v2
- 일일 작업 히스토리 관리 규칙 수립
  - 파일명: YYYYMM_history.md / 월 단위 append 방식
- 이슈·To-Do·회의록·의사결정 로그·변경 이력 관리 규칙 수립
- 전역 관리 파일 생성
  - D:\05.Claude\PROJECTS.md
  - D:\05.Claude\TRIGGERS.md
  - D:\05.Claude\ISSUES.md
  - D:\05.Claude\TODO.md
- ex 프로젝트 폴더 구조 생성 (샘플)
- 산출물 템플릿 10종 생성 (Python 스크립트)
  - 분석: 요구사항정의서.xlsx, 프로세스흐름도.pptx
  - 설계: 기능정의서.xlsx, 권한정의서.xlsx, 화면정의서.pptx
  - 구현: 단위테스트케이스.xlsx
  - 시험: 테스트시나리오.xlsx, 결함관리대장.xlsx
  - 이행: 사용자매뉴얼.docx, 운영자매뉴얼.docx

---

### 전역 지시사항(CLAUDE.md) 구조 점검 및 개선

- 전역 관리 파일명 변경 (`_GLOBAL` 접미사 통일)
  - PROJECTS.md → PROJECTS_GLOBAL.md
  - TODO.md → TODO_GLOBAL.md
  - ISSUES.md → ISSUES_GLOBAL.md
- CLAUDE.md 내 참조 경로 일괄 업데이트
- 구버전 백업 파일 삭제 (CLAUDE_20260415.md)
- CLAUDE.md 구조 개선 (총 2라운드 점검)
  - 새 프로젝트 시작 규칙에 PROJECTS_GLOBAL.md 등록 단계(7번) 추가
  - 일일 작업 히스토리 관리 / 완료 후 수정 처리 규칙 → 독립 섹션(##)으로 분리
  - 세션 시작 동작 통합 → `세션 시작 프로토콜` 섹션 신설 (TRIGGERS.md 로드 포함)
  - 글로벌 히스토리 작성 시 글로벌/프로젝트 선택지 제시 규칙 추가
  - TRIGGERS.md 로드 항목을 세션 시작 프로토콜로 이동
  - 전체 프로젝트 관리 내 중복 항목 제거
  - 완료 후 수정 처리 규칙 위치 → 전체 프로젝트 관리 바로 다음으로 이동
- TRIGGERS.md 파일명 업데이트 (PROJECTS_GLOBAL, TODO_GLOBAL, ISSUES_GLOBAL 반영)
- 202604_project_structure_sample 프로젝트 생성 및 히스토리 기록

---

## 2026-04-16

### 전역 지시사항(CLAUDE.md) 방법론 전면 검토 및 개선

- PROJECTS_GLOBAL.md 구조 통일 (상태별 분리 테이블, 유형·운영중 섹션 추가)
- ISSUES_GLOBAL.md 내용 컬럼 추가
- 세션 시작 프로토콜 개선
  - 히스토리 누락 체크: 전날 파일 변경 여부 → 글로벌 히스토리 최근 날짜 기준으로 변경
  - 확인 대상: 글로벌 히스토리만 (안전망 역할)
- 세션 종료 프로토콜 신설
  - 마무리 뉘앙스 감지 시 글로벌·프로젝트 히스토리 기록 여부 순서대로 확인
- 히스토리 작성 방식 개선: 매번 선택 질문 → 아이다가 세션 작업 내용 보고 자동 판단·기록
- 히스토리 역할 명확화: 글로벌(전역 환경 변경) / 프로젝트(프로젝트 작업) 구분
- 완료 후 수정 기준 재정의 (예시 추가)
- 템플릿 복사 방식 확정: 아이다 제안 후 승인 또는 Jacey 직접 요청
- 프로젝트 상태 전환 절차 4가지 신설 (진행중↔보류, 진행중↔운영중)
- TRIGGERS.md 5개 트리거 추가, 기존 1개 동작 수정
- 프로젝트 유형 단순화: 사내시스템 제거, 아이다협업 전용으로 확정
- 응답 규칙 8번 개선: 과도한 분석·서브에이전트 제한 명시

### 전역 지시사항(CLAUDE.md) 2·3차 정밀 검토 및 추가 개선

- ISSUES_GLOBAL·TODO_GLOBAL 역할 재정의
  - 기존: 전체 이슈·To-Do 통합 관리 (프로젝트 항목 반영)
  - 변경: 프로젝트 무관 독립 항목 전용 / 전체 현황은 아이다가 동적 집계
  - TRIGGERS.md 이슈·To-Do 보여줘 트리거 동작 업데이트
- TODO_GLOBAL.md `프로젝트` 컬럼 → `출처` 변경 (개인 항목 포함 가능하도록)
- 이슈·To-Do 컬럼 스펙 글로벌/프로젝트용으로 분리 명시
- 프로젝트 완료 처리 히스토리 위치 명확화 (프로젝트 히스토리)
- 상태 전환 절차 전 항목에 히스토리 기록 단계 추가 (일관성 확보)
- 상태 전환 절차 형식 통일 (bullet+번호 혼용 제거)
- 프로젝트 상태 표기 형식에 `유형` 추가
- 응답 규칙 8번 가독성 개선 (단일 장문 → bullet point 분리)
- TRIGGERS.md CLAUDE.md 표현 → 프로젝트 CLAUDE.md로 명확화
- TRIGGERS.md 보류 처리 트리거에 히스토리 기록 단계 추가
- 새 프로젝트 시작 규칙 표현 수정 (성격에 맞는 → 표준)
- 사용자 프로필 내 프로젝트 유형 항목 전체 프로젝트 관리 섹션으로 이동
- 템플릿 사용 규칙 독립 섹션으로 분리
- 글로벌 히스토리 설명 정확화 (전역 환경 변경 기록으로 명시)

### 폴더 구조 정리

- experiments/ex 레거시 폴더 삭제 (빈 파일, PROJECTS_GLOBAL 미등록)
- D:\05.Claude\shared\ 폴더 삭제 (용도 미확정, 내용 없음)
- templates/create_templates.py → D:\05.Claude\ 직하위로 이동
- PROJECTS_GLOBAL.md 프로젝트명 수정 (project_structure_sample → 202604_project_structure_sample)
- 프로젝트 CLAUDE.md 보완 (유형 추가, 산출물 명명규칙 완성, 경로 구분자 통일)

---

### 개발 환경 설정 완료 (jacey-projects GitHub 저장소)

**관리 체계 확정**
- 개발 프로젝트 관리 파일 위치: `D:\05.Claude\projects\manage\` (GitHub 비연동 분리)
- 폴더 명칭 단순화: `jacey-projects` → `source`, `jacey-projects-manage` → `manage`
- CLAUDE.md 새 프로젝트 시작 규칙에 개발 프로젝트 케이스 추가 (일반/개발 구분)
- PROJECTS_GLOBAL.md에 jacey-projects 운영중으로 등록

**저장소 설정 추가**
- `source/CLAUDE.md` 생성 (저장소 컨텍스트, 관리 파일 위치, 신규 프로젝트 추가 절차)
- `.python-version` 생성 (Python 3.12 고정)
- `pyproject.toml` 생성 (black/flake8/pytest 설정 중앙화)
- `.github/PULL_REQUEST_TEMPLATE.md` 생성
- CI 개선: 단일 `ci.yml` → 프로젝트별 파일 분리 + `paths` 필터 적용
- pre-commit 로컬 설치 완료 (`pre-commit install`)
- pre-commit black 설정 오류 수정 (`--max-line-length` 제거 → pyproject.toml 위임)
- GitHub 기본 브랜치 `develop` 확인 / `origin/HEAD` 로컬 참조 업데이트

**hello_aida 테스트 프로젝트**
- 기존 임시 프로젝트 3개 삭제 (atlassian_integration, ms_integration, ai_agent)
- `feature/hello-aida` 브랜치에서 hello_aida 프로젝트 생성
  - `Hello, Aida!!` 출력 + Aida 소개 프로그램 (Windows 인코딩 대응 포함)
  - pytest 3개 테스트 케이스
  - GitHub Actions CI 연동 (`Run` 스텝에서 출력 확인)
- PR #1 생성 (feature/hello-aida → develop)
- GitHub Actions에서 CI 통과 및 `Hello, Aida!!` 출력 확인 완료

### SETUP.md 전면 개정 및 저장소 정리

**SETUP.md 전면 개정**
- Part 1 (Claude Code 전역 환경) 추가
  - Claude Code 설치, 전역 CLAUDE.md 구성 전체 (세션 프로토콜, 응답 규칙, 새 프로젝트 시작 규칙 등)
  - 전체 디렉토리 구조 (`D:\05.Claude\` 전체)
  - 전역 관리 파일 생성 방법 (PROJECTS_GLOBAL, TODO_GLOBAL, ISSUES_GLOBAL, TRIGGERS)
  - 템플릿 구성, 히스토리·프로젝트 관리 규칙 전체
- Part 2 (GitHub 저장소 및 CI/CD) 기존 내용 유지
- 총 1,146줄 완성본 develop → main 머지 완료

**저장소 정리**
- `source/CLAUDE.md` 프로젝트 구성 테이블 수정
  - 삭제된 3개 프로젝트 제거 (atlassian_integration, ms_integration, ai_agent)
- develop → main PR 생성 및 머지 완료 (chore: sync develop to main)

---

## 2026-04-17

### 전역 환경 업데이트

- CLAUDE.md 세션 종료 프로토콜 개선
  - 히스토리 기록 완료 후 Google Drive 백업 자동 실행 단계 추가
  - 백업 스크립트 실행 경로 명시
- TRIGGERS.md 마무리 뉘앙스 트리거 동작에 Google Drive 백업 실행 추가
- PROJECTS_GLOBAL.md `google_drive_backup` 진행중 → 운영중으로 상태 전환
- CLAUDE.md 작업 디렉토리에 `scripts\` 폴더 추가 (전역 보조 스크립트 전용)
- CLAUDE.md 개발 프로젝트 완료 후 `{폴더명}_setup.md` 작성 규칙 추가 (소문자, 프로젝트별)
- `create_templates.py` → `D:\05.Claude\scripts\`로 이동
- 파일명 대소문자 규칙 확립: 대문자(SETUP.md 등) = 글로벌, 소문자(setup.md 등) = 프로젝트별
- TODO_GLOBAL.md `G-001` 등록 (프로젝트 현황 메일 알림 기능 개발)
- CLAUDE.md 개발 프로젝트 관리 폴더에 `guides\` 추가

---

## 2026-04-24

### 전역 규칙 3건 추가

- **공통 모듈 규칙**: `projects/source/shared/` — Confluence 등 프로젝트 간 공용 모듈 경로 및 사용 방법 명시
- **산출물 명명규칙 날짜 기준 명확화**: 하드코딩 금지, `datetime.now().strftime("%Y%m%d")` 사용 의무화 / 위키 게시 시 최신 버전만 유지 규칙 추가
- **가이드 문서 게시 프로세스 신설**: 이행 단계 산출물 완료 후 `{폴더명}_setup.md` 최종 작성 → 즉시 위키 게시 (프로젝트 산출물 페이지 하위)

---

## 2026-04-27

### project-hub 검토 및 수정 (D:\05.Claude 기준)

**버그 수정 3건**
- `notify_update.yml`: checkout 없이 `git log` 실행 → `github.event.head_commit` 컨텍스트 변수로 교체
- `PROJECTS_GLOBAL.md`: project-hub 루트 초기 파일 누락 → 초기 파일 생성 (진행중/보류/운영중/완료 섹션)
- `README.md`: clone vs fork 사용자 구분 없이 upstream 등록 안내 → 사용 방식별 분리 안내

**notify_update.yml 워크플로우 실패 수정**
- `aliencube/microsoft-teams-actions@v0.8.0` deprecated 액션 제거
- `if: ${{ secrets.X != '' }}` 단일 따옴표 YAML 파싱 오류 → bash `if [ -z "$WEBHOOK_URL" ]`로 교체
- `continue-on-error: true` 추가 (시크릿 미설정 시 워크플로우 정상 완료)
- 테스트 커밋으로 성공 확인 후 revert

**산출물 형식 HTML 기반 전환 결정**
- `DEPLOYMENT.md` 검토 후 project-hub 기준으로 수정
  - 경로: `templates/deliverables/` 기준으로 전체 변경
  - 저장소: `docs-templates` → `gsretail-ax/project-hub`
  - 브랜치: `main/dev` → `main` 단일 브랜치
  - 정적 호스팅 섹션 제거 (내부용)
  - 담당자: 2인 체계 → Jacey / Confluence 관리자 / 아이다로 단순화
- `project-hub/CLAUDE.md` 수정: 산출물 명명규칙 `.pptx/.docx` → `.html`, 위키 게시 HTML 통일
- `아이다 CLAUDE.md` 수정
  - Claude 역할: PPTX/DOCX 직접 작성 → HTML 기반 템플릿 사용
  - 새 프로젝트 docs\ 설명: PPTX/DOCX → HTML
  - 위키 게시 방식: 파일 첨부/HTML 혼용 → HTML 페이지 통일, DEPLOYMENT.md §4 참조
  - 템플릿 관리: 글꼴/엑셀 기준 제거, HTML 기반 명시, guides 경로 `project-hub\templates\deliverables\guides\` 참조
  - 산출물 명명규칙: `.pptx/.docx` → `.html`, 이전 버전 처리 파일 첨부 → 페이지 삭제/보관

---

### project-hub 물리적 이전 및 전역 파일 정비 (D:\03.project-hub 기준)

1. **project-hub 물리적 분리 완료**
   - `D:\05.Claude\project-hub\` → `D:\03.project-hub\` 이동
   - `D:\03.Lab\` 경유 후 최종 `D:\03.project-hub\`로 정착

2. **GitHub 연결 완료**
   - 저장소: `gsr-ax/project-hub` (Private)
   - 계정: `JaceyBaek-GSRetail` / `jacey.baek@gsretail.com`
   - Remote URL: `https://JaceyBaek-GSRetail@github.com/gsr-ax/project-hub.git`
   - Windows Credential Manager 다중 계정 처리: remote URL에 계정명 포함 방식 적용

3. **아이다 글로벌 CLAUDE.md → 세라 CLAUDE.md 이관 및 역할 분리**
   - `C:\Users\Administrator\.claude\CLAUDE.md` → 아이다 전용 최소화
   - `D:\03.project-hub\CLAUDE.md` → 세라+아이다 통합 설정, 역할 분리 완료
   - 절대경로 전체 상대경로로 전환 (팀원 환경 호환)

4. **세라/아이다 역할 자동 전환 규칙 추가**
   - `D:\03.project-hub\CLAUDE.md`에 `## 역할 자동 전환 규칙` 섹션 추가
   - 세라 담당 기준 / 아이다 담당 기준 / 모호한 경우 확인 질문 규칙 정의
   - 학습된 케이스 테이블 자동 누적 구조 도입

5. **전역 파일 정비**
   - `TRIGGERS.md`, `ISSUES_GLOBAL.md` 누락 파일 복사 생성
   - `TODO_GLOBAL.md`: G-010 우선순위 수정(낮음→높음), G-011~G-016 신규 항목 이관
   - `PROJECTS_GLOBAL.md`: `담당자` → `담당` 컬럼명 수정 (전체 섹션)

6. **`init_project.py` 버그 수정**
   - CLAUDE.md 생성 상태 표기: `유형: 세라협업` → `담당: {user_name}`
   - PROJECTS_GLOBAL.md 마커 문자열: `담당자` → `담당` (자동 등록 정상화)

7. **`guides/SETUP.md` 신규 작성**
   - 기존 `D:\05.Claude\guides\SETUP.md` 구 환경 기준 → project-hub 환경 전면 재작성
   - 섹션 14 (새 프로젝트 시작): `init_project.py` 사용법 및 개발 프로젝트 추가 단계 보완

### 개인화 아키텍처 구현 (상대경로·비서 이름 설정 구조)

8. **`hub_init.py` 신규 작성** (clone/fork 후 1회 실행 초기화 스크립트)
   - 사용자 이름, 플랫폼 비서 이름(세라/영문/의미), 프로젝트 비서 이름(아이다/영문/의미) 입력 받아 저장
   - `config/personal.yml` 생성 (외부 라이브러리 없이 수동 YAML 작성)
   - `templates/CLAUDE_global.template.md` → `~/.claude/CLAUDE.md` 플레이스홀더 치환 생성

9. **`templates/CLAUDE_global.template.md` 신규 생성**
   - `C:\Users\Administrator\.claude\CLAUDE.md` 내용 기반, 개인 정보를 `{{PLACEHOLDER}}`로 대체
   - 플레이스홀더: `{{USER_NAME}}`, `{{HUB_ASSISTANT_KR}}`, `{{HUB_ASSISTANT_EN}}`, `{{HUB_ASSISTANT_DESC}}`, `{{PROJ_ASSISTANT_KR}}`, `{{PROJ_ASSISTANT_EN}}`, `{{PROJ_ASSISTANT_DESC}}`

10. **`config/personal.yml.example` 신규 생성** — 개인 설정 예시 (팀원 참조용)

11. **`.gitignore` 수정** — `config/personal.yml` 추가 (개인 설정 파일 커밋 방지)

12. **`CLAUDE.md` 수정** — 전체 `Jacey` 참조 → `사용자`로 교체, 담당 상태 예시 수정

13. **`init_project.py` 수정** — `load_user_name_from_personal_config()` 추가, 담당자명 기본값으로 personal.yml 값 자동 반영

14. **`guides/SETUP.md` 수정**
    - 신규 섹션 4 "hub 최초 개인화 (hub_init.py)" 추가 (기존 4~7절 → 5~8절로 이동)
    - 하드코딩된 `D:\03.project-hub` 경로 → `{HUB_ROOT}` 교체 (시스템 개요, bash 명령, 경로 참조)
    - Git 계정 정보, 개인 이름 → 일반 예시로 교체

15. **`templates/deliverables/DEPLOYMENT.md` 수정** — `Jacey` → `hub 관리자` 교체 (2곳)

### 남은 작업

- 기존 프로젝트 이전: `daily_briefing`, `wiki_faq_builder`, `google_drive_backup` → `projects/`
- Google Drive 백업 경로 업데이트
- G-008 (Teams Webhook 등록) 처리

---

## 2026-04-28

### init_project.py 전면 개선 및 프로젝트 생성 UX 대화 기반으로 전환

**1. init_project.py 기능 추가 (2026-04-27 세션 이어서)**
- Windows UTF-8 인코딩 설정 추가 (`sys.stdout/stdin.reconfigure`)
- `ASSISTANT_PRESETS` 5종 추가 (아이다/루나/노바/아리아/클라라)
- `load_personal_config()` — personal.yml 전체 파싱 (중첩 구조 포함)
- `save_personal_config()` — hub_init.py 호환 형식으로 저장
- `ensure_personal_config()` — user_name·project_assistant 누락 시 세라 이름으로 안내 후 입력받아 저장
- `print_assistant_intro()` — cfg 기반 동적 자기소개 (하드코딩 제거)
- 폴더명 가이드 및 설명 선택 입력 추가

**2. init_project.py argparse CLI 모드 추가 (2026-04-28)**
- `--name / --type / --summary / --wiki-id / --yes` 인수 추가
- CLI 모드: 세라가 대화로 수집한 값을 인수로 전달받아 실행 (`ensure_personal_config` 건너뜀)
- 인터랙티브 모드: 인수 없을 때 기존 방식 유지
- `_compute_project_folder()` 추출 (CLI·인터랙티브 공용)
- `_execute_creation()` 추출 (CLI·인터랙티브 공용)
- `_ask_assistant_name()` 개선: 번호 선택 제거 → 가이드 안내 후 직접 입력, 한글/영문 한 번에 입력 (`아이다/Aida` 형식)
- `print_assistant_intro()` 수정: 영문명 없을 때 빈 괄호 제거

**3. CLAUDE.md 새 프로젝트 시작 규칙 전면 개정**
- 기존: 단계별 폴더 생성 절차 나열
- 변경: 세라가 대화로 정보 수집 → `init_project.py` CLI 모드 자동 실행
- 수집 항목: 사용자명(필수)·비서명(필수, 가이드 제공)·프로젝트 유형·프로젝트명·설명(선택)
- wiki ID 질문 제거 (대화 흐름 단순화)
- 생성 완료 후 세라가 대화에서 비서 자기소개 직접 출력 규칙 추가

**4. docs/.gitignore 추가**
- `docs/` 폴더를 `.gitignore`에 추가 (project-hub 자체 산출물 로컬 전용)

**5. project-hub 단위 테스트 케이스 산출물 작성**
- `docs/project_hub_UTC_20260427.html` 생성
- 총 28개 TC: UTC-A(init_project.py 21개) / UTC-B(hub_init.py 5개) / UTC-C(deploy_record.py 3개)
- 상세 스펙 3개: UTC-A01, UTC-A20, UTC-B03

**6. init_project.py — CLAUDE.md 비서명 자동 동기화**
- `import re` 추가
- `_sync_project_assistant_in_file(file_path, cfg)` 함수 추가
  - CLAUDE.md에서 현재 프로젝트 비서명을 정규식으로 탐지 (`\*\*([가-힣]+)(?: \(([A-Za-z]+)\))?\*\* — 프로젝트 협업 비서`)
  - 라인별 교체, 2개 라인 제외: 비서 추천 가이드(`이름 (영문)  —` 형식), 입력 예시(`이름/` 형식)
  - description 교체 (new_desc 있을 때만)
- `save_personal_config()` 말미에 `_sync_project_assistant_in_file(HUB_ROOT / "CLAUDE.md", cfg)` 호출 추가

**7. init_project.py — `_ask_assistant_name()` UX 개선**
- 기존: 추천 목록 나열 후 직접 입력
- 변경: 기본값 `아이다 (Aida) — 돕는 자` 먼저 표시 → Enter 시 `→ 기본값 사용: 아이다 (Aida)` 확인 메시지 출력
- 다른 이름 원하면 `루나/Luna` 형식으로 직접 입력 (기존 파싱 방식 유지)
- 빈 입력 시 기본값 반환 (기존 "비서" 대체 제거)
- 기본값 사용 시 description "돕는 자"도 함께 저장

**8. CLAUDE.md — 새 프로젝트 시작 규칙 세라 자기소개 추가**
- 기존 step 1 앞에 세라 자기소개 step 추가 (step 1로 배치, 기존 스텝 번호 순서 정리)
- 자기소개 형식: `personal.yml`의 hub_assistant 기반 (user_name / name_kr / name_en / description)
- user_name 없으면 "안녕하세요!"로만 시작, hub_assistant 정보 없으면 소개 생략

**9. CLAUDE.md — 세션 시작 프로토콜 및 트리거 관리 개선**
- 세션 시작 step 1: "TRIGGERS.md 로드하여 트리거 인지" → "TRIGGERS.md 로드 → 트리거 목록 출력" (자동 표시)
- 트리거 관리: `"도움말"`, `"도와줘"`, `"뭘 할 수 있어"`, `"help"` 감지 시 TRIGGERS.md 내용 출력 alias 추가

---

## 2026-04-29

### 고도화 백로그 등록 및 Docsify 웹 뷰어 구현

**1. ENHANCEMENTS.md 신규 생성**
- 플랫폼 고도화 백로그 25개 항목 (E-001~E-025) 등록
- 필수/상/중/하 우선순위 분류, 세라 추천 이유 포함
- E-026 추가: MD 파일 웹 뷰어 (GitHub Pages / Docsify)

**2. Docsify 로컬 웹 뷰어 구현 (E-026)**
- `index.html` 생성: Docsify 설정, 검색·복사 플러그인 포함
- `_sidebar.md` 생성: 홈·플랫폼 현황·가이드·히스토리·프로젝트 네비게이션
- `.nojekyll` 생성: GitHub Pages 호환
- 실행 방식: `python -m http.server 3000` → PowerShell `Start-Process "http://localhost:3000"`

**3. TRIGGERS.md 트리거 3개 추가**
- "웹뷰 열어줘" / "문서 보기" / "docs 서버" / "로컬 서버": 백그라운드 서버 실행 + 브라우저 자동 오픈
- "웹뷰 종료" / "서버 종료": PowerShell `Get-NetTCPConnection`으로 포트 점유 프로세스 강제 종료
- "메모리 저장": 미완료 작업 확인 → memory 파일 업데이트 → `/compact` 안내 (세라 실행 불가)

**4. index.html 스타일 구성 완료**
- 노션 스타일 본문, 검색창 pill형, 복사 버튼 `.code-wrapper` 분리
- 사이드바: 56px 아이콘 바 접힘, SVG 아이콘 네비, 드래그 너비 조정, 스크롤바 숨김
- 홈 스플래시 페이지(`#/home` → JS 렌더링), `v0.3.0` pill 뱃지, 파일명 뱃지(h1 옆)

**5. 시맨틱 버저닝 도입 (`v0.3.0`)**
- `CHANGELOG.md` 생성 (버전별 변경 내용 누적 기록)
- Git 태그 `v0.3.0` 생성 및 GitHub Push 완료

**6. 사이드바 트리뷰 기능 구현 (index.html)**
- `dpwsScrollTo(text)`: `.markdown-section` 내 h1/h2/h3을 textContent 매칭으로 찾아 scrollIntoView — Docsify `?id=` 한국어 버그 우회
- `window._dpwsScrollTarget`: 다른 페이지 이동 후 스크롤 예약 처리 (doneEach에서 소비)
- `window._dpwsExpanded`: 페이지별 펼침 상태 관리 (세션 내 유지)
- `window._sidebarScrollTop`: beforeEach에서 저장, doneEach에서 복원 — Docsify 사이드바 DOM 재생성 시 스크롤 위치 초기화 문제 해결
- 메뉴 텍스트 클릭으로 하위 항목 토글 (펼침/접힘)

---

## 2026-04-30

### 사이드바 트리뷰 아이콘 스타일 완성

- `›` 아이콘: 좌측 배치 (a.before), rotate(90deg)=펼침 / rotate(0deg)=접힘
- `•` 리프 아이콘: 하위 없는 항목 앞에 표시 (`is-leaf` 클래스)
- 아이콘 크기 15px(›) / 11px(•), 색상 #555 / #888, 텍스트와 간격 5px
- flex + `align-self: center`로 아이콘·텍스트 수직 가운데 정렬
- 섹션 헤더 `›` 아이콘도 동일 스타일 통일

### 개별 프로젝트 GitHub 구조 설계 및 방침 확정

- **구조 결정**: 각 프로젝트 = 독립 repo → project-hub에 submodule 등록
  - 기존 monorepo(`jaceybaek/jacey-projects`) 구조 탈피
  - `jaceybaek/jacey-projects`는 백업용으로 유지 (Clear 없이 그대로 보존)
- **기본 계정 확정**: 특별한 언급 없는 한 개별 프로젝트 → `JaceyBaek` 계정으로 커밋

### google_drive_backup 이관 완료 (G-001 부분 / G-003 완료)

1. **독립 repo 생성**: `JaceyBaek/google_drive_backup` (Private, JaceyBaek 계정)
2. **파일 이전**: `D:\05.Claude\projects\source\google_drive_backup` → `D:\03.project-hub\projects\google_drive_backup`
   - 클린 스타트 방식 (git 히스토리 미보존, 이력은 히스토리 MD로 대체)
   - `.env` / `secrets/` / `.venv/` / `__pycache__/` 제외
   - `.gitignore`에 `.venv/` 추가
3. **G-003 경로 업데이트**: `D:\05.Claude` → `D:\03.project-hub`, `05.Claude_Backup` → `project-hub_Backup`
   - `src/main.py`: BACKUP_SOURCE_PATH / DRIVE_BACKUP_FOLDER 기본값 수정
   - `src/wiki_publisher.py`: DOCS_DIR / GUIDE_FILE_PATH 기본값 수정, MANUAL_HTML 내 경로·명칭 전체 수정, 수동 실행 명령 경로 수정
   - `.env.example`: BACKUP_SOURCE_PATH / DRIVE_BACKUP_FOLDER 수정
4. **git 초기화 및 push**: `main` 브랜치, git user 설정 (`JaceyBaek` / `allergy79@gmail.com`)
5. **submodule 등록**: `gsr-ax/project-hub` `.gitmodules`에 `projects/google_drive_backup` 등록 및 push
6. **TODO 업데이트**: G-003 완료 처리 (2026-04-30)

### platform/wiki_pipeline 이관 완료 (D:\05.Claude → D:\03.project-hub)

**배경**
- `D:\05.Claude\platform\wiki_pipeline\`에서 개발 완료된 패키지를 project-hub 플랫폼으로 이관
- 05.Claude 히스토리에 "project-hub 이관 예정"으로 명시된 항목

**이관 내용**
- 위치: `D:\03.project-hub\platform\wiki_pipeline\`
- 패키지 구조 (소스 7개 모듈): `__init__.py` / `base.py` / `cli.py` / `utils.py` / `sections.py` / `confluence.py` / `miso.py` / `parser.py`
- 단위 테스트 37개: `tests/test_utils.py` (12개) / `tests/test_sections.py` (9개) / `tests/test_base.py` (16개)
- 가이드 문서: `wiki_pipeline_guide.md`
- 패키지 설정: `pyproject.toml` / `.gitignore`

**경로 업데이트 (이관 시 수정)**
- `pyproject.toml` description: "05.Claude 플랫폼" → "project-hub 플랫폼"
- `wiki_pipeline/__init__.py` docstring: "05.Claude 플랫폼 기본 기능" → "project-hub 플랫폼 기본 기능"
- `wiki_pipeline_guide.md`: 위치 경로 / PLATFORM_PATH 예시 / footer 전체 업데이트

**CLAUDE.md 업데이트**
- `## 작업 디렉토리` 섹션에 `platform/` 디렉터리 설명 추가
- PLATFORM_PATH 환경변수 참조 방식 명시

**향후 적용 대상**
- wiki_faq_builder, wiki_mbo_builder 이관 시 → 각 프로젝트 `.env`에 `PLATFORM_PATH=D:\03.project-hub\platform` 설정 후 `pip install -e %PLATFORM_PATH%\wiki_pipeline` 실행

---

### wiki_pipeline → atlassian_pipeline 패키지 rename

**배경**
- Confluence 전용 명칭 `wiki_pipeline` → 향후 Jira/Bitbucket/Bamboo 확장을 고려해 `atlassian_pipeline`으로 변경

**변경 내용**
- `git mv platform/wiki_pipeline platform/atlassian_pipeline` (히스토리 보존)
- 패키지 내 모든 참조 일괄 변경: `wiki_pipeline` → `atlassian_pipeline`
  - `pyproject.toml`: name `wiki-pipeline` → `atlassian-pipeline`
  - `__init__.py`, `base.py` docstring 업데이트
  - 가이드 문서: `wiki_pipeline_guide.md` → `atlassian_pipeline_guide.md`
- `WikiAnalyzerBase` → `ConfluenceAnalyzerBase` 클래스명 변경 (용도 명확화)
- 단위 테스트 37개 전부 통과 유지

---

### wiki_faq_builder 이관 + 리팩토링 완료 (G-001 부분 완료)

**이관**
- `D:\05.Claude\projects\source\wiki_faq_builder` → `D:\03.project-hub\projects\wiki_faq_builder`
- GitHub 독립 repo: `JaceyBaek/wiki_faq_builder` (Private)
- `.gitmodules`에 submodule 등록 후 `gsr-ax/project-hub` push 완료

**리팩토링 (`src/main.py` 전면 재작성)**
- 491줄 모놀리식 → `FaqAnalyzer(ConfluenceAnalyzerBase)` 상속 구조 (~160줄)
- 공통 로직 전부 atlassian_pipeline으로 위임:
  - `split_into_chunks`, `extract_year_month`, `should_archive`, `is_korean_holiday`
  - `rebuild_faq_page`, `_parse_html_sections`, `get_faq_sections`, `save_faq_sections`
  - `collect_source_pages`, `process_pages_auto`, `process_single_page`
- `get_or_create_target_page()`: `confluence._client.get_page_by_title()` (내부 API) → `get_child_pages()` 기반으로 교체
- 단위 테스트 67개 통과

**테스트 import 업데이트**
- `from content_parser import ContentParser` → `from atlassian_pipeline.parser import ContentParser`
- `from miso_client import MisoClient` → `from atlassian_pipeline.miso import MisoClient`

---

### wiki_mbo_builder 이관 + 리팩토링 완료 (G-001 완료)

**이관**
- `D:\05.Claude\projects\source\wiki_mbo_builder` → `D:\03.project-hub\projects\wiki_mbo_builder`
- GitHub 독립 repo: `JaceyBaek/wiki_mbo_builder` (Private)
- `.gitmodules`에 submodule 등록 후 `gsr-ax/project-hub` push 완료

**리팩토링 (`src/main.py` 전면 재작성)**
- `MboAnalyzer(ConfluenceAnalyzerBase)` 상속 구조
- 2단계 AI 처리 유지:
  - 1단계: 청크별 원문 → `build_mbo_preprocess_prompt()` → 수치·실적 요약
  - 2단계: 전처리 결과 통합 → `build_mbo_extract_prompt()` → MBO 항목 구조화
- 연도 페이지 제목 형식: `{year}년 MBO` (FAQ의 `{year}`와 다름, 주의)
- `scripts/` Jira CSR 분석 스크립트 (MBO 파이프라인과 무관) 그대로 보존
- 단위 테스트 26개 통과

---

### miso_client 독립 패키지 분리 (3차 세션)

**배경**
- `atlassian_pipeline` 패키지에 포함된 `miso.py`는 Atlassian 제품과 무관한 사내 AI 클라이언트
- 독립 패키지로 분리하여 미소 연동 프로젝트에서 단독 사용 가능하도록 변경

**신규 패키지**
- 위치: `platform/miso_client/`
- Python 패키지명: `miso_client` / pip 설치명: `miso-client`
- 클래스: `MisoClient` (기존 `atlassian_pipeline/miso.py`에서 이전)
  - Dify 기반 REST API, blocking 모드
  - `chat(query, timeout=120) → str`
- 단위 테스트 9개 (requests-mock 기반)

**atlassian_pipeline 변경**
- `atlassian_pipeline/miso.py` → re-export shim (`from miso_client import MisoClient`)으로 교체 (하위 호환)
- `base.py`: `from .miso import MisoClient` → `from miso_client import MisoClient`
- `pyproject.toml`: `miso-client` 의존성 추가 / version `0.1.0` → `0.2.0`
- `__init__.py`: 모듈 설명 업데이트

**프로젝트 import 업데이트**
- `wiki_faq_builder/src/main.py`, `wiki_mbo_builder/src/main.py`, `tests/test_base.py`, `wiki_faq_builder/tests/test_miso_client.py`
  - `from atlassian_pipeline.miso import MisoClient` → `from miso_client import MisoClient`

**설치 명령**
```bash
pip install -e %PLATFORM_PATH%\miso_client
pip install -e %PLATFORM_PATH%\atlassian_pipeline
```

---

### atlassian_pipeline Jira/Bitbucket/Bamboo 클라이언트 추가 (3차 세션)

**추가된 모듈 (platform/atlassian_pipeline/atlassian_pipeline/)**

| 파일 | 클래스 | 인증 | API 기반 |
|---|---|---|---|
| `jira.py` | `JiraClient` | PAT Bearer | Jira DC REST API v2 |
| `bitbucket.py` | `BitbucketClient` | PAT Bearer | Bitbucket Server/DC REST API 1.0 |
| `bamboo.py` | `BambooClient` | PAT Bearer | Bamboo REST API latest |

**JiraClient 주요 메서드**
- `get_issue`, `create_issue`, `update_issue`, `delete_issue`
- `search_issues(jql, fields, max_results)` — JQL 검색
- `get_transitions`, `transition_issue` — 상태 전환
- `add_comment`, `get_comments`, `add_worklog`, `get_worklogs`
- `get_projects`, `get_project`

**BitbucketClient 주요 메서드**
- `get_projects`, `get_project`, `get_repos`, `get_repo`
- `get_branches`, `get_commits(branch)`, `get_file_content(path, at)`
- `get_pull_requests(state)`, `get_pull_request`, `create_pull_request`, `merge_pull_request`
- `_get_paged()` — isLastPage 기반 자동 페이지네이션 헬퍼

**BambooClient 주요 메서드**
- `get_plans`, `get_plan`, `get_results`, `get_latest_result`, `get_build_result`
- `trigger_build(plan_key, params)` — 빌드 수동 트리거
- `get_deploy_projects`, `get_deploy_environments`, `get_deploy_versions`, `trigger_deployment`
- `get_agents`

**환경변수 규칙**
- Jira: `JIRA_URL`, `JIRA_USERNAME`, `JIRA_API_TOKEN`
- Bitbucket: `BITBUCKET_URL`, `BITBUCKET_USERNAME`, `BITBUCKET_API_TOKEN`
- Bamboo: `BAMBOO_URL`, `BAMBOO_USERNAME`, `BAMBOO_API_TOKEN`

**테스트**
- `tests/test_jira.py`: 21개 / `tests/test_bitbucket.py`: 18개 / `tests/test_bamboo.py`: 17개
- atlassian_pipeline 전체: **93 passed** (기존 37 + 신규 56)
- miso_client: **9 passed**
- wiki_faq_builder: **67 passed** / wiki_mbo_builder: **26 passed**

---

## 2026-04-30 (4차 세션)

### 프로젝트 생성 및 연결 설정 흐름 정비

#### 1. CLAUDE.md 응답 규칙 및 프로젝트 생성 흐름 개선

- 새 프로젝트 생성 흐름 개선:
  - 아이다(Aida) 비서 소개 시 의미 표시 추가
  - 프로젝트 정보 1개씩 순서대로 질문 (기존: 한번에 나열)
  - 사전 설정 확정 후에만 다음 단계로 이동
  - 간단한 설명 필수 입력으로 변경 (채팅에서 엔터 입력 불가)
- 응답 규칙 추가:
  - 규칙 9: 명령·파일 작업은 비서가 직접 (사용자에게 실행 요구 금지)
  - 규칙 10: 불필요한 개인정보 수집 지양 (필수성 검토 후 불필요 시 질문 제거)
- 연결 설정 흐름 섹션 신규 추가 (Confluence/Miso 수집 항목·안내·규칙 문서화)

#### 2. miso_client 패키지 개선 (v0.1.0)

- `RECOMMENDED_APP_PARAMS` 클래스 상수 추가 — Dify 앱 매개변수 권장값
  - max_tokens: 4096 / temperature: 0.3 / top_p: 0.9 (활성) / top_k·penalty: 비활성
- `app_config_guide()` 클래스 메서드 추가 — 앱 설정 가이드 출력
- 단위 테스트 3개 추가: **12 passed** (기존 9 → 12)

#### 3. 불필요한 개인정보 제거 — ConfluenceClient / MisoClient

- `ConfluenceClient.__init__()` — `username` 파라미터 제거 (PAT 토큰만으로 인증 충분)
- `ConfluenceAnalyzerBase` — `project_name` 클래스 속성 추가
  - Miso user 식별자: `MISO_USER` 환경변수 제거 → `project_name` 또는 클래스명 자동 사용
  - `CONFLUENCE_USERNAME` 환경변수 제거
- 영향 프로젝트 일괄 업데이트:
  - `wiki_faq_builder`: `project_name = "wiki_faq_builder"` 추가, `.env.example` 정리
  - `wiki_mbo_builder`: `project_name = "wiki_mbo_builder"` 추가, `.env.example` 정리
- `.env.example` 표준: `CONFLUENCE_URL` + `CONFLUENCE_API_TOKEN` + `MISO_API_URL` + `MISO_API_KEY`

**테스트**
- atlassian_pipeline: **93 passed** / miso_client: **12 passed**
- wiki_faq_builder: **67 passed** / wiki_mbo_builder: **26 passed**

#### 4. test 프로젝트 생성 및 Confluence + Miso 연결 기능 구현

- 프로젝트 생성: `init_project.py --name test --type dev`
- 연결 설정: `.env` (Confluence URL+Token, Miso URL+Key), `config.yml` (project_name, root_page_id 등)
- `test_connection.py` — Confluence/Miso 연결 테스트 스크립트
- `source/src/main.py` — 루트 페이지 + 전체 하위 페이지 재귀 탐색(BFS) + Miso 요약
  - `get_all_pages()`: BFS 재귀 탐색
  - `summarize_page()`: ContentParser HTML 파싱 → Miso 요약
  - `run()`: include_root 옵션 포함 전체 실행
- 단위 테스트: **9 passed**
- 실제 연결 테스트 결과: Confluence OK / Miso OK (gemini-2.5-flash 모델 전환 후)
- FAQ 요약 실증: 페이지 `272711102` (2. 자산이관 전표 처리) FAQ 5개 생성 확인

---

## 2026-04-30 (5차 세션)

### 웹뷰 버그 수정 3건

**1. 사이드바 섹션 접힘 버그**
- 원인: 자식 `<a>` 클릭 이벤트가 `headerEl`(p/strong 태그)까지 버블링 → section-collapsed 토글 실행
- 수정: `headerEl` 클릭 핸들러에 `if (e.target.closest && e.target.closest('a')) return;` 가드 추가

**2. 홈 404 버그**
- 원인: `basePath: '../'` 설정 후 `#/home` 경로가 루트에서 `home.md`를 찾아 404 발생
- 수정: `nameLink`, 아이콘 네비, isHome 체크, icon-logo onclick의 `#/home` 4곳 → `#/webview/home` 변경

**3. 하위 링크 토글 불가 버그**
- 원인: `dpwsInject()`에서 모든 하위 항목에 `link-collapsed` 기본 적용 → 현재 활성 페이지도 접혀버림
- 수정: 현재 해시(`currentHash`)와 `href` 비교 후 일치하면 `link-collapsed` 미적용

---

### 웹뷰 파일 `webview/` 폴더로 분리 이동

- `index.html`, `_sidebar.md`, `home.md` → `webview/` 폴더 신규 생성 후 이동
- `index.html` Docsify 설정 변경:
  - `basePath: '../'` 추가 (md 파일 루트 기준 해석)
  - `loadSidebar: 'webview/_sidebar.md'` (basePath 적용 시 `../webview/_sidebar.md` = 정상 경로)
- 서버 실행 기준: project-hub 루트에서 `python -m http.server 3000` (변경 없음)

---

### 파비콘 추가

- `<head>` 내 SVG data URI 방식으로 파비콘 인라인 추가 (별도 파일 없이 project-hub 로고 재사용)

---

### `_sidebar.md` 프로젝트 항목 구조 설계 및 sync 스크립트 구현

**프로젝트 항목 구조 확정**
- 각 프로젝트: CLAUDE.md 링크 + 표준 4개 항목(Todo / 이슈 / 의사결정 / 변경이력) + 최신 히스토리
- 상태 정렬: 진행중(0) → 운영중(1) → 보류(2), 같은 상태 내 명칭 순
- 서비스종료 프로젝트: 별도 `- **서비스종료**` 섹션으로 하단 표시 (없으면 섹션 자체 제거)

**`scripts/sync_sidebar.py` 신규 작성**
- 1회 동기화 모드: `python scripts/sync_sidebar.py`
- watchdog 감시 모드: `python scripts/sync_sidebar.py --watch` (1초 debounce)
- 감시 대상: `projects/` 하위 `.md` 파일 추가·삭제·이동
- 제외 경로: `.venv`, `__pycache__`, `.git`, `node_modules`

**`init_project.py` `register_to_sidebar()` 연동**
- `_execute_creation()` 내 `register_to_projects_global()` 이후 `register_to_sidebar()` 자동 호출
- 신규 프로젝트 생성 시 `_sidebar.md` 자동 등록 (중복 방지 포함)

---

### "완료" → "서비스종료" 명칭 전면 변경

- `PROJECTS_GLOBAL.md`: `## 완료` → `## 서비스종료`, `완료일` 컬럼 → `종료일`
- `CLAUDE.md`: 섹션 목록·상태 전환 절차·처리 규칙 전체 반영
- `TRIGGERS.md`: `완료 처리 뉘앙스` → `서비스종료 처리 뉘앙스`, 사이드바 동기화 트리거 2개 추가
