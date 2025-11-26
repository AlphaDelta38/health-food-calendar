import ApiRoutesEnum from "@/api/api-routes";
import { useSwrRequest } from "@/api/useSWR";
import { Dish } from "@/shared/types/entities/dishes";
import { OffProduct } from "@/shared/types/entities/off-products.types";
import { UserProduct } from "@/shared/types/entities/user-product";
import { SWRResponse } from "swr";


interface GetDishesProps {
  page: number;
  pageSize: number;
  search?: string;
}

interface DishGetAllResponse {
  dishes: Dish[];
  pages: number;
}

interface DishGetResponse {
  dish: Dish;
  myIngredients: UserProduct[];
  openFactFoodsIngredients: OffProduct[];
}

function useGetDishes(params: GetDishesProps): SWRResponse<DishGetAllResponse> {
  return useSwrRequest<DishGetAllResponse>({
    url: ApiRoutesEnum.dishes,
    method: 'GET',
    params,
  });
}

function useGetDish(id: string): SWRResponse<DishGetResponse> {
  return useSwrRequest<DishGetResponse>({
    url: `${ApiRoutesEnum.dishes}/${id}`,
    method: 'GET',
  });
}

export {
  useGetDishes,
  useGetDish,
}