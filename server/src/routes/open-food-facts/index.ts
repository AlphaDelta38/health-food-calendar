import express from 'express';
import categoriesSchema from './validations/query/categories.js';
import productsSchema from './validations/query/products.js';
import { celebrate, errors } from 'celebrate';
import { getCategoriesController, getProductsController } from '../../controllers/open-food-facts/index.js';

const router = express.Router();

router.get("/categories", celebrate(categoriesSchema), getCategoriesController);
router.get("/products", celebrate(productsSchema), getProductsController);

router.use(errors());

export default router;
