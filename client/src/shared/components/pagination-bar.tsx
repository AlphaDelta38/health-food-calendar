import { Pagination, PaginationProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props extends Omit<PaginationProps, 'count' | 'page' | 'onChange'> {
  count: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

function PaginationBar({ count, page, setPage, ...props }: Props) {

  return (
    <Pagination 
      count={count}
      page={page}
      onChange={(_, value) => {
        setPage(value);
      }}
      {...props}
    />
  )
}

export default PaginationBar;