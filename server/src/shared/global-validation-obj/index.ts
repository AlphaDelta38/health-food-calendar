import { Joi } from "celebrate";
import { ValidationType } from "@/shared/types/global.js";

export const globalValidationObj = {
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).default(10),
  allowFields: Joi.array().items(Joi.string()).optional().default([]),
  validationType: Joi.string().valid(ValidationType.PICK, ValidationType.EXCLUDE).optional().default(ValidationType.PICK),
}
