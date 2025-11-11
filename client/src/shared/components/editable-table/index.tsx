import { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columnsType, rowsType } from "../../types/components/editable-tables";
import FlexBox from "../../ui/flexbox";
import clsx from "clsx";

import styles from "./index.module.scss";
import prepareTableColumns from "@/shared/utils/prepare-table-columns";

interface Props<T> {
  className?: string;
  fetchRowsData: () => Promise<[rowsType<T>, string[]]>;
  getRowsDataRef: React.RefObject<() => rowsType<T>>;
}

export default function EditableTable<T>({ className, fetchRowsData, getRowsDataRef }: Props<T>) {
  const [rowsData, setRowsData] = useState<rowsType<T>>([]);
  const [columns, setColumns] = useState<columnsType<T>>([]);

  const getData = useCallback(() => {
    return rowsData;
  }, [rowsData]);

  const fetchRowsDataHandler = async () => {
    const [rows, nonEditableFields] = await fetchRowsData();
    const columns = prepareTableColumns<T>(Object.keys(rows[0]), nonEditableFields);

    setColumns(columns);
    setRowsData(rows);
  }

  useEffect(() => {
    fetchRowsDataHandler();
  }, []);

  useEffect(() => {
    getRowsDataRef.current = getData;
  }, [getData, getRowsDataRef]);

  return (
    <FlexBox width="100%" height="100%">
      <DataGrid
        className={clsx(styles.editableTable, className)}
        rows={rowsData}
        columns={columns}
        hideFooterPagination
        processRowUpdate={(newRow) => {
          setRowsData(prev => {
            return prev.map(row => row.id === newRow.id ? newRow : row);
          });

          return newRow;
        }}
      />
    </FlexBox>
  );
}
