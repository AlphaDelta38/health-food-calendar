import { Router } from "express";
import { celebrate, errors } from "celebrate";
import { getDishController, getDishesController } from "../controllers/read-controllers.js";
import { 
  createDishesController, 
  deleteDishesController, 
  updateDishesController 
} from "../controllers/write-controllers.js";

import createDishesSchema from "../validations/post/create.js";
import updateDishesSchema from "../validations/post/put.js";
import deleteDishesSchema from "../validations/post/delete.js";
import getDishesSchema from "../validations/read/get-all.js";

const router = Router();

router.get("/", celebrate(getDishesSchema), getDishesController);
router.get("/:id", celebrate(deleteDishesSchema), getDishController);

router.post("/", celebrate(createDishesSchema), createDishesController);
router.put("/", celebrate(updateDishesSchema), updateDishesController);
router.delete("/:id", celebrate(deleteDishesSchema), deleteDishesController);

router.use(errors());

export default router;