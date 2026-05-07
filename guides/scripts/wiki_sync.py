"""
wiki_sync.py
------------
프로젝트 _manage/ 폴더 내 md 파일을 Confluence 페이지로 동기화.

사용법:
    python guides/scripts/wiki_sync.py --project projects/{프로젝트명}

환경변수 (프로젝트 source/.env 또는 시스템):
    CONFLUENCE_URL          - Confluence 서버 URL
    CONFLUENCE_USERNAME     - 사용자 이메일
    CONFLUENCE_API_TOKEN    - API 토큰
"""

import argparse
import os
import sys
from pathlib import Path

import markdown
import requests
from dotenv import load_dotenv


PAGE_TITLE_MAP = {
    "todo.md":        "To-Do",
    "issues.md":      "이슈 관리",
    "defects.md":     "결함 관리",
    "deployments.md": "배포 내역",
    "decisions.md":   "의사결정 로그",
    "changelog.md":   "변경 이력",
}


def load_env(project_path: Path) -> None:
    """프로젝트 .env 로드."""
    env_file = project_path / "source" / ".env"
    if env_file.exists():
        load_dotenv(env_file)


def load_wiki_config(project_path: Path) -> dict:
    """
    _manage/wiki_config.md 에서 설정 파싱.

    Returns:
        {USER_NAME, WIKI_ROOT_PAGE_ID, CONFLUENCE_SPACE_KEY}
    """
    config_file = project_path / "_manage" / "wiki_config.md"
    if not config_file.exists():
        raise FileNotFoundError(f"wiki_config.md 없음: {config_file}")

    config = {}
    for line in config_file.read_text(encoding="utf-8").splitlines():
        if ":" in line and not line.startswith("#"):
            key, _, value = line.partition(":")
            config[key.strip()] = value.strip()
    return config


def md_to_html(md_content: str) -> str:
    """Markdown → Confluence Storage Format HTML 변환."""
    return markdown.markdown(md_content, extensions=["tables", "fenced_code", "nl2br"])


def get_page_id(base_url: str, space_key: str, title: str, auth: tuple) -> str | None:
    """Confluence 페이지 ID 조회."""
    resp = requests.get(
        f"{base_url}/rest/api/content",
        params={"spaceKey": space_key, "title": title, "expand": "version"},
        auth=auth,
    )
    resp.raise_for_status()
    results = resp.json().get("results", [])
    return results[0]["id"] if results else None


def create_page(base_url: str, space_key: str, parent_id: str, title: str, html: str, auth: tuple) -> str:
    """Confluence 페이지 신규 생성."""
    resp = requests.post(
        f"{base_url}/rest/api/content",
        json={
            "type": "page",
            "title": title,
            "space": {"key": space_key},
            "ancestors": [{"id": parent_id}],
            "body": {"storage": {"value": html, "representation": "storage"}},
        },
        auth=auth,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def update_page(base_url: str, page_id: str, title: str, html: str, auth: tuple) -> None:
    """기존 Confluence 페이지 업데이트."""
    resp = requests.get(f"{base_url}/rest/api/content/{page_id}?expand=version", auth=auth)
    resp.raise_for_status()
    version = resp.json()["version"]["number"]

    requests.put(
        f"{base_url}/rest/api/content/{page_id}",
        json={
            "version": {"number": version + 1},
            "title": title,
            "type": "page",
            "body": {"storage": {"value": html, "representation": "storage"}},
        },
        auth=auth,
    ).raise_for_status()


def sync_file(project_path: Path, filename: str, base_url: str, space_key: str, root_id: str, auth: tuple) -> None:
    """단일 md 파일 → Confluence 동기화."""
    md_file = project_path / "_manage" / filename
    if not md_file.exists():
        print(f"  건너뜀: {filename}")
        return

    title = PAGE_TITLE_MAP.get(filename, filename.replace(".md", ""))
    html = md_to_html(md_file.read_text(encoding="utf-8"))
    page_id = get_page_id(base_url, space_key, title, auth)

    if page_id:
        update_page(base_url, page_id, title, html, auth)
        print(f"  ✓ 업데이트: {title}")
    else:
        create_page(base_url, space_key, root_id, title, html, auth)
        print(f"  ✓ 신규 생성: {title}")


def main() -> None:
    parser = argparse.ArgumentParser(description="wiki_sync: _manage/ → Confluence 동기화")
    parser.add_argument("--project", required=True, help="프로젝트 루트 경로")
    parser.add_argument("--files", nargs="*", default=list(PAGE_TITLE_MAP.keys()), help="동기화 파일 목록")
    args = parser.parse_args()

    project_path = Path(args.project).resolve()
    if not project_path.exists():
        print(f"오류: 경로 없음 → {project_path}")
        sys.exit(1)

    load_env(project_path)

    confluence_url = os.environ.get("CONFLUENCE_URL", "").rstrip("/")
    username = os.environ.get("CONFLUENCE_USERNAME", "")
    api_token = os.environ.get("CONFLUENCE_API_TOKEN", "")

    if not all([confluence_url, username, api_token]):
        print("오류: CONFLUENCE_URL / USERNAME / API_TOKEN 환경변수를 확인하세요.")
        sys.exit(1)

    config = load_wiki_config(project_path)
    root_id = config.get("WIKI_ROOT_PAGE_ID", "")
    space_key = config.get("CONFLUENCE_SPACE_KEY", "")

    if not root_id or not space_key:
        print("오류: _manage/wiki_config.md 에서 WIKI_ROOT_PAGE_ID, CONFLUENCE_SPACE_KEY를 입력하세요.")
        sys.exit(1)

    auth = (username, api_token)
    print(f"동기화 시작 → {project_path.name}")
    for filename in args.files:
        sync_file(project_path, filename, confluence_url, space_key, root_id, auth)
    print("\n완료!")


if __name__ == "__main__":
    main()
