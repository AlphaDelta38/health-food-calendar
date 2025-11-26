import { Router } from "express";
import { celebrate } from "celebrate";
import querySchema from '@fs/validations/query.js';
import mutationSchema from '@fs/validations/mutation.js';
import { getDataFileController } from "@fs/controllers/read-controller.js";
import { writeDataToFileController } from "@fs/controllers/write-controller.js";

const fsRouter = Router();

fsRouter.get('/', celebrate(querySchema), getDataFileController);
fsRouter.post('/', celebrate(mutationSchema), writeDataToFileController);

export default fsRouter;
