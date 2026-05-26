# 검증표 규칙 목록 (doc-validator.js 기준)

AI가 산출물 작성 중 `PASS/FAIL` 결과를 사전에 파악할 수 있도록 `assets/doc-validator.js`에 정의된 전체 규칙을 정리한다.
브라우저에서 문서를 열면 자동 계산되며, 모든 행 PASS 후 상태를 `Approved`로 변경할 수 있다.

---

## 공통 규칙 (모든 문서)

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `meta-bar` | 메타바 필드 | `.cf-meta .m .v` 셀 ≥ 6개 채움 |
| `tags` | 분류 태그 | `#phase`, `#module`, `#domain` 3개 모두 포함 |
| `ai-metadata` | AI 메타 meta 태그 | `doc-tags`, `doc-embedding-hints`, `doc-exclude-from-training` 3개 존재 |
| `id-format` | ID 형식 | 중복 없음 + 2자리 이상 zero-pad (`\d{2,}$`) |
| `project-id-prefix` | ID prefix | 모든 `data-req-id`/`data-item-id` 가 `{project-id}-` 로 시작 |
| `trace-required` | trace 필수 | `data-req-id`/`data-item-id` 가진 모든 항목에 `data-trace`, `data-trace-up`, `data-trace-down` 중 하나 이상 |
| `trace-up-required` | trace-up 필수 | `data-item-id` 가진 모든 항목에 `data-trace-up` 존재 |
| `chunks-min` | 최소 청크 수 | `main [data-chunk]` 개수 ≥ `body[data-min-chunks]` (기본값 3) |

---

## REQ (요구사항정의서) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `overview-3-blocks` | 개요 3블록 | `section[data-section-key="overview"]` 내 `[data-chunk^="overview."]` ≥ 3개 |
| `glossary-min5` | 용어 정의 | `[data-table-key="glossary"] tbody tr` ≥ 5행 |
| `persona-min2` | 페르소나 | `[data-chunk^="persona:"]` ≥ 2개 |
| `br-min3` | 비즈니스 요구사항 | `[data-table-key="business-requirements"] tbody tr` ≥ 3행 |
| `fr-min5` | 기능 요구사항 | `[data-table-key="functional-requirements"] tbody tr` ≥ 5행 |
| `nfr-categories` | 비기능 카테고리 | `data-category` 값에 `성능`, `가용성`, `보안`, `호환성` 4개 모두 존재 |
| `constraints-assumptions` | 제약/가정 | `[data-chunk^="constraint:"]` ≥ 1개 AND `[data-chunk^="assumption:"]` ≥ 1개 |

---

## FLW (프로세스흐름도) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `flw-min-flows` | 최소 흐름 | `[data-chunk^="flow:"]` ≥ 1개 |
| `flw-actors` | 액터 | `[data-chunk^="actor:"]` ≥ 2개 |
| `flw-exception-min1` | 예외 흐름 | `[data-chunk^="exception:"]` ≥ 1개 |

---

## SCR (화면정의서) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `scr-min-screens` | 최소 화면 | `[data-chunk^="screen:"]` ≥ 1개 |
| `scr-fields-table` | 필드 테이블 | `[data-table-key="screen-fields"] tbody tr` ≥ 1행 |
| `scr-actions-min1` | 액션 | `[data-chunk^="action:"]` ≥ 1개 |

---

## ROLE (권한정의서) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `role-min-roles` | 최소 역할 | `[data-chunk^="role:"]` ≥ 2개 |
| `role-permission-matrix` | 권한 매트릭스 | `[data-table-key="permission-matrix"] tbody tr` ≥ 1행 |

---

## FUNC (기능정의서) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `func-min` | 최소 기능 | `[data-chunk^="func:"]` ≥ 3개 |
| `func-signature` | 시그니처 | `[data-chunk^="func:"] [data-field="signature"]` ≥ 1개 |

---

## UTC (단위테스트케이스) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `utc-min-cases` | 최소 케이스 | `[data-chunk^="testcase:"]` ≥ 3개 |
| `utc-gwt` | G/W/T 구조 | 모든 `[data-chunk^="testcase:"]` 내에 `[data-step="given"]`, `[data-step="when"]`, `[data-step="then"]` 존재 |

---

## ITS (통합테스트시나리오) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `its-min-scenarios` | 최소 시나리오 | `[data-chunk^="scenario:"]` ≥ 2개 |
| `its-steps` | 시나리오 단계 | 모든 `[data-chunk^="scenario:"]` 내에 `[data-step]` ≥ 2개 |

---

## ARC (아키텍처) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `arc-views` | 필수 뷰 4종 | `section[data-section-key]`에 `logical`, `deployment`, `data`, `security` 4개 모두 존재 |

---

## OPM (운영자매뉴얼) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `opm-procedures-min` | 최소 절차 | `[data-chunk^="procedure:"]` ≥ 3개 |
| `opm-incident-min1` | 인시던트 | `[data-chunk^="incident:"]` ≥ 1개 |

---

## USM (사용자매뉴얼) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `usm-tasks-min` | 최소 작업 | `[data-chunk^="task:"]` ≥ 3개 |

---

## CFG (설정가이드) 전용

| 규칙 ID | 검증 내용 | PASS 조건 |
|---|---|---|
| `cfg-keys-min` | 최소 설정 항목 | `[data-chunk^="config:"]` ≥ 3개 |
| `cfg-secret-marked` | 시크릿 마스킹 | `[data-config-secret="true"]` 가 있으면 모두 `[data-pii="secret"]` 포함 |

---

## 규칙 적용 방법 (HTML 마크업)

각 문서 검증표 행에 `data-validate-rule="{규칙 ID}"` 와 결과 셀에 `data-validate-result` 를 추가하면 자동 계산된다.

```html
<table>
  <tr data-validate-rule="meta-bar">
    <td>메타바 6개 필드 채움</td>
    <td data-validate-result></td>
  </tr>
  <tr data-validate-rule="fr-min5">
    <td>기능 요구사항 ≥ 5건</td>
    <td data-validate-result></td>
  </tr>
</table>
```
