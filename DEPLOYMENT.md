# Portfolio y Beacon: activación en el VPS

> Para el despliegue automático actual del Portfolio con el usuario `alemus`, seguir [deploy/GITHUB_ACTIONS.md](deploy/GITHUB_ACTIONS.md). Las instrucciones de Beacon de este documento son históricas y deben verificarse en su propio repositorio antes de usarlas. VzCall no se despliega desde este repositorio.

## Direcciones preparadas

| Proyecto | Carpeta del VPS | Acceso local | Dominio propuesto |
|---|---|---|---|
| Portfolio | `/home/alemus/portfolio-release` (verificar en VPS) | `127.0.0.1:8090` | `adelemus.com`, `www.adelemus.com` |
| Beacon | `/home/deploy-mobeela/beacon-release` | `127.0.0.1:8091` | `beacon.adelemus.com` |

El dominio se tomó del código de Portfolio. Confirmar los nombres antes de activar DNS y editar `deploy/nginx.host.conf` si se usarán otros. Los servicios existentes de Mobeela y MCW conservan sus puertos y configuración.

## 1. Entrar y revisar

Desde PowerShell:

```powershell
ssh -p 60000 alemus@192.141.169.14
```

En el VPS, revisar antes de volver a construir:

```bash
df -h /
docker ps
```

Las compilaciones deben ser secuenciales. No usar limpieza global de Docker ni eliminar volúmenes de otros proyectos. Si los contenedores ya están saludables, pasar al paso 3.

## 2. Arranque inicial o actualización

Portfolio:

```bash
cd /home/alemus/portfolio-release
sh deploy/deploy.sh
```

Beacon, **solo la primera vez y si `.env.production` no existe**:

```bash
cd /home/deploy-mobeela/beacon-release
python3 deploy/prepare-env.py --url http://localhost:8091
```

Después, para construir, migrar y arrancar:

```bash
sh deploy/deploy.sh
```

El script genera Prisma durante el build y ejecuta `prisma migrate deploy`; no ejecuta `migrate dev`, reset ni seed de demostración. La aplicación usa `beacon_app`, que no es superusuario ni propietario de las tablas, para que se apliquen las políticas RLS. El usuario `beacon_owner` se reserva para inicialización y migraciones. Redis no se levanta porque el código actual no lo utiliza.

El generador de secretos no sobrescribe archivos existentes. Si hay que cambiar la URL, editar solo `NEXTAUTH_URL` y conservar las contraseñas. Cambiar una variable de contraseña no cambia automáticamente la contraseña de una base ya creada.

## 3. Probar sin cambiar DNS

En otra ventana local:

```powershell
ssh -N -p 60000 -L 8090:127.0.0.1:8090 alemus@192.141.169.14
```

Abrir `http://localhost:8090`, incluyendo `/blog/ejemplo/`, y `http://localhost:8091/login`. La salud de Beacon se consulta en `/api/health`. Crear la primera empresa y su administrador desde `/registro`; no hay credenciales demo preinstaladas. Verificar acceso a Dashboard y creación de un prospecto.

## 4. Instalar las rutas de Nginx

Este paso requiere una cuenta administradora con sudo. **`deploy-mobeela` no tiene sudo sin contraseña**; no usar Docker para modificar archivos del host con privilegios.

Desde una sesión administradora en el mismo VPS:

```bash
sudo install -m 644 /home/alemus/portfolio-release/deploy/nginx.host.conf /etc/nginx/sites-available/portfolio
sudo install -m 644 /home/deploy-mobeela/beacon-release/deploy/nginx.host.conf /etc/nginx/sites-available/beacon
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo ln -s /etc/nginx/sites-available/beacon /etc/nginx/sites-enabled/beacon
sudo nginx -t && sudo systemctl reload nginx
```

Si los archivos o enlaces ya existen, comparar su contenido antes de reemplazarlos. No tocar el sitio `mobeela`. Si la validación falla, corregir las nuevas configuraciones antes de recargar. En actualizaciones futuras no volver a copiar estos archivos sobre una configuración HTTPS que Certbot ya haya modificado.

## 5. Apuntar el dominio y subdominio

En el proveedor DNS de `adelemus.com`, crear o actualizar:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `192.141.169.14` |
| A | `www` | `192.141.169.14` |
| A | `beacon` | `192.141.169.14` |

Usar TTL 300 si el proveedor lo permite. Si existe un CNAME con uno de esos nombres, sustituirlo; no mantener registros incompatibles. Revisar los AAAA que pudieran enviar usuarios al servidor anterior. Conservar MX y TXT de correo. Si se usa Cloudflare, el modo solo DNS simplifica la primera emisión del certificado.

Comprobar desde PowerShell:

```powershell
Resolve-DnsName adelemus.com -Type A
Resolve-DnsName www.adelemus.com -Type A
Resolve-DnsName beacon.adelemus.com -Type A
```

## 6. Activar HTTPS

Cuando los tres nombres resuelvan al VPS, con la cuenta administradora:

```bash
sudo certbot --nginx -d adelemus.com -d www.adelemus.com --redirect
sudo certbot --nginx -d beacon.adelemus.com --redirect
sudo nginx -t
sudo certbot renew --dry-run
```

Certbot ya está instalado en el VPS. Puede pedir correo y aceptación de términos. Si falla la emisión, comprobar DNS, registros AAAA, CAA si existen y llegada de HTTP/HTTPS al host.

## 7. Fijar la URL pública de Beacon

Como `deploy-mobeela`:

```bash
cd /home/deploy-mobeela/beacon-release
nano .env.production
```

Cambiar únicamente:

```dotenv
NEXTAUTH_URL=https://beacon.adelemus.com
```

Recrear solo la aplicación:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --no-build --wait web
```

Abrir ambos sitios por HTTPS y probar registro/login en Beacon. El túnel HTTP sirve para la fase privada; después del cambio usar el dominio HTTPS para la autenticación.

## Actualizaciones y respaldo

Los repositorios locales tienen cambios de despliegue pendientes de commit. Revisarlos, hacer commit/push y transferir la versión nueva antes de ejecutar los scripts. `package-project.py` empaqueta los archivos visibles de Git (incluidos nuevos archivos no ignorados) excluyendo secretos y cachés. Los paquetes del VPS no incluyen `.git`; si se usa un clone, los scripts sincronizan con avance rápido antes de construir.

Antes de nuevas migraciones de Beacon, respaldar su PostgreSQL. Conservar `.env.production` y el volumen `beacon-prod_beacon-data`. Nunca ejecutar `docker compose down -v` para actualizar. Reiniciar la imagen anterior no revierte una migración de base de datos.

Referencias: [salida standalone de Next.js](https://nextjs.org/docs/14/app/api-reference/next-config-js/output) y [proxy HTTP de Nginx](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass).
