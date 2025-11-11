import { Box, List } from "@mui/material"
import { GeneralSidebarItem } from "../ui/general-sidebar-item"


interface Props {
  items: {
    title: string
    icon: React.ReactNode
    path: string
  }[]
  onClick: (path: string) => void
}

export function GeneralSidebarList({ items, onClick }: Props) {
  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="start">
      <List>
        {
          items.map((item) => (
            <GeneralSidebarItem 
              key={item.title} 
              icon={item.icon} 
              title={item.title} 
              onClick={() => onClick(item.path)} 
            />
          ))
        }
      </List>
    </Box>
  )
}