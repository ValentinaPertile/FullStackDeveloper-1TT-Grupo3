// Paths de navegacion
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  PRODUCTS: "/products",
  PRODUCT: (product_id) => `/product/${product_id}`,

  CONTACT: "/contacto",

  // Panel de administración (solo usuarios con role ADMIN)
  ADMIN_PRODUCTS: "/admin/productos",
  ADMIN_PRODUCT_NEW: "/admin/productos/nuevo",
  ADMIN_PRODUCT_EDIT: (product_id) => `/admin/productos/${product_id}/editar`,
};

export const OUT_AUTH = ["/login", "/register"];
