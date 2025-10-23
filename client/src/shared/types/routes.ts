enum Routes {
  HOME = '/',
}

type RouteObject = {
  path: Routes;
  element: React.ComponentType;
}



export {
  Routes,
  RouteObject,
}