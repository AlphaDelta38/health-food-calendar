export interface Dish {
  id: string;
  name: string;
  imageUrl?: string;
  ingredients: {
    myIngredientsIds: string[];
    openFactFoodsIngredientsIds: string[];
  }
}