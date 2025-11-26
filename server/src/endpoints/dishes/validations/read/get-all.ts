import { Joi, Segments } from "celebrate";
import { globalValidationObj } from "@/shared/global-validation-obj/index.js";

const { page, pageSize } = globalValidationObj;

export default {
  [Segments.QUERY]: Joi.object().keys({
    page,
    pageSize,
    search: Joi.string().optional().empty("").default(""),
    sortRules: Joi.array().items(Joi.object().keys({
      valuePath: Joi.string().required(),
      direction: Joi.string().valid("asc", "desc").required(),
    })).optional().default([]),
  })
}