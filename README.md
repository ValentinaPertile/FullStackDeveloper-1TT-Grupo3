# Hermanos Jota - Entrega Sprint 1 y 2

**Instituto Tecnológico de Buenos Aires (ITBA)** — Certificación Profesional en Full Stack Development  
**Comisión:** 1TT | **Equipo:** Grupo 3

* **Sitio Web en Producción (GitHub Pages):** [https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/](https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/)

---

## Integrantes del Equipo

| Apellido y Nombre | Usuario GitHub |
| :--- | :--- |
| **Valentina Pértile de la Vega** | [@ValentinaPertile](https://github.com/ValentinaPertile) |
| **Marcos Alejandro Sosa** | [@Mark0s-dev](https://github.com/Mark0s-dev) |
| **Brisa Gabriela Machicado** | [@brisadsx](https://github.com/brisadsx) |
| **Lazaro Gustavo Acosta Gomez** | [@lzaro444](https://github.com/lzaro444) |
| **Axel Ian Berger** | [@Galoniax](https://github.com/Galoniax) |

---

## Descripción del Proyecto

**Hermanos Jota** es una plataforma web de catálogo digital y comercio electrónico para un taller boutique de mobiliario artesanal con sede en Buenos Aires. La propuesta se enfoca en el diseño consciente y atemporal, empleando maderas nativas certificadas FSC®, acabados con aceites naturales y textiles ecológicos.

---

## Matriz de Cumplimiento de Requerimientos Académicos

| Criterio / Requerimiento | Implementación en el Proyecto | Archivos de Referencia |
| :--- | :--- | :--- |
| **Estructura Semántica** | Uso estricto de etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<dialog>`). Jerarquía única de encabezados `h1`-`h4`. | `index.html`, `productos.html`, `producto.html`, `contacto.html` |
| **Diseño y Maquetación CSS** | Maquetación con **CSS Grid** (grilla de catálogo) y **Flexbox** (alineaciones, cabecera, cards). Uso de CSS Custom Properties (variables) para paleta de colores, tipografías y espaciados. | `css/styles.css`, `css/productos.css`, `css/header.css` |
| **Diseño Responsive (Mobile First)** | Consultas de medios (`@media`) fluidas, tipografía adaptable con `clamp()` y menú interactivo para dispositivos móviles. | `css/header.css`, `css/inicio.css`, `css/contacto.css` |
| **Consumo Asíncrono de Datos** | Carga dinámica de productos almacenados en formato JSON mediante `fetch()` y control de errores con `try/catch`. | `data/productos.json`, `js/productos.js`, `js/producto.js` |
| **Manipulación Dinámica del DOM** | Generación de tarjetas de producto, renderizado dinámico de especificaciones técnicas y renderizado reactivo del carrito de compras. | `js/productos.js`, `js/producto.js`, `js/carrito.js` |
| **Gestión de Estado y Persistencia** | Almacenamiento continuo del carrito en `localStorage`, sincronizando cantidades, importes acumulados y vaciado post-checkout. | `js/carrito.js` |
| **Interactividad y Eventos** | Búsqueda y filtrado en vivo, delegación de eventos (`event delegation`) para optimizar rendimiento de memoria. | `js/productos.js`, `js/carrito.js`, `js/header.js` |
| **Validación de Formularios** | Validación en tiempo real (eventos `input` y `blur`), expresiones regulares para validación de email, atributos accesibles y feedback de envío. | `contacto.html`, `js/contacto.js`, `css/contacto.css` |
| **Modularidad JavaScript** | Estructuración del código en módulos ES6 con importación y exportación selectiva de funciones (`import` / `export`). | `js/*.js` |
| **Despliegue Continuo (CI/CD)** | Publicación y disponibilidad en la nube vía **GitHub Pages** con rutas relativas para compatibilidad estática absoluta. | Entorno de producción en GitHub |

---

## Funcionalidades Principales

* **Inicio (`index.html`):** Presentación de la marca, propuesta de valor, filosofía de diseño artesanal y sustentabilidad.
* **Catálogo (`productos.html`):** Carga dinámica de productos vía `fetch()` desde `data/productos.json`, con búsqueda y filtrado en tiempo real.
* **Detalle de Producto (`producto.html`):** Lectura dinámica por parámetro URL (`?id=...`), especificaciones técnicas y selector de cantidad.
* **Carrito Persistente (`js/carrito.js`):** Drawer lateral accesible globalmente, persistencia en `localStorage`, actualización de cantidades, cálculo de totales y simulación de checkout.
* **Contacto (`contacto.html`):** Formulario con validación en tiempo real (expresión regular para email), mensajes accesibles y simulación de envío.
* **Navegación Responsive (`js/header.js`):** Menú hamburguesa accesible (`aria-expanded`) para dispositivos móviles con control de scroll.

---

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica y accesibilidad con atributos WAI-ARIA.
* **CSS3:** Diseño responsive (Mobile-First), CSS Grid, Flexbox y variables CSS (Custom Properties).
* **JavaScript ES6+:** Módulos nativos (`import`/`export`), peticiones asíncronas con `fetch` y persistencia con `localStorage`.
* **Recursos:** Tipografías de Google Fonts (*Playfair Display* e *Inter*) e imágenes optimizadas en formato WebP.

---

## Cómo Correr el Proyecto

Para evaluar el proyecto existen dos modalidades:

### Modalidad 1: Visualización en Producción (Recomendada para Corrección Rápida)
No requiere descargar código ni configurar entornos. El sitio se encuentra desplegado y plenamente operativo en:

**[https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/](https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/)**

---

### Modalidad 2: Ejecución en Entorno Local

#### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/ValentinaPertile/FullStackDeveloper-1TT-Grupo3.git
cd FullStackDeveloper-1TT-Grupo3
```

#### Paso 2: Iniciar un servidor local (seleccionar la opción de preferencia)

* **Opción A — Con Visual Studio Code (Live Server):**
  1. Abrir la carpeta del proyecto en VS Code.
  2. Instalar la extensión **Live Server** (creada por *Ritwick Dey*).
  3. Hacer clic derecho sobre el archivo `index.html` y seleccionar **"Open with Live Server"** (o presionar el botón *"Go Live"* en la barra de estado inferior).
  4. La aplicación se abrirá automáticamente en `http://127.0.0.1:5500/`.

* **Opción B — Con Python 3:**
  ```bash
  python3 -m http.server 8000
  ```
  *(o `python -m http.server 8000` en sistemas Windows)*  
  Luego ingresar a: `http://localhost:8000/`

* **Opción C — Con Node.js (`npx`):**
  ```bash
  npx serve .
  # o alternativamente:
  npx http-server -p 8000 .
  ```
  Luego ingresar a la URL indicada en consola.

* **Opción D — Con PHP:**
  ```bash
  php -S localhost:8000
  ```
  Luego ingresar a: `http://localhost:8000/`

---

## Configuración del Despliegue en GitHub Pages (Opción A)

El despliegue de esta plataforma fue configurado de manera directa y nativa utilizando el motor de **GitHub Pages**:

1. En el repositorio de GitHub: `ValentinaPertile/FullStackDeveloper-1TT-Grupo3`.
2. Se ingresó en la pestaña superior **Settings** $\rightarrow$ opción lateral **Pages** (dentro del grupo *Code and automation*).
3. En la sección **Build and deployment**:
   * **Source:** `Deploy from a branch`.
   * **Branch:** Rama `main`, directorio `/ (root)`.
   * Se guardaron los cambios con **Save**.
4. GitHub Pages procesa automáticamente los archivos estáticos y publica la versión en:  
   **`https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/`**

> **Compatibilidad de Rutas:** Todos los recursos (estilos CSS, módulos JS, imágenes e ingesta del archivo JSON) fueron vinculados mediante **rutas relativas** estrictas, garantizando que el sitio funcione con absoluta fidelidad tanto en la raíz de un dominio como en subdirectorios de GitHub Pages.

---

## Estructura de Directorios del Repositorio

```text
FullStackDeveloper-1TT-Grupo3/
│
├── css/
│   ├── carrito.css             # Estilos del drawer del carrito y modal de checkout
│   ├── contacto.css            # Estilos del formulario de contacto y mensajes de validación
│   ├── header.css              # Estilos del encabezado, barra de navegación y menú hamburguesa
│   ├── inicio.css              # Estilos de la landing page (hero, filosofía, sustentabilidad)
│   ├── productos.css           # Estilos de la grilla de catálogo y ficha de detalle
│   └── styles.css              # Design system global: reset, variables, tipografía y utilidades
│
├── data/
│   └── productos.json          # Fuente de datos en formato JSON con la información del catálogo
│
├── img/                        # Recursos gráficos optimizados en formato WebP y logotipo en SVG
│   ├── Aparador Uspallata.webp
│   ├── Biblioteca Recoleta.webp
│   ├── Butaca Mendoza.webp
│   ├── Escritorio Costa.webp
│   ├── Mesa Comedor Pampa.webp
│   ├── Mesa de Centro Araucaria.webp
│   ├── Mesa de Noche Aconcagua.webp
│   ├── Silla de Trabajo Belgrano.webp
│   ├── Sillas Córdoba.webp
│   ├── Sillón Copacabana.webp
│   ├── Sofá Patagonia.webp
│   └── logo.svg
│
├── js/
│   ├── carrito.js              # Módulo de carrito: persistencia en localStorage y checkout
│   ├── contacto.js             # Módulo de contacto: validaciones en tiempo real y envío simulado
│   ├── header.js               # Módulo de navegación: control del menú móvil y accesibilidad
│   ├── producto.js             # Módulo de detalle: lectura de URLSearchParams y renderizado
│   └── productos.js            # Módulo de catálogo: consumo de fetch, filtrado en vivo y tarjetas
│
├── contacto.html               # Vista de contacto institucional y formulario de consultas
├── index.html                  # Vista principal (Home / Landing Page)
├── producto.html               # Vista de ficha técnica y detalle de producto individual
├── productos.html              # Vista de catálogo con buscador en tiempo real
├── README.md                   # Documentación académica del proyecto
└── .gitignore                  # Reglas de exclusión para control de versiones Git
```

---

## Conclusión y Declaración Académica

El presente desarrollo ha sido elaborado como trabajo integrador final para la **Certificación Profesional en Full Stack Development del ITBA**, integrando los contenidos teóricos y prácticos impartidos a lo largo del módulo de **Desarrollo Front-End**.

Desarrollado con dedicación por el **Grupo 3 — Comisión 1TT** © 2026.