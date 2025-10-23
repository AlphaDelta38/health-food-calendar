import { Routes, RouteObject } from "@app-types/routes";
import Main from "@/pages/main/index";

const routes: RouteObject[] = [
  {
    path: Routes.HOME,
    element: Main,
  },
]

export default routes;