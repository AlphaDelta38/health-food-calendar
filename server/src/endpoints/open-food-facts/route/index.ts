import express from 'express';
import productsSchema from '@food/validations/query/products.js';
import categoriesSchema from '@food/validations/query/categories.js';
import writeCategoriesSchema from '@food/validations/post/categories.js';
import { celebrate, errors } from 'celebrate';
import { getCategoriesController, getProductsController } from '@/endpoints/open-food-facts/controllers/read-controller.js';
import { writeCategoriesController } from '@food/controllers/write-controller.js';

const router = express.Router();

router.get("/categories", celebrate(categoriesSchema), getCategoriesController);
router.post("/categories", celebrate(writeCategoriesSchema), writeCategoriesController);
router.get("/products", celebrate(productsSchema), getProductsController);

router.use(errors());

export default router;
