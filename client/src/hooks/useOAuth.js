import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { useEffect } from "react";
import { OAuth } from "../services/auth.api";

const oAuthActions = {
  OAUTH_SUCCESS: (data, navigate) => {
    navigate(ROUTES.HOME);
  },
  OAUTH_REGISTER: (data, navigate) => {
    navigate(ROUTES.REGISTER + "?token=" + data.data);
  },
  OAUTH_ERROR: (data) => {
    console.error("Error devuelto por OAuth:", data);
  },
};

export function useOAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const onMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;

      const type = event.data.type;
      const handler = oAuthActions[type];

      if (type && handler) {
        handler(event.data, navigate);
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [navigate]);

  const handleOAuth = async (provider) => {
    try {
      const response = await OAuth(provider);
      const features = `left=${(window.innerWidth - 500) / 2},top=${(window.innerHeight - 600) / 2},width=500,height=600`;

      window.open(response, "_blank", features);
    } catch (error) {
      console.error("Error al iniciar autenticación OAuth:", error);
    }
  };

  return { handleOAuth };
}
