import { Routes, RouteObject } from "@app-types/routes";
import MainPage from "@/pages/main/index";
import ProductsPage from "@/pages/products";
import NewProductPage from "@/pages/new-products";

const routes: RouteObject[] = [
  {
    path: Routes.HOME,
    element: MainPage,
  },
  {
    path: Routes.PRODUCTS,
    element: ProductsPage,
  },
  {
    path: Routes.NEW_PRODUCT,
    element: NewProductPage,
  },
]

export default routes;