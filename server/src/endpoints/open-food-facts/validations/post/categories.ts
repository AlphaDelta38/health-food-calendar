import { Segments, Joi } from 'celebrate';

export default {
  [Segments.BODY]: Joi.object().keys({
    lenguages: Joi.array().items(Joi.string()).required().default(["en"]),
    reset: Joi.boolean().optional().default(false),
  })
}
