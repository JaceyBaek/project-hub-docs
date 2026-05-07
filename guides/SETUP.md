<!--
sidebar_title: 셋업 가이드
sidebar_order: 1
-->

# project-hub 환경 설정 가이드

> 이 문서는 project-hub 환경 초기 설정부터 GitHub 연동, 개발 환경 구성까지 전 과정을 기술합니다.
> 문서만 보고 동일한 환경을 처음부터 재현할 수 있도록 모든 단계를 빠짐없이 기술합니다.

---

## 목차

**[Part 1 — project-hub 환경 구성]**
1. [개요](#1-개요)
2. [사전 요구사항](#2-사전-요구사항)
3. [전체 디렉토리 구조](#3-전체-디렉토리-구조)
4. [hub 최초 개인화 (hub_init.py)](#4-hub-최초-개인화-hub_initpy)
5. [Claude Code 설정](#5-claude-code-설정)
6. [전역 관리 파일 확인](#6-전역-관리-파일-확인)
7. [템플릿 구성](#7-템플릿-구성)
8. [세션 프로토콜 동작 확인](#8-세션-프로토콜-동작-확인)

**[Part 2 — GitHub 저장소 및 CI/CD]**

9. [GitHub 저장소 연결](#9-github-저장소-연결)
10. [Git Flow 브랜치 전략](#10-git-flow-브랜치-전략)
11. [Python 개발 환경 설정](#11-python-개발-환경-설정)
12. [코드 품질 도구 설정](#12-코드-품질-도구-설정)
13. [GitHub Actions CI/CD](#13-github-actions-cicd)
14. [알림 설정](#14-알림-설정)

**[Part 3 — 운영 가이드]**

15. [새 프로젝트 시작](#15-새-프로젝트-시작)
16. [개발 워크플로우](#16-개발-워크플로우)
17. [히스토리 관리](#17-히스토리-관리)
18. [To-Do 및 이슈 관리](#18-to-do-및-이슈-관리)
19. [트러블슈팅](#19-트러블슈팅)
20. [부록 — 네이밍 규칙](#20-부록--네이밍-규칙)

---

# Part 1 — project-hub 환경 구성

## 1. 개요

### 시스템 구성

| 항목 | 내용 |
|---|---|
| AI 도구 | Claude Code (Anthropic) |
| 작업 디렉토리 | `{HUB_ROOT}` (clone/fork 위치 — 사용자가 지정) |
| GitHub 저장소 | `gsr-ax/project-hub` (원본 upstream) |
| 언어 | Python |
| 협업 방식 | 사용자 + {assistant} (통합 비서) |

### AI 비서 역할

| 비서 | 담당 영역 |
|---|---|
| **{assistant}** | project-hub 통합 비서 — 플랫폼 관리(프로젝트 생성·상태 전환·전역 파일·세션 프로토콜) + 프로젝트 내부 협업(기능 개발·산출물·이슈·히스토리·운영) |

### 구성 원칙

- **전역 환경과 프로젝트 환경 분리**: project-hub `CLAUDE.md`에서 공통 규칙, 프로젝트별 `CLAUDE.md`에서 세부 사항
- **소스 코드와 관리 파일 분리**: GitHub는 코드(`source/`) 추적, 이슈·히스토리 등은 로컬 `_manage/`에서 별도 관리 (`.gitignore`)
- **산출물 HTML 기반**: 모든 산출물은 `.html` 형식으로 Confluence 게시
- **경로 하드코딩 금지**: 모든 파일 경로는 환경변수로 관리 (Docker 전환 대비)
- **스케줄러**: APScheduler 사용 (Windows 작업 스케줄러 금지)

---

## 2. 사전 요구사항

### 필수 설치 항목

| 도구 | 버전 | 설치 확인 |
|---|---|---|
| Python | 3.x 이상 | `python --version` |
| Git | 최신 | `git --version` |
| VS Code | 최신 | — |
| Claude Code | 최신 | `claude --version` |

### Claude Code 설치

```bash
npm install -g @anthropic-ai/claude-code
```

설치 후 VS Code에서 Claude Code 익스텐션 설치 및 로그인.

### Git 사용자 정보 설정 (최초 1회)

```bash
git config --global user.name "이름"
git config --global user.email "이메일@예시.com"
```

---

## 3. 전체 디렉토리 구조

```
{HUB_ROOT}\                      ← clone/fork 위치 (사용자가 지정, 예: D:\project-hub)
├── CLAUDE.md                    ← project-hub 전역 설정 ({assistant})
├── TRIGGERS.md                  ← {assistant}와 약속된 트리거 목록
├── PROJECTS_GLOBAL.md           ← 전체 프로젝트 현황
├── TODO_GLOBAL.md               ← 전역 To-Do (프로젝트 무관 독립 항목)
├── ISSUES_GLOBAL.md             ← 전역 이슈 (프로젝트 무관 독립 항목)
├── README.md                    ← 저장소 소개
├── init_project.py              ← 프로젝트 폴더 초기화 스크립트
├── .gitignore
│
├── history\                     ← 전역 작업 히스토리
│   └── YYYYMM_history.md        ← 월 단위, 날짜별 append
│
├── projects\                    ← 모든 프로젝트
│   ├── shared\                  ← 프로젝트 간 공유 유틸 모듈
│   │   └── confluence_client.py
│   ├── sample\                  ← 프로젝트 폴더 구조 예시
│   └── {프로젝트명}\
│       ├── CLAUDE.md            ← 프로젝트별 {assistant} 설정
│       ├── docs\                ← 산출물 (HTML, 로컬 전용)
│       ├── refs\                ← 참고자료 (로컬 전용)
│       ├── archive\             ← 구버전 산출물 보관 (로컬 전용)
│       ├── source\              ← 개발 프로젝트만 생성
│       │   ├── src\
│       │   ├── tests\
│       │   ├── requirements.txt
│       │   └── .env.example
│       └── _manage\
│           ├── history\         ← 프로젝트 작업 히스토리
│           ├── meetings\        ← 회의록
│           ├── wiki_config.md   ← Confluence 게시 설정
│           ├── issues.md
│           ├── defects.md
│           ├── deployments.md
│           ├── todo.md
│           ├── decisions.md
│           └── changelog.md
│
├── scripts\                     ← 전역 보조 스크립트 (독립 프로젝트 규모 미만)
│
├── templates\
│   ├── manage\                  ← 관리 파일 초기 템플릿 (issues.md 등)
│   └── deliverables\            ← 산출물 템플릿 (HTML)
│       ├── docs\                ← 단계별 HTML 템플릿
│       ├── guides\              ← 템플릿 작성 가이드
│       ├── assets\              ← CSS 등 공통 리소스
│       ├── index.html           ← 템플릿 목록 인덱스
│       └── DEPLOYMENT.md        ← Confluence 게시 절차
│
├── config\
│   ├── hub_config.yml           ← hub 설정 (GitHub, 알림 등)
│   ├── personal.yml             ← 개인 설정 (hub_init.py 생성, gitignored)
│   └── personal.yml.example     ← 개인 설정 예시
│
├── hub_init.py                  ← hub 최초 개인화 스크립트 (clone/fork 후 1회 실행)
│
└── guides\
    └── SETUP.md                 ← 이 파일
```

---

## 4. hub 최초 개인화 (hub_init.py)

clone 또는 fork 직후 **1회만** 실행합니다. 이후에는 불필요합니다.

```bash
cd {HUB_ROOT}
python hub_init.py
```

입력 항목:

| 단계 | 항목 | 설명 | 기본값 |
|---|---|---|---|
| [1/3] | 사용자 이름 | Claude에서 사용할 본인 이름 | 없음 (필수) |
| [2/3] | 비서 한국어 이름 | project-hub 통합 비서 (한국어) | 아이다 |
| [2/3] | 비서 영문 이름 | — | Aida |
| [2/3] | 비서 이름 의미 | — | 이익을 주는 자, 보상하는 자 (아랍어) |
| [3/3] | GitHub 사용자명 | 개발 프로젝트용 GitHub 계정 | 없음 (선택) |

**실행 결과:**
- `config/personal.yml` 저장 (gitignored — 커밋되지 않음)
- `C:\Users\{사용자명}\.claude\CLAUDE.md` 자동 생성 (전역 개인화 설정)

> **기본값 유지:** 이름을 변경하지 않으려면 각 항목에서 Enter만 누르면 됩니다.

> **재실행:** upstream 업데이트 후 `templates/CLAUDE_global.template.md`가 변경된 경우
> hub_init.py를 재실행하여 전역 CLAUDE.md를 재생성하세요.

---

## 5. Claude Code 설정

### 5-1. CLAUDE.md 파일 위치 및 역할

> **참고:** 전역 CLAUDE.md는 `hub_init.py` 실행 시 `templates/CLAUDE_global.template.md`를 기반으로 자동 생성됩니다.
> 직접 작성할 경우 아래 항목을 포함해야 합니다.

| 파일 | 위치 | 역할 |
|---|---|---|
| 전역 CLAUDE.md | `~\.claude\CLAUDE.md` | {assistant} 전역 설정 (모든 프로젝트에 적용) — hub_init.py로 자동 생성 |
| project-hub CLAUDE.md | `{HUB_ROOT}\CLAUDE.md` | {assistant} 통합 설정 (project-hub 내 적용) |

> 전역 CLAUDE.md는 Claude Code 시작 시 자동 로드됩니다.
> project-hub VS Code 워크스페이스에서는 project-hub CLAUDE.md가 추가로 로드되어 우선 적용됩니다.

### 5-2. 전역 CLAUDE.md 핵심 설정 항목

`~\.claude\CLAUDE.md`에는 아래 섹션이 포함되어야 합니다.
`hub_init.py` 실행 시 `templates/CLAUDE_global.template.md` 기반으로 자동 생성되므로 직접 작성 불필요.

**호칭**

```markdown
## 호칭
- 사용자: {사용자 이름}
- AI: {비서 이름}
```

**역할**

```markdown
## 역할
- 아이다 (Aida): project-hub 통합 비서 — 플랫폼 관리와 프로젝트 내부 협업 모두 담당
```

**응답 규칙** (핵심 항목)

```markdown
## 응답 규칙
1. 한국어로만 응답
2. 불필요한 서두 금지
3. 사실 및 데이터 기반 답변만 (추측 불가)
4. 할루시네이션 방지 우선
5. 수정 사항 여러 개면 번호로 정리
6. 코드·산출물 우선 제공
7. 확인 질문은 1개만
8. Step-by-step 진행
9. 실수 반복 금지
```

### 5-3. project-hub CLAUDE.md 핵심 설정 항목

`{HUB_ROOT}\CLAUDE.md`에는 아래 섹션이 포함됩니다.

- **세션 시작 프로토콜**: TRIGGERS.md 로드 → TODO_GLOBAL.md 기한 초과 확인 → 히스토리 누락 확인
- **세션 종료 프로토콜**: 글로벌 히스토리 기록 → 프로젝트 히스토리 기록 → Google Drive 백업
- **작업 영역 판단**: 작업 대상 경로(`projects/` 하위 vs 그 외)에 따라 적용 규칙 자동 판단
- **새 프로젝트 시작 규칙**: 대화형 가드 (이름·설명 수집 → 사용자 최종 확인 → `init_project.py` 실행)
- **프로젝트 상태 전환 절차**: 진행중·보류·운영중·완료 전환 방법
- **산출물 명명규칙**: `{프로젝트명}_{산출물명}_{YYYYMMDD}.html`

---

## 6. 전역 관리 파일 확인

project-hub 루트에 아래 파일이 모두 존재하는지 확인합니다.

```bash
# {HUB_ROOT} 는 실제 hub 설치 경로로 대체
ls {HUB_ROOT}
# 확인 대상: PROJECTS_GLOBAL.md, TODO_GLOBAL.md, ISSUES_GLOBAL.md, TRIGGERS.md
```

### 6-1. PROJECTS_GLOBAL.md

전체 프로젝트 현황. {assistant}가 통합 관리.

```markdown
# 프로젝트 현황

## 진행중
| 프로젝트명 | 폴더 | 담당 | 시작일 | 요약 |
|---|---|---|---|---|

## 보류
| 프로젝트명 | 폴더 | 담당 | 시작일 | 요약 |
|---|---|---|---|---|

## 운영중
| 프로젝트명 | 폴더 | 담당 | 시작일 | 요약 |
|---|---|---|---|---|

## 완료
| 프로젝트명 | 폴더 | 담당 | 시작일 | 완료일 | 요약 |
|---|---|---|---|---|---|
```

### 6-2. TODO_GLOBAL.md

프로젝트 무관 독립 To-Do 전용. 프로젝트별 To-Do는 각 `_manage/todo.md`에서 관리.

```markdown
# TODO_GLOBAL

| ID | 출처 | 제목 | 우선순위 | 상태 | 기한 | 완료일 |
|---|---|---|---|---|---|---|
```

> 우선순위: 높음·보통·낮음 / 상태: 대기·진행중·완료·보류

### 6-3. ISSUES_GLOBAL.md

프로젝트 무관 독립 이슈 전용.

```markdown
# ISSUES_GLOBAL

| ID | 프로젝트 | 유형 | 제목 | 내용 | 상태 | 등록일 | 완료일 |
|---|---|---|---|---|---|---|---|
```

> 유형: 버그·변경요청·리스크 / 상태: 오픈·진행중·완료·보류

### 6-4. TRIGGERS.md

{assistant}와 약속된 트리거 목록. 새 트리거 추가 시 이 파일에 업데이트.

---

## 7. 템플릿 구성

### 7-1. 산출물 템플릿 (`templates/deliverables/docs/`)

| 파일명 | 산출물 | 단계 |
|---|---|---|
| `01_REQ_요구사항정의서.html` | 요구사항 정의서 | 분석 (필수) |
| `02_FLW_프로세스흐름도.html` | 프로세스 흐름도 | 분석 |
| `03_SCR_화면정의서.html` | 화면 정의서 | 설계 (선택) |
| `04_ROLE_권한정의서.html` | 권한 정의서 | 설계 (선택) |
| `05_FUNC_기능정의서.html` | 기능 정의서 | 설계 (선택) |
| `06_UTC_단위테스트케이스.html` | 단위 테스트 케이스 | 구현 (필수) |
| `07_ITS_통합테스트시나리오.html` | 통합 테스트 시나리오 | 시험 (선택) |
| `08_ARC_아키텍처.html` | 아키텍처 | 이행 (필수) |
| `09_OPM_운영자매뉴얼.html` | 운영자 매뉴얼 | 이행 (필수) |
| `10_USM_사용자매뉴얼.html` | 사용자 매뉴얼 | 이행 (필수) |
| `11_CFG_설정가이드.html` | 설정 가이드 | 이행 (필수) |
| `00_TRC_요구사항추적매트릭스.html` | 요구사항 추적 매트릭스 | 이행 (선택) |

> 최신 버전 파일만 유지. 구버전은 `archive/`로 이동.

### 7-2. 템플릿 사용 방식

- **{assistant} 제안**: 프로젝트 단계 진입 시 필요한 템플릿 판단 → 사용자 승인 후 `docs/` 폴더에 복사 후 작성
- **사용자 직접 요청**: "~~작성해줘" → {assistant}가 해당 템플릿 복사 후 즉시 작성 시작

### 7-3. Confluence 게시

산출물 작성 완료 후 `templates/deliverables/DEPLOYMENT.md` §4 참조하여 게시.

- 산출물 페이지 부모: `423870940`
- 위키 게시 시 최신 버전만 유지

---

## 8. 세션 프로토콜 동작 확인

### 세션 시작 프로토콜 ({assistant} 자동 실행)

VS Code에서 project-hub를 열고 Claude Code 세션을 시작하면 {assistant}가 자동으로:

1. `TRIGGERS.md` 로드
2. `TODO_GLOBAL.md` 기한 초과 항목 확인 → 있으면 알림
3. `history/YYYYMM_history.md` 최근 날짜 확인 → 누락 시 알림

### 세션 종료 프로토콜 (마무리 뉘앙스 감지 시 자동 실행)

마무리 표현 감지 시 {assistant}가:

1. 글로벌 작업 있으면 → 글로벌 히스토리 기록 여부 확인
2. 프로젝트 작업 있으면 → 해당 프로젝트 히스토리 기록 여부 확인
3. 히스토리 기록 완료 → Google Drive 백업 실행

---

# Part 2 — GitHub 저장소 및 CI/CD

## 9. GitHub 저장소 연결

### 8-1. 저장소 정보

| 항목 | 값 |
|---|---|
| 저장소 (원본) | `gsr-ax/project-hub` (upstream) |
| 개인 fork | `{GitHub 계정}/project-hub` (본인 fork 저장소) |
| Remote URL | `https://{GitHub계정}@github.com/{저장소}.git` |

> Remote URL에 계정명을 포함하는 방식은 Windows Credential Manager 다중 계정 환경에서 계정 충돌을 방지합니다.

### 8-2. 로컬 초기화 (최초 1회)

```bash
cd {HUB_ROOT}
git init
git remote add origin https://{GitHub계정}@github.com/{저장소}.git
git pull origin main
```

### 8-3. 현재 Remote 확인

```bash
git remote -v
```

### 8-4. hub 업데이트 반영 (upstream 원본 반영)

```bash
# 최신 변경사항 반영
git pull origin main
```

> **주의:** `CLAUDE.md` / `config/` / `templates/` / `guides/` / `init_project.py` / `.github/` 은 hub 관리 영역입니다. 직접 수정하지 말고 변경이 필요하면 hub 관리자에게 요청하세요.

---

## 10. Git Flow 브랜치 전략

### 브랜치 구조

| 브랜치 | 용도 | 분기 기준 | 병합 대상 |
|---|---|---|---|
| `main` | 안정 버전 | — | — |
| `develop` | 개발 통합 | main | main (PR) |
| `feature/{기능명}` | 기능 개발 | develop | develop (PR) |
| `fix/{버그명}` | 버그 수정 | develop | develop (PR) |

### develop 브랜치 생성 (최초 1회)

```bash
git checkout -b develop
git push -u origin develop
```

### GitHub 기본 브랜치 develop으로 변경

1. 저장소 → `Settings` → `General`
2. `Default branch` → 연필 아이콘
3. `develop` 선택 → `Update` 클릭

### 커밋 메시지 컨벤션

| 타입 | 설명 |
|---|---|
| `feat:` | 새 기능 추가 |
| `fix:` | 버그 수정 |
| `docs:` | 문서 변경 |
| `style:` | 포맷 등 코드 변경 없는 수정 |
| `refactor:` | 리팩토링 |
| `test:` | 테스트 추가·수정 |
| `chore:` | 빌드·설정 변경 |

---

## 11. Python 개발 환경 설정

### 10-1. 가상환경 생성 (프로젝트별)

```bash
cd {HUB_ROOT}\projects\{프로젝트명}\source
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 10-2. .env 설정

```bash
cp .env.example .env
# .env 파일 열어 실제 값 입력
# .env는 절대 커밋 금지
```

### 10-3. pyproject.toml (프로젝트 루트)

```toml
[tool.black]
line-length = 100
target-version = ["py312"]

[tool.flake8]
max-line-length = 100
extend-ignore = ["E203", "W503"]

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
```

### 10-4. 공통 모듈 사용 (`projects/shared/`)

```python
import sys
import os

# shared 모듈 경로 추가
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'shared'))

from confluence_client import ConfluenceClient
```

환경 변수:
- `CONFLUENCE_URL` — Confluence 서버 URL
- `CONFLUENCE_USERNAME` — 사용자명
- `CONFLUENCE_API_TOKEN` — API 토큰

---

## 12. 코드 품질 도구 설정

### 11-1. pre-commit 패키지 설치

```bash
pip install pre-commit
```

### 11-2. .pre-commit-config.yaml 생성

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.10.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/flake8
    rev: 7.1.1
    hooks:
      - id: flake8
        args: [--max-line-length=100]

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v5.0.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
```

> **주의:** black hook에 `args: [--max-line-length=100]` 추가 금지. black은 `pyproject.toml`의 `[tool.black]` 설정을 자동 적용합니다.

### 11-3. pre-commit hook 로컬 설치

```bash
pre-commit install
```

이후 `git commit` 시 black·flake8 검사가 자동 실행됩니다. 첫 실행 시 환경 초기화로 수 분 소요됩니다.

---

## 13. GitHub Actions CI/CD

### 12-1. 개발 프로젝트 CI 워크플로우 생성

`.github/workflows/ci-{프로젝트명}.yml`:

```yaml
name: CI - {프로젝트명}

on:
  push:
    branches: [main, develop]
    paths:
      - 'projects/{프로젝트명}/**'
  pull_request:
    branches: [main, develop]
    paths:
      - 'projects/{프로젝트명}/**'

jobs:
  ci:
    name: {프로젝트명} CI
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: projects/{프로젝트명}/source
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install dependencies
        run: |
          pip install --upgrade pip
          pip install flake8 black pytest
          if [ -s requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Format check (black)
        run: black src/ --check
      - name: Lint (flake8)
        run: flake8 src/ --max-line-length=100
      - name: Test
        run: pytest tests/ -v
```

### 12-2. CI 동작 확인

1. GitHub 저장소 → `Actions` 탭
2. 해당 워크플로우 클릭
3. `ci` 잡 클릭 → 각 스텝 로그 확인

---

## 14. 알림 설정

알림 설정은 `config/hub_config.yml`에서 관리합니다.

### 13-1. GitHub 이메일 알림

```yaml
notifications:
  email:
    enabled: true
```

> hub repo를 Watch 중인 팀원에게 GitHub 이메일이 자동 발송됩니다.
> GitHub repo → Watch → All Activity 설정 필요.

### 13-2. Microsoft Teams 알림

```yaml
notifications:
  teams:
    enabled: true  # false → true 변경
```

Teams Webhook URL은 GitHub Secrets에 저장해야 합니다.

1. GitHub 저장소 → `Settings` → `Secrets and variables` → `Actions`
2. `New repository secret` → Name: `TEAMS_WEBHOOK_URL`, Value: Teams Incoming Webhook URL 입력

---

# Part 3 — 운영 가이드

## 15. 새 프로젝트 시작

### 14-1. init_project.py 실행 (공통 — 일반·개발 프로젝트 모두)

`init_project.py`는 프로젝트 폴더 구조, 관리 파일, CLAUDE.md, PROJECTS_GLOBAL.md 등록을 자동 처리합니다.

```bash
cd {HUB_ROOT}
python init_project.py
```

입력 항목:

| 항목 | 설명 |
|---|---|
| 프로젝트명 | 영문 소문자·언더바 (예: `jira_issue_sync`) |
| 유형 | 1: 일반/문서, 2: 개발 |
| 담당자명 | personal.yml 설정값 자동 반영 (없으면 직접 입력) |
| Confluence 루트 페이지 ID | 없으면 Enter 스킵 |

> 일반 프로젝트는 폴더명이 `YYYYMM_{입력값}` 형식으로 자동 생성됩니다. (예: `202604_jira_issue_sync`)

**자동 처리 항목:**

- 폴더 구조 생성 (`docs/` / `refs/` / `archive/` / `_manage/history/` / `_manage/meetings/`)
- 관리 파일 복사 (`todo.md` / `issues.md` / `decisions.md` / `changelog.md` / `defects.md` / `deployments.md` / `wiki_config.md`)
- `CLAUDE.md` 초안 생성
- `_manage/wiki_config.md` 사용자명·페이지 ID 자동 입력
- `PROJECTS_GLOBAL.md` 진행중 섹션에 자동 등록
- (개발 전용) `source/requirements.txt`, `source/.env.example` 생성

---

### 14-2. 일반 프로젝트 — 스크립트 실행 후 추가 작업

1. `CLAUDE.md` 프로젝트 요약 직접 입력
2. `_manage/wiki_config.md` Wiki 설정 확인
3. VS Code 전환:
   ```bash
   code -r {HUB_ROOT}\projects\{폴더명}
   ```

---

### 14-3. 개발 프로젝트 — 스크립트 실행 후 추가 작업

**1. feature 브랜치 생성**

```bash
cd {HUB_ROOT}
git checkout develop && git pull origin develop
git checkout -b feature/{기능명}
```

**2. Python 패키지 초기 파일 생성**

```bash
# 빈 파일 생성 (Python 패키지 선언)
type nul > projects\{폴더명}\source\src\__init__.py
type nul > projects\{폴더명}\source\tests\__init__.py
```

`projects/{폴더명}/source/tests/test_placeholder.py`:

```python
# pytest가 테스트 없을 경우 exit code 5 반환 → CI 실패
# 실제 테스트 작성 전까지 유지
def test_placeholder():
    pass
```

**3. CI 워크플로우 추가**

12절 참조하여 `.github/workflows/ci-{폴더명}.yml` 생성.

**4. 커밋 및 PR**

```bash
git add projects/{폴더명}/ .github/workflows/ci-{폴더명}.yml
git commit -m "feat: add {폴더명} project"
git push origin feature/{기능명}
# GitHub에서 PR 생성 (base: develop)
```

**5. 개발 완료 후 (이행 단계)**

이행 단계 필수 산출물 모두 완료 후 → `{폴더명}_setup.md` 최종 작성 → Confluence 게시

---

## 16. 개발 워크플로우

### 브랜치 흐름

```
develop
  └── feature/{기능명}     ← 작업 브랜치
        ↓ 개발 완료
      PR (feature → develop)
        ↓ CI 통과
      develop 병합
        ↓ 배포 준비 완료
      PR (develop → main)
        ↓ 최종 검토
      main 병합
```

### 일반 개발 흐름

```bash
# 1. 브랜치 생성
git checkout develop && git pull origin develop
git checkout -b feature/{기능명}

# 2. 개발 후 커밋 (pre-commit 자동 실행)
git add {파일}
git commit -m "feat: 기능 설명"

# 3. push 및 PR
git push origin feature/{기능명}
# GitHub에서 PR 생성 (base: develop)
```

### 로컬 테스트 실행

```bash
cd {HUB_ROOT}\projects\{프로젝트명}\source
venv\Scripts\activate

black src/ --check           # 포맷 검사
flake8 src/                  # 린트 검사
pytest tests/ -v             # 테스트 실행
```

---

## 17. 히스토리 관리

### 히스토리 종류

| 종류 | 위치 | 기록 대상 |
|---|---|---|
| 글로벌 히스토리 | `{HUB_ROOT}\history\YYYYMM_history.md` | CLAUDE.md·템플릿·TRIGGERS.md 등 전역 환경 변경 |
| 프로젝트 히스토리 | `projects\{이름}\_manage\history\YYYYMM_history.md` | 해당 프로젝트 작업 |

### 기록 방식

"오늘 작업 정리해줘" 트리거 시 {assistant}가 자동 판단:
- 전역 환경 변경만 있으면 → 글로벌 히스토리에만 기록
- 프로젝트 작업만 있으면 → 해당 프로젝트 히스토리에만 기록
- 둘 다 있으면 → 글로벌 → 프로젝트 순으로 각각 기록

### 히스토리 파일 형식

```markdown
# 글로벌 히스토리 — YYYY년 MM월

---

## YYYY-MM-DD

### 작업 내용

1. **작업 제목**
   - 작업 내용 bullet
   - ...

### 남은 작업

- 다음 세션에서 처리할 항목
```

---

## 18. To-Do 및 이슈 관리

### To-Do

| 위치 | 대상 | 관리자 |
|---|---|---|
| `TODO_GLOBAL.md` | 프로젝트 무관 독립 항목 | {assistant} |
| `projects\{이름}\_manage\todo.md` | 해당 프로젝트 항목 | {assistant} |

전체 현황 필요 시: "전체 To-Do 보여줘" → {assistant}가 TODO_GLOBAL + 진행중·운영중 프로젝트 todo.md 통합 출력.

### 이슈

| 위치 | 대상 | 관리자 |
|---|---|---|
| `ISSUES_GLOBAL.md` | 프로젝트 무관 독립 항목 | {assistant} |
| `projects\{이름}\_manage\issues.md` | 해당 프로젝트 항목 | {assistant} |

전체 현황 필요 시: "전체 이슈 보여줘" → {assistant}가 ISSUES_GLOBAL + 진행중·운영중 프로젝트 issues.md 통합 출력.

---

## 19. 트러블슈팅

### Git 커밋 시 `fatal: unable to auto-detect email address`

```bash
git config --global user.name "이름"
git config --global user.email "이메일@예시.com"
```

### push 시 인증 오류 (다중 계정 환경)

Remote URL에 계정명을 포함하여 설정합니다.

```bash
git remote set-url origin https://{GitHub계정}@github.com/{저장소}.git
```

### pre-commit 첫 실행이 매우 느림

최초 실행 시 black·flake8 환경을 내려받습니다. 수 분 소요 후 이후 실행은 빠릅니다.

### pytest exit code 5 (no tests ran)

`tests/test_placeholder.py`에 아래를 추가합니다.

```python
def test_placeholder():
    pass
```

> pytest는 테스트 없을 경우 exit code 5 반환 → CI 실패. 실제 테스트 작성 전까지 placeholder 유지.

### pre-commit black 오류 `No such option: --max-line-length`

`.pre-commit-config.yaml`의 black hook에서 `args: [--max-line-length=100]`을 제거하세요. black 설정은 `pyproject.toml`의 `[tool.black]`에서 관리합니다.

### GitHub Actions CI가 실행되지 않음

`paths` 필터를 확인하세요. 해당 프로젝트 폴더(`projects/{프로젝트명}/`) 하위 파일이 변경되지 않으면 CI가 실행되지 않습니다.

### `origin/HEAD -> origin/main`으로 표시됨 (기본 브랜치 develop 설정 후)

```bash
git remote set-head origin develop
```

---

## 20. 부록 — 네이밍 규칙

| 대상 | 규칙 | 예시 |
|---|---|---|
| 일반 프로젝트 폴더 | `YYYYMM_프로젝트명` (영문 소문자 + 언더바) | `202604_system_auth_improvement` |
| 개발 프로젝트 폴더 | 영문 소문자 + 언더바 | `jira_issue_sync` |
| Python 파일 | 영문 소문자 + 언더바 | `issue_parser.py` |
| 클래스 | PascalCase | `IssueParser` |
| 함수·변수 | snake_case | `get_issue_list` |
| 브랜치 | 영문 소문자 + 하이픈 | `feature/jira-issue-sync` |
| 커밋 메시지 | `타입: 설명` | `feat: Jira 이슈 동기화 추가` |
| 산출물 파일 | `{프로젝트명}_{산출물명}_{YYYYMMDD}.html` | `jira_issue_sync_요구사항정의서_20260427.html` |
| 회의록 파일 | `YYYYMMDD_meeting_제목.md` | `20260427_meeting_요구사항검토.md` |
