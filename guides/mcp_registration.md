# MCP 등록 절차

> **적용 시점:** `진행중 → 운영중` 전환 결정 시 반드시 먼저 확인.
>
> MCP 서버 구축 방법은 `guides/mcp_server_setup.md` 참조.

---

## 등록 여부 확인

{assistant}가 먼저 확인:
> "이 프로젝트를 Claude MCP 서버로 등록하시겠어요?"

- **등록 안 함** → 바로 운영중 전환 진행
- **등록** → 아래 절차 실행 후 운영중 전환

---

## 정보 수집 (1개씩 순서대로)

1. **MCP 서버 이름** — Claude에서 호출할 이름 (예: `google_drive_backup`)
2. **전송 방식** — `stdio` / `sse` 중 선택
   - stdio: 로컬 실행 프로세스 (파이썬 스크립트 등)
   - sse: HTTP 엔드포인트 (서버 URL 필요)
3. **실행 명령** — stdio 선택 시: 명령어 + 인수 (예: `python source/src/server.py`)
   / sse 선택 시: 서버 URL (예: `http://localhost:8000/sse`)
4. **추가 환경변수** — 필요 시 수집, 없으면 skip

---

## 등록 실행

```bash
# stdio 방식
claude mcp add {서버이름} -s user -- {명령어} {인수}

# sse 방식
claude mcp add {서버이름} --transport sse -s user -- {서버URL}
```

- 환경변수가 있는 경우 `-e KEY=VALUE` 플래그 추가
- 등록 후 `claude mcp list` 로 확인

---

## 등록 정보 기록

등록 완료 후 프로젝트 `CLAUDE.md` 하단에 추가:

```markdown
## MCP 등록 정보
- 서버 이름: {서버이름}
- 전송 방식: stdio | sse
- 실행 명령: {명령}
- 노출 tool: `tool_name_1`, `tool_name_2`, ...
- 등록일: YYYY-MM-DD
```
