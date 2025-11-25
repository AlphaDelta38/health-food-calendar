import { Joi, Segments } from "celebrate"

export const fragmentDeleteDishes = {
  id: Joi.string().required(),
}

export default {
  [Segments.PARAMS]: Joi.object().keys({
    ...fragmentDeleteDishes,
  })
}
