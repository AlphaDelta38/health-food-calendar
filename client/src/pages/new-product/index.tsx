import FlexBox from "@/shared/ui/flexbox.js";
import ProductInfoHeader from "@/features/products/components/headers/product-info-header/index.js";
import ProductNutrientsContent from "@/features/products/components/contents/product-nutrients-content.js";
import { MainMacroNutrients, SecondNutrients } from "@features/products/types/index.js";
import { useState } from "react";
import { UserProduct } from "@/shared/types/entities/user-product.js";
import { Nutrients } from "@/shared/types/entities/nutrients.types";
import { useCreateProduct } from "@/api/services/post/products-service";


const mainMacroNutrients: MainMacroNutrients = {
  energy_kcal_100g: 0,
  proteins_100g: 0,
  fat_100g: 0,
  saturated_fat_100g: 0,
  carbohydrates_100g: 0,
  sugars_100g: 0,
  fiber_100g: 0,
}

const secondNutrients: SecondNutrients = {
  salt_100g: 0,
  sodium_100g: 0,
  energy_100g: 0,
  cholesterol_100g: 0,
  trans_fat_100g: 0,
}


function NewProductPage() {
  const [newProduct, setNewProduct] = useState<UserProduct>({
    id: "1",
    product_name: "",
    image_url: "",
    nutriments: {
      ...mainMacroNutrients,
      ...secondNutrients,
    },
  });

  const { trigger: createProductTrigger } = useCreateProduct();

  const headerDataChangeCallback = (data: Pick<UserProduct, "product_name" | "image_url"> ) => {
    setNewProduct(prev => ({
      ...prev,
      ...data,
    }));
  };

  const setNutrients = (data: Nutrients) => {
    setNewProduct(prev => ({
      ...prev,
      nutrients: {
        ...prev.nutriments,
        ...data,
      },
    }));
  };

  const onSave = async () => {
    const {id, ...product} = newProduct;
    const test = await createProductTrigger(product);
    console.log(test);
  };

  return (
    <FlexBox width="100%" height="100%" flexDirection="column" padding="24px 16px">
      <ProductInfoHeader product={newProduct} onDataChange={headerDataChangeCallback} onSave={onSave} />
      <ProductNutrientsContent nutriments={newProduct.nutriments} setNutrients={setNutrients} editable />
    </FlexBox>
  )
}

export default NewProductPage;