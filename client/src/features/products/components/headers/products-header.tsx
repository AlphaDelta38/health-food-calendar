import DishesContent from "@/features/dishes/components/contents/dishes-content";
import { WordBasedSelect } from "@/shared/components";
import { WordBasedSelectItem } from "@/shared/types/components";
import { Dish } from "@/shared/types/entities/dishes";
import { Routes } from "@/shared/types/routes";
import FlexBox from "@/shared/ui/flexbox";
import Icon from "@/shared/ui/icon";
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  items: WordBasedSelectItem[];
  selectedCategory: WordBasedSelectItem;
  setSelectedCategory: (category: WordBasedSelectItem) => void;
  onAddProductToDish: (dish: Dish) => void;
}

function ProductsHeader({ items, selectedCategory, setSelectedCategory, onAddProductToDish }: Props) {
  const [open, setOpen] = useState(false);
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
          onClick={() => setOpen(true)}
        >
          <Typography variant="body1">Add products to dish</Typography>
        </Button>
      </FlexBox>
      <Dialog
        open={open}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "1700px",
              maxHeight: "1200px",
            },
          },
        }}
      >
        <FlexBox width="100%" justifyContent="space-between" alignItems="center" marginTop="16px">
          <DialogTitle>Add products to dish</DialogTitle>
          <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </FlexBox>
        <DialogContent>
          <DishesContent onDishClick={(dish) => {
            onAddProductToDish(dish);
            setOpen(false);
          }} actionBarVisible={false} />
        </DialogContent>
      </Dialog>

    </Box>
  )
}

export default ProductsHeader;
