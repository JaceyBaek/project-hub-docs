<!--
sidebar_title: 2026년 5월
sidebar_order: 1
-->

# 2026년 05월 작업 히스토리

---

## 2026-05-01

### platform → plugins 구조 전환 및 atlassian_pipeline → atlassian_client 명칭 변경

**배경**
- `platform/`이라는 폴더명은 "기반 시스템" 의미를 내포하나, 실제 성격은 외부 서비스 연동 클라이언트 패키지
- `atlassian_pipeline`은 "데이터 처리 흐름" 의미의 naming이나 실제로는 Atlassian 서비스 연동 클라이언트
- 향후 프로젝트 수 대폭 증가 예정 + 각 프로젝트가 독립 repo 구조 → plugin 성격이 명확

**결정 사항**
- 폴더: `platform/` → `plugins/` (플러그인 성격 명확화)
- 패키지명: `atlassian_pipeline` → `atlassian_client` (클라이언트 명칭 통일)
- 환경변수: `PLATFORM_PATH` → `PLUGINS_PATH`
- `miso_client`는 이름 유지, `plugins/`로 경로만 이동

**변경 파일 목록**
- `plugins/atlassian_client/` (구: `platform/atlassian_pipeline/`) — git mv, 히스토리 보존
- `plugins/atlassian_client/atlassian_client/` (구: `atlassian_pipeline/`) — 내부 패키지 폴더
- `plugins/atlassian_client/pyproject.toml` — name·description·include 수정
- `plugins/miso_client/pyproject.toml` — description 수정 ("플랫폼" → "플러그인")
- `plugins/atlassian_client/atlassian_client/*.py` — 9개 파일 docstring·import 수정
- `plugins/atlassian_client/tests/*.py` — 6개 테스트 파일 import 수정
- `plugins/atlassian_client/atlassian_client_guide.md` — 전체 참조 치환
- `projects/test/source/` — 2개 파일 수정
- `projects/wiki_faq_builder/source/` — 5개 파일 수정
- `projects/wiki_faq_builder/CLAUDE.md` — 설치 안내 수정
- `projects/wiki_faq_builder/.github/workflows/ci.yml` — sparse-checkout·설치 경로 수정
- `projects/wiki_mbo_builder/source/` — 5개 파일 수정
- `projects/wiki_mbo_builder/CLAUDE.md` — 설치 안내 수정
- `projects/wiki_mbo_builder/refs/mbo_evaluation_guide.md` — 참조 수정
- `CLAUDE.md` (project-hub 루트) — platform → plugins, PLATFORM_PATH → PLUGINS_PATH

**venv 재설치**
- `wiki_faq_builder/.venv`, `wiki_mbo_builder/.venv` 각각:
  - `atlassian-pipeline` uninstall → `atlassian-client` editable 설치
  - PyPI `miso-client` 충돌 감지 → 로컬 `miso_client` editable로 덮어쓰기
  - 최종 검증: `from atlassian_client import ConfluenceAnalyzerBase` / `from miso_client import MisoClient` 정상 확인

**아키텍처 논의 결론**
- 현재 구조는 기술적으로 library 의존성이나, "붙여 쓰는 확장 모듈" 의도로 `plugins/` 명칭 사용
- 각 프로젝트가 독립 repo이므로 향후 `entry_points` 방식 전환이 사실상 필요
- 단계적 계획: ① plugins/ 완료(오늘) → ② core/ 인터페이스 정의(3~4번째 프로젝트 시점) → ③ entry_points 전환(5개 이상 시점)

**메모리 업데이트**
- `project_atlassian_pipeline.md` → `project_atlassian_client.md` 신규 작성
- `MEMORY.md` 인덱스 갱신

---

## 2026-05-06

### 3개 프로젝트 표준 구조 리팩토링 + CI 구성 완료

**작업 범위:** google_drive_backup, wiki_faq_builder, wiki_mbo_builder

**1. 표준 폴더 구조 적용**
- `src/` → `source/src/`, `tests/` → `source/tests/` 이동
- pyproject.toml: `where = ["source/src"]`, `testpaths = ["source/tests"]` 업데이트
- `_manage/`, `docs/`, `refs/`, `archive/` 표준 디렉토리 구성

**2. MD 파일 내용 보완 (D:\05.Claude 참고)**
- 3개 프로젝트 CLAUDE.md: Python 3.12, atlassian_client/miso_client(PLUGINS_PATH), Git Flow, 커밋 컨벤션, 실행 방법, 환경변수 표 추가
- _manage/changelog.md: 이관 이력 추가
- wiki_mbo_builder: `refs/mbo_evaluation_guide.md` 이관 (Jira CSR 분석 기준·완료율 산식 포함)

**3. GitHub Actions CI 구성**
- google_drive_backup: flake8, black, pytest (플러그인 없음)
- wiki_faq_builder, wiki_mbo_builder: + gsr-ax/project-hub sparse checkout → atlassian_client/miso_client 설치
  - `PROJECT_HUB_TOKEN` Secret: JaceyBaek-GSRetail PAT(repo scope) → JaceyBaek 계정 두 repo에 등록
  - flake8 `--extend-ignore=E203,W503` (black 포맷 충돌 해결)
  - **3개 CI 모두 통과 확인**

**4. 인증 이슈 해결**
- gh auth `workflow` scope 추가: `JaceyBaek` 계정으로 브라우저 인증 (JaceyBaek-GSRetail 혼용 주의)
- GitHub 계정 구분: project-hub = `JaceyBaek-GSRetail` / 개별 프로젝트 repo = `JaceyBaek`

**5. 서브모듈 포인터 최신화**
- project-hub: 3개 서브모듈 포인터 모두 최신 커밋으로 업데이트 후 push

**트리거 추가**
- `TRIGGERS.md`: "compact" / "컴팩트" 트리거 등록 → 메모리·히스토리 완료 후 `/compact` 안내

---

### 연결 정보 중앙화 + 05.Claude 참조 제거 (2차 세션)

**1. 연결 정보 중앙화**
- 공통 연결 정보 4개를 시스템 환경변수(Machine)로 1회 등록:
  - `CONFLUENCE_URL`, `CONFLUENCE_API_TOKEN`, `MISO_API_URL`, `MISO_API_KEY`
  - 기존 값: `D:\05.Claude\projects\source\wiki_faq_builder\.env`에서 이관
- `wiki_faq_builder`, `wiki_mbo_builder` `.env.example` 재구성
  - 공통 항목 → 주석 처리 + 시스템 환경변수 관리 안내
  - 프로젝트 고유 설정만 `.env`에 저장하는 구조로 전환
- `CLAUDE.md` 연결 설정 흐름 섹션 업데이트
  - 구조 원칙 표 추가 (공통/고유 분리 기준 명시)
  - 최초 설정 안내 및 `setx /M` 등록 방식 문서화

**2. 05.Claude 참조 제거 (진행 중)**
- `google_drive_backup/source/src/wiki_publisher.py` 2곳 수정
  - 예제 로그 텍스트: `D:\05.Claude` → `D:\03.project-hub`
  - 환경변수 설명: 기본 경로 `D:\05.Claude` → `D:\03.project-hub`
- 05.Claude 전체 현황 스캔 및 이관 대상 분류 완료
  - **남은 이관 대상:** `daily_briefing` 프로젝트, `projects/source/shared`
  - **삭제 검토 대상:** `templates/`(Office 파일), `scripts/`(fill_*.py 등) — 다음 세션에서 결정

**3. 검토 항목 (결정 보류)**
- commit 보호: Credential Manager 제거(매번 PAT 입력) vs SSH key + passphrase — Jacey 결정 대기

---

## 2026-05-07

### 05.Claude 완전 분리 및 daily_briefing 이관 완료

**1. 05.Claude 잔여 파일 정리**
- `D:\05.Claude\templates\` 삭제 — HTML 방식으로 전환 예정, 재작성 예정
- `D:\05.Claude\scripts\` 삭제 — xlsx/docx 생성 스크립트 (구 방식, templates 삭제로 사용처 없음)
- `D:\05.Claude\projects\source\shared\` 삭제 — `atlassian_client`, `miso_client`로 완전 대체 확인

**2. daily_briefing 이관 완료 (G-001)**
- 표준 폴더 구조 적용 (`source/src/`, `source/tests/`, `_manage/`, `docs/`, `refs/`, `archive/`)
- GitHub 독립 repo 생성: `JaceyBaek/daily_briefing` (Private)
- 브랜치: `main`, `develop`
- `pyproject.toml` 신규 생성 (requirements.txt 대체)
- `.gitmodules` submodule 등록 → `gsr-ax/project-hub` push 완료
- G-001 완료 처리 (2026-05-07)

**3. 글로벌 히스토리 보완**
- `history/202604_history.md`: `hello_aida 테스트 프로젝트` 항목 추가 (누락분 보완)

**4. 05.Claude 최종 삭제 (G-006)**
- `google_drive_backup/secrets/` (credentials.json, token.json) → `03.project-hub`로 이관 후 삭제
- `D:\05.Claude` 전체 삭제 완료
- G-006 완료 처리 (2026-05-07)

---

## 2026-05-07 (3차 세션)

### MCP 등록 절차 추가 및 비서 통합 논의

**1. CLAUDE.md — MCP 등록 절차 섹션 신규 추가**
- `진행중 → 운영중` 전환 시 MCP 등록 여부 확인 단계 추가
- `## MCP 등록 절차` 섹션: 정보 수집(서버명·전송방식·실행 명령·환경변수·노출 tool) → `claude mcp add` 실행 → 프로젝트 CLAUDE.md 기록

**2. TRIGGERS.md — MCP 관련 트리거 3개 추가**
- `"MCP 등록"` — 등록 절차 전체 실행
- `"MCP 목록"` — `claude mcp list` 실행
- `"MCP 삭제"` — 등록 제거

**3. 프로젝트별 관리 문서 일괄 업데이트 (아이다)**
- google_drive_backup, wiki_faq_builder, wiki_mbo_builder: `_manage/history/202605_history.md` 신규 생성
- 3개 프로젝트 `_manage/changelog.md`: 2026-05 변경 이력 추가
- google_drive_backup `_manage/todo.md`: T-001 token.json 재인증 항목 추가

**4. 비서 통합 논의 (결정: 진행 후 착수)**
- 현행 두 비서(세라/아이다) 구조 장단점 분석
- **결정:** 단일 비서로 통합 (제안 1+2: CLAUDE.md 절대 규칙 유지 + init_project.py 대화형 가드 추가)
- 착수 조건: 전체 작업 정리 완료 후 진행

---

### 비서명 변수화 전체 완료 + 변수 사용 원칙 추가 (2차 세션)

**배경**
- project-hub 플랫폼은 fork 사용자도 동일하게 사용 가능해야 함
- 관리 파일에 `세라`, `아이다` 등 특정 이름이 하드코딩되어 있으면 다른 비서명 사용 시 충돌 발생

**변경 파일 (세라 담당 — 전역 레이어)**
- `README.md`: 2번째 발생 `세라(Sera) AI 비서 설정` → `{hub_assistant} AI 비서 설정`
- `TRIGGERS.md`: "메모리 저장" 트리거 `세라 실행 불가` → `{hub_assistant} 실행 불가`
- `TODO_GLOBAL.md`: G-016 `아이다 CLAUDE.md 정리` → `{project_assistant} CLAUDE.md 정리`
- `ENHANCEMENTS.md`: 6곳 (관리자 표기, 비고 헤더×4, E-001·E-006·E-010·E-011 본문)
- `guides/SETUP.md`: 16곳 (협업 방식, 역할 표, 디렉토리 구조 주석, CLAUDE.md 역할 표, 세션 프로토콜, 히스토리·To-Do·이슈 관리 표 등)
- `templates/deliverables/DEPLOYMENT.md`: AI 운영 담당란 `아이다 (프로젝트 AI)` → `{project_assistant}`
- `CLAUDE.md`: 최상단 변수 선언 블록에 **변수 사용 원칙** 추가

**변경 파일 (아이다 담당 — 프로젝트 레이어)**
- `projects/wiki_mbo_builder/refs/mbo_evaluation_guide.md`: 3곳 (`아이다에게 작업 지시` 섹션 제목 및 본문)
- `projects/google_drive_backup/source/src/wiki_publisher.py`: 2곳 (HTML 문서 내 아이다 언급)

**유지 항목 (의도적 예외)**
- `hub_init.py`, `init_project.py`: 코드 fallback 기본값 (`"세라"`, `"아이다"`)
- `guides/SETUP.md` 226-227행: 코드블록 예시 (hub_init.py 입력 화면)
- `templates/SETUP.template.md`: 기본값 예시 행
- `history/` 파일들: 과거 기록 (수정 불가)

**변수 사용 원칙 (CLAUDE.md 추가)**
- 관리 파일 작성·수정 시 비서명은 반드시 `{hub_assistant}` / `{project_assistant}` / `{user_name}` 변수로 표기
- 히스토리 파일(`history/`, `_manage/history/`)과 코드 기본값은 변수화 제외

---

### gmail_cleaner Python 전환 + Claude Desktop MCP 통합 (3차 세션)

**세션 범위**
- 아이다 담당: gmail_cleaner 프로젝트 내부 (Python 전환·MCP 서버 구현)
- 세라 담당: Claude Desktop 설정·중앙 MCP 서버 갱신·플랫폼 표준 정렬

**세라 (플랫폼 레이어) 변경**

1. **mcp_server/server.py** 주석 갱신
   - 기존 "gmail_cleaner: Apps Script 기반 직접 실행 불가 (제외)" 문구 제거
   - 변경: "자체 MCP 서버를 가진 프로젝트는 별도 MCP 서버로 등록되므로 여기서 제외"
   - PROJECT_RUN_CONFIG에는 추가하지 않음 — gmail_cleaner는 자체 server.py로 11개 tool 노출

2. **Claude Desktop 설정 갱신**
   - 위치: `C:\Users\Administrator\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
   - 기존 `project-hub` 항목 유지 + `gmail-cleaner` 별도 등록
   - 패턴 확정: A안 (프로젝트별 독립 MCP 서버) — 의존성 격리 + 프로젝트 독립성 우선
   - 잘못 생성한 `~/.claude/mcp.json` 삭제 (Claude Code 기준 위치, Desktop과 무관)

3. **A안 패턴 결정 사항** (앞으로 표준)
   - 단순 1회 실행만 필요한 프로젝트 → 중앙 `mcp_server/server.py`의 PROJECT_RUN_CONFIG에 등록 (기존 wiki/drive)
   - 프로젝트 고유 tool이 필요한 프로젝트 → 자체 `source/src/server.py` 작성 후 Claude Desktop에 별도 등록 (gmail_cleaner)

**아이다 (프로젝트 레이어) 변경 — gmail_cleaner**
- GAS → Python 전면 리팩토링 완료, 자세한 내용은 `projects/gmail_cleaner/_manage/history/202605_history.md` 참조
- MCP 서버 11개 tool: 브라우징·삭제 6개 + 설정 수정 5개
- 71 passed (test_cleaner 22 + test_config 26 + test_server 23)
- 별도 GCP 프로젝트 + OAuth 인증 완료

**Jacey 직접 진행**
- Google Cloud Project 생성·Gmail API 활성화·OAuth 동의화면 + 테스트 사용자 등록
- credentials.json 다운로드 후 `secrets/credentials.json` 배치
- 최초 브라우저 인증으로 token.json 생성

**남은 작업 (3차 세션 당시)**
- ~~gmail_cleaner GitHub repo 생성 (JaceyBaek/gmail_cleaner) → submodule 등록~~ → 완료
- mcp_server/setup.py 자동 탐색 개선 (프로젝트별 server.py 자동 등록)
- guides/mcp_server_setup.md A안 패턴 문서화
- wiki_faq_builder, wiki_mbo_builder 자체 MCP 서버 추가 검토 (현재는 run_project로만 가능)

---

## 2026-05-07 (4차 세션)

### 4-1. 세션 종료 처리 — 플랫폼 기록 및 푸시

**세라 (플랫폼 레이어)**

1. **gmail_cleaner submodule 포인터 최신화**
   - 3차 세션에서 등록된 submodule 포인터를 최신 커밋으로 업데이트
   - `.gitmodules`에 이미 등록 완료: `https://github.com/JaceyBaek/gmail_cleaner.git`

2. **project-hub 커밋·푸시** (`gsr-ax/project-hub` — JaceyBaek-GSRetail 계정)

3. **Google Drive 백업 실행**

4. **사이드바 누락 항목 보완** — `generate_sidebar.py` 재실행으로 google_drive_backup Todo, 5월 히스토리 3건 반영

---

### 4-2. 비서 통합 — 세라·아이다 → 아이다 단일 비서

**배경**
- 두 비서(세라 플랫폼 / 아이다 프로젝트) 분리 운영의 효용성 재검토
- 실제 작업 시간의 80%가 프로젝트 내부 작업, 플랫폼 작업은 가끔 발생
- 역할 전환 선언 절차가 흐름을 끊는 부작용
- fork 사용자도 동일 구조 유지가 부담일 수 있다는 판단

**결정 사항**
- 단일 통합 비서: **아이다 (Aida)**
- 의미 변경: "돕는 자" → **"이익을 주는 자, 보상하는 자" (아랍어 어원)**
  - 기존 "돕는 자"는 어원적으로 직접 일치하지 않음을 확인 후 어원에 맞게 정정
- 통합 방식: **제안 1+2** (CLAUDE.md 절대 규칙 유지 + `init_project.py` 대화형 가드 추가)

**부수 결정: 프로젝트 유형 단일화**
- 기존 `general`(일반/문서) + `dev`(개발) 2종 → **`dev` 단일**로 통일
- 사유: 현재 5개 프로젝트 모두 `dev` 유형. 일반(문서) 작업은 Confluence가 자연스러운 위치
- 영향: `init_project.py --type` 인자 제거, 폴더명 자동 부여(`YYYYMM_폴더명`) 로직 제거

**플랫폼 레이어 변경**

1. **`config/personal.yml` 구조 단순화**
   - `hub_assistant` + `project_assistant` → `assistant` 단일 키
   - 의미: "이익을 주는 자, 보상하는 자 (아랍어)"

2. **루트 `CLAUDE.md` 재작성**
   - "역할 전환 규칙" 섹션 전체 제거
   - "AI 비서" 섹션을 단일 비서로 단순화
   - "작업 영역" 섹션 추가 — 경로 기반 적용 규칙 (전환 선언 불필요)
   - "새 프로젝트 시작 규칙": 유형 질문 제거, 이름·설명 2단계로 단순화

3. **변수 일괄 치환** — 6개 플랫폼 파일
   - `{hub_assistant}` / `{project_assistant}` → `{assistant}`
   - 대상: `TRIGGERS.md`, `ENHANCEMENTS.md`, `TODO_GLOBAL.md`, `README.md`, `templates/deliverables/DEPLOYMENT.md`, `guides/SETUP.md`
   - 두 비서 표/문장은 단일 비서 형태로 정리

4. **템플릿 정리**
   - `templates/CLAUDE_global.template.md`: 단일 비서 구조로 재작성, 플레이스홀더 `{{ASSISTANT_KR}}` 단일화
   - `templates/SETUP.template.md`: SETUP.md와 동일한 단일 비서 구조 반영

5. **코드 수정**
   - `hub_init.py`: 입력 단계 4개→3개(사용자 → 비서 → GitHub), `{{HUB_ASSISTANT_*}}`/`{{PROJ_ASSISTANT_*}}` → `{{ASSISTANT_*}}`
   - `init_project.py`: `--type` 인자 제거, `_compute_project_folder` 함수 제거, `_sync_project_assistant_in_file` 함수 제거, 인터랙티브 가드(`_interactive_collect`) 추가, 단일 `assistant` 키 처리

**서브모듈 변경**

| 서브모듈 | 변경 내용 |
|---|---|
| `google_drive_backup` | `source/src/wiki_publisher.py` 정적 HTML 매뉴얼 내 `{project_assistant}` 2곳 → `아이다`. 커밋·푸시(JaceyBaek 계정) |
| `wiki_mbo_builder` | `refs/mbo_evaluation_guide.md` 정적 가이드 텍스트 내 `{project_assistant}` 4곳 → `아이다`. 커밋·푸시(JaceyBaek 계정) |
| `daily_briefing`, `gmail_cleaner`, `wiki_faq_builder` | 변수 사용 없음 — 변경 없음 |

**히스토리/changelog 보존**
- `history/`, `_manage/history/`, `_manage/changelog.md` 내 `{project_assistant}` 변수 표기는 **그대로 유지**
- 사유: 과거 기록은 작성 시점의 표기를 보존하는 원칙 (CLAUDE.md 변수 사용 원칙)

**버전 영향**
- MAJOR 버전 변경 (플랫폼 핵심 규칙 변경) → `v1.0.0` 태그
- 통합 비서로 첫 안정화 시점 = `v1.0.0` 적용

**남은 작업 (4-2 완료 후)**
- project-hub 전체 커밋·푸시 (`gsr-ax/project-hub`)
- 서브모듈 포인터 최신화 (google_drive_backup, wiki_mbo_builder)
- `git tag v1.0.0` 후 push
- Google Drive 백업
- TODO_GLOBAL.md G-016 항목 재검토 (통합으로 자연스럽게 해결)

---

## 2026-05-07 (5차 세션)

### 5-1. 비서통합 잔여 정리 (G-018)

**배경**
- v1.0.0 비서통합 후 일부 파일에 옛 구조·표기 잔존 발견
- 정식 검증 후 최우선 작업으로 등록 (다른 작업 일체 보류)

**잔재 검출 결과**
- 변수(`hub_assistant`/`project_assistant`/`HUB_ASSISTANT`/`PROJ_ASSISTANT`): `config/personal.yml.bak`, `config/personal.yml.example`
- 표기(`세라`/`Sera`): `templates/SETUP.template.md`, `guides/SETUP.md`
- 보존 대상(작성 시점 보존 원칙으로 변경 안 함): `CHANGELOG.md`, `history/`, `_manage/history/`, `_manage/changelog.md`

**처리 내역**
1. `config/personal.yml.bak` 삭제 (v0.x 옛 구조 백업본)
2. `config/personal.yml.example` 단일 `assistant:` 구조로 갱신 + `github:` 블록 추가
3. `templates/SETUP.template.md` hub_init 입력 표 — 6행(플랫폼·프로젝트 비서 각 3행) → 4행(통합 비서 3행 + GitHub 1행)으로 축약, 기본값 "이익을 주는 자, 보상하는 자 (아랍어)"로 정정
4. `guides/SETUP.md` 동일 표 + 5-2 전역 CLAUDE.md 역할 예시 단일 비서로 정리

**검증**
- 변수 잔재: 보존 대상(history/changelog) 외 0건
- 표기 잔재: 보존 대상 외 0건 (TODO_GLOBAL.md G-018 항목 설명 텍스트는 작업명 자체이므로 정상)
