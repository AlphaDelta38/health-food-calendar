import { Nutrients } from "@app-types/entities/nutrients.types.js";

export interface SecondNutrients {
  salt_100g?: number;
  sodium_100g?: number;
  energy_100g?: number;
  cholesterol_100g?: number;
  trans_fat_100g?: number;
}

export type MainMacroNutrients = Exclude<Nutrients, keyof SecondNutrients>;
