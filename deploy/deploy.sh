#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if [ -d .git ]; then
  git fetch origin
  git pull --ff-only origin "$(git symbolic-ref --short HEAD)"
fi
docker build -t portfolio:local .
docker compose -f docker-compose.prod.yml up -d --no-build --wait --wait-timeout 90
curl --fail --silent --show-error http://127.0.0.1:8090/ >/dev/null
echo 'Portfolio disponible en 127.0.0.1:8090'
