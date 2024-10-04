import { MetadataEntity } from "./MetadataEntity.entity";

// interfaces.ts
export interface SelectOption {
    label: string;
    value: number | string;
}



// La interfaz para la respuesta genérica de la API
export interface ApiResponse<T> {
    data: T[];
    metadata: MetadataEntity;
}

// Definir una interfaz clara para la configuración de cada entidad.
export interface SelectConfig<T> {
    apiCall: () => Promise<ApiResponse<T>>;
    transformData: (data: T[]) => SelectOption[];
}
