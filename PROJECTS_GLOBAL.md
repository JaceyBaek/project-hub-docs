# 프로젝트 현황

## 진행중

| 상태 | 코드 | 프로젝트명 | 폴더 | 담당 | 시작일 | 단계 | 요약 |
|---|---|---|---|---|---|---|---|
| 진행중 | P2606021 | video_clipper | projects/video_clipper | Jacey | 2026-06-02 | 개발 | 인터뷰 영상 STT 기반 장면 추출·편집 도구 |
| 진행중 | P2605262 | eacct | projects/eacct | Jacey | 2026-05-26 | 개발 | e-Acct 시스템 소스 수정·기능개선 작업 관리 — API 추가, 버그픽스, 리팩토링 이력 통합 |
| 진행중 | P2605261 | eacct_source_analyzer | projects/eacct_source_analyzer | Jacey | 2026-05-26 | 개발 | eAcct 소스 분석·리뷰·API 생성 |
| 진행중 | P2605121 | eacct_chatbot | projects/eacct_chatbot | Jacey | 2026-05-12 | 개발 | e-Acct AI 챗봇 — eacct_mcp REST 연동, Claude/Miso 전환 지원 웹 챗봇 |
| 진행중 | P2605081 | eacct_mcp | projects/eacct_mcp | Jacey | 2026-05-08 | 개발 | e-Acct 시스템 연동 MCP 서버 — mcp_platform 기반 구현체, e-Acct 데이터를 Claude·Miso에 실시간으로 노출 |
| 진행중 | P2605061 | gmail_cleaner | projects/gmail_cleaner | Jacey | 2026-05-06 | 테스트 | Gmail 광고·프로모션 메일 정리 도구 (Python + APScheduler + 자체 MCP 11개 tool, 자동삭제·검토삭제 2-Tier) |

## 보류

| 상태 | 코드 | 프로젝트명 | 폴더 | 담당 | 시작일 | 단계 | 요약 |
|---|---|---|---|---|---|---|---|

## 활성
> 정기 자동화가 실행 중인 상태 (개인 로컬 기준). 다수가 의존하는 중앙 운영은 별도 인프라 결정 후 관리.
> `apps/` 하위 앱은 이 표에서 제외 — apps/catalog.yml이 source of truth (P-DEC-002).

| 상태 | 코드 | 프로젝트명 | 폴더 | 담당 | 시작일 | 단계 | 요약 |
|---|---|---|---|---|---|---|---|
| 활성 | P2606041 | wiki_builder | projects/wiki_builder | Jacey | 2026-06-04 | 운영 | e-Acct 일일회의·주간보고 Confluence 페이지를 FAQ·MBO로 동시 변환하는 통합 빌더 (wiki_faq_builder + wiki_mbo_builder 통합) |

## 서비스종료

| 상태 | 코드 | 프로젝트명 | 폴더 | 담당 | 시작일 | 종료일 | 단계 | 요약 |
|---|---|---|---|---|---|---|---|---|
| 서비스종료 | P2604221 | wiki_faq_builder | archived/wiki_faq_builder | Jacey | 2026-04-22 | 2026-06-04 | 운영종료 | wiki_builder(P2606041)로 통합 — FAQ·MBO 동일 소스 공유 구조에서 아카이브 이동 충돌 발생, 단일 프로젝트로 통합하여 종료 |
| 서비스종료 | P2604281 | wiki_mbo_builder | archived/wiki_mbo_builder | Jacey | 2026-04-28 | 2026-06-04 | 운영종료 | wiki_builder(P2606041)로 통합 — wiki_faq_builder와 동일 소스 루트 공유, 아카이브 이동 충돌 및 atlassian_client 비즈니스 로직 분리 목적으로 통합 종료 |
