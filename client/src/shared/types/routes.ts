enum Routes {
  HOME = '/',
  PRODUCTS = '/products',
  NEW_PRODUCT = '/products/new',
}

type RouteObject = {
  path: Routes;
  element: React.ComponentType;
}

export {
  Routes,
  RouteObject,
}
