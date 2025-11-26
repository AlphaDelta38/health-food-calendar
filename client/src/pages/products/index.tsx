import { Box, Divider } from "@mui/material";
import ProductsHeader from "@features/products/components/headers/products-header";
import OffProductsContent from "@/features/products/components/contents/off-products-content";
import { WordBasedSelectItem } from "@/shared/types/components";
import ProductsContent from "@/features/products/components/contents/products-content";
import usePersistantState from "@/shared/utils/persistant-state";
import { PersistantLCKeys } from "@/shared/types/utils/persistant-statete";
import { useUpdateDish } from "@/api/services/post/dishes-service";
import { Dish } from "@/shared/types/entities/dishes";



const items: WordBasedSelectItem[] = [{label: "My products", value: "myProducts"}, {label: "Open food facts", value: "offProducts"}];

function ProductsPage(){
  const [chosenProducts, setChosenProducts] = usePersistantState<PersistantLCKeys.PRODUCTS_SELECTED_PRODUCTS>(
    PersistantLCKeys.PRODUCTS_SELECTED_PRODUCTS, 
    {myProducts: [], offProducts: []}
  );
  const [selectedCategory, setSelectedCategory] = usePersistantState<PersistantLCKeys.PRODUCTS_SELECTED_CATEGORY>(
    PersistantLCKeys.PRODUCTS_SELECTED_CATEGORY, 
    {label: "My products", value: "myProducts"}
  );

  const {trigger: updateDishTrigger} = useUpdateDish();

  const handleAddProductToDish = (dish: Dish) => {
    updateDishTrigger({
      ...dish,
      ingredients: {
        myIngredientsIds: [
          ...dish.ingredients.myIngredientsIds, 
          ...(chosenProducts.myProducts.filter((id) => !dish.ingredients.myIngredientsIds.includes(id)))
        ],
        openFactFoodsIngredientsIds: [
          ...dish.ingredients.openFactFoodsIngredientsIds, 
          ...(chosenProducts.offProducts.filter((id) => !dish.ingredients.openFactFoodsIngredientsIds.includes(id)))
        ],
      },
    });
    setChosenProducts({myProducts: [], offProducts: []});
  }
  

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="start"
      flexDirection="column" 
      width="100%" 
      height="100%"
    >
      <ProductsHeader items={items} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onAddProductToDish={handleAddProductToDish} />
      <Divider className="w-full" />
      {selectedCategory.value === "offProducts" && <OffProductsContent chosenProducts={chosenProducts} setChosenProducts={(setChosenProducts)} />}
      {selectedCategory.value === "myProducts" && <ProductsContent chosenProducts={chosenProducts} setChosenProducts={setChosenProducts} />}
    </Box>
  )
}

export default ProductsPage;
