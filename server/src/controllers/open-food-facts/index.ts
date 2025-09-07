import { Request, Response } from 'express';
import { getCategoriesService, getProductsService } from '../../service/open-food-facts/index.js';
import { CategoriesResponse, ProductsResponse } from '../../service/open-food-facts/types/entities.js';
import { GetCategoriesServiceProps, GetProductsServiceProps } from '../../service/open-food-facts/types/service.js';


type reqQueryCategory = Request<{}, {}, {}, GetCategoriesServiceProps>
type reqQueryProducts = Request<{}, {}, {}, GetProductsServiceProps>


async function getCategoriesController(req: reqQueryCategory, res: Response): Promise<void> {
  try {
    const { page, pageSize, allowFields, validationType } = req.query;

    const categories: CategoriesResponse = await getCategoriesService({
      page: Number(page),
      pageSize: Number(pageSize),
      allowFields: allowFields,
      validationType: validationType,
    });

    res.status(200).json(categories);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error', error: e });
  }
}


async function getProductsController(req: reqQueryProducts, res: Response): Promise<void> {
  try {
    const { page, pageSize, allowFields, validationType, categories_tags_en, search_terms } = req.query;

    const proudcts: ProductsResponse = await getProductsService({
      page: Number(page),
      pageSize: Number(pageSize),
      categories_tags_en,
      search_terms,
      allowFields,
      validationType,
    })

    res.status(200).json(proudcts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error', error: e });
  }
}


export { 
  getCategoriesController, 
  getProductsController
};
