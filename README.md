# project-hub

> **AI 비서와 함께 일하는 개발자를 위한 프로젝트 라이프사이클·플러그인 통합 플랫폼**

프로젝트 생성부터 운영·서비스 종료까지의 라이프사이클을 표준화하고, 사내 시스템 연동·시크릿 관리·산출물 변환 같은 공통 인프라를 한곳에 모은 **개발자 플랫폼**입니다. AI 비서 **{assistant}** 와의 협업을 1급 시민으로 두어, 멀티 에이전트 협업·세션 컨텍스트·트리거 자동화까지 내장합니다.

## 핵심 특징

- **라이프사이클 자동화** — 프로젝트 생성·상태 전환·히스토리·세션 마무리를 트리거 명령으로
- **플러그인 확장** — `mcp_platform`·`atlassian_client`·`miso_client`·`secrets_loader` 등 pip-installable 공통 라이브러리
- **AI 비서 협업 인프라** — CLAUDE.md 규칙·메모리·`platform/processes/collab/` 워크플로우로 멀티 에이전트({assistant} ↔ Codex) 컨텍스트 유지
- **사내 시스템 연동 표준** — Confluence/Jira·Miso AI·MCP·Microsoft 365
- **보안 표준** — keyring 일원화 + `secrets_loader` 진입점 어댑터, 평문 `.env`·시스템 환경변수 금지
- **산출물 관리** — 단계별(`01_plan` → `02_design` → ...) HTML 산출물 + 웹뷰 + RAG 변환

---

## 시작하기

### 1단계 — hub 내려받기

**원본 hub 사용 (기본)**
```bash
git clone https://github.com/gsr-ax/project-hub.git
cd project-hub
```
팀 공용 저장소(`gsr-ax/project-hub`)에 프로젝트를 직접 push해서 사용합니다.

**개인 GitHub 사용 (fork)**
1. GitHub에서 `gsr-ax/project-hub` Fork
2. Fork된 본인 repo를 clone
   ```bash
   git clone https://github.com/{본인계정}/project-hub.git
   cd project-hub
   ```
3. `platform/config/hub_config.yml` 에서 `owner`, `repo` 입력
4. 원본 hub 업데이트를 받으려면 upstream 등록 (최초 1회)
   ```bash
   git remote add upstream https://github.com/gsr-ax/project-hub.git
   ```

---

### 2단계 — 환경 설정

`platform/config/hub_config.yml` 에서 알림 채널 설정:
```yaml
notifications:
  email:
    enabled: true       # GitHub Watch 기반 이메일
  teams:
    enabled: false      # Teams Webhook (Secrets 등록 필요)
```

Teams 알림 사용 시 GitHub Secrets에 `TEAMS_WEBHOOK_URL` 등록.

---

### 3단계 — 프로젝트 생성

```bash
python platform/init_project.py
```

입력 항목:
- 프로젝트명
- 한 줄 설명
- 담당자명
- Confluence 루트 페이지 ID

실행 후 `projects/{프로젝트명}/` 폴더가 자동 생성됩니다.

---

## 폴더 구조

```
project-hub/
├── CLAUDE.md                    ← {assistant} AI 비서 설정
├── projects/                    ← 개인 프로젝트
├── apps/                        ← 팀 공용 앱
├── platform/                    ← 플랫폼 엔진 전체
│   ├── config/                  ← 알림·GitHub 설정
│   ├── plugins/                 ← 연결 도구 (atlassian_client, miso_client)
│   ├── templates/               ← 산출물·관리 파일 템플릿
│   ├── tools/                   ← RAG 빌더 등
│   ├── scripts/                 ← 유틸리티 스크립트
│   │   ├── webview/             ← 웹뷰 생성·동기화
│   │   └── manage/              ← 위키 동기화·배포 기록
│   ├── project/                 ← 프로젝트 관리 지침
│   ├── setup/                   ← 플랫폼 설정·연결 지침
│   ├── guides/                  ← 설정 가이드
│   ├── history/                 ← 글로벌 히스토리
│   ├── services/
│   │   ├── mcp/                 ← 중앙 MCP 서버
│   │   └── webview/             ← Docsify 웹뷰
│   ├── hub_init.py              ← 플랫폼 초기화
│   └── init_project.py          ← 프로젝트 생성·삭제
└── .github/
    └── workflows/
        └── notify_update.yml    ← 업데이트 알림
```

---

## 프로젝트 구조

`platform/init_project.py` 실행 시 아래 구조가 자동 생성됩니다:

```
projects/{프로젝트명}/
├── CLAUDE.md
├── docs/           ← 산출물 (로컬 전용)
├── refs/           ← 참고자료 (로컬 전용)
├── archive/        ← 구버전 (로컬 전용)
├── source/         ← 개발 프로젝트만
│   ├── src/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
└── _manage/
    ├── wiki_config.md
    ├── todo.md
    ├── issues.md
    ├── defects.md
    ├── deployments.md
    ├── decisions.md
    └── changelog.md
```

---

## hub 업데이트 반영

hub 영역(CLAUDE.md, templates 등)이 업데이트되면 이메일 또는 Teams로 알림이 발송됩니다.

**원본 hub 사용자**
```bash
git pull origin main
```

**fork 사용자**
```bash
# upstream 업데이트 반영
git fetch upstream
git merge upstream/main
```

---

## 유틸리티 스크립트

| 스크립트 | 용도 |
|---|---|
| `platform/scripts/manage/wiki_sync.py` | `_manage/` md 파일 → Confluence 동기화 |
| `platform/scripts/manage/deploy_record.py` | 배포 내역 기록 |
| `platform/setup/install_app.py` | apps/catalog.yml 기반 팀 공용 앱 설치·등록 |

---

## 주의사항

**hub 영역 파일은 직접 수정하지 마세요.**
`CLAUDE.md`, `platform/`, `.github/`
변경이 필요하면 원본 hub 관리자에게 요청하거나 PR을 제출하세요.
