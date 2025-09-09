import { Segments, Joi } from 'celebrate';

export default {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    json: Joi.string().required(),
  })
}
