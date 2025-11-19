import { Box, Divider } from "@mui/material";
import ProductsHeader from "@features/products/components/headers/products-header";
import OffProductsContent from "@/features/products/components/contents/off-products-content";
import { WordBasedSelectItem } from "@/shared/types/components";
import ProductsContent from "@/features/products/components/contents/products-content";
import usePersistantState from "@/shared/utils/persistant-state";
import { PersistantLCKeys } from "@/shared/types/utils/persistant-statete";


const items: WordBasedSelectItem[] = [{label: "My products", value: "myProducts"}, {label: "Open food facts", value: "offProducts"}];

function ProductsPage(){
  const [selectedCategory, setSelectedCategory] = usePersistantState<PersistantLCKeys.PRODUCTS_SELECTED_CATEGORY>(
    PersistantLCKeys.PRODUCTS_SELECTED_CATEGORY, 
    {label: "My products", value: "myProducts"}
  );

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="start"
      flexDirection="column" 
      width="100%" 
      height="100%"
    >
      <ProductsHeader items={items} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Divider className="w-full" />
      {selectedCategory.value === "offProducts" && <OffProductsContent />}
      {selectedCategory.value === "myProducts" && <ProductsContent />}
    </Box>
  )
}

export default ProductsPage;
