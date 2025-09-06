import { Filters, Validation } from "../../../types/global.js";

export enum AllowFields {
  id = 'id',
  known = 'known',
  name = 'name',
  products = 'products',
  sameAs = 'sameAs',
}

export interface GetCategoriesServiceProps extends Filters, Validation {
}
