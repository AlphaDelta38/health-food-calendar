import { Segments, Joi } from 'celebrate';
import { globalValidationObj } from '../../../../global-validation-obj/index.js';

export default {
  [Segments.QUERY]: Joi.object().keys({
    ...globalValidationObj,
    categories_tags_en: Joi.string().optional(),
    search_terms: Joi.string().optional(),
  })
}
