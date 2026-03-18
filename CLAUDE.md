# Directrices Globales — Dubi

> Estas reglas aplican a TODOS los proyectos. Cada proyecto puede tener su propio `CLAUDE.md` con directrices específicas adicionales.

---

## Idioma

- **Responder siempre en español.** El usuario habla español.
- UI visible al usuario: **en español**
- Commits: **en español**, descriptivos
- Código: inglés o español según la convención existente en el archivo

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

## Git y Deploy

- No hacer force push a ramas principales (master/main)
- Commits descriptivos en español
- Cada commit que cambie funcionalidad debe actualizar README.md
- Preferir commits atómicos (un cambio lógico por commit)

---

## Estilo de Trabajo

- **No preguntar si puede hacer algo obvio.** Si la tarea está clara, hacerla directamente.
- **Si necesita preguntas, hacerlas todas juntas**, no de una en una.
- **Respuestas concisas.** No repetir lo que el usuario dijo. No poner resúmenes largos al final.
- **Si algo falla, mostrar el error y proponer solución.** No decir solo "ha fallado".

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
