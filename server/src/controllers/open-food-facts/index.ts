import { Request, Response } from 'express';
import { getCategoriesService } from '../../service/open-food-facts/index.js';
import { CategoriesResponse, Category } from '../../service/open-food-facts/types/entities.js';
import { AllowFields } from '../../service/open-food-facts/types/service.js';
import { ValidationType } from '../../types/global.js';


async function getCategoriesController(req: Request, res: Response): Promise<void> {
  try {
    const { page, pageSize, allowFields, validationType } = req.query;

    const categories: CategoriesResponse = await getCategoriesService({
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      allowFields: allowFields as AllowFields,
      validationType: validationType as ValidationType
    });

    res.status(200).json(categories);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error', error: e });
  }
}




export { getCategoriesController };
