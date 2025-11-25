import { ItemCard, PaginationBar, SearchField } from "@/shared/components";
import FlexBox from "@/shared/ui/flexbox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/types/routes";
import { PersistantLCKeys } from "@/shared/types/utils/persistant-statete";
import usePersistantState from "@/shared/utils/persistant-state";
import { useGetDishes } from "@/api/services/query/dishes-service";

import styles from "./index.module.scss";
import { Dish } from "@/shared/types/entities/dishes";

const itemsStyle = {
  description: {
    className: styles.itemCardDescription
  },
  image: {
    className: styles.itemCardImage
  },
  title: {
    className: styles.itemCardTitle
  }
}

interface Props {
  onDishClick?: (dish: Dish) => void;
  actionBarVisible?: boolean;
}

function DishesContent({ onDishClick, actionBarVisible = true }: Props) {
  const [page, setPage] = usePersistantState<PersistantLCKeys.PRODUCTS_PAGE>(PersistantLCKeys.PRODUCTS_PAGE, 1);
  const [searchQuery, setSearchQuery] = usePersistantState<PersistantLCKeys.PRODUCTS_SEARCH>(PersistantLCKeys.PRODUCTS_SEARCH, '');
  const navigate = useNavigate();


  const { data } = useGetDishes({
    page: page,
    pageSize: 10,
    search: searchQuery,
  });

  return (
    <FlexBox 
      width="100%"
      height="100%"
      padding="24px 16px" 
      justifyContent="space-between"
      flexDirection="column"
    >
      <FlexBox 
        padding="0 16px"
        flexDirection="row" 
        justifyContent="space-between"
        width="100%"
      >
        <SearchField onSearch={(value) => setSearchQuery(value)} value={searchQuery}/>
      </FlexBox>

      <FlexBox padding="16px 0" width="100%" margin="16px 0" flexDirection="row" flexWrap="wrap" gap="16px" alignItems="end">
        {data?.dishes.map((dish) => {
          return (
            <ItemCard 
              key={dish.id} 
              title={dish.name} 
              onClick={() => onDishClick?.(dish)}
              imageUrl={dish.imageUrl ?? ""} 
              description={""} 
              actionArea={actionBarVisible ? <Button onClick={() => navigate(`${Routes.DISHES}/${dish.id}`)} size="small" color="primary">View</Button> : undefined} 
              className={styles.itemCard} styles={itemsStyle}
            />
          )
        })}
      </FlexBox>

      <FlexBox padding="16px 0" width="100%">
        <PaginationBar 
          count={1} 
          page={page}
          setPage={setPage}
          color="primary" 
          shape="rounded" 
          variant="outlined" 
          size="large" 
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
        />
      </FlexBox>
      
    </FlexBox>
  )
}

export default DishesContent;

