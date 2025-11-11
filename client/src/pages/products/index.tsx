import { Box, Divider } from "@mui/material";
import ProductsHeader from "./components/products-header";
import ProductContent from "./components/product-content/index.";

function ProductsPage(){
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="start"
      flexDirection="column" 
      width="100%" 
      height="100%"
    >
      <ProductsHeader />
      <Divider className="w-full" />

    </Box>
  )
}

export default ProductsPage;
