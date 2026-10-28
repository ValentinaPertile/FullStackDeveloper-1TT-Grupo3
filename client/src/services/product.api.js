import { interceptor } from "@/api/interceptor/axios-interceptor";

export const getProducts = async (category) => {
  return await interceptor.get("/product", { params: { category } });
};

export const getProductById = async (id) => {
  return await interceptor.get(`/product/${id}`);
};
