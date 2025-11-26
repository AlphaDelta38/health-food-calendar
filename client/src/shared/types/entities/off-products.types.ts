import { Nutrients } from "./nutrients.types";

export interface reponseQueryFields {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
}

export interface OffProduct {
  code: string;
  product_name: string;
  image_url: string;
  brands: string[];
  nutriments: Nutrients;
}

export interface OffProductsResponse extends reponseQueryFields {
  products: OffProduct[];
}