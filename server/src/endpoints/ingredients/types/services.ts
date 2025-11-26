import { NutrientsStructure } from "@/shared/repositories/user-data/types/entities/nutrients.js";
import { SortRule } from "@/shared/utils/sort.js";

export type IngredientServiceProps = {
  name: string;
  imageUrl?: string;
  nutriments?: NutrientsStructure;
}

export type IngredientGetAllServiceProps = {
  page: number;
  pageSize: number;
  search: string;
  sortRules: SortRule[];
}