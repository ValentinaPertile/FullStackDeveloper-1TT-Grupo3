/* Ficha de producto */

import { agregarAlCarrito, initCarritoUI, formatoPrecio } from "./carrito.js";

function obtenerIdDesdeUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

async function cargarProductos() {
  const respuesta = await fetch("data/productos.json");
  if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo");
  return respuesta.json();
}

function renderizarDetalle(producto) {
  document.title = `${producto.nombre} — Hermanos Jota`;

  const contenedor = document.getElementById("detalle-producto");
  contenedor.innerHTML = `
    <div class="detalle__imagen">
      <img
        src="${producto.imagen}"
        alt="${producto.nombre} — ${producto.categoria}"
        width="800"
        height="600"
      >
    </div>
    <div class="detalle__info">
      <p class="product-card__category">${producto.categoria}</p>
      <h1 class="detalle__nombre">${producto.nombre}</h1>
      <p class="detalle__precio">${formatoPrecio(producto.precio)}</p>
      <p class="detalle__descripcion">${producto.descripcionLarga}</p>

      <dl class="product-card__specs">
        ${producto.specs
          .map((s) => `<div><dt>${s.label}</dt><dd>${s.valor}</dd></div>`)
          .join("")}
      </dl>

      <div class="detalle__acciones">
        <label for="cantidad" class="visually-hidden">Cantidad</label>
        <input type="number" id="cantidad" min="1" value="1">
        <button type="button" id="btn-agregar-detalle" class="btn btn--primary">
          Añadir al carrito
        </button>
      </div>

      <a class="detalle__volver" href="productos.html">← Volver al catálogo</a>
    </div>
  `;

  document.getElementById("btn-agregar-detalle").addEventListener("click", (e) => {
    const input = document.getElementById("cantidad");
    const cantidad = Math.max(1, parseInt(input.value, 10) || 1);
    agregarAlCarrito(producto.id, cantidad);

    const boton = e.currentTarget;
    const textoOriginal = "Añadir al carrito";
    boton.textContent = "Añadido ✓";
    boton.disabled = true;
    setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
    }, 1100);
  });
}

async function init() {
  const contenedor = document.getElementById("detalle-producto");
  const id = obtenerIdDesdeUrl();

  let productos = [];
  try {
    productos = await cargarProductos();
  } catch (error) {
    contenedor.innerHTML = `<p class="catalogo-vacio">No pudimos cargar este producto. Probá recargar la página.</p>`;
    return;
  }

  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    contenedor.innerHTML = `
      <p class="catalogo-vacio">
        No encontramos ese producto.
        <a href="productos.html">Volver al catálogo</a>
      </p>
    `;
    return;
  }

  renderizarDetalle(producto);
  initCarritoUI(Promise.resolve(productos));
}

init();
