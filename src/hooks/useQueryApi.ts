import { SearchParamsDTO } from "../model/common/search-params.dto"
import {
    UseQueryOptions,
    UseQueryResult,
    useQuery,
} from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

type ServiceApi<T> = (
    params?: SearchParamsDTO
) => Promise<AxiosResponse<T, any>>

const useQueryApi = <T>(
    queryKey: string,
    serviceApi: ServiceApi<T>,
    params?: SearchParamsDTO,
    queryOptions?: UseQueryOptions<T, AxiosError>
): UseQueryResult<T, AxiosError> => {
    return useQuery<T, AxiosError>(
        [queryKey, params],
        () => serviceApi(params).then((res) => res.data),
        queryOptions
    )
}

export default useQueryApi
