# Despliegue automático del portfolio con `alemus`

Cada push a `master` construye la imagen en GitHub Actions y actualiza únicamente el servicio `web` del proyecto Compose `portfolio`. Escucha en `127.0.0.1:8090` del VPS. El flujo no modifica Nginx, VzCall ni otros contenedores.

## 1. Comprobar el acceso actual

Desde PowerShell, usar la conexión que ya funciona en esta PC:

```powershell
ssh -p 60000 alemus@192.141.169.14
```

Dentro del VPS, comprobar la ruta real y Docker:

```bash
id -un
printf '%s\n' "$HOME"
docker compose version
docker ps --filter name=portfolio --format '{{.Names}} {{.Image}} {{.Status}}'
ls -ld "$HOME/portfolio-release"
```

Si la carpeta no existe, crearla con `mkdir -p "$HOME/portfolio-release"`. Usar su ruta absoluta como `VPS_DEPLOY_DIR`, por ejemplo `/home/alemus/portfolio-release`. No mover ni borrar la carpeta antigua hasta verificar el primer despliegue. Si `docker compose` falla por permisos, hay que habilitar a `alemus` para usar Docker en el VPS antes de activar el workflow.

## 2. Clave dedicada para GitHub Actions

La clave que ya usa esta PC sirve para **instalar** una clave nueva sin conocer la contraseña de `alemus`. En PowerShell:

```powershell
ssh-keygen -t ed25519 -f "$HOME\.ssh\portfolio_github_actions" -C "portfolio-github-actions"
Get-Content "$HOME\.ssh\portfolio_github_actions.pub" |
  ssh -p 60000 alemus@192.141.169.14 'umask 077; mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys'
ssh -i "$HOME\.ssh\portfolio_github_actions" -p 60000 alemus@192.141.169.14 'docker compose version'
```

Dejar vacía la frase de contraseña de esta clave de automatización. La clave privada no se sube al repositorio. Si el último comando falla, corregir el acceso SSH antes de seguir.

## 3. Secretos en GitHub

Verificar la huella SSH del VPS por un canal de confianza y guardar su entrada completa para `[192.141.169.14]:60000` como `VPS_KNOWN_HOSTS`. No desactivar la verificación de la clave del servidor.

En GitHub, crear el environment `production` y cargar estos secretos allí:

| Secreto | Valor |
|---|---|
| `VPS_HOST` | `192.141.169.14` |
| `VPS_PORT` | `60000` |
| `VPS_USER` | `alemus` |
| `VPS_DEPLOY_DIR` | Ruta absoluta comprobada, por ejemplo `/home/alemus/portfolio-release` |
| `VPS_SSH_KEY` | Contenido completo de `portfolio_github_actions`, sin `.pub` |
| `VPS_KNOWN_HOSTS` | Entrada verificada de la clave pública SSH del servidor |

## 4. Probar el primer despliegue

Hacer commit del workflow y de `docker-compose.prod.yml`, subirlos a `master` y revisar **GitHub → Actions → Deploy portfolio**. El job debe construir, transferir y activar la imagen. Después, comprobar `http://127.0.0.1:8090/` desde el VPS y el sitio público. Si Nginx ya apunta a ese puerto, no requiere cambios.

También se puede iniciar manualmente desde **Actions → Deploy portfolio → Run workflow**. El workflow no borra imágenes antiguas; la limpieza específica del portfolio se añadirá después de verificar un despliegue completo.

VzCall necesita su propio repositorio, ruta, Compose y puerto para configurar un flujo separado. Este repositorio solo contiene el enlace público a VzCall.
