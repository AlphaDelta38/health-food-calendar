import { InputAdornment, TextField } from "@mui/material"
import Icon from "@/shared/ui/icon"
import { ChangeEvent } from "react"
import useDebounce from "@/shared/hooks/useDebounce"

interface Props {
  placeholder?: string
  value?: string
  onSearch: (value: string) => void
}

function SearchField({ placeholder = "Search...", value, onSearch }: Props) {
  const { debounce } = useDebounce();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => onSearch(event.target.value));
  }
  
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon name="Search" size={24} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchField;