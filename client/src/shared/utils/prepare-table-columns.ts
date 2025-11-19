import { columnsType } from "../types/components/editable-tables";
import { TransformHeaderName } from "../types/utils/prepare-table-columns";

function prepareTableColumns<T>(keys: string[], nonEditableFields: string[], disableColumnMenu: boolean = true, transformHeaderName?: TransformHeaderName): columnsType<T> {
  const columns: columnsType<T> = [
    { field: "id", headerName: "ID" },
  ];

  keys.forEach(key => {
    if (key === "id") return;

    columns.push({
      field: key,
      headerName: transformHeaderName?.(key) ?? key.charAt(0).toUpperCase() + key.slice(1),
      editable: !nonEditableFields.includes(key),
      disableColumnMenu,
      flex: 1,
    });
  });

  return columns;
}

export default prepareTableColumns;