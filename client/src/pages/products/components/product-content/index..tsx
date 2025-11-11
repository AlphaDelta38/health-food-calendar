import { ItemCard, PaginationBar, SearchField } from "@/shared/components";
import FlexBox from "@/shared/ui/flexbox";
import { Button } from "@mui/material";

import styles from "./index.module.scss";
import getOpenFoodFactsProductsService from "@/api/services/query/get-off-product.service";
import { useEffect, useState } from "react";


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

function ProductContent() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = getOpenFoodFactsProductsService({
    page: page,
    pageSize: 10,
    search: searchQuery,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
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
        <SearchField onSearch={(value) => handleSearch(value)} />
      </FlexBox>

      <FlexBox padding="16px 0" width="100%" margin="16px 0" flexDirection="row" flexWrap="wrap" gap="16px" alignItems="end">
        {data?.products.map((product) => (
          <ItemCard 
            key={product.id} 
            title={product.product_name} 
            imageUrl={product?.image_url} 
            description={product.brands?.join(', ')} 
            actionArea={<Button size="small" color="primary">View</Button>} onClick={() => {}} 
            className={styles.itemCard} styles={itemsStyle}/>
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

export default ProductContent;

