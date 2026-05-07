<!--
sidebar_title: Claude Code 자동 승인
sidebar_order: 4
-->

# Claude Code 자동 승인 가이드

Claude Code에서 도구 호출 시 매번 Yes/No를 묻는 권한 프롬프트를 특정 도구·명령에 한해 자동 승인되도록 설정하는 방법.

---

## 설정 파일 위치

| 파일 | 적용 범위 | Git |
|---|---|---|
| `~/.claude/settings.json` (`C:\Users\{user}\.claude\settings.json`) | 전역 — 모든 프로젝트 | N/A |
| `.claude/settings.json` | 프로젝트 공용 (팀과 공유) | 커밋 대상 |
| `.claude/settings.local.json` | 프로젝트 로컬 (개인 오버라이드) | gitignore |

로드 순서: 전역 → 프로젝트 → 로컬 (뒤가 앞을 덮어씀)

---

## 권한 규칙 문법

`permissions.allow` 배열에 문자열로 추가:

```json
{
  "permissions": {
    "allow": [
      "ToolName",                  // 도구 전체 허용 (모든 호출 자동 승인)
      "Bash(npm *)",               // prefix 와일드카드 (npm, npm test 등 모두 매칭)
      "Bash(git status)",          // 정확한 명령만
      "Read"                       // Read 전체 허용
    ],
    "deny": [
      "Bash(rm -rf *)"             // 명시적 거부 (allow보다 우선)
    ],
    "ask": [
      "Write(/etc/*)"              // 항상 프롬프트
    ]
  }
}
```

### 매칭 우선순위
1. `deny` (가장 강함) — 매칭되면 무조건 거부
2. `ask` — 매칭되면 항상 프롬프트
3. `allow` — 매칭되면 자동 승인
4. 기본값 — 프롬프트 표시

---

## 자동 승인 가능 도구 리스트

### 셸 / 명령 실행
| 도구 | 용도 | 권한 예시 |
|---|---|---|
| `Bash` | POSIX 셸 명령 | `"Bash"`, `"Bash(git *)"`, `"Bash(npm test)"` |
| `PowerShell` | Windows PowerShell 명령 | `"PowerShell"`, `"PowerShell(gh *)"` |

### 파일 시스템
| 도구 | 용도 | 권한 예시 |
|---|---|---|
| `Read` | 파일 읽기 | `"Read"`, `"Read(//d/03.project-hub/**)"` |
| `Edit` | 파일 부분 수정 | `"Edit"`, `"Edit(.claude)"` |
| `Write` | 파일 전체 작성 | `"Write"`, `"Write(/tmp/*)"` |
| `NotebookEdit` | Jupyter 노트북 편집 | `"NotebookEdit"` |
| `Glob` | 파일 패턴 검색 | `"Glob"` |
| `Grep` | 코드 검색 | `"Grep"` |

### 웹
| 도구 | 용도 | 권한 예시 |
|---|---|---|
| `WebSearch` | 웹 검색 | `"WebSearch"` |
| `WebFetch` | URL 콘텐츠 가져오기 | `"WebFetch"`, `"WebFetch(domain:github.com)"` |

### 작업 관리·확장
| 도구 | 용도 | 권한 예시 |
|---|---|---|
| `TodoWrite` | 할 일 목록 관리 | `"TodoWrite"` |
| `Agent` | 서브에이전트 호출 | `"Agent"` |
| `Skill` | 스킬 호출 | `"Skill"`, `"Skill(update-config)"`, `"Skill(update-config:*)"` |
| `Task` | 서브에이전트 작업 (구버전) | `"Task"` |

### MCP 도구
형식: `mcp__{서버명}__{툴명}`

| 권한 예시 | 의미 |
|---|---|
| `"mcp__claude_ai_Gmail__*"` | Gmail MCP 모든 도구 허용 |
| `"mcp__claude_ai_Atlassian__authenticate"` | 특정 도구만 허용 |

---

## 추가 설정 옵션

### defaultMode (전체 기본 동작)
```json
{ "permissions": { "defaultMode": "default" } }
```
- `default` — 매번 프롬프트 (기본값)
- `acceptEdits` — Edit/Write 자동 승인
- `dontAsk` — 모든 도구 자동 승인 (위험, 개인 PC에서만)
- `bypassPermissions` — 권한 시스템 무시
- `plan` — 계획만 세우고 실행 안 함

### additionalDirectories (작업 디렉토리 확장)
```json
{
  "permissions": {
    "additionalDirectories": [
      "D:\\03.project-hub",
      "C:\\Users\\Administrator\\AppData\\Local\\Temp"
    ]
  }
}
```

---

## 적용 시점

- 신규 세션 시작 시 자동 반영
- 현재 세션에서 즉시 반영 안 되는 경우 Claude Code 재시작 필요

---

## 확인 방법

설정 파일에 추가한 권한이 잘 적용되는지는 `/permissions` 슬래시 명령으로 현재 적용된 권한 목록을 확인할 수 있다.

---

## 권장 패턴

| 상황 | 권장 설정 위치 |
|---|---|
| Windows에서 PowerShell 항상 사용 | 전역 (`~/.claude/settings.json`) |
| 팀이 공유하는 Bash 명령 (예: `npm test`) | 프로젝트 공용 (`.claude/settings.json`) |
| 개인적으로 자주 쓰는 명령 | 프로젝트 로컬 (`.claude/settings.local.json`) |
| 위험한 명령 (`rm -rf`, `git push --force`) | `deny`에 추가 |

---

## 현재 project-hub 환경 적용 현황

- **전역 (`~/.claude/settings.json`)**
  - `PowerShell` 전체 자동 승인 (2026-05-07 적용)
  - `Bash(...)` 다수 패턴 자동 승인 (git, gh, pytest, 프로젝트별 .venv python 등)
  - `Read`, `WebSearch`, `Skill(update-config)` 등 도구별 부분 허용
