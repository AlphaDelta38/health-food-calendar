import { Joi, Segments } from "celebrate"

export const fragmentCreateDishes = {
  name: Joi.string().required(),
  imageUrl: Joi.string().empty("").default(""),
  ingredients: Joi.object().keys({
    myIngredientsIds: Joi.array().items(Joi.string()).empty("").default([]),
    openFactFoodsIngredientsIds: Joi.array().items(Joi.string()).empty("").default([]),
  }).required(),
}

export default {
  [Segments.BODY]: Joi.object().keys({
    ...fragmentCreateDishes,
  })
}
