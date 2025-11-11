import FlexBox from "@/shared/ui/flexbox";
import { Avatar, Button, TextField } from "@mui/material";

import styles from "./index.module.scss";

function NewProductHeader() {
  return (
    <FlexBox width="100%" height="100%" justifyContent="start" padding="16px 8px" maxWidth="1440px">
      <FlexBox width="100%" height="100%" alignItems="start"padding="8px 4px">
        <Avatar variant="square" className={styles.avatar}  src=""/>
        <FlexBox className={styles.dataContainer} flexDirection="column">
          <TextField label="Product name" variant="outlined" className={styles.textField}/>
          <TextField label="Image URL" variant="outlined" className={styles.textField}/>
          <Button variant="contained" color="primary" className={styles.button}>Save product</Button>
        </FlexBox>
      </FlexBox>
      
    </FlexBox>
  )
}

export default NewProductHeader;