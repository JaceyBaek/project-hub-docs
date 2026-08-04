<!--
sidebar_title: 2026년 8월
sidebar_order: 1
-->

# 2026년 08월 작업 히스토리

---

## 2026-08-04 — mds_governance v0.3.0 재구축 + v0.3.8 경량 검증모드 + API 통합 버그 3건 수정

- Jacey 6단계 프로세스(DDL 작성 → DDL→Excel 표준사전 대조 → Excel 수정 → Excel→DDL 재생성 → 반영) 완전 재구현. `check-ddl`(기존 DDL 준수 여부만 리포팅, 신규 검증 로직 없이 콘솔/JSON/Excel 감사 리포트) 신규 명령 추가
- 재구축 직후 `eacct_ai.sql`(9테이블) 실행 결과 100% 표준사전 미등록으로 보고했으나 Jacey 재질문으로 재조사 — API 통합이 3중으로 조용히 깨져 있었음(쿼리 파라미터 camelCase 오기입 / `_meta` 경로 오독으로 표시용 문자열을 UUID처럼 사용 / API가 HTTP 200 + `{"error":...}` 응답을 에러로 미감지). API 명세서 문서(`GS리테일_MDS_API명세서`)의 STD-002 필드명도 실제 라이브 응답과 달라 재수정
- 재발방지: `client.py::_fetch()` 에러 응답 명시 감지, `_default_std_area_id()` 폴백 제거(예외로 전환), STD-001/STD-002 실제 필드명(`dic_phy_nm`/`dic_log_nm`/`dic_desc`) 반영
- 관련 커밋: `466b8b6`(v0.3.0 재구축) · `229fb41`(재구축 요약) · `6a790be`(v0.3.8 check-ddl)
- 세부 내용: [platform/processes/lessons_learned.md](../../processes/lessons_learned.md) 2026-08-04 항목 / `platform/extensions/plugins/mds_governance/CHANGELOG.md`

---

## 2026-08-04 — eacct_chatbot G2-D01 R5 최종 승인 완료 + eacct feature/chatbot 재반영 작업

- D01(signed-context-issuer-and-exchange) R5 설계 회귀 — QA·PROD ECS single-task 배포 증적을 Jacey attestation(2026-08-04 17:10)으로 수용, Codex 재검증 통과(17:21) → `verified_by=Codex` 봉인, 다음 단계는 Gemini 제3자 테스트
- eAcct 소스(`feature/chatbot` 브랜치)를 PROD 기준으로 원복 후 챗봇/mcp 관련 파일을 그룹(A~E) 단위로 재반영 진행 — Group A(JWT 서명)·B(revocation) 구동검증 완료, Group C(라우팅 컨텍스트)는 `ChatBotMapper` NoClassDefFoundError로 원복 후 C-1~C-6 세분화 재반영 진행중, Group D(위젯+테스트페이지) 반영 완료
- 세부 내용: [projects/eacct_chatbot/_manage/history/202608_history.md](../../../projects/eacct_chatbot/_manage/history/202608_history.md) / [projects/eacct/_manage/history/202608_history.md](../../../projects/eacct/_manage/history/202608_history.md)

---
