import { celebrate, errors } from "celebrate";
import { Router } from "express";
import {
  changeIngredientController,
  createIngredientController, 
  deleteIngredientController 
} from "../controllers/write-controller.js";
import { 
  getIngredientController, 
  getIngredientsController 
} from "../controllers/read.-controller.js";

import createIngredientSchema from "@/endpoints/ingredients/validations/post/create.js"
import deleteIngredientSchema from "@/endpoints/ingredients/validations/post/delete.js"
import changeIngredientSchema from "@/endpoints/ingredients/validations/post/put.js"
import getIngredientsSchema from "@/endpoints/ingredients/validations/read/get-all.js"


const router = Router();

router.post("/", celebrate(createIngredientSchema), createIngredientController);
router.delete("/:id", celebrate(deleteIngredientSchema), deleteIngredientController);
router.put("/", celebrate(changeIngredientSchema), changeIngredientController);
router.get("/", celebrate(getIngredientsSchema), getIngredientsController);
router.get("/:id", celebrate(deleteIngredientSchema), getIngredientController);
router.use(errors())

export default router;
