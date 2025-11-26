import { GridColDef, GridRowsProp } from "@mui/x-data-grid"

export type rowsType<T> = GridRowsProp<T & { id: number }>
export type columnsType<T> = GridColDef<T & { id: number }>[]
