import { useEffect, useState } from "react";
import useQueryApi from "./useQueryApi";
import selectEntitiesConfig from "@config/components/selectConfig";

interface Ioptions {
    nombre?: string;
    value?: number;
}

const useSelectOptions = (
    entityName: keyof typeof selectEntitiesConfig,
    labelBuilder?: (item: any) => string // Función opcional para personalizar los labels
) => {
    const [options, setOptions] = useState<Ioptions[]>([]);
    const entityConfig = selectEntitiesConfig[entityName];

    const { data, isLoading } = useQueryApi<any>(
        entityName,
        entityConfig.apiService
    );

    useEffect(() => {
        if (data?.data && Array.isArray(data.data)) {
            const optionsData = data.data.map((item: any) => ({
                nombre: labelBuilder
                    ? labelBuilder(item)
                    : item[entityConfig.labelField],
                value: item[entityConfig.valueField],
            }));
            setOptions(optionsData);
        }
    }, [data, entityConfig, labelBuilder]);

    return { options, isLoading };
};

export default useSelectOptions;
