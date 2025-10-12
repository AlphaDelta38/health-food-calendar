import { IngredientStructure } from "./ingridients";
import { NutrientsStructure } from "./nutrients";

interface DishStructure {
  id: string;
  name: string;
  imageUrl: string;

  nutrients: NutrientsStructure

  ingredients: {
    count: number;
    myIngredients: IngredientStructure[];
    oepnFactFoodsIngredients: {
      code: string;
    };
  }

}

export interface DishesStructure {
  count: number;
  dishes: DishStructure[];
}
