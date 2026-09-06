/* 
   Catálogo
   - Trae los productos desde data/productos.json
   - Arma la grilla de tarjetas
   - Filtra en vivo con el campo de búsqueda
   - Conecta el botón "Añadir al carrito" de cada tarjeta*/

import { agregarAlCarrito, initCarritoUI, formatoPrecio } from "./carrito.js";

async function cargarProductos() {
  const respuesta = await fetch("data/productos.json");
  if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo");
  return respuesta.json();
}

function crearTarjeta(producto) {
  const articulo = document.createElement("article");
  articulo.className = "product-card";
  articulo.dataset.id = producto.id;

  articulo.innerHTML = `
    <a class="product-card__link" href="producto.html?id=${producto.id}">
      <div class="product-card__img-wrap">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre} — ${producto.categoria}"
          loading="lazy"
          width="640"
          height="480"
        >
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${producto.categoria}</p>
        <h3 class="product-card__name">${producto.nombre}</h3>
        <p class="product-card__price">${formatoPrecio(producto.precio)}</p>
      </div>
    </a>
    <div class="product-card__actions">
      <button type="button" class="btn btn--primary btn--add" data-id="${producto.id}">
        Añadir al carrito
      </button>
    </div>
  `;

  return articulo;
}

function renderizarGrid(productos) {
  const grid = document.getElementById("product-grid");
  const sinResultados = document.getElementById("catalogo-sin-resultados");
  const info = document.getElementById("catalogo-resultado-info");

  grid.innerHTML = "";
  productos.forEach((producto) => grid.appendChild(crearTarjeta(producto)));

  sinResultados.hidden = productos.length !== 0;
  info.textContent = productos.length
    ? `${productos.length} producto${productos.length === 1 ? "" : "s"} encontrado${productos.length === 1 ? "" : "s"}`
    : "";
}

function filtrarProductos(productos, termino) {
  const texto = termino.trim().toLowerCase();
  if (!texto) return productos;
  return productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto)
  );
}

async function init() {
  const grid = document.getElementById("product-grid");
  let productos = [];

  try {
    productos = await cargarProductos();
  } catch (error) {
    grid.innerHTML = `<p class="catalogo-vacio">No pudimos cargar el catálogo. Probá recargar la página.</p>`;
    return;
  }

  renderizarGrid(productos);

  const buscador = document.getElementById("buscador");
  buscador?.addEventListener("input", () => {
    renderizarGrid(filtrarProductos(productos, buscador.value));
  });

  grid.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn--add");
    if (!boton) return;

    agregarAlCarrito(boton.dataset.id, 1);

    const textoOriginal = "Añadir al carrito";
    boton.textContent = "Añadido ✓";
    boton.classList.add("is-added");
    boton.disabled = true;
    setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.classList.remove("is-added");
      boton.disabled = false;
    }, 1100);
  });

  initCarritoUI(Promise.resolve(productos));
}

init();
