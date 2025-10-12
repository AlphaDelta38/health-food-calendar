import { NutrientsStructure } from "./nutrients";

export interface IngredientStructure {
  id: string;
  name: string;
  imageUrl: string;
  nutrients: NutrientsStructure;
}

