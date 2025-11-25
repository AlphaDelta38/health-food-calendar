import { Routes, RouteObject } from "@app-types/routes";
import MainPage from "@/pages/main/index";
import ProductsPage from "@/pages/products";
import NewProductPage from "@/pages/new-product";
import OffProductPage from "@/pages/off-product/index.js";
import ProductPage from "@/pages/product";
import DishesPage from "@/pages/dishes";
import NewDishPage from "@/pages/new-dish";
import DishPage from "@/pages/dish";

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
    path: Routes.PRODUCT_DETAILS,
    element: ProductPage,
  },
  {
    path: Routes.NEW_PRODUCT,
    element: NewProductPage,
  },
  {
    path: Routes.OFF_PRODUCT_DETAILS,
    element: OffProductPage,
  },
  {
    path: Routes.DISHES,
    element: DishesPage,
  },
  {
    path: Routes.DISH_NEW,
    element: NewDishPage,
  },
  {
    path: Routes.DISH_DETAILS,
    element: DishPage,
  }
]

export default routes;