# project-hub

AI 비서 **{hub_assistant}** 기반 프로젝트 관리 허브.
프로젝트 생성부터 산출물 관리, Wiki 동기화, 배포 기록까지 표준화된 구조를 제공합니다.

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
3. `config/hub_config.yml` 에서 `owner`, `repo` 입력
4. 원본 hub 업데이트를 받으려면 upstream 등록 (최초 1회)
   ```bash
   git remote add upstream https://github.com/gsr-ax/project-hub.git
   ```

---

### 2단계 — 환경 설정

`config/hub_config.yml` 에서 알림 채널 설정:
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
python init_project.py
```

입력 항목:
- 프로젝트명
- 유형 (일반/개발)
- 담당자명
- Confluence 루트 페이지 ID

실행 후 `projects/{프로젝트명}/` 폴더가 자동 생성됩니다.

---

## 폴더 구조

```
project-hub/
├── CLAUDE.md                    ← {hub_assistant} AI 비서 설정
├── init_project.py              ← 프로젝트 초기화
├── config/
│   └── hub_config.yml           ← 알림·GitHub 설정
├── templates/
│   ├── deliverables/            ← 산출물 템플릿
│   └── manage/                  ← 관리 파일 템플릿
├── guides/
│   └── scripts/                 ← 유틸리티 스크립트
├── .github/
│   ├── CODEOWNERS               ← hub 영역 보호
│   └── workflows/
│       └── notify_update.yml    ← 업데이트 알림
└── projects/                    ← 실제 프로젝트
    └── sample/                  ← 샘플 프로젝트
```

---

## 프로젝트 구조

`init_project.py` 실행 시 아래 구조가 자동 생성됩니다:

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
| `guides/scripts/wiki_sync.py` | `_manage/` md 파일 → Confluence 동기화 |
| `guides/scripts/deploy_record.py` | 배포 내역 기록 |

---

## 주의사항

**hub 영역 파일은 직접 수정하지 마세요.**
`CLAUDE.md`, `config/`, `templates/`, `guides/`, `init_project.py`, `.github/`
변경이 필요하면 원본 hub 관리자에게 요청하거나 PR을 제출하세요.
