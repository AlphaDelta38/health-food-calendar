import { Filters, Validation } from "@/shared/types/global.js";

export interface GetCategoriesServiceProps extends Filters {
  search: string;
  lenguages: string[];
}

export interface GetProductsServiceProps extends Filters, Validation {
  categories_tags_ids?: string[] | string;
  search?: string;
  fields?: string[];
}

export interface GetLenguagesServiceProps extends Filters {
  search: string;
  onlyChosen: boolean;
}