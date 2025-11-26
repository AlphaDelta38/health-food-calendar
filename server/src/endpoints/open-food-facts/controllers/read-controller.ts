import { Request, Response } from 'express';
import { getCategoriesService, getLenguagesService, getProductService, getProductsService } from '@/endpoints/open-food-facts/services/read-service.js';
import { cacheLenguages, CategoriesResponse, Product, ProductsResponse } from '@food/types/entities.js';
import { GetCategoriesServiceProps, GetLenguagesServiceProps, GetProductsServiceProps } from '@food/types/service.js';
import { CustomError, handleError } from '@/shared/utils/error-handler.js';


type reqQueryCategory = Request<{}, {}, {}, GetCategoriesServiceProps>
type reqQueryProducts = Request<{}, {}, {}, GetProductsServiceProps>
type reqQueryLenguages = Request<{}, {}, {}, GetLenguagesServiceProps>


async function getCategoriesController(req: reqQueryCategory, res: Response): Promise<void> {
  try {
    const { page, pageSize, search, lenguages } = req.query;

    const categories: CategoriesResponse = await getCategoriesService({
      page: Number(page),
      pageSize: Number(pageSize),
      search,
      lenguages,
    });

    res.status(200).json(categories);
  } catch (e) {
    const status = (e instanceof CustomError) ? (e as CustomError).data.status : 500;
    const message = (e instanceof CustomError) ? (e as CustomError).message : 'Internal server error';

    res.status(status).json({ message });
  }
}


async function getProductsController(req: reqQueryProducts, res: Response): Promise<void> {
  try {
    const { page, pageSize, ...props } = req.query;

    const proudcts: ProductsResponse = await getProductsService({
      page: Number(page),
      pageSize: Number(pageSize),
      ...props
    })

    res.status(200).json(proudcts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error', error: e });
  }
}

async function getProductController(req: Request<{id: string}, {}, {}, {}>, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const product: Product | {} = await getProductService(id)

    if (Object.keys(product).length === 0) {
      throw new CustomError("Product is not found", {status: 404})
    }

    res.status(200).json(product);
  } catch (e) {
    const errorResult = handleError(e)
    res.status(500).json(errorResult);
  }
}

async function getLenguagesController(req: reqQueryLenguages, res: Response): Promise<void> {
  try {
    const lenguages: cacheLenguages = await getLenguagesService(req.query);

    res.status(200).json(lenguages);
  } catch (e) {
    res.status(500).json({ message: 'Internal server error', error: e });
  }
}

export { 
  getCategoriesController, 
  getProductsController,
  getLenguagesController,
  getProductController
};
