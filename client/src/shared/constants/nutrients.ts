import { MainMacroNutrients, SecondNutrients } from "@/features/products/types"

const mainMacroNutrients: Required<MainMacroNutrients> = {
  energy_kcal_100g: 0,
  proteins_100g: 0,
  fat_100g: 0,
  saturated_fat_100g: 0,
  carbohydrates_100g: 0,
  sugars_100g: 0,
  fiber_100g: 0,
}

const secondNutrients: Required<SecondNutrients> = {
  salt_100g: 0,
  sodium_100g: 0,
  energy_100g: 0,
  cholesterol_100g: 0,
  trans_fat_100g: 0,
}

export {
  mainMacroNutrients, 
  secondNutrients
}