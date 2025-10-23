import { Box } from "@mui/material"
import { useSidebar } from "../../context"
import useSidebarOffset from "../../hooks/sidebar-offset.hook"

export const GeneralSidebarContent = () => {
  const sidebar = useSidebar()
  const ref = useSidebarOffset(sidebar.setSidebarOffset)

  return (
    <Box
      ref={ref}
      width="100%" 
      height="100%" 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      padding="6px"
    >
      
    </Box>
  )
}
