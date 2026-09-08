"""Package Git-visible source and deployment changes without local secrets or build caches."""
import argparse
from pathlib import Path
import subprocess
import tarfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('project', type=Path)
parser.add_argument('output', type=Path)
args = parser.parse_args()
root = args.project.resolve()
files = subprocess.check_output(['git', '-c', f'safe.directory={root.as_posix()}', '-C', str(root), 'ls-files', '--cached', '--others', '--exclude-standard', '-z']).decode().split('\0')
args.output.parent.mkdir(parents=True, exist_ok=True)
count = 0
with tarfile.open(args.output, 'w:gz') as archive:
    for name in sorted(set(files)):
        if not name:
            continue
        relative = Path(name)
        if any(part in {'node_modules', '.next', '.git', '.turbo', 'out', 'tools', 'documentacion', 'backups', 'respaldos'} or part.startswith('.env') for part in relative.parts):
            continue
        if relative.name in {'data.txt', 'access.json'} or relative.suffix in {'.log', '.gz', '.zip', '.tar'}:
            continue
        source = root / relative
        if source.is_file() and not source.is_symlink() and source.resolve().is_relative_to(root):
            archive.add(source, arcname=relative.as_posix(), recursive=False)
            count += 1
print(f'Packaged {count} files; archive bytes={args.output.stat().st_size}')
