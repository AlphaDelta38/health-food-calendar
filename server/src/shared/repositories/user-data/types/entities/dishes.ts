import { UserDataKeys } from "../index.js";
export interface Dish {
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
  [UserDataKeys.DISHES]: Dish[];
}
