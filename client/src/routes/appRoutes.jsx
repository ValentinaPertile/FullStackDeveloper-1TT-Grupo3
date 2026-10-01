import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Register from "../pages/Register";
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
    path: ROUTES.LOGIN,
    element: <Login />,
  },
   {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
];
