import axios from 'axios';
import CategoriesStore from '@/shared/store/categories-store.js';
import { PRODUCTS_SEARCH_URL } from '@/shared/constants/api-url.js';
import { CategoriesResponse, ProductsResponse } from '@food/types/entities.js';
import { GetCategoriesServiceProps, GetProductsServiceProps } from '@food/types/service.js';
import { prepareAllowFields, validateFieldsArray } from '@/shared/utils/validations.js';
import { ProductAllowFields } from '@food/types/allowFields.js';
import { CustomError } from '@/shared/utils/error-handler.js';

async function getCategoriesService({ page, pageSize, search, lenguages }: Omit<GetCategoriesServiceProps, "validationType">): Promise<CategoriesResponse> {

  const allCategories = await CategoriesStore.readCategories(search, lenguages);

  if(allCategories === null) {
    throw new CustomError("Categories store is not ready", {status: 500});
  }

  const sizedCategories = allCategories.slice((page - 1) * pageSize, page * pageSize);

  return {
    count: allCategories.length,
    tags: sizedCategories,
  };

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
