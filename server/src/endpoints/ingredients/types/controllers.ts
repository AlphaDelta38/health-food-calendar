
import { Request } from "express";
import { IngredientGetAllServiceProps, IngredientServiceProps } from "./services.js";

export type IngredientBodyReq = Request<{}, {}, IngredientServiceProps, {}>;
export type IngredientParamReq = Request<{ id: string }, {}, {}, {}>;
export type IngredientBodyChangeReq = Request<{}, {}, IngredientServiceProps & { id: string }, {}>;
export type IngredientGetAllReq = Request<{}, {}, {}, IngredientGetAllServiceProps>;
