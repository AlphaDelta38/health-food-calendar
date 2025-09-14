import express from 'express';
import { celebrate, errors } from 'celebrate';
import categoriesSchema from '@food/validations/query/categories.js';
import productsSchema from '@food/validations/query/products.js';
import { getCategoriesController, getProductsController } from '@/endpoints/open-food-facts/controllers/read-service.js';

const router = express.Router();

router.get("/categories", celebrate(categoriesSchema), getCategoriesController);
router.get("/products", celebrate(productsSchema), getProductsController);

router.use(errors());

export default router;
