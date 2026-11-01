import { interceptor } from "../api/interceptor/axios-interceptor";

// Crear orden de compra
export const createOrder = async (orderData) => {
  return await interceptor.post("/orders", orderData);
};
