import { UserDataKeys } from "..";
interface DishStructure {
  id: string;
  name: string;
  imageUrl: string;

  ingredients: {
    count: number;
    myIngredients: number[];
    openFactFoodsIngredients: string[];
  }

}

export interface DishesStructure {
  count: number;
  [UserDataKeys.DISHES]: DishStructure[];
}
