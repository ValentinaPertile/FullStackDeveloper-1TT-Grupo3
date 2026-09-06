/* ==========================================================================
   Header & Menú Móvil - Hermanos Jota
   ========================================================================== */

function initHeaderMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const menuOverlay = document.getElementById("menu-overlay");

  if (!menuToggle || !mainNav) return;

  function abrirMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    menuToggle.classList.add("menu-activo");
    mainNav.classList.add("nav-abierto");
    document.body.classList.add("menu-bloqueado");

    if (menuOverlay) {
      menuOverlay.hidden = false;
      requestAnimationFrame(() => menuOverlay.classList.add("is-visible"));
    }
  }

  function cerrarMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.classList.remove("menu-activo");
    mainNav.classList.remove("nav-abierto");
    document.body.classList.remove("menu-bloqueado");

    if (menuOverlay) {
      menuOverlay.classList.remove("is-visible");
      setTimeout(() => {
        if (!mainNav.classList.contains("nav-abierto")) {
          menuOverlay.hidden = true;
        }
      }, 250);
    }
  }

  function toggleMenu() {
    const estaAbierto = menuToggle.getAttribute("aria-expanded") === "true";
    if (estaAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Cerrar al hacer clic en cualquier enlace del menú
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      cerrarMenu();
    });
  });

  // Cerrar al hacer clic en el overlay o fuera del menú
  if (menuOverlay) {
    menuOverlay.addEventListener("click", cerrarMenu);
  }

  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("nav-abierto") &&
      !mainNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      cerrarMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("nav-abierto")) {
      cerrarMenu();
      menuToggle.focus();
    }
  });

  // Resetear estado si se redimensiona a pantalla de escritorio
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && mainNav.classList.contains("nav-abierto")) {
      cerrarMenu();
    }
  });

  // Indicar página activa según URL
  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  mainNav.querySelectorAll("a").forEach((enlace) => {
    const href = enlace.getAttribute("href");
    if (!href) return;
    const archivoEnlace = href.split("#")[0] || "index.html";

    // Si es la página actual exacta y no es un hash link en la misma página
    if (archivoEnlace === paginaActual && !href.startsWith("#") && !href.includes("#")) {
      enlace.setAttribute("aria-current", "page");
    } else if (paginaActual === "" || paginaActual === "index.html") {
      if (href === "index.html#inicio" || href === "#inicio") {
        enlace.setAttribute("aria-current", "page");
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderMenu);
} else {
  initHeaderMenu();
}
