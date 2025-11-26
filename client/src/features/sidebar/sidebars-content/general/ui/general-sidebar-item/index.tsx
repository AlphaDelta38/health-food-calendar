import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

import styles from './index.module.scss'


interface Props {
  title: string
  icon: React.ReactNode
  onClick: () => void
}

export function GeneralSidebarItem({ title, icon, onClick }: Props) {
  return (
    <ListItem onClick={onClick} className={styles.sidebarItem}>
      <ListItemIcon sx={{ minWidth: 24, marginRight: 2 }}>
        {icon}
      </ListItemIcon>
      <ListItemText>
        {title}
      </ListItemText>
    </ListItem>
  )
}
