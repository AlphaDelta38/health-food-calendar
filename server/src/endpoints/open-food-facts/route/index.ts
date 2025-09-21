import express from 'express';
import productsSchema from '@food/validations/query/products.js';
import categoriesSchema from '@food/validations/query/categories.js';
import writeCategoriesSchema from '@food/validations/post/categories.js';
import lenguagesSchema from '@food/validations/query/lenguages.js';
import { celebrate, errors } from 'celebrate';
import { getCategoriesController, getLenguagesController, getProductsController } from '@/endpoints/open-food-facts/controllers/read-controller.js';
import { writeCategoriesController } from '@food/controllers/write-controller.js';

const router = express.Router();

router.get("/categories", celebrate(categoriesSchema), getCategoriesController);
router.post("/categories", celebrate(writeCategoriesSchema), writeCategoriesController);
router.get("/products", celebrate(productsSchema), getProductsController);
router.get("/lenguages", celebrate(lenguagesSchema), getLenguagesController);
router.use(errors());

export default router;
