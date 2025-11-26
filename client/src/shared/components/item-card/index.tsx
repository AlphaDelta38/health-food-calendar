import { 
  CardProps, 
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  CardMediaProps, 
  TypographyProps,
} from "@mui/material";
import Icon from "../../ui/icon";
import FlexBox from "../../ui/flexbox";

import cl from "./index.module.scss";

interface Props extends CardProps {
  title: string
  imageUrl: string
  description: string
  actionArea: React.ReactNode
  styles?: {
    image?: CardMediaProps
    title?: TypographyProps
    description?: TypographyProps
  }
  className?: string
  isChosen?: boolean
  onClick?: () => void
}

function ItemCard({ 
  title, 
  imageUrl, 
  description, 
  actionArea, 
  styles, 
  className, 
  isChosen, 
  onClick 
}: Props ) {
  return (
    <Card className={className} style={{ position: "relative", overflow: "visible" }}>
      <CardActionArea>
        <CardMedia
          onClick={onClick}
          component="img"
          image={imageUrl ?? "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png"}
          alt={title}
          {...(styles?.image ?? {})}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" {...(styles?.title ?? {})}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} {...(styles?.description ?? {})}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {actionArea}
      </CardActions>
      {isChosen && (
        <FlexBox className={cl.choosedContainer}>
          <Icon name="Check" size={24} />
        </FlexBox>
      )}
    </Card>
  )
}

export default ItemCard;