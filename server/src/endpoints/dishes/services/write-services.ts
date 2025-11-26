import { UserDataKeys } from "@/shared/repositories/user-data/types/index.js";
import { createDishesServiceProps, updateDishesServiceProps } from "../types/services.js";
import userDataProvider from "@/shared/repositories/user-data/index.js";
import separateNewDataEntity from "@/shared/repositories/user-data/utils/separate-data-entity.js";
import { getCursorFormId } from "@/shared/repositories/user-data/utils/cursor.js";
import { CustomError } from "@/shared/utils/error-handler.js";
import { Dish } from "@/shared/repositories/user-data/types/entities/dishes.js";

async function createDishesService(props: createDishesServiceProps) {
  
  const separatedData = separateNewDataEntity.separate<UserDataKeys.DISHES>({
    entity: UserDataKeys.DISHES,
    data: props,
  });

  const dish = await userDataProvider.setUserData<UserDataKeys.DISHES>({
    key: UserDataKeys.DISHES,
    data: {
      count: 1,
      [UserDataKeys.DISHES]: [separatedData],
    },
  }, true);

  return dish;
}

async function updateDishesService(props: updateDishesServiceProps) {
  const { id, ...data } = props;
  const cursor = getCursorFormId(id);

  const { dishes } = await userDataProvider.getUserData<UserDataKeys.DISHES>(UserDataKeys.DISHES, cursor);

  const newDishes = dishes.map((dish: Dish) => {
    if (dish.id === id) {
      return { ...dish, ...data };
    }
    return dish;
  })

  const checkOnExistingDish = newDishes.find((dish: Dish) => dish.id === id);

  if (!checkOnExistingDish) {
    throw new CustomError('Dish with this id not found', { status: 404 });
  }

  await userDataProvider.setUserData<UserDataKeys.DISHES>({
    key: UserDataKeys.DISHES,
    data: {
      count: newDishes.length,
      [UserDataKeys.DISHES]: newDishes,
    },
  });
  
  return checkOnExistingDish;
}

async function deleteDishesService(id: string) {
  const cursor = getCursorFormId(id);

  const { dishes } = await userDataProvider.getUserData<UserDataKeys.DISHES>(UserDataKeys.DISHES, cursor);

  const newDishes = dishes.filter((dish: Dish) => dish.id !== id);

  await userDataProvider.setUserData<UserDataKeys.DISHES>({
    key: UserDataKeys.DISHES,
    data: {
      count: newDishes.length,
      [UserDataKeys.DISHES]: newDishes,
    },
  });

  return newDishes;
}

export {
  createDishesService,
  updateDishesService,
  deleteDishesService,
}