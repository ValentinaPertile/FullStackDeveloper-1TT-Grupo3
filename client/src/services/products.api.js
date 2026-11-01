import { API_URL } from "../api/config/config";

export const getProducts = async (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`${API_URL}/productos${query}`);
  if (!res.ok) throw new Error("Error al obtener los productos");
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`);
  if (!res.ok) throw new Error("Error al cargar el producto");
  return res.json();
};

export const create = async (productData) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const update = async (id, productData) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const remove = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};

export { remove as deleteProduct, remove as delete };