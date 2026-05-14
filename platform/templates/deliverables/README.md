# 산출물 템플릿 (Deliverables Template)

사내 업무 시스템(ERP/그룹웨어) 프로젝트의 표준 산출물 11종 + 추적 매트릭스 템플릿.
**AI(Claude)가 작성하는 것을 전제**로 설계되어 있으며, RAG 학습용 Markdown 자동 변환을 지원한다.

---

## 사용 시작 (5분)

### 1) 프로젝트 코드 결정
4~8자 영문 대문자+숫자. 한 번 정하면 변경 불가.
예: `EM2026` (전자결재 2026), `HRGW27` (HR 그룹웨어 2027), `OMS2026` (주문관리 2026)

### 2) 복사본에서 코드 치환
템플릿을 `projects/{프로젝트명}/docs/`로 복사한 뒤, **복사본 폴더에서만** 예시 코드(`EM2026`)를 치환한다.
원본 `platform/templates/deliverables/`는 절대 수정하지 말 것.

```bash
# 복사 후 projects/{프로젝트명}/docs/ 에서 실행

# Linux/Mac
find projects/{프로젝트명}/docs -type f -name "*.html" \
  -exec sed -i '' 's/EM2026/<NEW_CODE>/g' {} +

# Windows PowerShell
Get-ChildItem -Path projects/{프로젝트명}/docs -Recurse -Include *.html |
  ForEach-Object { (Get-Content $_) -replace 'EM2026','<NEW_CODE>' | Set-Content $_ }
```

### 3) 메타데이터 갱신
각 문서 `<head>` 의 `<meta>` 태그 수정:
- `doc-owner` (담당자)
- `doc-version` (현재 버전)
- `doc-status` (Draft / Review / Approved)
- `doc-last-updated` (수정일 ISO-8601)
- `doc-tags` (#phase, #module, #domain)
- `doc-confluence-base` + `doc-confluence-path`

`meta-injector.js`가 메타바·AI 메타·변경이력을 자동 채운다. 본문 수정 불필요.

### 4) 문서 작성
- AI에게 위임 시: `CLAUDE.md` 가 자동으로 작성 지침을 제공
- 사람이 작성 시: `guides/01_REQ-authoring-guide.md` 같은 가이드를 참고
- 모든 ID는 `<PROJECT>-<TYPE>-##` 형식 (예: `EM2026-REQ-F01`)

### 5) 검증
브라우저에서 문서 열기 → 하단 **"작성 완료 검증표"** 가 자동 채워짐.
모든 행 PASS 후 PR/배포.

### 6) RAG 빌드 (선택)
```bash
# 프로젝트 산출물: projects/{프로젝트명}/ 에서 실행
# 플랫폼 산출물:  docs/deliverables/ 에서 실행
cd <docs가 있는 폴더>
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
├── index.html               ← 문서 인덱스 (브라우저 진입점)
│
├── assets/
│   ├── wireframe.css        ← 공통 스타일 (print CSS 포함)
│   ├── doc-validator.js     ← 검증표 자동 계산
│   └── meta-injector.js     ← <meta> → 본문 자동 주입
│
├── docs/                    ← 산출물 11종 + TRC (단계별 폴더)
│   ├── 00_TRC_요구사항추적매트릭스.html   ← 루트 (전체 추적)
│   ├── 01_plan/
│   │   └── 01_REQ_요구사항정의서.html
│   ├── 02_design/
│   │   ├── 02_FLW_프로세스흐름도.html
│   │   ├── 03_SCR_화면정의서.html
│   │   ├── 04_ROLE_권한정의서.html
│   │   ├── 05_FUNC_기능정의서.html
│   │   └── 08_ARC_아키텍처.html
│   ├── 03_dev/
│   │   └── 06_UTC_단위테스트케이스.html
│   ├── 04_test/
│   │   └── 07_ITS_통합테스트시나리오.html
│   ├── 05_deploy/
│   │   ├── 09_OPM_운영자매뉴얼.html
│   │   ├── 10_USM_사용자매뉴얼.html
│   │   └── 11_CFG_설정가이드.html
│   ├── _archive/            ← 이전 버전 보존
│   └── _meta/               ← 운영 메모 (학습 제외)
│
├── guides/                  ← 작성·운영 가이드
│   ├── 01_REQ-authoring-guide.md  ← 문서별 AI 작성 가이드 (01~10)
│   ├── RAG-conversion-guide.md
│   ├── chunk-strategy-matrix.md
│   ├── ID-namespace.md
│   ├── rag-policy.md
│   └── validation-rules.md ← 검증표 규칙 목록 (doc-validator.js 기준)
```

> **RAG 변환기**: `platform/tools/rag/build-rag.mjs` (저장소 루트 기준)

---

## 산출물 종류

| # | 코드 | 산출물 | 청크 단위 | 주요 작성자 |
|---|---|---|---|---|
| 00 | TRC | 요구사항 추적 매트릭스 | (자동 생성) | PMO |
| 01 | REQ | 요구사항정의서 | H2 + REQ 행 | PM/PO/BA |
| 02 | FLW | 프로세스흐름도 | 노드/엣지 | BA/기획자 |
| 03 | SCR | 화면정의서 | 화면 카드 | UX/UI |
| 04 | ROLE | 권한정의서 | 역할/권한 | 기획자/보안 |
| 05 | FUNC | 기능정의서 | 함수/API | 개발자 |
| 06 | UTC | 단위테스트케이스 | 테스트 케이스 | QA/개발자 |
| 07 | ITS | 통합테스트시나리오 | 시나리오 | QA |
| 08 | ARC | 아키텍처 | H2 섹션 | Architect |
| 09 | OPM | 운영자매뉴얼 | 절차 | DevOps |
| 10 | USM | 사용자매뉴얼 | 작업(Task) | TW/CS |
| 11 | CFG | 설정가이드 | 설정 항목 | DevOps |

---

## 핵심 원칙

1. **`<meta>` = 단일 진실 소스** — 본문 수정 없이 메타만 갱신해도 표·헤더 자동 반영
2. **모든 ID = `{PROJECT}-{TYPE}-##` prefix** — 다 프로젝트 인덱스 충돌 방지
3. **양방향 trace** — `data-trace-up` / `data-trace-down` 으로 그래프 자동 구성
4. **AI-SKIP 단일화** — `data-ai-skip="true"` 만 사용 (주석 마커 사용 금지)
5. **검증 게이트** — `doc-validator.js` PASS 못 하면 승인 요청 금지

---

## 라이선스 / 변경

- 사내 전용
- 템플릿 자체 변경은 본 리포 PR로만 (산출물 작성과 분리)
