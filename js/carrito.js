let carrito = [];

function cargarCarritoDesdeStorage() {
  const guardado = localStorage.getItem("carritoHJ");
  if (guardado) {
    carrito = JSON.parse(guardado);
  }
  actualizarContadorCarrito();
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carritoHJ", JSON.stringify(carrito));
}

function obtenerCarrito() {
  return carrito;
}

function agregarAlCarrito(productoId) {
  const producto = productos.find((p) => p.id === productoId);
  if (!producto) return;

  const itemEnCarrito = carrito.find((item) => item.id === productoId);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarritoEnStorage();
  actualizarContadorCarrito();
}

function eliminarDelCarrito(productoId) {
  carrito = carrito.filter((item) => item.id !== productoId);
  guardarCarritoEnStorage();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarritoEnStorage();
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contadores = document.querySelectorAll(".carrito-contador");
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contadores.forEach((contador) => {
    contador.textContent = total;
  });
}

function calcularTotal() {
  return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("es-AR");
}

function obtenerParametroURL(nombre) {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get(nombre));
}

/* ------------------------------------------------------------------------------- */

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenedor");
  if (!contenedor) return;

  const items = obtenerCarrito();

  if (items.length === 0) {
    contenedor.innerHTML =
      '<p class="carrito-vacio">Tu carrito está vacío. Agregá productos desde <a href="productos.html">nuestro catálogo</a>.</p>';
    return;
  }

  const total = calcularTotal();

  contenedor.innerHTML = `
    <div class="carrito-lista">
      ${items
        .map(
          (item) => `
        <div class="carrito-item">
          <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
          <div class="carrito-item-info">
            <h4 class="carrito-item-nombre">${item.nombre}</h4>
            <p class="carrito-item-cantidad">Cantidad: ${item.cantidad}</p>
            <p class="carrito-item-precio">${formatearPrecio(item.precio * item.cantidad)}</p>
          </div>
          <button class="carrito-item-eliminar" data-id="${item.id}" aria-label="Eliminar ${item.nombre}">✕</button>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="carrito-resumen">
      <div class="carrito-total">
        <span>Total</span>
        <span class="carrito-total-precio">${formatearPrecio(total)}</span>
      </div>
      <div class="carrito-acciones">
        <button id="btn-vaciar-carrito" class="btn-vaciar">Vaciar Carrito</button>
      </div>
    </div>
  `;

  contenedor.querySelectorAll(".carrito-item-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      eliminarDelCarrito(id);
      renderizarCarrito();
    });
  });

  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      vaciarCarrito();
      renderizarCarrito();
    });
  }
}
