  import { UserDataKeys } from "../types/index.js";
  import { Dish } from "../types/entities/dishes.js";
  import { Day } from "../types/entities/dishesDays.js";
  import { Ingredient } from "../types/entities/ingridients.js";
  import { NutrientsStructure } from "../types/entities/nutrients.js";

  type EntityDataMap = {
    [UserDataKeys.INGRIDIENTS]: Ingredient;
    [UserDataKeys.DISHES]: Dish;
    [UserDataKeys.DISHES_DAYS]: Day;
  }

  type SeparateNewDataEntityProps<K extends UserDataKeys> = {
    entity: K;
    data: Partial<EntityDataMap[K]>;
  }

  class SeparateNewDataEntity {
    public separate<K extends UserDataKeys>(props: SeparateNewDataEntityProps<K>): EntityDataMap[K] {
        switch (props.entity) {
          case UserDataKeys.INGRIDIENTS:
            return this.separateIngredient(props.data) as EntityDataMap[K];
          case UserDataKeys.DISHES:
            return this.separateDish(props.data) as EntityDataMap[K];
          default:
            return props.data as EntityDataMap[K];
        }
    }

    private separateIngredient(data: Partial<Ingredient>): Ingredient {
      const DefaultNutrients: NutrientsStructure = {
        energy_kcal_100g: 0,
        proteins_100g: 0,
        fat_100g: 0,
        saturated_fat_100g: 0,
        carbohydrates_100g: 0,
        sugars_100g: 0,
        fiber_100g: 0,
        // second nutrients
        salt_100g: 0,
        sodium_100g: 0,
        energy_100g: 0,
        cholesterol_100g: 0,
        trans_fat_100g: 0,
      }

      return {
        id: ``,
        product_name: data.product_name ?? "",
        image_url: data.image_url ?? "",
        nutriments: {...DefaultNutrients, ...data.nutriments},
      }
    }

    private separateDish(data: Partial<Dish>): Dish {
      return {
        id: ``,
        name: data?.name ?? "",
        imageUrl: data?.imageUrl ?? "",
        ingredients: {
          myIngredientsIds: data.ingredients?.myIngredientsIds ?? [],
          openFactFoodsIngredientsIds: data.ingredients?.openFactFoodsIngredientsIds ?? [],
        },
      }
    }
    
  }


  export default new SeparateNewDataEntity();