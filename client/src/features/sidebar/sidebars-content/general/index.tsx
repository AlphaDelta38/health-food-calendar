import { Box } from "@mui/material"
import Icon from "@/shared/ui/icon"
import { useSidebar } from "../../context"
import useSidebarOffset from "../../hooks/sidebar-offset.hook"
import { GeneralSidebarList } from "./components/general-sidebar-list"
import { useNavigate } from "react-router-dom"
import { Routes } from "@/shared/types/routes"


const items = [
  {
    title: "Home",
    icon: <Icon name="Home" />,
    path: "/"
  },
  {
    title: "Calendar",
    icon: <Icon name="CalendarDays" />,
    path: "/"
  },
  {
    title: "My Products",
    icon: <Icon name="Apple" />,
    path: Routes.PRODUCTS
  },
  {
    title: "My Recipes",
    icon: <Icon name="Salad" />,
    path: Routes.DISHES
  },
  {
    title: "Statistics",
    icon: <Icon name="ChartNoAxesCombined" />,
    path: "/"
  },
]


export const GeneralSidebarContent = () => {
  const sidebar = useSidebar()
  const ref = useSidebarOffset(sidebar.setSidebarOffset)
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      ref={ref}
      width="100%" 
      height="100%" 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      padding="12px 6px"
    >
      <GeneralSidebarList items={items} onClick={handleClick} />
    </Box>
  )
}
