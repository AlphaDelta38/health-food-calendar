import { Segments, Joi } from 'celebrate';

export const fragmentCreateIngredient = {
  name: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  nutrients: Joi.object().keys({
    energy_kcal_100g: Joi.number().optional(),
    proteins_100g: Joi.number().optional(),
    fat_100g: Joi.number().optional(),
    saturated_fat_100g: Joi.number().optional(),
    carbohydrates_100g: Joi.number().optional(),
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
