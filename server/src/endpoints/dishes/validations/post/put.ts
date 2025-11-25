import { Joi, Segments } from "celebrate";
import { fragmentCreateDishes } from "./create.js";
import { fragmentDeleteDishes } from "./delete.js";

export default {
  [Segments.BODY]: Joi.object().keys({
    ...fragmentDeleteDishes,
    ...fragmentCreateDishes,
  })
}
