import { Segments, Joi } from 'celebrate';

export default {
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string().required(),
  })
}
