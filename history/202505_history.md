<!-- sidebar_title: 2025-05 히스토리
sidebar_order: 1
-->

# 글로벌 히스토리 — 2026년 05월

---

## 2026-05-08

### 비서 통합 사후 검증

**검증 대상:** personal.yml, ~/.claude/CLAUDE.md, d:/03.project-hub/CLAUDE.md, TRIGGERS.md, init_project.py, hub_init.py, PROJECTS_GLOBAL.md, guides/SETUP.md, templates/SETUP.template.md, 프로젝트별 CLAUDE.md 전체

**결과:** 보존 대상(history/, CHANGELOG.md) 외 세라(Sera) 잔존 0건 — 전항목 이상 없음

---

### G-016: ~/.claude/CLAUDE.md 정리 완료

**배경**
- 비서 통합(v1.0.0) 이후 전역 CLAUDE.md에 구버전 세라/아이다 역할 분리 표기 및 중복 내용 잔존 확인

**처리 내역**
1. `## 역할` 수정 — 세라(Sera) 언급 제거, 아이다 통합 비서 단일로 재작성, 이름 의미 정정 ("돕는 자" → "이익을 주는 자, 보상하는 자")
2. `## 사용자 프로필` 제거 — 플랫폼 전역 설정에 개인 프로필 불필요 (Jacey 판단)
3. `## Claude 역할` 제거 — project-hub CLAUDE.md 중복
4. `## 개발 환경` 제거 — project-hub CLAUDE.md 중복
5. `## 프로젝트 내부 규칙` 제거 — project-hub CLAUDE.md에 더 상세한 버전 존재 (이행 단계 표 내 세라 하드코딩 포함)
6. `## 응답 규칙` 제거 — project-hub CLAUDE.md 12개 항목 버전 중복

**결과:** 145줄 → 9줄 (역할·호칭 2개 섹션만 유지)
**변경 파일:** `~/.claude/CLAUDE.md`, `TODO_GLOBAL.md` (G-016 완료 처리)

---

### TRIGGERS.md 수정 — compact/clear 트리거 기록 최우선 정비

**변경 내용**
- `compact` 트리거: 히스토리·memory 기록을 ①번 최우선으로 재정렬, GitHub·Google Drive 백업 미실행(수동) 명시
- `clear` 트리거: 신규 등록 — compact와 동일한 기록 우선 절차, `/clear` 입력 안내 추가
