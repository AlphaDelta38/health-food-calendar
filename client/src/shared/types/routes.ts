enum Routes {
  HOME = '/',
  PRODUCTS = '/products',
  PRODUCT_DETAILS = '/products/:id',
  NEW_PRODUCT = '/products/new',
  OFF_PRODUCT = '/products/off',
  OFF_PRODUCT_DETAILS = '/products/off/:id',
  DISHES = '/dishes',
  DISH_DETAILS = '/dishes/:id',
  DISH_NEW = '/dishes/new',
}

type RouteObject = {
  path: Routes;
  element: React.ComponentType;
}

export {
  Routes,
  RouteObject,
}
