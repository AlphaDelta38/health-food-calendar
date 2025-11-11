import { BrowserRouter, Routes, Route} from "react-router-dom";
import { RouteObject } from "@app-types/routes";
import routes from "@/routes";
import SideBarLayout from "@/layouts/sidebar/index";
import { GlobalProvider } from "@/shared/contexts/global-provider";


import "@shared/styles/global.scss";


function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
            {
              routes.map((route: RouteObject) => (
                <Route key={route.path} path={route.path} element=
                  {
                    <SideBarLayout>
                      <route.element />
                    </SideBarLayout>
                  } 
                />
              ))
            }
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  )
}

export default App
