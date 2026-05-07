"""
deploy_record.py
----------------
배포 내역을 _manage/deployments.md에 기록하고 Confluence 동기화.

사용법:
    python guides/scripts/deploy_record.py --project projects/{프로젝트명} --version v1.0.0 --env 운영
"""

import argparse
import subprocess
import sys
from datetime import datetime
from pathlib import Path


def append_deployment(
    project_path: Path,
    version: str,
    environment: str,
    changes: str,
    deployer: str,
    result: str,
    note: str,
) -> int:
    """
    deployments.md에 배포 내역 추가.

    Returns:
        생성된 배포 ID
    """
    deploy_file = project_path / "_manage" / "deployments.md"
    if not deploy_file.exists():
        print(f"오류: deployments.md 없음 → {deploy_file}")
        sys.exit(1)

    content = deploy_file.read_text(encoding="utf-8")
    data_lines = [
        l for l in content.splitlines()
        if l.startswith("|") and "---|" not in l and not l.startswith("| ID")
    ]
    next_id = len(data_lines) + 1
    deploy_dt = datetime.now().strftime("%Y-%m-%d %H:%M")
    new_row = f"| {next_id} | {version} | {deploy_dt} | {environment} | {changes} | {deployer} | {result} | {note} |"

    deploy_file.write_text(content.rstrip() + "\n" + new_row + "\n", encoding="utf-8")
    print(f"  ✓ 배포 내역 기록 완료 (ID: {next_id})")
    return next_id


def main() -> None:
    parser = argparse.ArgumentParser(description="deploy_record: 배포 내역 기록")
    parser.add_argument("--project", default=".", help="프로젝트 루트 경로")
    parser.add_argument("--version", required=True, help="배포 버전 (예: v1.0.0)")
    parser.add_argument("--env", required=True, choices=["개발", "스테이징", "운영"], help="배포 환경")
    parser.add_argument("--changes", default="", help="변경 내용")
    parser.add_argument("--deployer", default="", help="담당자")
    parser.add_argument("--result", default="성공", choices=["성공", "실패", "롤백"], help="결과")
    parser.add_argument("--note", default="", help="비고")
    parser.add_argument("--sync", action="store_true", help="기록 후 Confluence 동기화")
    args = parser.parse_args()

    project_path = Path(args.project).resolve()
    if not project_path.exists():
        print(f"오류: 경로 없음 → {project_path}")
        sys.exit(1)

    print(f"배포 내역 기록 → {args.version} / {args.env}")
    append_deployment(
        project_path,
        version=args.version,
        environment=args.env,
        changes=args.changes,
        deployer=args.deployer,
        result=args.result,
        note=args.note,
    )

    if args.sync:
        wiki_sync = Path(__file__).parent / "wiki_sync.py"
        subprocess.run(
            [sys.executable, str(wiki_sync), "--project", str(project_path), "--files", "deployments.md"],
            check=True,
        )

    print("완료!")


if __name__ == "__main__":
    main()
