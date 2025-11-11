import {
  Box, 
  ButtonBase, 
  Typography, 
  MenuItem, 
  Menu, 
  TypographyProps,
  MenuItemProps,
} from "@mui/material"
import { useState } from "react"
import type { WordBasedSelectItem } from "@/shared/types/components"
import Icon from "@/shared/ui/icon"


interface Props {
  items: WordBasedSelectItem[]
  value: WordBasedSelectItem
  onChange: (value: WordBasedSelectItem) => void
  className?: string
  styles?: {
    chosenVariant?: TypographyProps
    menuItemVariant?: MenuItemProps
  }
}

function WordBasedSelect({ items, value, onChange, className, styles }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" gap={1} className={className} sx={styles}>

    <ButtonBase
      onClick={handleClick}
      aria-controls={open ? "simple-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      sx={{
        borderRadius: 1,
        px: 0.5,
        py: 0.25,
        gap: 2,
        "&:hover": { backgroundColor: "action.hover" },
      }}
    >
      <Typography variant="h3" {...(styles?.chosenVariant ?? {})}>
        {value ? value.label : "Choose category"}
      </Typography>
      <Icon name={"ChevronDown"} style={{ transform: open ? `rotate(180deg)` : `rotate(0deg)`, transition: "transform 0.2s ease-in-out" }} size={26} />
    </ButtonBase>

    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "text-trigger",
        role: "listbox",
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      disableAutoFocusItem={false}
    >
      {items.map((item) => (
        <MenuItem
          {...(styles?.menuItemVariant ?? {})}
          key={item.value}
          selected={value.value === item.value}
          onClick={() => onChange(item)}
        >
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  </Box>
  )
}

export default WordBasedSelect;