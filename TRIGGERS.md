# 트리거 목록

| 트리거 | 동작 |
|---|---|
| 새 프로젝트 시작 뉘앙스 | {assistant} 소개 → 사전 설정 확인(personal.yml) → 프로젝트 정보 수집(이름·설명) → 요약 확인 → `init_project.py` 실행 → PROJECTS_GLOBAL.md 업데이트 |
| 프로젝트 이동 뉘앙스 | PROJECTS_GLOBAL.md에서 해당 프로젝트 폴더 확인 → `code -r [경로]`로 VS Code 전환 |
| 오늘 작업 정리 뉘앙스 | 세션 작업 내용 판단 → 글로벌/프로젝트 히스토리 각각 자동 기록 |
| 마무리 뉘앙스 | 세션 종료 프로토콜 실행 → 글로벌·프로젝트 히스토리 기록 여부 순서대로 확인 → 히스토리 완료 후 Google Drive 백업 자동 실행 |
| 트리거 목록 보여줘 | TRIGGERS.md 내용 출력 |
| to-do 보여줘 뉘앙스 | 맥락에 따라 범위 판단: 프로젝트 맥락이면 해당 프로젝트 todo.md / 전체 요청이면 TODO_GLOBAL + 진행중·운영중 프로젝트 todo.md 동적 집계 후 통합 출력 |
| 이슈 보여줘 뉘앙스 | 맥락에 따라 범위 판단: 프로젝트 맥락이면 해당 프로젝트 issues.md / 전체 요청이면 ISSUES_GLOBAL + 진행중·운영중 프로젝트 issues.md 동적 집계 후 통합 출력 |
| 히스토리 보여줘 뉘앙스 | 프로젝트 맥락이면 해당 프로젝트 히스토리, 아니면 글로벌 히스토리 읽어 출력 |
| 이슈 등록 뉘앙스 | 프로젝트 맥락이면 해당 프로젝트 issues.md에, 전역이면 ISSUES_GLOBAL.md에 이슈 등록 |
| 서비스종료 처리 뉘앙스 | 서비스종료 처리 절차 실행 → 산출물 정리 → PROJECTS_GLOBAL.md 서비스종료 섹션 이동 + 종료일 기록 → 프로젝트 CLAUDE.md 상태 `서비스종료` 변경 → 히스토리 기록 |
| 보류 처리 뉘앙스 | 보류 사유 확인 → PROJECTS_GLOBAL.md 보류 테이블로 이동 및 요약란 기재 → 프로젝트 CLAUDE.md 상태 변경 → 프로젝트 히스토리 기록 |
| "웹뷰 열어줘", "문서 보기" 뉘앙스 | PowerShell `Start-Process "https://jaceybaek.github.io/project-hub-docs/webview/"` 으로 GitHub Pages 웹뷰 오픈 |
| "웹뷰 배포 확인", "sync 확인", "배포 상태" 뉘앙스 | `gh run list --repo gsr-ax/project-hub --workflow sync-docs.yml --limit 3` 실행 → 최근 sync 결과 확인 → 실패 시 `gh run view {run-id} --log-failed` 로 원인 확인 |
| "로컬 서버", "로컬 웹뷰" 뉘앙스 | 백그라운드로 `python -m http.server 3000` 실행 → 1초 대기 → PowerShell `Start-Process "http://localhost:3000/webview/"` 으로 브라우저 자동 오픈 |
| "로컬 서버 종료", "서버 종료" 뉘앙스 | 종료할 포트 번호 확인 (기본 3000) → PowerShell `Get-NetTCPConnection -LocalPort {포트} | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }` 실행 |
| "메모리 저장" | 미완료·진행 중 작업 여부 확인 → 없으면 memory 파일 업데이트 → `/compact`는 사용자가 직접 입력 필요 ({assistant} 실행 불가) → 있으면 목록 안내 후 사용자 판단 |
| "compact", "컴팩트" | ① 이번 세션 작업 내용 기반 memory 파일 업데이트 (user/feedback/project/reference) → ② 글로벌·프로젝트 히스토리 기록 (미기록 시) → ③ 미완료 작업 있으면 목록 안내 → ④ 모두 완료 후 "이제 `/compact`를 입력해 주세요." 안내 |
| "사이드바 캐시 초기화", "캐시 초기화", "dpws 초기화" | 웹뷰어 사이드바 하위 메뉴 캐시(dpws3) 초기화 안내: 브라우저 개발자 도구(F12) → 콘솔 탭에서 `localStorage.removeItem('dpws3')` 입력 후 F5 새로고침 |
| "사이드바 동기화", "sidebar sync", "사이드바 갱신" | `python scripts/sync_sidebar.py` 실행 → projects/ 폴더 스캔 후 webview/_sidebar.md 프로젝트 섹션 1회 동기화 |
| 가이드·문서 .md 파일 신규 생성 시 (guides/, history/, templates/deliverables/ 등 사이드바 노출 대상) | ① 파일 상단에 메타데이터 자동 추가 `<!-- sidebar_title: {표시명}\nsidebar_order: {순서}\n-->` (가이드면 가이드 섹션 마지막 order, 히스토리면 최신 1번) → ② `python scripts/generate_sidebar.py` 실행 → ③ 사이드바 반영 확인 (`grep` 등으로) → ④ 사용자에게 반영 결과 보고 |
| "사이드바 감시 시작", "sidebar watch", "자동 동기화 시작" | 백그라운드로 `python scripts/sync_sidebar.py --watch` 실행 → projects/ 폴더 감시 시작, md 파일 추가·삭제 시 _sidebar.md 자동 갱신 (watchdog 필요: `pip install watchdog`) |
| "MCP 등록", "mcp 등록", "MCP 서버 등록" 뉘앙스 | {assistant}가 MCP 등록 절차 실행 → 서버 이름·전송 방식·실행 명령·환경변수 순서대로 수집 → `claude mcp add` 실행 → `claude mcp list` 확인 → 프로젝트 CLAUDE.md에 등록 정보 기록 |
| "MCP 목록", "MCP 확인", "등록된 MCP" 뉘앙스 | `claude mcp list` 실행 후 결과 출력 |
| "MCP 삭제", "MCP 제거" 뉘앙스 | 삭제할 서버 이름 확인 → `claude mcp remove {서버이름}` 실행 → 프로젝트 CLAUDE.md MCP 등록 정보 제거 |