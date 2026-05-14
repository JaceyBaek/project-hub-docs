<!--
sidebar_title: 신규 MCP 서버 만들기
sidebar_order: 3
-->

# 신규 MCP 서버 만들기

> 이 가이드는 e-Accounting 외 다른 도메인(HR·매출·물류 등)을 위한 **신규 MCP 서버 프로젝트**를 처음부터 끝까지 만드는 절차를 정리합니다.
> reference: `projects/eacct_mcp` (P2605081)

---

## 목차

1. [개요](#1-개요)
2. [사전 요구사항](#2-사전-요구사항)
3. [1단계: 프로젝트 생성](#3-1단계-프로젝트-생성)
4. [2단계: 폴더·파일 구조](#4-2단계-폴더파일-구조)
5. [3단계: 가상환경 + 의존성 설치](#5-3단계-가상환경--의존성-설치)
6. [4단계: 환경변수·시크릿 등록](#6-4단계-환경변수시크릿-등록)
7. [5단계: DB 연결 모듈](#7-5단계-db-연결-모듈)
8. [6단계: 도메인 도구 작성](#8-6단계-도메인-도구-작성)
9. [7단계: 라우터 통합 (mcp_platform.router)](#9-7단계-라우터-통합-mcp_platformrouter)
10. [8단계: 서버 본체 작성](#10-8단계-서버-본체-작성)
11. [9단계: 서버 실행 + 검증](#11-9단계-서버-실행--검증)
12. [10단계: 클라이언트 연결](#12-10단계-클라이언트-연결)
13. [부록 — 도구 추가·디버깅·트러블슈팅](#13-부록--도구-추가디버깅트러블슈팅)

---

## 1. 개요

### 신규 MCP 서버가 필요한 경우

- **새 도메인 데이터를 AI 챗봇/Claude Desktop이 조회·분석**해야 할 때 (예: HR 인사정보, 매출 데이터, 물류 정보, 결제 내역 등)
- 기존 시스템(e-Acct·ERP·HR 등)의 **DB·API를 자연어 인터페이스로 노출**하고 싶을 때
- Miso/Claude 양쪽에서 **동일 도구 인터페이스**로 동일 데이터에 접근하고 싶을 때

### 결과물 구조 (예: hr_mcp 가정)

```
hr_mcp 서버 (mcp_platform 기반)
    │
    ├── stdio   ── Claude Desktop (MCP 프로토콜)
    ├── REST    ── 챗봇·Miso (HTTP /tools/{name})
    │
    ▼
도메인 tool 다수 (@tool 데코레이터로 등록)
    │
    ▼
회사 DB (DBSafer·직접 연결 등)
```

### 재사용 가능한 플랫폼 구성요소

| 컴포넌트 | 역할 | 위치 |
|---|---|---|
| `mcp_platform` | MCP 서버 뼈대(stdio+REST 동시 지원, @tool 데코레이터) **+ 라우터 엔진(router 서브패키지)** | `platform/plugins/mcp_platform/` |
| `secrets_loader` | keyring → 환경변수 주입 | `platform/plugins/secrets_loader/` |

이 가이드는 위 2개를 모두 활용하는 것을 전제로 합니다. (라우터는 mcp_platform v0.2.0에 통합되어 별도 설치 불필요)

---

## 2. 사전 요구사항

| 항목 | 버전 | 확인 |
|---|---|---|
| Python | 3.10 이상 | `python --version` |
| Git | 최신 | `git --version` |
| project-hub 셋업 완료 | — | `platform/config/personal.yml` 존재 |
| `PLUGINS_PATH` 환경변수 | personal.yml의 `paths.plugins` 자동 적용 | `echo $env:PLUGINS_PATH` |
| 플러그인 2종 설치 완료 | mcp_platform·secrets_loader | `pip list | findstr mcp` |

플러그인이 미설치 상태면:

```powershell
pip install -e $env:PLUGINS_PATH\mcp_platform   # router 서브패키지 자동 포함
pip install -e $env:PLUGINS_PATH\secrets_loader
```

---

## 3. 1단계: 프로젝트 생성

기존 project-hub 프로젝트 생성 절차를 따릅니다. 상세는 `platform/project/project_creation.md` 참조.

요약 절차:

1. **프로젝트 코드 발급** — `PROJECTS_GLOBAL.md` 진행중 섹션에 한 줄 추가 (예: `P2606010 | hr_mcp | HR MCP 서버 | 진행중 | 시작일 2026-06-01`)
2. **폴더 생성** — `projects/hr_mcp/`
3. **표준 하위 폴더** — `source/` · `_manage/` · `docs/` · `refs/` · `archive/`
4. **각 _manage 파일 초기화** — `history/`·`todo.md`·`issues.md`·`meetings/`·`decisions.md`·`changelog.md`
5. **`.gitignore`** — `.venv/`·`__pycache__/`·`.env`·`*.pyc` 포함

> 비서(아이다)에게 "hr_mcp 프로젝트 생성해줘"라고 하면 위 절차를 자동으로 실행합니다.

---

## 4. 2단계: 폴더·파일 구조

신규 MCP 서버의 권장 폴더 구조:

```
projects/hr_mcp/
├── CLAUDE.md                    # 프로젝트 메타·아키텍처·실행 방법
├── requirements.txt             # python-dotenv, pymysql/oracledb, keyring 등
├── .gitignore
├── source/
│   ├── server.py                # FastAPI(REST) + MCP(stdio) 엔트리포인트
│   ├── db.py                    # DB 연결 모듈 (필요 시)
│   ├── .env.example             # 환경변수 템플릿
│   ├── .env                     # 로컬 환경변수 (gitignored)
│   └── tools/
│       ├── __init__.py          # 도구 import 등록
│       ├── 도메인1.py           # @tool 함수들 (예: hr/employees.py)
│       ├── 도메인2.py           # 예: hr/leave.py
│       ├── router.py            # mcp_platform.router 등록 + @tool route_intent
│       ├── router_domains.yml   # 도메인 정의 YAML
│       ├── extractors_xxx.py    # 도메인 특화 추출기 (없으면 생략)
│       └── router_selectors.py  # 도메인 특화 selector (없으면 생략)
├── _manage/
│   ├── history/
│   ├── todo.md
│   ├── issues.md
│   ├── meetings/
│   ├── decisions.md
│   └── changelog.md
├── docs/
└── refs/
```

> `tools/` 하위는 도메인 단위로 자유롭게 묶을 수 있습니다 (eacct_mcp는 `taxbill.py`·`slip.py`·`commcode.py`로 분리). 도구 N개를 한 파일에 모아도 되고, 도메인별 서브폴더로 나눠도 됩니다.

---

## 5. 3단계: 가상환경 + 의존성 설치

### 5-1. venv 생성

```powershell
cd projects/hr_mcp
python -m venv .venv
.\.venv\Scripts\activate
```

### 5-2. requirements.txt 작성

```text
# mcp_platform, secrets_loader는 platform/plugins/에서 editable 설치
#   (pip install -e $env:PLUGINS_PATH\xxx)
# mcp_platform이 pyyaml을 의존성으로 가져옴 (router 서브패키지용)

python-dotenv
pymysql       # 또는 oracledb / psycopg2 등 사용 DB 드라이버
keyring
```

### 5-3. 패키지 설치

```powershell
# 1) 플랫폼 플러그인 (editable) — mcp_platform이 router 서브패키지·pyyaml 동반
pip install -e $env:PLUGINS_PATH\mcp_platform
pip install -e $env:PLUGINS_PATH\secrets_loader

# 2) 프로젝트 의존성
pip install -r requirements.txt
```

설치 확인:

```powershell
pip list | findstr /R "mcp pyyaml"
# mcp-platform   0.2.0
# pyyaml         6.0.x
```

---

## 6. 4단계: 환경변수·시크릿 등록

### 6-1. `.env.example` 작성 (비시크릿만)

```ini
# 비시크릿 — 이 파일에 직접 입력
DB_HOST=hr-db.intra.gsretail.com
DB_PORT=3306
DB_NAME=hr
DB_USER=hr_reader

# 시크릿 — keyring에 등록 (이 파일에 두지 않음)
# Windows:
#   platform\scripts\credentials\set_credential.ps1 set hr_mcp db_password
# Mac/Linux:
#   platform/scripts/credentials/set_credential.sh  set hr_mcp db_password
```

`.env.example`을 `.env`로 복사해 비시크릿 값 입력. `.env`는 `.gitignore`에 포함.

### 6-2. 시크릿을 keyring에 등록

```powershell
# Windows
platform\scripts\credentials\set_credential.ps1 set hr_mcp db_password
# → 비밀번호 입력 프롬프트
```

> 시크릿 정책 상세: `platform/setup/secrets_guide.md` / `platform/plugins/secrets_loader/CLAUDE.md`
> **시스템 환경변수·.env 평문 저장 금지** (CLAUDE.md 10번 정책)

---

## 7. 5단계: DB 연결 모듈

DB 연동이 필요한 경우만. 단순 API 래핑이면 건너뜁니다.

### 7-1. `source/db.py` 예시 (MySQL/MariaDB)

```python
"""HR DB 연결 모듈."""
import os
from contextlib import contextmanager

import pymysql
from pymysql.cursors import DictCursor


@contextmanager
def get_connection():
    """HR DB 연결 컨텍스트 매니저.

    사용 패턴:
        with get_connection() as conn, conn.cursor() as cur:
            cur.execute("SELECT ...")
            rows = cur.fetchall()
    """
    conn = pymysql.connect(
        host=os.environ["DB_HOST"],
        port=int(os.environ.get("DB_PORT", 3306)),
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_NAME"],
        charset="utf8mb4",
        cursorclass=DictCursor,
        autocommit=True,
    )
    try:
        yield conn
    finally:
        conn.close()
```

> DBSafer 경유나 Oracle 등 다른 DB는 connection 부분만 교체. 인터페이스(`with get_connection() as conn:`)는 동일하게 유지하는 것을 권장.

---

## 8. 6단계: 도메인 도구 작성

`source/tools/` 하위에 도메인별 모듈 작성. 각 도구는 `@tool` 데코레이터로 등록합니다.

### 8-1. 도구 모듈 예시 (`source/tools/employees.py`)

```python
"""사원 조회 도구."""

from mcp_platform import tool
from db import get_connection


@tool
def search_employees(
    name: str = "",
    dept_cd: str = "",
    in_service_only: bool = True,
    limit: int = 50,
) -> dict:
    """사원 검색 — 이름·부서·재직여부 조건.

    [Examples]
      - "홍길동 사원 정보" → name="홍길동"
      - "재무팀 사원 목록" → dept_cd="FIN", in_service_only=True
      - "퇴직자 포함 전체 사원" → in_service_only=False

    [Not for]
      - 급여 조회 → search_payroll
      - 휴가 현황 → search_leave

    Args:
        name: 이름 부분 일치.
        dept_cd: 부서 코드.
        in_service_only: True면 재직자만 (기본). False면 전체.
        limit: 최대 반환 건수 (기본 50, 최대 200).
    """
    limit = max(1, min(limit, 200))
    where = ["1=1"]
    params: list = []

    if name:
        where.append("emp_name LIKE %s")
        params.append(f"%{name}%")
    if dept_cd:
        where.append("dept_cd = %s")
        params.append(dept_cd)
    if in_service_only:
        where.append("status = 'IN_SERVICE'")

    sql = (
        "SELECT emp_no, emp_name, dept_cd, dept_name, position, status "
        "FROM employees WHERE " + " AND ".join(where) +
        " ORDER BY emp_no DESC LIMIT %s"
    )
    with get_connection() as conn, conn.cursor() as cur:
        cur.execute(sql, tuple(params) + (limit,))
        rows = cur.fetchall()

    return {"count": len(rows), "items": rows}
```

### 8-2. docstring 작성 규칙 (라우터 정합도 핵심)

| 섹션 | 역할 |
|---|---|
| 첫 줄 | 도구 한 줄 요약 (LLM 라우터가 가장 중시) |
| **[Examples]** | 자연어 질문 → 인자 매핑 예시 2~5개 |
| **[Not for]** | 이 도구로 처리하면 안 되는 케이스 + 대안 도구 명시 |
| `Args:` | 인자 설명 (default·범위·형식) |

도구 description은 챗봇이 라우터 LLM에게 매번 전달하므로 **Examples/Not for를 충실히 적을수록 라우팅 정확도가 올라갑니다**.

### 8-3. `source/tools/__init__.py` 에 등록

```python
from .employees import search_employees  # noqa: F401
from .leave import search_leave           # noqa: F401
# ... 도구가 늘어나면 한 줄씩 추가
```

---

## 9. 7단계: 라우터 통합 (mcp_platform.router)

도구가 5개 이상이거나 자연어 라우팅 품질이 중요한 경우 `mcp_platform.router`를 통합합니다. 도구가 1~3개면 생략 가능 (LLM이 직접 선택).

### 9-1. `source/tools/router_domains.yml` 작성

```yaml
domains:
  employee:
    pos:
      - 사원
      - 직원
      - 인사정보
      - 사번
    neg:
      - 급여
      - 휴가
    weight: 1.0
    extractors: [date_range, top_n, emp_no, dept_cd]
    default_tool: search_employees
    param_map:
      top_n: limit

  leave:
    pos:
      - 휴가
      - 연차
      - 잔여
    neg: []
    weight: 1.0
    extractors: [date_range, top_n, emp_no]
    default_tool: search_leave
    param_map:
      date_from: from_date
      date_to:   to_date
      top_n:     limit

  payroll:
    pos:
      - 급여
      - 월급
      - 상여
    neg: [휴가]
    weight: 1.0
    extractors: [date_range, top_n, emp_no]
    default_tool: search_payroll
    param_map:
      date_from: pay_from
      date_to:   pay_to
```

YAML 필드 의미:

| 필드 | 의미 |
|---|---|
| `pos` | 도메인 매칭 긍정 키워드 |
| `neg` | 거부 키워드 (1개당 pos 2개 페널티) |
| `weight` | 다중 매칭 시 가중치 (기본 1.0) |
| `extractors` | 이 도메인에서 호출할 추출기 이름 리스트 (Router에 등록된 키) |
| `default_tool` | selector 없을 때 기본 호출 도구 |
| `selector` | (선택) `router_selectors.py`의 함수명 — 도구 선택이 갈리는 경우 |
| `param_map` | extractor 출력 키 → 도구 파라미터 키 매핑 |

### 9-2. 도메인 특화 extractor (`source/tools/extractors_hr.py`)

공용 추출기로 부족할 때만 작성.

```python
"""hr_mcp 특화 추출 함수."""
import re

_RE_EMP_NO = re.compile(r"\b[A-Z]?\d{6,8}\b")


def extract_emp_no(q: str) -> dict:
    """사번 패턴 (6~8자리 숫자, 선택적 영문 prefix)."""
    m = _RE_EMP_NO.search(q)
    return {"emp_no": m.group()} if m else {}


def extract_dept_cd(q: str) -> dict:
    """부서 코드 — 사내 부서명 사전 기반 매칭."""
    table = {"재무팀": "FIN", "인사팀": "HR", "IT팀": "IT"}
    for name, code in table.items():
        if name in q:
            return {"dept_cd": code}
    return {}


HR_EXTRACTORS = {
    "emp_no":  extract_emp_no,
    "dept_cd": extract_dept_cd,
}
```

### 9-3. 도메인 특화 selector (`source/tools/router_selectors.py`)

도구 선택이 도메인 안에서 갈리는 경우만 작성. 단일 도구 도메인은 생략.

```python
"""hr_mcp 특화 selector."""


def leave_selector(q: str, extracted: dict) -> tuple[str | None, dict]:
    """휴가 도메인 — 신청/잔여/이력 구분."""
    if "잔여" in q or "남은" in q:
        return "get_leave_balance", {"emp_no": extracted.get("emp_no")}
    if "신청" in q:
        return "list_leave_requests", {}
    return "search_leave", extracted


SELECTORS = {
    "leave_selector": leave_selector,
}
```

### 9-4. `source/tools/router.py` — Router 인스턴스 + @tool 노출

```python
"""hr_mcp 라우터 — mcp_platform.router 등록 + @tool route_intent 노출."""

from pathlib import Path
import re

from mcp_platform import tool
from mcp_platform.router import Router
from mcp_platform.router.extractors_common import COMMON_EXTRACTORS, RE_CODE_GROUP_ID, extract_approval_no

from tools.extractors_hr import HR_EXTRACTORS
from tools.router_selectors import SELECTORS


_DOMAINS_YML = Path(__file__).parent / "router_domains.yml"
_router = Router.from_yaml(_DOMAINS_YML)

# 공용 + 도메인 특화 extractor 등록
_router.register_extractors(COMMON_EXTRACTORS)
_router.register_extractors(HR_EXTRACTORS)

# selector 등록
for name, fn in SELECTORS.items():
    _router.register_selector(name, fn)


# ── 비즈니스 강분기 hook (필요 시) ─────────────────────────────

def _emp_no_pre_hook(q: str) -> dict | None:
    """사번 단독 입력 시 사원 정보 즉시 조회."""
    m = re.fullmatch(r"\s*([A-Z]?\d{6,8})\s*", q)
    if m:
        return {
            "tool": "search_employees",
            "params": {"emp_no": m.group(1)},
            "domain": "employee",
            "reason": "사번 단독 입력 — 사원 정보 즉시 조회",
        }
    return None


_router.register_pre_hook(_emp_no_pre_hook)


# ── MCP 도구 노출 ──────────────────────────────────────────────

@tool
def route_intent(query: str) -> dict:
    """사용자 질문의 의도를 분석해 호출할 도구명과 파라미터를 반환합니다.

    needs_llm_fallback=true인 경우, 룰 결과를 폐기하고 LLM 라우터로 재시도 권장.

    Args:
        query: 사용자의 자연어 질문 원문.

    Returns:
        tool 확정 시: {"tool": "...", "params": {...}, "domain": "...", "needs_llm_fallback": bool}
        불명확 시:   {"tool": null, "candidates": [...], "scores": {...}}
    """
    return _router.route(query)
```

### 9-5. `source/tools/__init__.py`에 route_intent 추가

```python
from .employees import search_employees  # noqa: F401
from .leave import search_leave           # noqa: F401
from .payroll import search_payroll       # noqa: F401
from .router import route_intent          # noqa: F401
```

> 라우터에 대한 상세 규칙(register API·hook·param_map)은 `platform/plugins/mcp_platform/CLAUDE.md` 참조.

---

## 10. 8단계: 서버 본체 작성

mcp_platform의 BaseMcpServer를 상속해 stdio + REST 동시 지원 서버 생성.

### 10-1. `source/server.py` — stdio + REST 양쪽 지원

```python
"""hr_mcp 서버 — stdio (Claude Desktop) + REST (챗봇/Miso) 동시 지원."""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv

# 1) 비시크릿 .env 로드
load_dotenv(Path(__file__).parent / ".env", override=True)

# 2) keyring에서 시크릿 주입 (secrets_loader)
from secrets_loader import inject_secrets  # noqa: E402
inject_secrets("hr_mcp", {
    "db_password": "DB_PASSWORD",
})

# 3) tools/ 패키지 import — @tool 데코레이터가 BaseMcpServer에 등록됨
sys.path.insert(0, str(Path(__file__).parent))
import tools  # noqa: F401, E402

from mcp_platform import BaseMcpServer  # noqa: E402


server = BaseMcpServer(name="hr_mcp", version="0.1.0")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "stdio"
    if mode == "rest":
        # REST 모드 — 챗봇·Miso용 (기본 0.0.0.0:8000)
        host = os.environ.get("MCP_HOST", "0.0.0.0")
        port = int(os.environ.get("MCP_PORT", 8000))
        server.run_rest(host=host, port=port)
    else:
        # stdio 모드 — Claude Desktop용
        server.run_stdio()
```

> 환경변수 `MCP_HOST`·`MCP_PORT`로 REST 바인딩 변경 가능. 운영에서는 `127.0.0.1` + 리버스 프록시 또는 사내망 IP로 좁히세요.

---

## 11. 9단계: 서버 실행 + 검증

### 11-1. REST 모드로 실행

```powershell
cd projects/hr_mcp
.\.venv\Scripts\activate
python source/server.py rest
# → http://localhost:8000
```

### 11-2. 도구 목록 확인

```powershell
# Windows PowerShell
curl http://localhost:8000/tools
# 또는
Invoke-RestMethod http://localhost:8000/tools | ConvertTo-Json -Depth 5
```

응답 예:

```json
[
  {"name": "search_employees", "description": "사원 검색...", "input_schema": {...}},
  {"name": "search_leave", "description": "...", "input_schema": {...}},
  {"name": "route_intent", "description": "사용자 질문 의도 분석...", "input_schema": {...}}
]
```

### 11-3. 도구 단건 호출 테스트

```powershell
# search_employees 직접 호출
$body = @{name="홍길동"} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:8000/tools/search_employees -Body $body -ContentType "application/json"

# route_intent로 라우팅 테스트
$body = @{query="재무팀 사원 목록 보여줘"} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:8000/tools/route_intent -Body $body -ContentType "application/json"
```

### 11-4. 회귀 테스트 스크립트 (권장)

`source/tests/test_router.py`에 테스트 케이스를 정의해두면, 추후 도구 추가 시 회귀를 빠르게 확인할 수 있습니다.

```python
import sys
sys.path.insert(0, "source")

from tools.router import route_intent

CASES = [
    ("홍길동 사원 정보", "search_employees", {"name": "홍길동"}),
    ("12345678", "search_employees", {"emp_no": "12345678"}),   # pre_hook
    ("재무팀 사원 목록", "search_employees", {"dept_cd": "FIN"}),
    ("2024년 1분기 휴가 신청 내역", "list_leave_requests", {"from_date": "2024-01-01", "to_date": "2024-03-31"}),
]

for q, expected_tool, expected_params_subset in CASES:
    r = route_intent(q)
    assert r["tool"] == expected_tool, f"FAIL: {q} → {r['tool']} (expected {expected_tool})"
    for k, v in expected_params_subset.items():
        assert r["params"].get(k) == v, f"FAIL: {q} → params[{k}]={r['params'].get(k)} (expected {v})"
    print(f"OK: {q}")
```

---

## 12. 10단계: 클라이언트 연결

### 12-1. Claude Desktop 연결 (stdio)

Claude Desktop의 `claude_desktop_config.json`에 추가:

```json
{
  "mcpServers": {
    "hr-mcp": {
      "command": "<HUB_ROOT>\\projects\\hr_mcp\\.venv\\Scripts\\python.exe",
      "args": ["<HUB_ROOT>\\projects\\hr_mcp\\source\\server.py"]
    }
  }
}
```

> `<HUB_ROOT>`는 실제 경로로 치환. `platform/setup/mcp_registration.md`에 자동 등록 스크립트가 있다면 그것을 사용하세요.

Claude Desktop 재시작 후 설정 > 개발자에서 `hr-mcp` running 상태 확인.

### 12-2. 챗봇·Miso 연결 (REST)

별도 챗봇 프로젝트(예: `hr_chatbot`)에서 환경변수로 MCP REST 주소 지정:

```ini
HR_MCP_BASE_URL=http://localhost:8000
```

챗봇 측 mcp_client(예: `eacct_chatbot`의 `mcp_client.py` 패턴)가 `GET /tools`로 목록 캐시 후 `POST /tools/{name}`으로 호출.

### 12-3. 미소(Dify) 연결

미소 콘솔에서 Custom Tool 또는 Workflow의 HTTP 노드로 `POST /tools/{name}` 엔드포인트 등록. 라우팅이 필요한 경우 별도 라우터 앱을 만들어 `route_intent`를 먼저 호출하는 워크플로 구성.

> MCP-Miso 연동 상세: `platform/plugins/mcp_platform/miso_integration_guide.md`

---

## 13. 부록 — 도구 추가·디버깅·트러블슈팅

### 13-1. 새 도구 추가 절차

1. `source/tools/`에 모듈 생성 또는 기존 모듈에 함수 추가
2. `@tool` 데코레이터 적용 + docstring에 Examples/Not for 작성
3. `source/tools/__init__.py`에 import 한 줄 추가
4. **(라우팅 적용 시)** `router_domains.yml`에 도메인·키워드 추가
5. 필요 시 `extractors_xxx.py` / `router_selectors.py`에 특화 로직 추가
6. 테스트 케이스 보강 후 회귀 검증
7. 서버 재기동 (REST·stdio 모두)

> stdio 모드는 Claude Desktop이 매번 새로 실행하므로 별도 재기동 불필요. REST는 재기동 필요.

### 13-2. 새 도메인 추가 절차 (라우터 적용 서버 기준)

1. `router_domains.yml`에 도메인 항목 추가 (pos·neg·extractors·default_tool 등)
2. 도메인 특화 extractor가 필요하면 `extractors_xxx.py` + 등록 dict 갱신
3. selector가 필요하면 `router_selectors.py` + SELECTORS dict 갱신
4. 회귀 테스트
5. 챗봇 측에는 코드 수정 없음 (도구 목록은 동적으로 가져감)

### 13-3. 디버깅 팁

| 증상 | 확인 |
|---|---|
| `mcp_tools=0` 또는 도구가 안 보임 | `tools/__init__.py`에 import 누락 / `@tool` 데코레이터 누락 |
| route_intent가 항상 `tool: null` | `router_domains.yml`의 pos 키워드 매칭 안 됨 / scores 응답으로 점수 확인 |
| LLM fallback이 자주 발생 | `needs_llm_fallback=true`의 `fallback_reason` 확인 → 보통 시간 표현 추출 실패 |
| `_apply_param_map`이 동작 안 함 | selector가 있는 도메인은 yml의 param_map 무시됨 (selector가 직접 매핑) |
| 한글 인코딩 깨짐 | `PYTHONIOENCODING=utf-8` 환경변수 설정 (Windows cp949 이슈) |

### 13-4. 자주 만나는 에러

**`ModuleNotFoundError: No module named 'mcp_platform'`**
→ editable 설치 누락. `pip install -e $env:PLUGINS_PATH\mcp_platform`

**`ModuleNotFoundError: No module named 'mcp_platform.router'`**
→ mcp_platform이 v0.1.x 구버전. `pip install -e $env:PLUGINS_PATH\mcp_platform`로 재설치 (v0.2.0+에 router 포함)

**`MissingSecretError: hr_mcp.db_password`**
→ keyring 미등록. `platform\scripts\credentials\set_credential.ps1 set hr_mcp db_password` 실행

**`pymysql.err.OperationalError: (2003, "Can't connect ...")`**
→ DB 접근 가능 IP·방화벽 / DBSafer 세션 / VPN 연결 확인

**REST 호출에 `route_intent() missing 1 required positional argument: 'query'`**
→ 호출 body가 비어있음. 한글 직접 입력 시 cmd 인코딩 이슈. 챗봇은 httpx로 json 전송 → 정상 동작

### 13-5. 운영 체크리스트

| 항목 | 체크 |
|---|---|
| `.env` git ignore 확인 | □ |
| 시크릿 keyring 등록 (코드/설정에 평문 없음) | □ |
| REST 바인딩 IP 범위 제한 (운영) | □ |
| DB 계정은 읽기 전용 권한 (조회 도구만 있는 경우) | □ |
| 회귀 테스트 케이스 ≥ 10건 | □ |
| 도구 docstring에 Examples / Not for 작성 | □ |
| README에 실행 방법·환경변수 명시 (CLAUDE.md) | □ |
| 시작/종료 systemd·NSSM 등 자동화 | □ (운영) |

---

## 관련 문서

- **mcp_platform**: `platform/plugins/mcp_platform/CLAUDE.md` — MCP 서버 뼈대
- **mcp_platform.router**: `platform/plugins/mcp_platform/CLAUDE.md` — 라우팅 엔진 API (v0.2.0에 통합)
- **secrets_loader**: `platform/plugins/secrets_loader/CLAUDE.md` — 시크릿 정책
- **시크릿 정책**: `platform/setup/secrets_guide.md`
- **프로젝트 생성**: `platform/project/project_creation.md`
- **MCP-Miso 연동**: `platform/plugins/mcp_platform/miso_integration_guide.md`
- **reference 사용처**: `projects/eacct_mcp/` (P2605081) — 회계 도메인 적용 예시
