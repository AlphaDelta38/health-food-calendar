enum Routes {
  HOME = '/',
  PRODUCTS = '/products',
  PRODUCT_DETAILS = '/products/:id',
  NEW_PRODUCT = '/products/new',
  OFF_PRODUCT = '/products/off',
  OFF_PRODUCT_DETAILS = '/products/off/:id',
}

type RouteObject = {
  path: Routes;
  element: React.ComponentType;
}

export {
  Routes,
  RouteObject,
}
