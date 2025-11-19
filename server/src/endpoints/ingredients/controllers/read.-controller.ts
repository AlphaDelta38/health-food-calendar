import { handleError } from "@/shared/utils/error-handler.js";
import { Response, Request } from "express";
import { IngredientGetAllReq } from "../types/controllers.js";
import { getIngredientService, getIngredientsService } from "../services/read-services.js";

const getIngredientsController = async (req: IngredientGetAllReq, res: Response) => {
  try {
    const result = await getIngredientsService(req.query);
    res.status(200).json(result);
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}

const getIngredientController = async (req: Request<{id: string}, {}, {}, {}>, res: Response) => {
  try {
    const result = await getIngredientService(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}



export {
  getIngredientsController,
  getIngredientController,
}