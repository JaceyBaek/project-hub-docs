# AGENTS.md

이 파일은 이 저장소에서 동작하는 모든 하네스·모델이 공유하는 root entrypoint다. 특정 벤더·모델 계열 전용 지시가 아니다. 모델별 능력·역할 whitelist는 `platform/processes/ai_agents/AI_*.md`, 역할별 허용/금지는 `platform/processes/roles/`가 소유하며 이 문서는 두 축을 복제하지 않고 아래 공통 게이트·규칙만 규정한다.

## 구현(코딩) 작업 요청 시 역할 확인 게이트

**구현·코드 작성 요청이 오면 무조건**(collab 작업 여부와 무관하게) 진행 전 다음을 확인한다.

1. `platform/setup/config/personal.yml` `collab.roles.developer`(또는 현행 스키마의 개발 담당 필드)에 실제 배정된 주체를 확인한다.
2. 자신이 그 배정과 다르면 구현하지 않는다. 설계·검증·테스트 리뷰 전용 역할임을 알리고 명세, 테스트 계획, 인터페이스 명세, 인수 기준, 구현 체크리스트 제공을 제안한다.
3. 이 확인을 생략하고 구현을 진행하는 것은 금지된다 — "지금 요청이 급하다"·"간단한 수정이다" 등 어떤 이유로도 생략하지 않는다.

**이중 안전장치 (fail-closed)**: 위 확인이 어떤 이유로든 생략되거나 실패해도, GPT 계열은 `platform/processes/ai_agents/AI_GPT.md`의 `default_role_whitelist`에 `developer`가 없어 모델 능력 층에서 별도로 차단된다. 역할 정책(`platform/processes/roles/ROLE_DEVELOPER.md`)은 "GPT 계열을 `developer`로 배정하는 것" 자체를 금지하며, 모델 프로필은 "GPT의 `developer` whitelist 판정"만 소유한다. 두 층은 독립적으로 작동한다 — 한쪽이 누락돼도 다른 쪽이 차단한다.

문서 편집은 허용된다. Markdown 문서, 설계 문서, 리뷰 문서, 오케스트레이션 계획, 마이그레이션 계획, 검증 노트, 테스트 전략, 인수 기준, 프로세스 문서, 구현 체크리스트 편집은 구현으로 간주하지 않는다.

## 공통 운영 규칙

> **SoT**: `platform/processes/ai_agents/COMMON.md`가 공통 규칙의 유지·편집용 SoT다.
> `AGENTS.md`는 공유 root entrypoint로서 COMMON 핵심 6개 block만 인라인으로 포함한다. 나머지 block은 필요 시 `COMMON.md`를 직접 Read한다.

<!-- sync: COM-RES-001, 20260830, mode=manual, owner=Claude -->
**기본 응답 규칙** (COM-RES-001): 한국어·존댓말, 사실 기반, 외부 스펙 확인 후 기술(미확인 시 "미확인" 표기), 코드·산출물 우선, 모호하면 질문, step-by-step. 전문: `platform/processes/ai_agents/COMMON.md` §COM-RES-001

<!-- sync: COM-RES-002, 20260830, mode=manual, owner=Claude -->
**경로·타임스탬프 안전 규칙** (COM-RES-002): 절대경로 금지, 경로 구분자 슬래시(/) 사용, `date +"%Y-%m-%d %H:%M"` 명령으로 실제 시각 확인(임의 작성 금지), 파일 전수 확인 후 결론(grep 0건 = "없다" 단정 금지). 전문: `platform/processes/ai_agents/COMMON.md` §COM-RES-002

<!-- sync: COM-COLLAB-001, 20260830, mode=manual, owner=Claude -->
**collab AI 역할 확인** (COM-COLLAB-001): collab 작업 시작 전 `personal.yml collab.roles` 섹션 확인. DEV 담당자는 `personal.yml collab.roles.developer` 기준 확인 (design 문서 `author` 필드와 혼동 금지). 전문: `platform/processes/ai_agents/COMMON.md` §COM-COLLAB-001

<!-- sync: COM-COLLAB-002, 20260830, mode=manual, owner=Claude -->
**collab design 합의/동의 하드 게이트** (COM-COLLAB-002): `resolved_by`·`verified_by`·트래킹 상태 기입 직전 반드시 collab README §7·§8 Read. 기억·직관 의존 금지. blocking 없으면 즉시 합의 선언. 사용자가 `동의 검토`·`동의만`을 요청하면 최신 합의/미결/DoD/상태/MAP만 확인하는 fast-path를 기본 적용하고, 전체 재리뷰는 명시 요청 또는 불일치 감지 시에만 수행. 전문: `platform/processes/ai_agents/COMMON.md` §COM-COLLAB-002

<!-- sync: COM-OPS-003, 20260830, mode=manual, owner=Claude -->
**collab 문서·MAP 즉시 갱신** (COM-OPS-003): 재수정 완료 시 DEV §2·§4·MAP.md 동일 작업 범위 즉시 갱신. `approved_by` 기입 즉시 `_archive/{ns}/MAP.md` + `collab/MAP.md` 양쪽 갱신. 편집 전 반드시 Read. 전문: `platform/processes/ai_agents/COMMON.md` §COM-OPS-003

<!-- sync: COM-OPS-007, 20260830, mode=manual, owner=Claude -->
**커밋·PR 개인 내부 식별자 기록 금지** (COM-OPS-007): 커밋 메시지·태그 주석·PR 제목·본문·CI 코멘트에 collab 문서 식별자(`D01`·`DEV_D01~D06`·`D02B`·`R5`·`G1`), collab 번들·세션 번호(`20260701-1737`·`bundle 20260529-2010`), 개인 관리 문서 ID(`TC-C09`·`T032`·`H-001`·`E-003`) 기록 금지. 공용 영역(조직 GitHub `origin` + 사내 Bitbucket) 양쪽 모두 적용. 사내 조회 가능한 식별자(Jira 키·Bamboo 빌드 키·릴리스 태그·경로·기능명)만 허용하고, 나머지는 기능 언어로 치환. 저장소 내부 문서 본문은 비적용. 커밋 직전 `D0\d`·`DEV_D`·`TC-`·`T0\d\d`·`H-0\d\d`·`E-0\d\d`·`\d{8}-\d{4}` 패턴 자가 점검 필수. 전문: `platform/processes/ai_agents/COMMON.md` §COM-OPS-007 / `platform/processes/project/project_lifecycle.md` §5-3-1

**P-2 (축 판정 합성 규칙)**: 모델·harness·역할 축의 `deny`는 합집합, `allow`는 교집합으로 판정한다. 한 축이라도 `deny`/`unknown`이면 배정·진행을 금지한다.

**P-4 (역할 판정의 단일 경로)**: 역할은 모델명·harness·entrypoint로 암묵 추론하지 않고 `personal.yml collab.roles.*`에서만 판정한다.

**B3/P-4 역할 배정 경과 규정 (D04 detail R3 확정)**: D05 cutover 완료 전에는 `personal.yml`의 legacy 필드 `collab.author`(→ `developer`), `collab.verified_by`(→ `verifier`), `collab.tested_by`(→ `tester`)를 역할 판정의 경과 경로로 사용한다. `collab.roles.*`가 존재하면 해당 경로를 우선하되, legacy 필드도 병존하는 경우 대응 역할 값의 불일치·누락·복수 해석은 모두 P-6 중단이다. `collab.roles.*`가 존재하지 않으면 위 legacy 매핑의 세 필드가 모두 존재하고 유일하게 해석될 때만 진행하며, 그 외에는 P-6 중단한다. 이 경과 규정은 D05가 `collab.roles.*` 필수 역할 값 기록 및 병존 값 일치 검증을 완료하고 D05 종료 승인이 기록된 뒤에만 종료된다. 종료 후 역할 판정은 `collab.roles.*` 단일 경로만 사용한다.

**충돌 우선순위**: 구현(코딩) 작업 요청 시 역할 확인 게이트는 `AGENTS.md`가 우선한다. 공통 응답·기록·운영 규칙은 entrypoint 인라인을 우선 적용하고, COMMON.md와 drift 발견 시 review-blocking으로 처리한다.

고위험 작업(collab 상태 전이·플랫폼 규칙 변경·문서 승인·리뷰 종료) 시 `platform/processes/rules/rule_loading_policy.md` 확인.

## 모델·역할 배정 참조

> **축 분리 (D01/D02/D04)**: canonical 모델 배정·능력 whitelist는 `platform/processes/ai_agents/`, 역할별 허용/금지·서명 권한은 `platform/processes/roles/`가 소유한다. 이 문서는 두 축의 사실을 복제하지 않는다.

collab 작업에서 실제 역할 배정은 `platform/setup/config/personal.yml` `collab.roles.*`를 조회한다. 역할별 독립성·15쌍 매트릭스는 `platform/processes/roles/README.md`, 모델별 능력·whitelist는 `platform/processes/ai_agents/AI_*.md`를 참조한다.

운영 단계별 권장 모델(문제 정의·설계 리뷰·검증 설계 등)은 프로젝트·오케스트레이터 설정에서 관리하며, 이 문서는 특정 모델 ID를 특정 역할에 고정 배정하지 않는다. 구현 실행 단계의 실제 담당은 위 역할 확인 게이트를 통과한 `developer` 배정 주체이며, GPT 계열은 이 배정을 받을 수 없다(위 이중 안전장치 참조).

## 규칙 선독 체인 (고위험 작업 필수)

collab 상태 전이·플랫폼 규칙 변경·프로젝트 생성/종료 등 고위험 작업 진입 전 `platform/processes/rules/rule_loading_policy.md`를 확인한다.
세부 로딩 체인(Level 0–3)·Rule Context 선언 형식·Hard/Soft Block 기준·상태 전이 게이트는 해당 문서가 단일 SoT이며, 이 파일에 전문을 중복하지 않는다.

## Collab 문서 우선순위

`platform/processes/collab/` 아래 문서이거나 collab 리뷰 형식을 따르는 문서는 collab 프로세스 지침을 최우선으로 따른다.

- 문서 자체의 섹션 순서, 리뷰/응답 차례, 이슈 ID, 상태값, 트래킹 테이블, 아카이브 규칙을 따른다.
- collab 문서를 검토할 때는 외부 메모만 제공하지 않고 적절한 리뷰 또는 응답 섹션에 피드백을 직접 기록한다.
- 이전 라운드와 작성자별 섹션은 감사 이력으로 보존한다.
- collab 규칙이 요구하는 경우 frontmatter, 트래킹 테이블, V 행, unresolved/resolved 표시, MAP.md 상태, 관련 프로세스 메타데이터를 갱신한다.
- 일반 문서 편집 지침과 collab 프로세스 형식이 충돌하면 collab 프로세스 형식을 우선한다.
- 이 우선순위는 코딩이나 구현 작업을 허용하지 않는다.
- **DEV/TC 문서 동시 업데이트 의무:** 개발(DEV, `30_dev/` 등) 문서와 테스트 케이스(TC, `40_testcase/` 등) 문서처럼 상호 의존하거나 쌍으로 관리되는 collab 문서들의 경우, 하나의 파일에 대한 리뷰/검증 요청만 명시되어 있더라도 **동일 식별자를 가진 관련 문서를 모두 스캔하여 판정 결과와 피드백을 동시에 업데이트하고 동기화** 상태를 유지해야 한다.
- **소유권 및 역할 경계 준수 (서명란 침범 금지):** 타 수행자나 승인권자의 고유 작성 영역(예: 승인자 `Jacey` 전용 최종 결론 및 승인 서명란, 개발자 `Claude` 전용 작성 섹션 등)은 어떠한 경우에도 침범하여 임의로 편집하지 않는다. 피드백이나 검증 의견은 오직 본인의 담당 섹션(예: `Gemini` 제3자 검증란)에만 작성해야 한다.

## 문서 리뷰 및 업데이트 동작

문서 리뷰 요청을 받으면 대상 문서와 정합성 확인에 필요한 관련 문서를 함께 검토한다.

- 명시적으로 코멘트만 요청받지 않았다면 외부 리뷰 메모만 제공하고 끝내지 않는다.
- 문서가 협업/리뷰 형식을 가지고 있으면 적절한 섹션에 리뷰 피드백을 직접 기록한다.
- 기존 작성자의 의도와 리뷰 이력을 보존한다.
- 문서 형식이 요구하는 경우 리뷰 상태, unresolved/resolved 표시, 트래킹 테이블, 이슈 요약, 검증 노트를 갱신한다.
- 미해결 이슈는 조기 종료하지 않고 명확히 표시한다.
- 올바른 섹션, 작성자 차례, 상태 전환이 불명확하면 편집 전에 질문한다.
- 편집 후 변경 내용과 남은 리스크 또는 열린 질문을 요약한다.

## 설계 리뷰 기준

- 목표, 시스템 컨텍스트, 제약사항, 이해관계자, 예상 운영 환경을 먼저 이해한다.
- 요구사항, 가정, 제약, 결정사항, 대안, 리스크, 열린 질문이 분리되어 있는지 확인한다.
- 제안된 아키텍처가 내부적으로 일관되고 실현 가능한지 검증한다.
- 불명확한 용어, 모호한 소유권, 약한 경계, 누락된 인터페이스, 암묵적 의존성을 식별한다.
- 낙관적인 가정과 실패 모드를 검토한다.
- 확장성, 신뢰성, 관측성, 보안, 유지보수성, 운영 복잡도를 평가한다.
- 추상 설명보다 구체적인 명세, 상태 전이, 데이터 흐름, 책임 경계, 오류 처리 규칙을 선호한다.

### 문서 용어 선택

- 설계·운영·검증 초안 작성 시 `계약`이라는 표현을 기본 용어로 쓰지 않는다.
- 일반 설계 문맥에서는 `계약` 대신 `명세`, `기준`, `필수 항목`, `책임 경계`, `입출력 명세`, `상태 전이 규칙`처럼 독자가 바로 이해할 수 있는 표현을 사용한다.
- `계약`은 외부 API 호환성, consumer/provider contract, contract test처럼 업계에서 정식 용어로 쓰이는 경우에만 제한적으로 사용한다. 이 경우에도 처음 등장할 때 의미를 명확히 설명한다.

## 검증 및 테스트 기준

테스트를 사후 작업이 아니라 설계의 일부로 다룬다.

- 요구사항, 리스크, 인터페이스, 워크플로, 데이터 명세, 실패 모드에서 테스트 시나리오를 도출한다.
- 필요 시 단위, 통합, 계약, E2E, 회귀, 마이그레이션, 성능, 보안, 복원력, 운영 테스트를 포함한다.
- 무엇을 mock, simulate, monitor, log, manual verify 해야 하는지 식별한다.
- 명확한 인수 기준과 종료 기준을 정의한다.
- 부정 케이스, 경계 케이스, 동시성 케이스, 롤백 케이스, degraded-mode 동작, 복구 동작을 포함한다.
- 테스트 불가능한 요구사항은 지적하고 테스트 가능하게 만드는 방법을 제안한다.

## 응답 스타일

- 기본 응답 형식은 루트 `CLAUDE.md`의 `응답 규칙`을 따른다.
- 간결하지만 충분히 철저하게 답한다.
- 가장 중요한 리스크나 공백을 먼저 제시한다.
- 직접적이고 비판적이되 건설적으로 말한다.
- 정보가 부족하면 무엇이 부족한지 밝히고 합리적인 가정으로 계속 진행한다.
- 문서를 편집했다면 편집한 섹션과 남은 열린 이슈를 요약한다.

## 명령 실행 및 경로 규칙

- **경로 구분자 슬래시(/) 필수 사용**: Windows 환경에서 도구(예: `run_command`, `view_file` 등) 사용 시 권한 팝업이 발생하는 것을 방지하기 위해, 모든 경로 기술 및 명령 실행 시 경로 구분자로 반드시 백슬래시(`\`) 대신 슬래시(`/`)를 사용해야 한다.
- **승인 팝업 최소화**: 문서 확인·검색·상태 점검에는 이미 승인된 단순 명령을 우선 사용한다. `rg`, `rg --files`, `Get-Content`, `Get-ChildItem`, `git diff`, `git status`처럼 단일 명령으로 끝나는 형태를 기본으로 하며, 파이프(`|`), 세미콜론(`;`), PowerShell 변수 할당, 스크립트 블록(`{ ... }`), 인라인 Python/Node, `pwsh.exe -Command` 래핑처럼 승인 규칙 매칭을 깨는 복합 명령은 필요한 경우가 아니면 사용하지 않는다.
- **파일 일부 확인 방식**: 줄번호나 범위 확인이 필요하더라도 복합 PowerShell 파이프라인을 만들지 않는다. 우선 `rg -n`으로 대상 문구를 찾고, 필요한 경우 `Get-Content -TotalCount` 또는 `Get-Content -Tail` 같은 단일 명령으로 확인한다. 복합 명령이 꼭 필요하면 실행 전에 사용자에게 이유와 승인 범위를 설명한다.

## 서브프로세스(kiro-cli 등 백그라운드 AI 호출) 관찰 규칙 (2026-09-02 Jacey 지시)

collab dispatch에서 developer·verifier·tester 역할을 별도 kiro-cli 서브프로세스로 호출한 뒤 완료를 기다리는 동안, 진행 상태 확인과 결과 텍스트 조회를 분리한다. 두 작업을 같은 도구로 반복하면 토큰을 불필요하게 소모한다.

- **진행 중 상태 확인은 프로세스 목록 조회(가벼운 조회)만 사용한다.** 실행 중인지(running) 종료됐는지(stopped)만 필요하므로, 출력 텍스트 전체를 반환하는 조회를 반복 호출하지 않는다.
- **출력 텍스트 조회(무거운 조회)는 프로세스가 `stopped`로 바뀐 시점에만 수행한다.** 그 시점에 결과 전문을 한 번 읽어 최종 판단에 사용한다.
- **여전히 `running`인데 중간 점검이 필요하면**, 반환 줄 수를 짧게 제한(10~20줄 수준)해 "멈췄는지·진행 중인지"만 가볍게 확인한다. 매번 40줄 이상을 반복 조회하지 않는다.
- **직전 조회와 출력이 동일하면(새 진행 없음)** 같은 간격으로 계속 반복 조회하지 않는다. 대기 간격을 늘리거나, 무거운 조회(로직 실행·코드 대조·테스트 실행 등) 단계에 들어간 것이 확인되면 대기 간격을 더 길게 잡는다.
- **채팅 응답에도 폴링마다 한 줄씩 보고하지 않는다.** 상태가 실제로 바뀌었을 때(새 단계 진입, 완료, 오류 발생)만 보고한다.
- **프로세스 목록 조회의 `status` 필드는 지연·오지연될 수 있다.** 실제로 서브프로세스가 이미 종료(`Credits:`/`Time:` 완료 마커 출력)됐는데도 `status: running`으로 계속 보고되는 사례가 반복 확인됐다. `running`이 비정상적으로 길게 지속되면(경험적으로 10분 이상, 또는 대상 산출물 파일의 `LastWriteTime`이 여러 폴링 주기 동안 갱신되지 않으면) `status`만 믿지 말고 짧은 `get_process_output`으로 완료 마커나 실제 정지 여부를 직접 확인한다. 완료 마커가 보이면 `status`와 무관하게 완료로 처리하고 다음 단계로 진행한다.
- **역할 전환·상태 보고 시 역할명과 실제 모델명을 항상 함께 표기한다 (2026-09-02 Jacey 지시).** "developer에게 지시합니다"처럼 역할명만 쓰지 않고, "developer(claude-sonnet-5)에게 지시합니다", "verifier(gpt-5.6-terra) 재검증 완료" 형식으로 역할과 raw model ID를 같은 문장에 병기한다. 대상 모델은 `personal.yml`의 `collab.roles.*` 배정값을 그대로 쓴다. 이 표기는 다음 시점 모두에 적용한다: 서브프로세스를 새로 호출할 때, 진행 상태를 보고할 때, 완료·실패를 보고할 때, Cycle 결과를 요약할 때. 사용자가 지금 어떤 모델이 실행 중인지 매 순간 실시간으로 알 수 있어야 한다는 목적이며, 이 규칙은 세션이나 harness와 무관하게 항상 적용한다.
- **진행 상태 보고에 현재 작업 내용도 함께 짧게 표시한다 (2026-09-02 Jacey 지시).** "역할(모델명) — 작업 내용" 형식으로 한 줄 이내로 간단히 적는다. 예: "developer(claude-sonnet-5) — DEV_D04 Cycle C1 재개발 진행 중", "verifier(gpt-5.6-terra) — DEV_D03 §3-1 재검증 완료". 자세한 설명을 덧붙이지 않고 무엇을(어떤 DEV/Cycle/TC) 하고 있는지만 간결하게 밝힌다.
- **서브프로세스 폴링은 2단계 간격을 쓴다 (2026-09-02 Jacey 지시).** 지시 직후엔 정상적으로 시작해서 작업 중인지부터 짧은 간격(약 20~30초)으로 1~2회 확인한다(조기 종료·오판·재확인 요구로 인한 즉시 종료 사례가 반복됐기 때문에, 이걸 놓치면 3분을 낭비하게 된다). 정상 진행이 확인되면 그 이후부터 3분(170초) 대기 간격으로 전환한다. 매번 처음부터 3분을 기다리지 않는다.
- **developer↔verifier(↔tester) 역할 전환 지점에서 임의로 재확인을 요청하지 않는다.** 한 역할의 작업이 끝나 다음 역할을 호출하는 것은 이미 승인된 흐름(Cycle 진행)의 다음 단계일 뿐, 새로운 승인이 필요한 지점이 아니다. Jacey 확인이 실제로 필요한 지점은 오직 다음 경우뿐이다: (1) Cycle C5+ 도달, (2) 동일 TC ID 3회 연속 실패, (3) 서브프로세스 실행 자체의 오류·차단(예: 과부하 오류, 인젝션 방어로 인한 거부, 파일 누락으로 인한 실패). 이 세 경우가 아니면 developer 완료 → verifier 호출, verifier 완료 → developer 재개발 등 역할 전환을 확인 없이 그대로 이어간다.
