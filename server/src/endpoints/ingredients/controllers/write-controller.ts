import { Response } from "express";
import { handleError } from "@/shared/utils/error-handler.js";
import { IngredientBodyChangeReq, IngredientBodyReq, IngredientParamReq } from "../types/controllers.js";
import { changeIngredientService, createIngredientService, deleteIngredientService } from "../services/write-services.js";

const createIngredientController = async (req: IngredientBodyReq, res: Response) => {
  try {
    const result = await createIngredientService(req.body);
    
    res.status(200).json(result);
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}

const deleteIngredientController = async (req: IngredientParamReq, res: Response) => {
  try {
    const result = await deleteIngredientService(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}

const changeIngredientController = async (req: IngredientBodyChangeReq, res: Response) => {
  try {
    const result = await changeIngredientService(req.body);
    res.status(200).json(result);
    
  } catch (e) {
    const errorResult = handleError(e);
    res.status(errorResult.status).json(errorResult);
  }
}


export { 
  createIngredientController, 
  deleteIngredientController, 
  changeIngredientController 
};
