import { UserDataKeys } from "../index.js";
export interface Dish {
  id: string;
  name: string;
  imageUrl: string;

  ingredients: {
    myIngredientsIds: number[];
    openFactFoodsIngredientsIds: string[];
  }

}

export interface DishesStructure {
  count: number;
  [UserDataKeys.DISHES]: Dish[];
}
