import { AxiosRequestConfig } from "axios";
import api from "./index";
import useSWR, { SWRConfiguration } from "swr";

const fetcher = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await api.request<T>(config);
  return response.data;
};

function useSwrRequest<T>(config: AxiosRequestConfig, options?: SWRConfiguration<T>): ReturnType<typeof useSWR<T>> {
  return useSWR<T>(config ? JSON.stringify(config) : null, () => fetcher<T>(config), options);
}

export default useSwrRequest;
