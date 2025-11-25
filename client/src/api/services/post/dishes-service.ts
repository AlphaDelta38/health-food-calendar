import ApiRoutesEnum from "@/api/api-routes";
import { useSwrMutation } from "@/api/useSWR";
import { Dish } from "@/shared/types/entities/dishes";
import { SWRMutationResponse } from "swr/mutation";


type CreateProductProps = Omit<Dish, "id">;

function useCreateDish(): SWRMutationResponse<
  Dish,
  Error,
  string,
  CreateProductProps
> {
  return useSwrMutation<Dish>({
    url: ApiRoutesEnum.dishes,
    method: "POST",
  });
}

function useUpdateDish(): SWRMutationResponse<
  Dish,
  Error,
  string,
  Dish
> {
  return useSwrMutation<Dish>({
    url: ApiRoutesEnum.dishes,
    method: "PUT",
  });
}

export {
  useCreateDish,
  useUpdateDish
}
