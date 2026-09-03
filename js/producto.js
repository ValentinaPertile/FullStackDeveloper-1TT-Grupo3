const API_URL = "http://localhost:3000/productos";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const contenedor = document.getElementById("detalle-container");

async function mostrarProductos() {
  if (!contenedor) return;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`,
      );
    }

    const productos = await response.json();
    console.log("ID solicitado:", id);
    console.log("Productos obtenidos:", productos);

    const producto =
      productos.find((p) => p.id == id) || (isNaN(id) ? productos[0] : null);

    console.log("Producto obtenido:", producto);
    if (!producto) {
      contenedor.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <h2>Producto no encontrado</h2>
          <p>No se encontró información para el producto especificado.</p>
          <a href="index.html" class="btn-add-cart" style="display: inline-block; width: auto; margin-top: 20px; text-decoration: none;">Volver al catálogo</a>
        </div>
      `;
      return;
    }

    const materialList =
      producto.materiales.length > 0 &&
      producto.materiales.map((material) => material);

    const ancho = producto.medidas ? producto.medidas.ancho || "-" : "-";
    const profundidad = producto.medidas
      ? producto.medidas.profundidad || "-"
      : "-";
    const alto = producto.medidas ? producto.medidas.alto || "-" : "-";
    const peso = producto.peso || "Estándar";

    contenedor.innerHTML = `
    <div class="product-container">
        <!-- Columna izquierda: Galería -->
      
          <div class="main-image-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-main-img">
          </div>
        

        <!-- Columna derecha: Información -->
        <div class="product-info">
          <h1 class="product-title">${producto.nombre}</h1>
         <p class="product-description">
            ${producto.descripcion}
          </p>

          <div class="price-row">
            <span class="current-price">$${producto.precio}</span>
          </div>

          <div class="specs-card">
            <div class="specs-title">ESPECIFICACIONES</div>
            <div class="specs-grid">

            ${
              materialList &&
              `<div class="spec-item">
             <div class="spec-label">Material</div>
             <div class="spec-value">${materialList}</div>
             </div>
            `}

            ${Object.entries(producto.especificaciones || {})
                .map(([key, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div class="spec-value">${value}</div>
                </div>
                `,
                ).join("")}
              <div class="spec-item">
                <div class="spec-label">Largo / Ancho</div>
                <div class="spec-value">${ancho} cm</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Profundidad</div>
                <div class="spec-value">${profundidad} cm</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Alto</div>
                <div class="spec-value">${alto} cm</div>
              </div>
              <div class="spec-item">
                <div class="spec-label">Peso</div>
                <div class="spec-value">${peso}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    contenedor.innerHTML = `
      <div class="product-container" style="text-align: center; padding: 60px 20px;">
        <h2>Error de conexión</h2>
        <p>No se pudo obtener la información de los productos. Por favor verifica que el servidor esté activo (<code>npm start</code> en el puerto 3000).</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
