import EditableTable from "@/shared/components/editable-table";
import { MainMacroNutrients, SecondNutrients } from "@features/products/types/index.js";
import FlexBox from "@/shared/ui/flexbox";
import { Typography } from "@mui/material";
import { Nutrients } from "@/shared/types/entities/nutrients.types";

interface Props {
  nutriments: Nutrients;
  setNutrients: (data: Nutrients) => void;
  editable: boolean;
  className?: string;
}

function ProductNutrientsContent({ nutriments, setNutrients, editable = true, className }: Props) {
  function transformHeaderName(headerName: string): string {
    return headerName.charAt(0).toUpperCase() + headerName.slice(1).replace("_100g", "").replace("_", " ");
  }

  function setRowsDataCallback(rowData: (MainMacroNutrients | SecondNutrients) & { id: number }) {
    const { id, ...nutrients } = rowData;
    setNutrients(nutrients);
  }

  return (
    <FlexBox width="100%" height="100%" padding="16px 8px" maxWidth="1440px" flexDirection="column" gap="16px" marginTop="40px" className={className}>
      <Typography variant="h4">Nutritional information per 100 g</Typography>
      
      <FlexBox width="100%" height="100%" flexDirection="column" gap="16px" alignItems="start">
        <Typography variant="h5">Main macro nutrients</Typography>
        <EditableTable<MainMacroNutrients> rowsData={[{
          id: 1,
          energy_kcal_100g: nutriments?.energy_kcal_100g ?? 0,
          proteins_100g: nutriments?.proteins_100g ?? 0,
          fat_100g: nutriments?.fat_100g ?? 0,
          saturated_fat_100g: nutriments?.saturated_fat_100g ?? 0,
          carbohydrates_100g: nutriments?.carbohydrates_100g ?? 0,
          sugars_100g: nutriments?.sugars_100g ?? 0,
          fiber_100g: nutriments?.fiber_100g ?? 0,
        }]} setRowsData={setRowsDataCallback} transformHeaderName={transformHeaderName} editable={editable} />

        <Typography variant="h5">Second nutrients</Typography>
        <EditableTable<SecondNutrients> rowsData={[{
          id: 1,
          salt_100g: nutriments?.salt_100g ?? 0,
          sodium_100g: nutriments?.sodium_100g ?? 0,
          energy_100g: nutriments?.energy_100g ?? 0,
          cholesterol_100g: nutriments?.cholesterol_100g ?? 0,
          trans_fat_100g: nutriments?.trans_fat_100g ?? 0,
        }]} setRowsData={setRowsDataCallback} transformHeaderName={transformHeaderName} editable={editable} />

      </FlexBox>
    </FlexBox>
  )
}


export default ProductNutrientsContent;