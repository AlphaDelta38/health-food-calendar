import FlexBox from "@/shared/ui/flexbox.js";
import ProductNutrientsContent from "@/features/products/components/contents/product-nutrients-content.js";
import { useLocation } from "react-router-dom";
import OffProductInfoHeader from "@/features/products/components/headers/off-product-info-header";
import { getOpenFoodFactsProduct } from "@/api/services/query/off-products-service";




function OffProductPage() {
  const location = useLocation()
  const path = location.pathname.split("/")
  const id = path[path.length - 1]

  const { data } = getOpenFoodFactsProduct(id)

  return (
    <FlexBox width="100%" height="100%" flexDirection="column" padding="24px 16px">
      <OffProductInfoHeader product={data} />
      <ProductNutrientsContent nutriments={data?.nutriments || {}} setNutrients={() => {}} editable={false}/>
    </FlexBox>
  )
}

export default OffProductPage;