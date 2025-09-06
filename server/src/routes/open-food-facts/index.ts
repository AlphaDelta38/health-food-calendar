import express from 'express';
import categoriesSchema from './validations/query/categories.js';
import { celebrate, errors } from 'celebrate';
import { getCategoriesController } from '../../controllers/open-food-facts/index.js';

const router = express.Router();

router.get("/categories", celebrate(categoriesSchema), getCategoriesController)


router.use(errors());

export default router;
