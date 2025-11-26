import ApiRoutesEnum from "@/api/api-routes";
import { useSwrMutation } from "@/api/useSWR";
import { UserProduct } from "@/shared/types/entities/user-product";
import { SWRMutationResponse } from "swr/mutation";


type CreateProductProps = Omit<UserProduct, "id">;

function useCreateProduct(): SWRMutationResponse<
  UserProduct,
  Error,
  string,
  CreateProductProps
> {
  return useSwrMutation<UserProduct>({
    url: ApiRoutesEnum.ingredients,
    method: "POST",
  });
}

function useUpdateProduct(): SWRMutationResponse<
  UserProduct,
  Error,
  string,
  CreateProductProps
> {
  return useSwrMutation<UserProduct>({
    url: ApiRoutesEnum.ingredients,
    method: "PUT",
  });
}

export {
  useCreateProduct,
  useUpdateProduct
}
