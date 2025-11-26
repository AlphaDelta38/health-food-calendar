import { OffProduct, OffProductsResponse } from "@/shared/types/entities/off-products.types";
import ApiRoutesEnum from "../../api-routes";
import { useSwrRequest, defaultOptions } from "../../useSWR";
import { SWRResponse } from "swr";


interface GetOpenFoodFactsProductsServiceProps {
  page: number;
  pageSize: number;
  categories_tags_ids?: string[] | string;
  search?: string;
  fields?: string[];
}

function getOpenFoodFactsProducts(props: GetOpenFoodFactsProductsServiceProps): SWRResponse<OffProductsResponse> {
  const { page, pageSize, categories_tags_ids, search, fields } = props;

  const params = {
    page,
    pageSize,
    categories_tags_ids,
    search,
    fields,
  }

  return useSwrRequest<OffProductsResponse>({url: ApiRoutesEnum.OFF_PRODUCTS, method: 'GET', params}, {
    ...defaultOptions,
  });
}

function getOpenFoodFactsProduct(id: string): SWRResponse<OffProduct> {
  return useSwrRequest<OffProduct>({url: `${ApiRoutesEnum.OFF_PRODUCTS}/${id}`, method: 'GET'}, {
    ...defaultOptions,
  });
}


export {
  getOpenFoodFactsProducts,
  getOpenFoodFactsProduct
};
