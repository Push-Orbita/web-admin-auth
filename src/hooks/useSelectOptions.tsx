import { useEffect, useState, useMemo } from "react";
import useQueryApi from "./useQueryApi";
import selectEntitiesConfig from "@config/components/selectConfig";

interface IOptions {
    nombre: string;
    value: number;
}

const getDataArray = (responseData: any): any[] => {
    if (Array.isArray(responseData)) return responseData;
    if (responseData && typeof responseData === 'object' && Array.isArray(responseData.data)) {
        return responseData.data;
    }
    return [];
};

const useSelectOptions = (
    entityName: keyof typeof selectEntitiesConfig,
    labelBuilder?: (item: any) => string
) => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const entityConfig = useMemo(() => selectEntitiesConfig[entityName], [entityName]);

    const { data, isLoading, refetch } = useQueryApi<any>(
        entityName,
        entityConfig.apiService
    );

    useEffect(() => {
        if (!entityConfig) {
            console.warn(`No se encontró configuración para ${entityName}`);
            return;
        }

        const dataArray = getDataArray(data);

        if (dataArray.length > 0) {
            const optionsData = dataArray.map((item: any) => ({
                nombre: labelBuilder
                    ? labelBuilder(item)
                    : item[entityConfig.labelField ?? 'nombre'],  // Fallback a 'nombre'
                value: item[entityConfig.valueField ?? 'id'],    // Fallback a 'id'
            }));

            const optionsIds = new Set(options.map(o => o.value));
            const newOptionsIds = new Set(optionsData.map(o => o.value));

            if (optionsIds.size !== newOptionsIds.size || [...optionsIds].some(id => !newOptionsIds.has(id))) {
                setOptions(optionsData);
            }
        }
    }, [data, labelBuilder, entityConfig, options]);

    return { options, isLoading, refetch };
};

export default useSelectOptions;
