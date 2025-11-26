import { Segments, Joi } from 'celebrate';
import { globalValidationObj } from '@/shared/global-validation-obj/index.js';

export default {
  [Segments.QUERY]: Joi.object().keys({
    ...globalValidationObj,
    categories_tags_ids: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string()
    ).optional(),
    search: Joi.string().optional().empty(''),
    fields: Joi.array().items(Joi.string()).optional(),
  })
}
