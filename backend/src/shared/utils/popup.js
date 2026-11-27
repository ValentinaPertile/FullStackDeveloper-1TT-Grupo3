import { FRONTEND_URL } from "../../core/config/config.js";

// Envía el resultado del login con Google a la ventana que abrió el popup.
// El mensaje solo se entrega si esa ventana es nuestro frontend (FRONTEND_URL),
// así ningún otro sitio puede abrir el popup y quedarse con el token de registro.
export const sendPopupResponse = (res, payload) => {
  const message = JSON.stringify(payload).replace(/</g, "\\u003c");
  const targetOrigin = JSON.stringify(FRONTEND_URL);

  return res.send(`
    <script>
      if (window.opener) {
        window.opener.postMessage(${message}, ${targetOrigin});
      }
      window.close();
    </script>
  `);
};
