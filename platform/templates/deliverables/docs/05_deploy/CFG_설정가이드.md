---
doc_id: "{PROJECT}-CFG-01"
doc_type: CFG
project: "{PROJECT}"
title: "설정가이드"
version: "0.1.0"
status: draft
phase: deploy
required: true
condition: ""
owner: ""
updated: ""
tags:
  - "#deploy"
  - "#configuration"
  - "#infrastructure"
confluence_path: ""
trace:
  up:
    - "{PROJECT}-ARC-01"    # 아키텍처에서 설정 필요 요소 파생
    - "{PROJECT}-SEC-01"    # 보안 설정 값 (조건부)
    - "{PROJECT}-DAT-01"    # DB 접속 정보 (조건부)
  down:
    - "{PROJECT}-OPM-01"    # 운영 매뉴얼에서 설정 값 참조
    - "{PROJECT}-RUN-01"    # Runbook에서 설정 변경 참조
    - "{PROJECT}-TRC-01"
ai_hints:
  - "설정 항목 ID: {PROJECT}-CFG-## (예: CFG-01)"
  - "시크릿(API Key·비밀번호·토큰)은 값 대신 keyring 등록 명령어 기술"
  - ".env.example 파일 내용과 동기화 유지"
ai_exclude: []
changelog:
  - version: "0.1.0"
    date: ""
    author: ""
    note: "최초 작성"
---

> **문서 ID** `{PROJECT}-CFG-01` · **단계** deploy · **필수** 필수
> **작성 가이드**: [`CFG-authoring-guide.md`](../../guides/CFG-authoring-guide.md)

---

## §1 개요

### 목적
<!-- 이 시스템 실행에 필요한 모든 설정 항목과 관리 방법 정의 -->

### 설정 파일 목록

| 파일명 | 위치 | 용도 | Git 관리 |
|--------|------|------|---------|
| `.env` | 프로젝트 루트 | 환경 변수 (비시크릿) | `.gitignore` 제외 |
| `.env.example` | 프로젝트 루트 | 설정 템플릿 | 포함 (커밋 대상) |
| `config.yml` | `config/` | 앱 설정 | 포함 |

> **시크릿 정책**: API Key·비밀번호·토큰은 `.env`에 평문 저장 금지.  
> `platform/setup/secrets_guide.md` 기준으로 keyring에만 저장.

---

## §2 환경 변수 목록

### 2.1 애플리케이션 설정

| 설정 항목 ID | 변수명 | 유형 | 필수 | 기본값 | 설명 |
|-----------|-------|------|------|-------|------|
| `{PROJECT}-CFG-01` | `APP_ENV` | string | Y | `development` | 실행 환경 (development/staging/production) |
| `{PROJECT}-CFG-02` | `APP_PORT` | integer | N | `8000` | 서비스 포트 |
| `{PROJECT}-CFG-03` | `LOG_LEVEL` | string | N | `INFO` | 로그 레벨 (DEBUG/INFO/WARN/ERROR) |

### 2.2 데이터베이스 설정 (해당 시)

| 설정 항목 ID | 변수명 | 유형 | 필수 | 기본값 | 설명 |
|-----------|-------|------|------|-------|------|
| `{PROJECT}-CFG-10` | `DB_HOST` | string | Y | `localhost` | DB 호스트 |
| `{PROJECT}-CFG-11` | `DB_PORT` | integer | Y | `5432` | DB 포트 |
| `{PROJECT}-CFG-12` | `DB_NAME` | string | Y | — | DB 이름 |
| `{PROJECT}-CFG-13` | `DB_USER` | string | Y | — | DB 사용자명 |

### 2.3 외부 서비스 설정 (해당 시)

| 설정 항목 ID | 변수명 | 유형 | 필수 | 설명 |
|-----------|-------|------|------|------|
| `{PROJECT}-CFG-20` | `<!-- 서비스명 -->_BASE_URL` | string | Y | <!-- 외부 서비스 Base URL --> |

---

## §3 시크릿 관리

> **시크릿 항목은 값을 기재하지 않습니다.** keyring 등록 명령어만 기술.

### 3.1 시크릿 목록

| 시크릿 ID | keyring 서비스명 | keyring 키명 | 용도 |
|---------|--------------|-----------|------|
| `{PROJECT}-SEC-01` | `{PROJECT}` | `<!-- key명 -->` | <!-- 용도 --> |

### 3.2 keyring 등록 방법

```bash
# 최초 설정 시 실행
python -c "import keyring; keyring.set_password('{PROJECT}', '<!-- key명 -->', '실제값입력')"

# 등록 확인
python -c "import keyring; print(keyring.get_password('{PROJECT}', '<!-- key명 -->'))"
```

### 3.3 코드에서 시크릿 로드

```python
from platform.plugins.secrets_loader import inject_secrets

inject_secrets("{PROJECT}", {
    "<!-- 환경변수명 -->": ("<!-- keyring 서비스 -->", "<!-- keyring 키 -->"),
})
```

---

## §4 환경별 설정 차이

| 설정 항목 | 개발 | 스테이징 | 운영 |
|---------|------|--------|------|
| `APP_ENV` | `development` | `staging` | `production` |
| `LOG_LEVEL` | `DEBUG` | `INFO` | `WARN` |
| `DB_HOST` | `localhost` | <!-- 스테이지 DB --> | <!-- 운영 DB --> |
| <!-- 항목 --> | <!-- 개발값 --> | <!-- 스테이지값 --> | <!-- 운영값 --> |

---

## §5 설정 검증 방법

```bash
# 설정 파일 존재 여부 확인
ls -la .env

# 필수 환경 변수 로드 확인
python -c "
import os
from dotenv import load_dotenv
load_dotenv()
required = ['APP_ENV', 'DB_HOST', 'DB_NAME']
missing = [k for k in required if not os.getenv(k)]
if missing:
    print(f'누락된 설정: {missing}')
else:
    print('모든 필수 설정 확인 완료')
"
```

---

## §6 .env.example 템플릿

```ini
# 애플리케이션 설정
APP_ENV=development
APP_PORT=8000
LOG_LEVEL=INFO

# DB 설정 (비시크릿 항목만 — 비밀번호는 keyring에 저장)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=<!-- DB명 -->
DB_USER=<!-- DB 사용자명 -->

# 외부 서비스 (URL·포트 등 비시크릿만)
<!-- 서비스명 -->_BASE_URL=https://<!-- 외부 서비스 URL -->

# --- 시크릿은 아래 keyring 명령으로 등록 ---
# python -c "import keyring; keyring.set_password('{PROJECT}', '<!-- key명 -->', 'YOUR_VALUE')"
```

---

## 추적성 (Traceability)

| 방향 | 연결 문서 | 관계 설명 |
|------|---------|---------|
| ↑ 상위 | ARC — 배포 환경·컴포넌트에서 설정 요소 파생 | 1:1 |
| ↑ 상위 | SEC — 보안 설정 값 (시크릿·암호화) | 조건부 |
| ↑ 상위 | DAT — DB 접속 정보 | 조건부 |
| ↓ 하위 | OPM — 운영 중 설정 변경 시 참조 | 1:1 |
| ↓ 하위 | RUN — 장애 대응 시 설정 변경 절차 | 1:N |
| ↓ 하위 | TRC — 추적 매트릭스로 집계 | 자동 |

---

## 검증 체크리스트

- [ ] doc_id 형식: `{PROJECT}-CFG-01` (PREFIX 포함)
- [ ] trace.up에 ARC 문서 ID 등록
- [ ] §2 환경 변수: 모든 필수 항목 기재
- [ ] §3 시크릿: 값 미기재 확인, keyring 등록 명령 기재
- [ ] §4 환경별 차이: 개발·스테이징·운영 모두 기재
- [ ] §5 설정 검증 명령어 기재
- [ ] §6 .env.example 템플릿: 시크릿 주석 포함
- [ ] `.env` 파일이 `.gitignore`에 포함됨을 확인
- [ ] 모든 ID에 `{PROJECT}-` prefix 적용
