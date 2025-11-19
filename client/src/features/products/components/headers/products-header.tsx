import { WordBasedSelect } from "@/shared/components";
import { WordBasedSelectItem } from "@/shared/types/components";
import { Routes } from "@/shared/types/routes";
import FlexBox from "@/shared/ui/flexbox";
import Icon from "@/shared/ui/icon";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  items: WordBasedSelectItem[];
  selectedCategory: WordBasedSelectItem;
  setSelectedCategory: (category: WordBasedSelectItem) => void;
}

function ProductsHeader({ items, selectedCategory, setSelectedCategory }: Props) {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate(Routes.NEW_PRODUCT);
  }

  return (
    <Box 
      display="flex" 
      width="100%" 
      padding="24px 32px" 
      justifyContent="space-between"  
      alignItems="center"
    >
      <WordBasedSelect items={items} value={selectedCategory} onChange={setSelectedCategory}/>
      <FlexBox gap="16px">
        {
          selectedCategory.value === "myProducts" && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={
                <Icon name="Plus" size={24} />
              }
            >
              <Typography onClick={handleAddProduct} variant="body1">Add product</Typography>
            </Button>
          )
        }
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={
            <Icon name="Plus" size={24} />
          }
        >
          <Typography onClick={handleAddProduct} variant="body1">Add products to dish</Typography>
        </Button>
      </FlexBox>
    </Box>
  )
}

export default ProductsHeader;
