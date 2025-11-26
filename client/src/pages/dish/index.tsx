import { useEffect, useMemo, useState } from "react";
import { Dish } from "@/shared/types/entities/dishes";
import FlexBox from "@/shared/ui/flexbox";
import DishInfoHeader from "../../features/dishes/components/headers/dish-info-header/dishInfoHeader";
import DishesContent from "../../features/dishes/components/contents/dishContent";
import { useGetDish } from "@/api/services/query/dishes-service";
import { useParams } from "react-router-dom";
import { OffProduct } from "@/shared/types/entities/off-products.types";
import { UserProduct } from "@/shared/types/entities/user-product";
import { useUpdateDish } from "@/api/services/post/dishes-service";
import { Avatar, Button, Typography } from "@mui/material";
import { Nutrients } from "@/shared/types/entities/nutrients.types";
import { mainMacroNutrients, secondNutrients } from "@/shared/constants/nutrients";
import Accordion from "@/shared/components/accordian";

import styles from "./index.module.scss";
import ProductNutrientsContent from "@/features/products/components/contents/product-nutrients-content";
import Icon from "@/shared/ui/icon";


function DeleteIngredientBtn({ onDelete }: { onDelete: () => void }) {

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete();
  }

  return (
    <Button onClick={handleDelete} size="small" color="primary" className={styles.deleteIngredientBtn}>
      <Icon name="Trash" />
      <Typography variant="body2">Delete</Typography>
    </Button>
  )
}

function DishPage() {
  const [dish, setDish] = useState<Dish & {myIngredients: UserProduct[], openFactFoodsIngredients: OffProduct[]} | undefined>(undefined);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const { id } = useParams();

  const { data } = useGetDish(id ?? "");
  const { trigger: updateDish } = useUpdateDish();

  useEffect(() => {
    if (data) {
      setDish({
        ...data.dish,
        myIngredients: data.myIngredients,
        openFactFoodsIngredients: data.openFactFoodsIngredients,
      });
    }
  }, [data]);

  const onDataChange = (data: Pick<Dish, "name" | "imageUrl">) => {
    setDish(prev => prev ? { ...prev, ...data } : undefined);
  }

  const onSave = async () => {
    if (!dish) return;

    const {myIngredients, openFactFoodsIngredients, ...dishData} = dish;

    setReadOnly(true);
    updateDish({
      ...dishData,
    });
  }

  const Nutriments: Nutrients = useMemo(() => {
    const summNutriments: Required<Nutrients> = {
      ...mainMacroNutrients,
      ...secondNutrients,
    }

    if (dish?.myIngredients && dish?.openFactFoodsIngredients) {
      for (const ingredient of dish?.myIngredients) {
        const keys = Object.keys(ingredient.nutriments);
        for (const key of keys) {
          summNutriments[key as keyof Nutrients] += ingredient.nutriments[key as keyof Nutrients] ?? 0;
        }
      }

      for (const offProduct of dish?.openFactFoodsIngredients) {
        if (!offProduct?.nutriments) continue;

        const keys = Object.keys(offProduct.nutriments);
        for (const key of keys) {
          const transformedKey = key.replace("-", "_") as keyof Nutrients;
          summNutriments[transformedKey] += offProduct.nutriments[key as keyof Nutrients] ?? 0;
        }
      
      }
    }

    return summNutriments;
  }, [dish?.myIngredients, dish?.openFactFoodsIngredients]);

  
  const handleDeleteMyIngredient = (id: string) => {
    setDish(prev => prev ? {
       ...prev, 
       ingredients: {
        ...prev.ingredients,
        myIngredientsIds: prev.ingredients.myIngredientsIds.filter(ingredientId => ingredientId !== id),
       },
       myIngredients: prev.myIngredients.filter(i => i.id !== id) 
      } : undefined
    );
  }

  const handleDeleteOpenFactFoodsIngredient = (id: string) => {
    setDish(prev => prev ? {
      ...prev,
      ingredients: {
          ...prev.ingredients,
          openFactFoodsIngredientsIds: prev.ingredients.openFactFoodsIngredientsIds.filter(ingredientId => ingredientId !== id),
        },
        openFactFoodsIngredients: prev.openFactFoodsIngredients.filter(ingredient => ingredient.code !== id)
      } : undefined
    );
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
      <DishInfoHeader dish={dish} onDataChange={onDataChange} onSave={onSave} onlyReadable={readOnly} additionalActions={
        <>
          {readOnly && <Button fullWidth onClick={() => setReadOnly(false)} variant="contained" color="primary">Edit</Button>}
          {!readOnly && <Button fullWidth onClick={() => setReadOnly(true)} variant="contained" color="primary">cancel</Button>}
        </>
      } />
      <DishesContent  editable={false} nutriments={Nutriments} setNutrients={()=>{}} />
      <FlexBox className={styles.container} flexDirection="column" gap="16px">

        {dish?.myIngredients.map((ingredient)=>
          <Accordion title={ingredient.product_name} children={
            <FlexBox  gap="16px" alignItems="start">
              <Avatar src={ingredient.image_url} variant="square" className={styles.avatar}/>
              <ProductNutrientsContent editable={false} nutriments={ingredient.nutriments} setNutrients={()=>{}} className={styles.nutrientsContent}/>
            </FlexBox>
          } className={styles.accordion} additionalActions={readOnly ? undefined : <DeleteIngredientBtn onDelete={() => {
            handleDeleteMyIngredient(ingredient.id);
          }} />} />
        )}

        {dish?.openFactFoodsIngredients.filter((ingredient)=> ingredient?.nutriments).map((ingredient)=>
          <Accordion title={ingredient.product_name ?? "Unknown product name"} children={
            <FlexBox  gap="16px" alignItems="start">
              <Avatar src={ingredient.image_url} variant="square" className={styles.avatar}/>
              <ProductNutrientsContent editable={false} nutriments={ingredient.nutriments} setNutrients={()=>{}} className={styles.nutrientsContent}/>
            </FlexBox>
          } className={styles.accordion} additionalActions={readOnly ? undefined : <DeleteIngredientBtn onDelete={() => {
            handleDeleteOpenFactFoodsIngredient(ingredient.code);
          }} />} />
        )}

      </FlexBox>
    </FlexBox>
  )
}

export default DishPage;