import { columnsType } from "../types/components/editable-tables";

function prepareTableColumns<T>(keys: string[], nonEditableFields: string[]): columnsType<T> {
  const columns: columnsType<T> = [
    { field: "id", headerName: "ID" },
  ];

  keys.forEach(key => {
    if (key === "id") return;

    columns.push({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      editable: !nonEditableFields.includes(key),
      flex: 1,
    });
  });

  return columns;
}

export default prepareTableColumns;