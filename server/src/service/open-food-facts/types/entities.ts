export interface Category {
  id: string;
  known: number;
  name: string;
  products: number;
  sameAs?: string[];
  url: string;
}

export interface CategoriesResponse {
  count: number;
  tags: Category[];
}
