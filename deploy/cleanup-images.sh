#!/usr/bin/env bash
set -euo pipefail

repo=${1:?Indicar el repositorio de imagen}
keep=${2:-3}
mode=${3:-apply}

case "$repo" in portfolio|beacon-web|beacon-migrate) ;; *) echo "Repositorio no permitido: $repo" >&2; exit 2 ;; esac
[[ "$keep" =~ ^[1-9][0-9]*$ ]] || { echo 'La cantidad a conservar debe ser positiva' >&2; exit 2; }
[[ "$mode" == apply || "$mode" == --dry-run ]] || { echo 'Modo no válido' >&2; exit 2; }

mapfile -t images < <(
  while IFS= read -r image; do
    [[ "$image" =~ ^${repo}:[0-9a-f]{40}$ ]] || continue
    printf '%s %s\n' "$(docker image inspect --format '{{.Created}}' "$image")" "$image"
  done < <(docker image ls "$repo" --format '{{.Repository}}:{{.Tag}}') | sort -r | awk '{print $2}'
)

for index in "${!images[@]}"; do
  image=${images[$index]}
  if (( index < keep )); then
    echo "Conservar reciente: $image"
    continue
  fi
  if [[ -n "$(docker ps -a -q --filter "ancestor=$image")" ]]; then
    echo "Conservar en uso: $image"
    continue
  fi
  if [[ "$mode" == --dry-run ]]; then
    echo "Eliminaría: $image"
  else
    docker image rm "$image"
  fi
done
