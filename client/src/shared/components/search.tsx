import { InputAdornment, TextField } from "@mui/material"
import Icon from "@/shared/ui/icon"
import { ChangeEvent, useEffect, useState } from "react"
import useDebounce from "@/shared/hooks/useDebounce"

interface Props {
  placeholder?: string
  value?: string
  onSearch: (value: string) => void
}

function SearchField({ placeholder = "Search...", value, onSearch }: Props) {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { debounce } = useDebounce();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounce(() => onSearch(event.target.value));
  }

  useEffect(() => {
    if (value !== "" && searchValue === null) {
      setSearchValue(value ?? "");
    }
  }, [value]);
  
  return (
    <TextField
      placeholder={placeholder}
      value={searchValue}
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