import axios from 'axios';
import { CATEGORIES_URL, PRODUCTS_SEARCH_URL } from '@/shared/constants/api-url.js';
import { CategoriesResponse, ProductsResponse } from '@food/types/entities.js';
import { GetCategoriesServiceProps, GetProductsServiceProps } from '@food/types/service.js';
import { prepareAllowFields, validateFieldsArray } from '@/shared/utils/validations.js';
import { CategoryAllowFields, ProductAllowFields } from '@food/types/allowFields.js';

async function getCategoriesService({ page, pageSize, allowFields, validationType }: GetCategoriesServiceProps): Promise<CategoriesResponse> {
  const allowFieldsPrepared = prepareAllowFields<(keyof typeof CategoryAllowFields)[]>(
    allowFields!,
    Object.keys(CategoryAllowFields) as (keyof typeof CategoryAllowFields)[],
    validationType,
  )

  const response = await axios.get<CategoriesResponse>(CATEGORIES_URL, {
    params: {
      page,
      page_size: pageSize,
      fields: allowFieldsPrepared,
    }
  });

  const validatedCategories = {
    ...response.data,
    tags: validateFieldsArray(response.data.tags, allowFieldsPrepared, validationType)
  };

  return validatedCategories;
}

async function getProductsService(props: GetProductsServiceProps): Promise<ProductsResponse> {
  const { page, pageSize, categories_tags_en, search_terms } = props;

  const allowFields = prepareAllowFields<(keyof typeof ProductAllowFields)[]>(
    props.allowFields!, 
    Object.keys(ProductAllowFields) as (keyof typeof ProductAllowFields)[], 
    props.validationType
  );

  const response = await axios.get<ProductsResponse>(PRODUCTS_SEARCH_URL, {
    params: {
      page,
      page_size: pageSize,
      categories_tags_en,
      search_terms,
      fields: allowFields,
    }
  })

  const validatedProducts = {
    ...response.data,
    products: validateFieldsArray(response.data.products, allowFields, props.validationType)
  }

  return validatedProducts;
}

export { 
  getCategoriesService, 
  getProductsService 
};
