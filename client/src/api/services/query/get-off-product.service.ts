import { OffProductsResponse } from "@/shared/types/entities/off-products.types";
import ApiRoutesEnum from "../../api-routes";
import useSwrRequest from "../../useSwrRequest";
import { SWRResponse } from "swr";


interface GetOpenFoodFactsProductsServiceProps {
  page: number;
  pageSize: number;
  categories_tags_ids?: string[] | string;
  search?: string;
  fields?: string[];
}

function getOpenFoodFactsProductsService(props: GetOpenFoodFactsProductsServiceProps): SWRResponse<OffProductsResponse> {
  const { page, pageSize, categories_tags_ids, search, fields } = props;

  const params = {
    page,
    pageSize,
    categories_tags_ids,
    search,
    fields,
  }

  return useSwrRequest<OffProductsResponse>({url: ApiRoutesEnum.OFF_PRODUCTS, method: 'GET', params}, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
  });
}

export default getOpenFoodFactsProductsService;
