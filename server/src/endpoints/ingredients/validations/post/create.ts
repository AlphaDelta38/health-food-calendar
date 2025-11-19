import { Segments, Joi } from 'celebrate';

export const fragmentCreateIngredient = {
  product_name: Joi.string().required(),
  image_url: Joi.string().empty("").default(""),
  nutriments: Joi.object().keys({
    energy_kcal_100g: Joi.number().optional(),
    proteins_100g: Joi.number().optional(),
    fat_100g: Joi.number().optional(),
    saturated_fat_100g: Joi.number().optional(),
    carbohydrates_100g: Joi.number().optional(),
    trans_fat_100g: Joi.number().optional(),
    cholesterol_100g: Joi.number().optional(),
    sugars_100g: Joi.number().optional(),
    fiber_100g: Joi.number().optional(),
    salt_100g: Joi.number().optional(),
    sodium_100g: Joi.number().optional(),
    energy_100g: Joi.number().optional(),
  }).optional(),
}

export default {
  [Segments.BODY]: Joi.object().keys({
    ...fragmentCreateIngredient,
  })
}
