import { Segments, Joi } from 'celebrate';
import { globalValidationObj } from '@/shared/global-validation-obj/index.js';

const { page, pageSize } = globalValidationObj;

export default {
  [Segments.QUERY]: Joi.object().keys({
    page,
    pageSize,
    search: Joi.string().optional().default(""),
    onlyChosen: Joi.boolean().optional().default(false),
  })
}
