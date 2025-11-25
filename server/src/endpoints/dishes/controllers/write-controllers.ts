import { Response } from "express";
import { handleError } from "@/shared/utils/error-handler.js";
import { createDishesService, deleteDishesService, updateDishesService } from "../services/write-services.js";
import { createDishesControllerRequst, deleteDishesControllerRequst, updateDishesControllerRequst } from "../types/controller.js";

async function createDishesController(req: createDishesControllerRequst, res: Response) {
  try {
    const dish = await createDishesService(req.body);
    res.status(200).json(dish);
  } catch (e) {
    const error = handleError(e);
    res.status(error.status).json(error);
  }
}

async function updateDishesController(req: updateDishesControllerRequst, res: Response) {
  try {
    const dish = await updateDishesService(req.body);
    res.status(200).json(dish);
  } catch (e) {
    const error = handleError(e);
    res.status(error.status).json(error);
  }
}

async function deleteDishesController(req: deleteDishesControllerRequst, res: Response) {
  try {
    const dish = await deleteDishesService(req.params.id);
    res.status(200).json(dish);
  } catch (e) {
    const error = handleError(e);
    res.status(error.status).json(error);
  }
}

export {
  createDishesController,
  updateDishesController,
  deleteDishesController,
}
