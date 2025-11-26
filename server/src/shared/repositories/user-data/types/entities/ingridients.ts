import { UserDataKeys } from "../index.js";
import { NutrientsStructure } from "./nutrients.js";

export interface Ingredient {
  id: string;
  product_name: string;
  image_url: string;
  nutriments: NutrientsStructure;
}

export interface IngredientStructure {
  count: number;
  [UserDataKeys.INGRIDIENTS]: Ingredient[];
}
