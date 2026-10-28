import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import AdminProducts from "../pages/admin/AdminProducts";
import ProductForm from "../pages/admin/ProductForm";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROUTES } from "./paths";

export const appRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },

  // Administración (solo ADMIN)
  {
    path: ROUTES.ADMIN_PRODUCTS,
    element: (
      <ProtectedRoute requireAdmin>
        <AdminProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_PRODUCT_NEW,
    element: (
      <ProtectedRoute requireAdmin>
        <ProductForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/productos/:id/editar",
    element: (
      <ProtectedRoute requireAdmin>
        <ProductForm />
      </ProtectedRoute>
    ),
  },

  // 404: debe quedar última
  {
    path: "*",
    element: <NotFound />,
  },
];
