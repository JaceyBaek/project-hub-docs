<!--
sidebar_title: MCP Server 설정
sidebar_order: 2
-->

# project-hub MCP Server 설정 가이드

> 이 문서는 project-hub MCP Server 구축 과정과 운영 방법을 기술합니다.
> 새 PC에서 `setup.py`를 실행하면 이 문서의 설치 절차를 자동으로 수행합니다.

---

## 목차

1. [개요](#1-개요)
2. [파일 구조](#2-파일-구조)
3. [사전 요구사항](#3-사전-요구사항)
4. [새 PC 설치 (setup.py)](#4-새-pc-설치-setuppy)
5. [Claude Desktop 연결 확인](#5-claude-desktop-연결-확인)
6. [사용 가능한 Tool 목록](#6-사용-가능한-tool-목록)
7. [사용 예시](#7-사용-예시)
8. [운영 참고사항](#8-운영-참고사항)
9. [새 프로젝트 실행 Tool 추가](#9-새-프로젝트-실행-tool-추가)
10. [트러블슈팅](#10-트러블슈팅)

---

## 1. 개요

### MCP(Model Context Protocol)란

Anthropic이 정의한 표준 프로토콜로, AI 모델이 외부 도구·데이터 소스에 접근할 수 있게 해줍니다.
MCP Server를 만들면 Claude Desktop 등 MCP를 지원하는 클라이언트에서 명령 한 줄로 로컬 파일 조회, 스크립트 실행 등을 수행할 수 있습니다.

### project-hub MCP Server 역할

| 기능 | 설명 |
|---|---|
| 읽기 | 프로젝트 현황, To-Do, 이슈, 히스토리, 트리거 목록 조회 |
| 쓰기 | 전역 To-Do 추가, 상태 변경 |
| 실행 | 프로젝트 스크립트 1회 수동 실행 (화이트리스트 기반) |

### 구성 방식

```
Claude Desktop ──stdio──► python.exe server.py
                                    ↕
                          D:\03.project-hub (로컬 파일)
```

- **stdio 방식**: Claude Desktop이 Python 프로세스를 직접 subprocess로 실행
- **로컬 전용**: Claude Desktop이 켜져 있는 동안만 동작 (별도 서버 불필요)
- **화이트리스트**: 실행 Tool은 등록된 프로젝트·명령만 허용

---

## 2. 파일 구조

```
D:\03.project-hub\
└── mcp_server\
    ├── server.py          # MCP 서버 본체 — Tool 정의 및 핸들러
    ├── setup.py           # 새 PC 설치 자동화 스크립트
    ├── requirements.txt   # 의존 패키지 (mcp>=1.0.0)
    └── .venv\             # 독립 가상환경 (setup.py가 자동 생성, gitignored)
```

### 각 파일 역할

| 파일 | 역할 | git 관리 |
|---|---|---|
| `server.py` | MCP 서버 본체 | ✅ 포함 |
| `setup.py` | PC별 1회 설치 자동화 | ✅ 포함 |
| `requirements.txt` | 패키지 의존성 | ✅ 포함 |
| `.venv/` | 가상환경 | ❌ gitignored |
| `claude_desktop_config.json` | Claude Desktop 설정 (PC마다 다름) | ❌ gitignored |

---

## 3. 사전 요구사항

| 항목 | 버전 | 설치 확인 |
|---|---|---|
| Python | 3.10 이상 | `python --version` |
| Git | 최신 | `git --version` |
| Claude Desktop | 최신 | Claude Desktop 앱 실행 확인 |

> Claude Desktop은 일반 설치(AppData\Roaming\Claude)와 Microsoft Store 설치(AppData\Local\Packages\Claude_*)
> 두 가지 경로를 모두 지원합니다. `setup.py`가 자동으로 감지합니다.

---

## 4. 새 PC 설치 (setup.py)

### 4-1. git clone

```bash
git clone https://github.com/JaceyBaek-GSRetail/project-hub.git
cd project-hub
```

### 4-2. setup.py 실행 (1회)

```bash
python mcp_server/setup.py
```

실행 내용:

| 단계 | 작업 |
|---|---|
| [1/3] 가상환경 생성 | `mcp_server/.venv` 생성 (이미 있으면 건너뜀) |
| [2/3] 패키지 설치 | `mcp>=1.0.0` 및 의존 패키지 설치 |
| [3/3] MCP 서버 등록 | Claude Desktop 설정 파일에 `project-hub` 서버 자동 등록 |

**실행 결과 예시:**

```
=======================================================
  project-hub MCP Server 설치
=======================================================

[1/3] 가상환경 생성
  완료: D:\03.project-hub\mcp_server\.venv

[2/3] 패키지 설치
  완료

[3/3] Claude Desktop MCP 서버 등록
  기존 설정 파일 발견: C:\Users\{계정}\AppData\Local\Packages\Claude_xxx\...
  완료

  command : D:\03.project-hub\mcp_server\.venv\Scripts\python.exe
  args    : D:\03.project-hub\mcp_server\server.py
  config  : C:\Users\{계정}\AppData\Local\Packages\Claude_xxx\...

=======================================================
  설치 완료!
  Claude Desktop을 재시작하면 project-hub가 활성화됩니다.
=======================================================
```

> **기존 MCP 서버 유지**: setup.py는 `mcpServers.project-hub` 항목만 추가/갱신합니다.
> Figma 등 기존에 등록된 다른 MCP 서버는 영향받지 않습니다.

### 4-3. Claude Desktop 재시작

- Windows 트레이(우측 하단 시계 옆) Claude 아이콘 우클릭 → 종료
- Claude Desktop 앱 다시 실행

---

## 5. Claude Desktop 연결 확인

### 5-1. 설정 화면에서 확인

```
Claude Desktop → 설정(Settings) → 개발자(Developer)
```

`project-hub` 항목이 **running** 상태로 표시되면 연결 완료입니다.

| 상태 | 의미 |
|---|---|
| `running` (파란색) | 정상 연결 |
| `error` (빨간색) | 서버 오류 — 로그 확인 필요 |
| 목록에 없음 | 설정 파일 미등록 또는 재시작 필요 |

### 5-2. Tool 목록 확인

입력창 왼쪽 `+` 버튼 → **커넥터** → `project-hub` 항목이 활성화(파란색) 상태인지 확인합니다.

### 5-3. 동작 테스트

Claude Desktop 대화창에 입력:

```
프로젝트 현황 보여줘
```

`list_projects` Tool이 자동 호출되어 `PROJECTS_GLOBAL.md` 내용이 출력되면 정상입니다.

---

## 6. 사용 가능한 Tool 목록

### 읽기 Tool

| Tool | 설명 | 대상 파일 |
|---|---|---|
| `list_projects` | 전체 프로젝트 현황 | `PROJECTS_GLOBAL.md` |
| `list_global_todos` | 전역 To-Do 목록 | `TODO_GLOBAL.md` |
| `list_global_issues` | 전역 이슈 목록 | `ISSUES_GLOBAL.md` |
| `get_triggers` | 트리거 목록 | `TRIGGERS.md` |
| `get_project_todo` | 프로젝트별 To-Do | `projects/{name}/_manage/todo.md` |
| `get_project_issues` | 프로젝트별 이슈 | `projects/{name}/_manage/issues.md` |
| `get_project_history` | 프로젝트별 월별 히스토리 | `projects/{name}/_manage/history/YYYYMM_history.md` |

### 쓰기 Tool

| Tool | 설명 | 대상 파일 |
|---|---|---|
| `add_global_todo` | 전역 To-Do 항목 추가 | `TODO_GLOBAL.md` |
| `update_global_todo_status` | 전역 To-Do 상태 변경 | `TODO_GLOBAL.md` |

### 실행 Tool

| Tool | 설명 |
|---|---|
| `run_project` | 화이트리스트 프로젝트 1회 실행 |

**실행 가능 프로젝트 (화이트리스트):**

| 프로젝트 | 실행 명령 | 비고 |
|---|---|---|
| `wiki_faq_builder` | `python main.py --auto` | APScheduler 없이 1회 실행 |
| `wiki_mbo_builder` | `python main.py --auto` | APScheduler 없이 1회 실행 |
| `google_drive_backup` | `python main.py` | 단발 실행 |

> `gmail_cleaner`: Google Apps Script 기반으로 직접 실행 불가 (제외)
> `daily_briefing`: 개발 진행 중 (추후 추가 예정)

---

## 7. 사용 예시

Claude Desktop 대화창에서 자연어로 요청하면 AI가 적절한 Tool을 자동 선택합니다.

### 읽기

```
프로젝트 현황 보여줘
→ list_projects 호출

wiki_faq_builder 이번 달 히스토리 보여줘
→ get_project_history(project="wiki_faq_builder") 호출

전역 To-Do 중 진행중인 것만 알려줘
→ list_global_todos 호출 후 AI가 필터링
```

### 쓰기

```
G-013 완료 처리해줘
→ update_global_todo_status(id="G-013", status="완료") 호출

전역 To-Do에 "MCP 서버 운영 가이드 작성" 추가해줘, 우선순위 보통
→ add_global_todo(title="MCP 서버 운영 가이드 작성", priority="보통") 호출
```

### 실행

```
google_drive_backup 실행해줘
→ run_project(project="google_drive_backup") 호출 → 실행 결과 반환

wiki_faq_builder 지금 바로 돌려줘
→ run_project(project="wiki_faq_builder") 호출 → stdout/stderr 반환
```

---

## 8. 운영 참고사항

### 서버 시작·종료 시점

| 이벤트 | 동작 |
|---|---|
| Claude Desktop 실행 | MCP 서버 자동 시작 |
| Claude Desktop 종료 | MCP 서버 자동 종료 |
| VS Code 실행·종료 | 무관 (독립 동작) |

### 로그 확인

오류 발생 시 Claude Desktop 설정 화면에서 **로그 보기** 버튼 클릭 또는 아래 경로 직접 확인:

```
# Microsoft Store 설치
C:\Users\{계정}\AppData\Local\Packages\Claude_xxx\LocalCache\Roaming\Claude\logs\mcp-server-project-hub.log

# 일반 설치
C:\Users\{계정}\AppData\Roaming\Claude\logs\mcp-server-project-hub.log
```

### 설정 파일 경로

`setup.py`가 자동 생성하는 `claude_desktop_config.json` 위치:

| 설치 방식 | 경로 |
|---|---|
| Microsoft Store | `AppData\Local\Packages\Claude_{ID}\LocalCache\Roaming\Claude\claude_desktop_config.json` |
| 일반 설치 | `AppData\Roaming\Claude\claude_desktop_config.json` |

---

## 9. 새 프로젝트 실행 Tool 추가

새 개발 프로젝트가 추가됐을 때 실행 Tool 화이트리스트에 등록하는 방법입니다.

`mcp_server/server.py`의 `PROJECT_RUN_CONFIG` 딕셔너리에 항목을 추가합니다.

```python
PROJECT_RUN_CONFIG: dict[str, dict] = {
    # 기존 항목 ...

    "신규_프로젝트명": {
        "python": HUB_ROOT / "projects/신규_프로젝트명/.venv/Scripts/python.exe",
        "cwd": HUB_ROOT / "projects/신규_프로젝트명/source/src",
        "args": ["main.py"],                # 실행 인자 (필요 시 "--auto" 등 추가)
        "description": "프로젝트 설명",
    },
}
```

> 변경 후 Claude Desktop 재시작 없이 즉시 반영됩니다.
> (Claude Desktop이 stdio로 server.py를 매번 새로 실행하기 때문)

---

## 10. 트러블슈팅

### project-hub 서버가 목록에 없음

**원인:** Claude Desktop 재시작 전이거나, 설정 파일 경로가 틀림

**확인 방법:** Claude Desktop → 설정 → 개발자 → **구성 편집** 클릭
→ 열린 파일에 `"project-hub"` 항목이 있는지 확인

**해결:**
1. `python mcp_server/setup.py` 재실행
2. Claude Desktop 완전 종료(트레이 포함) 후 재시작

---

### project-hub 서버가 error 상태

**확인:** 설정 → 개발자 → project-hub → **로그 보기** 클릭

**주요 원인별 해결:**

| 오류 메시지 | 원인 | 해결 |
|---|---|---|
| `python.exe not found` | venv 미생성 | `python mcp_server/setup.py` 실행 |
| `No module named 'mcp'` | 패키지 미설치 | `mcp_server/.venv/Scripts/pip install -r mcp_server/requirements.txt` |
| `FileNotFoundError: server.py` | 경로 불일치 | `claude_desktop_config.json`의 `args` 경로 확인 |

---

### run_project 실행 시 "python 실행파일을 찾을 수 없음"

해당 프로젝트의 venv가 생성되지 않은 상태입니다.

```bash
cd projects/{프로젝트명}
python -m venv .venv
.venv\Scripts\pip install -r source/requirements.txt
```

---

### setup.py 실행 시 인코딩 오류

Windows 콘솔 인코딩(cp949) 문제입니다. PowerShell에서 실행하거나 아래 명령으로 실행합니다.

```powershell
$env:PYTHONIOENCODING = "utf-8"
python mcp_server/setup.py
```

---

### 다른 MCP 서버(Figma 등)가 사라짐

setup.py는 `mcpServers.project-hub` 항목만 추가/갱신합니다. 다른 항목을 건드리지 않습니다.
혹시 사라진 경우, 해당 서버의 설치 가이드를 참조해 재등록하세요.
