import { useEffect, useState, useMemo } from "react";
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
    const entityConfig = useMemo(() => selectEntitiesConfig[entityName], [entityName]);  // Memoiza la configuración para evitar recrearla en cada render.

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

            // Comparar si las opciones realmente cambiaron antes de llamar a setOptions
            if (JSON.stringify(optionsData) !== JSON.stringify(options)) {
                setOptions(optionsData);
            }
        }
    }, [data]);

    return { options, isLoading };
};

export default useSelectOptions;
