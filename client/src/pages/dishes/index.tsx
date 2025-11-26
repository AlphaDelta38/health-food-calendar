import FlexBox from "@/shared/ui/flexbox";
import DishesHeader from "@features/dishes/components/headers/dishes-header";
import DishesContent from "@/features/dishes/components/contents/dishes-content";
import { Routes } from "@/shared/types/routes";
import { useNavigate } from "react-router-dom";


function DishesPage() {
  const navigate = useNavigate()

  const onCreateBtnClick = () =>{
    navigate(Routes.DISH_NEW)
  }

  return (
    <FlexBox       
      display="flex" 
      alignItems="center" 
      justifyContent="start"
      flexDirection="column" 
      width="100%" 
      height="100%"
    >
      <DishesHeader onCreateBtn={onCreateBtnClick}/>
      <DishesContent />
    </FlexBox>
  )
}

export default DishesPage;