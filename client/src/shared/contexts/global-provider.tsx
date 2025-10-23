import { PropsWithChildren } from "react";
import SidebarProvider from "../../features/sidebar/context/index";

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}