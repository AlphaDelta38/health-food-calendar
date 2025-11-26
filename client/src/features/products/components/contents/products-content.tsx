import { Dispatch, SetStateAction } from "react";
import { ItemCard, PaginationBar, SearchField } from "@/shared/components";
import FlexBox from "@/shared/ui/flexbox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/types/routes";
import { useGetProducts } from "@/api/services/query/products-service";
import { PersistantLCKeys, PersistantLCMaps } from "@/shared/types/utils/persistant-statete";
import usePersistantState from "@/shared/utils/persistant-state";

import styles from "./styles/products.module.scss";



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
  chosenProducts: PersistantLCMaps[PersistantLCKeys.PRODUCTS_SELECTED_PRODUCTS];
  setChosenProducts: Dispatch<SetStateAction<PersistantLCMaps[PersistantLCKeys.PRODUCTS_SELECTED_PRODUCTS]>>;
}

function ProductsContent({ chosenProducts, setChosenProducts }: Props) {
  const [page, setPage] = usePersistantState<PersistantLCKeys.PRODUCTS_PAGE>(PersistantLCKeys.PRODUCTS_PAGE, 1);
  const [searchQuery, setSearchQuery] = usePersistantState<PersistantLCKeys.PRODUCTS_SEARCH>(PersistantLCKeys.PRODUCTS_SEARCH, '');
  const navigate = useNavigate();

  const { data } = useGetProducts({
    page: page,
    pageSize: 10,
    search: searchQuery,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  }

  const handleChooseProduct = (productId: string) => {
    if (chosenProducts.myProducts.includes(productId)) {
      setChosenProducts({ ...chosenProducts, myProducts: chosenProducts.myProducts.filter((id) => id !== productId) });
    } else {
      setChosenProducts({ ...chosenProducts, myProducts: [...chosenProducts.myProducts, productId] });
    }
  }

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
        <SearchField onSearch={(value) => handleSearch(value)} value={searchQuery}/>
      </FlexBox>

      <FlexBox padding="16px 0" width="100%" margin="16px 0" flexDirection="row" flexWrap="wrap" gap="16px" alignItems="end">
        {data?.ingredients?.map((product) => {
          return (
            <ItemCard 
            key={product.id} 
            title={product.product_name} 
            imageUrl={product?.image_url} 
            description={""} 
            onClick={() => handleChooseProduct(product.id)}
            actionArea={<Button onClick={() => navigate(`${Routes.PRODUCTS}/${product.id}`)} size="small" color="primary">View</Button>} 
            className={styles.itemCard} styles={itemsStyle}
            isChosen={chosenProducts.myProducts.includes(product.id)}
          />
          )
        })}
      </FlexBox>

      <FlexBox padding="16px 0" width="100%">
        <PaginationBar 
          count={data?.pages ?? 1} 
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

export default ProductsContent;

