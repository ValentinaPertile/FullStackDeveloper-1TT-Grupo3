/*Carrito de compras
Módulo compartido por catalogo.js y producto.js.*/

const CLAVE_CARRITO = "hj_carrito";

/** Devuelve el carrito guardado: array de { id, cantidad } */
export function obtenerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarBadge();
}

export function agregarAlCarrito(id, cantidad = 1) {
  const carrito = obtenerCarrito();
  const item = carrito.find((i) => i.id === id);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  guardarCarrito(carrito);
}

export function actualizarCantidad(id, cantidad) {
  let carrito = obtenerCarrito();
  if (cantidad <= 0) {
    carrito = carrito.filter((i) => i.id !== id);
  } else {
    const item = carrito.find((i) => i.id === id);
    if (item) item.cantidad = cantidad;
  }
  guardarCarrito(carrito);
}

export function quitarDelCarrito(id) {
  const carrito = obtenerCarrito().filter((i) => i.id !== id);
  guardarCarrito(carrito);
}

export function vaciarCarrito() {
  guardarCarrito([]);
}

export function contarUnidades(carrito = obtenerCarrito()) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

export function formatoPrecio(valor) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);
}

/** Actualiza el numerito del botón "Carrito" en el header, si existe */
export function actualizarBadge() {
  const badge = document.getElementById("carrito-contador");
  if (badge) badge.textContent = String(contarUnidades());
}

let carritoInicializado = false;

async function cargarProductosFallback() {
  const res = await fetch("data/productos.json");
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

/**
 * Conecta el botón de carrito, el panel lateral (drawer) y sus
 * interacciones (abrir, cerrar, sumar/restar, quitar, vaciar).
 * `productosPromise` debe resolver al array completo de productos,
 * para poder mostrar imagen, nombre y precio de cada ítem.
 */
export function initCarritoUI(productosPromise = null) {
  const drawer = document.getElementById("carrito-drawer");
  actualizarBadge();

  if (!drawer || carritoInicializado) return;
  carritoInicializado = true;

  if (!productosPromise) {
    productosPromise = cargarProductosFallback();
  }

  const btnAbrir = document.getElementById("btn-abrir-carrito");
  const btnCerrar = document.getElementById("btn-cerrar-carrito");
  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  const overlay = document.getElementById("carrito-overlay");
  const lista = document.getElementById("carrito-lista");
  const vacioMsg = document.getElementById("carrito-vacio-msg");
  const totalEl = document.getElementById("carrito-total");

  function abrirDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (overlay) {
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("is-visible"));
    }
    document.body.style.overflow = "hidden";
  }

  function cerrarDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (overlay) {
      overlay.classList.remove("is-visible");
      setTimeout(() => {
        overlay.hidden = true;
      }, 250);
    }
    document.body.style.overflow = "";
  }

  async function renderizarCarrito() {
    const productos = await productosPromise;
    const carrito = obtenerCarrito();

    if (lista) lista.innerHTML = "";
    if (vacioMsg) vacioMsg.hidden = carrito.length !== 0;

    let total = 0;

    carrito.forEach((item) => {
      const producto = productos.find((p) => p.id === item.id);
      if (!producto) return;

      total += producto.precio * item.cantidad;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
          <p class="cart-item__nombre">${producto.nombre}</p>
          <p class="cart-item__precio">${formatoPrecio(producto.precio)}</p>
          <div class="cart-item__qty">
            <button type="button" data-accion="restar" data-id="${producto.id}" aria-label="Restar una unidad">−</button>
            <span>${item.cantidad}</span>
            <button type="button" data-accion="sumar" data-id="${producto.id}" aria-label="Sumar una unidad">+</button>
          </div>
        </div>
        <button type="button" class="cart-item__quitar" data-accion="quitar" data-id="${producto.id}" aria-label="Quitar del carrito">×</button>
      `;
      if (lista) lista.appendChild(li);
    });

    if (totalEl) totalEl.textContent = formatoPrecio(total);
    actualizarBadge();
  }

  btnAbrir?.addEventListener("click", async () => {
    await renderizarCarrito();
    abrirDrawer();
  });
  btnCerrar?.addEventListener("click", cerrarDrawer);
  overlay?.addEventListener("click", cerrarDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarDrawer();
  });
  btnVaciar?.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  lista?.addEventListener("click", (e) => {
    const boton = e.target.closest("button[data-accion]");
    if (!boton) return;
    const { accion, id } = boton.dataset;
    const carrito = obtenerCarrito();
    const item = carrito.find((i) => i.id === id);
    if (!item) return;

    if (accion === "sumar") actualizarCantidad(id, item.cantidad + 1);
    if (accion === "restar") actualizarCantidad(id, item.cantidad - 1);
    if (accion === "quitar") quitarDelCarrito(id);

    renderizarCarrito();
  });
}

// Auto-inicializar la UI del carrito cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initCarritoUI());
} else {
  initCarritoUI();
}

