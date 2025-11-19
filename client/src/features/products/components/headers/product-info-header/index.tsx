import FlexBox from "@/shared/ui/flexbox";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { UserProduct } from "@/shared/types/entities/user-product";

import styles from "../index.module.scss";

interface Props {
  onlyReadable?: boolean;
  product?: UserProduct;
  additionalActions?: React.ReactNode;
  onDataChange: (data: Pick<UserProduct, "product_name" | "image_url">) => void;
  onSave: () => void;
}

function ProductInfoHeader({ product, onDataChange, onSave, additionalActions, onlyReadable = false }: Props) {
  return (
    <FlexBox width="100%" height="100%" justifyContent="start" padding="16px 8px" maxWidth="1440px">
      <FlexBox width="100%" height="100%" alignItems="start"padding="8px 4px">
        <Avatar variant="square" className={styles.avatar}  src={product?.image_url ?? ""}/>
        <FlexBox className={styles.dataContainer} flexDirection="column">
          {onlyReadable && 
            <Typography variant="h2">{product?.product_name ?? "Name not found"}</Typography>
          }

          {!onlyReadable && 
            <>
              <TextField 
                label="Product name" 
                variant="outlined" 
                className={styles.textField} 
                value={product?.product_name ?? ""} 
                onChange={e => onDataChange({ product_name: e.target.value, image_url: product?.image_url ?? "" })} 
              />
              <TextField 
                label="Image URL" 
                variant="outlined" 
                className={styles.textField}
                value={product?.image_url ?? ""}
                onChange={e => onDataChange({ product_name: product?.product_name ?? "", image_url: e.target.value })}
              />
            </> 
          }
          {!onlyReadable && 
            <Button onClick={onSave} variant="contained" color="primary" className={styles.button}>Save product</Button>
          }
          {
            additionalActions
          }
        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  )
}

export default ProductInfoHeader;