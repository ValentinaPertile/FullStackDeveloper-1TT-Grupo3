# Hermanos Jota — Plataforma E-Commerce Full Stack

**Instituto Tecnológico de Buenos Aires (ITBA)** — Certificación Profesional en Full Stack Development  
**Comisión:** 1TT | **Equipo:** Grupo 3

* **Sitio Web de Referencia Estática (GitHub Pages - Sprints 1 y 2):** [https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/](https://valentinapertile.github.io/FullStackDeveloper-1TT-Grupo3/)
* **Repositorio del Proyecto:** [https://github.com/ValentinaPertile/FullStackDeveloper-1TT-Grupo3](https://github.com/ValentinaPertile/FullStackDeveloper-1TT-Grupo3)

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

**Hermanos Jota** es una plataforma web de catálogo digital y comercio electrónico desarrollada bajo el stack **MERN (MongoDB, Express, React, Node.js)** para un taller boutique de mobiliario artesanal con sede en Buenos Aires. 

La aplicación integra navegación dinámica con React Router, gestión de estado global para carrito y autenticación, consumo de APIs REST desacopladas, persistencia en base de datos NoSQL MongoDB, autenticación híbrida (JWT + Google OAuth 2.0 con ventana emergente) y validación de esquemas con Zod tanto en cliente como en servidor.

---

## Arquitectura y Tecnologías del Sistema

### 1. Frontend (`/client`)
* **React 19 + Vite:** SPA de alto rendimiento con renderizado optimizado y Vite como empaquetador moderno.
* **React Router v7:** Enrutamiento del lado del cliente con rutas dinámicas (`/product/:id`, `/admin/productos/:id/editar`), rutas protegidas por rol con `ProtectedRoute` y página 404 para cualquier ruta inexistente.
* **Tailwind CSS + Vanilla Design System:** Estilos con variables CSS de diseño de marca, tipografías Playfair Display e Inter y componentes adaptables para móviles.
* **TanStack Query + Axios Interceptor:** Gestión de peticiones HTTP asíncronas con configuración centralizada de baseURL, credenciales y captura normalizada de errores.
* **Context API:** 
  * `CartProvider` (`useCart`): Carrito en memoria y persistido en `localStorage` con Drawer lateral.
  * `AuthProvider` (`useAuth`): Estado global de usuario, sincronización automática con backend y listeners para Google OAuth Popup.
* **Zod:** Validación de formularios en tiempo real en el cliente.

### 2. Backend (`/backend`)
* **Node.js + Express 5:** Servidor REST modularizado en arquitectura por capas (`core`, `modules`, `shared`).
* **MongoDB + Mongoose:** Base de datos NoSQL con esquemas tipados y modelos relacionales:
  * `Product`: Catálogo con campos `slug` unico, `specs`, `price`, `category` (referencia a `Category`), `destacado`, `image_url` y `stock`.
  * `Category`: Categorías de muebles asociadas a productos.
  * `User`: Usuarios con contraseñas hasheadas mediante `bcrypt` y flags de estado.
  * `Order`: Registro de órdenes de compra con ítems, totales, datos de envío y cliente.
  * `Contact`: Mensajes de contacto recibidos con estado de lectura.
* **Passport.js + Google OAuth 2.0 + JWT:** Autenticación mediante tokens JWT almacenados en cookies HTTP-Only y flujo OAuth por popup con cierre automático.
* **Manejo Centralizado de Errores & CORS:** Middleware global de control de excepciones y cabeceras de seguridad.

---

## Cómo Ejecutar el Proyecto en Local

### Requisitos Previos
* **Node.js** (versión 18 o superior).
* **npm** (versión 9 o superior).
* **MongoDB** (instancia local en `localhost:27017` o cuenta en MongoDB Atlas).

---

### Paso 1: Configurar y Levantar el Backend

1. Ingresar al directorio del backend:
   ```bash
   cd backend
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   Copiar el archivo de plantilla `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Verificar que `MONGODB_URI` apunte a tu base de datos local o de Atlas y que `JWT_SECRET` esté definido).*

4. **(Opcional pero recomendado) Poblar la base de datos:**
   Ejecutar el script de seeding para cargar las categorías y los 11 muebles del catálogo en MongoDB (3 de ellos quedan marcados como destacados para el Home):
   ```bash
   npm run seed
   ```

5. Iniciar el servidor Express en modo desarrollo:
   ```bash
   npm run dev
   ```
   El servidor quedará disponible en: `http://localhost:3000/api`

---

### Paso 2: Configurar y Levantar el Frontend

1. En una nueva terminal, ingresar al directorio del cliente:
   ```bash
   cd client
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   Copiar el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Por defecto contiene `VITE_API_URL=http://localhost:3000/api`).*

4. Iniciar el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en: **`http://localhost:5173/`**

---

## Endpoints de la API REST

### 1. Catálogo de Productos (`/api/productos`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/productos` | Obtiene el catálogo activo. Soporta filtro opcional: `?categoria=Living` o `?category=Living`. | Público |
| `GET` | `/api/productos/:id` | Obtiene el detalle de un producto por ID o slug (ej: `aconcagua`). | Público |
| `POST` | `/api/productos` | Crea un producto. Body validado con Zod; `category` acepta ObjectId o nombre. | Solo ADMIN |
| `PUT` | `/api/productos/:id` | Actualiza parcialmente un producto por ID o slug. | Solo ADMIN |
| `DELETE` | `/api/productos/:id` | Elimina el producto y lo desasocia de su categoría. | Solo ADMIN |


### 2. Autenticación de Usuarios (`/api/auth`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario y genera cookie de sesión JWT. | Público |
| `POST` | `/api/auth/login` | Inicia sesión con email y contraseña. | Público |
| `GET` | `/api/auth/google` | Inicia el flujo de autenticación con Google OAuth 2.0. | Público |
| `GET` | `/api/auth/me` | Devuelve el perfil del usuario autenticado, incluyendo `role` e `isAdmin`. | Autenticado |
| `POST` | `/api/auth/logout` | Cierra la sesión y destruye la cookie de autenticación. | Público |

### 3. Contacto y Consultas (`/api/contact` o `/api/contacto`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Envía y almacena un mensaje de contacto (validado con Zod). | Público |
| `GET` | `/api/contact` | Lista todas las consultas recibidas en orden cronológico. | Autenticado |

### 4. Órdenes y Checkout (`/api/orders`)
| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Crea una nueva orden de compra desde el carrito (soporta usuarios e invitados). | Público |
| `GET` | `/api/orders` | Lista las órdenes de compra asociadas. | Autenticado |

### 5. Roles y permisos
| Rol | Permisos |
| :--- | :--- |
| `USER` (default) | Ver catálogo, comprar y consultar su propio perfil. |
| `ADMIN` | Todo lo anterior + crear, editar y eliminar productos. |


Para promover un usuario a administrador:
  ```bash
    cd backend
    npm run make-admin -- email@dominio.com
  ```
Luego cerrar sesión y volver a iniciar, para que el JWT incluya el rol nuevo.

---

## Rutas del Frontend

| Ruta | Página | Acceso |
| :--- | :--- | :--- |
| `/` | Inicio, con los productos destacados traídos de la API | Público |
| `/products` | Catálogo completo (acepta `?category=Living`) | Público |
| `/product/:id` | Detalle de producto por slug (`useParams`) | Público |
| `/contacto` | Formulario de contacto | Público |
| `/login`, `/register` | Inicio de sesión y registro (local o Google) | Público |
| `/admin/productos` | Panel de administración: tabla con Editar / Borrar | Solo ADMIN |
| `/admin/productos/nuevo` | Formulario de alta de producto | Solo ADMIN |
| `/admin/productos/:id/editar` | Mismo formulario, precargado con el producto (`useParams`) | Solo ADMIN |
| `*` | Página 404 | Público |

Las rutas `/admin/*` están envueltas en `ProtectedRoute`: sin sesión redirige a `/login` y con un usuario que no es admin redirige al inicio.

### Cómo probar el CRUD de productos

1. Levantar backend y frontend como se indica arriba y correr `npm run seed`.
2. Registrarse desde `/register`.
3. Convertir ese usuario en admin con `npm run make-admin -- tu@email.com` y volver a iniciar sesión.
4. Entrar a **Admin** desde el menú (solo aparece para administradores):
   * **Crear:** botón *Nuevo producto*. Las especificaciones se cargan una por línea (`Medidas: 45 × 35 cm`). Al guardar vuelve al panel con `useNavigate`.
   * **Editar:** botón *Editar* en la fila del producto.
   * **Borrar:** botón *Borrar*, con confirmación.
5. Los cambios se ven al instante en `/products`, y los productos marcados como destacados aparecen en el inicio.

---

## Matriz de Cumplimiento de Requerimientos Técnicos

| Criterio | Implementación en el Proyecto | Archivos Principales |
| :--- | :--- | :--- |
| **Arquitectura Desacoplada** | Separación limpia entre SPA (React/Vite) y servidor API REST (Node/Express). | `/client`, `/backend` |
| **Base de Datos NoSQL** | Modelado e indexación de colecciones con Mongoose (`Product`, `Category`, `User`, `Order`, `Contact`). | `backend/src/core/models/*.js` |
| **Seed de Base de Datos** | Script automatizado para poblar categorías y catálogo artesanal en MongoDB. | `backend/src/scripts/seed.js` |
| **Modelado y Conexión de BD** | Esquemas de Mongoose con validaciones e índices; `Product.category` referencia a `Category` (`ref`) y la categoría guarda sus productos. Conexión abstraída en un módulo y URI en `.env`. | `backend/src/core/models/*.js`, `backend/src/core/database/database.js` |
| **API CRUD (MVC)** | `GET`, `POST`, `PUT` y `DELETE` de productos en módulo con routes / controller / service, validación con Zod y escritura protegida con `isAuthenticated` + `isAdmin`. | `backend/src/modules/products/*`, `backend/src/core/middleware/isAdmin.js` |
| **Integración Frontend CRUD** | Panel con tabla de productos y borrado con confirmación; formulario único de alta/edición; los errores del backend se muestran en pantalla. | `client/src/pages/admin/*`, `client/src/services/products.api.js` |
| **Ruteo Avanzado** | `useParams` en detalle y edición, `useNavigate` después de crear/editar, rutas protegidas por rol y 404. | `client/src/routes/*`, `client/src/components/ProtectedRoute.jsx` |
| **Datos Siempre Reales** | El catálogo, el detalle y el Home se leen siempre de MongoDB; si la API no responde se muestra un mensaje claro en lugar de datos falsos, y el checkout no inventa órdenes. | `client/src/pages/*`, `client/src/components/Cart.jsx` |
| **Autenticación Híbrida** | Login/Registro con JWT + soporte completo de Google OAuth 2.0 vía ventana popup. | `backend/src/modules/auth/*`, `client/src/hooks/useOAuth.js` |
| **Estado Global** | Context API para carrito persistente (`CartProvider`) y sesión de usuario (`AuthProvider`). | `client/src/context/*.jsx` |
| **Flujo Completo de Compra** | Drawer de carrito interactivo con formulario de checkout; la orden se guarda en MongoDB. | `client/src/components/Cart.jsx`, `backend/src/modules/orders/*` |
| **Validación Robusta** | Validación con Zod tanto en formularios del cliente como en middlewares del servidor. | `client/src/validation/*`, `backend/src/modules/contact/contact.validation.js` |
| **Responsive & Accesibilidad** | Menú hamburguesa accesible (`aria-expanded`), variables de diseño y layout responsive. | `client/src/components/layout/Navbar.jsx`, `client/src/index.css` |
