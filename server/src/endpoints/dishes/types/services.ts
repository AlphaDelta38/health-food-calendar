import { Dish } from "@/shared/repositories/user-data/types/entities/dishes.js";
import { SortRule } from "@/shared/utils/sort.js"; 

export type createDishesServiceProps = Omit<Dish, "id">;
export type updateDishesServiceProps = Dish;
export type DishGetAllServiceProps = {
  page: number;
  pageSize: number;
  search: string;
  sortRules: SortRule[];
}