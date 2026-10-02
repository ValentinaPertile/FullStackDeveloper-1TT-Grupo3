import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
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
    path: ROUTES.CONTACT,
    element: <Contact />,
  }
];
