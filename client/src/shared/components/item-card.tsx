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
}

function ItemCard({ title, imageUrl, description, actionArea, styles, className }: Props) {
  return (
    <Card className={className}>
      <CardActionArea>
        <CardMedia
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
    </Card>
  )
}

export default ItemCard;