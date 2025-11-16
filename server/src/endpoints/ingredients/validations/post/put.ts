import { Joi, Segments } from "celebrate";
import { fragmentCreateIngredient } from "./create.js";
import { fragmentDeleteIngredient } from "./delete.js";

export default {
  [Segments.BODY]: Joi.object().keys({
    ...fragmentDeleteIngredient,
    ...fragmentCreateIngredient,
  })
}