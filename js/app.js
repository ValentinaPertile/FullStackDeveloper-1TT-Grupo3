document.addEventListener("DOMContentLoaded", async () => {
  try {
    await productosPromise;
  } catch (error) {
    console.error("Error cargando productos:", error);
  }

  const pagina = window.location.pathname.split("/").pop() || "index.html";

  switch (pagina) {
    case "contacto.html":
      initContacto();
      break;
  }
});

function initContacto() {
  renderizarCarrito();
}
