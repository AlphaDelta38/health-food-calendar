import { UserDataKeys } from "..";
import { NutrientsStructure } from "./nutrients";

interface Ingredient {
  id: string;
  name: string;
  imageUrl: string;
  nutrients: NutrientsStructure;
}

export interface IngredientStructure {
  count: number;
  [UserDataKeys.INGRIDIENTS]: Ingredient[];
}
