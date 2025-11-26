import { 
  Drawer, 
  Box, 
  Typography,
  IconButton
} from "@mui/material";
import { useSidebar } from "./context";
import { HeaderProps } from "./types";
import { GetSidebarContent } from "./sidebars-content";
import Icon from "@/shared/ui/icon";


export default function Sidebar() {
  const sidebar = useSidebar()
  const headerIsActive = sidebar.sidebar?.headerProps?.isActive ?? true;

  return (
    <Box sx={{ marginRight: `${sidebar.sidebarOffset}px` }} maxWidth="1px">
      <Drawer variant="persistent" open={true}>
        {
          headerIsActive && <Header {...(sidebar.sidebar?.headerProps ?? {})} onClose={sidebar.close} onCloseAll={sidebar.closeAll} />
        }
        <GetSidebarContent sidebarKey={sidebar.sidebar.sidebarKey} sideBarProps={sidebar.sidebar.sideBarProps} />
      </Drawer>
    </Box>
  )
}


function Header(props: HeaderProps & { onClose: () => void, onCloseAll: () => void }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      padding="6px"
    >
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        width="100%"
        gap="24px"
      >
        <IconButton onClick={props.onClose} sx={{ padding: "4px" }}>
          <Icon name="ArrowLeft" size={24}/>
        </IconButton>

        {props?.icon 
          ?  
          <Box onClick={props.onClick} display="flex" alignItems="center" gap="8px"> 
            {props.icon} 
            <Typography variant="h6" onClick={props.onClick}>
              {props.title ?? "Sidebar"}
            </Typography>
          </Box>
          : 
          <Typography variant="h6" onClick={props.onClick}>
            {props.title ?? "Sidebar"}
          </Typography>
        }

        <IconButton onClick={props.onCloseAll} sx={{ padding: "4px" }}>
          <Icon name="X" size={24} />
        </IconButton>
      </Box>
    </Box>
  )
}
