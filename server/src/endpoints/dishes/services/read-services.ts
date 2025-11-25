import { Dish } from "@/shared/repositories/user-data/types/entities/dishes.js";
import { DishGetAllServiceProps } from "../types/services.js";
import userDataProvider from "@/shared/repositories/user-data/index.js";
import { UserDataKeys } from "@/shared/repositories/user-data/types/index.js";
import { sortBy, transformToSortRules } from "@/shared/utils/sort.js";
import { getCursorFormId } from "@/shared/repositories/user-data/utils/cursor.js";
import { CustomError } from "@/shared/utils/error-handler.js";
import { Ingredient } from "@/shared/repositories/user-data/types/entities/ingridients.js";
import { getProductService } from "@/endpoints/open-food-facts/services/read-service.js";

const getDishesService = async (props: DishGetAllServiceProps) => {
  const { page, pageSize, search, sortRules } = props;

  let dishes: Dish[] = [];
  let pagesCount: number = 1;

  if (search !== `\"\"` && search !== undefined && search && search !== "") {
    dishes = await userDataProvider.searchEntity<UserDataKeys.DISHES>(
      UserDataKeys.DISHES,
      search
    );
    
    const maxPages = Math.ceil(dishes.length / pageSize);
    const sizedPage = Math.max(Math.min(page, maxPages), 1);
    const startIndex = (sizedPage - 1) * pageSize;

    pagesCount = maxPages;
    dishes = dishes.slice(startIndex, startIndex + pageSize);
  } else {
    const { items, pagesCount: pagesCountResponse } =
      await userDataProvider.getEntityPage<UserDataKeys.DISHES>(
        UserDataKeys.DISHES,
        Number(page),
        Number(pageSize)
      );

    dishes = items;
    pagesCount = pagesCountResponse;
  }

  const sortedDishes = sortBy(dishes, transformToSortRules(sortRules));

  return {
    pages: Number(pagesCount),
    dishes: sortedDishes,
  };
};

const getDishService = async (id: string) => {
  const cursor = getCursorFormId(id);

  const { dishes } = await userDataProvider.getUserData<UserDataKeys.DISHES>(UserDataKeys.DISHES, cursor);


  const findDish = dishes.find((dish: Dish) => dish.id === id);

  const groupedByCursor: Record<string, string[]> = {}

  const myIngredients: Ingredient[] = [];
  const openFactFoodsIngredients: any[] = [];

  findDish?.ingredients.myIngredientsIds.forEach((ingredientId) => {
    const ingredientCursor = getCursorFormId(ingredientId);

    if (!groupedByCursor[ingredientCursor]) {
      groupedByCursor[ingredientCursor] = [ingredientId];
    } else {
      groupedByCursor[ingredientCursor].push(ingredientId);
    }

  })

  for (const id in findDish?.ingredients.openFactFoodsIngredientsIds) {
    const ingredient = await getProductService(id);

    if (ingredient) {
      openFactFoodsIngredients.push(ingredient);
    }

  }

  for (const cursor of Object.keys(groupedByCursor)) {
    const ingredients = await userDataProvider.getUserData<UserDataKeys.INGRIDIENTS>(UserDataKeys.INGRIDIENTS, cursor);

    myIngredients.push(...ingredients.ingredients.filter((ingredient: Ingredient) => groupedByCursor[cursor].includes(ingredient.id)));
  }
  
  if (!findDish) {
    throw new CustomError("Dish not found", { status: 404 });
  }

  return {
    dish: findDish,
    myIngredients,
    openFactFoodsIngredients,
  };
};

export {
  getDishesService,
  getDishService,
}