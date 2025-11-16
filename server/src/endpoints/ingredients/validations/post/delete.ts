import { Segments, Joi } from 'celebrate';

export const fragmentDeleteIngredient = {
  id: Joi.string()
  .pattern(/^\d+_\d+-\d+$/)
  .required()
  .messages({
    'string.pattern.base': 'ID must be in the format "XXX_number-number"',
    'string.empty': 'ID is required',
  }),
}

export default {
  [Segments.PARAMS]: Joi.object().keys({
    ...fragmentDeleteIngredient,
  })
}
