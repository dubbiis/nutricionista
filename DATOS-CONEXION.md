# Datos de Conexión - dubbiis

## GitHub

- **Usuario:** `dubbiis`
- **Email:** `dagarmar92@gmail.com`
- **Perfil:** https://github.com/dubbiis
- **gh CLI:** instalado y autenticado (`gh auth login` ya hecho, protocolo HTTPS)

## Configuración Git global

```bash
git config --global user.name "dubbiis"
git config --global user.email "dagarmar92@gmail.com"
```

## Nutricionista

- **Repo:** https://github.com/dubbiis/nutricionista.git
- **Autodeploy:** http://185.158.132.130:3000/api/deploy/dcdfdc055c2e288c52f03b7f47c8158c9524234a6f208440

---

## Repositorios activos

| Proyecto | Repositorio | Producción |
|---------|------------|-----------|
| WetFish (TPV acuariofilia) | https://github.com/dubbiis/wetfish.git | https://desarrollos-wetfish.o28eg0.easypanel.host |
| Mecanic (CRM taller) | https://github.com/dubbiis/mecanic.git | https://desarrollos-mecanic.o28eg0.easypanel.host |

## Flujo de deploy

```
git add . && git commit -m "mensaje en español" && git push origin master
→ Webhook → EasyPanel reconstruye Dockerfile → Deploy automático
```

- **Rama principal:** `master` (en todos los proyectos)
- **CI/CD:** No hay GitHub Actions. Solo webhook de EasyPanel.
- **No hacer force push a master.**

## EasyPanel

- **Panel:** https://easypanel.io (o28eg0)
- **Deploy:** automático al hacer push a `master`
- **Stack en producción:** PHP 8.4-cli + Node via Dockerfile
- **BD producción:** MySQL 8.x
- **BD local:** SQLite (por defecto en `.env.example`)
