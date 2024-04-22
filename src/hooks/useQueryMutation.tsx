import { AxiosError, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface UseAxiosMutationProps<TData> {
  requestFn: (data: TData) => Promise<AxiosResponse<TData, AxiosError>>;
  options?: UseMutationOptions<AxiosResponse<TData>, AxiosError, any>;
}
const UseQueryMutation = ({
  requestFn,
  options,
}: UseAxiosMutationProps<any>) => {
  return useMutation<AxiosResponse<any>, any, any>(requestFn, {
    ...options, // Pasar las opciones adicionales
  });
};

export default UseQueryMutation;
