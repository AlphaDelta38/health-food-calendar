import { AxiosRequestConfig } from "axios";
import api from "./index";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await api.request<T>(config);
  return response.data;
};

export const defaultOptions: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
  revalidateIfStale: false,
};

function useSwrRequest<T>(config: AxiosRequestConfig, options?: SWRConfiguration<T>): ReturnType<typeof useSWR<T>> {
  return useSWR<T>(config ? JSON.stringify(config) : null, () => fetcher<T>(config), options);
}

function useSwrMutation<T>(
  config: AxiosRequestConfig,
  options?: SWRMutationConfiguration<T, Error, string, any>
) {
  return useSWRMutation<T, Error, string, any>(
    config ? JSON.stringify(config) : "",
    async (_url, { arg }) => {

      const finalConfig: AxiosRequestConfig = {
        ...config,
        data: arg,
      };

      return fetcher<T>(finalConfig);
    },
    options
  );
}


export {
  useSwrRequest,
  useSwrMutation,
};
