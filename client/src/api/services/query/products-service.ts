import ApiRoutesEnum from "@/api/api-routes";
import { useSwrRequest } from "@/api/useSWR";
import { UserProduct } from "@/shared/types/entities/user-product";
import { SWRResponse } from "swr";


interface GetProductsProps {
  page: number;
  pageSize: number;
  search?: string;
}

interface IngredientGetAllResponse {
  ingredients: UserProduct[];
  pages: number;
}

function useGetProducts(params: GetProductsProps): SWRResponse<IngredientGetAllResponse> {
  return useSwrRequest<IngredientGetAllResponse>({
    url: ApiRoutesEnum.ingredients,
    method: 'GET',
    params,
  });
}

function useGetProduct(id: string): SWRResponse<UserProduct> {
  return useSwrRequest<UserProduct>({
    url: `${ApiRoutesEnum.ingredients}/${id}`,
    method: 'GET',
  });
}

export {
  useGetProducts,
  useGetProduct,
}