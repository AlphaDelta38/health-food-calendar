import { NutrientsStructure } from "./nutrients";

interface Ingredient {
  id: string;
  name: string;
  imageUrl: string;
  nutrients: NutrientsStructure;
}

export interface IngredientStructure {
  count: number;
  ingredients: Ingredient[];
}
