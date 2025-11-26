import { Dispatch, SetStateAction } from "react";
import { ItemCard, PaginationBar, SearchField } from "@/shared/components";
import FlexBox from "@/shared/ui/flexbox";
import { Button } from "@mui/material";
import { getOpenFoodFactsProducts } from "@/api/services/query/off-products-service";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/types/routes";
import { PersistantLCKeys, PersistantLCMaps } from "@/shared/types/utils/persistant-statete";
import usePersistantState from "@/shared/utils/persistant-state";
import useDebounce from "@/shared/hooks/useDebounce";

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

function OffProductsContent({ chosenProducts, setChosenProducts }: Props) {
  const [page, setPage] = usePersistantState<PersistantLCKeys.OFF_PRODUCTS_PAGE>(PersistantLCKeys.OFF_PRODUCTS_PAGE, 1);
  const [searchQuery, setSearchQuery] = usePersistantState<PersistantLCKeys.OFF_PRODUCTS_SEARCH>(PersistantLCKeys.OFF_PRODUCTS_SEARCH, '');
  const { debounce } = useDebounce();
  const navigate = useNavigate();

  const { data } = getOpenFoodFactsProducts({
    page: page,
    pageSize: 10,
    search: searchQuery,
  });

  const handleSearch = (value: string) => {
    debounce(() => setSearchQuery(value.trim()));
  }

  const handleChooseProduct = (productCode: string) => {
    if (chosenProducts.offProducts.includes(productCode)) {
      setChosenProducts({ ...chosenProducts, offProducts: chosenProducts.offProducts.filter((code) => code !== productCode) });
    } else {
      setChosenProducts({ ...chosenProducts, offProducts: [...chosenProducts.offProducts, productCode] });
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
        {data?.products.map((product) => (
          <ItemCard 
            key={product.code} 
            title={product.product_name} 
            imageUrl={product?.image_url} 
            onClick={() => handleChooseProduct(product.code)}
            description={product.brands?.join(', ')} 
            actionArea={<Button onClick={() => navigate(`${Routes.OFF_PRODUCT}/${product.code}`)} size="small" color="primary">View</Button>} 
            className={styles.itemCard} styles={itemsStyle}
            isChosen={chosenProducts.offProducts.includes(product.code)}
            />
        ))}
      </FlexBox>

      <FlexBox padding="16px 0" width="100%">
        <PaginationBar 
          count={data?.page_count ?? 1} 
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

export default OffProductsContent;

