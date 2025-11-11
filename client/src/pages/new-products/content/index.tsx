import EditableTable from "@/shared/components/editable-table";
import { rowsType } from "@/shared/types/components/editable-tables";
import { Nutrients } from "@/shared/types/entities/nutrients.types";
import FlexBox from "@/shared/ui/flexbox";
import { useRef } from "react";

function NewProductContent() {
  const getRowsData = useRef<() => rowsType<Nutrients>>(() => {
    return [];
  })

  async function fetchRowsDataCallback(): Promise<[rowsType<Nutrients>, string[]]> {
    return [[
      { id: 1, energy_kcal_100g: 100, proteins_100g: 100, fat_100g: 100, saturated_fat_100g: 100, carbohydrates_100g: 100, sugars_100g: 100, fiber_100g: 100, salt_100g: 100, sodium_100g: 100, energy_100g: 100, cholesterol_100g: 100, trans_fat_100g: 100 },
    ], []];
  }

  return (
    <FlexBox width="100%" height="100%" padding="16px 8px" maxWidth="1440px">
      <EditableTable<Nutrients> fetchRowsData={fetchRowsDataCallback} getRowsDataRef={getRowsData} />
    </FlexBox>
  )
}


export default NewProductContent;