import axios from 'axios';
import ISO6391 from 'iso-639-1';
import CategoriesStore from '@/shared/store/categories-store.js';
import LenguagesStore from '@/shared/store/lenguages-store.js';
import { PRODUCTS_SEARCH_URL, LENGUAGES_URL } from '@/shared/constants/api-url.js';
import { cacheLenguages, CategoriesResponse, LenguagesResponse, ProductsResponse } from '@food/types/entities.js';
import { GetCategoriesServiceProps, GetLenguagesServiceProps, GetProductsServiceProps } from '@food/types/service.js';
import { prepareAllowFields, validateFields } from '@/shared/utils/validations.js';
import { ProductAllowFields } from '@food/types/allowFields.js';
import { CustomError } from '@/shared/utils/error-handler.js';
import { transformToElasticSearcQuery } from '@food/utils/products.js';
import { ValidationType } from '@/shared/types/global.js';


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
  const { page, pageSize, categories_tags_ids, search, fields } = props;

  const allowFields = prepareAllowFields<(keyof typeof ProductAllowFields)[]>(
    props.allowFields!, 
    Object.keys(ProductAllowFields) as (keyof typeof ProductAllowFields)[], 
    props.validationType
  );

  const response = await axios.get<ProductsResponse>(PRODUCTS_SEARCH_URL, {
    params: {
      page,
      page_size: pageSize,
      categories_tags_ids,
      fields: allowFields.join(","),
      q: transformToElasticSearcQuery({
        query: search,
        fields: {
          categories_tags: categories_tags_ids ?? [],
        }
      })
    }
  })

  const fieldsToPick = [
    "count",
    "page",
    "page_count",
    "page_size",
  ] as (keyof ProductsResponse)[];

  const validatedProducts = {
    ...validateFields<ProductsResponse, keyof ProductsResponse>(response.data, fieldsToPick, ValidationType.PICK),
    products: response.data.hits
  }

  return validatedProducts;
}

async function getLenguagesService(props: GetLenguagesServiceProps): Promise<cacheLenguages> {
  const { page, pageSize, search, onlyChosen } = props;

  const chosenLenguages: cacheLenguages = {};
  let lenguages: cacheLenguages = {};

  if(onlyChosen) {
    return {};
  }

  if(!LenguagesStore.storeExists()) {
    const initResponse = await axios.get<LenguagesResponse>(LENGUAGES_URL);
    const allLenguages =  await axios.get<LenguagesResponse>(LENGUAGES_URL, {
      params: {
        page_size: initResponse.data.count,
      }
    });

    allLenguages.data.tags.forEach((lenguage) => {
      if(!isNaN(Number(lenguage.name))) {
        return;
      }

      const code = ISO6391.getCode(lenguage.name);

      if(code === undefined || code === "") {
        return;
      }
      
      lenguages[lenguage.name] = {
        code: code,
        chosen: false,
      }
    })

    await LenguagesStore.setLenguages(lenguages);
  } else {
    lenguages = await LenguagesStore.readLenguages();
  }
  
  lenguages = {
    ...lenguages,
    ...chosenLenguages,
  }

  for (const el in lenguages) {
    if (!el.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && search !== "") {
      delete lenguages[el];
    }
  }

  const slicedLenguages = Object.fromEntries(
    Object.entries(lenguages).slice((page - 1) * pageSize, page * pageSize)
  );

  return slicedLenguages;
}

export { 
  getCategoriesService, 
  getProductsService,
  getLenguagesService,
};
