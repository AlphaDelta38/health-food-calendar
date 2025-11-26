import FlexBox from "@/shared/ui/flexbox.js";
import ProductNutrientsContent from "@/features/products/components/contents/product-nutrients-content.js"
import { useLocation } from "react-router-dom";
import { useGetProduct } from "@/api/services/query/products-service";
import ProductInfoHeader from "@/features/products/components/headers/product-info-header";
import { useEffect, useState } from "react";
import { UserProduct } from "@/shared/types/entities/user-product";
import { Button } from "@mui/material";
import { Nutrients } from "@/shared/types/entities/nutrients.types";
import { useUpdateProduct } from "@/api/services/post/products-service";


function ProductPage() {
  const location = useLocation()
  const path = location.pathname.split("/")
  const id = path[path.length - 1]

  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [productData, setProductData] = useState<UserProduct | undefined>(undefined);

  const { data } = useGetProduct(id)
  const { trigger: updateProductTrigger } = useUpdateProduct();
  
  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);

  const handleSave = async() => {
    setReadOnly(true);
    if (productData) {
      updateProductTrigger(productData);
    }
  }

  const handleHeaderDataChange = (data: Pick<UserProduct, "product_name" | "image_url">) => {
    setProductData(prev => prev ? { ...prev, ...data } : undefined);
  }

  const handleNutrientsDataChange = (data: Nutrients) => {
    setProductData(prev => prev ? { ...prev, nutriments: { ...prev.nutriments, ...data } } : undefined);
  }

  return (
    <FlexBox width="100%" height="100%" flexDirection="column" padding="24px 16px">
      <ProductInfoHeader 
        product={productData} 
        onDataChange={handleHeaderDataChange} 
        onSave={handleSave} 
        onlyReadable={readOnly} 
        additionalActions={
          readOnly && 
            <FlexBox gap="16px" flexDirection="column" width="100%">
              <Button fullWidth onClick={() => setReadOnly(!readOnly)} variant="contained" color="primary">Edit</Button>
              <Button fullWidth onClick={() => setReadOnly(!readOnly)} variant="contained" color="primary">Add to dish</Button>
            </FlexBox>
        }
      />
      <ProductNutrientsContent nutriments={productData?.nutriments || {}} setNutrients={handleNutrientsDataChange} editable={!readOnly}/>
    </FlexBox>
  )
}

export default ProductPage;