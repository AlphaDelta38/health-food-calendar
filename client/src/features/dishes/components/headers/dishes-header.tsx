import FlexBox from "@/shared/ui/flexbox";
import Icon from "@/shared/ui/icon";
import { Button, Typography } from "@mui/material";

interface props {
  onCreateBtn: () => void;
}

function DishesHeader({ onCreateBtn }: props) {
  return (
    <FlexBox 
      display="flex" 
      width="100%" 
      padding="24px 32px" 
      justifyContent="space-between"  
      alignItems="center"
    >
      <Typography variant="h3">Dishes</Typography>
      <FlexBox gap="16px">
        <Button 
          onClick={onCreateBtn}
          variant="contained" 
          color="primary" 
          startIcon={
            <Icon name="Plus" size={24} />
          }
        >
          <Typography variant="body1">Create dish</Typography>
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default DishesHeader;