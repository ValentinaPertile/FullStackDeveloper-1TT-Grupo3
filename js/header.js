function renderHeader() {
  const header = document.querySelector(".site-header");
  if (header) return;

  const html = `
    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="wordmark" href="index.html#inicio">
          Hermanos <span>Jota</span>
        </a>
        <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
          <span class="menu-linea"></span>
          <span class="menu-linea"></span>
          <span class="menu-linea"></span>
        </button>
        <nav class="main-nav" aria-label="Navegación principal">
          <ul>
            <li><a href="index.html#filosofia">Filosofía</a></li>
            <li><a href="index.html#catalogo">Catálogo</a></li>
            <li><a href="index.html#sustentabilidad">Sustentabilidad</a></li>
            <li><a href="contacto.html">Contacto</a></li>
            <li>
              <a href="contacto.html#carrito-contenedor" class="carrito-link" aria-label="Ver carrito">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span class="carrito-contador">0</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", html);

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  menuToggle.addEventListener("click", () => {
    const expandido = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expandido);
    nav.classList.toggle("nav-abierto");
    menuToggle.classList.toggle("menu-activo");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("nav-abierto");
      menuToggle.classList.remove("menu-activo");
    });
  });

  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a").forEach((enlace) => {
    const href = enlace.getAttribute("href");
    if (href === paginaActual) {
      enlace.classList.add("active");
    }
  });

  cargarCarritoDesdeStorage();
}

document.addEventListener("DOMContentLoaded", renderHeader);
