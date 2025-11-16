import { handleError } from "@/shared/utils/error-handler.js";
import { Response } from "express";
import { IngredientGetAllReq } from "../types/controllers.js";
import { getIngredientsService } from "../services/read-services.js";

const getIngredientsController = async (req: IngredientGetAllReq, res: Response) => {
  try {
    const result = await getIngredientsService(req.query);
    res.status(200).json(result);
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}



export {
  getIngredientsController,
}