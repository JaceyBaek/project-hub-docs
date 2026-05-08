# 연결 설정 흐름 (Confluence / Miso)

## 구조 원칙

| 구분 | 저장 위치 | 대상 |
|---|---|---|
| 공통 연결 정보 | 시스템 환경변수 (Machine) | `CONFLUENCE_URL`, `CONFLUENCE_API_TOKEN`, `MISO_API_URL`, `MISO_API_KEY` |
| 프로젝트 고유 설정 | 프로젝트 `source/.env` | 페이지 ID, 앱 식별자 등 프로젝트별 상이한 값 |

- 공통 연결 정보는 **최초 1회만** 시스템 환경변수로 등록 → 이후 모든 프로젝트에서 자동 적용
- `load_dotenv()`는 기존 환경변수를 override하지 않으므로 코드 변경 없이 동작

---

## 최초 설정 (공통 연결 정보 — PC당 1회)

Confluence 또는 Miso 최초 연결 요청 시 {assistant}가 아래 순서로 정보 수집 → 시스템 환경변수 등록 → 연결 테스트 실행.

### Confluence

1. Confluence URL을 알려주세요.
   - 예시: `https://wiki.gsretail.com/`

2. Confluence API Token을 알려주세요.
   - 확인 방법: Confluence 로그인 → 우측 상단 프로필 → 설정 → Personal Access Tokens → 토큰 생성

### Miso

3. Miso API URL을 알려주세요.
   - 예시: `https://api.ax.gsretail.com/ext/v1/chat` (`/chat`까지 포함한 전체 URL)

4. Miso API Key를 알려주세요.
   - 확인 방법: Miso 앱 → 앱 공유하기 → 다른 서비스와 연결하기 → 비밀키 (없으면 API 키 생성)
   - 예시: `app-xxxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ 목록에 표시되는 키는 마스킹된 값으로 재사용할 수 없습니다. 키 생성 시 팝업에 표시되는 원본 키를 즉시 복사하여 안전한 곳에 보관하세요.

---

## 규칙

- 수집 순서: Confluence 완료 후 → Miso 수집 (서비스별 분리)
- 공통 연결 정보 수집 후 비서가 직접 `setx ... /M` 명령으로 시스템 환경변수 등록
- 시스템 환경변수 등록 후 새 터미널에서 연결 테스트 실행 (현재 세션에는 즉시 반영 안 됨)
- 프로젝트 고유 설정만 해당 프로젝트 `source/.env`에 저장
- `.env.example`은 공통 항목은 주석으로 안내, 고유 항목은 항목명만 포함 (값 없음)
- Miso 사용자 식별자: 질문하지 않고 `config.yml`의 `project_name` 자동 사용
