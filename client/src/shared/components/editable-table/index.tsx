import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columnsType, rowsType } from "../../types/components/editable-tables";
import { TransformHeaderName } from "@/shared/types/utils/prepare-table-columns";
import FlexBox from "../../ui/flexbox";
import clsx from "clsx";

import styles from "./index.module.scss";
import prepareTableColumns from "@/shared/utils/prepare-table-columns";



interface Props<T> {
  className?: string;
  rowsData: rowsType<T>;
  setRowsData: (rowData: T & { id: number }) => void;
  disableColumnMenu?: boolean;
  nonEditableFields?: string[];
  editable?: boolean;
  transformHeaderName?: TransformHeaderName;
}

export default function EditableTable<T>({ 
  className, 
  rowsData, 
  setRowsData, 
  transformHeaderName, 
  editable, 
  disableColumnMenu = true, 
  nonEditableFields = [] 
}: Props<T>) {
  const [columns, setColumns] = useState<columnsType<T>>([]);
  
  useEffect(() => {
    const columns = prepareTableColumns<T>(
      Object.keys(rowsData[0]), 
      editable ? nonEditableFields : Object.keys(rowsData[0]), 
      disableColumnMenu, 
      transformHeaderName
    );

    setColumns(columns);
  }, [editable, disableColumnMenu, rowsData]);


  return (
    <FlexBox width="100%" height="100%" flexDirection="column" gap="16px">
      <DataGrid
        className={clsx(styles.editableTable, className)}
        rows={rowsData}
        columns={columns}
        hideFooter
        hideFooterPagination
        columnVisibilityModel={{
          id: false,
        }}
        processRowUpdate={(newRow) => {
          setRowsData(newRow);

          return newRow;
        }}
      />
    </FlexBox>
  );
}
