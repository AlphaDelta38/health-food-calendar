import { Routes } from "@/shared/types/routes";
import Icon from "@/shared/ui/icon";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ProductsHeader() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(Routes.NEW_PRODUCT);
  }

  return (
    <Box 
      display="flex" 
      width="100%" 
      padding="24px 16px" 
      justifyContent="space-between"  
      alignItems="center"
    >
      <Typography variant="h6">Products</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={
          <Icon name="Plus" size={24} />
        }
      >
        <Typography onClick={handleAddProduct} variant="body1">Add product</Typography>
      </Button>
    </Box>
  )
}

export default ProductsHeader;
