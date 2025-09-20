import { Filters, Validation } from "@/shared/types/global.js";

export interface GetCategoriesServiceProps extends Filters, Validation {
  search: string;
  lenguages: string[];
}

export interface GetProductsServiceProps extends Filters, Validation {
  categories_tags_en: string;
  search_terms: string;
}
