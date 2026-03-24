# Nutricionista

Constructor de informes nutricionales para pacientes. El nutricionista rellena un formulario con indicaciones alimentarias, suplementación, estrategias de salud y parámetros analíticos, y genera un PDF personalizado.

## Stack

- **Backend:** Laravel 12 + Inertia.js
- **Frontend:** React 19 + shadcn/ui + animate-ui
- **CSS:** Tailwind CSS v4
- **Build:** Vite 6
- **Auth:** Laravel Breeze
- **Deploy:** Docker + EasyPanel

## Instalación local

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
```

## Desarrollo

```bash
# En dos terminales:
php artisan serve
npm run dev
```

## Funcionalidades

- Gestión de pacientes (crear, buscar, editar)
- Formulario de informe nutricional con secciones:
  - Estrategias Horméticas y Basadas en Evidencia
  - Indicaciones por categoría de alimento (20+ secciones)
  - Licuados
  - Suplementación habitual y específica (500+ productos)
  - Parámetros Analítica
  - Referencias Bibliográficas
- Generador de tablas de alimentos (130+ categorías, 500+ alimentos)
- Gestor de configuraciones (guardar/cargar plantillas)
- Generación de PDF

## Deploy

Push a `master` → EasyPanel reconstruye automáticamente via webhook.

```bash
git push origin master
```

**Producción:** https://desarrollos-nutri.o28eg0.easypanel.host
