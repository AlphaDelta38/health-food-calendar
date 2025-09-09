import querySchema from './validations/query.js';
import mutationSchema from './validations/mutation.js';
import { Router } from "express";
import { getDataFileController, writeDataToFileController } from "../../controllers/fs/index.js";
import { celebrate } from "celebrate";

const fsRouter = Router();

fsRouter.get('/', celebrate(querySchema), getDataFileController);
fsRouter.post('/', celebrate(mutationSchema), writeDataToFileController);

export default fsRouter;
