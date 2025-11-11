import { CSSProperties, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

interface Props {
  items: string[]
  value: string
  onChange: (event: SelectChangeEvent<string>) => void
  className?: string
  styles: CSSProperties
}

function Select({ items, value, onChange, className, styles }: Props){
  return (
    <MuiSelect value={value} onChange={onChange} className={className} sx={styles}>
      {items.map((item: string) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </MuiSelect>
  )
}

export default Select;
