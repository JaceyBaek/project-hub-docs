# 산출물 템플릿 (Deliverables Template)

사내 업무 시스템(ERP/그룹웨어) 프로젝트의 표준 산출물 15종 + 추적 매트릭스 템플릿.

**MD-first 원칙**: `.md` 파일이 1차 소스다. `.html`은 웹뷰 렌더링 전용 뷰 레이어다.

---

## 사용 시작 (5분)

### 1) 프로젝트 코드 결정
`PROJECTS_GLOBAL.md`에 등록된 프로젝트 코드(`P{YYMMDD}{N}` 형식)를 사용한다.
예: `P2605081` (eacct_mcp), `P2605121` (eacct_chatbot)

### 2) MD 템플릿 복사 & 치환
템플릿을 `projects/{프로젝트명}/docs/`로 복사한 뒤, **복사본에서만** `{PROJECT}` 치환.
원본 `platform/templates/deliverables/`는 절대 수정하지 말 것.

```bash
# 복사 후 projects/{프로젝트명}/docs/ 에서 실행

# Linux/Mac
find docs -type f -name "*.md" \
  -exec sed -i '' 's/{PROJECT}/P2605081/g' {} +

# Windows PowerShell
Get-ChildItem -Path docs -Recurse -Include *.md |
  ForEach-Object { (Get-Content $_ -Encoding UTF8) -replace '\{PROJECT\}','P2605081' | Set-Content $_ -Encoding UTF8 }
```

### 3) frontmatter 갱신
각 MD 파일 상단 frontmatter 수정:
```yaml
doc_id: "P2605081-REQ-01"    # {PROJECT}-{TYPE}-01
owner: "담당자명"
updated: "2026-05-26"
tags:
  - "#plan"
  - "#chatbot"               # 실제 모듈명으로 교체
confluence_path: "/spaces/PROJ/pages/..."
```

### 4) 문서 작성
- AI에게 위임 시: `CLAUDE.md`가 자동으로 작성 지침 제공
- 사람이 작성 시: `guides/{TYPE}-authoring-guide.md` 참조
- 모든 ID는 `{PROJECT}-{TYPE}-##` 형식 (예: `P2605081-REQ-F01`)

### 5) 검증
각 MD 파일 하단 **검증 체크리스트** 항목을 모두 체크.
체크 미완료 항목이 있으면 승인 요청 금지.

### 6) RAG 빌드 (선택)
```bash
# MD → 청크 변환 (프로젝트 docs 폴더에서 실행)
node <hub_root>/platform/tools/rag/build-rag.mjs
# → dist/md/, dist/chunks.jsonl, dist/traceability.json
```

---

## 폴더 구조

```
platform/templates/deliverables/
├── README.md                ← 본 문서
├── CLAUDE.md                ← AI 작성 지침 (Claude 자동 로드)
├── DEPLOYMENT.md            ← 배포 절차
├── index.html               ← 문서 인덱스 (웹뷰 진입점)
│
├── assets/
│   ├── wireframe.css        ← HTML 뷰 공통 스타일 (print CSS 포함)
│   ├── doc-validator.js     ← HTML 뷰 검증표 자동 계산
│   └── meta-injector.js     ← HTML 뷰 메타 자동 주입
│
├── docs/                    ← 산출물 15종 + TRC (단계별 폴더)
│   │                           각 산출물 = .md (원본) + .html (뷰)
│   ├── TRC_요구사항추적매트릭스.md / .html   ← 루트 (전체 추적)
│   ├── 01_plan/
│   │   └── REQ_요구사항정의서.md / .html
│   ├── 02_design/
│   │   ├── FLW_프로세스흐름도.md / .html
│   │   ├── SCR_화면정의서.md / .html        (조건부)
│   │   ├── ROLE_권한정의서.md / .html       (조건부)
│   │   ├── FUNC_기능정의서.md / .html
│   │   ├── ARC_아키텍처.md / .html
│   │   ├── DAT_데이터모델정의서.md / .html  (조건부)
│   │   ├── API_인터페이스명세서.md / .html  (조건부)
│   │   └── SEC_보안설계서.md / .html        (조건부)
│   ├── 03_dev/
│   │   └── UTC_단위테스트케이스.md / .html
│   ├── 04_test/
│   │   └── ITS_통합테스트시나리오.md / .html  (조건부)
│   ├── 05_deploy/
│   │   ├── OPM_운영자매뉴얼.md / .html
│   │   ├── USM_사용자매뉴얼.md / .html      (조건부)
│   │   ├── CFG_설정가이드.md / .html
│   │   └── RUN_운영Runbook.md / .html
│   ├── _archive/            ← 이전 버전 보존
│   └── _meta/               ← 운영 메모 (학습 제외)
│
├── example/                 ← HTML 웹뷰 샘플 (P2605991 근태관리 시스템)
│   ├── index.html           ← 문서 인덱스
│   ├── assets/style.css     ← 공통 CSS 정규 소스 (각 HTML에 인라인 임베드)
│   └── docs/                ← 16개 산출물 HTML 예시
│
└── guides/                  ← 작성·운영 가이드
    ├── HTML-generation-guide.md ← HTML 생성 규칙 (독립형·링크·CSS 임베드)
    ├── REQ-authoring-guide.md   ← 문서별 AI 작성 가이드
    ├── RAG-conversion-guide.md
    ├── chunk-strategy-matrix.md
    ├── ID-namespace.md
    ├── rag-policy.md
    └── validation-rules.md

```

> **RAG 변환기**: `platform/tools/rag/build-rag.mjs` (저장소 루트 기준)  
> MD → chunks.jsonl 직접 변환 (HTML 경유 불필요)

---

## 산출물 종류

| # | 코드 | 산출물 | 필수 | 사용 조건 | 청크 단위 |
|---|---|---|---|---|---|
| 00 | TRC | 요구사항 추적 매트릭스 | ✅ | — | (자동 집계) |
| 01 | REQ | 요구사항정의서 | ✅ | — | H2 + 표 행 |
| 02 | FLW | 프로세스흐름도 | ✅ | — | 노드/엣지 |
| 03 | SCR | 화면정의서 | ☑ | UI 보유 시 | 화면 카드 |
| 04 | ROLE | 권한정의서 | ☑ | 인증·다중 사용자 | 역할/권한 |
| 05 | FUNC | 기능정의서 | ✅ | — | 함수/기능 |
| 06 | ARC | 아키텍처 | ✅ | — | H2 섹션 |
| 07 | DAT | 데이터모델정의서 | ☑ | DB·영구 저장소 | 엔티티 |
| 08 | API | 인터페이스명세서 | ☑ | REST/MCP/외부 연동 | 엔드포인트 |
| 09 | SEC | 보안설계서 | ☑ | 개인정보·인증·외부키 | 위협/대응 |
| 10 | UTC | 단위테스트케이스 | ✅ | — | 테스트 케이스 |
| 11 | ITS | 통합테스트시나리오 | ☑ | 다중 컴포넌트·외부 연동 | 시나리오 |
| 12 | OPM | 운영자매뉴얼 | ✅ | — | 절차 |
| 13 | USM | 사용자매뉴얼 | ☑ | 사용자 UI | 태스크 |
| 14 | CFG | 설정가이드 | ✅ | — | 설정 항목 |
| 15 | RUN | 운영Runbook | ✅ | — | 플레이북 |

> ✅ 필수 · ☑ 조건부 (해당 조건 충족 시 작성)

---

## 핵심 원칙

1. **MD = 1차 소스** — `.md` 파일만 편집. HTML은 뷰 레이어, 직접 편집 금지
2. **frontmatter = 단일 진실 소스** — 문서 메타(ID·버전·상태·담당자)는 frontmatter에만 기재
3. **모든 ID = `{PROJECT}-{TYPE}-##` prefix** — 프로젝트 간 충돌 방지
4. **양방향 trace** — frontmatter `trace.up` / `trace.down` 으로 추적 그래프 구성
5. **학습 제외 마킹** — `<!-- ai-skip -->` 헤딩 주석으로 섹션 단위 제외
6. **검증 체크리스트** — MD 하단 모든 항목 체크 전 승인 요청 금지

---

## 라이선스 / 변경

- 사내 전용
- 템플릿 자체 변경은 본 리포 PR로만 (산출물 작성과 분리)
