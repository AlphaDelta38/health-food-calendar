import axios from 'axios';
import validateController from '../../utils/validations.js';
import { CATEGORIES_URL } from '../../constants/api-url.js';
import { CategoriesResponse } from './types/entities.js';
import { GetCategoriesServiceProps } from './types/service.js';

async function getCategoriesService({ page, pageSize, allowFields, validationType }: GetCategoriesServiceProps): Promise<CategoriesResponse> {
  const response = await axios.get<CategoriesResponse>(CATEGORIES_URL, {
    params: {
      page,
      page_size: pageSize
    }
  });

  const validatedCategories = {
    ...response.data,
    tags: validateController(allowFields, response.data.tags, validationType, true)
  };

  return validatedCategories;
}

export { getCategoriesService };
