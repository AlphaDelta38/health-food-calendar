import { useState } from "react";
import { Dish } from "@/shared/types/entities/dishes";
import FlexBox from "@/shared/ui/flexbox";
import DishInfoHeader from "../../features/dishes/components/headers/dish-info-header/dishInfoHeader";
import DishesContent from "../../features/dishes/components/contents/dishContent";
import { mainMacroNutrients, secondNutrients } from "@/shared/constants/nutrients";
import { useCreateDish } from "@/api/services/post/dishes-service";

const defaultDish: Dish = {
  id: "",
  name: "",
  imageUrl: "",
  ingredients: {
    myIngredientsIds: [],
    openFactFoodsIngredientsIds: [],
  }, 
}

function NewDishPage() {
  const [dish, setDish] = useState<Dish>(defaultDish);

  const {trigger: createDish} = useCreateDish()


  const onDataChange = (data: Pick<Dish, "name" | "imageUrl">) => {
    setDish(prev => ({ ...prev, ...data }));
  }

  const onSave = async () => {
    const {id, ...newDish} = dish;
    createDish(newDish)
  }

  return (
    <FlexBox 
      width="100%" 
      height="100%" 
      flexDirection="column" 
      padding="24px 16px" 
      maxWidth="1440px" 
      margin="0 auto"
    >
      <DishInfoHeader dish={dish} onDataChange={onDataChange} onSave={onSave} onlyReadable={false} />
      <DishesContent  editable={false} nutriments={{...mainMacroNutrients, ...secondNutrients}} setNutrients={()=>{}} />
    </FlexBox>
  )
}

export default NewDishPage;