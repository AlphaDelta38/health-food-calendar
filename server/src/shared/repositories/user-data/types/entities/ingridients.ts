import { UserDataKeys } from "../index.js";
import { NutrientsStructure } from "./nutrients";

export interface Ingredient {
  id: string;
  name: string;
  imageUrl: string;
  nutrients: NutrientsStructure;
}

export interface IngredientStructure {
  count: number;
  [UserDataKeys.INGRIDIENTS]: Ingredient[];
}
