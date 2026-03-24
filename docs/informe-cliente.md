# Informe del Proyecto — MVM Nutrición Integrada

## Plataforma de Informes Nutricionales

---

## ¿Qué es?

Una aplicación web profesional diseñada para que la nutricionista pueda crear informes nutricionales personalizados para sus pacientes, de forma rápida y organizada, y exportarlos como PDF listos para entregar.

Sustituye al sistema anterior basado en Google Apps Script, mejorando la experiencia de uso, el diseño visual y la capacidad de personalización.

---

## ¿Cómo funciona?

### 1. Acceso seguro

La nutricionista accede con su usuario y contraseña. Solo ella tiene acceso a la plataforma.

- URL: https://desarrollos-nutri.o28eg0.easypanel.host
- Login protegido con credenciales personales

### 2. Dashboard principal

Al entrar, ve un panel con:
- Resumen de informes creados
- Fecha del último informe
- Acceso rápido para crear un nuevo informe
- Listado de informes recientes con opciones de ver, editar o descargar PDF

### 3. Crear un informe

El formulario de creación es el corazón de la aplicación. Tiene tres áreas:

#### Columna izquierda — Navegación
Un índice de todas las secciones del formulario. Al pulsar en cualquier sección, el formulario se desplaza automáticamente hasta ella. Destaca en verde la sección en la que se encuentra actualmente.

#### Columna central — Formulario
El formulario está dividido en secciones, cada una con un desplegable de búsqueda donde la nutricionista selecciona las opciones que aplican al paciente. Las selecciones aparecen como etiquetas con una X para eliminarlas si se equivoca.

**Secciones del formulario:**

- **Datos del destinatario**: nombre, apellidos y correo del paciente
- **Datos del informe**: patología (texto libre), género y tipo de destinatario
- **Estrategias Horméticas**: ~30 opciones predefinidas (ayuno, deporte, sauna, exposición al frío, etc.)
- **Estrategias Basadas en la Evidencia Científica**: ~30 opciones (higiene del sueño, meditación, hidratación, etc.)
- **Indicaciones por grupo de alimentos** (~20 secciones): Pescados, Carnes, Verduras, Fruta, Setas, Legumbres, Cereales, Tubérculos, Bebidas Vegetales, Productos Lácteos, Marisco, Embutidos, Huevos, Dulces y Chocolate, Frutos Secos, Agua, Café e Infusiones, Encurtidos y Salsas, Algas, Especias, Semillas, Picantes
- **Licuados**: tipos de licuados recomendados (antioxidantes, detox, antiinflamatorios, etc.)
- **Suplementación Habitual**: ~16 suplementos base de uso frecuente
- **Suplementación Específica**: más de 500 suplementos organizados por condición/patología (SIBO, dolor, tiroides, embarazo, psoriasis, etc.)
- **Parámetros Analítica**: ~45 marcadores de analítica sanguínea (TSH, ferritina, glucosa, vitamina D, etc.)
- **Referencias Bibliográficas**
- **Anotaciones**: texto libre para observaciones personales

En total, la base de datos contiene **más de 900 opciones predefinidas** distribuidas en estas secciones.

#### Columna derecha — Generador de Tablas de Alimentos

Permite ajustar las tablas de alimentos que aparecerán en el PDF:

- **Buscar por categoría**: más de 190 categorías nutricionales (ricos en hierro, antiinflamatorios, diuréticos, altos en histamina, infusiones para diferentes condiciones, etc.). Al seleccionar una categoría, se ajusta la frecuencia de todos los alimentos que pertenecen a ella.
- **Buscar por alimento individual**: más de 500 alimentos individuales catalogados por tipo (pescado azul, carne roja, verduras, fruta, etc.). Se puede ajustar la frecuencia y el énfasis de cada uno.
- **Frecuencia**: sin cambios, aumentar, disminuir o eliminar
- **Énfasis**: sin énfasis, leve (+), moderado (++), alto (+++)

También incluye un **gestor de configuraciones** que permite guardar el estado actual del formulario como plantilla reutilizable. Útil para perfiles de pacientes habituales (por ejemplo, "Paciente SIBO estándar" o "Embarazo primer trimestre").

### 4. PDF generado

El informe genera un PDF profesional con el branding de MVM Nutrición Integrada:

- **Portada**: logo, nombre de la marca, datos del paciente y fecha
- **Texto introductorio**: personalizable desde Ajustes
- **Valoración**: la patología y observaciones personalizadas del paciente
- **Estrategias**: las estrategias horméticas y basadas en evidencia seleccionadas
- **Tablas de alimentos**: 25 tipos de tabla (pescados, carnes, verduras, fruta, cereales, etc.) con los alimentos clasificados por frecuencia recomendada. Cada tabla muestra qué alimentos se aconsejan, con qué frecuencia, y cuáles no se aconsejan. Los alimentos especialmente beneficiosos se marcan con ++
- **Indicaciones específicas**: las indicaciones seleccionadas por grupo de alimento
- **Licuados recomendados**
- **Suplementación**: los suplementos seleccionados para el paciente
- **Parámetros de analítica**: los marcadores relevantes
- **Referencias bibliográficas**
- **Anotaciones**: las notas de la nutricionista

El PDF se descarga directamente desde la aplicación.

### 5. Editar informes

Cualquier informe guardado puede editarse posteriormente. Al abrir un informe existente, el formulario se carga con todos los datos que se seleccionaron originalmente, permitiendo hacer cambios y generar un nuevo PDF.

### 6. Ajustes

La nutricionista puede personalizar la aplicación desde la sección de Ajustes:

- **Textos del PDF**: editar el nombre de la marca, subtítulo, texto introductorio y las descripciones de cada grupo de alimentos que aparecen en el PDF
- **Catálogos**: añadir o eliminar opciones de cualquier desplegable del formulario. Si la nutricionista quiere incorporar un nuevo suplemento, una nueva estrategia o una nueva indicación, puede hacerlo sin necesidad de un desarrollador
- **Alimentos**: activar o desactivar alimentos de la base de datos. Hay 514 alimentos cargados; la nutricionista decide cuáles aparecen en el formulario y en el PDF

---

## Datos precargados

La aplicación viene con toda la información nutricional precargada:

| Tipo de dato | Cantidad |
|---|---|
| Estrategias horméticas | ~30 |
| Estrategias basadas en evidencia | ~30 |
| Secciones de indicaciones alimentarias | 20+ |
| Indicaciones predefinidas | ~200 |
| Suplementos (habituales + específicos) | 636 |
| Parámetros de analítica | 45 |
| Tipos de tabla de alimentos | 25 |
| Alimentos catalogados | 514 |
| Categorías nutricionales | 191 |
| Relaciones alimento ↔ categoría | 2.744 |

Todos estos datos son editables desde la sección de Ajustes.

---

## Tecnología

| Componente | Tecnología |
|---|---|
| Servidor | Laravel (PHP) |
| Interfaz | React con animaciones |
| Diseño | Tailwind CSS + shadcn/ui |
| PDF | DomPDF |
| Base de datos | MySQL |
| Hosting | EasyPanel (deploy automático) |

La aplicación se actualiza automáticamente cada vez que se sube un cambio al repositorio de código.

---

## Acceso

- **URL**: https://desarrollos-nutri.o28eg0.easypanel.host
- **Usuario**: admin@nutricionista.com
- **Contraseña**: (proporcionada por separado)

---

## Próximos pasos posibles

- Envío de PDF por email directamente al paciente desde la aplicación
- Historial de visitas por paciente
- Diseño más elaborado del PDF (imágenes, iconos, colores por sección)
- Versión móvil optimizada
- Integración con calendario de citas
