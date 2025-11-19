import { Nutrients } from "./nutrients.types";

export interface UserProduct {
  id: string;
  product_name: string;
  image_url: string;
  nutriments: Nutrients;
}