import FlexBox from "@/shared/ui/flexbox";
import { Avatar, Typography } from "@mui/material";
import { OffProduct } from "@/shared/types/entities/off-products.types";

import styles from "../index.module.scss";


interface Props {
  product?: OffProduct;
}

function OffProductInfoHeader({ product }: Props) {
  return (
    <FlexBox width="100%" height="100%" justifyContent="start" padding="16px 8px" maxWidth="1440px">
      <FlexBox width="100%" height="100%" alignItems="start"padding="8px 4px">
        <Avatar variant="square" className={styles.avatar}  src={product?.image_url}/>
        <FlexBox className={styles.dataContainer} flexDirection="column">

        <Typography variant="h2">{product?.product_name ?? "Name not found"}</Typography>
        <Typography variant="h5">{product?.brands.join(", ")}</Typography>

        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  )
}

export default OffProductInfoHeader;