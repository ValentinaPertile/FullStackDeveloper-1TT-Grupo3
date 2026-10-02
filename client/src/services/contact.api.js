import { interceptor } from "../api/interceptor/axios-interceptor";

// Envio del formulario de contacto al backend
export const sendContact = async (payload) => {
  return await interceptor.post("/contact", payload);
};
