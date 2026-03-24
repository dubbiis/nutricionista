# Directrices Globales — Dubi

> Estas reglas aplican a TODOS los proyectos. Cada proyecto puede tener su propio `CLAUDE.md` con directrices específicas adicionales.

---

## Idioma

- **Responder siempre en español.** El usuario habla español.
- UI visible al usuario: **en español**
- Commits: **en español**, descriptivos

---

## Documentación Obligatoria

### README.md siempre actualizado
**Cada vez que se añada, modifique o elimine funcionalidad, rutas, modelos, componentes o configuración, actualizar `README.md` en el mismo commit.** El README es la fuente de verdad del estado actual del proyecto.

### CLAUDE.md por proyecto
Cada proyecto debe tener su propio `CLAUDE.md` en la raíz con:
- Stack técnico y versiones
- Arquitectura y decisiones clave
- Modelo de datos con campos
- Rutas completas
- Trampas conocidas / errores resueltos que pueden volver
- Variables de entorno
- Credenciales de desarrollo
- Comandos frecuentes
- Flujos principales de la aplicación
- Archivos clave de configuración con explicación de por qué importan

**El CLAUDE.md debe ser tan completo que otra IA pueda continuar el proyecto sin contexto previo.**

### Logs y depuración
**Siempre dejar logs informativos** en scripts de arranque, procesos críticos y puntos de error. En scripts bash usar `echo`. En PHP usar `Log::info()` / `Log::error()`. En JS usar `console.log()` en desarrollo. El objetivo es poder diagnosticar errores rápido mirando los logs.

---

## Trampas Documentadas

Cuando se resuelve un error que costó tiempo diagnosticar, **documentarlo en la sección "Trampas Conocidas" del CLAUDE.md del proyecto.** Formato:

```
### N. Título corto
Descripción del problema, por qué pasa, y cómo se resolvió.
```

Esto evita que la próxima IA (o persona) pierda el mismo tiempo.

---

## Inicio de Proyecto Nuevo

Cuando el usuario empiece una conversación nueva sin contexto de proyecto, seguir este flujo en orden:

1. **Leer `DATOS-CONEXION.md`** en el directorio de trabajo para obtener usuario de GitHub y URLs relevantes.
2. **Pedir la URL de autodeploy** al usuario: _"Pásame la URL de autodeploy"_
3. **Pedir el nombre del repositorio** y crearlo en GitHub con `gh repo create`.
4. **Inicializar git** en el directorio local, hacer primer commit y push.
5. **Preguntar qué quiere desarrollar**: _"Cuéntame el proyecto"_
6. Con la información del proyecto, **crear el `CLAUDE.md` específico** del proyecto antes de escribir ningún código. Ese CLAUDE.md debe incluir el stack completo (tomando como base el Stack Preferido de este archivo), arquitectura, modelo de datos, rutas y todo lo necesario para que otra IA pueda continuar sin contexto previo.

---

## Git y Deploy

- No hacer force push a ramas principales (master/main)
- Commits descriptivos en español
- Cada commit que cambie funcionalidad debe actualizar README.md
- Preferir commits atómicos (un cambio lógico por commit)
- **Subir al repo después de cada cambio.** Todo lo que se modifique en el proyecto se sube a GitHub en el mismo momento.

---

## Estilo de Trabajo

- **No preguntar si puede hacer algo obvio.** Si la tarea está clara, hacerla directamente.
- **Si necesita preguntas, hacerlas todas juntas**, no de una en una.
- **Respuestas concisas.** No repetir lo que el usuario dijo. No poner resúmenes largos al final.
- **Si algo falla, mostrar el error y proponer solución.** No decir solo "ha fallado".
- **No usar CSS inline** salvo que sea estrictamente necesario. Todo el estilo va con clases de Tailwind.
- **Todo debe tener animaciones y efectos.** Usar Framer Motion y animate-ui en todos los componentes: transiciones de página, hover, aparición de elementos, modales, listas, botones, etc. La app debe sentirse viva y fluida.

---

## Stack Preferido (Proyectos Web)

Cuando se cree un proyecto web nuevo sin especificar stack, usar por defecto:

| Capa | Tecnología |
|------|-----------|
| Backend | Laravel (última versión estable) |
| Frontend reactivo | Livewire |
| CSS | Tailwind CSS |
| Build | Vite |
| Auth | Laravel Breeze |
| Deploy | Docker + EasyPanel |
| BD producción | MySQL |
| BD local | SQLite |

**Alpine.js viene inyectado por Livewire — NUNCA importarlo manualmente.**

---
---

# Nutricionista — CLAUDE.md del Proyecto

> Constructor de informes nutricionales para pacientes. El nutricionista rellena un formulario con indicaciones, suplementación, tablas de alimentos, etc. y genera un PDF personalizado para el paciente.

---

## Stack Técnico

| Capa | Tecnología | Versión | Motivo |
|------|-----------|---------|--------|
| Backend | Laravel | 12 | Framework PHP |
| Bridge | Inertia.js | 2.x | Conecta Laravel con React sin API REST |
| Frontend | React | 19 | Requerido por animate-ui/shadcn |
| Animaciones | Framer Motion | 12.x | Requerido por animate-ui |
| CSS | Tailwind CSS | 4 | Requerido por shadcn |
| Componentes | shadcn/ui + animate-ui | latest | Sistema de componentes con animaciones |
| Build | Vite | 6 | Bundler con laravel-vite-plugin |
| Auth | Laravel Breeze (Inertia/React) | latest | Autenticación |
| Deploy | Docker + EasyPanel | — | Webhook automático al push a master |
| BD producción | MySQL 8.x | — | EasyPanel |
| BD local | SQLite | — | Desarrollo |

**Referencia de configuración shadcn/animate-ui:** ver `shadcn_animate ui.md` en la raíz del proyecto.

---

## Arquitectura

```
nutri/
├── CLAUDE.md                    # Este archivo
├── DATOS-CONEXION.md            # Credenciales (en .gitignore)
├── shadcn_animate ui.md         # Referencia config shadcn/animate-ui
├── docs/documentacion.pdf       # Capturas de la app original (Google Apps Script)
├── Dockerfile                   # Deploy EasyPanel
├── app/
│   ├── Http/Controllers/
│   │   ├── PatientController.php
│   │   ├── ReportController.php
│   │   ├── CatalogController.php
│   │   └── FoodTableController.php
│   ├── Http/Middleware/
│   │   └── HandleInertiaRequests.php
│   ├── Models/
│   │   ├── Patient.php
│   │   ├── Report.php
│   │   ├── CatalogItem.php
│   │   ├── ReportSelection.php
│   │   ├── FoodCategory.php
│   │   ├── Food.php
│   │   ├── ReportFoodAction.php
│   │   └── Configuration.php
│   └── Services/
│       └── PdfGenerator.php
├── database/
│   ├── migrations/
│   └── seeders/                 # Datos predefinidos (catálogos, alimentos)
├── resources/
│   ├── css/app.css
│   ├── js/
│   │   ├── app.jsx              # Entry React/Inertia
│   │   ├── Pages/
│   │   │   ├── Auth/            # Login/Register (Breeze)
│   │   │   ├── Dashboard.jsx    # Página principal con el formulario
│   │   │   └── Reports/
│   │   │       ├── Create.jsx   # Formulario de informe
│   │   │       ├── Edit.jsx     # Editar informe existente
│   │   │       └── Show.jsx     # Vista previa / PDF
│   │   ├── Components/
│   │   │   ├── PatientSearch.jsx
│   │   │   ├── PatientForm.jsx
│   │   │   ├── ReportForm/
│   │   │   │   ├── PersonalData.jsx
│   │   │   │   ├── ReportData.jsx
│   │   │   │   ├── StrategySection.jsx
│   │   │   │   ├── FoodIndicationsSection.jsx
│   │   │   │   ├── SupplementSection.jsx
│   │   │   │   ├── AnalyticsSection.jsx
│   │   │   │   └── ReferencesSection.jsx
│   │   │   ├── FoodTableGenerator/
│   │   │   │   ├── CategorySearch.jsx
│   │   │   │   ├── FoodSearch.jsx
│   │   │   │   └── ActionList.jsx
│   │   │   ├── ConfigManager.jsx
│   │   │   └── SideNav.jsx
│   │   ├── components/ui/       # shadcn base
│   │   ├── components/animate-ui/
│   │   ├── lib/utils.js
│   │   └── hooks/
│   └── views/
│       └── app.blade.php
├── routes/web.php
├── components.json              # Config shadcn + registro animate-ui
├── jsconfig.json                # Aliases @ para shadcn CLI
└── public/
```

### Decisiones clave

- **Inertia.js** en vez de Livewire: necesitamos React para shadcn/animate-ui.
- **Formulario como SPA**: toda la creación del informe es una sola página React con navegación por secciones (scroll/anclas), no multipágina.
- **Catálogos en BD con seeders**: las opciones de los desplegables se almacenan en BD y se cargan con seeders. Esto permite editarlas sin tocar código.
- **PDF server-side**: Laravel genera el PDF (DomPDF o Snappy), no el navegador.

---

## Modelo de Datos

### patients
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| name | string | |
| surname | string | |
| email | string nullable | |
| visit_count | integer default 0 | Nº de visitas previas |
| created_at | timestamp | |
| updated_at | timestamp | |

### reports
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| patient_id | FK patients | |
| pathology | text nullable | Texto libre |
| gender | enum(masculino,femenino) | |
| recipient | enum(entrevistado,no_entrevistado) | Destinatario |
| notes | text nullable | Anotaciones libres |
| ai_menu_enabled | boolean default false | Petición IA: menú semanal |
| created_at | timestamp | |
| updated_at | timestamp | |

### catalog_sections
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| slug | string unique | ej: `estrategias_hormeticas`, `indicaciones_pescados`, `suplementacion` |
| name | string | Nombre visible |
| group | string | Agrupación: `estrategias`, `indicaciones`, `licuados`, `suplementacion`, `analitica`, `referencias` |
| sort_order | integer | Orden en el formulario |

### catalog_items
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| catalog_section_id | FK catalog_sections | |
| label | string | Texto de la opción |
| sort_order | integer | |

### report_selections (pivot)
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| report_id | FK reports | |
| catalog_item_id | FK catalog_items | |

### food_categories
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| name | string | ej: "RICOS EN HIERRO", "ANTIINFLAMATORIOS" |
| sort_order | integer | |

### foods
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| name | string | ej: "aguacate" |
| food_type | string | ej: "Fruta", "Pescado Azul", "Verduras y hortalizas" |
| sort_order | integer | |

### report_food_actions
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| report_id | FK reports | |
| source_type | enum(category,food) | Si viene de categoría o alimento individual |
| source_id | bigint | FK a food_categories o foods según source_type |
| frequency | enum(sin_cambios,aumentar,disminuir,eliminar) | Variación frecuencia |
| emphasis | enum(sin_enfasis,leve,moderado,alto) | Nivel de énfasis (+) |

### configurations
| Campo | Tipo | Notas |
|-------|------|-------|
| id | bigint PK | |
| user_id | FK users | Quien la creó |
| name | string | Nombre de la configuración |
| data | json | Snapshot completo del formulario |
| is_shared | boolean default false | Personal vs compartida |
| created_at | timestamp | |
| updated_at | timestamp | |

---

## Catálogos (Seeders)

Los seeders cargan todas las opciones predefinidas. Secciones principales:

### Estrategias
- **Estrategias Horméticas** (~30 opciones): Ayuno 16h, Deporte, Sauna, Hipoxia...
- **Estrategias Basadas en Evidencia** (~30 opciones): Cenar Temprano, Higiene del Sueño, Meditación...

### Indicaciones por alimento (~20 secciones)
Pescados, Carnes, Verduras, Fruta, Setas, Legumbres, Cereales, Tubérculos, Bebidas Vegetales, Productos Lácteos, Marisco, Embutidos, Huevos, Dulces y Chocolate, Frutos Secos, Agua, Café e Infusiones, Encurtidos y Salsas, Algas, Especias, Semillas, Picantes

### Licuados (~16 tipos)
AntiHipertensivos, AntiHistamínicos, AntiOxidantes, Detox, Estreñimiento...

### Suplementación habitual (~16)
Aceite de comino negro, Berberina, Bisglicinato de magnesio...

### Suplementación (~500+)
Organizados por condición/patología: DOLOR, SIBO, PSORIASIS, OMEGA 3, VITAMINAS, HIFAS DA TERRA, BONUSAN cPNI...

### Parámetros Analítica (~40)
25(OH)D3, Ácido Úrico, Ferritina, TSH, Glucosa, Colesterol...

### Referencias Bibliográficas
Ref C, Ref Psoriasis

### Tablas de alimentos
- **~130 categorías**: nutrientes (RICOS EN HIERRO, ZINC...), propiedades (ANTIINFLAMATORIOS, DIURÉTICOS...), infusiones por condición (~80 tipos)
- **~500+ alimentos**: cada uno con su tipo (Fruta, Pescado Azul, Verduras, Legumbres, Cereales, etc.)

---

## Rutas

```
# Auth (Breeze)
GET    /login
POST   /login
POST   /logout
GET    /register
POST   /register

# Dashboard
GET    /                          → Dashboard (listado de pacientes/informes recientes)

# Pacientes
GET    /patients                  → Listado
POST   /patients                  → Crear
GET    /patients/{id}             → Detalle
PUT    /patients/{id}             → Actualizar
DELETE /patients/{id}             → Eliminar
GET    /patients/search?q=        → Búsqueda autocompletado (JSON)

# Informes
GET    /reports/create?patient_id= → Formulario nuevo informe
POST   /reports                    → Guardar informe
GET    /reports/{id}               → Ver informe
GET    /reports/{id}/edit          → Editar informe
PUT    /reports/{id}               → Actualizar informe
GET    /reports/{id}/pdf           → Descargar PDF
POST   /reports/{id}/email         → Enviar PDF por email

# Catálogos (API JSON para los desplegables)
GET    /api/catalog/{section_slug} → Items de una sección
GET    /api/foods?q=               → Buscar alimentos
GET    /api/food-categories        → Listar categorías de alimentos

# Configuraciones
GET    /api/configurations         → Listar configs del usuario
POST   /api/configurations         → Guardar nueva
GET    /api/configurations/{id}    → Cargar una config
DELETE /api/configurations/{id}    → Borrar config
```

---

## Variables de Entorno

```env
# Local (.env)
APP_NAME=Nutricionista
APP_ENV=local
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite

# Producción (EasyPanel)
APP_ENV=production
DB_CONNECTION=mysql
DB_HOST=nutri_bd
DB_DATABASE=nutri_bd
DB_USERNAME=nutri
DB_PASSWORD=  # Ver DATOS-CONEXION.md
```

---

## Comandos Frecuentes

```bash
# Desarrollo
php artisan serve                # Servidor Laravel
npm run dev                      # Vite HMR

# Base de datos
php artisan migrate              # Ejecutar migraciones
php artisan migrate:fresh --seed # Resetear BD + seeders
php artisan db:seed              # Solo seeders

# Build producción
npm run build

# Deploy (automático al push)
git add . && git commit -m "mensaje" && git push origin master

# Instalar componentes shadcn/animate-ui
npx shadcn@latest add <componente>
npx shadcn@latest add @animate-ui/<componente>
```

---

## Flujos Principales

### 1. Crear informe para paciente nuevo
1. Nutricionista abre el formulario → busca paciente → no existe → "Crear Nuevo Paciente"
2. Modal: nombre, apellidos, email, nº visitas → se crea el paciente
3. Se cargan los datos personales en el formulario
4. Rellena sección por sección (navegando con el menú lateral)
5. En el panel derecho, genera tablas de alimentos por categoría o alimento individual
6. Opcionalmente activa "Generar menú semanal" (IA)
7. Guarda el informe → genera PDF → descarga o envía por email

### 2. Editar informe de paciente existente
1. Busca paciente en el buscador → autocompletado → selecciona
2. Se cargan todos los datos del último informe
3. Modifica lo necesario → guarda → nuevo PDF

### 3. Gestión de configuraciones
1. Rellena el formulario con una configuración base (ej: "Paciente SIBO estándar")
2. Guarda la configuración con un nombre
3. En futuros informes, carga esa configuración como punto de partida y ajusta

---

## Archivos Clave de Configuración

| Archivo | Propósito |
|---------|-----------|
| `components.json` | Config shadcn + registro animate-ui. Sin este, el MCP no detecta animate-ui |
| `jsconfig.json` | Aliases `@/` para shadcn CLI. Sin este, `npx shadcn add` falla |
| `vite.config.js` | Config Vite con laravel-vite-plugin y alias `@` → `resources/js/` |
| `resources/css/app.css` | CSS variables de shadcn. Sin ellas los componentes no tienen estilos |
| `Dockerfile` | Build para EasyPanel: PHP 8.4-cli + Node |
| `shadcn_animate ui.md` | Referencia completa de config shadcn/animate-ui, MCP, problemas conocidos |

---

## Trampas Conocidas

### 1. animate-ui instala componentes en la raíz
`npx shadcn@latest add @animate-ui/...` crea `components/`, `lib/` y `hooks/` en la raíz del proyecto en vez de en `resources/js/`. Hay que moverlos manualmente después de cada instalación. Ver `shadcn_animate ui.md` sección "Problemas conocidos".

### 2. Import incorrecto en ripple.jsx
El componente ripple importa `buttonVariants` desde `primitives/buttons/button` pero está en `components/buttons/button`. Hay que corregir el import tras instalar.

### 3. CSS variables obligatorias para shadcn
Sin las CSS variables (`--primary`, `--background`, etc.) en `resources/css/app.css`, los componentes shadcn se renderizan sin estilos. Ver `shadcn_animate ui.md` sección "CSS Variables".

### 4. jsconfig.json obligatorio
Sin `jsconfig.json` en la raíz con los paths de `@/`, el CLI de shadcn falla con "Failed to load jsconfig.json".
