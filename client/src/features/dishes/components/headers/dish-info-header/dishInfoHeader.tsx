import React from "react";
import FlexBox from "@/shared/ui/flexbox";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Dish } from "@/shared/types/entities/dishes";

import styles from "./index.module.scss";

interface Props {
  onlyReadable?: boolean;
  dish?: Dish;
  additionalActions?: React.ReactNode;
  onDataChange: (data: Pick<Dish, "name" | "imageUrl">) => void;
  onSave: () => void;
}

function DishInfoHeader({ dish, onDataChange, onSave, additionalActions, onlyReadable = false }: Props) {
  return (
    <FlexBox width="100%" height="100%" justifyContent="start" padding="16px 8px" maxWidth="1440px">
      <FlexBox width="100%" height="100%" alignItems="start" padding="8px 4px">
        <Avatar variant="square" className={styles.avatar} src={dish?.imageUrl ?? ""} />
        <FlexBox className={styles.dataContainer} flexDirection="column">
          {onlyReadable &&
            <Typography variant="h2">{dish?.name ?? "Name not found"}</Typography>
          }
          
          {!onlyReadable &&
            <>
              <TextField
                label="Dish name"
                variant="outlined"
                className={styles.textField}
                value={dish?.name ?? ""}
                onChange={e => onDataChange({ name: e.target.value, imageUrl: dish?.imageUrl ?? "" })}
              />
              <TextField
                label="Image URL"
                variant="outlined"
                className={styles.textField}
                value={dish?.imageUrl ?? ""}
                onChange={e => onDataChange({ name: dish?.name ?? "", imageUrl: e.target.value })}
              />
            </>
          }

          {!onlyReadable &&
            <Button onClick={onSave} variant="contained" color="primary" className={styles.button}>
              Save product
            </Button>
          }

          {additionalActions}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default React.memo(DishInfoHeader, (prev, next) => {
  return (
    prev.dish?.name === next.dish?.name &&
    prev.dish?.imageUrl === next.dish?.imageUrl &&
    prev.onlyReadable === next.onlyReadable &&
    prev.additionalActions === next.additionalActions
  );
});
