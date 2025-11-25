import { Request, Response } from "express";
import { handleError } from "@/shared/utils/error-handler.js";
import { getDishesService, getDishService } from "../services/read-services.js";
import { getDishesControllerRequst } from "../types/controller.js";

async function getDishesController(req: getDishesControllerRequst, res: Response) {
  try {
    const dishes = await getDishesService(req.query);
    res.status(200).json(dishes);
  } catch (e) {
    const error = handleError(e);
    res.status(error.status).json(error);
  }
}

async function getDishController(req: Request<{id: string}, {}, {}, {}>, res: Response) {
  try {
    const dishes = await getDishService(req.params.id);
    res.status(200).json(dishes);
  } catch (e) {
    const error = handleError(e);
    res.status(error.status).json(error);
  }
}

export {
  getDishesController,
  getDishController,
}