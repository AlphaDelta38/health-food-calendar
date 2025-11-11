export interface Nutrients {
  /// Kcal, Kj, B, J, U
  energy_kcal_100g?: number;
  proteins_100g?: number;
  fat_100g?: number;
  saturated_fat_100g?: number;
  carbohydrates_100g?: number;

  sugars_100g?: number;
  fiber_100g?: number;

  /// second nutrients
  salt_100g?: number;
  sodium_100g?: number;
  energy_100g?: number;
  cholesterol_100g?: number;
  trans_fat_100g?: number;
}
