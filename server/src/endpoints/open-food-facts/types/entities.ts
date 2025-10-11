export interface Category {
  id: string;
  known: number;
  name: string;
  products: number;
  sameAs?: string[];
  url: string;
}

export interface Product {
  _id: string;
  _keywords: string[];

  product_name: string;
  brands?: string
  categories?: string;

  allergens_tags?: string[];              
  allergens_from_ingredients?: string;    
  allergens_from_user?: string;

  nutriscore_grade?: "a" | "b" | "c" | "d" | "e";
  nutriscore_score?: number;
  nova_group?: 1 | 2 | 3 | 4;

  nutriments?: {
    energy_kcal_100g?: number;
    fat_100g?: number; 
    saturated_fat_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    proteins_100g?: number;
    salt_100g?: number; 
    fiber_100g?: number;  
  };

  ingredients_text?: string;
  ingredients_tags?: string[];
  additives_tags?: string[];
  vitamins_tags?: string[];
  minerals_tags?: string[];

  labels_tags?: string[]; 
  
  image_url?: string;
  image_small_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  image_ingredients_url?: string;
  image_nutrition_url?: string; 
}

export interface CategoriesResponse {
  count: number;
  tags: Category[];
}

export interface ProductsResponse {
  hits: Product[];
  count: number;
  page: number;
  page_count: number;
  page_size: number;
}

export interface Lenguages {
  name: string;
  products: number;
}

export interface LenguagesResponse {
  count: number;
  tags: Lenguages[];
}

export type cacheLenguages = Record<string, {
  code: string;
  chosen: boolean;
}>;